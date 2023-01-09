const { defineConfig } = require('cypress')

console.log('version', process.version)

module.exports = defineConfig({
  e2e: {
    // baseUrl, etc
    baseUrl: 'http://localhost:5000',
    viewportWidth: 500,
    viewportHeight: 500,
    fixturesFolder: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // and load any plugins that require the Node environment
      console.log(config.env)
      if (config.env.bearer) {
        console.error('⚠️ Found CYPRESS_BEARER variable')
        console.error(
          '⚠️ Please use plain operating system BEARER to inject the auth header',
        )
        process.env.BEARER = config.env.bearer
        config.env.bearer = null
      }

      on('task', {
        async getSecret() {
          if (!process.env.BEARER) {
            throw new Error('Missing BEARER')
          }
          const url = `${config.baseUrl}/protected/secret`
          console.log('fetching %s', url)

          // https://www.codewithyou.com/blog/finally-we-can-use-fetch-api-in-nodejs
          const response = await fetch(url, {
            headers: {
              authorization: `Bearer ${process.env.BEARER}`,
            },
          })

          if (!response.ok) {
            throw new Error('Network response was not ok')
          }

          const data = await response.json()
          return data
        },
      })

      // IMPORTANT: return the changed config
      // to make sure we removed the BEARER from config.env object
      return config
    },
  },
})
