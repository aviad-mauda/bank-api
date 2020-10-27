const request = require('supertest')
const app = require('../app')
const User = require('../db/models/user')
const { userOne, userOneId,setupDatabase } = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should login existing user', async () => {
    const response = await request(app).post('/login').send({
        email: 'test1@test1.com',
        password: 'asf124!!'
    }).expect(200)
    const user = await User.findById(userOneId)
    expect(response.body.token).toBe(user.token)
})
