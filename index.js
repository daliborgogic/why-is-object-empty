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

    const t = await page.evaluate(_ => {
      let paints = {}

      performance.getEntriesByType('paint').map(_ =>  paints[_.name] = _.startTime)

      const { 
        name,
        entryType,
        startTime,
        duration,
        initiatorType,
        nextHopProtocol,
        workerStart,
        redirectStart,
        redirectEnd,
        fetchStart,
        domainLookupStart,
        domainLookupEnd,
        connectStart,
        connectEnd,
        secureConnectionStart,
        requestStart,
        responseStart,
        responseEnd,
        transferSize,
        encodedBodySize,
        decodedBodySize,
        serverTiming,
        unloadEventStart,
        unloadEventEnd,
        domInteractive,
        domContentLoadedEventStart,
        domContentLoadedEventEnd,
        domComplete,
        loadEventStart,
        loadEventEnd,
        type,
        redirectCount
      } = performance.getEntriesByType('navigation')[0]

      return { 
        whyIsObjectEmpty: performance.getEntriesByType('navigation')[0], // why!?
        name,
        entryType,
        startTime,
        duration,
        initiatorType,
        nextHopProtocol,
        workerStart,
        redirectStart,
        redirectEnd,
        fetchStart,
        domainLookupStart,
        domainLookupEnd,
        connectStart,
        connectEnd,
        secureConnectionStart,
        requestStart,
        responseStart,
        responseEnd,
        transferSize,
        encodedBodySize,
        decodedBodySize,
        serverTiming,
        unloadEventStart,
        unloadEventEnd,
        domInteractive,
        domContentLoadedEventStart,
        domContentLoadedEventEnd,
        domComplete,
        loadEventStart,
        loadEventEnd,
        type,
        redirectCount,
        paints
      }
    })

    await browser.close()

    return t
  }

  return await timings()
}

