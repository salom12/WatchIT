var express = require('express');
var router = express.Router();
var config = require('./config');





//http://www.omdbapi.com/?i=tt1431045&plot=short&r=json
router.get('/list', function(req, res)
{
    console.log('Api reqeust ' + req.url)
    //need to add search
    config.db.movies.find({}, function(error, results)
    {
        if (error)
        {
            res.end('error');
            return;
        }

        var data = results;
        //https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
        var sort = req.query.sort;
        if (sort)
        {
            switch (sort)
            {
                case 'runtime':
                    data = results.sort(function (a, b) 
                    {
                        NumInStr = function(str) { return  /\d/.test(str) };
                        if (NumInStr(a.runtime) && NumInStr(b.runtime))
                        {
                            return  parseInt(b.runtime,10) - parseInt(a.runtime,10); //return the longest
                        }
                        return;
                    }); 
                    break;
                case 'yearold':
                    data = results.sort(function (a, b) 
                    {
                        return a.year - b.year;
                    }); 
                    break;
                case 'yearnew':
                    data = results.sort(function (a, b) 
                    {
                        return b.year - a.year;
                    }); 
                    break;
            }
               
        }

        var remove = req.query.remove;
        if (remove)
        {
            rq = remove.split(',');
            for(var i = 0; i < rq.length; ++i)
            { 
                data = data.ObjectsRemoveKey(rq[i]);
            }
        }

        var category = req.query.cat;
        if (category)
        {
            data = data.GetGenres(category);
        }

        //arr.remove - main File
        data = data.ObjectsRemoveKey('_id');
        res.send(
        {
            success:true,
            itemsCount:data.length,
            results:data
        });
        res.end();
    });
});



Array.prototype.GetGenres = function(key) 
{
    newArr = []
    for(var i = 0; i < this.length; ++i)
    {
        obj = this[i]
        genres = obj['genres'][0].map(function(x) { return x.toUpperCase(); });
        if (genres.contains(key.toUpperCase()))
        {
            newArr.push(obj)
        }
    }
    return newArr;
}



module.exports = router

//need to add genres=x,y,z