import Fs from 'node:fs';
import Path from 'node:path';
import { fileURLToPath } from 'node:url';

const
  __dirname = Path.dirname(fileURLToPath(import.meta.url)),

  f = (filename) => (
    Fs.readFileSync(`${__dirname}/${filename}`, { encoding: 'utf8' })
  ),
  md = (id) => (
    f(`${id}.md`)
  ),
  json = (id) => (
    JSON.parse(f(`${id}.json`))
  )
;


export const data = {
  "locale/translation_ru": json('translation/common_en'),
  "locale/translation_en": json('translation/common_en'),

  "home/bottom_en": md('home/bottom_en'),
  "home/bottom_ru": md('home/bottom_en'),
  "home/text_en": json('home/text_en'),
  "home/text_ru": json('home/text_en'),

  "legal/policy_en": md('legal/policy_en'),
  "legal/policy_ru": md('legal/policy_en'),
  "legal/support_en": md('legal/support_en'),
  "legal/support_ru": md('legal/support_en'),
  "legal/terms_en": md('legal/terms_en'),
  "legal/terms_ru": md('legal/terms_en'),
}
