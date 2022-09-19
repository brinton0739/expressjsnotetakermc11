const router = require('express').Router();
const noteRoutes = require('./note-route');

router.use("/notes", noteRoutes);

module.exports = router;