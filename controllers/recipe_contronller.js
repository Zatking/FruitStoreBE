const Recipe = require('../models/schema').Recipe;

const createRecipe = async (req, res) => {
    try {
        const{name,image,description,fruit,steps,time,category} = req.body;

        const existingRecipe = await Recipe.findOne({name});
        if(existingRecipe){
            return res.status(400).json({message: "Công thức đã tồn tại"});
        }
        const newRecipe = new Recipe({
            name,
            image,
            description,
            fruit,
            steps,
            time,
            category
        });
        await newRecipe.save();
        return res.status(201).json({message: "Tạo công thức thành công", recipe: newRecipe});
    }catch(err){
        console.log("Lỗi khi tạo công thức:", err.message);
        return res.status(500).json({message: "Lỗi khi tạo công thức", error: err.message});
    }
}

const updateRecipe = async (req, res) => {
    try{
        const {id} = req.params;
        const existingRecipe = await Recipe.findById(id);
        if(!existingRecipe){
            return res.status(404).json({message: "Không tìm thấy công thức"});
        }
        const {name,image,description,fruit,steps,time,category} = req.body;
        if(!name && !image && !description && !fruit && !steps && !time && !category){
            return res.status(400).json({message: "Không có thông tin nào để cập nhật"});
        }
        if(name){
            existingRecipe.name = name;
        }
        if(image){
            existingRecipe.image = image;
        }
        if(description){
            existingRecipe.description = description;
        }
        if(fruit){
            existingRecipe.fruit = fruit;
        }
        if(steps){
            existingRecipe.steps = steps;
        }
        if(time){
            existingRecipe.time = time;
        }
        if(category){
            existingRecipe.category = category;
        }
        await existingRecipe.save();
    }catch(err){
        console.log("Lỗi khi cập nhật công thức:", err.message);
        return res.status(500).json({message: "Lỗi khi cập nhật công thức", error: err.message});
    }
}

const deleteRecipe = async (req, res) => {
    try{
        const {id} = req.params;
        const existingRecipe = await Recipe.findById(id);
        if(!existingRecipe){
            return res.status(404).json({message: "Không tìm thấy công thức"});
        }
        await existingRecipe.remove();
        return res.status(200).json({message: "Xóa công thức thành công"});
    }catch(err){
        console.log("Lỗi khi xóa công thức:", err.message);
        return res.status(500).json({message: "Lỗi khi xóa công thức", error: err.message});
    }
}