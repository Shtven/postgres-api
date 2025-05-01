const models = require("../database/models");

const createUser = async (req, res) => {
  try {
    const user = await models.User.create(req.body);
    return res.status(201).json({
      user
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;

    const pokemon = await models.User.findByPk(id);

    if (!pokemon) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(pokemon);
  } catch (error) {
    console.error('Error en getUserById:', error);
    res.status(500).json({ error: 'Error al obtener el Usuario' });
  }
};

const  deleteUser  = async (req,  res)  =>  {
  console.log('deleting user...');

  try {
     const user = await models.User.findOne({ where: { id: req.params.id } });
     if (user) {
   console.log(user);
         await user.destroy();
     } 
     else {
        return res.status(200).json( { "error ": req.params.id  +  " no existe"});
     } 
     return res.status(200).json( { "deleted ": req.params.id });
  }
  catch  (error) {
     return res.status(500).send ( { error: error.message  } );
  }

};

const updateUser  = async (req,  res)  =>  {
  console.log('updating user...');

  try {
     const user = await models.User.findOne({ where: { id: req.params.id } });
     if (user) {
   console.log(user);
         user.name = req.body.name;
         user.email = req.body.email;
         user.age = req.body.age;
         user.comments = req.body.comments;
         await user.save();
     }
     else {
        return res.status(200).json( { "error ": req.params.id  +  " no existe"});
     }

     return res.status(200).json( { "updated ": user });
  }
  catch  (error) {
     return res.status(500).send ( { error: error.message  } );
  }

};

const getAllUsers = async (req, res) => {
  console.log('getting users');
  try {
    const users = await models.User.findAll({
      include: [
      ]
    });
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  createUser,
  getUserById,
  deleteUser,
  updateUser,
  getAllUsers
};
