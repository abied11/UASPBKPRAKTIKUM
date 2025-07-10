<template>
  <div class="min-h-screen bg-gray-100 font-sans">
    <!-- HEADER / NAVBAR (Opsional) -->
    <header class="bg-indigo-600 text-white py-4 px-6">
      <h1 class="text-xl font-bold">📚 Daily Mahasiswa 📚</h1>
    </header>

    <!-- HALAMAN UTAMA (ROUTER) -->
    <main class="p-4">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body {
  margin: 0;
}
</style>
