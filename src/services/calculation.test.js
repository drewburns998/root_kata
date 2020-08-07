const { assert } = require("chai")
const { aggregateTripData } = require("./calculation")
const moment = require("moment")

describe("calculation service", () => {
  const time = (time) => moment(time, "HH:mm")

  describe("includes drivers with no trips", () => {
    let aggregatedTripData

    beforeEach(() => {
      const driverTripData = {
        name: "Andrew",
        trips: [],
      }

      aggregatedTripData = aggregateTripData(driverTripData)
    })

    it("returns average mph as null", () => {
      assert.isNull(aggregatedTripData.averageMilesPerHour)
    })

    it("returns total distance as 0", () => {
      assert.deepEqual(aggregatedTripData.totalMiles, 0)
    })
  })

  describe("aggregates driver data including the", () => {
    let aggregatedTripData

    beforeEach(() => {
      const driverTripData = {
        name: "Andrew",
        trips: [
          { startTime: time("02:00"), endTime: time("03:00"), distance: 20 },
          { startTime: time("03:00"), endTime: time("04:00"), distance: 80 },
        ],
      }

      aggregatedTripData = aggregateTripData(driverTripData)
    })

    it("name of the driver", () => {
      assert.deepEqual(aggregatedTripData.name, "Andrew")
    })

    it("total miles driven", () => {
      assert.deepEqual(aggregatedTripData.totalMiles, 100)
    })

    it("average mph", () => {
      assert.deepEqual(aggregatedTripData.averageMilesPerHour, 50)
    })
  })

  describe("excludes drivers with avg mph", () => {
    it("less than 5", () => {
      const driverTripData = {
        name: "Andrew",
        trips: [
          { startTime: time("02:00"), endTime: time("03:00"), distance: 4.99 },
          { startTime: time("03:00"), endTime: time("04:00"), distance: 20 },
        ],
      }

      let aggregatedTripData = aggregateTripData(driverTripData)

      assert.deepEqual(aggregatedTripData.totalMiles, 20)
    })

    it("greater than 100", () => {
      const driverTripData = {
        name: "Andrew",
        trips: [
          { startTime: time("02:00"), endTime: time("03:00"), distance: 20 },
          { startTime: time("03:00"), endTime: time("04:00"), distance: 100.1 },
        ],
      }

      let aggregatedTripData = aggregateTripData(driverTripData)

      assert.deepEqual(aggregatedTripData.totalMiles, 20)
    })
  })
})
