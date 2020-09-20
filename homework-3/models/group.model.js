import { DataTypes } from 'sequelize';

export default (sequelize) => {
    sequelize.define('group', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING
        },
        permissions: {
            type: DataTypes.ARRAY(DataTypes.STRING)
        }
    });
};
