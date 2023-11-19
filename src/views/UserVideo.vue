<template>
  <div class="user-video">
    <div class="container">
      <VideoPlayerHeader
        :userInfo="USER"
      />
      <VideoPlayer
        v-if="VIDEO.video"
        :video="VIDEO.video.link"
      />

      <h3 class="user-video__title">{{ VIDEO.title }}</h3>

      <VideoBar/>

    </div>
  </div>
</template>


<script lang="ts" setup>
import {ref,onBeforeMount} from 'vue'
import { db } from "@/firebase/index";
import {getDoc,  doc, } from "firebase/firestore";
import VideoPlayerHeader from '@/components/default/Videos/VideoPlayerHeader.vue'
import VideoPlayer from '@/components/default/Videos/VideoPlayer.vue'
import VideoBar from '@/components/default/Videos/VideoBar.vue'

import { useRoute } from 'vue-router';
const route = useRoute();


// Получение конкретного видоса
import type { VideoType } from '@/types/types';
const emptyVideo: Partial<VideoType> = {};



const VIDEO = ref<VideoType>(emptyVideo as VideoType);

async function getVideo() {
  const paramsRoute = `video-${route.params.id}`
  if(paramsRoute){
    const videoDocRef = doc(db, 'videos', paramsRoute);
    const videoDoc = await getDoc(videoDocRef);

    if (videoDoc.exists()) {
      VIDEO.value = videoDoc.data() as VideoType;
    }
  }
}


// Получение юзера чтоб узнать его подписки
import type { UserType } from '@/types/types';
const emptyUser: Partial<UserType> = {};
const USER = ref<UserType>(emptyUser as UserType);

async function getUser(){
  const userId = VIDEO.value.author.userId;
  if(userId){
    const userDocRef = doc(db, 'publicUsers', userId);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      USER.value = userDoc.data() as UserType;
    }
  }
}

async function getData(){
  await getVideo();
  await getUser();
}

onBeforeMount(() =>{
  getData()
})



</script>


<style lang="stylus">
.user-video
  margin-bottom 40px
  .container
    max-width 950px
    margin 0 auto
    padding 0 15px
  
  &__title
    margin-top 20px
    color #FFF
    font-family Montserrat
    font-size 20px
    font-weight 600
    line-height 20px

</style>