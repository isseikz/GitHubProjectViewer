<template>
    <div style="margin: 40px; padding: 20px; font-family: sans-serif;">
        <form @submit.prevent="authenticate()" style="display: flex; flex-direction: column;align-items: start;">
            <label for="">User Name:</label>
            <input v-model="user" type="text" style="padding: 10px; font-size: 16px; margin-top: 10px;">
            <label for="">Personal Access Token:</label>
            <input v-model="token" type="text" style="padding: 10px; font-size: 16px; margin-top: 10px;">

            <button type="submit" style="margin-top: 10px; padding: 10px; font-size: 16px; background-color: #007bff; color: #fff; border: none; border-radius: 4px;">Save</button>
        </form>
    </div>
</template>

<script lang="ts">
import { useTokenStore } from '@/stores/token'

export default {
    data() {
        return {
            user: '',
            token: ''
        }
    },
    methods: {
        authenticate() {
            if (this.token.length <= 0) {
                alert("Go to GitHub.com and generate Personal Access Token at setting page.")
                return;
            }

            if (this.user.length <= 0) {
                alert("Input your account name.");
                return;
            }

            useTokenStore().save(this.user, this.token)
            this.$router.push('/')
        }
    }
}
</script>
