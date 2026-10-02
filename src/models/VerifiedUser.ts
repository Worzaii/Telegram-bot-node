import { DataTypes } from "sequelize";
import sequelize from "../tools/sequelize.js";

const VerifiedUser = sequelize.define("VerifiedUser", {
    telegramUserId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    verifiedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: "verified_users",
});

export default VerifiedUser;