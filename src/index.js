const express = require('express')
const patch = require('path');
const morgan = require('morgan');
const cors = require('cors')
const PORT = require('./config/port')
const app = express()

const routesUsers = require('./routes/user.routes')
const routesTypePackaging = require('./routes/typePackaging.routes');
const routesContent = require('./routes/content.routes');
const routesProductOrder = require('./routes/product_order.routes');

console.log(PORT)

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(morgan("dev"))
app.use(cors())

app.use(express.static(patch.join(__dirname, 'public')))

app.use('/api/user', routesUsers);
app.use('/api/typePackaging', routesTypePackaging);
app.use('/api/content', routesContent);
app.use('/api/productOrder', routesProductOrder);

app.listen(PORT)
console.log(`puerto: ${PORT}`)
