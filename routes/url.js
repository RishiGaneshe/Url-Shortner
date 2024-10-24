const express = require('express')
const router = express.Router();
const URL = require('../controllers/url.js')




router.get("/",URL.handleHomepage)

router.get("/allurl",URL.handleAllUrls)

router.get("/logout",URL.handleLogout)

router.post("/", URL.handlegenerateURL)




module.exports=router;