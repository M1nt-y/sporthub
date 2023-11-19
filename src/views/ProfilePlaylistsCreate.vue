<template>
  <div class="playlist-create">
   <div class="container">
    <div class="playlist-create__header">
      <div class="playlist-create__header-title">
        <h3>Create new playlist</h3>
      </div>
      <div class="playlist-create__btn">
        <TheButton
          :text="'Save'"
          :padding="14"
          :width="180"
          @click="addPlayList"
        />

        <div 
        class="playlist-create__btn-dropdown"
        >
        <LogoIcon
          class="playlist-create__btn-svg"
          @click.stop = "isOpened = !isOpened"
        />

        <div 
          class="dropdown"
          :class="{'dropdown_active': isOpened}"
          >
          <p class="item"   @click.stop="savedData">Edit</p>
          <p class="item" @click.stop="deleteData">Delete</p>
        </div>
      </div>
      </div>
    </div>
    <PlaylistData
      :data="data"
      :video="filteredVideos"
      :activeVideo="activeVideo"
      @pressed="setActiveVideo"
    />
   </div>
  </div>
</template>

<script setup lang="ts">
import {ref, watchEffect, onBeforeMount, computed  } from 'vue'
import { db } from "@/firebase/index";
import {updateDoc, getDoc,  arrayUnion, doc, } from "firebase/firestore";
import TheButton from '@/components/UI/Buttons/TheButton.vue';
import LogoIcon from '@/assets/icons/VideoCreate/IconBtn.vue';
import PlaylistData from '@/components/default/Playlist/PlaylistData.vue'
import { useRouter } from 'vue-router';
const router = useRouter();

const isOpened = ref(false);
watchEffect(() => {
  if (isOpened.value) {
    const closeDropdown = () => {
      isOpened.value = false;
    };
    document.addEventListener('click', closeDropdown);
    return () => {
      document.removeEventListener('click', closeDropdown);
    };
  }
});


function savedData(){
  isOpened.value = false
}

function deleteData(){
  isOpened.value = false
}

const data = ref({
  name: '',
  description: '',
  category: '',
  search: '',
})
const ALL_VIDEO = ref([])
async function getVideo() {
  const authData = localStorage.getItem('auth');
  const user = authData ? JSON.parse(authData) : null;
  
  if (user) {
    const userDocRef = doc(db, 'publicUsers', user.user.id);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      if (userData && userData.videos) {
        ALL_VIDEO.value = userData.videos;
        console.log(ALL_VIDEO.value);
      }
    }
  }
}

onBeforeMount(() =>{
  getVideo();
})

import type { ShortVideoType } from '@/types/types';
const filteredVideos = computed(() => {
  return ALL_VIDEO.value.filter((video:ShortVideoType) =>
    video.title.toLowerCase().includes(data.value.search.toLowerCase())
  );
});


const activeVideo = ref<string[]>([]);

const allVideo = ref<ShortVideoType[]>([]);

function setActiveVideo(id: string, video: ShortVideoType) {
  if (activeVideo.value.includes(id)) {
    activeVideo.value = activeVideo.value.filter((videoId) => videoId !== id);
    allVideo.value = allVideo.value.filter((videoId: ShortVideoType) => videoId.videoId !== video.videoId);
  } else {
    activeVideo.value = [...activeVideo.value, id];
    allVideo.value = [...allVideo.value, video];
  }
}

import {Playlist} from '@/types/types'

async function  addPlayList() {
  const authData = localStorage.getItem('auth');
  const user = authData ? JSON.parse(authData) : null;
  const playlistData = new Playlist();
  playlistData.category = data.value.category;
  playlistData.description = data.value.description;
  playlistData.id = `${Date.now()}`
  playlistData.name = data.value.name;
  playlistData.userId =  user.user.id;
  playlistData.videos = (allVideo.value as ShortVideoType[]) || [];


  const info = {
    playlists: arrayUnion(JSON.parse(JSON.stringify(playlistData)))
  };

  await updateDoc(doc(db, "publicUsers", user.user.id), info);
  router.push('/creator-video?param=playlists')
}


</script>


<style lang="stylus">

.container
  max-width 950px
  margin 0 auto
  padding 0 15px

.playlist-create
  margin-top 23px

  &__header
    display flex
    justify-content space-between
    align-items center

    h3
      color #FFF
      font-size 24px
      font-weight 500

      @media(max-width: 575px)
        font-size 18px
    
  &__btn
    display flex
    align-items center
    grid-gap 16px

    @media(max-width: 575px)
      gap 10px

    button
       @media(max-width: 575px)
        width 100px !important

    &-dropdown
      position relative

      .dropdown
        display none
        position absolute
        right  0
        top 50px
        z-index 5
        border-radius 8px
        width 240px
        background #222
        overflow hidden

        @media(max-width: 575px)
          width 157px

        &_active
          display block

        p
          padding 14px 10px
          color #FFF
          font-size 16px
          font-weight 400
          transition all .25s
          cursor pointer
            

          &:hover
            color  #BBB
            background rgba(187, 187, 187, 0.2)  

    &-svg
      display block
      width 100%
      height 100%
      cursor pointer
      transition all .25s

      path
        fill #AD7955
        transition all .25s

      rect
        stroke #AD7955
        transition all .25s
        
      &:hover

        path
          fill #BBB
        rect
          stroke #BBB
</style>