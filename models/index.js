const Sequelize = require("sequelize");
const db = new Sequelize("postgres://localhost:5432/wikistack2");

const Page = db.define("page", {
  title: {
    type: Sequelize.STRING
  },
  slug: {
    type: Sequelize.TEXT
  },
  content: {
    type: Sequelize.TEXT
  },
  status: {
    type: Sequelize.ENUM('open', 'closed')
  }
});

const User = db.define("user", {
  name: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
    isUnique: true,
    validate: {
      isEmail: true
    }
  }
})

module.exports = { Page, User };
