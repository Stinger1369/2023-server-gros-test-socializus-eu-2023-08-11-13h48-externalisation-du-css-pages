const { user, role } = require("../../models");

//@ðesc create role

const createRole = async (req, res) => {
  try {
    const Role = new role({
      name: req.body.name,
    });
    const saveRole = await Role.save();
    res.status(200).json({ success: true, Role: saveRole }); //send back the new user
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });  //send back error message
  }
};

//@desc update role
const updateRole = async (req, res) => {
  try {
    const id = req.params.id;
    const newRole = req.body.name;
    const roles = await role.findById(id);
    if (!roles) {
      return res
        .status(404)
        .send({ message: `Role with id : ${id} not found` });
    }
    roles.name = newRole;
    await roles.save();
    res.status(200).send({ message: "Role updated successfully" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

//@ðesc get all role

const getRoles = async(req, res) => {
  try {
     role.find({}, (err, roles) => {
    if (err) {
      console.log(err);
      res.status(500).send('Erreur lors de la récupération des rôles');
    } else {
      res.status(200).json(roles);
    }
  });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
 
};

module.exports = { createRole, updateRole, getRoles };