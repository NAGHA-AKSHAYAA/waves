const {transactionService} = require('../services')

const transactionController = {
    async addTransaction(req,res,next){
        try {
            console.log("inside");
            
            const data = await transactionService.addTransaction(req)
            res.json(data)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = transactionController