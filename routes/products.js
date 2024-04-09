const express=require('express')
const router= express.Router();
const{compileCpp,displayQues,compileAndRunJava}=require('../controllers/products')




router.post('/cpp',compileCpp)
// router.post('/runJs',runJavaScript)
router.post('/runJava',compileAndRunJava)
router.get('/allQues',displayQues)




module.exports=router;