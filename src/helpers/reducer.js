'use strict'

module.exports = (obj, pair) => {
  if (obj[pair.name]) {
    obj[pair.name] = pair.value
    return obj
  }

  // convert to array
  const arr = [
    obj[pair.name],
    pair.value
  ]

  obj[pair.name] = arr

  return obj
}
