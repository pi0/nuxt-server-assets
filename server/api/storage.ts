export default defineEventHandler(async () => {
  // https://nitro.unjs.io/guide/assets#server-assets
  const assets = useStorage('assets:server')
  const users = await assets.getItem('users.json')
  return {
    users
  }
})
