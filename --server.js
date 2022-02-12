const fs = require('fs')
const path = require('path')
const express = require('express')
const axios = require('axios')

const isTest = process.env.NODE_ENV === 'test' || !!process.env.VITE_TEST_BUILD

async function createServer(
    root = process.cwd(),
    isProd = process.env.NODE_ENV === 'production'
) {
    const resolve = (p) => path.resolve(__dirname, p)

    const indexProd = isProd ?
        fs.readFileSync(resolve('dist/client/index.html'), 'utf-8') :
        ''

    const manifest = isProd ?
        require('./dist/client/ssr-manifest.json') : {}

    const app = express()


    let vite
    if (!isProd) {
        vite = await require('vite').createServer({
                root,
                logLevel: isTest ? 'error' : 'info',
                server: {
                    middlewareMode: 'ssr',
                    watch: {
                        // During tests we edit the files too fast and sometimes chokidar
                        // misses change events, so enforce polling for consistency
                        usePolling: true,
                        interval: 100
                    }
                }
            })
            // use vite's connect instance as middleware
        app.use(vite.middlewares)
    } else {
        app.use(require('compression')())
        app.use(
            require('serve-static')(resolve('dist/client'), {
                index: false
            })
        )
    }

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

    app.use('/sitemap.xml', async(req, res) => {

        if (isProd) {
            const sitemap = fs.readFileSync(resolve('./dist/server/sitemap.xml'), 'utf-8')
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

                    fs.writeFile('./dist/server/sitemap.xml', sitemap, err => {
                        if (err) {
                            console.log(err)
                        }
                    })
                })
                .catch(err => {
                    res.send(err)
                })
        }

    })

    app.use('*', async(req, res) => {
        try {
            const url = req.originalUrl
            let template, render
            if (!isProd) {
                // always read fresh template in dev
                template = fs.readFileSync(resolve('index.html'), 'utf-8')
                template = await vite.transformIndexHtml(url, template)

                render = (await vite.ssrLoadModule('/src/entry-server.js')).render
            } else {
                template = indexProd
                render = require('./dist/server/entry-server.js').render
            }
            const html = await render(url, manifest, template)

            res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
        } catch (e) {
            vite && vite.ssrFixStacktrace(e)
            console.log(e.stack)
            res.status(500).end(e.stack)
        }
    })

    return { app, vite }
}

if (!isTest) {
    createServer().then(({ app }) =>
        app.listen(3000, () => {
            console.log('http://localhost:3000')
        })
    )
}

// for test use
exports.createServer = createServer