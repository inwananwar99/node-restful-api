import supertest from "supertest"
import { web } from "../src/application/web.js"
import logger from "winston"
import { createManyTestContacts, createTestContact, createTestUser,getTestContact,removeAllTestContact, removeTestUser } from "./test-util.js"

describe('POST /api/contacts', () => {
    beforeEach(async()=>{
        await createTestUser()
    })

    afterEach(async()=>{
        await removeAllTestContact()
        await removeTestUser()
    })
  it('should can create new contact', async()=>{
    const result = await supertest(web)
    .post('/api/contacts')
    .set('Authorization','test')
    .send({
        first_name:"inwan",
        last_name:"solihudin",
        email:"test@iconpln.co.id",
        phone:"087778817890"
    })


    expect(result.status).toBe(200)
    expect(result.body.data.id).toBeDefined()
    expect(result.body.data.first_name).toBe("inwan")
    expect(result.body.data.last_name).toBe("solihudin")
    expect(result.body.data.email).toBe("test@iconpln.co.id")
    expect(result.body.data.phone).toBe("087778817890")
  })

  it('should reject if request is not valid', async()=>{
    const result = await supertest(web)
    .post('/api/contacts')
    .set('Authorization','test')
    .send({
        first_name:"",
        last_name:"solihudin",
        email:"iconpln.co.id",
        phone:"08777881789089089089089089890"
    })


    expect(result.status).toBe(400)
    expect(result.body.errors).toBeDefined()
  })
})


describe('GET /api/contacts/:contactId', () => {
    beforeEach(async()=>{
        await createTestUser()
        await createTestContact()
    })

    afterEach(async()=>{
        await removeAllTestContact()
        await removeTestUser()
    })

    it('should can get contact',async()=>{
        const contact = await getTestContact()
        console.log(contact)
        const result = await supertest(web)
        .get('/api/contacts/'+contact.id)
        .set('Authorization','test')

        expect(result.status).toBe(200)
        expect(result.body.data.id).toBe(contact.id)
        expect(result.body.data.first_name).toBe(contact.first_name)
        expect(result.body.data.last_name).toBe(contact.last_name)
        expect(result.body.data.email).toBe(contact.email)
        expect(result.body.data.phone).toBe(contact.phone)
    })

    it('should response contact not found',async()=>{
        const contact = await getTestContact()
        const result = await supertest(web)
        .get('/api/contacts/'+(contact.id+1))
        .set('Authorization','test')

        expect(result.status).toBe(404)
    })
})

describe('PUT /api/contacts/:contactId', () => {
    beforeEach(async()=>{
        await createTestUser()
        await createTestContact()
    })

    afterEach(async()=>{
        await removeAllTestContact()
        await removeTestUser()
    })

    it('should can update existing contact',async()=>{
        const contact = await getTestContact()
        const result = await supertest(web)
        .put('/api/contacts/'+contact.id)
        .set('Authorization','test')
        .send({
            first_name:"iwan",
            last_name:"solihudin",
            email:"iwan@iconpln.co.id",
            phone:"085788178909"
        })

        expect(result.status).toBe(200)
        expect(result.body.data.id).toBe(contact.id)
        expect(result.body.data.first_name).toBe('iwan')
        expect(result.body.data.last_name).toBe('solihudin')
        expect(result.body.data.email).toBe('iwan@iconpln.co.id')
        expect(result.body.data.phone).toBe('085788178909')
    })

    it('should reject if request invalid',async()=>{
        const contact = await getTestContact()
        const result = await supertest(web)
        .put('/api/contacts/'+contact.id)
        .set('Authorization','test')
        .send({
            first_name:"",
            last_name:"",
            email:"iwan",
            phone:""
        })

        expect(result.status).toBe(400)
    })

    it('if contact not found',async()=>{
        const contact = await getTestContact()
        console.log(contact)
        const result = await supertest(web)
        .put('/api/contacts/'+(contact.id+1))
        .set('Authorization','test')
        .send({
            first_name:"iwan",
            last_name:"anwar",
            email:"iwan@iconpln.co.id",
            phone:"08578890876"
        })

        expect(result.status).toBe(404)
    })
})

describe('DELETE /api/contacts/:contactId', () => {
    beforeEach(async()=>{
        await createTestUser()
        await createTestContact()
    })

    afterEach(async()=>{
        await removeAllTestContact()
        await removeTestUser()
    })
    it('should can delete contact',async()=>{
        let contact = await getTestContact()
        const result = await supertest(web)
        .delete('/api/contacts/'+contact.id)
        .set('Authorization','test')

        expect(result.status).toBe(200)
        expect(result.body.data).toBe("OK")

        contact = await getTestContact()
        expect(contact).toBeNull()

    })

    it('should reject if contact is not found',async()=>{
        let contact = await getTestContact()
        const result = await supertest(web)
        .delete('/api/contacts/'+(contact.id+1))
        .set('Authorization','test')

        expect(result.status).toBe(404)

    })
  
})


describe('GET /api/contacts', () => {
    beforeEach(async()=>{
        await createTestUser()
        await createManyTestContacts()
    })

    afterEach(async()=>{
        await removeAllTestContact()
        await removeTestUser()
    })  

    it('should can search whithout parameter',async()=>{
        const result = await supertest(web)
        .get('/api/contacts')
        .set('Authorization','test')

        expect(result.status).toBe(200)
        expect(result.body.data.length).toBe(10)
        expect(result.body.paging.page).toBe(1)
        expect(result.body.paging.total_page).toBe(2)
        expect(result.body.paging.total_item).toBe(15)
    })

    it('should can search into page 2 from 2',async()=>{
        const result = await supertest(web)
        .get('/api/contacts')
        .query({
            page:2
        })
        .set('Authorization','test')

        expect(result.status).toBe(200)
        expect(result.body.data.length).toBe(5)
        expect(result.body.paging.page).toBe(2)
        expect(result.body.paging.total_page).toBe(2)
        expect(result.body.paging.total_item).toBe(15)
    })

    it('should can search using name',async()=>{
        const result = await supertest(web)
        .get('/api/contacts')
        .query({
            name:'inwan 1'
        })
        .set('Authorization','test')

        expect(result.status).toBe(200)
        expect(result.body.data.length).toBe(7)
        expect(result.body.paging.page).toBe(1)
        expect(result.body.paging.total_page).toBe(1)
        expect(result.body.paging.total_item).toBe(7)
    })

    it('should can search using email',async()=>{
        const result = await supertest(web)
        .get('/api/contacts')
        .query({
            email:'test1'
        })
        .set('Authorization','test')

        expect(result.status).toBe(200)
        expect(result.body.data.length).toBe(7)
        expect(result.body.paging.page).toBe(1)
        expect(result.body.paging.total_page).toBe(1)
        expect(result.body.paging.total_item).toBe(7)
    })

    it('should can search using phone and page',async()=>{
        const result = await supertest(web)
        .get('/api/contacts')
        .query({
            phone:'087778817890',
            page:2
        })
        .set('Authorization','test')

        expect(result.status).toBe(200)
        expect(result.body.data.length).toBe(5)
        expect(result.body.paging.page).toBe(2)
        expect(result.body.paging.total_page).toBe(2)
        expect(result.body.paging.total_item).toBe(15)
    })
  
})



