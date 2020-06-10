const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

if (process.env.NODE_ENV === 'test'){
    const Mockgoose = require('mockgoose').Mockgoose
    const mockgoose = new Mockgoose(mongoose)
    mockgoose.prepareStorage()
        .then(() => {
            mongoose.connect("mongodb://localhost:27017/muro", {useNewUrlParser: true, useUnifiedTopology: true})
        }).catch( (err) => { console.log(err)})
} else {
    mongoose.connect("mongodb://localhost:27017/muro", {useNewUrlParser: true, useUnifiedTopology: true})
}

const notaSchema = mongoose.Schema({
    nota: String,
    favorito: Boolean
})
const Nota = mongoose.model('Nota', notaSchema)

app.route("/notas")
.post((req,res) => {
    let notas = req.body.notas
    if(notas){
        notas.forEach(note => {
            let newNota = new Nota({
                nota: note.nota,
                favorito: false
            })
            newNota.save()
        });
        res.sendStatus(201)
    } else {
        res.sendStatus(400)
    }
})
.get((req,res) => {
    let id = req.query.id
    let fav = req.query.fav
    if (id){
        Nota.findById(id, (err, data) => {
            if (data) {
                res.send(data)
            } else {
                res.sendStatus(404)
            }
        })
    } else if (fav === 'true') {
        Nota.find({favorito: true},(err,data) => {
            if (data){
                res.send(data)
            } else {
                res.sendStatus(404)
            }
        }) 
    } else {
        Nota.find({}, (err, data) => {
            if(!err){
                res.send(data)
            } else {
                res.sendStatus(500)
            }
        })
    }
})
.put((req,res) => {
    let id = req.query.id
    Nota.findByIdAndUpdate(id, {favorito: true}, {useFindAndModify: false} ,(err, data)=> {
        if(data){
            res.sendStatus(200)
        } else if(err){
            res.sendStatus(500)
        } else {
            res.sendStatus(404)
        }
    })
})
export {app}
const port = 3000
app.listen(port, console.log("Listening on port:", port))