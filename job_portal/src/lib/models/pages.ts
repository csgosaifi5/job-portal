import { DataTypes, Model, Optional } from "sequelize";
import  sequelize  from "../dbconnection";

interface PagesAttributes {
  pages_id: number;
  pagefor: string;
  content: string;
}

interface PageCreationAttributes extends Optional<PagesAttributes, "pages_id"> {}

class Pages extends Model<PagesAttributes, PageCreationAttributes> implements PagesAttributes {
  public pages_id!: number;
  public pagefor!: string;
  public content!: string;
}

Pages.init(
  {
    pages_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    pagefor: {
      type: DataTypes.STRING,
    },
    content: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    tableName: "jp_pages",
  }
);

export default Pages;
