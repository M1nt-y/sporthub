<template>
  <div class="creator-video">
    <div class="container">
      <div class="creator-video__header">
        <div class="creator-video__header-select">
          <p  :class="{'active': SELECTED_ROUTER === ''}" @click="selectRouter('')">Your video</p>
          <p  :class="{'active': SELECTED_ROUTER === 'playlists'}" @click="selectRouter('playlists')">Playlists</p>
        </div>
        <div class="creator-video__header-btn">
          <p  v-if="SELECTED_ROUTER === ''">
            <router-link :to="{ path: `/video-create` }">
              <IconAdd/>
              Add new video
            </router-link>
          </p>
          <p  v-else>
            <router-link :to="{ path: `/playlist-create` }">
              <IconAdd/>
              Create new playlist
            </router-link>
          </p>
        </div>
      </div>

      <div class="creator-video__body">
        <AllVideo
          v-if="SELECTED_ROUTER === ''"
          :array="ALL_VIDEO"
        />
        <AllPlayList
          v-else
          :array="ALL_PLAYLIST"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, watch, onBeforeMount} from 'vue';
import {useRouter} from 'vue-router';
import AllVideo from '@/components/default/CreatorVideo/AllVideo.vue'
import AllPlayList from '@/components/default/CreatorVideo/AllPlayList.vue'

import IconAdd from '@/assets/icons/video/Add.vue'

import { db } from "@/firebase/index";
import { getDoc,  doc} from "firebase/firestore";

const router = useRouter();

const SELECTED_ROUTER = ref('');

const ALL_VIDEO = ref([])
const ALL_PLAYLIST = ref([])

function selectRouter(queryParam: string) {
  if (queryParam === "") {
    SELECTED_ROUTER.value = '';
    router.push({ query: {} });
  } else {
    SELECTED_ROUTER.value = queryParam;
    const currentQuery = {...router.currentRoute.value.query};
    currentQuery.param = queryParam;
    router.push({query: currentQuery});
  }
}

function handleRouteUpdate(to: any) {
  const queryParam = to.query.param
  if (queryParam) {
    SELECTED_ROUTER.value = queryParam
  } else {
    SELECTED_ROUTER.value = ''
  }
}

watch(() => router.currentRoute.value.query, (newQuery, oldQuery) => {
  const queryParam = newQuery.param;
  if (!queryParam) {
    SELECTED_ROUTER.value = '';
  }
});


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

async function getPlaylist() {
  const authData = localStorage.getItem('auth');
  const user = authData ? JSON.parse(authData) : null;
  
  if (user) {
    const userDocRef = doc(db, 'publicUsers', user.user.id);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      if (userData && userData.playlists) {
        ALL_PLAYLIST.value = userData.playlists;
        console.log(ALL_PLAYLIST.value);
      }
    }
  }
}


onBeforeMount(() =>{
  handleRouteUpdate(router.currentRoute.value);
  getVideo();
  getPlaylist();
})

</script>


<style lang="stylus">
.creator-video
  margin-top 29px

  .container
    max-width 1800px
    margin 0 auto
    padding 0 24px

  &__header
    display flex
    justify-content space-between
    align-items center

    @media (max-width: 500px)
      flex-direction column

    &-select
      color #BBB
      font-family Uto
      font-size 24px
      font-weight 500
      display flex
      align-items center

      @media (max-width: 500px)
        margin-bottom 20px

      p
        padding 14px 24px
        border-radius 8px
        cursor pointer

        @media (max-width: 700px)
          padding 10px 15px
          font-size 15px

        &.active
          background #222
          color white
    
    &-btn
      a
        border-radius 8px
        background #AD7955
        padding 11px 17px
        color #FFF
        font-family Uto
        font-size 16px
        font-weight 600
        cursor pointer
        display flex
        align-items center
        border 2px solid #AD7955
        transition all .25s

        @media (max-width: 700px)
          font-size 14px
          padding 8px 12px

        svg
          margin-right 10px

          path
            transition all .25s
        
        &:hover
          background unset
          color #AD7955

          svg
            path
              fill #AD7955
              transition all .25s

</style>