import sequelize from './config.js'
import { Role } from './models/Role.js'
import { User } from './models/Users.js'

export const createRelations = () => {
  // Role.js
  Role.hasMany(User, { foreignKey: 'role_id' })
  // User.js
  User.belongsTo(Role, { foreignKey: 'role_id' })
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
    await sequelize.sync({ alter: true })
    createRelations()

    console.log('Database synchronized.')
  } catch (error) {
    console.error('Error synchronizing the database:', error)
  }
}
