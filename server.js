const express = require('express');
const path = require('path');
require('dotenv').config()
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes');
const cartRoutes = require('./routes/cart.routes');
const userRoutes = require('./routes/user.routes');
const orderRoutes = require('./routes/order.routes')

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.get('/',(req,res)=>{
    res.send('hello')
})

//Routes
app.use('/api/products',productRoutes);
app.use('/api/auth',authRoutes)
app.use('/api/cart',cartRoutes);
app.use('/api/user',userRoutes);
app.use('/api/order',orderRoutes)

//Database config
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(()=> console.log('Successfully connected Database...'))
  .catch((err)=> console.error('Database connected error ',err))




app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}...`)
}
)