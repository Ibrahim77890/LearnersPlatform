const { default: mongoose } = require("mongoose");

const cartSchema = mongoose.Schema(
{
    currentUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    items: [{
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        },
        quantity: {
            type: Number,
            default: 1
        }
    }]
}
);

cartSchema.methods.addItem = async function(courseId) {
    const cartItem = this.items.findIndex(item => item.courseId.toString() === courseId.toString());
    if(cartItem !== -1) {
        this.items[cartItem].quantity++;
    } else {
        this.items.push({ courseId, quantity: 1 });
    }
    await this.save();
    return this
}

cartSchema.methods.removeItem = async function(courseId) {
    const cartItemIndex = this.items.findIndex(item => item.courseId.toString() === courseId.toString());
    if(cartItemIndex !== -1) {
        const cartItem = this.items[cartItemIndex];
        if(cartItem.quantity > 1) {
            cartItem.quantity--;
        } else {
            this.items.splice(cartItemIndex, 1);
        }
        await this.save();
        return this;
    } else {
        throw new Error('Item not found in the cart.');
    }
}


const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;