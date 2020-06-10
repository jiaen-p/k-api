process.env.NODE_ENV = 'test'

import { app } from '../index'
const expect = require('chai').expect
import 'mocha'
const request = require('supertest')

describe('GET /notas', () => {
    it('OK, get all notes work', (done) => {
        request(app).post('/notas')
        .send({"notas": [{"nota": "test3"},{ "nota": "test4"}]})
        .then(() =>{
            request(app)
            .get('/notas')
            .then( (res) => {
                let body = res.body[0]
                expect(body).to.contain.property("_id")
                expect(body).to.contain.property('nota')
                expect(body).to.contain.property('favorito')
                expect(body._id).to.be.a('string')
                expect(body.nota).to.be.a('string')
                expect(body.favorito).to.be.a('boolean')
                done()
            })
        })
        .catch((err) => done(err))
    
    })
    it('OK, get one note by id', (done) => {
        request(app).post('/notas')
        .send({"notas": [{"nota": "test3"},{ "nota": "test4"}]})
        .then(()=> {
            request(app).get("/notas")
            .then(res => {
                const id = res.body._id
                request(app).get("/notas?id=" + id)
                .then(res =>{
                    expect(res.body._id).to.equal(id)
                    done()
                })
            })
        })
        .catch(err => done(err))
    })
    
    it('OK, get all favorites', (done) => {
        request(app).post('/notas')
        .send({"notas": [{"nota": "test3"},{ "nota": "test4"}]})
        .then(() =>{
            request(app)
            .get('/notas')
            .then( (res) => {
                const id = res.body[1]._id
                request(app).put('/notas?id=' + id)
                .then(()=>{
                    request(app).get('/notas?fav=true')
                    .then(res =>{
                        expect(res.body[0].favorito).to.be.true
                        expect(res.body[0]._id).to.equal(id)
                        done()
                    })
                })
            })
        })
        .catch((err) => done(err))   
    })
})
