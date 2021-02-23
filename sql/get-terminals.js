const express = require('express');
const path = require('path');
const fs = require('fs');
const connection = require('../src/server');

const router = express.Router();


router.get('/', async(req, res) => {
      console.log('two');

    const users = fs.readFileSync(path.join(__dirname, '../sql/get-terminals.sql')).toString();
    connection.query(users,  (err, result) => {
        if (err){
          console.log(err);
             throw err;
        }else{
          res.send({ express: result});
            console.log(result);

        }
    
        });

})




module.exports = router;
