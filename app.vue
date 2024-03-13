<script setup lang="ts">
const links = [
  '/api/storage',
  '/api/import',
  '/api/dependency'
]
</script>

<template>
  <div>
    <ul>
      <li v-for="link in links" :key="link">
        <a :href="link">{{ link }}</a>
      </li>
    </ul>
  </div>
</template>
