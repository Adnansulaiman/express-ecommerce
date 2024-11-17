const Product = require('../models/Product')
const cloudinary = require('cloudinary').v2;
const fs = require('fs')


const getAllProducts =async(req,res)=>{
    try{
        const products = await Product.find({});
        res.status(200).json(products)
    }catch(error){
        console.log(error)
    }
}
const getAProduct = async(req,res)=>{
    const {id} = req.params;
    try{
        const product = await Product.findById(id);
        res.status(200).json(product)
    }catch(error){
        console.error(error)
    }
    
}
const addProduct = async(req,res)=>{
   
   try{
    const newProduct = new Product(req.body);
    newProduct.save();
    console.log('Added new Product');
    res.json({message:"Added new Product",data:newProduct})
   }catch(error){
    console.log(error)
   }
}

const updateProduct = async (req,res) =>{
    const {id} = req.params;
    try{
        const product = await Product.findById(id);
        if(!product){
            return res.status(404).json({message:"Product not found"});
        }
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            req.body,
            {new:true,runValidators:true}
        );
        const filePaths = req.files.map(file => file.path);
        
        //Cloudinary configuration
        cloudinary.config({
            cloud_name:process.env.CLOUD_NAME,
            api_key:process.env.CLOUD_API_KEY,
            api_secret:process.env.CLOUD_API_SECRET
        })
        // Upload images to Cloudinary
        const urls = await Promise.all(
            filePaths.map(async (filePath) => {
                const result = await cloudinary.uploader.upload(filePath, {
                    transformation: [
                        { quality: 'auto', fetch_format: 'auto' },
                        { width: 1200, height: 1200, crop: 'fill', gravity: 'auto' }
                    ]
                });
                fs.unlinkSync(filePath);
                return cloudinary.url(result.public_id);
            })
        );

         // URLs of uploaded images

        urls.forEach(url => product.images.push(url));
        await product.save()
        res.status(200).json({message:"Product updated successfully",product})
    }catch(error){
        console.error(error)
        res.status(500).json({message:"Error while update product",error})
    }
}

const deleteProduct = async(req,res) => {
    const {id} = req.params;
    try{
        const product = await Product.findById(id);
        if(!product){
            return res.status(404).json({message:"Product not found!"});
        }
        const deletedProduct = await Product.findByIdAndDelete(id);
        res.status(200).json({message:"Deleted a product successfully",product:deletedProduct})
    }catch(error){
        console.error(error);
        res.status(500).json({message:"Error while delete a product"})
    }
}

module.exports = {
    getAllProducts,
    addProduct,
    getAProduct,
    updateProduct,
    deleteProduct
}