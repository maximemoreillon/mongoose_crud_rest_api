const Item = require("../models/item.js")
const request = require("supertest")
const expect = require("chai").expect
const app = require("../index.js").app

// We will test for api users
describe("/items", () => {
  // What to do after each test
  beforeEach(async () => {
    await Item.deleteMany({})
  })

  // We will test root GET related logics
  describe("GET /", () => {
    // What should it do
    it("should return all users", async () => {
      const items = [
        { title: "title1", description: "description1"},
        { title: "title2", description: "description2"},
      ]
      await Item.insertMany(items)
      const res = await request(app).get("/items")

      // Test the expected outcome
      expect(res.status).to.equal(200)
      expect(res.body.length).to.equal(2)
    })
  })

})
