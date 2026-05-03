const Product = require('../models/fruit');

// CREATE PRODUCT
const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json({
            success: true,
            data: product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// GET ALL PRODUCTS
const getAllProducts = async (req, res) => {
    const { name, price, featured, company } = req.query;
    let query = {};

    if (name) {
        query.name = { $regex: name, $options: 'i' };
    }

    if (price) {
        query.price = { $lte: price };
    }

    if (featured) {
        query.featured = featured === 'true';
    }

    if (company) {
        query.company = { $regex: company, $options: 'i' };
    }

    try {
        const products = await Product.find(query);

        res.status(200).json({
            success: true,
            message: 'products fetched successfully',
            data: products
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// UPDATE PRODUCT
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, featured, company } = req.body;

    try {
        const product = await Product.findOneAndUpdate(
            { _id: id },
            { name, price, featured, company },
            { new: true }
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            data: product
        });

    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// DELETE PRODUCT
const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findOneAndDelete({ _id: id });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Product deleted successfully'
        });

    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    updateProduct,
    deleteProduct
};