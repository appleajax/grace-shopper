const Sequelize = require('sequelize')
const db = require('../db')

const Shoe = db.define('shoe', {
  name: {
    type: Sequelize.STRING
  },
  cateogory: {
    type: Sequelize.INTEGER
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'https://tinyurl.com/y35fmc2q',
    validate: {
      isUrl: true
    }
  },
  description: {
    type: Sequelize.TEXT
  },
  price: {
    type: Sequelize.DECIMAL(10, 2)
  }
})

module.exports = Shoe
