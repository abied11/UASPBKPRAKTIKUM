<template>
  <div class="dashboard">
    <div class="sidebar">
      <router-link to="/dashboard/tugas">Tugas Saya</router-link>
      <router-link to="/dashboard/jadwal">Jadwal Saya</router-link>
      <router-link to="/dashboard/dokumentasi">Dokumentasi</router-link>
      <router-link to="/dashboard/user">Pengguna</router-link>
      <router-link to="/dashboard/about">Tentang</router-link>
    </div>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  display: flex;
  background-image: url('/escheresque.png'); /* Background pattern */
  background-repeat: repeat;
  background-position: center;
  min-height: 100vh;
}

.sidebar {
  background: rgba(0, 0, 0, 0.8); /* Supaya sidebar semi transparan di atas pattern */
  color: white;
  padding: 20px;
  width: 200px;
  height: 100vh;
}

.sidebar a {
  display: block;
  color: white;
  margin: 10px 0;
  text-decoration: none;
}

.content {
  flex: 1;
  padding: 20px;
  color: white;
  background-color: rgba(0, 0, 0, 0.6); /* Supaya isi lebih mudah dibaca */
  min-height: 100vh;
}
</style>
