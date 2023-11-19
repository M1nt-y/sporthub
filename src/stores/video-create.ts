import { defineStore } from 'pinia';

export const stateVideo = defineStore({
  id: 'stateVideo',
  state: () => ({
    video: null as File | null,
    preview: null as File | string | null,
    stateVideo: null as Boolean | null,
  }),
});