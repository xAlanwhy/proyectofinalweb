
const express = require('express');
const mysql = require('mysql');

const app = express();

const port = process.env.PORT || 3002;

const dbhost = process.env.HOST || 'localhost';
const dbdatabase = process.env.DATABASE || 'dbfinal';
const dbuser = process.env.USER || 'root';
const dbpassword = process.env.PASSWORD || '';


var conexion = mysql.createConnection({
    host: dbhost,
    database: dbdatabase,
    user: dbuser,
    password: dbpassword
})


var path = require("path")


app.set("view engine","ejs")

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get ("/home",(req, res)=>{
  res.render("index");
})

app.get ("/pagina1",(req, res)=>{
  res.render("informacion");
})

app.get ("/pagina2",(req, res)=>{
  res.render("contacto");
})

app.get ("/pagina3",(req, res)=>{
  res.render("juegos");
})

app.post("/validar", function (req, res) {
  const datos = req.body;

  let name = datos.nom;
  let email = datos.email;
  let phone = datos.phone;
  let subject = datos.sub;
  let message = datos.msg;

  let enviar = "INSERT INTO tabla_formularo (name, email, phone, subject, message) VALUES ('" + name+ "','" + email + "','" + phone + "','" + subject + "','" + message + "')";

  conexion.query(enviar, function (error) {
      if (error) {
          throw error;
      } else {
          console.log("Datos almacenados correctamente");
      }
  });

});


app.listen(port, (req, res) => {
  console.log('Servidor web escuchando en el puerto 3002');
});


 


