const { default: mongoose } = require("mongoose");

const expensesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true, 
    },
    amount: {
        type: Number,
        required: true, 
    },
    category: {
        type: String,
        required: true,
        trim: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('expense', expensesSchema);
