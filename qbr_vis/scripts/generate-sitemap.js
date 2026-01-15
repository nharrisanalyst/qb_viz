import {csvParse} from 'd3';
import {slugifyURL} from '../src/Page/utilis/slugifyURL.ts';
import path from "node:path";
import fs from "node:fs/promises";


const csvPath = path.resolve(
  process.cwd(),
  "public/data/qb_data.csv"
);


export const routes = [
    {path:"/"}, //home
    {path:"/qbs"},
   
]

export async function createULRS(){

    const parseCSV = (d)=>({
        name:d.name,
        id:d.id
    })
    const csvText = await fs.readFile(csvPath, "utf-8");
    const data = csvParse(csvText, parseCSV);
    const qbs = data.map(d=>({name:d.name, id:d.id}))
    const qbsStringified = qbs.map(qb=>JSON.stringify(qb))
    const uniqueQBsString = [...new Set(qbsStringified)]
    const uniqueQBs = uniqueQBsString.map(st=>JSON.parse(st))

    const urls = [
        {path:"/", changefreq: "daily", priority: 0.8},
        {path:"/qbs", changefreq: "weekly", priority: 0.8},
        ...uniqueQBs.map((qb) => ({
                path:`/qbs/${slugifyURL(qb.name)}`,
                changefreq: "weekly",
                priority: 1.0,
                name:qb.name,
                qbNamePath:slugifyURL(qb.name),
                qbID:qb.id
            })),
    ]

    return urls;
}

async function generateSitemap() {
    
    const urls = await createULRS();

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
                <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${urls
                .map(
                    (u) => `
                    <url>
                        <loc>https://www.mm-qb.com${u.path}</loc>
                        <changefreq>${u.changefreq}</changefreq>
                        <priority>${u.priority}</priority>
                    </url>`
                )
                .join("\n")}
            </urlset>`;
    
    await fs.writeFile("public/sitemap.xml", xml);
}




generateSitemap().catch(console.error);
console.log("sitemap.xml generated");   