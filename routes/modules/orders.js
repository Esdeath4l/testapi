const mongoose = require('mongoose');
const orderSchema = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
    quanitity: { type: Number, default: 1, required: true},
    date: {type: Date, default: Date.now, required: true},
    status:{ type: String, default: 'Pending', required:true},
    paymentMethod: {type: String, default:'Cash on Deliver', required: true},
    shippingAddress:{ type: String, required: true}
})

module.exports = mongoose.model('Order', orderSchema);
