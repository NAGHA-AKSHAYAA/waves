const {brandService} = require('../services/index')

const brandControllers = {
    async addBrand(req,res,next){
        try {
            const brand = await brandService.addBrand(req.body.brandname)
            res.json(brand)
            
        } catch (error) {
            next(error)
        }
    },
    async getBrandById(req,res,next){
        try {
            const id = req.params.id
            const brand = await brandService.getBrandById(id)
            res.send(brand)
        } catch (error) {
            next(error)
        }
    },
    async deleteBrandById(req,res,next){
        try {
            const id= req.params.id;
            const brand = await brandService.deleteBrandById(id)
            res.json(brand)
        } catch (error) {
            next(error)
        }
    },
    async getBrands(req,res,next){
        try {
            const brands = await brandService.getBrands(req.body)
            res.json(brands)
        } catch (error) {
            next(error)
        }
    }
}


module.exports = brandControllers