const express = require('express');
const router = express.Router();


const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        const safeTimestamp = new Date().toISOString().replace(/[:.]/g, '-');
        cb(null, `${safeTimestamp}-${file.originalname}`);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // 5MB max
    },
    fileFilter: fileFilter
});

const Product = require('./modules/product');

router.get('/', (req, res, next) => {
    Product.find()
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                products: docs.map(doc => {
                    return {
                        _id: doc._id,
                        name: doc.name,
                        price: doc.price,
                        uploadedFile: `${req.protocol}://${req.get('host')}/${doc.uploadedFile}`
                    };
                })
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.post('/', upload.single('uploadedFile') ,(req, res, next) => {
    console.log(req.file);
    const pd = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        uploadedFile: req.file.path
    });

    pd.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Product created successfully',
                createdProduct: {
                    _id: result._id,
                    name: result.name,
                    price: result.price,
                    uploadedFile: `${req.protocol}://${req.get('host')}/${result.uploadedFile}`
                }
            });
            
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});


router.get('/:productId', (req, res) => {
    const id = req.params.productId;

   
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid product ID format' });
    }

    
    Product.findById(id)
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json({
                    _id: doc._id,
                    name: doc.name,
                    price: doc.price,
                    uploadedFile: `${req.protocol}://${req.get('host')}/${doc.uploadedFile}`
                });
                
            } else {
                console.log("No product found for ID:", id);
                return res.status(404).json({ message: 'No valid entry found for provided ID' });
            }
        })
        .catch(err => {
            console.error("Error fetching product:", err);
            return res.status(500).json({ error: 'An error occurred while fetching the product.' });
        });
});

router.patch('/:productsId', (req, res, next) => {
    const id = req.params.productsId;
    const updateOps ={};
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Product.updateOne({ _id: id}, { $set: updateOps})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        })
    });
});
router.delete('/:productsId', (req, res, next) => {
   const id = req.params.productsId;
   Product.deleteOne({ _id:id})
   .exec()
   .then(result => {
    res.status(200).json({
        message: 'Product deleted successfully',
        result: result
    });
    
   })
   .catch(err  => {
    console.log(err);
    res.status(500).json({
        error: err
    });
    });
});
module.exports = router;