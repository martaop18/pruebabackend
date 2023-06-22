const express = require('express');
const app = express();
const PORT = 7204

app.listen(7204, ()=>{
    console.log('server is running on port: ' + PORT);
})