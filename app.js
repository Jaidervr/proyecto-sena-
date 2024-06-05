const express = require("express");
const mysql = require("mysql")
const app = express();
const bcryptjs = require("bcryptjs");

const dotenv = require("dotenv");
dotenv.config({path:"./env/.env"});

let conexion = mysql.createConnection({
    host: "localhost",
    database: "proyecto",
    user: "root",
    password: ""
});
//configuracion
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static("public"));

app.get("/", function(req,res){
    res.render("index")

});

app.get("/login", function(req,res){
    res.render("login");
});


app.get("/registro", function(req,res){
    res.render("registro");
});

app.get("/servi", function(req,res){
    res.render("servi");
});

app.get("/membresia", function(req,res){
    res.render("membresia");
});

app.get("/op", function(req,res){
    res.render("op");
});

app.post("/registro", async (req,res)=>{
    const nombreU = req.body.nombre;
    const apellidoU = req.body.apellido;
    const telefonoU = req.body.telefono;
    const documentoU = req.body.documento;
    const usernameU = req.body.username;
    const passwordU = req.body.password;
    const correoU = req.body.correo;
    let passwordHaash = await bcryptjs.hash(passwordU, 8);

    let buscar = "SELECT * FROM usuarionuevo WHERE Cedula = "+documentoU+"";
    let buscar2 = "SELECT * FROM usuarionuevo WHERE Correo = "+correoU+"";

    conexion.query(buscar, async(error, results)=>{
        if(error){
            throw error;                     
        }else{
            if(results.length>0){
                res.render("registro",{
                    alert:true,
                    alertTitle: "Error",
                    alertMessage: "El numero de documento ya existe",
                    alertIcon: "error",
                    showConfirmButton:false,
                    timer: 3000,
                    color: "blueviolet",
                    background: "#2F2A28",
                    ruta:"registro"
                })
            }else{
                conexion.query("INSERT INTO usuarionuevo SET ?",{Cedula:documentoU, NombreDeUsuarioNuevo:usernameU, NombreUsuario:nombreU, ApellidoUsuario:apellidoU, Correo:correoU, Telefono:telefonoU, Contrasena:passwordHaash}, async(error, results)=>{
                    if(error){
                        console.log(error)
                    }else{
                        res.render("registro",{
                            alert:true,
                            alertTitle: "Registro",
                            alertMessage: "!Registro Exitoso¡",
                            alertIcon: "success",
                            showConfirmButton:false,
                            timer: 4000,
                            color: "blueviolet",
                            background: "#2F2A28",
                            ruta:"login"
                        })
                    }
                })
            }
        }
    })
});


app.post("/login", async (req, res)=>{
    const user = req.body.user;
    const pass = req.body.password;
    let passwordHaash = await bcryptjs.hash(pass, 8);

    if(user && pass){
        conexion.query("SELECT * FROM usuarionuevo WHERE NombreDeUsuarioNuevo = ?", [user], async (error, results)=>{
            if(results.length == 0 ||!(await bcryptjs.compare(pass, results[0].Contrasena))){
                res.render("login",{
                    alert:true,
                    alertTitle: "Error",
                    alertMessage: "Usuario y/o contraseña incorrectas",
                    alertIcon: "error",
                    showConfirmButton:true,
                    timer: false,
                    color: "blueviolet",
                    background: "#2F2A28",
                    ruta:"login"
                })
            }else{
                res.render("login",{
                    alert:true,
                    alertTitle: "Conexion exitosa",
                    alertMessage: "LOGIN CORRECTO",
                    alertIcon: "success",
                    showConfirmButton:false,
                    timer: 3000,
                    color: "blueviolet",
                    background: "#2F2A28",
                    ruta:""
                })                
            }
        })
    }else{
        res.render("login",{
            alert:true,
            alertTitle: "Advertencia",
            alertMessage: "Por favor ingrese un usuario y/o contraseña",
            alertIcon: "warning",
            showConfirmButton:false,
            timer: 3000,
            color: "blueviolet",
            background: "#2F2A28",
            ruta:"login"
        }) 
    }
});


app.listen(3000, function(){
    console.log("Servidor creado http://localhost:3000");
});