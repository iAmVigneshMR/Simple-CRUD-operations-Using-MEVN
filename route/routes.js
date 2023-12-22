const express = require('express');
const { getAllUsers, saveUsers, editUsers, deleteUsers } = require('../controllers/userController');

const router = express.Router();

router.route("/getAllUsers").get(getAllUsers);
router.route("/saveUsers").post(saveUsers);
router.route("/editUsers").post(editUsers);
router.route("/deleteUsers").post(deleteUsers);

module.exports = router