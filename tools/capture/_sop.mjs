import { open, ready } from './lib.mjs';
const OUT = '../../../../.temp/sopcap/';
const { browser, page } = await open({ lang: 'ar' });
page.on('request', (r) => { if (/internal-sop|sop\./.test(r.url()) && r.method() !== 'OPTIONS') console.log('REQ', r.method(), r.url().slice(0, 140)); });
try {
  await page.goto('https://test2.kayanos.app/internal-sop/', { waitUntil: 'domcontentloaded' });
  await ready(page, 90000);
  await page.getByText('ليس الآن').click().catch(() => {});
  await page.getByRole('button', { name: 'إجراء جديد' }).first().click();
  await page.waitForTimeout(2000);
  await page.screenshot({ path: OUT + 'newsheet.png' });
  console.log(await page.evaluate(() => [...document.querySelectorAll('[role=dialog] input,[role=dialog] button,[role=dialog] textarea')].map(e => `${e.tagName}:${e.placeholder||''}:${(e.innerText||e.value||'').trim().replace(/\s+/g,' ').slice(0,40)}`).join('\n')));
} finally { await browser.close(); }
