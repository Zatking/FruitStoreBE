const Cate = require('../models/schema').Category;
const Fruit = require('../models/schema').Fruit;


///Hàm tạo cate cho các loại trái cây
const createCategory = async (req, res) => {
    try{
        const {name, description} = req.body;
        const existingCategory = await Cate.findOne({name});
        if(existingCategory){
            return res.status(400).json({message: "Loại trái cây đã tồn tại"});
        }
        if(!name || !description){
            return res.status(400).json({message: "Tên và mô tả không được để trống"});
        }

        const newCategory = new Cate({name, description});
        await newCategory.save();
        return res.status(201).json({message: "Tạo loại trái cây thành công", category: newCategory});
    }catch(err){
        console.error("Lỗi khi tạo category:", err);
        return res.status(500).json({message: "Lỗi khi tạo category", error: err.message});
    }
}

const updateCategory = async (req, res) => {
    try{
        const {id} = req.params;
        const {name, description} = req.body;
        const existingCategory = await Cate.findById(id);
        if(!existingCategory){
            return res.status(404).json({message: "Không tìm thấy loại trái cây"});
        }
        if(name){
            existingCategory.name = name;
        }
        if(description){
            existingCategory.description = description;
        }
        await existingCategory.save();
        return res.status(200).json({message: "Cập nhật loại trái cây thành công", category: existingCategory});
    }catch(err){
        console.error("Lỗi khi cập nhật category:", err);
        return res.status(500).json({message: "Lỗi khi cập nhật category", error: err.message});
    }
}

const deleteCategory = async (req, res) => {
    try{
        const {id} = req.params;
        const existingCategory = await Cate.findById(id);
        if(!existingCategory){
            return res.status(404).json({message: "Không tìm thấy loại trái cây"});
        }
        await existingCategory.remove();
        return res.status(200).json({message: "Xóa loại trái cây thành công"});
    }catch(err){
        console.error("Lỗi khi xóa category:", err);
        return res.status(500).json({message: "Lỗi khi xóa category", error: err.message});
    }
}

const createFruit = async (req, res) => {
    try{
        const {name, price, image, description, label, category, uom} = req.body;
        const existingFruit = await Fruit.findOne({name});
        if(existingFruit){
            return res.status(400).json({message: "Trái cây đã tồn tại"});
        }
        if(!name || !price || !category || !uom){
            return res.status(400).json({message: "Tên, giá, loại trái cây và đơn vị tính không được để trống"});
        }
        const newFruit = new Fruit({name, price, image, description, label, category, uom});
        await newFruit.save();
        return res.status(201).json({message: "Tạo trái cây thành công", fruit: newFruit});
    }catch(err){
       console.log("Lỗi khi tạo trái cây:", err.message);
        return res.status(500).json({message: "Lỗi khi tạo trái cây", error: err.message});
    }
}

const updateFruit = async (req, res) => {
    try{
        const {id} = req.params;
        const {name, price, image, description, label, category, uom} = req.body;
        const existingFruit = await Fruit.findById(id);
        if(!existingFruit){
            return res.status(404).json({message: "Không tìm thấy trái cây"});
        }
        if(!name && !price && !image && !description && !label && !category && !uom){
            return res.status(400).json({message: "Không có thông tin nào để cập nhật"});
        }
        if(name){
            existingFruit.name = name;
        }
        if(price){
            existingFruit.price = price;
        }
        if(image){
            existingFruit.image = image;
        }
        if(description){
            existingFruit.description = description;
        }
        if(label){
            existingFruit.label = label;
        }
        if(category){
            existingFruit.category = category;
        }
        if(uom){
            existingFruit.uom = uom;
        }
        await existingFruit.save();
        return res.status(200).json({message: "Cập nhật trái cây thành công", fruit: existingFruit});
    }catch(err){
       console.log("Lỗi khi cập nhật trái cây:", err.message);
       return res.status(500).json({message: "Lỗi khi cập nhật trái cây", error: err.message});
    }
}

const deleteFruit = async (req, res) => {
    try{
        const {id} = req.params;
        const existingFruit = await Fruit.findById(id);
        if(!existingFruit){
            return res.status(404).json({message: "Không tìm thấy trái cây"});
        }
        await existingFruit.remove();
        return res.status(200).json({message: "Xóa trái cây thành công"});
    }catch(err){
       console.log("Lỗi khi xóa trái cây:", err.message);
       return res.status(500).json({message: "Lỗi khi xóa trái cây", error: err.message});
    }
}

const getAllFruits = async (req, res) => {
    try{
        const fruits = await Fruit.find();
        return res.status(200).json({message: "Lấy danh sách trái cây thành công", fruits});
    }catch(err){
       console.log("Lỗi khi lấy danh sách trái cây:", err.message);
       return res.status(500).json({message: "Lỗi khi lấy danh sách trái cây", error: err.message});
    }
}



