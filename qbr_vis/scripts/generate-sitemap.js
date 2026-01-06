import {csvParse} from 'd3';
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


async function generateSitemap() {
    console.log('... starting build of sitemap csvFilePath:', csvPath)


    const parseCSV = (d)=>({
        name:d.name,
    })
    const csvText = await fs.readFile(csvPath, "utf-8");
    const data = csvParse(csvText, parseCSV);
    const names = data.map(d=>d.name.replaceAll(" ", "_"))
    const uniqueNames = [...new Set(names)]

    const urls = [
        {path:"/", changefreq: "daily", priority: 1.0},
        {path:"/qbs", changefreq: "weekly", priority: 0.8},
        ...uniqueNames.map((z) => ({
                path: `/qbs/${z}`,
                changefreq: "weekly",
                priority: 1.2,
            })),
    ]

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
    console.log("sitemap.xml generated");            
    
}




generateSitemap().catch(console.error);