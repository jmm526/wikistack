const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const wikiRouter = require('./routes/wiki')
const userRouter = require('./routes/user')
const morgan = require("morgan");
const layout = require('./views/layout');
const models = require('./models');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));

app.use('/wiki', wikiRouter);
app.use('/user', userRouter);

app.get("/", (req, res) => {
  res.redirect('/wiki', )
//   res.json("Hello World");
});

const init = async () => {
  await models.db.sync({force:true});       // resets database everytime server resets

  const PORT = 1337;

  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });
}

init();


