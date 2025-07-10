<template>
  <div class="login-box">
    <h2>Login</h2>
    <p v-if="error" class="error">Nama dan Password tidak boleh kosong !!!</p>
    <input v-model="username" placeholder="Username" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="handleLogin">Login</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const error = ref(false)
const router = useRouter()

const handleLogin = () => {
  if (!username.value || !password.value) {
    error.value = true
    return
  }
  error.value = false
  router.push('/dashboard')
}
</script>

<style scoped>
.login-box {
  max-width: 400px;
  margin: 100px auto;
  padding: 20px;
  border: 1px solid #ccc;
}
.error {
  color: red;
  margin-bottom: 10px;
}
</style>
