var app = require('../app.js');
var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {
	logging: false
});

//.define(name of model,object of column titles,object of methods?)
var Page = db.define("page",{
  title: {type: Sequelize.STRING, allowNull: false},
  urlTitle: {type: Sequelize.STRING,},
  content: {type: Sequelize.TEXT, allowNull: false},
  status: {type: Sequelize.ENUM('open', 'closed')},
  date: {type: Sequelize.DATE,defaultValue: Sequelize.NOW}

}, {getterMethods :{
    route : function(page){
      page.urlTitle = "/wiki/" + this.getDataValue("title");
    }
},
  hooks : {
    beforeValidate: function(page){  //table name as argument?
      if (page.title) {
        // Removes all non-alphanumeric characters from title
        // And make whitespace underscore
        page.title = page.title.replace(/\s+/g, '_').replace(/\W/g, '');
      } else {
        // Generates random 5 letter string
        page.title = Math.random().toString(36).substring(2, 7); //WHAT DOES toString(36) DO??
      }
    }
}});

var User = db.define("user",{
	name: {type : Sequelize.STRING, allowNull: false},
	email: {type: Sequelize.STRING, allowNull: false, validate:{isEmail: true}}
});
module.exports = {
	db: db,
	Page: Page,
	User: User
}
