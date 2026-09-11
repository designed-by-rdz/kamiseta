import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'


const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.afterEach(() => {
    const container = document.querySelector('.container') 
    if (container) {
        container.scrollTop = 0
    }
})

export default router