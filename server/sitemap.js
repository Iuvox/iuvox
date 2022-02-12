const { default: axios } = require("axios")
const fs = require('fs')
const { resolve } = require('./server-utils')
// const { router } = require('../src/router')

const xmlTemplate = (obj = { url: String, loc: String, lastmod: Date, changefreq: String, priority: Number }) => {
    const xml = []

    if (obj.loc) {
        xml.push(`<loc>${obj.loc}</loc>`)
    }
    if (obj.lastmod) {
        xml.push(`<lastmod>${obj.lastmod}</lastmod>`)
    }
    if (obj.priority) {
        xml.push(`<priority>${obj.priority}</priority>`)
    }

    return `<url>${xml.join('')}</url>`
}



module.exports = async(req, res) => {

    const isProd = process.env.NODE_ENV === 'production'

    if (isProd) {
        const sitemap = fs.readFileSync(resolve('../dist/server/sitemap.xml'), 'utf-8')
        res.set({ 'Content-Type': 'application/xml' }).send(sitemap)
    } else {
        axios.get('http://localhost:8055/items/pages', {
                headers: {
                    'Authorization': 'Bearer admintoken'
                },
                params: {
                    fields: 'slug,layout,updated_at'
                }
            })
            .then(result => {
                const data = result.data.data
                const xml = []

                data.forEach(el => {
                    const xmlObj = {}

                    const base = (el.layout === null) ? '' : `${el.layout}/`
                    const slug = el.slug

                    xmlObj.loc = `${req.protocol}://${req.headers.host}/${base}${slug}`
                    xmlObj.lastmod = el.updated_at
                    xmlObj.priority = 0.8


                    xml.push(xmlTemplate(xmlObj))
                });

                const sitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"> ${xml.join('')}</urlset>`

                res.set({ 'Content-Type': 'application/xml' }).send(sitemap)

                fs.writeFile(resolve('../dist/server/sitemap.xml'), sitemap, err => {
                    if (err) {
                        console.log(err)
                    }
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

}