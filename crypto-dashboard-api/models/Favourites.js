import { DataTypes } from 'sequelize'
import sequelize from '../config.js'
import { User } from './Users.js'

export const Favourite = sequelize.define(
  'Favourite',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      references: {
        model: User,
        key: 'id',
      },
      allowNull: false,
    },
    crypto_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'favourites',
    timestamps: false,
  }
)

User.hasMany(Favourite, { foreignKey: 'user_id' })
Favourite.belongsTo(User, { foreignKey: 'user_id' })

export default Favourite
