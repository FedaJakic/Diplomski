import { DataTypes, Model } from 'sequelize'
import sequelize from '../config.js'

export const CryptoCache = sequelize.define(
  'CryptoCache',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rank: {
      type: DataTypes.SMALLINT,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    official_website: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    whitepaper: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    current_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    cap: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    volume: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    all_time_high_usd: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    delta_hour: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    delta_day: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    history_7_days: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    visible: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    tableName: 'crypto_cache',
    timestamps: true,
  }
)
