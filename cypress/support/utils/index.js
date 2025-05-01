module.exports = {

  // quando abrirmos o app do cypress, nao ira mais exibir o "electron", pois filtramos com o metodo abaixo apenas os browsers da familia chromium
  getChromiumWebBrowsers(config) {
    return {
      browsers: config.browsers.filter(browser => {
        return browser.family === 'chromium' && browser.name !== 'electron'
      })
    }
  }
}