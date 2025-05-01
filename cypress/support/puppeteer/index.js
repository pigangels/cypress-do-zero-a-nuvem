const { setup, retry } = require( '@cypress/puppeteer')

module. exports = function puppeteerSetup(on) {
  setup ({ 
    on,
    onMessage: {
      async switchTabAndGetContent (browser) {
        const page = await pageRetrier (browser, 'walmyr.dev')

        await page.bringToFront ()

        const headingTwo = await page-waitForSelector ('h2')
        const headingwoText = await page.evaluate(el = el. textContent, headingTwo)
        
        headingTwo.dispose ( )
        
        await page.close()
        
        return headingTwoText
      },
      async switchTabAndLogin (){}
    }
  })
}

async function pageRetrier(browser, url) {
  
}