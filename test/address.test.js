import {web} from '../src/application/web.js'
import supertest from 'supertest'
import { createManyTestContacts, createTestContact, createTestUser,getTestContact,removeAllTestContact, removeTestUser,removeAllTestAddresses, createTestAddress, getTestAddress } from "./test-util.js"

describe('POST /api/contacts/:contactId/addresses', () => {
    beforeEach(async()=>{
        await createTestUser()
        await createTestContact()
    })

    afterEach(async()=>{
        await removeAllTestAddresses()
        await removeAllTestContact()
        await removeTestUser()
    })
  it('should can create new address',async()=>{
    const contact = await getTestContact()
    const result = await supertest(web)
    .post('/api/contacts/'+ contact.id +'/addresses')
    .set('Authorization','test')
    .send({
        street:"jalan test",
        city:"kota test",
        province:"provinsi test",
        country:"Indonesia",
        postal_code:"41152"
    })

    expect(result.status).toBe(200)
    expect(result.body.data.id).toBeDefined()
    expect(result.body.data.street).toBe("jalan test")
    expect(result.body.data.city).toBe("kota test")
    expect(result.body.data.province).toBe("provinsi test")
    expect(result.body.data.country).toBe("Indonesia")
    expect(result.body.data.postal_code).toBe("41152")

  })

  it('should reject if request is invalid',async()=>{
    const contact = await getTestContact()
    const result = await supertest(web)
    .post('/api/contacts/'+ contact.id +'/addresses')
    .set('Authorization','test')
    .send({
        street:"",
        city:"",
        province:"",
        country:"",
        postal_code:""
    })

    expect(result.status).toBe(400)

  })

  it('should reject if contact not found',async()=>{
    const contact = await getTestContact()
    const result = await supertest(web)
    .post('/api/contacts/'+ (contact.id+1) +'/addresses')
    .set('Authorization','test')
    .send({
        street:"",
        city:"",
        province:"",
        country:"",
        postal_code:""
    })

    expect(result.status).toBe(404)

  })

})

describe('GET /api/contacts/:contactId/addresses/:addressId', () => {
    beforeEach(async()=>{
      await createTestUser()
      await createTestContact()
      await createTestAddress()
    })

    afterEach(async()=>{
        await removeAllTestAddresses()
        await removeAllTestContact()
        await removeTestUser()
    })

    it('should reject if contact not found',async()=>{
        const contact = await getTestContact()
        const address = await getTestAddress()
        const result = await supertest(web)
        .get('/api/contacts/'+ (contact.id+1) +'/addresses/'+address.id)
        .set('Authorization','test')
    
        expect(result.status).toBe(404)
    })

    it('should reject if address not found',async()=>{
      const contact = await getTestContact()
      const address = await getTestAddress()
      const result = await supertest(web)
      .get('/api/contacts/'+ contact.id +'/addresses/'+(address.id+1))
      .set('Authorization','test')
  
      expect(result.status).toBe(404)
  })


})

describe('PUT /api/contacts/:contactId/addresses/:addressId', () => {
  beforeEach(async()=>{
    await createTestUser()
    await createTestContact()
    await createTestAddress()
  })

  afterEach(async()=>{
      await removeAllTestAddresses()
      await removeAllTestContact()
      await removeTestUser()
  })

  it('should can update address',async()=>{
     const contact = await getTestContact()
     const address = await getTestAddress()

     const result = await supertest(web)
     .put('/api/contacts/'+contact.id+'/addresses/'+address.id)
     .set('Authorization','test')
     .send({
        street:"jalan",
        city:"kota",
        province:"provinsi",
        country:"Indonesia",
        postal_code:"41153"
     })

     expect(result.status).toBe(200)
     expect(result.body.data.id).toBe(address.id)
     expect(result.body.data.street).toBe('jalan')
     expect(result.body.data.city).toBe('kota')
     expect(result.body.data.province).toBe('provinsi')
     expect(result.body.data.country).toBe('Indonesia')
     expect(result.body.data.postal_code).toBe('41153')
  })

  it('should reject if request is invalid',async()=>{
    const contact = await getTestContact()
    const address = await getTestAddress()

    const result = await supertest(web)
    .put('/api/contacts/'+contact.id+'/addresses/'+address.id)
    .set('Authorization','test')
    .send({
       street:"",
       city:"",
       province:"provinsi",
       country:"",
       postal_code:""
    })

    expect(result.status).toBe(400)
 })

 it('should reject if address not found',async()=>{
    const contact = await getTestContact()
    const address = await getTestAddress()

    const result = await supertest(web)
    .put('/api/contacts/'+contact.id+'/addresses/'+(address.id+1))
    .set('Authorization','test')
    .send({
      street:"jalan",
      city:"kota",
      province:"provinsi",
      country:"Indonesia",
      postal_code:"41153"
    })

    expect(result.status).toBe(404)
  })

  it('should reject if contact not found',async()=>{
    const contact = await getTestContact()
    const address = await getTestAddress()

    const result = await supertest(web)
    .put('/api/contacts/'+(contact.id+1)+'/addresses/'+address.id)
    .set('Authorization','test')
    .send({
      street:"jalan",
      city:"kota",
      province:"provinsi",
      country:"Indonesia",
      postal_code:"41153"
    })

    expect(result.status).toBe(404)
  })
})

describe('DELETE /api/contacts/:contactId/addresses/:addressId', () => {
  beforeEach(async()=>{
    await createTestUser()
    await createTestContact()
    await createTestAddress()
  })

  afterEach(async()=>{
      await removeAllTestAddresses()
      await removeAllTestContact()
      await removeTestUser()
  })

  it('should can remove address',async()=>{
    const contact = await getTestContact()
    let address = await getTestAddress()

    const result = await supertest(web)
    .delete('/api/contacts/'+contact.id+'/addresses/'+address.id)
    .set('Authorization','test')

    
    expect(result.status).toBe(200)
    expect(result.body.data).toBe("OK")
    address = await getTestAddress()
    expect(address).toBeNull()
  })

  it('should reject if address not found',async()=>{
    const contact = await getTestContact()
    let address = await getTestAddress()

    const result = await supertest(web)
    .delete('/api/contacts/'+contact.id+'/addresses/'+(address.id+1))
    .set('Authorization','test')

    
    expect(result.status).toBe(404)
  })

  it('should reject if contact not found',async()=>{
    const contact = await getTestContact()
    let address = await getTestAddress()

    const result = await supertest(web)
    .delete('/api/contacts/'+(contact.id+1)+'/addresses/'+address.id)
    .set('Authorization','test')

    
    expect(result.status).toBe(404)
  })
})

describe('GET /api/contacts/:contactId/addresses', () => {
  beforeEach(async()=>{
    await createTestUser()
    await createTestContact()
    await createTestAddress()
  })

  afterEach(async()=>{
      await removeAllTestAddresses()
      await removeAllTestContact()
      await removeTestUser()
  })
  it('should can get list address',async()=>{
    const contact = await getTestContact()
    const result = await supertest(web)
    .get('/api/contacts/'+contact.id+'/addresses')
    .set('Authorization','test')

    expect(result.status).toBe(200)
    expect(result.body.data.length).toBe(1)

  })

  it('should reject if contact not found',async()=>{
    const contact = await getTestContact()
    const result = await supertest(web)
    .get('/api/contacts/'+(contact.id+1)+'/addresses')
    .set('Authorization','test')

    expect(result.status).toBe(404)

  })
  
})



