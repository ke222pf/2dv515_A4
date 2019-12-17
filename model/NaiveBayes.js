class NaiveBayes {
  constructor () {
    this.data = []
    this.labels = []
    this.sum = {}
  }

// Trains the model on input examples X and labels y
  fit (x, y) {
    this.data = x
    this.labels = y

    this.sum = this.data.reduce((cat, x, i) => ({
      ...cat,
      [this.labels[i]]: {
        0: this.getValue(cat, i, 0) + Number(x[0]),
        1: this.getValue(cat, i, 1) + Number(x[1]),
        2: this.getValue(cat, i, 2) + Number(x[2]),
        3: this.getValue(cat, i, 3) + Number(x[3]),
        count: this.getValue(cat, i, 'count') + 1
      }
    }),
    {}
    )
    const obj = this.sum
    let count
    for (let [key, value] of Object.entries(obj)) {
      const values = Object.values(value)
    //   console.log(key)
      count = values.pop()
      for (let i in Object.entries(value)) {
        if (this.sum[key][i] !== undefined) {
          this.sum[key][i] = { val: this.sum[key][i], mean: values[i] / count}
          if (!this.sum[key][i].stdv) {
            this.sum[key][i].stdv = this.getStdv(i, key, count)
          }
        }
      }
    }
  }
  getStdv (i, key, count) {
    let total = 0
    const mean = this.sum[key][i].mean
    this.data.forEach(element => {
      // his.arr.push(Number(element[i]))
      if (this.labels[this.data.indexOf(element)] === Number(key)) {
        total += Math.pow(element[i] - mean, 2)
      }
    })
    return Math.sqrt(total / count)
  }
  predict (x) {
    let preds = []
    x.forEach(element => {
      const aPred = []
      for (let i = 0; i < Object.keys(this.sum).length; i++) {
        let obj = {
          0: 0,
          1: 0,
          2: 0,
          3: 0
        }
        element.forEach(attr => {
          const dividend =
            Math.E ** -((attr - this.sum[i][element.indexOf(attr)].mean) ** 2 / (2 * this.sum[i][element.indexOf(attr)].stdv ** 2))
          const divisor = this.sum[i][element.indexOf(attr)].stdv * Math.sqrt(2 * Math.PI)
          const svar = dividend / divisor
          obj[element.indexOf(attr)] = svar
          const log = Math.log(obj[0]) + Math.log(obj[1]) + Math.log(obj[2]) + Math.log(obj[3])
          obj[4] = Math.exp(log)
        })
        aPred.push(obj)
      }

      let best = aPred.reduce(function (max, x) {
        return x[4] > max[4] ? x : max
      })
      preds.push(aPred.indexOf(best))
    })
    return preds
  }

  accuracyScore (preds, classes) {
    let counter = 0
    for (let i = 0; i < classes.length; i++) {
      if (preds[i] === classes[i]) {
        counter++
      }
    }
    let score = counter / preds.length
    console.log((score * 100).toFixed(2) + '%' + ` (${counter}/${preds.length} correctly classified)`)
  }

  getValue (o, i, suffix) {
    if (o && o[this.labels[i]] && o[this.labels[i]][suffix]) {
      return o[this.labels[i]][suffix]
    } else {
      return 0
    }
  }
}

module.exports = NaiveBayes
