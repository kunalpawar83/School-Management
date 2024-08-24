const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const  sequelize  = require('./utils/db.js');
const schoolRoute = require('./routes/schoolRoute.js');

const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", schoolRoute);
sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(error => {
    console.error('Unable to connect to the database:', error);
  });

    