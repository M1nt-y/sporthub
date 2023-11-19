<template>
  <div class="login">
    <div class="login__title">Sign in</div>

    <div class="login__inputs">
      <div class="login__inputs-wrapper">
        <div class="login__inputs-label">Email</div>

        <TheInput placeholder="Your Email" :padding="16" v-model="email"/>
      </div>

      <div class="login__inputs-wrapper">
        <div class="login__inputs-label">
          Password

          <RouterLink to="/" class="login__text-link">Forgot password?</RouterLink>
        </div>

        <TheInput placeholder="Your password" :padding="16" password v-model="password"/>
      </div>
    </div>

    <TheButton text="Sign in" :padding="13" :width="180" @click="handleLogin"/>

    <div class="login__text">
      Don’t have an account?

      <RouterLink to="/signup" class="login__text-link">Sign up</RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {storeToRefs} from 'pinia'
import {useRouter} from 'vue-router'
import {useAuthStore} from '@/stores/auth'
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import {collection, getDocs, getFirestore, query, where} from 'firebase/firestore'
import TheInput from '@/components/UI/Inputs/TheInput.vue'
import TheButton from '@/components/UI/Buttons/TheButton.vue'
import type {UserType} from '@/types/types'


const auth = getAuth()
const db = getFirestore()
const router = useRouter()
const authStore = useAuthStore()
const {currentUser, user} = storeToRefs(authStore)
const usersRef = collection(db, 'publicUsers')


const email = ref('')
const password = ref('')

async function handleLogin() {
  await signInWithEmailAndPassword(auth, email.value, password.value)
      .then(async (userCredential) => {
        currentUser.value = userCredential.user
        const q = query(usersRef, where("email", "==", userCredential.user.email))
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
          user.value = doc.data() as UserType
        })
        localStorage.setItem('isAuthorised', 'true')
        if (user.value.isBusiness) {
          localStorage.setItem('isCreator', 'true')
        }
        await router.push('/')
      })
      .catch((error) => {
        console.log(error);
      })
}
</script>

<style scoped lang="stylus">
.login
  width 100%
  display flex
  padding 0 32px
  align-items center
  flex-direction column

  &__title
    color #FFF
    font-size 36px
    font-weight 500
    line-height 50px
    margin-bottom 38px

  &__inputs
    width 100%
    margin-bottom 38px

    &-wrapper
      width 100%
      margin-bottom 24px

      &:last-child
        margin-bottom 0

    &-label
      color #FFF
      display flex
      font-size 14px
      line-height 18px
      margin-bottom 4px
      align-items center
      justify-content space-between

  &__text
    color #999
    font-size 16px
    line-height 22px
    margin-top 41px

    &-link
      color #AD7955
      margin-left 6px
      text-decoration underline
</style>
