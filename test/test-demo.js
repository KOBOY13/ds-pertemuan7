const request = require('supertest');
var chai = require('chai');
chai.use(require('chai-json-schema'));
const fs = require('fs')

const assert = chai.assert

describe('API test for "https://reqres.in"', () => {
    const BASE_URL = "https://reqres.in"
    it('test GET users', async () => {
        const response = await request(BASE_URL)
        .get("/api/users/2")
        assert.equal(response.statusCode, 200)
        assert.equal(response.body.data.first_name, "Janet")
        assert.equal(response.body.data.last_name, "Weaver")

        const schemaPath = "resources/jsonSchema/get-object-schema.json"
        const jsonSchema = JSON.parse(fs.readFileSync(schemaPath,'utf8'))

        assert.jsonSchema(response.body, jsonSchema)
    });

    it('test POST users', async () => {
        const body = {
            "name": "Michael",
            "job": "Leader"
        }
        const response = await request(BASE_URL)
        .post("/api/users")
        .send(body)
        assert.equal(response.statusCode, 201)
        assert.equal(response.body.name, "Michael")

        const schemaPath = "resources/jsonSchema/post-object-schema.json"
        const jsonSchema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'))
        assert.jsonSchema(response.body, jsonSchema)
    });

    it('test PUT users', async () => {
        const body = {
            "name": "morpheus",
            "job": "zion resident"
        }
        const response = await request(BASE_URL)
        .put("/api/users/2")
        .send(body)
        assert.equal(response.statusCode, 200)
        assert.equal(response.body.name, "morpheus")
        assert.equal(response.body.job, "zion resident")

        const schemaPath = "resources/jsonSchema/put-object-schema.json"
        const jsonSchema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'))
        assert.jsonSchema(response.body, jsonSchema)
    });
    
    it('test DELETE user', async () => {
        const response = await request(BASE_URL)
        .delete("/api/users/2")
        console.log(response.statusCode);
        console.log(response.body)
    });
}); 

/*const request = require ('supertest');
var chai = require('chai');
chai.use(require('chai-json-schema'));
const fs = require('fs')


const assert = chai.assert
const should = chai.should
const expect = chai.expect

describe('API Test for restful-api.dev', () => {
    const BASE_URL = "https://api.restful-api.dev/"
    it('Test - GEST ALL Objects', async () => {
        const response = await request(BASE_URL)
        .get("objects")
        
        //assersion
        assert.equal(response.statusCode, 200)
        assert.equal(response.body[0].name, "Google Pixel 6 Pro")
        assert.equal(response.body[0].data.color, "Cloudy White")

        expect(response.statusCode).to.equal(200)

    });

    it('Test - POST Store Objects', async () => {
        const body = {
            "name": "Apple MacBook Pro 16",
            "data": {
               "year": 2024,
               "price": 1849.99,
               "CPU model": "Intel Core i9",
               "Hard disk size": "1 TB"
            }
        }
        const response = await request("https://api.restful-api.dev/")
        .post("objects")
        .send(body)
        
        console.log(response.statusCode);
        console.log(response.body)
        //assersion
        
        should(response.statusCode === 200)

        const schemaPath = "resources/jsonSchema/post-object-schema02.json"
        const jsonSchema = JSON.parse(fs.readFileSync(schemaPath,'utf8'))

        assert.jsonSchema(response.body, jsonSchema)

    });
});
*/