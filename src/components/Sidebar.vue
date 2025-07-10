<template>
  <div class="sidebar">
    <ul>
      <li><router-link to="/dashboard">HOME</router-link></li>
      <li>Tugas Saya</li>
      <li>Jadwal Saya</li>
      <li>Dokumentasi</li>
      <li>USER</li>
      <li>ABOUT</li>
    </ul>
  </div>
</template>

<style scoped>
.sidebar {
  width: 200px;
  background: #222;
  color: white;
  padding: 10px;
  height: 100vh;
}
.sidebar ul {
  list-style: none;
  padding: 0;
}
.sidebar li {
  margin: 10px 0;
}
</style>
