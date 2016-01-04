
//Function that handles the reading of files and merge in values 
//Read from file and get string
//merge values into string
var fs = require('fs');

function mergeValues(values, content) {
    //Cycle over the keys of the values
    for(var key in values) {
        //Replace all keys with the values from the values object
        content = content.replace('{{' + key + '}}', values[key]);
    }
    

    //return merged content
    return content;
}


function view (templateName, values, response) {
    //read from the template files 
    var fileContents = fs.readFileSync('./views/'+templateName + '.html', {encoding: 'utf8'})
    //insert into response
    fileContents = mergeValues(values, fileContents)
    response.write(fileContents);


    //insert values into the content

    //write out to the response


}

module.exports.view = view;