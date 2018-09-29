module.exports = function(sequelize, DataTypes) {
  var Activity = sequelize.define('Activity', {
    showsWatched: DataTypes.STRING,
    showsGenre: DataTypes.STRING,
    showsActors: DataTypes.STRING,
    showsDirector: DataTypes.STRING,
    showsRating: DataTypes.INTEGER
  });
  return Activity;
};
