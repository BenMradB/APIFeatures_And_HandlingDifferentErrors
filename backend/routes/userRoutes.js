const { Router } = require('express');
const router = Router();

const userController = require('../controllers/userController');
const topThreeMiddleware = require('../middlewares/topThreeMiddleware');

router.route('/top-3')
    .get(topThreeMiddleware, userController.getUsers);

router.route('/')
    .get(userController.getUsers)
    .post(userController.createUser);

router.route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);


module.exports = router;