var Profile = require('./profile.js')
var renderer = require('./renderer.js')
var querystring = require('querystring')

var commonHeaders = { 'Content-Type': 'text/html' }

//Handle the HTTP route GET / and POST / i.e. HOME
function home(request, response) {
  if (request.url === '/') {
    if (request.method.toLowerCase() === 'get') {
        //show default search box
        response.writeHead(200, commonHeaders);
        renderer.view('header', {}, response);
        renderer.view('search', {}, response);
        renderer.view('footer', {}, response);
        response.end();    
    } else {
        //if URL = '/' && POST redirect to the username
        //get POST data from body
        //extract username 
        request.on('data', function (postBody) {
            var query = querystring.parse(postBody.toString());
            response.writeHead(303, {Location: "/" + query.username});
            response.end();
        })
        //redirect to username

    }
  }

  

}
//if URL = '/' && GET show the search field


//Handle the HTTP for GET/:username i.e. /username
function user(request, response) {
    var username = request.url.replace('/', '');
    if (username.length > 0) {
        response.writeHead(200, commonHeaders);
        renderer.view('header', {}, response);

        //get JSON from treehouse
        var studentProfile = new Profile(username);

        studentProfile.on("end", function (profileJSON) {
            //show profile

            //store the values that we need
            var values = {
                avatarUrl: profileJSON.gravatar_url,
                username: profileJSON.profile_name,
                badges: profileJSON.badges.length,
                javaScriptPoints: profileJSON.points.JavaScript
            }
            //Simple response
            renderer.view('profile', values, response);
            renderer.view('footer', {}, response);
            response.end();
        });

        studentProfile.on("error", function (error) {
            //show error
            renderer.view('error', {errorMessage: error.message}, response);
            renderer.view('search', {}, response);
            renderer.view('footer', {}, response);
            response.end();
        }) ;
    }
}
//if the url is == '/...' get JSON from Treehouse
//on end show the profile and if error show error


module.exports.home = home;
module.exports.user = user;