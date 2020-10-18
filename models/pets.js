module.exports = function (sequelize, Sequelize) {
    var Pet = sequelize.define("Pet", {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        age: {
            type: Sequelize.STRING,
        },
        gender: {
            type: Sequelize.STRING,    
        },
        breed: {
            type: Sequelize.STRING,
        },
        size: {
            type: Sequelize.STRING,
        },
        url: {
            type: Sequelize.STRING,
        },
        img: {
            type: Sequelize.STRING,
        },
        notes: {
            type: Sequelize.TEXT
        }
    });

    Pet.associate = function(models) {
        Pet.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        })
    }
        return Pet;
    };

    