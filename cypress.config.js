const { defineConfig } = require("cypress");

// para nao deixar "sujo" a implementacao abaixo, a gente cria um arquivo de configuracao separado e chama aqui
const { getChromiumWebBrowsers } = require("./cypress/support/utils");

module.exports = defineConfig({
  viewportHeight: 880,
  viewportWidth: 1280,
  fixturesFolder: false,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
