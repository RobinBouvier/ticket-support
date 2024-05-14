const express = require('express');
const app = express();
app.use(express.json());
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Ticket = require('./models/ticket');

const path = require('path');

app.use(bodyParser.json());

const ticketRoutes = require('./routes/ticket');
const userRoutes = require('./routes/user');

mongoose.connect('mongodb://localhost:27017', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Connexion réussie")
})
.catch((err) => {
    console.log(err)
})


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


// // Suppression d'un ticket
// app.delete('/api/ticket/:id', (req, res, next) => {
//   Ticket.deleteOne({
//     _id: req.params.id
//   }).then(() => {
//     res.status(200).json("ok")
//   });
// })

// // Modification d'un ticket
// app.put('/api/ticket/:id', (req, res, next) => {
//   Ticket.updateOne({_id: req.params.id}, {
//     ...req.body,
//     _id: req.params.id,
//   }).then(ticket => res.status(200).json(ticket))

// })

// // Récupération d'un ticket
// app.use('/api/ticket/:id', (req, res, next) => {
//   Ticket.findOne({ _id: req.params.id })
//   .then(ticket => res.status(200).json(ticket))
//   .catch(error => res.status(404).json({ error }))
// })

// // Enregistrement d'un ticket
// app.post('/api/ticket', (req, res, next) => {
//   delete req.body._id;   
//   const ticket = new Ticket({
//     ...req.body
//   });
//   ticket.save()
//     .then(() => res.status(201).json({ message: 'Ticket enregistré !' }))
//     .catch(error => {res.status(400).json({ error });
//   });
// });

// // Récupération de tous les tickets
// app.use('/api/ticket', (req, res, next) => {
//   Ticket.find()
//   .then(tickets => res.status(200).json(tickets))
//   .catch(error => res.status(400).json({ error }))
// })  
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/ticket', ticketRoutes);
app.use('/api/auth', userRoutes);
module.exports = app;