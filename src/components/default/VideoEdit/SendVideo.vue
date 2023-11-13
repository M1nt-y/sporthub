<template>
  <div class="video-edit" v-if="videoData !== null">
    <VideoHeader
    :disabled="false"
    @saveInfo="saveInfo"
    @send="newValue"
    @delete="deleteVideo"
  />
  <VideoInfo
    :data="data"
    :video="videoData.video.link"
    :videoName="videoState.video ? videoState.video.name : ''"
    :progresVideo="progressVideo"
  />
  </div> 
</template>

<script setup lang="ts">
import {ref, onBeforeMount} from 'vue';
import {Video} from '@/types/types'
import { db } from "@/firebase/index";
import {updateDoc, getDoc,  doc, setDoc, deleteDoc, collection } from "firebase/firestore";
import {getDownloadURL, getStorage, ref as storageRef, uploadBytesResumable, deleteObject } from 'firebase/storage'
import VideoHeader from '@/components/default/VideoCreate/VideoHeader.vue'
import VideoInfo from '@/components/default/VideoCreate/VideoInfo.vue'

import { useRouter, useRoute  } from 'vue-router';
const router = useRouter();
const route = useRoute();


const STATE = ref(false)
const date = ref(Date.now());

function saveInfo(){
  console.log('Сохранять данные')
}


import {stateVideo} from '@/stores/video-create';
const videoState = stateVideo();



const data = ref({
  title: '',
  category: '',
  description: '',
  link: '',
})

const progressVideo = ref(100);

const videoData = ref<Video | null>(null);

async function getVideoId(){
  const videoId = route.params.id;

      try {
        const docRef = doc(db, 'videos', `video-${videoId}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          videoData.value = docSnap.data() as Video;
        } else {
          console.error('Документ не найден');
        }
      } catch (error) {
        console.error('Ошибка при запросе к Firestore:', error);
      }
}

async function getData(){
  data.value.title = videoData.value?.title ?? '';
  data.value.category = videoData.value?.category ?? '';
  data.value.description = videoData.value?.description ?? '';
  data.value.link = videoData.value?.link ?? '';
  videoState.preview = videoData.value?.preview.link ?? '';
}

async function getVideos(){
  await getVideoId();
  await getData();
}

onBeforeMount(() =>{
  getVideos();
})


async function deleteVideo() {
    const authData = localStorage.getItem('auth');
    const user = authData ? JSON.parse(authData) : null;
    const videoId = route.params.id;
    
    if (user) {
      const userDocRef = doc(db, 'publicUsers', user.user.id);
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.videos) {
          const storage = getStorage();
          const videoIndex = userData.videos.findIndex((video: { videoId: number; }) => video.videoId == +videoId);
          
          if (videoIndex !== -1) {
            userData.videos.splice(videoIndex, 1);
            
            const updatedInfo = {
              videos: userData.videos,
            };
            const videoStorageReference = storageRef(storage, 'video/' + `video-${+videoId}`);
            const imageStorageReference = storageRef(storage, 'preview/' + `preview-${+videoId}`);

            await deleteObject(videoStorageReference);
            await deleteObject(imageStorageReference);

            await updateDoc(userDocRef, updatedInfo);
            const videoCollection = collection(db, 'videos');
            const videoDocRef = doc(videoCollection, `video-${+videoId}`);
            await deleteDoc(videoDocRef);
            console.log(`Документ video-${+videoId} успешно удален.`);
            STATE.value = false;
            router.push('/creator-video')
          } else {
            console.error('Видео с указанным идентификатором не найдено.');
          }
        }
      } 
    }
}


async function updateVideo() {
  const authData = localStorage.getItem('auth');
  const user = authData ? JSON.parse(authData) : null;
  const videoId = route.params.id;

  if (user) {
    const userDocRef = doc(db, 'publicUsers', user.user.id);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      if (userData.videos) {
        const videoIndex = userData.videos.findIndex((video: { videoId: number; }) => video.videoId == +videoId);

        if (videoIndex !== -1) {
          const { title } = data.value;
          userData.videos[videoIndex] = { ...userData.videos[videoIndex], title };
          const updatedInfo = {
            videos: userData.videos,
          };
          await updateDoc(userDocRef, updatedInfo);
          const videoCollection = collection(db, 'videos');
          const videoDocRef = doc(videoCollection, `video-${+videoId}`);
 
          await updateDoc(videoDocRef, { title });
        } else {
          console.error('Видео с указанным идентификатором не найдено.');
        }
      }
    }
  }
}

async function updatePhoto(imageFile: File) {
  try {
    const storage = getStorage();
    const imageStorageReference = storageRef(storage, 'preview/' + `preview-${date.value}`);
    
    await uploadBytesResumable(imageStorageReference, imageFile);

    const URL_IMAGE = await getDownloadURL(imageStorageReference);

    const authData = localStorage.getItem('auth');
    const user = authData ? JSON.parse(authData) : null;

    if (user) {
      const userDocRef = doc(db, 'publicUsers', user.user.id);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();

        if (userData.videos) {
          const videoId = route.params.id;
          const videoIndex = userData.videos.findIndex((video: { videoId: number; }) => video.videoId == +videoId);

          if (videoIndex !== -1) {
            userData.videos[videoIndex] = { ...userData.videos[videoIndex], photo: URL_IMAGE };
            await updateDoc(userDocRef, { videos: userData.videos });
            const videoCollection = collection(db, 'videos');
            const videoDocRef = doc(videoCollection, `video-${+videoId}`);
            const videoData = { photo: URL_IMAGE, preview: { id: `preview-${+videoId}`, link: URL_IMAGE } };
            await updateDoc(videoDocRef, videoData);
          } else {
            console.error('Видео с указанным идентификатором не найдено.');
          }
        }
      }
    }
  } catch (error) {
    console.error('Произошла ошибка:', error);
  }
}

async function newValue(){
  await updateVideo();

  if (typeof videoState.preview !== 'string' && videoState.preview !== null) {
    await updatePhoto(videoState.preview)
  }

  router.push('/creator-video')
}
</script>