const fs = require('fs')

function log(level, message) {
    
    fs.writeFile('./server.log', `${level} ${message}\n`, { encoding: 'utf8', flag: 'a' }, error => {
        if (error) console.error(error)
    })
}

module.exports = {
    __debugEnabled__ : false,

    setDebugEnable(enable){
        this.__debugEnabled__ = enable
    },
    

    debug(message) { this.__debugEnabled__ && log('DEBUG', message) },

    info(message) { log('INFO', message) },

    warn(message) { log('WARN', message) },

    error(message) { log('ERROR', message) },

    fatal(message) { log('FATAL', message) }
}