import { DataTypes, Model, Optional } from "sequelize";
import  sequelize  from "../dbconnection";

interface ServiceAttributes {
  service_id: number;
  title: string;
  overview: string;
  description: string;
  image: string;
  banner_title: string;
  banner_image: string;
  meta_description: string;
  meta_keywords: string;
  meta_title: string;
  slug: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ServiceCreationAttributes extends Optional<ServiceAttributes, "service_id"> {}

class Service extends Model<ServiceAttributes, ServiceCreationAttributes> implements ServiceAttributes {
  public service_id!: number;
  public title!: string;
  public overview!: string;
  public description!: string;
  public image!: string;
  public banner_title!: string;
  public banner_image!: string;
  public meta_description!: string;
  public meta_keywords!: string;
  public meta_title!: string;
  public slug!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Service.init(
  {
    service_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    overview: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT("long"),
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
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "jp_services",
  }
);

export default Service;
