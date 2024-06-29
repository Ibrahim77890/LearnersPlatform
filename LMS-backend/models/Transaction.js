
const mongoose = require('mongoose')

const transactionSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId,  ref: 'Course' },
    session: {type: String}
},{timestamps:true})

const Transactions = mongoose.model('Transaction', transactionSchema);
module.exports = Transactions;
