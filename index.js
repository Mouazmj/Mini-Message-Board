const express = require('express')
const path = require('path')
const { text } = require('stream/consumers')


const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({ extended: true }));

const messages = [
    {
        text: 'Hi nice to meet you!',
        user: 'Maxi',
        added: new Date()
    }, 
    {
        text: 'Hello there!',
        user: 'Lisa',
        added: new Date()
    }
]

app.get('/', (req, res) => {
  res.render('main', { messages: messages, title: 'Mini messageboard' })
})

app.get('/new', (req, res) => {
    res.render('messages')
})

app.post('/action', (req, res) => {
    const name = req.body.name
    const message = req.body.message

    messages.push({
        text: message,
        user: name,
        added: new Date()
    })

    res.redirect('/')
})



const PORT = 3000

app.listen(PORT, (err) => {
    if (err) {
        throw new TypeError('Something went wrong')
    }
    console.log(`Server running on port ${PORT}`)
})