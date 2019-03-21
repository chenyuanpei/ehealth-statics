var config = require('../config')
// var fetch = require('node-fetch')
var qr = require('./qr-image')
var fs = require('fs')
var path = require('path')

// var openIdKey = '___openId'
// var accessTokenKey = '___accessToken'
var authorizeIdKey = '___authorizeId'
// var setCookie = (res, {openId, accessToken})=> {
//   res.cookie(openIdKey, openId)
//   res.cookie(accessTokenKey, accessToken)
// }
//
// var getCookie = (req) => {
//
//   return {
//     openId: req.cookies[openIdKey],
//     accessToken: req.cookies[accessTokenKey]
//   }
// }

module.exports = function (app) {
  app.use(function (req, res, next) {
    console.log('========================================')

    var code = req.query.code
    var authorizeId = req.query[authorizeIdKey]
    // var authCookie = getCookie(req)
    // var openId = authCookie.openId
    // var accessToken = authCookie.accessToken

    console.log('code = ' + JSON.stringify(code))
    console.log('authorizeId = ' + JSON.stringify(authorizeId))
    // console.log('openId = ' + JSON.stringify(openId))
    // console.log('accessToken = ' + JSON.stringify(accessToken))
    if (!code) {
      console.log('not code')
      next()
      return
    }

    if (authorizeId) {
      console.log('has authorizeId')
      next()
      return
    }

    if (req.path === '/authorize/code') {
      console.log('response code')
      res.send(code)
      return
    }

    next()

    // console.log('get openid by code')

    // var url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${config.server.appid}&secret=${config.server.secret}&code=${code}&grant_type=authorization_code`

    // fetch(url).then(response => response.json())
    //   .then(function (data) {
    //     //{ access_token: 'OezXcEiiBSKSxW0eoylIeBQpsfH2FCKxV2TmRHCaUktvux4KhlQ-uqia5B9i9uWA6hRplUpmsrXt1F2CoTee__nzdA2i9MDB_5hPf1HCsNnFUot2QmfOqwXeLYsMW6HgSEclRrzFMpPvHrVV8zkhPw',
    //     //    expires_in: 7200,
    //     //    refresh_token: 'OezXcEiiBSKSxW0eoylIeBQpsfH2FCKxV2TmRHCaUktvux4KhlQ-uqia5B9i9uWAnejFdwIhK-hfvhGtxY7BPE6Dvf3hJikLnD9eSsRkMcYYyIPdSmK6wgb4m9JpV--rvS_wB43mZMG11DeGX6Wahg',
    //     //    openid: ' -JYIm36ps',
    //     //    scope: 'snsapi_base' }
    //
    //     if (req.path === '/authorize/access_token') {
    //       console.log('response access token')
    //       res.json(data)
    //       return
    //     }
    //
    //     var openId = data.openid
    //     var accessToken = data.access_token
    //     console.log('data', data)
    //     console.log('openid = ' + openId)
    //     console.log('openid = ' + accessToken)
    //
    //     setCookie(res, {openId, accessToken})
    //     next()
    //
    //     // res.redirect(req.originalUrl + '&openId=' + openId)
    //   })
    //   .catch(e => console.log("authorize error", e))
  })

  // 二维码
  app.all('/authorize/qrcode', (req, res) => {
    var redirectUri = req.query.redirect
    if (redirectUri.indexOf('http') !== 0) {
      redirectUri = `${config.baseUrl}/${req.query.redirect}`
    }

    var url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${config.appid}&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_base&state=STATE`
    // res.send(url)
    var img = qr.image(url, {type: 'png'})
    res.writeHead(200, {'Content-Type': 'image/png'});
    img.pipe(res)
  })

  // 页面
  app.all('/authorize/page', (req, res) => {
    var redirect = req.query.redirect
    var authorizeId = (new Date).getTime()
    res.render('authorize', {
      authorizeId,
      redirect,
      authorizeRedirect: encodeURIComponent(`authorize/success?${authorizeIdKey}=${authorizeId}`)
    })
  })

  if (true || process.env.NODE_ENV === 'production') {

    var filePath = path.join(__dirname, 'codes.json')
    // var filePath = './codes.json'

    var writeCodes = (codes) => {
      fs.writeFileSync(filePath, JSON.stringify(codes))
    }

    var readCodes = (callback) => {
      fs.readFile(filePath, {encoding: 'utf8'}, function (err, codes) {
        // fs.exists(filePath, (exists) => {
        // console.log('exists', exists)
        codes = codes ? JSON.parse(codes) : []
        // if (!exists) {
        //   writeCodes(codes)
        // } else {
        //   codes = fs.readFileSync(filePath, 'utf8')
        //   console.log('codes', codes)
        //   codes = JSON.parse(codes)
        // }
        callback(codes)
        // })
      })
    }

    app.all('/authorize/success', (req, res) => {

      var authorizeId = req.query[authorizeIdKey]
      var code = req.query.code
      var data = {
        authorizeId,
        code
      }
      if (!code || !authorizeId) {
        res.json(data)
      }
      readCodes((codes) => {
        console.log('authorize success ', data)
        codes = codes.filter(item => item.authorizeId !== authorizeId)
        codes.push(data)

        if (codes.length > 10) {
          codes.splice(0, codes.length - 10)
        }
        console.log('codes : ', codes)

        writeCodes(codes)

        res.json(data)
      })
    })

    app.all('/authorize/getCode', (req, res) => {
      readCodes((codes) => {
        var authorizeId = req.query.authorizeId

        var data = codes.find(item => item.authorizeId === authorizeId)

        console.log('getCode', codes, authorizeId, data)
        if (!data) {
          res.json({})
          return
        }
        codes = codes.filter(item => item.authorizeId !== authorizeId)

        writeCodes(codes)

        res.json(data)
      })
    })
  }
}
