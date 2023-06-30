import joi from 'joi'

const createContactValidation = joi.object({
    first_name:joi.string().max(100).required(),
    last_name:joi.string().max(100).optional(),
    email:joi.string().max(200).email().optional(),
    phone:joi.string().max(20).optional()
})


const getContactValidation = joi.number().positive().required()

const updateContactValidation = joi.object({
    id:joi.number().positive().required(),
    first_name:joi.string().max(100).required(),
    last_name:joi.string().max(100).optional(),
    email:joi.string().max(200).email().optional(),
    phone:joi.string().max(20).optional()
})

export{
    createContactValidation, getContactValidation,updateContactValidation
}