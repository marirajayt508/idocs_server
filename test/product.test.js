const supertest = require("supertest")
const app = require('../app')


describe("ADD PRODUCT TEST", () => {

    test("add product 200 status code", async () => {
        let data = {
            "productname" : "testproduct",
            "quantity" : 2
            }
      const response = await supertest(app).post("/addproduct").send(data)
      expect(response.statusCode).toBe(200)
    },10000)
  })

  
describe("GET PRODUCT TEST", () => {
    test("check the product", async () => {
        const response = await supertest(app).get("/getallproduct")
        expect(response.body).toBeDefined()
      })
})

describe("EDIT PRODUCT TEST", () => {
    test("edit product 200 status code", async () => {
        let data = {
            "productname" : "testproduct",
            "quantity" : 1
            }
  const response = await supertest(app).put("/editproduct").send(data)
  expect(response.statusCode).toBe(200)
})
})

describe("DELETE PRODUCT TEST", () => {
    test("delete 200 status code", async () => {
        let data = {
            "productname" : "testproduct",
            }
      const response = await supertest(app).delete("/deleteproduct").send(data)
      expect(response.statusCode).toBe(200)
    })
    test("check the product ordered", async () => {
        const response = await supertest(app).get("/getallproduct")
        expect(response.body.stockDetails).toBe("No Products Found")
      })
})
