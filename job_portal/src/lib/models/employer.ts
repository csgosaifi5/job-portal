import { DataTypes, Model, Optional } from "sequelize";
import  sequelize  from "../dbconnection";

interface EmployerAttributes {
  employer_id?: number;
  first_name: string;
  last_name: string;
  password: string;
  reset_password_token?: string;
  account_verified_token?: string;
  is_active?: boolean;
  company_name?: string;
  website_link?: string;
  description?: string;
  phone?: number;

  email_id: string;
  company_email?: string;
  founded_date?: string;
  category?: string;
  location?: string;
  facebook_link?: string;
  twitter_link?: string;
  instagram_link?: string;
  linkedin_link?: string;
  
  country?: string;
  city?: string;
  zip_code?: number;
  full_address?: string;
  designation?: string;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface EmployerCreationAttributes extends Optional<EmployerAttributes, "employer_id"> {}

class Employer extends Model<EmployerAttributes, EmployerCreationAttributes> implements EmployerAttributes {
  public employer_id!: number;
  public first_name!: string;
  public last_name!: string;
  public password!: string;
  public reset_password_token!: string;
  public account_verified_token!: string;
  public is_active!: boolean;
  public company_name!: string;
  public company_email!: string;
  public founded_date!: string;
  public category!: string;
  public location!: string;
  public facebook_link!: string;
  public twitter_link!: string;
  public instagram_link!: string;
  public linkedin_link!: string;
  public website_link!: string;
  public description!: string;
  public phone!: number;
  public email_id!: string;
  public country!: string;
  public city!: string;
  public zip_code!: number;
  public full_address!: string;
  public designation!: string;
  public image!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Employer.init(
  {
    employer_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    last_name: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    reset_password_token: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    account_verified_token: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    company_name: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    website_link: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    company_email: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    founded_date: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    category: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },

    facebook_link: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    twitter_link: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    instagram_link: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    linkedin_link: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    phone: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    email_id: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    zip_code: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    full_address: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    designation: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "jp_employers",
  }
);

export default Employer;
