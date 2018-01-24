const jsonServer = require('json-server')
const router = jsonServer.router('./mock/mock-server.json')
const db = router.db

module.exports = (req, res, next) => {
    if (req.method === 'PUT' && req.url.split()[1] === 'assets') {
        let id = req.body.id
        let mockData = require('./mock-server.json')
        req.body.price_jpy = mockData.rates.find(element => {
            return element.id === id
        }).price_jpy
        db.write()
        next()
    } else {
        next()
    }
}