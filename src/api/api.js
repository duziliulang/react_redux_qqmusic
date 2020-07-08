
export const commonParams={
    g_tk: 1928093487,
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    format: 'jsonp'
  }
  
  export const options={
      param:'jsonpCallback'
  }
  
  export const ERROK=0;
  // params参数对象拼接到url上
// function formatUrl (url, params) {
//     let arrParams = []
//     for(let [key, value] of Object.entries(params)) {
//       arrParams.push(`${key}=${value}`)
//     }
//     let strParam = arrParams.join('&')
//     if (url.indexOf('?') === -1) {
//       return `${url}?${strParam}`
//     } else {
//       return `${url}&${strParam}`
//     }
//   }
