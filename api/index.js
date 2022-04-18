const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')


const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')
const uploadRoutes = require('./routes/uploadRoutes')
const orderRoutes = require('./routes/orderRoutes')

dotenv.config()
app.use(cors())

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGO_URL)
.then(console.log('БД подклечена'))
.catch((error) => console.log(error))

app.use(express.json())

app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.use('/uploads', express.static(path.join(__dirname, '/uploads')))


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
