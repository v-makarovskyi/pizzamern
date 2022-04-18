const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
const User = require("../models/UserModel");
const { update } = require("../models/UserModel");

//@register a new user
//@route POST/api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  const existUser = await User.findOne({ email })
  if(existUser) {
    res.status(400)
    throw new Error('Пользователь с такими данными уже существует')
  }
  const user = await User.create({
    name,
    email,
    password
  })
  if(user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Неверные учетные данные')
  }
})

//@desc auth user & get token
//@route POST/api/users/login
//@access Public
const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({email})
  if(user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    })
  } else {
    res.status(401)
    throw new Error('Неверные пароль или почта')
  }
})


//@desc get user by ID
//@route GET/api/users/:id
//@access Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')

  if (user) {
    res.status(201).json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})


//@desc get user profile
//@route GET/api/users/profile
//@access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404)
    throw new Error("Пользователь не найден");
  }
});

//@desc update user profile
//@route PUT/api/users/profile
//@access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updateUser = await user.save();
    res.status(200).json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin,
      token: generateToken(updateUser._id),
    });
  } else {
    throw new Error("Вы можете обновить только свой аккаунт");
  }
});


//@desc get all users
//@route GET/api/users
//@access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.status(200).json(users)
})


//@desc delete users
//@route DELETE/api/users/:id
//@access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')
  if(user) {
    await user.remove()
    res.status(200).json('Пользователь удален')
  } else {
    throw new Error('Пользователь не найден')
  }
})


//@desc update user
//@route PUT/api/users/:id
//@access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if(user) {
    user.name = req.body.name,
    user.email = req.body.email,
    user.isAdmin = req.body.isAdmin
  

  const updateUser = await user.save()
  res.status(201).json({
    _id: updateUser._id,
    name: updateUser.name,
    email: updateUser.email,
    isAdmin: updateUser.isAdmin
  })
} else {
  res.status(400)
  throw new Error('Невозможно обновить данные пользователя')
}
})


module.exports = {
  registerUser,
  userLogin,
  getUserById,
  updateUserProfile,
  getUserProfile,
  getUsers,
  deleteUser,
  updateUser
};
