let express = require('express')
let router = express.Router()
let metricOperations = require('../libs/metricOperations')


/* GET ALL metrics */
router.get('/:key/sum', function(req, res) {
    let { key } = req.params
    let result = metricOperations.getMetric(key)
    res.status(200).json({value: result})
})

/* SAVE metric */
router.post('/:key', function(req, res) {
    let { value } = req.body
    let { key } = req.params
    let result = metricOperations.saveMetric(key,value)
    if(result == 'Success')
        res.status(200).json({})
    else
        res.status(500).json({message: 'Error Occurred'})
})

module.exports = router
