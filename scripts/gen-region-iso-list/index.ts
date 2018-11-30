import fetch from 'cross-fetch';
import cheerio from 'cheerio';
import fs from 'fs-extra';
import path from 'path';

const outputFilePath = path.join(__dirname, '..', '..', 'test', 'regions.json');

(async () => {
  await fs.remove(outputFilePath);
  await fs.ensureFile(outputFilePath);

  const content = await (await fetch(
    'https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes'
  )).text();
  const $ = cheerio.load(content);

  const regions: string[] = [];

  $('table')
    .first()
    .find('td:nth-child(4) a span')
    .each((_, element) => {
      regions.push($(element).text());
    });

  await fs.writeFile(outputFilePath, JSON.stringify(regions, null, 2), {
    encoding: 'utf-8',
  });
})();
