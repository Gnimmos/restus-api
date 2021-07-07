const { json } = require('body-parser');
const fs = require('fs');
const path = require('path');

await function cangeenddate(date) {


  fs.readFile(path.join(__dirname, '../sql/withoutcompares.sql'), 'utf8', function (err,data) {
  if (err) {
      return console.log(err);
  }
  else{
    var setit =  JSON.stringify(date);
    setit = setit.slice(1, -1);
    var alldate = "set @todate='"+setit+"'";
    console.log(alldate)
    setdate = data.split("\n");
        //  var result = data.replace(/set @fromdate='2018-01-01 03:00:00'/g, "set @fromdate='" + setit + "'");

      var changedate = data.toString().split("\n").splice(16, 1, alldate).join("\n");
      console.log("Success: "+ changedate)
     var result = data.replace(changedate, alldate);
    console.log("Success2: "+ result)




      fs.writeFile(path.join(__dirname, '../sql/withoutcompares.sql'), result, 'utf8', function (err) {
          if (err) return console.log(err);
          else{
           // console.log("Success"+ result)
        }
              });
            }
  });
  
}

module.exports ={cangeenddate};