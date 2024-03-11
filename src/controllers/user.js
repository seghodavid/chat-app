const User = require("../models/user");
const crudService = require("../utils/crudService");


const createUser = async (req, res) => {
  const user = await crudService.createQuery(User, req.body);

  return res.status(201).json({
    message: "Successfully created",
    data: user,
  });
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await crudService.findOneQuery(User, {
      where: {
        username: username,
      },
    });

    if (!user) {
      throw new Error(`User ${username} not found`);
    }

    const isCorrectPassword = await user.checkPassword(password);

    if (!isCorrectPassword) {
      throw new Error("Username or password incorrect");
    }

    const token = user.generateToken();

    res.status(200).json({
      message: `Welcome back ${username}`,
      data: token,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error: ${error.message}`,
    });  
  }
};

const findAllUsers = async (req, res) => {
  const users = await crudService.findAllQuery(User, {
    attributes: {
      exclude: ["password"],
    },
  });

  return res.status(200).json({
    message: "Success",
    data: users,
  });
};

const findUser = async (req, res) => {
  const { userId } = req.params;

  const user = await crudService.findOneQuery(User, {
    where: { id: userId },
    attributes: {
      exclude: ["password"],
    },
  });

  if (!user) {
    throw new Error(`User ${userId} not found`);
  }

   return res.status(200).json({
     message: "Success",
     data: user,
   });
};

const deleteUser = async (req,res) => {
    const { userId } = req.params;

    const user = await crudService.deleteQuery(User, {
      where: { id: userId },
    });

    if (!user) {
      throw new Error(`User ${userId} not found`);
    }

    return res.status(200).json({
      message: "Successfully deleted user",
    });
}

const updateUser =  async (req, res) => {
     const { userId } = req.params;
     console.log(userId)

     const updatedUser = await crudService.updateQuery(User, req.body, {
       where: { id: userId },
     });

     if (!updatedUser) {
       throw new Error(`User ${userId} not found`);
     }

     return res.status(200).json({
       message: "Successfully updated user",
       data: updatedUser,
     });
}

module.exports = {
  createUser,
  findAllUsers,
  findUser, 
  deleteUser,
  updateUser,
  login
};
