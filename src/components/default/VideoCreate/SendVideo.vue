<template>
  <VideoHeader
    :disabled="false"
    @saveInfo="saveInfo"
    @send="sendVideo"
    @delete="deleteVideo"
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
import {Video, ShortVideo} from '@/types/types'
import { db } from "@/firebase/index";
import {updateDoc, getDoc,  arrayUnion ,  doc, setDoc, deleteDoc, collection } from "firebase/firestore";
import {getDownloadURL, getStorage, ref as storageRef, uploadBytesResumable, deleteObject } from 'firebase/storage'
import VideoHeader from '@/components/default/VideoCreate/VideoHeader.vue'
import VideoInfo from '@/components/default/VideoCreate/VideoInfo.vue'

import { useRouter } from 'vue-router';
const router = useRouter();

const date = ref(Date.now())

const STATE = ref(false)
const VIDEO_DURATION = ref('')

function saveInfo(){
  console.log('Сохранять данные')
}

async function deleteVideo() {
  if (STATE.value) {
    const authData = localStorage.getItem('auth');
    const user = authData ? JSON.parse(authData) : null;
    
    if (user) {
      const userDocRef = doc(db, 'publicUsers', user.user.id);
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.videos) {
          const storage = getStorage();
          const videoIndex = userData.videos.findIndex((video: { videoId: number; }) => video.videoId == date.value);
          // const videoIndex = userData.videos.findIndex((video: { videoId: number; }) => video.videoId == +videoId);
          if (videoIndex !== -1) {
            userData.videos.splice(videoIndex, 1);
            
            const updatedInfo = {
              videos: userData.videos,
            };
            const videoStorageReference = storageRef(storage, 'video/' + `video-${date.value}`);
            const imageStorageReference = storageRef(storage, 'preview/' + `preview-${date.value}`);

            await deleteObject(videoStorageReference);
            await deleteObject(imageStorageReference);

            await updateDoc(userDocRef, updatedInfo);
            const videoCollection = collection(db, 'videos');
            const videoDocRef = doc(videoCollection, `video-${date.value}`);
            await deleteDoc(videoDocRef);
            console.log(`Документ video-${date.value} успешно удален.`);

            console.log('Видео успешно удалено.');
            STATE.value = false;
            router.push('/');
          } else {
            console.error('Видео с указанным идентификатором не найдено.');
          }
        }
      } 
    } 
  } 
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
  const videoStorageReference = storageRef(storage, 'video/' + `video-${date.value}`);
  const imageStorageReference = storageRef(storage, 'preview/' + `preview-${date.value}`);
  
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

async function getVideoDuration(videoFile: any): Promise<string> {
  return new Promise((resolve, reject) => {
    const videoElement = document.createElement('video');
    videoElement.src = URL.createObjectURL(videoFile);
    videoElement.addEventListener('loadedmetadata', () => {
      const durationInSeconds = videoElement.duration;
      const totalSeconds = Math.floor(durationInSeconds);
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      const formattedDuration = `${minutes}:${seconds.toString().padStart(2, '0')}`;
      resolve(formattedDuration);
    });
  });
}




async function updateInfo() {
  const videoFile = videoState.video;
  const duration = await getVideoDuration(videoFile);

  const authData = localStorage.getItem('auth');
  const user = authData ? JSON.parse(authData) : null;
  const videoData = new ShortVideo();
  videoData.videoId = `${date.value}`;
  videoData.title = data.value.title;
  videoData.duration = duration;
  videoData.photo = URL_IMAGE.value;

  const info = {
    videos: arrayUnion(JSON.parse(JSON.stringify(videoData)))
  };

  await updateDoc(doc(db, "publicUsers", user.user.id), info);
}

async function createVideo(){
  const authData = localStorage.getItem('auth');
  const user = authData ? JSON.parse(authData) : null;
  const videoData = new Video();
  videoData.id = `${date.value}`;
  videoData.title = data.value.title;
  videoData.uploaded = new Date();
  videoData.author =  {
    userId:  user.user.id,
    photo: user.user.photo,
    fullName: user.user.firstName + ' ' + user.user.lastName,
  };
  videoData.description = data.value.description;
  videoData.category = data.value.category;
  videoData.link =  data.value.link;
  videoData.video = {
    id: 'video-' + date.value,
    link: URL_VIDEO.value,
  };
  videoData.preview = {
    id: 'preview-' + date.value,
    link: URL_IMAGE.value,
  };
  await setDoc(doc(db, "videos",  `video-${date.value}`), JSON.parse(JSON.stringify(videoData)));
}

async function sendVideo() {
  if (videoState.video !== null && videoState.preview !== null) {
    if (videoState.video instanceof File && videoState.preview instanceof File) {
      await uploadVideoAndImage(videoState.video, videoState.preview);
    } else {
      console.error('Both video and preview must be of type File.');
    }
  }

  await updateInfo();
  await createVideo();
  STATE.value = true;
}

</script>