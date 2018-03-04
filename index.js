const { send } = require('micro')
const puppeteer = require('puppeteer')

module.exports = async (req, res) => {
  res.setHeader('content-type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET')
  res.setHeader('Access-Control-Allow-Credentials', true)

  async function timings ()  {
    const browser = await puppeteer.launch({
      executablePath: '/usr/bin/chromium-browser',
      headless:true,
      ignoreHTTPSErrors: true,
      // ommmmm
      args: ['--disable-setuid-sandbox', '--no-sandbox']
    })
    const page = await browser.newPage()
    await page.goto('https://daliborgogic.com')

    const navigation = JSON.parse(await page.evaluate(() => {
        return JSON.stringify(performance.getEntriesByType('navigation')[0])
    }))

    await browser.close()

    return navigation
  }
  const results = await timings()
  return [results]
}

