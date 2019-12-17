const irisDataSet = './model/data/iris.csv'
const banknoteDataSet = './model/data/banknote_authentication.csv'
const csv = require('csvtojson')
async function irisData () {
  const jsonArray = await csv({output: 'csv', noheader: true}).fromFile(irisDataSet)
  let data = []
  let categories = []
  let ctgInt = {}
  jsonArray.shift()
  jsonArray.forEach(element => {
    categories.push(element.pop())
    data.push(element)
  })
  for (let j = 0; j < categories.length; j++) {
    if (ctgInt[categories[j]] == null) {
      ctgInt[categories[j]] = Object.keys(ctgInt).length
    }

    categories[j] = ctgInt[categories[j]]
  }

  return [data, categories]
}
// console.log(categories)

async function bankNotesData () {
  const jsonArray = await csv({output: 'csv', noheader: true}).fromFile(banknoteDataSet)
  let data = []
  let categories = []
  let ctgInt = {}
  jsonArray.shift()
  jsonArray.forEach(element => {
    categories.push(element.pop())
    data.push(element)
  })
  for (let j = 0; j < categories.length; j++) {
    if (ctgInt[categories[j]] == null) {
      ctgInt[categories[j]] = Object.keys(ctgInt).length
    }

    categories[j] = ctgInt[categories[j]]
  }
  return [data, categories]
}

module.exports = {
  irisData,
  bankNotesData
}
// csvToJson
