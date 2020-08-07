const { assert } = require("chai")
const { parseDriveData } = require("./tripDataParser")
const moment = require("moment")

const time = (time) => moment(time, "HH:mm")

describe("parseDriveData", () => {
  it("throws an error if the string contains unrecognized input commands", () => {
    assert.throw(
      () => {
        parseDriveData("A random String")
      },
      Error,
      /Unknown Command/
    )
  })

  it("returns the structured driver data", () => {
    const input = `
            Driver Dan
            Driver Alex
            Driver Kumi
            Trip Dan 07:15 07:45 17.3
            Trip Alex 01:00 02:00 10
            Trip Dan 06:12 06:32 21.8
         `
    const expected = [
      {
        name: "Dan",
        trips: [
          { startTime: time("07:15"), endTime: time("07:45"), distance: 17.3 },
          { startTime: time("06:12"), endTime: time("06:32"), distance: 21.8 },
        ],
      },
      {
        name: "Alex",
        trips: [
          { startTime: time("01:00"), endTime: time("02:00"), distance: 10 },
        ],
      },
      {
        name: "Kumi",
        trips: [],
      },
    ]

    const result = parseDriveData(input)

    assert.deepEqual(result, expected)
  })

  describe("handles formmating issues", () => {
    const expected = [
      {
        name: "Dan",
        trips: [
          { startTime: time("01:15"), endTime: time("01:45"), distance: 17 },
        ],
      },
    ]

    it("handles trailing whitespace", () => {
      const input = "Driver Dan\t \r\n Trip Dan 01:15 01:45 17 \t"

      assert.deepEqual(parseDriveData(input), expected)
    })
    it("handles leading whitespace", () => {
      const input = "\t Driver Dan\r\n \t Trip Dan 01:15 01:45 17"

      assert.deepEqual(parseDriveData(input), expected)
    })
    it("handles multiple spaces", () => {
      const input = "Driver    Dan\r\n Trip Dan   01:15 01:45 17"

      assert.deepEqual(parseDriveData(input), expected)
    })
    it("handles tabs", () => {
      const input = "Driver\t\tDan\r\n Trip Dan 01:15\t\t01:45 17"

      assert.deepEqual(parseDriveData(input), expected)
    })
    it("handles blank lines", () => {
      const input = "Driver Dan\r\n \r\n Trip Dan 01:15 01:45 17"

      assert.deepEqual(parseDriveData(input), expected)
    })
  })
})
