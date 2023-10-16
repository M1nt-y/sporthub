<template>
  <VideoHeader
    :disabled="false"
    @saveInfo="saveInfo"
    @send="sendVideo"
  />
  <VideoInfo
    :data="data"
    :video="videoLink"
    :videoName="videoState.video ? videoState.video.name : ''"
    :progresVideo="progressVideo"
  />
</template>

<script setup lang="ts">
import {ref, computed} from 'vue';
import { db } from "@/firebase/index";
import {updateDoc,  getFirestore,  doc, getDocs, getDoc, collection, writeBatch, setDoc, deleteDoc    } from "firebase/firestore";
import {getDownloadURL, getStorage, ref as storageRef, uploadBytesResumable} from 'firebase/storage'
import VideoHeader from '@/components/default/VideoCreate/VideoHeader.vue'
import VideoInfo from '@/components/default/VideoCreate/VideoInfo.vue'


const date = ref(Date.now())
function saveInfo(){
  console.log('Сохранять данные')
}

import {stateVideo} from '@/stores/video-create';
const videoState = stateVideo();


const videoLink = computed(()=>{
  if(videoState.video && !URL_VIDEO.value){
    return URL.createObjectURL(videoState.video)
  }else{
    return URL_VIDEO.value
  }
})

const data = ref({
  title: '',
  category: '',
  description: '',
  link: '',
})

const progressVideo = ref(0);
const progressImg = ref(0)
const URL_VIDEO = ref('')

const URL_IMAGE = ref('')

async function uploadVideoAndImage(videoFile: File, imageFile: File) {
  const storage = getStorage();
  const date = Date.now()
  const videoStorageReference = storageRef(storage, 'video/' + `video-${date}`);
  const imageStorageReference = storageRef(storage, 'perview/' + `perview-${date}`);
  
  try {
    const uploadVideoTask = uploadBytesResumable(videoStorageReference, videoFile);
    const uploadImageTask = uploadBytesResumable(imageStorageReference, imageFile);
    await Promise.all([
      new Promise((resolve, reject) => {
        uploadVideoTask.on('state_changed',
          (snapshot) => {
            progressVideo.value = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Прогресс загрузки видео: ${progressVideo.value}%`);
          },
          (error) => {
            console.error('Ошибка при загрузке видео:', error);
            reject(error);
          },
          async () => {
            try {
              URL_VIDEO.value = await getDownloadURL(videoStorageReference);
              console.log('Видео успешно загружено. URL:', URL_VIDEO.value);
              resolve(URL_VIDEO.value);
            } catch (error) {
              console.error('Ошибка при получении URL видео:', error);
              reject(error);
            }
          }
        );
      }),
      new Promise((resolve, reject) => {
        uploadImageTask.on('state_changed',
          (snapshot) => {
            progressImg.value = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Прогресс загрузки фотографии: ${progressImg.value}%`);
          },
          (error) => {
            console.error('Ошибка при загрузке фотографии:', error);
            reject(error);
          },
          async () => {
            try {
              URL_IMAGE.value = await getDownloadURL(imageStorageReference);
              console.log('Фотография успешно загружена. URL:', URL_IMAGE.value);
              resolve(URL_IMAGE.value);
            } catch (error) {
              console.error('Ошибка при получении URL фотографии:', error);
              reject(error);
            }
          }
        );
      }),
    ]);
  } catch (error) {
    console.error('Ошибка при загрузке файлов:', error);
  }
}


async function sendVideo(){
  if(videoState.video !== null && videoState.perview !== null){
    uploadVideoAndImage(videoState.video, videoState.perview)
  }
  await updateInfo()
}

async function updateInfo(){
  const authData = localStorage.getItem('auth');
  const user = authData ? JSON.parse(authData) : null;
  const userDocRef = doc(db, 'publicUsers', user.user.id);
  const userDoc = await getDoc(userDocRef);
  const DataFirebase = {
    id: date.value,
    title: data.value.title,
    uploaded: new Date().toLocaleString,
    author: {
      id:  user.user.id,
      photo: user.user.photo,
      fullName: user.user.firstName + ' ' + user.user.lastName,
    },
    description: data.value.description,
    category: data.value.category,
    link: data.value.link,
    video: URL_VIDEO.value,
    preview: URL_IMAGE.value,
  }
  console.log(userDoc.data())
}

</script>