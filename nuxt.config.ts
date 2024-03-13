export default defineNuxtConfig({
  nitro: {
    serverAssets: [
      {
        baseName: 'templates',
        dir: './templates'
      }
    ]
  }
})
