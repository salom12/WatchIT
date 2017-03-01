var express = require('express');
var router = express.Router();
var config = require('./config');
var session = require('express-session');

var fs = require('fs');


router.use(session(
{
    secret: '470e76c1-520b-4704-be6b-55bc9068ed13',
    resave: true,
    saveUninitialized: true
}));
 
//Authentication 
var auth = function(req, res, next)  
{
    //if (req.session && req.session.user === config.admin.username && req.session.admin)
    if (req.session && req.session.admin)
    {
        console.log('[*] Admin login  ' + req.session.user);
        return next();
    }
    else
    {
        return res.sendStatus(401);
    } 
};

//Send html view of login screen
router.get('/', function (req, res) 
{
    fs.readFile('views/login.html',function (err, data)
    {
        res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
        res.write(data);
        res.end();
    });
});

// Login endpoint
router.get('/login', function (req, res) 
{
    var usernameQu = req.query.username;
    var passwordQu = req.query.password;
    if (!usernameQu || !passwordQu) 
    {
        res.status(200).json(
        {
            success: true,
            data: 'Login failed'
        });  
        return;
    } 
    //if(usernameQu == config.admin.username && passwordQu == config.admin.password) 
    user = config.users[usernameQu];
    if(user && passwordQu == user.password) 
    {
        req.session.user = user.name;
        req.session.admin = user.is_admin;
        res.status(200).json(
        {
            success: true,
            data: 'Login success, Welcome ' + user.name
        });
        return;
    }
    else
    {
        res.status(200).json(
        {
            success: true,
            data: 'Login failed - Username or password are incorrect'
        });  
    }
});
 
// Logout endpoint
router.get('/logout', function (req, res)
{
  req.session.destroy();
  res.send("logout success!");
});
 


 

router.get('/add', auth, function (req, res) 
{
    fs.readFile('views/add.html',function (err, data)
    {
        res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
        res.write(data);
        res.end();
    });
});



 //add movie end point
var imdb = require('imdb');
router.get('/insert', auth, function(req, res)
{

    var videoUrl = req.query.vid;
    var imdbID = req.query.imdb_id; //tt1431045
    if (imdbID != null && videoUrl != null)
    {
        config.db.movies.find({imdbID:imdbID}, function(error,results)
        {
            if (error)
            {
                console.log(error);
                res.end(error);
            }
            //if movie not exists
            if  (results.length == 0)
            {
                imdb(imdbID, function(error, data) 
                {
                    if (error)
                    {
                        res.end('Cant get data for movie with id ' + imdbID);
                        return;
                    }
             
                    if (data)
                    {
                        item =  
                        {
                            imdbID:imdbID,
                            title:data.title,
                            year:data.year,
                            runtime:data.runtime,
                            poster:data.poster,
                            genres:data.genre, 
                            soruces:videoUrl
                        }


                        config.db.movies.insert(item, function(error,results)
                        {
                            if (error)
                            {
                                res.end('error');
                                return;
                            }
                            console.log('[*] New movie add to db "%s"', results.title);
                            res.send(
                            {
                                success:true,
                                results:results
                            });
                            res.end();
                        });

                    }
                });
            }
            else
            {
                res.end('movie exists');
            }
        });
        
    }
    else
    {
        res.end('error');
    }
});




module.exports = router
