import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'

import TugasView from '../views/TugasView.vue'
import JadwalView from '../views/JadwalView.vue'
import DokumentasiView from '../views/DokumentasiView.vue'
import UserView from '../views/UserView.vue'
import AboutView from '../views/AboutView.vue'

const routes = [
  { path: '/', redirect: '/dashboard' },
  {
    path: '/dashboard',
    component: DashboardView,
    children: [
      { path: 'tugas', component: TugasView },
      { path: 'jadwal', component: JadwalView },
      { path: 'dokumentasi', component: DokumentasiView },
      { path: 'user', component: UserView },
      { path: 'about', component: AboutView }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
