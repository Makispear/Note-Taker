// DEPENDENCIES =======================================
const router = require('express').Router()
const noteRoutes = require('../apiRoutes/noteRoutes.js')
// USE ==============================================
router.use(noteRoutes)

module.exports = router
