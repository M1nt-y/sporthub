<template>
  <div class="video-use">
    <div class="video-use__header" v-if="userInfo.photo">
     <div class="video-use__header-left">
      <div class="video-use__header-svg">
        <IconBack/>
      </div>
      <div class="video-use__header-user">
        <div class="user">
          <div class="user__img">
            <img width="40" height="40" :src="userInfo.photo.link" alt="">
          </div>
          <div class="user__name">
            <h2>{{ userInfo.firstName }} {{ userInfo.lastName }}</h2>
            <p>{{ userInfo.subscribers.length }} subscribers</p>
          </div>
        </div>
      </div>
     </div>
     <div class="video-use__header-right">
      <TheButton
        :width="180"
        :text="'Subscribe'"
        :padding="13"
        :disabledBtn="isUserSubscriber || isActive"
      />
      <IconBuy/>
     </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref, computed } from 'vue'
import IconBack from '@/assets/icons/video/Back.vue'
import IconBuy from '@/assets/icons/video/Buy.vue'
import TheButton from '@/components/UI/Buttons/TheButton.vue';

import type { UserType } from '@/types/types';
const props = defineProps({
  userInfo: {
    type: Object,
    default: () => ({}) as UserType,
  }
})

const authData = ref(localStorage.getItem('auth'));
const user = ref(authData.value ? JSON.parse(authData.value) : null);


const isActive = ref(false);
const isUserSubscriber = computed(() => {
  if (user.value.user) {
    if (props.userInfo.subscribers && props.userInfo.subscribers.length > 0) {
      return props.userInfo.subscribers.some((subscriber: { userId: string }) => subscriber.userId === user.value.user.id);
    }
    return false;
  }
  return true;
});


import { ShortUser } from '@/types/types';


</script>


<style lang="stylus">
.video-use
  margin-top 20px

  &__header
    display flex
    justify-content space-between
    align-items center

    &-right
      display flex
      align-items center
      gap 20px

      svg
        cursor pointer

    &-left
      display flex
      align-items center

      svg
        cursor pointer
    
    &-user
      margin-left 24px
      .user
        display flex
        align-items center
        cursor pointer

        &__img
          width 40px
          height 40px
          border-radius 40px

          img
            border-radius 40px
            width 100%
            height 100%
        
        &__name
          margin-left 8px
          h2
            color #FFF
            font-family Montserrat
            font-size 18px
            font-weight 600
          
          p
            color #999
            font-family Montserrat
            font-size 14px
            font-weight 400
            line-height 14px
            transform translateY(4px)
</style>