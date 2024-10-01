import { DataTypes, Model, Optional } from "sequelize";
import  sequelize  from "../dbconnection";

interface ContactAttributes {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  message: string;
}

interface ContactFormAttributes extends Optional<ContactAttributes, "id"> {}

class ContactForm extends Model<ContactAttributes, ContactFormAttributes> implements ContactAttributes {
  public id!: number;
  public first_name!: string;
  public last_name!: string;
  public email!: string;
  public message!: string;
}

ContactForm.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
    },
    last_name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    message: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    tableName: "jp_contact_form",
  }
);

export default ContactForm;
