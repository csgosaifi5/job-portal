import { DataTypes, Model, Optional } from 'sequelize';
import  sequelize  from "../dbconnection";
import JobApply from './job_apply';

interface ApplicantAttributes {
  applicant_id?: number;
  first_name: string;
  last_name: string;
  phone?: number;
  password?: string;
  reset_password_token?: string;
  account_verified_token?: string;
  is_active?: boolean;
  email_id: string;
  country?: string;
  city?: string;
  languages?: string;
  zip_code?: number;
  full_address?: string;
  designation?: string;
  age?: number;
  current_ctc?: number;
  expected_ctc?: number;
  description?: string;
  image?: string;
  resume_url?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ApplicantCreationAttributes extends Optional<ApplicantAttributes, 'applicant_id'> {}

class Applicant extends Model<ApplicantAttributes, ApplicantCreationAttributes> implements ApplicantAttributes {
  public applicant_id!: number;
  public first_name!: string;
  public last_name!: string;
  public phone!: number;
  public password!: string;
  public reset_password_token!: string;
  public account_verified_token!: string;
  public is_active!: boolean;
  public email_id!: string;
  public country!: string;
  public city!: string;
  public languages!: string;
  public zip_code!: number;
  public full_address!: string;
  public designation!: string;
  public age!: number;
  public current_ctc!: number;
  public expected_ctc!: number;
  public description!: string;
  public image!: string;
  public resume_url!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Applicant.init(
  {
    applicant_id: {
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
    phone: {
      type: DataTypes.BIGINT,
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
    email_id: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    languages: {
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
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    current_ctc: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    expected_ctc: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    resume_url: {
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
    tableName: 'jp_applicants',
  }
);


Applicant.hasMany(JobApply, { foreignKey: "applicant_id" });
JobApply.belongsTo(Applicant, { foreignKey: "applicant_id" });


export default Applicant;
