<script setup lang="ts">
import { Toaster } from '@/components/ui/toast'
</script>

<template>
    <div class="min-h-screen bg-background font-sans antialiased">
        <router-view></router-view>
        <Toaster />
    </div>
</template>

<style>
:root {
    --vh: 1vh;
}

html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
}

#app {
    width: 100%;
    height: 100%;
    min-height: 100vh;
    /* mobile viewport bug fix */
    min-height: calc(var(--vh, 1vh) * 100);
}
</style>
