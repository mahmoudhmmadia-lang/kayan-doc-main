// Appends a numbered key to the \shotnote of every figure that uses a given screenshot.
// Usage: node addkeys.mjs keys-chNN.mjs
import fs from 'node:fs';
const { KEYS } = await import(`./${process.argv[2]}`);
process.chdir('D:/stuff/right-code/taskflow/kayanos-guide');
const files = { ar: fs.readdirSync('chapters').map((f) => `chapters/${f}`), en: fs.readdirSync('i18n/en/chapters').map((f) => `i18n/en/chapters/${f}`) };

// Index of the brace that closes the group opened at `open`.
const close = (s, open) => { let d = 0; for (let i = open; i < s.length; i++) { if (s[i] === '\\') { i++; continue; } if (s[i] === '{') d++; else if (s[i] === '}' && --d === 0) return i; } return -1; };

let total = 0;
for (const lang of ['ar', 'en']) for (const file of files[lang]) {
  let s = fs.readFileSync(file, 'utf8'); let changed = false;
  for (const [name, key] of Object.entries(KEYS)) {
    const ref = `{figures/screens/${name}-${lang}.png}`;
    let from = 0;
    for (;;) {
      const at = s.indexOf(ref, from); if (at < 0) break;
      const note = s.indexOf('\\shotnote{', at); const end = s.indexOf('\\end{figure}', at);
      if (note < 0 || note > end) throw new Error(`${file}: ${name} has no shotnote`);
      const open = note + '\\shotnote'.length; const shut = close(s, open);
      if (!s.slice(open, shut).includes('①')) { s = `${s.slice(0, shut).replace(/\s*$/, '')} ${key[lang]}${s.slice(shut)}`; changed = true; total++; }
      from = s.indexOf('\\end{figure}', at) + 1;
    }
  }
  if (changed) fs.writeFileSync(file, s);
}
console.log('keys added', total);
