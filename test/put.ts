process.env.NODE_ENV = 'test'

import 'mocha'
import { app } from '../index'
const expect = require('chai').expect
const request = require('supertest')

describe('PUT /notas', () => {
    it('OK, set favorite note', (done) => {
        request(app).post('/notas')
        .send({"notas": [{"nota": "test3"},{ "nota": "test4"}]})
        .then(() =>{
            request(app)
            .get('/notas')
            .then( (res) => {
                const id = res.body[1]._id
                request(app).put('/notas?id=' + id)
                .then(()=>{
                    request(app).get('/notas?id=' + id)
                    .then(res => {
                        expect(res.body.favorito).to.be.true
                        done()
                    })
                })
            })
        })
        .catch((err) => done(err))   
    })
})
