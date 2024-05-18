import sequelize from './config.js'
import { Role } from './models/Role.js'
import { User } from './models/Users.js'
// import { Book } from './models/Book.js'
// import { Author } from './models/Author.js'
// import { BookGenre } from './models/BookGenre.js'
// import { Genre } from './models/Genre.js'
// import { Lending } from './models/Lending.js'
// import { Membership } from './models/Membership.js'

export const createRelations = () => {
  // Role.js
  Role.hasMany(User, { foreignKey: 'role_id' })
  // User.js
  User.belongsTo(Role, { foreignKey: 'role_id' })
  //   User.hasMany(Lending, { foreignKey: 'user_id' })
  //   User.hasMany(Membership, { foreignKey: 'user_id' })
  //   // Author.js
  //   Author.hasMany(Book, { foreignKey: 'author_id' })
  //   // Genre.js
  //   Genre.belongsToMany(Book, { through: BookGenre, foreignKey: 'genre_id' })
  //   // Book.js
  //   Book.belongsTo(Author, { foreignKey: 'author_id' })
  //   Book.belongsToMany(Genre, { through: BookGenre, foreignKey: 'book_id' })
  //   Book.hasMany(Lending, { foreignKey: 'book_id' })
  //   // BookGenre.js
  //   BookGenre.belongsTo(Book, { foreignKey: 'book_id' })
  //   BookGenre.belongsTo(Genre, { foreignKey: 'genre_id' })
  //   // Membership.js
  //   Membership.belongsTo(User, { foreignKey: 'user_id' })
  //   // Lending.js
  //   Lending.belongsTo(User, { foreignKey: 'user_id' })
  //   Lending.belongsTo(Book, { foreignKey: 'book_id' })
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
