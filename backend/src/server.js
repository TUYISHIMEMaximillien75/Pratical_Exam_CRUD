const express = require('express');
const dotenv = require('dotenv');
const mysql = require('mysql2');
const cors = require('cors')
dotenv.config()

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

db.connect((err)=>{
    if (err) throw err;
    console.log("DB is Connected")
})

const app = express();
app.use(express.json());
app.use(cors())
const port = process.env.PORT

// endpoints

app.post('/crpms/service', (req, res)=>{
    const {serviceName, servicePrice} = req.body;

    const serviceCode = '#crpms'+Math.floor(Math.random() * 10000)
    const sql = "INSERT INTO `services` (servicecode,servicename,serviceprice) VALUES(?,?,?)";
    db.query(sql, [serviceCode,serviceName,servicePrice], (err, result)=>{
        if(err) return res.status(500).json({message: "Sha byagoranye kbs"})
        return res.status(201).json({message: "Service saved"});
    })
})

app.get('/crpms/service', (req, res)=>{
    const sql = "SELECT * FROM `services`";
    db.query(sql, (err, result)=>{
        if(err) return res.status(500).json({message: "failed to leod services"});
        return res.status(200).json({message: " services retrieved", result})
    })
})

app.get('/crpms/service/:id', (req, res)=>{
    const {id} = req.params
    const sql = "SELECT * FROM `services` WHERE id = ?"
    db.query(sql, [id], (err, result)=>{
        if(err)return res.status(500).json({message: "failed to leod services"});
        return res.status(200).json(result)
    })
})

app.put('/crpms/service/:id', (req, res)=>{
    const id = req.params.id
    const {serviceName, servicePrice} = req.body
    const sql = "UPDATE `services` SET servicename=?, serviceprice=? WHERE id=?";
    db.query(sql, [serviceName,servicePrice,id], (err, result)=>{
        if(err) return res.status(400).json({message: "failed to update services"});
        return res.status(200).json({message: "Updated successfully"});
    })
})

app.delete('/crpms/service/:id', (req, res)=>{
    const id = req.params.id;

    const sql = "DELETE FROM `services` WHERE id=?";
    db.query(sql, [id], (err, result)=>{
        if(err) return res.status(500).json({message: "database error"});
        return res.status(200).json({message: "service deleted"});
            
    })
})
app.listen(port, ()=>{
    console.log(`serv is running on port ${port}`)
})