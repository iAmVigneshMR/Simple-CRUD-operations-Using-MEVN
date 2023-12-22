const userModel = require("../model/userModel");

//to get all users
let getAllUsers = async (req, res) => {
    try {
        const foundAll = await userModel.find({});
        res.status(200).json(foundAll);
    } catch (error) {
        res.status(500).json("SERVER ERROR");
    }
};

//save(create) the users data
let saveUsers = async (req, res) => {
    let { name, email, age, company, salary, workExperence } = req.body;
    let createdDate = new Date();
    try {
        const userExits = await userModel.findOne({ email });
        if (userExits) return res.status(400).json({ msg: "user already exists" });
        else {
            const newUser = new userModel({ name, email, age, company, createdDate, salary, workExperence });
            await newUser.save();
            return res.status(200).json("success")
        };
    } catch (error) {
        res.status(500).json("SERVER ERROR");
    }
}

//to edit the users data by id
let editUsers = async (req, res) => {
    let { id, name, email, age, company, salary, workExperenc } = req.body;
    try {
        // let uId = mongoose.Types.ObjectId(id)
        // const userExits = await userModel.findOne({ id });
        let userIds = await userModel.findOne({ '_id': id });
        // await userModel.findById(id, "", (err, user) => { console.log({ err, user }) })
        // if (userIds) {
        let rrr = await userModel.findByIdAndUpdate(id, { name, email, age, company, salary, workExperenc }, { new: true });
        return res.status(200).json("success");
        // } else res.status(401).json("id not found");
    } catch (err) {
        res.status(500).json("SERVER ERROR");
    }
}

//to delete the users data by id
let deleteUsers = async (req, res) => {
    let { id } = req.body;
    try {
        // let userIds = await userModel.findOne({ id });
        // if (userIds) {
        await userModel.findByIdAndDelete(id);
        return res.status(200).json("success");
        // } else res.status(401).json("id not found");
    } catch (err) {
        res.status(500).json("SERVER ERROR");
    }
}

module.exports = { getAllUsers, saveUsers, editUsers, deleteUsers };