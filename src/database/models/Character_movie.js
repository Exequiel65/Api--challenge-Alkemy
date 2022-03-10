module.exports = (sequelize, DataTypes) =>{

    let alias = "Character_movie";

    let cols = {
        id : {
            type: DataTypes.INTEGER.UNSIGNED, 
            allowNull : false,
            autoIncrement : true,
            primaryKey : true,
        },
        id_character : {
            type: DataTypes.INTEGER.UNSIGNED, 
            allowNull : false
        },
        id_movie : {
            type: DataTypes.INTEGER.UNSIGNED, 
            allowNull : false
        }

    }

    let config = {
        tableName : "character_movies",
        timestamps : false
    }

    const Character_movie = sequelize.define(alias, cols, config)

    // Categorie.associate = (models)=>{
    //     Categorie.hasMany(models.Product,{
    //         as : "products",
    //         foreignKey : "id_category"
    //     })
    // }

    return Character_movie

}