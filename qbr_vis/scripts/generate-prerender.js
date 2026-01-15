import fs from "node:fs/promises";
import path from "path";

import { createULRS } from './generate-sitemap.js';

console.log(process.cwd())
const manifestPath = path.resolve(
  process.cwd(),
  "dist/.vite/manifest.json"
);
const qbPath = path.resolve(
  process.cwd(),
  "dist/qbs"
);

const content =(qbName,qbId, qbURL, javascript,css) =>{
    const metaContent = makeMetaTags(qbName, qbId, qbURL)
    return `<!doctype html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/football.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="HandheldFriendly" content="True">
        <meta name="mobile-web-app-capable" content="yes">
        ${metaContent}

        <script>
        window.goatcounter = { no_onload: true };
        </script>
        <script data-goatcounter="https://mm-qb.goatcounter.com/count"
            async src="//gc.zgo.at/count.js"></script>
        <script type="module" crossorigin src="/${javascript}"></script>
        <link rel="stylesheet" crossorigin href="/${css}">
    </head>
    <body>
        <div id="root"></div>
    </body>
    </html>
    `
}

const makeMetaTags = (qbName, qbID, qbURL)=>{
     const keywords = `stats, visualizations, NFL, 2025 NFL Season, ${qbName}, qb rating`
    const title = `${qbName} stats and visualization | Monday Morning Quarter Back | mm-qb.com`;
    const url = `https://www.mm-qb.com/qbs/${qbURL}}`
    const description = `Checkout season long data visualizations and in depth statistics of ${qbName}`
    const imageURL = `https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/${qbID}.png`

    return `
    <title>${title}</title>
    <meta name='keywords'  content="${keywords}"" />
    <meta name="Description" content="${description}" />
    <meta name="og:title"  content="${title}" />
    <meta property="og:site_name" content="mm-qb.com" />
    <meta property="og:url" content="${url}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${imageURL}" />
    <meta property="twitter:image" content="${imageURL}" />
    <meta name="twitter:card" content="summary"/>
    <meta name="twitter:site" content="@mmorning_qb" />
    <meta name="twitter:creator" content="@mmorning_qb" />
    <meta property="twitter:image" content="${url}" />
    `
}

async function getAssestNames(){
    console.log(manifestPath)
    const manifestString =  await fs.readFile(manifestPath, "utf-8");
    const manifest = JSON.parse(manifestString)
    const files = manifest['index.html'];
    const javascript = files['file']
    const css = files['css']
    return [javascript, css]
}


async function prerednerApp(){
  const urls = await createULRS()
  const [javascript, css] = await getAssestNames();
  const cssPath = css[0];
  try{
    await fs.rm(qbPath, { recursive: true, force: true })
    console.log(`removed folder ${qbPath}`)
    await fs.mkdir(qbPath)
    console.log(`made folder ${qbPath}`)

    urls.slice(2).forEach(async (qb)=>{
        const folderContent = content(qb.name, qb.qbID, qb.qbNamePath, javascript,  cssPath)
        const folderPath =path.resolve(
                            process.cwd(),
                            `dist/qbs/${qb.qbNamePath}`
                        );
        const filePathName = path.resolve(
                            process.cwd(),
                            `dist/qbs/${qb.qbNamePath}/index.html`
                        );
                        await fs.mkdir(folderPath)
                        await fs.writeFile(filePathName, folderContent)
    })
  }catch(error){
    return error;
  }
  
}

prerednerApp().catch(console.error)