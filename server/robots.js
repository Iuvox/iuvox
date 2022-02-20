const { default: axios } = require("axios")
const fs = require('fs')
const { resolve } = require('./server-utils')
const isProd = process.env.NODE_ENV === 'production'


module.exports = async(req, res) => {
    let robotsExists

    if (isProd) {
        const robots = resolve('../dist/server/robots.txt')
        robotsExists = fs.existsSync(robots)
        
        if(robotsExists) {
            res.sendFile(robots)
        }
    }
    const rules = [
        'User-agent: *',
        'Sitemap: https://iuvox.nl/sitemap.xml'
    ]
    const file = rules.join('\n')
    fs.writeFile(resolve('../dist/server/robots.txt'), file, err => {
        if (err) {
            console.log(err)
        }
    })
    if(!isProd || !robotsExists) {
        res.end(file)
    }
}