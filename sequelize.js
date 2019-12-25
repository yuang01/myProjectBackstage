const Sequelize = require('sequelize');
const sequelize = new Sequelize('ayudev', 'root', '123456', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

sequelize
  .authenticate()
  .then(() => {
    console.log('MYSQL 连接成功......');
  })
  .catch(err => {
    console.error('链接失败:', err);
  });
// sequelize.sync().then(() => {
// })
// sequelize.sync({ force: true }).then(() => {
// })
sequelize.sync({ alter: true }).then(() => {
})
// 根据模型自动创建表
// sequelize.sync({ force: true }).then(() => console.log('sync成功'))

module.exports = sequelize
