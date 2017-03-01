var mongoDB = require('mongojs')('mongodb://****username****:****password****@url:port/movies');

var config = {};


config.port = process.env.PORT || 8080;
config.appRoot = require('app-root-path');





config.db = 
{
	movies:mongoDB.collection('movies')
};


/*
config.admin =
{
	username:'admin',
	password:'admin'
};
*/

config.users =
{
	'admin':{password:'admin', is_admin:true, name:'amit'},
};
                     


module.exports = config;