<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-[#303030] p-6">
    <div class="w-full max-w-2xl bg-[#262626] p-6 rounded-xl shadow-lg text-[#EEEEEE]">
      <h1 class="text-3xl font-bold mb-4 flex items-center justify-center text-[#EEEEEE]">📚 Tugas Saya</h1>

      <div v-if="alert" class="mb-4 p-3 rounded-md text-white" :class="alert.class">
        {{ alert.message }}
      </div>

      <form @submit.prevent="tambahTugas" class="grid gap-3 mb-6">
        <input v-model="form.matkul" placeholder="Mata Kuliah" class="input-dark" required />
        <input v-model="form.keterangan" placeholder="Keterangan Tugas" class="input-dark" required />
        <input type="date" v-model="form.tanggal" class="input-dark" required />
        <input type="time" v-model="form.jam" class="input-dark" required />
        <button class="btn-dark-primary">Tambah Tugas</button>
      </form>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center"> <div
          v-for="(tugas, index) in daftarTugas"
          :key="index"
          class="p-4 rounded-lg border relative transition-all duration-300 border-[#404040] flex flex-col items-center text-center w-full max-w-xs md:max-w-none" :class="[
            tugas.selesai ? 'bg-green-700' :
            isTerlambat(tugas) ? 'bg-red-700' :
            isDekatDeadline(tugas) ? 'bg-yellow-700' :
            'bg-[#262626]'
          ]"
        >
          <h2 class="text-xl font-semibold text-[#EEEEEE]">{{ tugas.matkul }}</h2>
          <p class="text-sm text-[#CCCCCC]">{{ tugas.keterangan }}</p>
          <p class="text-sm text-[#AAAAAA]">Deadline: {{ tugas.tanggal }} {{ tugas.jam }}</p>

          <div class="mt-auto pt-3 flex gap-2 flex-wrap justify-center w-full"> <button @click="toggleSelesai(index)" class="btn-sm-dark bg-green-500 text-black">
              {{ tugas.selesai ? '✔️ Selesai' : 'Tandai Selesai' }}
            </button>
            <button @click="editIndex = index; editForm = { ...tugas }" class="btn-sm-dark bg-blue-500 text-black">Edit</button>
            <button @click="hapusTugas(index)" class="btn-sm-dark bg-red-500 text-black">Hapus</button>
          </div>

          <div v-if="editIndex === index" class="mt-3 grid gap-2 w-full"> <input v-model="editForm.matkul" class="input-dark" />
            <input v-model="editForm.keterangan" class="input-dark" />
            <input type="date" v-model="editForm.tanggal" class="input-dark" />
            <input type="time" v-model="editForm.jam" class="input-dark" />
            <button @click="simpanEdit(index)" class="btn-sm-dark bg-purple-500">Simpan</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// (Bagian script Anda tidak perlu diubah)
export default {
  data() {
    return {
      form: {
        matkul: '',
        keterangan: '',
        tanggal: '',
        jam: ''
      },
      daftarTugas: [],
      editForm: {},
      editIndex: null,
      alert: null
    }
  },
  mounted() {
    const saved = localStorage.getItem('daftarTugas')
    if (saved) {
      this.daftarTugas = JSON.parse(saved)
    }
  },
  methods: {
    simpanLocal() {
      localStorage.setItem('daftarTugas', JSON.stringify(this.daftarTugas))
    },
    tambahTugas() {
      this.daftarTugas.push({ ...this.form, selesai: false })
      this.form = { matkul: '', keterangan: '', tanggal: '', jam: '' }
      this.simpanLocal()
      this.showAlert('Tugas berhasil ditambahkan!', 'bg-blue-600')
    },
    hapusTugas(index) {
      this.daftarTugas.splice(index, 1)
      this.editIndex = null
      this.simpanLocal()
      this.showAlert('Tugas berhasil dihapus!', 'bg-red-600')
    },
    toggleSelesai(index) {
      this.daftarTugas[index].selesai = !this.daftarTugas[index].selesai
      this.simpanLocal()
      if (this.daftarTugas[index].selesai) {
        this.showAlert('Tugas ditandai selesai! 🎉', 'bg-green-600')
      } else {
        this.showAlert('Tugas ditandai belum selesai.', 'bg-yellow-600')
      }
    },
    simpanEdit(index) {
      this.daftarTugas.splice(index, 1, { ...this.editForm })
      this.editIndex = null
      this.simpanLocal()
      this.showAlert('Tugas berhasil diedit!', 'bg-blue-600')
    },
    isTerlambat(tugas) {
      const now = new Date()
      const deadline = new Date(`${tugas.tanggal}T${tugas.jam}`)
      return !tugas.selesai && deadline < now
    },
    isDekatDeadline(tugas) {
      const now = new Date()
      const deadline = new Date(`${tugas.tanggal}T${tugas.jam}`)
      const diff = (deadline - now) / (1000 * 60 * 60) // jam
      return !tugas.selesai && diff > 0 && diff <= 6
    },
    showAlert(message, colorClass) {
      this.alert = {
        message: message,
        class: colorClass
      }
      setTimeout(() => {
        this.alert = null
      }, 3000)
    }
  }
}
</script>

<style scoped>
/* (Bagian style Anda tidak perlu diubah, kecuali jika ada konflik) */
.input-dark {
  padding: 0.5rem;
  border: 1px solid #404040;
  border-radius: 0.5rem;
  width: 100%;
  background-color: #404040;
  color: #EEEEEE;
}

.input-dark::placeholder {
    color: #AAAAAA;
}

.input-dark:focus {
    outline: none;
    border-color: #673AB7;
    box-shadow: 0 0 0 2px rgba(103, 58, 183, 0.5);
}

.btn-dark-primary {
  background: #673AB7;
  color: white;
  padding: 0.5rem;
  border: none;
  border-radius: 0.5rem;
  width: 100%;
  transition: background-color 0.3s ease;
}

.btn-dark-primary:hover {
  background: #5E35B1;
}

.btn-sm-dark {
  padding: 0.3rem 0.6rem;
  border: none;
  border-radius: 0.4rem;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;
}

.btn-sm-dark.bg-green-500:hover { background-color: #43A047; }
.btn-sm-dark.bg-blue-500:hover { background-color: #1976D2; }
.btn-sm-dark.bg-red-500:hover { background-color: #D32F2F; }
.btn-sm-dark.bg-purple-500:hover { background-color: #5E35B1; }


.bg-blue-600 { background-color: #1976D2; }
.bg-green-600 { background-color: #388E3C; }
.bg-red-600 { background-color: #D32F2F; }
.bg-yellow-600 { background-color: #FBC02D; }

.bg-green-700 { background-color: #388E3C; color: white; }
.bg-red-700 { background-color: #D32F2F; color: white; }
.bg-yellow-700 { background-color: #FBC02D; color: #333; }

</style>