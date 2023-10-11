<template>
  <Transition name="fade" mode="out-in">
    <div class="signup" v-if="isLast">
      <div class="signup__title">Personal information</div>

      <div class="signup__upload">
        <div class="signup__upload-image" @click="openFileInput">
          <UploadIcon/>

          <input
              type="file"
              ref="fileInput"
              style="display: none"
              @change="handleFileInputChange($event)"
              accept="image/*"
          />

          <img v-if="preview" :src="preview" alt="">
        </div>

        <div class="signup__upload-info">
          <div class="signup__upload-name">Information about adding photo</div>

          <div class="signup__upload-description">
            Information about adding photo. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
            Velit officia consequat duis enim velit mollit.
          </div>
        </div>
      </div>

      <div class="signup__inputs">
        <div class="signup__inputs-wrapper">
          <div class="signup__inputs-label">Gender</div>

          <div class="signup__inputs-row">
            <div class="signup__inputs-radio" v-for="(gender, i) in genders" :key="i" @click="formData.gender = gender">
              <TheRadioInput :state="formData.gender === gender"/>

              <span>{{ gender }}</span>
            </div>
          </div>
        </div>

        <div class="signup__inputs-wrapper">
          <div class="signup__inputs-label">Date of birthday</div>

          <input class="signup__inputs-date" type="date" v-model="formData.birthdate" @click.prevent>
        </div>
      </div>

      <div class="signup__buttons">
        <TheButton text="Back" :padding="13" :width="180" background @click="prevStep"/>

        <TheButton text="Sign up" :padding="13" :width="180" @click="finishSignup"/>
      </div>
    </div>

    <div class="signup" v-else-if="!isLast && isBusiness !== null">
      <div class="signup__title">Sign up</div>

      <div class="signup__inputs">
        <div class="signup__inputs-wrapper">
          <div class="signup__inputs-label">First Name</div>

          <TheInput
              placeholder="Your First Name"
              :padding="16"
              v-model="formData.firstName"
              @blur="v$.firstName.$touch"
          />

          <div class="signup__inputs-error" v-if="v$.firstName.$error">Field is required</div>
        </div>

        <div class="signup__inputs-wrapper">
          <div class="signup__inputs-label">Last Name</div>

          <TheInput
              placeholder="Your Last Name"
              :padding="16"
              v-model="formData.lastName"
              @blur="v$.lastName.$touch"
          />

          <div class="signup__inputs-error" v-if="v$.lastName.$error">Field is required</div>
        </div>

        <div class="signup__inputs-wrapper">
          <div class="signup__inputs-label">Email</div>

          <TheInput
              placeholder="Your Email"
              :padding="16"
              v-model="formData.email"
              @blur="v$.email.$touch"
          />

          <div class="signup__inputs-error" v-if="v$.email.$error">{{ emailError }}</div>
        </div>

        <div class="signup__inputs-wrapper">
          <div class="signup__inputs-label">Password</div>

          <TheInput
              placeholder="Your password"
              :padding="16"
              password v-model="formData.password"
              @blur="v$.password.$touch"
          />

          <div class="signup__inputs-error" v-if="v$.password.$error">Field is required</div>
        </div>
      </div>

      <TheButton text="Sign up" :padding="13" :width="180" @click="nextStep"/>

      <div class="signup__text">
        Already have an account?

        <RouterLink to="/login" class="signup__text-link">Sign in</RouterLink>
      </div>
    </div>

    <div class="signup" v-else-if="!isLast && isBusiness === null">
      <TheButton
          class="signup__button"
          text="I am a content creator"
          :padding="13"
          :width="220"
          @click="isBusiness = true"
      />

      <TheButton
          class="signup__button"
          text="I am a regular user"
          :padding="13"
          :width="220"
          @click="isBusiness = false"
      />
    </div>
  </Transition>
</template>

<script setup lang="ts">
import type {Ref} from 'vue'
import {computed, ref} from 'vue'
import {useRouter} from 'vue-router'
import {useVuelidate} from '@vuelidate/core'
import {required, email} from '@vuelidate/validators'
import {getStorage, ref as storageRef, uploadBytes, getDownloadURL} from 'firebase/storage'
import {getFirestore, collection, query, where, getDocs, doc, setDoc} from 'firebase/firestore'
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth'
import {useAuthStore} from '@/stores/auth'
import {storeToRefs} from 'pinia'
import {User} from '@/types/types'
import TheInput from '@/components/UI/Inputs/TheInput.vue'
import TheButton from '@/components/UI/Buttons/TheButton.vue'
import TheRadioInput from '@/components/UI/RadioInput/TheRadioInput.vue'
import UploadIcon from '@/assets/icons/Upload/UploadIcon.vue'


const router = useRouter()
const authStore = useAuthStore()
const {currentUser, user} = storeToRefs(authStore)

const auth = getAuth()
const db = getFirestore()
const storage = getStorage()
const usersRef = collection(db, 'publicUsers')

