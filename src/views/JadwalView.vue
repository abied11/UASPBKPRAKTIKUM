<template>
  <div class="min-h-screen bg-[#303030] py-10 px-4 flex justify-center">
    <div class="w-full max-w-4xl bg-[#262626] shadow-2xl rounded-xl p-8 text-[#EEEEEE]">
      <h1 class="text-4xl font-bold text-center text-[#EEEEEE] mb-8">
        <img src="https://via.placeholder.com/32/673AB7/FFFFFF?text=%20" alt="" class="inline-block align-middle mr-3 rounded-full">
        Jadwal Kuliah
      </h1>

      <form @submit.prevent="uploadGambar" class="mb-8 p-6 bg-[#2C2C2C] rounded-lg shadow-inner">
        <label class="block text-sm font-semibold text-[#CCCCCC] mb-3">Upload Gambar Jadwal</label>
        <div class="flex items-center gap-4">
            <label class="custom-file-input-dark flex-grow">
                Pilih File...
                <input type="file" @change="handleGambar" accept="image/*" class="hidden" />
            </label>
            <span v-if="gambarTemp" class="text-[#AAAAAA] truncate max-w-[150px]">{{ gambarTemp.name || 'File dipilih' }}</span>
            <span v-else class="text-gray-500 text-sm">Belum ada file dipilih.</span>
        </div>
        <button v-if="gambarTemp" class="btn-dark-primary mt-4 max-w-xs mx-auto block">Simpan Gambar</button>
      </form>

      <div v-if="gambarJadwal" class="mb-8 text-center p-6 bg-[#2C2C2C] rounded-lg shadow-inner">
        <h2 class="text-xl font-semibold mb-3 text-[#EEEEEE]">Gambar Jadwal Tersimpan</h2>
        <img :src="gambarJadwal" class="max-w-full mx-auto rounded-md shadow-lg border border-[#404040]" />
        <button @click="hapusGambar" class="btn-dark-danger mt-4">Hapus Gambar</button>
      </div>

      <form @submit.prevent="tambahJadwal" class="grid md:grid-cols-3 gap-4 mb-8 p-6 bg-[#2C2C2C] rounded-lg shadow-inner">
        <h2 class="text-xl font-semibold col-span-full mb-3 text-[#EEEEEE]">{{ editIndex !== null ? 'Edit Jadwal' : 'Tambah Jadwal Baru' }}</h2>
        <input v-model="form.hari" placeholder="Hari (Senin, Selasa...)" class="input-dark" required />
        <input v-model="form.matkul" placeholder="Mata Kuliah" class="input-dark" required />
        <input v-model="form.jam" placeholder="Jam (08.00 - 10.00)" class="input-dark" required />
        <button class="btn-dark-primary col-span-full mt-2">{{ editIndex !== null ? 'Simpan Perubahan' : 'Tambah Jadwal' }}</button>
      </form>

      <div v-if="jadwalList.length" class="space-y-4">
        <div
          v-for="(item, index) in jadwalList"
          :key="index"
          class="bg-[#2E2E2E] p-5 rounded-lg border border-[#404040] flex flex-col sm:flex-row justify-between items-start sm:items-center shadow-md hover:bg-[#3A3A3A] transition-colors duration-200"
        >
          <div class="mb-3 sm:mb-0">
            <h2 class="text-lg font-semibold text-[#EEEEEE]">{{ item.hari }} - {{ item.matkul }}</h2>
            <p class="text-sm text-[#AAAAAA] flex items-center">
                <svg class="w-4 h-4 mr-1 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                {{ item.jam }}
            </p>
          </div>
          <div class="flex gap-2 w-full sm:w-auto">
            <button @click="editData(index)" class="btn-dark-secondary flex-grow sm:flex-none">Edit</button>
            <button @click="hapusJadwal(index)" class="btn-dark-danger flex-grow sm:flex-none">Hapus</button>
          </div>
        </div>
      </div>
      <p v-else class="text-center text-gray-500 italic mt-6 p-4 bg-[#2C2C2C] rounded-lg">Belum ada jadwal yang ditambahkan.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        hari: '',
        matkul: '',
        jam: ''
      },
      jadwalList: [],
      gambarJadwal: null,
      gambarTemp: null, // Store the File object here
      editIndex: null
    }
  },
  mounted() {
    const data = localStorage.getItem('jadwalList')
    const gambar = localStorage.getItem('gambarJadwal')
    if (data) this.jadwalList = JSON.parse(data)
    if (gambar) this.gambarJadwal = gambar
  },
  methods: {
    tambahJadwal() {
      if (!this.form.hari || !this.form.matkul || !this.form.jam) {
        alert('Harap isi semua kolom jadwal!');
        return;
      }
      if (this.editIndex !== null) {
        this.jadwalList.splice(this.editIndex, 1, { ...this.form })
        this.editIndex = null
      } else {
        this.jadwalList.push({ ...this.form })
      }
      localStorage.setItem('jadwalList', JSON.stringify(this.jadwalList))
      this.form = { hari: '', matkul: '', jam: '' }
    },
    editData(index) {
      this.form = { ...this.jadwalList[index] }
      this.editIndex = index
    },
    hapusJadwal(index) {
      if (confirm('Apakah Anda yakin ingin menghapus jadwal ini?')) {
        this.jadwalList.splice(index, 1)
        localStorage.setItem('jadwalList', JSON.stringify(this.jadwalList))
      }
    },
    handleGambar(event) {
      const file = event.target.files[0]
      if (file) {
        this.gambarTemp = file; // Store the actual File object
        const reader = new FileReader()
        reader.onload = () => {
          this.gambarJadwal = reader.result // This is for preview
        }
        reader.readAsDataURL(file)
      } else {
        this.gambarTemp = null;
        this.gambarJadwal = null;
      }
    },
    uploadGambar() {
      if (this.gambarTemp) {
        // You would typically upload this.gambarTemp to a server here.
        // For local storage, we'll store the Data URL again.
        const reader = new FileReader();
        reader.onload = () => {
            localStorage.setItem('gambarJadwal', reader.result);
            // After saving, clear gambarTemp to prevent re-uploading the same file
            this.gambarTemp = null;
            alert('Gambar jadwal berhasil disimpan!');
        };
        reader.readAsDataURL(this.gambarTemp);
      } else {
          alert('Tidak ada gambar yang dipilih untuk disimpan.');
      }
    },
    hapusGambar() {
      if (confirm('Apakah Anda yakin ingin menghapus gambar jadwal?')) {
        this.gambarJadwal = null
        this.gambarTemp = null
        localStorage.removeItem('gambarJadwal')
        alert('Gambar jadwal berhasil dihapus!');
      }
    }
  }
}
</script>

