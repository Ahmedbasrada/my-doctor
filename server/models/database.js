const { Sequelize } = require('sequelize');


// الاتصال بي قاعه البيانات

const db = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
     {
    host: 'localhost',
    dialect:'postgres'
  });

  // أختبار الاتصال بي قاعده البيانات

  db.authenticate().then(()=>{
    console.log('connaction is success with DB')
  }).catch(() =>{
    console.log('Unable to connact with the DB!')
  })

  module.exports = db