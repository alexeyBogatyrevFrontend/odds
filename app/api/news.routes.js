const { Router } = require('express')
const connectDB = require('../db')
const {
	getAllNews,
	getTopNews,
	addNews,
	editNews,
	deleteNews,
} = require('./news.controller')

connectDB()

const router = Router()

router.get('/all', getAllNews)
router.get('/top', getTopNews)
router.post('/add', addNews)
router.put('/edit/:id', editNews)
router.delete('/delete/:id', deleteNews)

module.exports = router
