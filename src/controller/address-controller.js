import addressService from "../service/address-service.js"
import { getAddressValidation } from "../validation/address-validation.js"

const create = async(req,res,next)=>{
    const user = req.user
    const request = req.body
    const contactId = req.params.contactId
    try {
        const result = await addressService.create(user,contactId,request)
        res.status(200).json({
            data:result
        })
    } catch (e) {
        next(e)
        console.log(e)
        console.log(request)
        console.log(user)
        console.log(contactId)
    }
}

const get = async(req,res,next)=>{
    try {
        const user = req.user
        const contactId = req.params.contactId
        const addressId = req.params.addressId
        const result = await addressService.get(user,contactId,addressId)
        res.status(200).json({
            data:result
        })
    } catch (e) {
        next(e)
    }
}

const update = async(req,res,next)=>{
    try {
        const user = req.user
        const contactId = req.params.contactId
        const addressId = req.params.addressId
        const request = req.body
        request.addressId = addressId
        const result = await addressService.update(user,contactId,request)
        res.status(200).json({
            data:result
        })
    } catch (e) {
        next(e)
    }
}


export default {
    create,get,update
}