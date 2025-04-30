const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
    action: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    userId:{type:String,required:true},
    details: { type: String }
})

const UserSchema = new mongoose.Schema({
    userName:{ type: String, required: true, unique: true },
    password:{ type: String, required: true },
    role:{ type: String, default: "user" ,enum: ["user", "admin"] },
    phoneNumber:{ type: String, required: true, unique: true },
    email:{ type: String, unique: true },
    address:{ type: String },
    dateOfBirth:{ type: Date },
})

const FruitSchema = new mongoose.Schema({
    name:{ type: String, required: true, unique: true },
    price:{ type: Number, required: true },
    image:{ type: String },
    description:{ type: String },
    label:{ type: String },
    category:{type: String, required: true},
    uom:{ type: String, required: true }, // Đơn vị tính
})

const categorySchema = new mongoose.Schema({
    name:{ type: String, required: true, unique: true },
    description:{ type: String },
})

const RecipeSchema = new mongoose.Schema({
    name:{ type: String, required: true, unique: true },
    image:{ type: String },
    description:{ type: String },
    fruit:[{type: String, required: true}],
    steps:{ type: String },
    time:{ type: Number },
    category:{type: String, required: true},
})

const OrderSchema = new mongoose.Schema({
    userId:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    fruit: [
        {
          fruitId: { type: mongoose.Schema.Types.ObjectId, ref: 'Fruit', required: true },
          quantity: { type: Number, required: true, default: 1 }
        }
      ],
    totalPrice:{ type: Number, required: true },
    status:{ type: String, default: "pending", enum: ["pending", "completed", "cancelled"] },
    address:{ type: String },
    phoneNumber:{ type: String },
    date:{ type: Date, default: Date.now() },
})

const CartSchema = new mongoose.Schema({
    userId:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    fruit: [
        {
          fruitId: { type: mongoose.Schema.Types.ObjectId, ref: 'Fruit', required: true },
          quantity: { type: Number, required: true, default: 1 }
        }
      ],
    totalPrice:{ type: Number, required: true },
    date:{ type: Date, default: Date.now() },
})

// Tạo các model từ schema
const User = mongoose.model('User', UserSchema);
const Fruit = mongoose.model('Fruit', FruitSchema);
const Category = mongoose.model('Category', categorySchema);
const Recipe = mongoose.model('Recipe', RecipeSchema);
const Order = mongoose.model('Order', OrderSchema);
const Cart = mongoose.model('Cart', CartSchema);
const AuditLog = mongoose.model('AuditLog', auditLogSchema);

// Xuất các model để sử dụng ở nơi khác
module.exports = {
    User,
    Fruit,
    Category,
    Recipe,
    Order,
    Cart,
    AuditLog
}