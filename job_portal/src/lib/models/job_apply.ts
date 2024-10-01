import { DataTypes, Model, Optional } from "sequelize";
import  sequelize  from "../dbconnection";
import Applicant from "./applicants";
import Jp_Job from "./jp_jobs";

interface JobApplyAttributes {
  id: number;
  employer_id: number;
  applicant_id: number;
  job_id: number;
  createdAt: Date;
  updatedAt: Date;
}

interface JobApplyCreationAttributes extends Optional<JobApplyAttributes, "id"> {}

class JobApply extends Model<JobApplyAttributes, JobApplyCreationAttributes> implements JobApplyAttributes {
  public id!: number;
  public employer_id!: number;
  public applicant_id!: number;
  public job_id!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
}

JobApply.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    employer_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "jp_employers",
        key: "employer_id",
      },
    },
    applicant_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "jp_applicants",
        key: "applicant_id",
      },
    },
    job_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "jp_jobs",
        key: "job_id",
      },
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
    tableName: "jp_job_apply",
    timestamps: true, // Prevent Sequelize from adding its own `createdAt` and `updatedAt` fields
  }
);
// JobApply.belongsTo(Applicant, { foreignKey: "applicant_id" });
// JobApply.belongsTo(Jp_Job, { foreignKey: "job_id" });
export default JobApply;
