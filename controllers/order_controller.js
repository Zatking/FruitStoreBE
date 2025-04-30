const { Fruit } = require('../models/schema');

const Order = require('../models/schema').Order;
const Cart = require('../models/schema').Cart;


const addToCart = async (req, res) => {
    const { userId, fruitId, quantity } = req.body;
    
    try{
        const fruit = await Fruit.findById(fruitId);
        if (!fruit) {
            return res.status(404).json({ message: "Fruit not found" });
        }
        let cart = await Cart.findOne({ userId})

        if (!cart) {
            cart = new Cart({ userId, fruit: [fruitId,quantity],totalPrice:fruit.price*quantity });

        }else{
            const itemIndex = cart.fruit.findIndex(item => item.fruitId.toString() === fruitId.toString());
            if(itemIndex > -1) {
                cart.fruit[itemIndex].quantity += quantity;
            }
            else {
                cart.fruit.push({ fruitId, quantity });
            }
        }

        let total = 0;
        for(const item of cart.fruit){
            const fruit = await Fruit.findById(item.fruitId);
            if(fruit){
                total += fruit.price * item.quantity;
            }
        }
        cart.totalPrice = total;
        await cart.save();
        res.status(200).json({ message: "Thêm sản phẩm vào giỏ hàng thành công", cart });
    }catch(err){
        console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", err.message);
        res.status(500).json({ message: "Lỗi khi thêm sản phẩm vào giỏ hàng", error: err.message });
    }
}

const placeOrder = async (req, res) => {
    const {userId,address,phoneNumber} = req.body;

    try{
        const cart = await Cart.findOne({userId}).populate('fruit.fruitId');
        if(!cart|| cart.fruit.length === 0){
            return res.status(400).json({message: "Giỏ hàng trống"});
        }

        const fruitItems = cart.fruit.map(item => ({
            fruitId: item.fruitId._id,
            quantity: item.quantity,
            priceAtTime: item.fruitId.price // Lưu giá tại thời điểm đặt hàng
        }))

        const totalPrice = fruitItems.reduce((total, item) => {
            return total + item.priceAtTime * item.quantity;
        }, 0);

        const newOrder = new Order({
            userId,
            fruit: fruitItems,
            totalPrice,
            address,
            phoneNumber
        });

        await newOrder.save();
        await Cart.deleteOne({userId}); // Xóa giỏ hàng sau khi đặt hàng thành công
        res.status(200).json({ message: "Đặt hàng thành công", order: newOrder });
    }catch(err){
        res.status(500).json({ message: "Lỗi khi đặt hàng", error: err.message });
    }
}
