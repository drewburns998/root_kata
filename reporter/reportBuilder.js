const { sortBy } = require("lodash")

const driverReportByTotalMiles = (aggregatedTripData) => {
  return sortBy(aggregatedTripData, (tripData) => tripData.totalMiles)
    .reverse()
    .map(formatTripData)
    .join("")
}

const formatTripData = ({ name, totalMiles, averageMilesPerHour }) => {
  const formattedAverageSpeed =
    averageMilesPerHour === null
      ? ""
      : ` @ ${averageMilesPerHour.toFixed(0)} mph`
  const formattedDistance = `${totalMiles.toFixed(0)} miles`

  return `${name}: ${formattedDistance}${formattedAverageSpeed}\n`
}

module.exports = { driverReportByTotalMiles }
