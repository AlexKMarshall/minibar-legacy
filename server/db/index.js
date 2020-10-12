const mongoose = require("mongoose");
const castAggregation = require("mongoose-cast-aggregation");
require("dotenv").config();

mongoose.plugin(castAggregation);

const DB_URI = process.env.DB_URI;

mongoose.connect(
  DB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(`😢 Something went wrong with the database: ${err}`);
    } else {
      console.log(`🍾 Database connected`);
    }
  }
);

module.exports = mongoose;
