const { Router } = require('express');
const router = new Router();

// Load Controller
const ctrl = require('../controllers');

// Set Router
router.post('/anagram',
    ctrl.validate,
    ctrl.check_anagram,
    ctrl.response
)

module.exports = router;
