import jsonp from "../common/jsonp.js"
export function player (mid) {
    let JSONP_PARAMS = {
        // g_tk: 1658125788,
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        format: 'jsonp'
    }
    let option = {
        param: "callback",
        prefix: "callback"
      }
    let url='https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg';
    let params = Object.assign({}, JSONP_PARAMS, {
       g_tk: 5813,
       loginUin: 0,
       hostUin: 0,
       platform: 'yqq',
       needNewCode: 0,
       cid: 205361747,
       uin: 0,
       songmid: mid,
       filename: `C400${mid}.m4a`,
       guid: 7661965632,
    })

    return jsonp(url,params, option )
  }