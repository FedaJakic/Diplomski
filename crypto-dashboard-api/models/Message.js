import { DataTypes } from 'sequelize'
import sequelize from '../config.js'
import { User } from './Users.js'

export const Message = sequelize.define(
  'Message',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    senderId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    receiverId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    isViewed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    created: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'messages',
    timestamps: false,
  }
)

User.hasMany(Message, { foreignKey: 'senderId', as: 'sentMessages' })
User.hasMany(Message, { foreignKey: 'receiverId', as: 'receivedMessages' })
Message.belongsTo(User, { foreignKey: 'senderId', as: 'sender' })
Message.belongsTo(User, { foreignKey: 'receiverId', as: 'receiver' })
