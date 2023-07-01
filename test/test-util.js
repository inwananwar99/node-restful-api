import { prismaClient } from "../src/application/database.js"
import bcrypt from 'bcrypt'

export const removeTestUser = async()=>{
    await prismaClient.user.deleteMany({
        where:{
            username: "test"
        }
    })

}

export const createTestUser = async()=>{
    await prismaClient.user.create({
        data:{
            username:"test",
            password:await bcrypt.hash("rahasia",10),
            name:"test",
            token:"test"
        }
    })
}

export const getTestUser = async()=>{
    return prismaClient.user.findUnique({
        where:{
            username:"test"
        }
    })
}


export const removeAllTestContact = async()=>{
    await prismaClient.contact.deleteMany({
        where:{
            username:"test"
        }
    })
}


export const createTestContact = async()=>{
    await prismaClient.contact.create({
        data:{
            username:'test',
            first_name:"inwan",
            last_name:"solihudin",
            email:"test@iconpln.co.id",
            phone:"087778817890"
        }
    })
}

export const createManyTestContacts = async()=>{
    for (let index = 1; index < 16; index++) {
        await prismaClient.contact.create({
            data:{
                username:'test',
                first_name:`inwan ${index}`,
                last_name:`solihudin ${index}`,
                email:`test${index}@iconpln.co.id`,
                phone:`087778817890${index}`
            }
        })
    }
}

export const getTestContact = async()=>{
    return prismaClient.contact.findFirst({
        where:{
            username:'test'
        }
    })
}

export const removeAllTestAddresses = async()=>{
    return prismaClient.address.deleteMany({
        where:{
            contact:{
                username:'test'
            }
        }
    })
}


export const createTestAddress = async()=>{
    const contact = await getTestContact()
    return prismaClient.address.create({
        data:{
            contact_id:contact.id,
            street:"jalan test",
            city:"kota test",
            province:"provinsi test",
            country:"Indonesia",
            postal_code:"41152"
        }
    })
}

export const getTestAddress = async()=>{
    return prismaClient.address.findFirst({
        where:{
            contact:{
                username:'test'
            }
        }
    })   
}