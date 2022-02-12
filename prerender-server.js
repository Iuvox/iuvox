const fs = require('fs')
const path = require('path')
const express = require('express')


async function createServer(root = process.cwd()) {
    const resolve = (p) => path.resolve(__dirname, p)

    const indexProd = fs.readFileSync(resolve('dist/client/index.html'), 'utf-8')

    const manifest = require('./dist/client/ssr-manifest.json')

    const app = express()

    app.use(require('compression')())
    app.use(
        require('serve-static')(resolve('dist/static'), {
            index: false
        })
    )
    

    app.use('*', async(req, res) => {

        const html = fs.readFileSync('dist/static/homeview.html')
        res.status(200).set({ 'Content-Type': 'text/html' }).send(html)

        // try {
        //     const url = req.originalUrl
        //     let template, render
        //     if (!isProd) {
        //         // always read fresh template in dev
        //         template = fs.readFileSync(resolve('index.html'), 'utf-8')
        //         template = await vite.transformIndexHtml(url, template)

        //         render = (await vite.ssrLoadModule('/src/entry-server.js')).render
        //     } else {
        //         template = indexProd
        //         render = require('./dist/server/entry-server.js').render
        //     }
        //     const html = await render(url, manifest, template)

        //     res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
        // } catch (e) {
        //     vite && vite.ssrFixStacktrace(e)
        //     console.log(e.stack)
        //     res.status(500).end(e.stack)
        // }
    })

    return { app }
}

createServer().then(({ app }) =>
    app.listen(3000, () => {
        console.log('http://localhost:3000')
    })
)


// for test use
exports.createServer = createServer