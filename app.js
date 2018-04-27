const bodyParser = require('body-parser')
const express = require("express");
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));



const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});