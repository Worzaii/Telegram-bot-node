import { Sequelize, Dialect } from "sequelize";
import { env,db } from "../config/env.js";
const sequelize = new Sequelize({
    dialect: db.dialect as Dialect,
    host: db.host ?? "127.0.0.1",
    port: db.port,
    database: db.database!,
    username: db.username!,
    password: db.password!,
    logging: (log) => {
        console.log(log)},
});
export default sequelize;