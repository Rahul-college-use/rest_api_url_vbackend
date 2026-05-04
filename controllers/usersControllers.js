const Model = require('../models/users')

exports.createuser = async (req, res) => {

    try {
        let { name, email, reg_no, roll_no, dept, skills } = req.body;

        const newuser = new Model({
            name,
            email,
            reg_no,
            roll_no,
            dept,
            skills
        })
        const saveuser = await newuser.save();
        res.status(201).json({
            msg: `Create Successfully user ${name}`,
            data: saveuser
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
}

exports.getuser = async (req, res) => {

    try {
        console.log(req.body)
        const { email, reg_no, roll_no } = req.query;
        if (!email && !reg_no && !roll_no) {
            return res.status(400).json({
                msg: "provide any unique id"
            })
        }
        let query = {}

        if (email) query.email = email;
        else if (reg_no) query.reg_no = reg_no;
        else if (roll_no) query.roll_no = roll_no;

        const user = await Model.findOne(query)
        if (!user) {
            return res.status(404).json({
                msg: `not found any related recheck fillup.`,
                query: query
            })

        }
        res.json(user);


    } catch (err) {
        error: err.message;
    }
}

exports.getAll = async (req, res) => {
    try {
        const fetch = await Model.find()
        // console.log(fetch)
        if (!fetch) return res.status(404).json({ msg: "Not Record Right now" })
        res.status(201).json(fetch)
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: err.msg
        });
    }
}

exports.deleteuser = async (req, res) => {
    const fetch = await Model.deleteOne()
    if (!fetch) return res.status(404).json({ msg: "Not Record Right now" })
    res.status(200).json({
        msg: "Delete successfull"
    })

}
exports.edituser = async (req, res) => {
    try {
        let { name, email, reg_no, roll_no, dept, skills } = req.body;

        // 🔹 Build query (identify user)
        let query = {};

        if (email) query.email = email;
        else if (reg_no) query.reg_no = reg_no;
        else if (roll_no) query.roll_no = roll_no;

        // ❗ Prevent empty query
        if (Object.keys(query).length === 0) {
            return res.status(400).json({
                msg: "Provide email or reg_no or roll_no to identify user"
            });
        }

        // 🔹 Build update object (only provided fields)
        let updateData = {};

        if (name) updateData.name = name;
        if (dept) updateData.dept = dept;
        if (skills) updateData.skills = skills;

        // ❗ Prevent empty update
        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({
                msg: "No data provided to update"
            });
        }

        // 🔹 Update user
        const updatedUser = await Model.findOneAndUpdate(
            query,
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ msg: "User not found" });
        }

        res.status(200).json({
            msg: "User updated successfully",
            user: updatedUser
        });

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};