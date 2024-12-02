import { createApp } from 'vue'
import router from './router'
import './assets/index.css'
import App from './App.vue'

const app = createApp(App)
app.use(router)
app.mount('#app')

// Fix for mobile viewport height
function setVH() {
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
}

window.addEventListener('resize', setVH)
setVH()
