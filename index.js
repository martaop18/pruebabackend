const express = require('express');

const db = require('./db');
const app = express();
const PORT = 7000


//SETTING APPS

app.use(express.json());
// app.use(router);


db.then( () => {
    app.listen(PORT, () => {
        console.log('Server is running on port: ' + PORT);
    })
}).catch((error)=>{
    console.error('error starting server')
})


