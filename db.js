const mongoose = require('mongoose')

const dbUri = 'mongodb+srv://achinimadhuwanthi29:ak97kAK@cluster0.vpbyomb.mongodb.net/Shop_DB'

module.exports = ()=>{
    return mongoose.connect(dbUri)
}

