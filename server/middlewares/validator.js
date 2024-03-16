const { body, validationResult } = require('express-validator');

// هذه مكتبه وسيطه منأجل التحقق من البيانات المستقبله
// قبل وصولها الى قاعده البيانات
const userValidationResult = () => {
    return[
        body('name').notEmpty().withMessage('أسم المستخدم مطلوب'),
        body('email').notEmpty().withMessage('الايميل  مطلوب'),
        body('email').isEmail().withMessage('عليك كتابه صيغه بريد الكتروني صحيحه'),
        body('password').notEmpty().withMessage('كلمه المرور مطلوبه'),
        body('password').isLength({min: 5}).withMessage('يجب أن تكون كلمه المرور أكثر من 5 أحرف')

    ]
}

const validate = (req,res,next) =>{
    const errors = validationResult(req)

    if(errors.isEmpty()){
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({
        [err.path]: err.msg
    }))
    res.status(400).json({errors: extractedErrors})
}

module.exports = {
    userValidationResult,
    validate
}