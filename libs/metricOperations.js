let fs = require('fs')

const lessThanOneHourAgo = (date) => {
    const HOUR = 1000 * 60 * 60
    const anHourAgo = Date.now() - HOUR
    return date > anHourAgo
}

exports.saveMetric = (key,value) => {
    try{
        let data = fs.readFileSync('./data/metrics.txt', 'utf8')
        let obj = []
        if(typeof obj != 'object' || data == '')
            obj = []
        else 
            obj = JSON.parse(data)
        obj.push({
            key: key,
            value: value,
            time: Date.now()
        })
        fs.writeFileSync('./data/metrics.txt', JSON.stringify(obj))
        return 'Success'
    }
    catch(err){
        console.log(err)
        return 'Failure'
    }
}

exports.getMetric = (key) => {
    try{
        let data = fs.readFileSync('./data/metrics.txt', 'utf8')
        let sum = 0
        let oldMetrics = []
        if(data == '')
            return 0
        else {
            let obj = JSON.parse(data)
            obj.forEach((d,index) => {
                if(d.key == key){
                    if(lessThanOneHourAgo(parseInt(d.time)))
                        sum = sum + parseInt(d.value)
                    else
                        oldMetrics.push(index)
                }   
            })
            obj = obj.filter((o,index) => {
                return oldMetrics.indexOf(index) == -1
            })
            fs.writeFileSync('./data/metrics.txt', JSON.stringify(obj))
            return sum
        }
    }
    catch(err){
        console.log(err)
        return 'Failure'
    }
}