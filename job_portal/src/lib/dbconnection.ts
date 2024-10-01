// lib/sequelize.ts
import { Sequelize } from 'sequelize';

let sequelize: any;

if (!sequelize) {
  sequelize = new Sequelize({
    host: process.env.NEXT_PUBLIC_DB_HOST || "",
    username: process.env.NEXT_PUBLIC_DATABASE_USER || "",
    password: process.env.NEXT_PUBLIC_DATABASE_PASSWORD || "",
    database: process.env.NEXT_PUBLIC_DATABASE || "",
    dialect: "mysql",
    dialectModule: require('mysql2'),
    logging: false,
    benchmark: true,
  });

  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully to Database MySql.");
    })
    .catch((err: Error) => {
      console.error("Unable to connect to the database:", err);
    });
}

export default sequelize;