<style scoped>
/* Base Dark Theme Colors */
.bg-\[\#303030\] { background-color: #303030; } /* Main background */
.bg-\[\#262626\] { background-color: #262626; } /* Card/Container background */
.bg-\[\#2C2C2C\] { background-color: #2C2C2C; } /* Section backgrounds (forms, image preview) */
.bg-\[\#2E2E2E\] { background-color: #2E2E2E; } /* List item background */
.text-\[\#EEEEEE\] { color: #EEEEEE; } /* Main text color */
.text-\[\#CCCCCC\] { color: #CCCCCC; } /* Secondary text color */
.text-\[\#AAAAAA\] { color: #AAAAAA; } /* Tertiary text color */
.border-\[\#404040\] { border-color: #404040; } /* Border color */

/* Input styles */
.input-dark {
  padding: 0.75rem 1rem; /* Increased padding */
  border: 1px solid #404040;
  border-radius: 0.5rem;
  width: 100%;
  background-color: #404040;
  color: #EEEEEE;
  transition: all 0.2s ease-in-out;
}
.input-dark::placeholder {
  color: #AAAAAA;
}
.input-dark:focus {
  outline: none;
  border-color: #673AB7; /* Purple border on focus */
  box-shadow: 0 0 0 2px rgba(103, 58, 183, 0.5); /* Purple shadow on focus */
  background-color: #4A4A4A; /* Slightly lighter on focus */
}

/* Primary Button */
.btn-dark-primary {
  background: #673AB7; /* Purple */
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  width: 100%;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.1s ease;
}
.btn-dark-primary:hover {
  background: #5E35B1; /* Darker purple on hover */
  transform: translateY(-1px);
}
.btn-dark-primary:active {
  background: #512DA8;
  transform: translateY(0);
}

/* Danger Button */
.btn-dark-danger {
  background: #D32F2F; /* Red */
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.1s ease;
}
.btn-dark-danger:hover {
  background: #C62828;
  transform: translateY(-1px);
}
.btn-dark-danger:active {
  background: #B71C1C;
  transform: translateY(0);
}

/* Secondary Button (for Edit) */
.btn-dark-secondary {
  background: #1976D2; /* Blue */
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.4rem;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.1s ease;
}
.btn-dark-secondary:hover {
  background: #1565C0;
  transform: translateY(-1px);
}
.btn-dark-secondary:active {
  background: #0D47A1;
  transform: translateY(0);
}

/* Custom File Input */
.custom-file-input-dark {
    display: inline-flex;
    align-items: center;
    background-color: #404040;
    color: #EEEEEE;
    border: 1px solid #555;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-weight: 500;
    transition: background-color 0.2s ease;
}
.custom-file-input-dark:hover {
    background-color: #4A4A4A;
}
/* Hide default file input button */
.custom-file-input-dark input[type="file"] {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
}
/* Ensure the actual input is hidden and the label is clickable */
.custom-file-input-dark::before {
    content: ''; /* No content before label */
}
</style>