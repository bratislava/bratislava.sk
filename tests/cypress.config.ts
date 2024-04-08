import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    // Allows to run all tests in open mode
    experimentalRunAllSpecs: true,
    setupNodeEvents(on, config) {
      config.chromeWebSecurity = false
      config.video = false
      config.baseUrl = "https://bratislava.sk"
      
      config.env = {
        devices: {
          desktop: ['all', 'desktop'].includes(config.env.DEVICE),
          mobile: ['all', 'mobile'].includes(config.env.DEVICE),
        },
        resolution: {
          desktop: { viewportWidth: 1440, viewportHeight: 1080 },
          mobile: { viewportWidth: 360, viewportHeight: 640 },
        },
      }

      config.retries = {
        runMode: 1,
        openMode: 1,
      }

      return config
    },
  },
})
