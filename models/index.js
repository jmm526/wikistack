const Sequelize = require("sequelize");
const db = new Sequelize("postgres://localhost:5432/wikistack2", {
    logging: false
});

const Page = db.define("page", {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('open', 'closed')
  }
});

const User = db.define("user", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    isUnique: true,
    validate: {
      isEmail: true
    }
  }
})

Page.beforeValidate( async (pageInstance, optionsObject) => {
  let tempSlug = generateSlug(pageInstance.title)
  let dbSearch = await Page.findAll({
    where: { slug: tempSlug }
  })
  while (dbSearch.length > 0) {
    tempSlug = randomStr()
    dbSearch = await Page.findAll({
      where: { slug: tempSlug }
    })
  }
  pageInstance.slug = tempSlug
//   console.log(dbSearch)
})

Page.afterCreate((pageInstance, optionsObject) => {
//   console.log('Pageinstance', pageInstance)
})

function generateSlug (title) {
  if (!title) {
    return randomStr()
  }
  return title.replace(/\s+/g, '_').replace(/\W/g, '');
}

function randomStr() {
  let ret = ''
  for (var i = 0; i < 10; i++) {
    ret = ret + String.fromCharCode(Math.floor(Math.random() * 26) + 97)
  }
  return ret
}


module.exports = { Page, User, db };
