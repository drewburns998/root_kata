const { aggregateTripData } = require("./services/calculation")
const { parseDriveData } = require("./parser/tripDataParser")
const { driverReportByTotalMiles } = require("./reporter/reportBuilder")
const { first } = require("function-composition")
const { readFileSync } = require("fs")

const STDIN = 0
const input = readFileSync(STDIN, "utf-8")

const report = first(parseDriveData)
  .then((drivers) => drivers.map(aggregateTripData))
  .then(driverReportByTotalMiles)
  .apply(input)

process.stdout.write(report)
