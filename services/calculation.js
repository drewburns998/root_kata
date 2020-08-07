const { sumBy, isEmpty } = require("lodash")
const moment = require("moment")

const aggregateTripData = (driveData) => {
  const tripsWithinMphBoundaries = driveData.trips.filter(checkMphBounds)

  return ({
    name: driveData.name,
    totalMiles: totalMiles(tripsWithinMphBoundaries),
    averageMilesPerHour: averageMilesPerHour(tripsWithinMphBoundaries)
  })
}

const checkMphBounds = (trip) => {
  const averageMph = averageMilesPerHour([trip])
  return averageMph >= 5 && averageMph <= 100
}

const averageMilesPerHour = (trips) => {
  return isEmpty(trips) ? null : totalMiles(trips) / totalHours(trips)
}

const totalMiles = (trips) => {
  return sumBy(trips, trip => trip.distance)
}

const totalHours = (trips) => {
  return sumBy(trips, ({ startTime, endTime }) => differenceInHours(startTime, endTime))
}

const differenceInHours = (startTime, endTime) => {
  const timeDifference = endTime.diff(startTime)
  return moment.duration(timeDifference).asHours()
}

module.exports = { aggregateTripData }
