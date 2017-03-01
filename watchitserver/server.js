var app = require('express')();
var config = require('./helpers/config')

app.set('json spaces', 4);
app.use(function (req, res, next) 
{
    res.setHeader('Content-Type', 'application/json');
    next()
})


app.use('/api', require('./helpers/api_router'));
app.use('/admin', require('./helpers/admin_router'));

 
//git add . & git commit -m "Update" & git push heroku master
config.server = app.listen(config.port, function() 
{
    console.log('App is listening on port %s', config.port);
});


//function by avr.amit
Array.prototype.ObjectsRemoveKey = function(key) 
{
	newArr = []
  	for(var i = 0; i < this.length; ++i)
    {
    	obj = this[i]
    	if (obj[key] != undefined)
    	{
    		delete obj[key]
    	 	newArr.push(obj) //dont use newArr[i] = obj > can make error if i = not start from 0
    	}
    }
    //fix - if key not found
    if (newArr.length == 0)
    {
    	return this;
    }
    return newArr;
}


Array.prototype.contains = function(element)
{
    return this.indexOf(element) > -1;
};