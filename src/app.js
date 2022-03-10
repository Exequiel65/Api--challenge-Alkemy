const express = require('express')
const app = express()
const PORT = 3000
const session = require('express-session')
const isSession = require('./middlewares/isSession')


app.use(session({
    secret: "authSecret",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 600000 }
}))
//Capturar data
app.use(express.urlencoded({ extended : false}));
app.use(express.json())

// Enrutadores
const charactersRouter = require('./routes/characters')
const authRouter = require('./routes/auth')
const moviesRouter = require('./routes/movies')



// Endpoints
app.use('/auth', authRouter)
//Middlewares
//
app.use('/api', isSession, charactersRouter)
app.use('/api', isSession, moviesRouter)


app.listen(PORT, ()=>{
    console.log(`Servidor levantado en http://localhost:${PORT}`)
})