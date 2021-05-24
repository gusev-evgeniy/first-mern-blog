const path = require('path')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const multer = require('multer')
const { v4: uuidv4 } = require('uuid')

const PostRouter = require('./routes/PostRoute')
const UserRouter = require('./routes/UserRoute')
const TagRouter = require('./routes/TagRouter')
const SearchRouter = require('./routes/SearchRouter')
const keyDB = require('./confige/confige').key

const app = express()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/')
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + '-' + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  const validType = ['image/png', 'image/jpg', 'image/jpeg']
  if (validType.includes(file.mimetype)) {
    cb(null, true)
  }
  cb(null, false)
}

app.use(cors())
app.use(cookieParser())
app.use(express.json())

app.use(multer({ storage, fileFilter }).single('photo'))
app.use('/images', express.static(path.join(__dirname, '/images')))
app.use(PostRouter)
app.use(UserRouter)
app.use(TagRouter)
app.use(SearchRouter)

mongoose
  .connect(keyDB, { useNewUrlParser: true })
  .then(result => {
    app.listen(8000, () => {
      console.log(`Server run on port 8000`)
    })
  })
  .catch(err => console.log(err))
