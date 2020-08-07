const { assert } = require("chai")
const { driverReportByTotalMiles } = require("./reportBuilder")

describe("driverReportByTotalMiles", () => {
  it("returns data sorted by total miles", () => {
    const aggregatedData = [
      { name: "foo", totalMiles: 15, averageMilesPerHour: 45 },
      { name: "bar", totalMiles: 25, averageMilesPerHour: 65 },
      { name: "baz", totalMiles: 10, averageMilesPerHour: 55 },
    ]
    const expectedOutput =
      "bar: 25 miles @ 65 mph\nfoo: 15 miles @ 45 mph\nbaz: 10 miles @ 55 mph\n"

    const reportData = driverReportByTotalMiles(aggregatedData)

    assert.deepEqual(reportData, expectedOutput)
  })

  it("returns correct format when driver has no average mph", () => {
    const aggregatedData = [
      { name: "foo", totalMiles: 0, averageMilesPerHour: null },
    ]
    const expectedOutput = "foo: 0 miles\n"

    const reportData = driverReportByTotalMiles(aggregatedData)

    assert.deepEqual(reportData, expectedOutput)
  })

  it("returns correct rounded value for total miles", () => {
    const aggregatedData = [
      { name: "foo", totalMiles: 25.5, averageMilesPerHour: 10 },
    ]
    const expectedOutput = "foo: 26 miles @ 10 mph\n"

    const reportData = driverReportByTotalMiles(aggregatedData)

    assert.deepEqual(reportData, expectedOutput)
  })

  it("returns correct rounded value for average mph", () => {
    const aggregatedData = [
      { name: "foo", totalMiles: 25.5, averageMilesPerHour: 10.4 },
    ]
    const expectedOutput = "foo: 26 miles @ 10 mph\n"

    const reportData = driverReportByTotalMiles(aggregatedData)

    assert.deepEqual(reportData, expectedOutput)
  })
})
