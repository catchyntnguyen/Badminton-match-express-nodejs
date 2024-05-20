const express = require('express');
const path = require('path');
const configViewEngine = (app) => {
    //confip template engine
    app.use(express.static('./app/public'))
    app.use(express.static('./app/uploads'))
    app.set("view engine", "ejs");
    app.set("views", "./app/views")
}
module.exports = configViewEngine;