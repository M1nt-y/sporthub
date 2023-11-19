<template>
  <header class="header">
    <div class="header__wrapper">
      <div class="header__burger">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <RouterLink to="/" class="header__logo">
        <LogoIcon/>

        <div class="header__logo-title">sporthub</div>
      </RouterLink>
    </div>

    <div class="header__wrapper">
      <div class="header__icon">
        <SearchIcon/>
      </div>

      <div class="header__icon header__icon_second">
        <NotificationIcon/>
      </div>

      <RouterLink to="/profile/videos" class="header__link" v-if="user && user.isBusiness">
        Video
      </RouterLink>

      <RouterLink to="/profile/stores" class="header__link" v-if="user && user.isBusiness">
        Store
      </RouterLink>

      <div class="header__profile" v-if="currentUser">
        <div class="header__profile-bar" @click.stop="displayLinks = !displayLinks">
          <div class="header__profile-image">
            <img v-if="user && user.photo.link" :src="user.photo.link" alt="">
          </div>

          <div class="header__profile-text">Profile</div>
        </div>

        <div class="header__profile-dropdown" v-if="displayLinks" @click.stop>
          <RouterLink to="/profile" class="header__profile-link">
            <div class="header__profile-icon">
              <EditIcon/>
            </div>

            Edit profile
          </RouterLink>

          <div class="header__profile-link" v-if="user && !user.isBusiness">
            <div class="header__profile-icon">
              <BusinessIcon/>
            </div>

            Switch to business account
          </div>

          <div class="header__profile-line"/>

          <div class="header__profile-link" @click="handleSignOut">
            <div class="header__profile-icon">
              <LogoutIcon/>
            </div>

            Log out
          </div>
        </div>
      </div>

      <RouterLink to="/login" v-else>
        <TheButton text="Sign In" :padding="12" :width="120"/>
      </RouterLink>

    </div>
  </header>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue'
import {storeToRefs} from 'pinia'
import {useAuthStore} from '@/stores/auth'
import {getAuth, onAuthStateChanged, signOut} from 'firebase/auth'
import {collection, getDocs, getFirestore, query, where} from 'firebase/firestore'
import LogoIcon from '@/assets/icons/Header/LogoIcon.vue'
import EditIcon from '@/assets/icons/Header/EditIcon.vue'
import SearchIcon from '@/assets/icons/Header/SearchIcon.vue'
import LogoutIcon from '@/assets/icons/Header/LogoutIcon.vue'
import BusinessIcon from '@/assets/icons/Header/BusinessIcon.vue'
import NotificationIcon from '@/assets/icons/Header/NotificationIcon.vue'
import TheButton from '@/components/UI/Buttons/TheButton.vue'
import type {UserType} from '@/types/types'


const auth = getAuth()
const db = getFirestore()
const authStore = useAuthStore()
const {currentUser, user} = storeToRefs(authStore)
const usersRef = collection(db, 'publicUsers')

const displayLinks = ref(false)

onMounted(async () => {
  document.addEventListener('click', () => {
    displayLinks.value = false
  })

  await onAuthStateChanged(auth, async (userRef) => {
    if (userRef && !user.value) {
      const q = query(usersRef, where("email", "==", userRef.email))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        user.value = doc.data() as UserType
      });
    } else if (!userRef) {
      user.value = null
    }
  });
})

async function handleSignOut() {
  currentUser.value = null

  localStorage.removeItem('isAuthorised')
  localStorage.removeItem('isCreator')

  await signOut(auth)
}
</script>

<style lang="stylus">
.header
  height 62px
  display flex
  background #111
  padding 16px 24px
  align-items center
  justify-content space-between

  @media screen and (max-width 576px)
    padding 16px

  &__wrapper
    display flex
    align-items center

    .ui-button
      font-size 14px
      margin-left 16px

  &__burger
    display none
    padding 9px 7px
    margin-right 16px

    @media screen and (max-width 576px)
      display block

    span
      height 2px
      width 18px
      display block
      background #FFF
      margin-bottom 4px

      &:last-child
        margin-bottom 0

  &__logo
    display flex
    align-items center

    &-title
      color #FFF
      font-size 20px
      font-weight 600
      margin-left 4px
      transition color 0.3s ease

      ^[-1]:hover &
        color #AD7955

  &__icon
    padding 8px
    display flex
    cursor pointer
    margin-left 16px
    align-items center

    @media screen and (max-width 576px)
      padding 4px

    &_second
      @media screen and (max-width 576px)
        display none

    svg
      path
        transition fill 0.3s ease

    &:hover

      svg
        path
          fill #AD7955

  &__link
    color #BBB
    font-size 16px
    cursor pointer
    margin-left 24px
    padding 14px 10px

    @media screen and (max-width 576px)
      display none

  &__profile
    margin-left 24px
    position relative

    @media screen and (max-width 576px)
      display none

    &-bar
      display flex
      cursor pointer
      padding 7px 10px
      user-select none
      align-items center

    &-image
      width 24px
      height 24px
      overflow hidden
      background wheat
      border-radius 24px

      img
        width 100%
        height 100%
        object-fit cover

    &-text
      padding-left 10px

    &-text, &-link
      color #BBB
      font-size 16px

    &-link
      display flex
      cursor pointer
      align-items center
      margin-bottom 16px
      transition color 0.3s ease

      &:last-child
        margin-top 16px
        margin-bottom 0

      &:hover
        color #FFF

        svg
          path
            fill #FFF

    &-icon
      margin-right 8px

      svg
        path
          transition fill 0.3s ease

    &-line
      width 100%
      height 1px
      background #111

    &-dropdown
      display flex
      padding 16px
      background #222
      min-width 200px
      min-height 111px
      max-height 160px
      border-radius 8px
      position absolute
      flex-direction column
      justify-content space-between
      top 42px
      right 0

</style>
