<template>
  <div
      class="ui-input"
      :class="{
        'ui-input_search': search, // отображение иконки поиска справа
        'ui-input_search-left': searchLeft // отображение иконки поиска слева
      }"
  >
    <input
        @blur="$emit('blur')"
        @input="emitInput($event)"
        :value="modelValue"
        class="ui-input__item"
        :type="TYPE_INPUT"
        :placeholder="placeholder"
        :style="{
          paddingTop: padding + 'px',
          paddingBottom: padding + 'px',
        }"
    />

    <IconSearch
        class="ui-input__search"
        v-if="search || searchLeft"
    />

    <IconShowPassOne
        @click="showPassword"
        v-if='password && SHOW_PASSWORD'
        class="ui-input__password"
    />

    <IconShowPassTwo
        @click="showPassword"
        v-if='password && !SHOW_PASSWORD'
        class="ui-input__password"
    />
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import IconSearch from '@/assets/icons/Button/Search.vue'
import IconShowPassOne from '@/assets/icons/Input/ShowPassOne.vue'
import IconShowPassTwo from '@/assets/icons/Input/ShowPassTwo.vue'


const props = defineProps({
  padding: {
    type: Number,
    default: 10,
  },
  placeholder: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  search: {
    type: Boolean,
    default: false,
  },
  searchLeft: {
    type: Boolean,
    default: false,
  },
  password: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: [Number, String],
    default: undefined
  }
})

const emits = defineEmits(['update:modelValue', 'blur'])

function emitInput(event: Event) {
  const target = event.target as HTMLInputElement
  emits('update:modelValue', target.value)
}

const TYPE_INPUT = ref(props.type);
const SHOW_PASSWORD = ref(false);

function toggleInputType() {
  if (TYPE_INPUT.value === 'text') {
    TYPE_INPUT.value = 'password';
  } else {
    TYPE_INPUT.value = 'text';
  }
}

function showPassword() {
  SHOW_PASSWORD.value = !SHOW_PASSWORD.value;
  toggleInputType();
}

onMounted(() => {
  if (props.password) {
    toggleInputType();
  }
})
</script>

<style lang="stylus">
.ui-input
  position relative

  &__password
    position absolute
    cursor pointer
    right 16px
    top 50%
    width 19px
    height 19px
    margin-top -9.5px

  &__search
    position absolute
    pointer-events none
    right 16px
    top 50%
    width 19px
    height 19px
    margin-top -9.5px

  &__item
    width 100%
    border-radius 8px
    background #222
    color #FFF
    padding 0 16px
    overflow hidden
    border 0
    outline 0
    font-family sans-serif
    font-size 16px
    font-weight 400

    &::placeholder
      color #999

    &:focus
      outline 2px solid #FFF

  &_search
    & ^[0]__item
      padding-right 40px

  &_search-left
    & ^[0]__item
      padding-left 50px

    & ^[0]__search
      right unset
      left 20px
</style>
