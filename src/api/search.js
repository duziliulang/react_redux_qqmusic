import {commonParams,options } from "./api.js"
import jsonp from "../common/jsonp.js"
export function getHotKey(){
	const url="https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg"
	const data=Object.assign({},commonParams,{
		uin:0,
		needNewCode:1,
		platform:"h5"
	});
	return jsonp(url,data,options)
}
export function searchByKey (key) {
	let url ='https://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg';
	let data={
		g_tk:5381,
		inCharset:'utf-8',
		outCharset:'utf-8',
		notice:0,
		format:'jsonp',
		n:19,
		catZhida:1,
		t:0,
		aggr:1,
		needNewCode:0,
		platform:'yqq',
		is_xml:0,
		key:key,
		loginUin:0,
		hostUin:0
	}
    return jsonp(url, data , options)
  }