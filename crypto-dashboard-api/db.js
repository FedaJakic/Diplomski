import sequelize from './config.js'
import { Role } from './models/Role.js'
import { User } from './models/Users.js'
import { Message } from './models/Message.js'
import { CryptoCache } from './models/CryptoCache.js' // Import the new model

export const createRelations = () => {
  // Role.js
  Role.hasMany(User, { foreignKey: 'role_id' })
  // User.js
  User.belongsTo(Role, { foreignKey: 'role_id' })

  // If you have any relations for CryptoList, define them here
  // Example: User has many CryptoList (if applicable)
  // User.hasMany(CryptoList, { foreignKey: 'user_id' })
  // CryptoList.belongsTo(User, { foreignKey: 'user_id' })
}

export const testConnection = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

export const syncDatabase = async () => {
  try {
    createRelations() // Establish relationships before syncing
    await sequelize.sync({ alter: true })
    console.log('Database synchronized.')
  } catch (error) {
    console.error('Error synchronizing the database:', error)
  }
}
