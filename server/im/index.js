var Sig = require('./Sig')
var config = require('./config')
var fs = require('fs')
var path = require('path')

module.exports = function (app) {

  app.post('/im/loginInfo', function (req, res) {
    if (!req.body || !req.body.identifier) {
      res.json({msg: 'identifier not null'})
      return
    }
    const identifier = req.body.identifier
    // var sig = new Sig({
    //   sdk_appid: 1400013293,
    //   account_type: 6837,
    //   version: '201512300000',
    //   private_key: './keys/ec_key.pem',
    //   public_key: './keys/public.pem',
    // })
    // var sig = sig.genSig(identifier)
    const sig = fs.readFileSync(path.join(__dirname, 'sigs', identifier)).toString()

    const response = Object.assign({}, config, {
      identifier,	// 用户帐号，选填	String
      identifierNick: identifier,	// 用户昵称，选填	String
      userSig: sig,	// 鉴权Token，identifier不为空时，userSig必填
    })

    res.json(response)
  })
}
