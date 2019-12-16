const {bankNotesData, irisData } = require('../model/readCSVfile')
module.exports = (server) => {
  server.get('/', async (req, res) => {
    console.log(irisData())
    console.log(bankNotesData())
    res.json({hello: 'hello Word!'})
  })
}
