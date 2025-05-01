const { defineConfig } = require('cypress')

// para nao deixar "sujo" a implementacao abaixo, a gente cria um arquivo de configuracao separado e chama aqui
const puppeteerSetup = require('./cypress/support/puppeteer')
const { getChromiumWebBrowsers } = require('./cypress/support/utils')

module.exports = defineConfig({
  viewportHeight: 880,
  viewportWidth: 1280,
  e2e: {
    setupNodeEvents(on, config){
      puppeteerSetup(on)

      return getChromiumWebBrowsers(config)
    }
  },
  fixturesFolder: false,
})
