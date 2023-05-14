import request from "supertest"
import { expect } from "chai"
import { app } from "../index"

describe("/movies", () => {
  let movie_id: string

  before(async () => {
    // Silence console
    console.log = () => {}
  })

  describe("POST /movies", async () => {
    it("Should CREATE a movie", async () => {
      const { status, body } = await request(app)
        .post("/movies")
        .send({ title: "Jurassic Park" })

      movie_id = body._id

      expect(status).to.equal(200)
    })
  })

  describe("GET /movies", async () => {
    it("Should READ movies", async () => {
      const { status, body } = await request(app).get(`/movies`)

      expect(status).to.equal(200)
      expect(body.items).to.have.lengthOf.above(0)
    })
  })

  describe("GET /movies/:movie_id", async () => {
    it("Should READ a movie", async () => {
      const { status } = await request(app).get(`/movies/${movie_id}`)

      expect(status).to.equal(200)
    })
  })

  describe("PATCH /movies/:movie_id", async () => {
    it("Should UPDATE a movie", async () => {
      const { status } = await request(app).patch(`/movies/${movie_id}`, {
        title: "Jurassic World",
      })

      expect(status).to.equal(200)
    })
  })

  describe("DELETE /movies/:movie_id", async () => {
    it("Should DELETE a movie", async () => {
      const { status } = await request(app).delete(`/movies/${movie_id}`)

      expect(status).to.equal(200)
    })
  })
})
