let express     = require('express')
let app         = express()
let bodyParser  = require('body-parser')
let morgan      = require('morgan')
let port        = process.env.PORT || 3000
let cors = require('cors')
let metrics = require('./routes/metrics')
// get our request parameters
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// log to console
app.use(morgan('dev'))

//CORS
app.use(cors({
    origin: '*',
    withCredentials: false,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin' ]
}))

//Application level middleware
app.use(function(req,res,next){
  let logs = {'Time of Request': Date.now(),
        'Requested Url'  : req.originalUrl,
        'Base Url'       : req.baseUrl,
        'Ip address'     : req.ip,
        'Method'         :req.method
  }
  console.log(logs)
  next()
})

//Metrics route
app.use('/metric',metrics)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found')
    err.status = 404
    next(err)
})
  
// error handler
app.use(function(err, req, res, next) {
    res.status(404).json(err)
})
  

//Start server
app.listen(port, () => {
  console.log("Server listening at port ",port);
})