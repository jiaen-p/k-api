process.env.NODE_ENV = 'test'

import 'mocha'
import { app } from '../index'
const request = require('supertest')

describe('POST /notas', () => {
    it('OK, add notes works', (done) => {
        request(app).post('/notas')
        .send({"notas": [{"nota": "test3"},{ "nota": "test4"}]})
        .expect(201)
        .then(done())
        .catch((err) => done(err))
    })
})
