const mongoose = require("mongoose");
const castAggregation = require("mongoose-cast-aggregation");

mongoose.plugin(castAggregation);

const DB_PORT = process.env.DB_PORT || 27017;
const DB_NAME = process.env.DB_NAME || "minibar";

mongoose.connect(
  `mongodb://localhost:${DB_PORT}/${DB_NAME}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(`😢 Something went wrong with the database: ${err}`);
    } else {
      console.log(`🍾 Database connected @ port: ${DB_PORT}`);
    }
  }
);

module.exports = mongoose;
