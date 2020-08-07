const { sortBy } = require("lodash")

const driverReportByTotalMiles = (aggregatedTripData) => {
  return sortBy(aggregatedTripData, tripData => tripData.totalMiles)
    .reverse()
    .map(formatTripData)
    .join("")
}

const formatTripData = ({ name, totalMiles, averageMilesPerHour}) => {
  const formattedDistance = `${totalMiles.toFixed(0)} miles`
  const formattedAverageSpeed = averageMilesPerHour === null ? "" : ` @ ${averageMilesPerHour.toFixed(0)} mph`

  return `${name}: ${formattedDistance}${formattedAverageSpeed}\n`
}

module.exports = { driverReportByTotalMiles }