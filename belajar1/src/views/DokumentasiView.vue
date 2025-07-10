<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
    <div class="w-full max-w-2xl bg-white p-6 rounded-xl shadow-md">
      <h1 class="text-3xl font-bold mb-6 text-center">📁 Dokumentasi</h1>

      <!-- Form Upload -->
      <form @submit.prevent="tambahDokumentasi" class="grid gap-4 mb-6">
        <input v-model="form.judul" placeholder="Judul / Deskripsi" class="input" required />
        <input type="file" multiple @change="handleFileUpload" class="input" required />
        <button class="btn">Upload</button>
      </form>

      <!-- Daftar Dokumentasi -->
      <div v-if="dokumentasi.length" class="grid gap-4">
        <div
          v-for="(item, index) in dokumentasi"
          :key="index"
          class="border p-4 rounded-lg bg-gray-100"
        >
          <div class="flex justify-between items-center">
            <h2 class="font-semibold">{{ item.judul }}</h2>
            <button @click="togglePreview(index)" class="text-sm text-blue-600 hover:underline">
              {{ item.show ? 'Sembunyikan' : 'Lihat' }}
            </button>
          </div>

          <div v-if="item.show" class="mt-3 space-y-3">
            <div v-for="(file, i) in item.files" :key="i">
              <p class="text-sm text-gray-600">📄 {{ file.fileName }}</p>
              <img
                v-if="isImage(file.fileName)"
                :src="file.preview"
                class="w-48 rounded shadow"
              />
              <a
                v-else
                :href="file.preview"
                target="_blank"
                class="text-blue-600 underline block"
              >Lihat File</a>
            </div>
            <button @click="hapusDokumentasi(index)" class="btn-sm bg-red-500 mt-3">Hapus</button>
          </div>
        </div>
      </div>
      <p v-else class="text-gray-500 text-center">Belum ada dokumentasi yang diunggah.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        judul: '',
        files: []
      },
      dokumentasi: []
    }
  },
  mounted() {
    const data = localStorage.getItem('dokumentasi')
    if (data) {
      this.dokumentasi = JSON.parse(data)
    }
  },
  methods: {
    handleFileUpload(event) {
      const selectedFiles = Array.from(event.target.files)
      this.form.files = []

      selectedFiles.forEach(file => {
        const reader = new FileReader()
        reader.onload = () => {
          this.form.files.push({
            fileName: file.name,
            preview: reader.result
          })
        }
        reader.readAsDataURL(file)
      })
    },
    tambahDokumentasi() {
      if (this.form.files.length === 0) return
      this.dokumentasi.push({
        judul: this.form.judul,
        files: this.form.files,
        show: false
      })
      this.form = { judul: '', files: [] }
      localStorage.setItem('dokumentasi', JSON.stringify(this.dokumentasi))
    },
    hapusDokumentasi(index) {
      this.dokumentasi.splice(index, 1)
      localStorage.setItem('dokumentasi', JSON.stringify(this.dokumentasi))
    },
    togglePreview(index) {
      this.dokumentasi[index].show = !this.dokumentasi[index].show
      localStorage.setItem('dokumentasi', JSON.stringify(this.dokumentasi))
    },
    isImage(fileName) {
      return /\.(jpg|jpeg|png|gif)$/i.test(fileName)
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
.btn-sm {
  padding: 0.3rem 0.6rem;
  border: none;
  border-radius: 0.4rem;
  font-size: 0.9rem;
  color: white;
}
</style>
