<script setup>
import SplashScreen from './components/SplashScreen.vue';

</script>


<template>
    <div id="app-shell">
        <!-- <SplashScreen /> -->
        <main class="container">
            <router-view v-slot="{ Component }">
                <component :is="Component" class="page" />
            </router-view>
        </main>
    </div>
</template>

<style scoped>
    #app-shell {
        display: flex;
        flex-direction: column;
        height: 100dvh;
        width: 100vw;
        overflow: hidden;
    }

    .container {
        flex: 1;
        overflow-y: auto;
    }
</style>