const { default: axios } = require("axios")
const fs = require('fs')
const { resolve } = require('./server-utils')

const xmlTemplate = (obj = { url: String, loc: String, lastmod: Date, changefreq: String, priority: Number }) => {
    const xml = []

    if (obj.loc) {
        xml.push(`<loc>${obj.loc}</loc>`)
    }
    if (obj.lastmod) {
        const date = new Date(obj.lastmod)
        xml.push(`<lastmod>${date.toISOString()}</lastmod>`)
    }
    if (obj.priority) {
        xml.push(`<priority>${obj.priority}</priority>`)
    }

    return `<url>${xml.join('')}</url>`
}

const routes = [{
        slug: '',
        updated_at: '2022-02-12T19:38:19',
        layout: null,
        priority: 1
    },
    {
        slug: 'waarom-iuvox',
        updated_at: '2022-02-12T19:38:19',
        layout: null,
        priority: 0.8
    },
    {
        slug: 'services',
        updated_at: '2022-02-12T19:38:19',
        layout: null,
        priority: 0.8

    },
    {
        slug: 'contact-iuvox',
        updated_at: '2022-02-12T19:38:19',
        layout: null,
        priority: 0.8
    }
]


module.exports = async(req, res) => {

    const isProd = process.env.NODE_ENV === 'production'
    if (isProd) {
        try {
            const sitemap = fs.readFileSync(resolve('../dist/server/sitemap.xml'), 'utf-8')
            res.set({ 'Content-Type': 'application/xml' }).send(sitemap)
        } catch (error) {}
    }
    axios.get('http://admin.iuvox.nl/items/pages', {
            headers: {
                'Authorization': 'Bearer admintoken'
            },
            params: {
                fields: 'slug,layout,updated_at'
            }
        })
        .then(result => {
            const data = routes.concat(result.data.data)
            const xml = []

            data.forEach(el => {
                const xmlObj = {}

                const base = (el.layout === null) ? '' : `${el.layout}/`
                const slug = el.slug

                xmlObj.loc = `https://${req.headers.host}/${base}${slug}`
                xmlObj.lastmod = el.updated_at
                xmlObj.priority = el.priority || 0.6


                xml.push(xmlTemplate(xmlObj))
            });

            const sitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"> ${xml.join('')}</urlset>`


            fs.writeFile(resolve('../dist/server/sitemap.xml'), sitemap, err => {
                if (err) {
                    console.log(err)
                }
            })
            if (!isProd) {
                res.set({ 'Content-Type': 'application/xml' }).send(sitemap)
            }
        })
        .catch(err => {
            console.log(err)
        })

    
}