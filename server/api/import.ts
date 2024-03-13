// import testHtml from 'server/assets/test.html'

export default defineEventHandler(async () => {
  const testHtml = process.dev ? undefined : await import('server/assets/test.html').then(r=>r.default)
  return testHtml
})
