const irisDataSet = '../model/data/iris.csv'
const banknoteDataSet = '../model/data/banknote-athentication.csv'
const csv = require('csvtojson')

async function irisData () {
  const jsonArray = await csv({delimiter: ';'}).fromFile(irisDataSet)
  return jsonArray
}

async function bankNotesData () {
  const jsonArray = await csv({delimiter: ';'}).fromFile(banknoteDataSet)
  return jsonArray
}

module.exports = {
  irisData,
  bankNotesData
}
// csvToJson
