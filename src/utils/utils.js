const { trim, negate, isEmpty } = require("lodash")

const splitOn = (pattern) => {
  return (input) => input.split(pattern).map(trim).filter(negate(isEmpty))
}

module.exports = { splitOn }
