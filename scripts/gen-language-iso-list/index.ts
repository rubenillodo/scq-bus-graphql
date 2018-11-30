import fetch from 'cross-fetch';
import cheerio from 'cheerio';
import fs from 'fs-extra';
import path from 'path';

const outputFilePath = path.join(
  __dirname,
  '..',
  '..',
  'test',
  'languages.json'
);

(async () => {
  await fs.remove(outputFilePath);
  await fs.ensureFile(outputFilePath);

  const content = await (await fetch(
    'https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes'
  )).text();
  const $ = cheerio.load(content);

  const languages: string[] = [];

  $('table#Table tbody td:nth-child(5) a').each((_, element) => {
    languages.push($(element).text());
  });

  await fs.writeFile(outputFilePath, JSON.stringify(languages, null, 2), {
    encoding: 'utf-8',
  });
})();
