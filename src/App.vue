<template>
  <div>
    <nav class="p-4 bg-gray-800 text-white">
      <router-link to="/" class="mr-4">Home</router-link>
      <router-link to="/settings">Settings</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
});
</script>
