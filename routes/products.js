const express=require('express')
const router= express.Router();
const{compileCpp,displayQues}=require('../controllers/products')




router.post('/cpp',compileCpp)
router.get('/allQues',displayQues)




module.exports=router;