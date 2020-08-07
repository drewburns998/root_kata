const moment = require("moment")
const { splitOn } = require("../utils/utils")

const NEW_LINE = /[\r\n]+/
const WHITESPACE = /\s+/
const TIME_FORMAT = "HH:mm"

const parseDriveData = (inputString) => {
  const driverData = splitOn(NEW_LINE)(inputString)
    .map(splitOn(WHITESPACE))
    .map(toDriver)
    .reduce(mergeDriversWithSameName, {})

  return Object.values(driverData)
}

const toDriver = ([inputCommand, ...commandArguments]) => {
  switch (inputCommand) {
    case "Trip":
      return translateTripCommand(commandArguments)
    case "Driver":
      return translateDriverCommand(commandArguments)
    default:
      throw new Error("Unknown Command")
  }
}

const translateTripCommand = ([name, startTime, endTime, distance]) => ({
  name,
  trips: [
    {
      startTime: moment(startTime, TIME_FORMAT),
      endTime: moment(endTime, TIME_FORMAT),
      distance: Number(distance),
    },
  ],
})

const translateDriverCommand = ([name]) => ({
  name,
  trips: [],
})

const mergeDriversWithSameName = (drivers, nextDriver) => {
  const existingDriver = drivers[nextDriver.name]

  const mergedDriver =
    existingDriver === undefined
      ? nextDriver
      : {
          ...existingDriver,
          trips: [...existingDriver.trips, ...nextDriver.trips],
        }

  return {
    ...drivers,
    [mergedDriver.name]: mergedDriver,
  }
}

module.exports = { parseDriveData }
