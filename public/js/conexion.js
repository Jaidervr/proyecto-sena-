let mysql = require("mysql");

let conexion = mysql.createConnection({
    host: "localhost",
    database: "proyecto",
    user: "root",
    password: ""
});

conexion.connect(function(err){
    if(err){
        throw err;
    }else{
        console.log("Conexion Exitosa");
    }
})

conexion.end();