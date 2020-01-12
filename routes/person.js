const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send({message: "Person route requested", query: req.query, bodyParser: req.body});
})

router.get('/:name', (req, res) => {
    res.send({message: `Person route requested name: ${req.params.name}`});
})

module.exports = router;