const isBusiness: Ref<boolean | null> = ref(null)
const isLast = ref(false)
const genders = ['Male', 'Female', 'None']

const rules = computed(() => {
  return {
    firstName: {required},
    lastName: {required},
    email: {required, email},
    password: {required},
  }
})

const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  gender: '',
  birthdate: '',
})

const v$ = useVuelidate(rules, formData)

const q = query(usersRef, where("email", "==", formData.value.email));
const isUsed = ref(false)
const emailError = computed(() => {
  if (!isUsed.value) {
    return 'Field is required'
  } else {
    return 'Email already in use'
  }
})

async function nextStep() {
  const result = await v$.value.$validate()
  if (!result) {
    return
  }
  const querySnapshot = await getDocs(q);
  if (querySnapshot.docs.length > 0) {
    isUsed.value = true
  } else {
    isLast.value = true
    isUsed.value = false
  }
}

const fileInput = ref<HTMLInputElement | null>(null)

function openFileInput() {
  if (fileInput.value) {
    fileInput.value.click();
  }
}

const photo: Ref<File | null> = ref(null)
const preview = ref('')

function handleFileInputChange(event: Event) {
  const target = event.target as HTMLInputElement;
  const files = target.files;

  if (files && files.length > 0) {
    photo.value = files[0];
    preview.value = URL.createObjectURL(files[0])
  }
}

function prevStep() {
  isLast.value = false
  photo.value = null
  preview.value = ''
  fileInput.value = null
}

async function finishSignup() {
  const date = Date.now()
  const userData = new User()
  userData.id = 'user-' + date
  userData.firstName = formData.value.firstName
  userData.lastName = formData.value.lastName
  userData.email = formData.value.email
  userData.gender = formData.value.gender
  userData.isBusiness = isBusiness.value!
  if (formData.value.birthdate) {
    userData.birthdate = formData.value.birthdate
  }
  if (photo.value !== null) {
    const pfpRef = storageRef(storage, 'profile-pictures/pfp-' + date);
    await uploadBytes(pfpRef, photo.value).then(async () => {
      await getDownloadURL(storageRef(storage, 'profile-pictures/pfp-' + date))
          .then((url) => {
            userData.photo.id = 'pfp-' + date
            userData.photo.link = url
          })
          .catch((error) => {
            console.log(error);
          });
    })
  }
  await setDoc(doc(db, 'publicUsers', userData.id), JSON.parse(JSON.stringify(userData)))
  await setDoc(doc(db, 'privateUsers', userData.id), {
    email: formData.value.email,
    password: formData.value.password,
    userId: userData.id
  })
  await createUserWithEmailAndPassword(auth, formData.value.email, formData.value.password)
      .then((userCredential) => {
        currentUser.value = userCredential.user
        user.value = userData
        router.push('/')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
}
</script>

<style scoped lang="stylus">
.fade-enter-active, .fade-leave-active
  transition opacity 0.5s ease

.fade-enter-from, .fade-leave-to
  opacity 0

.signup
  width 100%
  display flex
  padding 0 32px
  align-items center
  flex-direction column

  &__button
    margin 10px 0

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
      position relative
      margin-bottom 24px

      &:last-child
        margin-bottom 0

    &-row
      display flex
      align-items center
      justify-content space-between

    &-radio
      display flex
      padding 10px
      cursor pointer
      min-width 129px
      background #222
      border-radius 8px
      align-items center

      span
        color #FFF
        margin-left 8px
        font-size 14px

    &-date
      color #999
      width 100%
      border none
      outline none
      padding 16px
      font-size 16px
      background #222
      border-radius 8px

      &:in-range::-webkit-datetime-edit-year-field,
      &:in-range::-webkit-datetime-edit-month-field,
      &:in-range::-webkit-datetime-edit-day-field,
      &:in-range::-webkit-datetime-edit-text
        background transparent

      &::-webkit-inner-spin-button,
      &::-webkit-calendar-picker-indicator
        display none
        -webkit-appearance: none

    &-label
      color #FFF
      font-size 14px
      margin-bottom 4px
      line-height 18px

    &-error
      color #FFCCCC
      margin-top 4px
      font-size 12px
      font-weight 500
      position absolute

  &__text
    color #999
    font-size 16px
    line-height 22px
    margin-top 41px

    &-link
      color #AD7955
      margin-left 6px
      text-decoration underline

  &__upload
    display flex
    align-items center
    margin-bottom 24px

    &-image
      width 120px
      height 120px
      display flex
      flex-shrink 0
      cursor pointer
      overflow hidden
      position relative
      margin-right 24px
      border-radius 50%
      background #653012
      align-items center
      justify-content center

      img
        z-index 1
        width 100%
        height 100%
        object-fit cover
        position absolute

    &-name
      color #FFF
      margin-bottom 8px

    &-description
      color #999
      font-size 12px

  &__buttons
    width 100%
    display flex
    max-width 384px
    justify-content space-between
</style>
