const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const path = require('path');
(async () => {
  const b = await chromium.launch();
  for (const f of process.argv.slice(3)) {
    const pg = await b.newPage({ viewport: { width: 1600, height: 2000 } });
    await pg.goto('file://' + path.resolve(f)); await pg.evaluate(() => document.fonts.ready); await pg.waitForTimeout(800);
    for (const el of await pg.$$('.cv')) {
      const id = await el.getAttribute('id');
      await el.screenshot({ path: path.join(process.argv[2], id + '.png') }); console.log(id);
    }
  }
  await b.close();
})();
