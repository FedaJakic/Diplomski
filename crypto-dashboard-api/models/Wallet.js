import { DataTypes } from 'sequelize'
import sequelize from '../config.js'
import { User } from './Users.js'

export const Wallet = sequelize.define(
  'Wallet',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    walletName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    defaultWalletName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    qr: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    balance: {
      type: DataTypes.DECIMAL(20, 8),
      allowNull: false,
      defaultValue: 0.0,
    },
    created: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'wallets',
    timestamps: false,
  }
)

Wallet.belongsTo(User, { foreignKey: 'userId' })
User.hasMany(Wallet, { foreignKey: 'userId' })

export default Wallet
