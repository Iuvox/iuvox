const { default: axios } = require("axios")
const fs = require('fs')
const { resolve } = require('./server-utils')
const isProd = process.env.NODE_ENV === 'production'


module.exports = async(req, res) => {

    if (isProd) {
      try {
        const robots = fs.readFileSync(resolve('../dist/server/robots.txt'), 'utf-8')
        res.end(robots)
      } catch (error) {
          
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
    if(!isProd) {
        res.end(file)
    }
}