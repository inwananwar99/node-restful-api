import supertest from "supertest"
import { web } from "../src/application/web.js"
import logger from "winston"
import { prismaClient } from "../src/application/database.js"
import { createTestUser, removeTestUser } from "./test-util.js"
import bcrypt from 'bcrypt'


describe('POST /api/users', () => {
    afterEach(async()=>{
        await removeTestUser()
    })

  it('should can register',async()=>{
        const result = await supertest(web)
        .post('/api/users')
        .send({
            username:'test',
            password:'rahasia',
            name:'Inwan Solihudin'
        })
        console.log(result.status)
        expect(result.status).toBe(200)
        expect(result.body.data.username).toBe("test")
        expect(result.body.data.name).toBe("Inwan Solihudin")
        expect(result.body.data.password).toBeUndefined()

  })

  it('should reject if request in invalid',async()=>{
    const result = await supertest(web)
    .post('/api/users')
    .send({
        username:'',
        password:'',
        name:''
    })
    logger.info(result.body)
    expect(result.status).toBe(400)
    expect(result.body.errors).toBeDefined()
  })

  it('should reject if username already registered',async()=>{
    let result = await supertest(web)
    .post('/api/users')
    .send({
        username:'test',
        password:'rahasia',
        name:'Inwan Solihudin'
    })
    expect(result.status).toBe(200)
    expect(result.body.data.username).toBe('test')
    expect(result.body.data.name).toBe('Inwan Solihudin')
    expect(result.body.data.password).toBeUndefined()

    result = await supertest(web)
    .post('/api/users')
    .send({
        username:'test',
        password:'rahasia',
        name:'Inwan Solihudin'
    })
    expect(result.status).toBe(400)
    expect(result.body.errors).toBeDefined()

  })
})

describe('POST /api/users/login',()=>{
    beforeEach(async()=>{
        await prismaClient.user.create({
            data:{
                username: "test",
                password: await bcrypt.hash("rahasia",10),
                name: "test",
                token: "test"
            }
        })
    })

    afterEach(async()=>{
        await prismaClient.user.deleteMany({
            where:{
                username: "test"
            }
        })
    })

    it('should can login',async()=>{
        const result = await supertest(web)
         .post('/api/users/login')
         .send({
            username:"test",
            password:"rahasia"
         })
         console.log(result.body.data.token)

         expect(result.status).toBe(200)
         expect(result.body.data.token).toBeDefined()
         expect(result.body.data.token).not.toBe("test")
    })

    it('should reject login if request is invalid',async()=>{
        const result = await supertest(web)
         .post('/api/users/login')
         .send({
            username:"",
            password:""
         })
         logger.info(result.body)

         expect(result.status).toBe(400)
         expect(result.body.errors).toBeDefined()
    })
})

describe('GET /api/users/current',()=>{
    beforeEach(async()=>{
        await prismaClient.user.create({
            data:{
                username: "test",
                password: await bcrypt.hash("rahasia",10),
                name: "test",
                token: "test"
            }
        })
    })

    afterEach(async()=>{
        await prismaClient.user.deleteMany({
            where:{
                username: "test"
            }
        })
    })

    it('should can get current user',async()=>{
        const result = await supertest(web)
        .get('/api/users/current')
        .set('Authorization','test')

        expect(result.status).toBe(200)
        expect(result.body.data.username).toBe('test')
        expect(result.body.data.name).toBe('test')

    })

    it('should reject if token is invalid',async()=>{
        const result = await supertest(web)
        .get('/api/users/current')
        .set('Authorization','salah')

        expect(result.status).toBe(401)
        expect(result.body.errors).toBeDefined()

    })
})
