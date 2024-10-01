// let Sequelize = require("sequelize");
import { DataTypes } from 'sequelize';
import  sequelize  from "../dbconnection";

const Jobs = sequelize.define("jobs", {
  job_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  job_role: {
    type: DataTypes.STRING,
  },
  job_name: {
    type: DataTypes.STRING,
  },
  hiring_manager: {
    type: DataTypes.STRING,
  },
  hrbp: {
    type: DataTypes.STRING,
  },

  ext_job_name: {
    type: DataTypes.STRING,
    // allowNull: false
  },
  company_name: {
    type: DataTypes.STRING,
  },

  company_location: {
    type: DataTypes.STRING,
  },
  department: {
    type: DataTypes.STRING,
  },
  ctc_min: {
    type: DataTypes.DECIMAL,
    // allowNull: true,
  },
  ctc_max: {
    type: DataTypes.DECIMAL,
    // allowNull: true,
  },
  experience_min: {
    type: DataTypes.DECIMAL,
    // allowNull: true,
  },
  experience_max: {
    type: DataTypes.DECIMAL,
    // allowNull: true,
  },
  key_skills: {
    type: DataTypes.STRING,
    // allowNull: true,
  },
  description: {
    type: DataTypes.TEXT,
    // allowNull: false
  },
  // client_documents: {
  //   type: DataTypes.STRING(1000),
  //   get() {
  //     if (this.getDataValue("client_documents") == null) {
  //       return null;
  //     } else {
  //       return this.getDataValue("client_documents").split(";");
  //     }
  //   },
  //   set(val) {
  //     if (val == null) {
  //       this.setDataValue("client_documents", null);
  //     } else if (typeof val == "string") {
  //       this.setDataValue("client_documents", val);
  //     } else {
  //       this.setDataValue("client_documents", val.join(";"));
  //     }
  //   },
  // },
  // published_to: {
  //   type: DataTypes.STRING,
  //   get() {
  //     if (this.getDataValue("published_to") == null) {
  //       return null;
  //     } else {
  //       return this.getDataValue("published_to").split(";");
  //     }
  //   },
  //   set(val) {
  //     if (val == null) {
  //       this.setDataValue("published_to", null);
  //     } else if (typeof val == "string") {
  //       this.setDataValue("published_to", val);
  //     } else {
  //       this.setDataValue("published_to", val.join(";"));
  //     }
  //   },
  // },
  share_with_consultant: {
    type: DataTypes.BOOLEAN,
    // allowNull: false
  },

  forClient: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  clientAddressGstId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  assigned_recruiter: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  deadline_date: {
    type: DataTypes.DATE,
    // allowNull: false
  },

  applicant_count: {
    type: DataTypes.INTEGER,
  },
  status: {
    type: DataTypes.ENUM,
    values: ["Published", "Archieved", "Closed by Derive", "Closed internally", "Hold", "Not Hiring Now"],
  },
  approval_status: {
    type: DataTypes.ENUM,
    values: ["approved", "pending"],
  },
  designation: {
    type: DataTypes.STRING,
  },
  vendor_hiring_approved: {
    type: DataTypes.BOOLEAN,
  },
  wp_job_id: {
    type: DataTypes.INTEGER,
  },
  wp_job_link: {
    type: DataTypes.STRING,
  },
});



export default Jobs;
