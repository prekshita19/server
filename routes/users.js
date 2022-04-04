var express = require('express');
var router = express.Router();
const {OAuth2Client} = require('google-auth-library')
const client = new OAuth2Client('531030834903-ft8mt8n69afpkbioqhusihh3erm8auv1.apps.googleusercontent.com')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

const users = [];
  
function upsert(array, item) {
  const i = array.findIndex((_item)=>_item.email===item.email);
  if(i>-1) array[i]=item;
  else
  array.push(item)
}

router.post('/google-login', async (req,res)=>{
  
  const {token} = req.body;
  const ticket = await client.verifyIdToken({
    idToken:token,
    audience:'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'
  });
  const {name, email, picture} = ticket.getPayload();
  upsert(users, {name, email, picture})
  res.json({name, email, picture})
})


module.exports = router;
