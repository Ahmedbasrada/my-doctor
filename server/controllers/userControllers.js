const bcryptjs = require('bcryptjs')
const models = require('../models')
const jwt = require('jsonwebtoken')


exports.register = async (req,res) =>{
    const {name, password, email, userType, location,specialization, phone, addres,workingHours, } = req.body

    try {
        const hashPassword = await bcryptjs.hash(password, 10)
        const user = await models.User.create({
            name,
            password: hashPassword,
            email,
            userType,
            latitude: location.latitude,
            longitude: location.longitude
        })

        //  غير مختبر. أختبره
        if(userType == 'doctor'){
            const profile = await models.Profile.create({
                userId: user.id,
                specialization,
                phone,
                addres,
                workingHours,

            })
        }
        res.status(200).json({message: "تم أنشاء الحساب بنجاح"})
    } catch (e) {
        res.status(500).json({message: e})
    }
}

exports.login = async (req,res) =>{
    const{email, password} = req.body
    try {
        const user = await models.User.findOne({where: {email}})
        if(!user){
            res.status(401).json({message:'كلمه المرور او الايميل غير صحيحين'})
        }else{
          const authSuccess = await bcryptjs.compare(password, user.password)
          if(!authSuccess){
            res.status(401).json({message:'كلمه المرور او الايميل غير صحيحين'})
          }else{
          const token = jwt.sign({id: user.id, name: user.name, email: user.email}, process.env.JWT_SECRET);

          res.status(200).json({accessToken: token})
          }
        }
        

    } catch (error) {
      console.log( error)
    }
}

exports.me = (req,res) =>{
    const user = req.correntuser
    res.json(user)
}


exports.getProfile = async (req,res) =>{
    try {
        const result = await models.User.findOne({
          where: {id: req.currentUser.id},
          include: [{model: models.Profile, as: "profile"}],
            attributes: {exclude: ['password']}
        })
        res.status(200).json(result)
    } catch (e) {
        res.status(500).json(e)

        
    }
}


exports.updateUser = async (req, res) => {
    const {
      name,
      password,
      userType,
      specialization,
      addres,
      location,
      workingHours,
      phone,
    } = req.body;
  
    try {
      const hashPassword = await bcryptjs.hash(password, 10);
  
      await models.User.update(
        {
          name,
          password: hashPassword,
          userType,
          latitude: location.latitude,
          longitude: location.longitude,
        },
        {
          where: { id: req.currentUser.id },
        }
      );
  
      if (userType === 'doctor') {
        await models.Profile.update(
          {
            specialization,
            addres,
            workingHours,
            phone,
          },
          {
            where: { userId: req.currentUser.id },
          }
        );
      }
  
      res.status(200).json({ message: 'تم تحديث معلوماتك بنجاح' });
    } catch (e) {
      res.status(500).json(e);
    }
  };

  exports.deleteUser = async (req, res) => {
    try {
      await models.User.destroy({
        where: { id: req.currentUser.id },
      });
  
  
      res.status(200).json({ message: 'تم حذف حسابك بنجاح' });
    } catch (e) {
      res.status(500).json( e );
    }
  };