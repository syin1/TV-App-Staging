module.exports = function(sequelize, DataTypes) {
  var Activity = sequelize.define('Activity', {
    showsWatched: DataTypes.STRING,
    showsGenre: DataTypes.STRING,
    showsRating: DataTypes.INTEGER
  });
  return Activity;
};
