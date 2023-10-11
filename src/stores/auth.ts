import {ref} from 'vue'
import {defineStore} from 'pinia'
import type {UserType} from '@/types/types'

export const useAuthStore = defineStore('auth', () => {
    const user = ref<UserType | null>(null)
    const currentUser = ref<{} | null>(null)

    return {user, currentUser}
}, {persist: true})
