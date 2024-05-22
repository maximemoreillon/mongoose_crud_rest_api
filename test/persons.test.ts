import request from "supertest"
import { expect } from "chai"
import { app } from "../index"

describe("/persons", () => {
  let person_id: string

  before(async () => {
    // Silence console
    console.log = () => {}
  })

  describe("POST /persons", async () => {
    it("Should CREATE a person", async () => {
      const { status, body } = await request(app)
        .post("/persons")
        .send({ name: "George" })

      person_id = body._id

      expect(status).to.equal(200)
    })
  })

  describe("GET /persons", async () => {
    it("Should READ persons", async () => {
      const { status, body } = await request(app).get(`/persons`)

      expect(status).to.equal(200)
      expect(body.items).to.have.lengthOf.above(0)
    })
  })

  describe("GET /persons/:person_id", async () => {
    it("Should READ a person", async () => {
      const { status } = await request(app).get(`/persons/${person_id}`)

      expect(status).to.equal(200)
    })
  })

  describe("PATCH /persons/:person_id", async () => {
    it("Should UPDATE a person", async () => {
      const { status } = await request(app).patch(`/persons/${person_id}`, {
        name: "John",
      })

      expect(status).to.equal(200)
    })
  })

  describe("DELETE /persons/:person_id", async () => {
    it("Should DELETE a person", async () => {
      const { status } = await request(app).delete(`/persons/${person_id}`)

      expect(status).to.equal(200)
    })
  })
})
