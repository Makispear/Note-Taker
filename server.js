// DEPENDENCIES =======================================
const apiRoutes = require('./routes/apiRoutes')
const htmlRoutes = require('./routes/htmlRoutes')
// EXPRESS =================================
const express = require('express')
const PORT = process.env.PORT || 3001
const app = express()
// USE ==============================================
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))
app.use('/api', apiRoutes)
app.use('/', htmlRoutes)
// LISTEN ==============================
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!`)
})