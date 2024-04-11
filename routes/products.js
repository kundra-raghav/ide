const express=require('express')
const router= express.Router();
const{compileCpp,displayQues,compileAndRunJava,compileAndRunC,compileAndRunPython, compileAndRunJavascript}=require('../controllers/products')




router.post('/cpp',compileCpp)

router.post('/runJava',compileAndRunJava)
router.post('/runC',compileAndRunC)
router.post('/runPy',compileAndRunPython)
router.post('/runJS',compileAndRunJavascript)
router.get('/allQues',displayQues)




module.exports=router;