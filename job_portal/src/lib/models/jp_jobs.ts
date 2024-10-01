import { DataTypes, Model, Optional } from "sequelize";
import  sequelize  from "../dbconnection";
import JobApply from "./job_apply";

// Define the attributes for the model
interface JobAttributes {
  job_id: number;
  employer_id?: number;
  title?: string;
  contact_email?: string;
  job_type?: string;
  experience?: number;
  min_salary?: number;
  max_salary?: number;
  region?: string;
  status?: string;
  category?: string;
  job_address?: string;
  job_requirements?: string;
  description?: string;
  file?: string;
  tags?: string;
  image?: string;
  banner_title?: string;
  banner_image?: string;
  meta_description?: string;
  meta_keywords?: string;
  meta_title?: string;
  slug?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the attributes that are optional when creating a new record
interface JobCreationAttributes extends Optional<JobAttributes, "job_id"> {}

// Define the Job model
class Jp_Job extends Model<JobAttributes, JobCreationAttributes> implements JobAttributes {
  public job_id!: number;
  public employer_id?: number;
  public title?: string;
  public contact_email?: string;
  public job_type?: string;
  public experience?: number;
  public min_salary?: number;
  public max_salary?: number;
  public region?: string;
  public status?: string;
  public category?: string;
  public job_address?: string;
  public job_requirements?: string;
  public description?: string;
  public file?: string;
  public tags?: string;
  public image?: string;
  public banner_title?: string;
  public banner_image?: string;
  public meta_description?: string;
  public meta_keywords?: string;
  public meta_title?: string;
  public slug?: string;
  public createdAt?: Date;
  public updatedAt?: Date;
}

// Initialize the Job model
Jp_Job.init(
  {
    job_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    employer_id: {
      type: DataTypes.INTEGER,
      allowNull: true, // Foreign key may be optional
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    contact_email: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    job_type: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    experience: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    min_salary: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    max_salary: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    region: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    category: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    job_address: {
      type: DataTypes.STRING(300),
      allowNull: true,
    },
    job_requirements: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    file: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    tags: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    banner_title: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    banner_image: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    meta_description: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    meta_keywords: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    meta_title: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    slug: {
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
    tableName: "jp_jobs",
    timestamps: true, // Ensure Sequelize manages createdAt and updatedAt
  }
);
Jp_Job.hasMany(JobApply, { foreignKey: "job_id" });
JobApply.belongsTo(Jp_Job, { foreignKey: "job_id" });
export default Jp_Job;
