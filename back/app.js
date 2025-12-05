const express = require("express");
const app = express();
const port = 4000;

const start = async () => {
  try {
    app.listen(port, () => console.log(`App is running on port ${port}`));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
