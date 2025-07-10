<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
    <div class="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
      <h1 class="text-2xl font-bold mb-4 text-center">🧍‍♂️ Isi Data Diri</h1>

      <!-- FORM INPUT DATA DIRI -->
      <form v-if="!tersimpan || modeEdit" @submit.prevent="simpanDataDiri" class="grid gap-4">
        <input v-model="dataDiri.nama" placeholder="Nama" class="input" required />
        <input v-model="dataDiri.nim" placeholder="NIM" class="input" required />
        <input v-model="dataDiri.kelas" placeholder="Kelas" class="input" required />
        <button class="btn">{{ modeEdit ? 'Update' : 'Simpan' }}</button>
        <button v-if="modeEdit" type="button" @click="batalEdit" class="btn-cancel">Batal</button>
      </form>

      <!-- MENAMPILKAN DATA YANG SUDAH TERSIMPAN -->
      <div v-else class="mt-4 bg-gray-50 p-4 rounded-lg">
        <p><strong>Nama:</strong> {{ dataDiri.nama }}</p>
        <p><strong>NPM:</strong> {{ dataDiri.nim }}</p>
        <p><strong>Kelas/Jurusan:</strong> {{ dataDiri.kelas }}</p>
        <button @click="editData" class="btn mt-4">Edit</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataDiri: {
        nama: '',
        nim: '',
        kelas: ''
      },
      tersimpan: false,
      modeEdit: false
    }
  },
  mounted() {
    const saved = localStorage.getItem('dataDiri')
    if (saved) {
      this.dataDiri = JSON.parse(saved)
      this.tersimpan = true
    }
  },
  methods: {
    simpanDataDiri() {
      localStorage.setItem('dataDiri', JSON.stringify(this.dataDiri))
      this.tersimpan = true
      this.modeEdit = false
      alert("✅ Data diri berhasil disimpan!")
    },
    editData() {
      this.modeEdit = true
    },
    batalEdit() {
      const saved = localStorage.getItem('dataDiri')
      if (saved) {
        this.dataDiri = JSON.parse(saved)
      }
      this.modeEdit = false
    }
  }
}
</script>

<style scoped>
.input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  width: 100%;
}
.btn {
  background: #4f46e5;
  color: white;
  padding: 0.5rem;
  border: none;
  border-radius: 0.5rem;
  width: 100%;
}
.btn-cancel {
  background: #ccc;
  color: #000;
  padding: 0.5rem;
  border: none;
  border-radius: 0.5rem;
  width: 100%;
}
</style>
