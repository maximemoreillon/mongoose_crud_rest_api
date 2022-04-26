const request = require("supertest")
const {expect} = require("chai")
const {app} = require("../index.js")

describe("/items", () => {

  let item_id

  describe("POST /items", () => {

    it("should allow the creation of an item", async () => {
    

      const {status, body} = await request(app)
        .post(`/items`)
        .send({title: 'example'})
      
      item_id = body._id

      expect(status).to.equal(200)
    })
  })

  describe("GET /items/", () => {

    it("should allow the query of all items", async () => {
    
      const {status} = await request(app)
        .get(`/items`)
      
      expect(status).to.equal(200)
    })
  })

  describe("GET /items/:item_id", () => {

    it("should allow the query of an item", async () => {
    
      const {status} = await request(app)
        .get(`/items/${item_id}`)
      
      expect(status).to.equal(200)
    })
  })

  describe("PUT /items/:item_id", () => {

    it("should allow the update of an item", async () => {
    
      const {status} = await request(app)
        .put(`/items/${item_id}`)
        .send({description: 'Example description'})
      
      expect(status).to.equal(200)
    })
  })

  describe("DELETE /items/:item_id", () => {

    it("should allow the deletion of an item", async () => {
    
      const {status} = await request(app)
        .delete(`/items/${item_id}`)
      
      expect(status).to.equal(200)
    })
  })





})
