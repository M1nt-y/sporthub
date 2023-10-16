import { defineStore } from 'pinia';

export const stateVideo = defineStore({
  id: 'stateVideo',
  state: () => ({
    video: null as File | null,
    perview: null as File | null,
    stateVideo: null as Boolean | null,
  }),
});