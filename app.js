const express = require('express')
const app = express()
const route = require('./routes/index')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/', route)

app.get('/', (req, res) => {
    res.send('hello')
})

app.listen(3000, () => {
    console.log(`server running`);
})