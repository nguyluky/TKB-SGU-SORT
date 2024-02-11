var db = require('./db/databaseHandle');

// db.sign_in({
//     body: {
//         user: 'khachieu',
//         password: 'pass'
//     }}, 
//     function(err, result) {
//         console.log(result);
//     })


db.sign_up({
    body: {
        user: 'khachieu1',
        password: 'pass1'
    }}, function(err, result) {
    console.log(result);
})