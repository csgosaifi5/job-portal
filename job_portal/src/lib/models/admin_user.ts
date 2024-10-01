import { DataTypes, Model, Optional } from 'sequelize';
import  sequelize  from "../dbconnection";

// Interface for User attributes
interface UserAttributes {
  id: number;
  title?: string;
  first_name: string;
  email_id: string;
  role: 'admin' | 'lead-recruiter' | 'recruiter' | 'client' | 'account';
  password: string;
  reset_password_token?: string;
  account_verified_token?: string;
  is_active?: boolean;
  last_name: string;
  profile_img?: string;
  phone_number?: string;
  designation?: string;
  createdAt?: Date;
}

// Interface for creating User instances, making id optional
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// User model definition
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public title?: string;
  public first_name!: string;
  public email_id!: string;
  public role!: 'admin' | 'lead-recruiter' | 'recruiter' | 'client' | 'account';
  public password!: string;
  public reset_password_token?: string;
  public account_verified_token?: string;
  public is_active?: boolean;
  public last_name!: string;
  public profile_img?: string;
  public phone_number?: string;
  public designation?: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email_id: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('admin', 'lead-recruiter', 'recruiter', 'client', 'account'),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reset_password_token: {
      type: DataTypes.STRING,
    },
    account_verified_token: {
      type: DataTypes.STRING,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profile_img: {
      type: DataTypes.STRING,
    },
    phone_number: {
      type: DataTypes.STRING,
    },
    designation: {
      type: DataTypes.STRING,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'user',
    defaultScope: { attributes: { exclude: ['password'] } },
  }
);

export default User;
