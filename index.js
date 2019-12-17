
const ctj = require('./model/readCSVfile')
const NaiveBayes = require('./model/NaiveBayes')

const bankNotes = async () => {
  const [X, y] = await ctj.bankNotesData()
  const nv = new NaiveBayes()
  nv.fit(X, y)
  const preds = nv.predict(X)
  nv.accuracyScore(preds, y)
}

const iris = async () => {
  const [X, y] = await ctj.irisData()
  const nv = new NaiveBayes()
  nv.fit(X, y)
  const preds = nv.predict(X)
  nv.accuracyScore(preds, y)
}

iris()
bankNotes()
