<template>
  <div class="profile-edit">
    <div class="profile-edit__head">
      <div class="profile-edit__head-title">Edit profile</div>

      <TheButton text="Save" :padding="13" :width="180" @click="saveProfile"/>
    </div>

    <div class="profile-edit__row">
      <div class="profile-edit__upload">
        <div class="profile-edit__upload-image" @click="openPhotoInput">
          <UploadIcon/>

          <input
              type="file"
              ref="photoInput"
              style="display: none"
              @change="handlePhotoChange($event)"
              accept="image/*"
          />

          <img v-if="photoPreview" :src="photoPreview" alt="">
        </div>

        <div class="profile-edit__upload-info">
          <div class="profile-edit__upload-name">Information about adding photo</div>

          <div class="profile-edit__upload-description">
            Information about adding photo. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
            Velit officia consequat duis enim velit mollit.
          </div>
        </div>
      </div>

      <div class="profile-edit__upload">
        <div class="profile-edit__upload-cover" @click="openCoverInput">
          <CoverIcon/>

          <div class="profile-edit__upload-rect">
            <UploadIcon/>

            <img v-if="coverPreview" :src="coverPreview" alt="">
          </div>

          <input
              type="file"
              ref="coverInput"
              style="display: none"
              @change="handleCoverChange($event)"
              accept="image/*"
          />
        </div>

        <div class="profile-edit__upload-info">
          <div class="profile-edit__upload-name">Information about adding cover</div>

          <div class="profile-edit__upload-description">
            Information about adding photo. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
            Velit officia consequat duis enim velit mollit.
          </div>
        </div>
      </div>
    </div>

    <div class="profile-edit__row">
      <div class="profile-edit__input-wrapper">
        <div class="profile-edit__input-label">First Name</div>

        <TheInput
            placeholder="Your First Name"
            :padding="15"
            v-model="formData.firstName"
        />
      </div>

      <div class="profile-edit__input-wrapper">
        <div class="profile-edit__input-label">Gender</div>

        <div class="profile-edit__row">
          <div class="profile-edit__input-radio" v-for="(gender, i) in genders" :key="i" @click="formData.gender = gender">
            <TheRadioInput :state="formData.gender === gender"/>

            <span>{{ gender }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="profile-edit__row">
      <div class="profile-edit__input-wrapper">
        <div class="profile-edit__input-label">Last Name</div>

        <TheInput
            placeholder="Your Last Name"
            :padding="15"
            v-model="formData.lastName"
        />
      </div>

      <div class="profile-edit__input-wrapper">
        <div class="profile-edit__input-label">Date of birthday</div>

        <input class="profile-edit__input-date" type="date" @click.prevent>
      </div>
    </div>

    <div class="profile-edit__row">
      <div class="profile-edit__input-wrapper">
        <div class="profile-edit__input-label">Address</div>

        <TheInput
            placeholder="Your Address"
            :padding="15"
            v-model="formData.address"
        />
      </div>

      <div class="profile-edit__input-wrapper">
        <div class="profile-edit__input-label">LLC</div>

        <TheInput
            placeholder="Your LLC"
            :padding="15"
            v-model="formData.llc"
        />
      </div>
    </div>

    <div class="profile-edit__input-wrapper">
      <div class="profile-edit__input-label">Description</div>

      <TheInput
          placeholder="Description"
          :padding="15"
          v-model="formData.description"
      />
    </div>

    <div class="profile-edit__row">
      <div class="profile-edit__input-wrapper">
        <div class="profile-edit__input-label">Vimeo account</div>

        <TheInput
            placeholder="Add your Vimeo account"
            :padding="15"
            v-model="formData.vimeo"
        />
      </div>

      <div class="profile-edit__input-wrapper">
        <div class="profile-edit__input-label">Instagram account</div>

        <TheInput
            placeholder="Add your Instagram account"
            :padding="15"
            v-model="formData.instagram"
        />
      </div>
    </div>

    <div class="profile-edit__row">
      <div class="profile-edit__input-wrapper">
        <div class="profile-edit__input-label">Facebook account</div>

        <TheInput
            placeholder="Add your Facebook account"
            :padding="15"
            v-model="formData.facebook"
        />
      </div>

      <div class="profile-edit__input-wrapper">
        <div class="profile-edit__input-label">Twitter account</div>

        <TheInput
            placeholder="Add your Twitter account"
            :padding="15"
            v-model="formData.twitter"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {Ref} from 'vue'
import {ref, onMounted} from 'vue'
import {storeToRefs} from "pinia";
import {useAuthStore} from "@/stores/auth";
import {doc, getFirestore, setDoc} from "firebase/firestore";
import {getDownloadURL, getStorage, ref as storageRef, uploadBytes} from "firebase/storage";
import TheRadioInput from '@/components/UI/RadioInput/TheRadioInput.vue'
import TheButton from '@/components/UI/Buttons/TheButton.vue'
import TheInput from '@/components/UI/Inputs/TheInput.vue'
import UploadIcon from '@/assets/icons/Upload/UploadIcon.vue'
import CoverIcon from '@/assets/icons/Upload/CoverIcon.vue'
import type {UserType} from "@/types/types";
import {User} from "@/types/types";


const db = getFirestore()
const storage = getStorage()
const authStore = useAuthStore()
const {user} = storeToRefs(authStore)

const formData: Ref<UserType> = ref(new User())

const photoInput = ref<HTMLInputElement | null>(null)
const coverInput = ref<HTMLInputElement | null>(null)

function openPhotoInput() {
  if (photoInput.value) {
    photoInput.value.click();
  }
}

function openCoverInput() {
  if (coverInput.value) {
    coverInput.value.click();
  }
}

const photo: Ref<File | null> = ref(null)
const cover: Ref<File | null> = ref(null)
const photoPreview = ref('')
const coverPreview = ref('')
const genders = ['Male', 'Female', 'None']

function handlePhotoChange(event: Event) {
  const target = event.target as HTMLInputElement;
  const files = target.files;

  if (files && files.length > 0) {
    photo.value = files[0];
    photoPreview.value = URL.createObjectURL(files[0])
  }
}

function handleCoverChange(event: Event) {
  const target = event.target as HTMLInputElement;
  const files = target.files;

  if (files && files.length > 0) {
    cover.value = files[0];
    coverPreview.value = URL.createObjectURL(files[0])
  }
}

onMounted(() => {
  formData.value = user.value as UserType
  photoPreview.value = user.value!.photo.link
  coverPreview.value = user.value!.cover.link
})

async function saveProfile() {
  const date = Date.now()

  if (photo.value !== null) {
    let photoName = ''
    if (!user.value!.photo.id) {
      photoName = 'pfp-' + date
    } else {
      photoName = user.value!.photo.id
    }
    const pfpRef = storageRef(storage, 'profile-pictures/' + photoName);
    await uploadBytes(pfpRef, photo.value).then(async () => {
      await getDownloadURL(storageRef(storage, 'profile-pictures/' + photoName))
          .then((url) => {
            formData.value.photo.id = photoName
            formData.value.photo.link = url
          })
          .catch((error) => {
            console.log(error);
          });
    })
  }

  if (cover.value !== null) {
    let coverName = ''
    if (!user.value!.cover.id) {
      coverName = 'pfp-' + date
    } else {
      coverName = user.value!.cover.id
    }
    const coverRef = storageRef(storage, 'covers/' + coverName);
    await uploadBytes(coverRef, cover.value).then(async () => {
      await getDownloadURL(storageRef(storage, 'covers/' + coverName))
          .then((url) => {
            formData.value.cover.id = coverName
            formData.value.cover.link = url
          })
          .catch((error) => {
            console.log(error);
          });
    })
  }

  await setDoc(doc(db, 'publicUsers', formData.value.id), JSON.parse(JSON.stringify(formData.value)))
}
</script>

<style lang="stylus">
.profile-edit
  display flex
  margin 0 auto
  max-width 920px
  align-items center
  flex-direction column

  @media screen and (max-width: 1024px)
    max-width 100%
    padding 0 24px

  &__head
    width 100%
    display flex
    padding 16px 0
    margin-bottom 16px
    align-items center
    justify-content space-between
    border-bottom 1px solid #222

    @media screen and (max-width: 768px)
      padding 8px 0
      margin-bottom 32px
      border none

    &-title
      color #FFF
      font-size 24px
      font-weight 500

  &__row
    width 100%
    display flex
    align-items center
    justify-content space-between

    @media screen and (max-width: 768px)
      flex-direction column

    & ^[-1]__upload, & ^[-1]__input-wrapper
      max-width 436px

      &:last-child
        margin-left 28px

        @media screen and (max-width: 768px)
          margin-left 0

  &__upload
    display flex
    align-items center
    margin-bottom 31px

    @media screen and (max-width: 768px)
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

    &-cover
      width 120px
      height 120px
      flex-shrink 0
      cursor pointer
      position relative
      margin-right 24px

    &-rect
      top 10px
      left 10px
      width 100px
      height 59px
      display flex
      overflow hidden
      position absolute
      border-radius 8px
      background #AD7955
      align-items center
      justify-content center

      img
        z-index 1
        width 100%
        height 100%
        object-fit cover
        position absolute

      svg
        width 26px
        height 26px

        path
          fill #653012

    &-name
      color #FFF
      margin-bottom 8px

    &-description
      color #999
      font-size 12px

  &__input

    &-wrapper
      width 100%
      margin-bottom 31px

      @media screen and (max-width: 768px)
        max-width 436px
        margin-bottom 24px

      .profile-edit__row
        flex-direction row

    &-label
      color #FFF
      font-size 14px
      margin-bottom 4px
      line-height 18px

    &-radio
      width 100%
      display flex
      padding 10px
      cursor pointer
      max-width 129px
      background #222
      border-radius 8px
      align-items center
      margin-right 16px

      &:last-child
        margin-right 0

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
</style>
