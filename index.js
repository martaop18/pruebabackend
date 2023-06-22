const express = require('express');
const app = express();
const PORT = 7204


//SETTING APPS

app.use(express.json());


db.then( () => {
    app.listen(PORT, () => {
        console.log('Server is running on port: ' + PORT);
    })
}).catch((error)=>{
    console.error('error starting server')
})


