const product = require("../Model/productModel");

const getAllProduct = async (req, res, next) => {
    try {
        const products = await product.find();
        if (!products || products.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }
        return res.status(200).json({ data: products });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const addProducts = async (req, res, next) => {
    const { title, description, price } = req.body;

    if (!title || !description || !price) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const newProduct = new product({ title, description, price });
        const savedProduct = await newProduct.save();
        return res.status(200).json({ data: savedProduct });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const getProductById = async (req, res, next) => {
    const id = req.params.id;
    
    let products;

    try {
        products = await product.findById(id);
        }catch (err) {
        console.log(err);
    }
    if(!products){
        return res.status(404).json({message:"product not found"});
    }
    return res.status(200).json({products});
};

const updateProduct = async (req, res, next) => {
    const productId = req.params.id;
    const { title, description, price } = req.body;

    try {
        const updatedProduct = await product.findByIdAndUpdate(
            productId,
            { title, description, price },
            { new: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json({ data: updatedProduct });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const deleteProduct = async (req, res, next) => {
    const productId = req.params.id;

    try {
        const deletedProduct = await product.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json({ data: deletedProduct });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.getAllProduct = getAllProduct;
exports.addProducts = addProducts;
exports.getProductById = getProductById;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;