const User = require("../models/User");
const Product = require("../models/Product");
const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    res.status(200).json({ message: "User fetch successfully", user });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error while fetching user details", error });
  }
};

const updateUserDetails = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    const isUserExists = await User.findOne({ email: email });
    if (isUserExists && email !== user.email) {
      return res
        .status(400)
        .json({ message: "User is already exists, use another email address" });
    }

    const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
      runValidators: true,
    });
    res
      .status(200)
      .json({ message: "User update successfully", user: updatedUser });
  } catch (error) {
    console.error(err);
    res.status(500).json({ message: "Error while updating user", error });
  }
};

const addAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    user.address.push(req.body);
    await user.save();
    res.status(200).json({ message: "Added address successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error while add address" });
  }
};

const updateAddress = async (req, res) => {
  const { id } = req.params;
  const { street, city, state, zip, country } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).josn({ message: "User not found!" });
    }

    // const updatedAddress = await User.findByIdAndUpdate()
    const addressIndex = user.address.findIndex(
      (item) => item._id.toString() === id
    );
    if (addressIndex === -1) {
      return res.status(404).json({ message: "Address not found!" });
    }
    user.address[addressIndex] = req.body;
    await user.save();
    res
      .status(200)
      .json({ message: "Update address successfully", address: user.address });
  } catch (error) {
    res.status(500).json({ message: "Error while updating address" });
  }
};

const deleteAddress = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    const addressIndex = user.address.findIndex(
      (item) => item._id.toString() === id
    );
    if (addressIndex === -1) {
      return res.status(404).json({ message: "Address not found!" });
    } else {
      const newAddresses = user.address.filter(
        (item) => item._id.toHexString() !== id
      );
      console.log(newAddresses);
      user.address = newAddresses;
      await user.save();
      res
        .status(200)
        .json({
          message: "Delete address successfully",
          address: user.address,
        });
    }
  } catch (error) {
    res.status(500).json({ message: "Error while deleting address" });
  }
};

const addToWishlist = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }
    const isAlready = await user.wishlist.findIndex(
      (item) => item.productId.toString() === id
    );
    
    if (isAlready === -1) {
      user.wishlist.push({ productId: id });
    } else {
      user.wishlist = user.wishlist.filter(
        (item) => item.productId.toString() !== id
      );
      
    }
    await user.save();
    res
      .status(200)
      .json({ message: "Product added in wishlist", wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ message: "Error while adding wishlist",error });
  }
};

const viewWishlist = async(req,res) =>{
  try{
    const user = await User.findById(req.user.id).populate('wishlist.productId');
    if(!user){
      return res.status(404).json({message:"User not found!"});
    }
    res.status(200).json({wishlist:user.wishlist})
  }catch(error){
    res.status(500).json({message:"Error while fetching wishlist",error})
  }
}

const deleteWishlist = async(req,res)=>{
  const {id} = req.params;
  try{
    const user = await User.findById(req.user.id);
    if(!user){
      return res.status(404).json({message:"User not found!"})
    }
    user.wishlist = user.wishlist.filter(item => item.productId.toString() !== id);
    await user.save()
    res.status(200).json({wishlist:user.wishlist})
  }catch(error){
    res.status(500).json({message:"Error while deleting wishlist product",error})
  }
}

module.exports = {
  getUserDetails,
  updateUserDetails,
  addAddress,
  updateAddress,
  deleteAddress,
  addToWishlist,
  viewWishlist,
  deleteWishlist
};
