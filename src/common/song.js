
export default class Song{
	constructor({id,mid,singer,name,album,duration,image,url,vid}){
		this.id=id;
		this.mid=mid;
		this.singer=singer;
		this.songname=name;
		this.album=album;
		this.duration=duration;
		this.image=image;
		// this.url=url;
		this.vid=vid;
	}
	//   getLyric() {
	//   	if(this.lyric){
	//   		return Promise.resolve(this.lyric)
	//   	}
	//   	return new Promise((resolve,reject)=>{
	//   		getLyric(this.mid).then((res) => {
	//   			if(res.code==0){
	//   				  this.lyric = Base64.decode(res.lyric);
	//   				  resolve(this.lyric)
	//   			}else{
	//   				reject("没有歌词")
	//   			}
	// 	   })
	//   	})

	//  }
}
export function createSong(musicData){
    if(musicData.songid){
      return new Song({
        id:musicData.songid,
        mid:musicData.songmid,
        singer:filterSinger(musicData.singer),
        name:musicData.songname,
        album:musicData.albumname,
        duration:musicData.interval,
        vid:musicData.vid,
        image:'https://y.gtimg.cn/music/photo_new/T002R300x300M000'+musicData.albummid+'.jpg?max_age=2592000'
      })
    }else if(musicData.id){
      return new Song({
        id:musicData.id,
        mid:musicData.mid,
        singer:filterSinger(musicData.singer),
        name:musicData.name,
        album:musicData.albumname,
        duration:musicData.interval,
        vid:musicData.vid,
        image:'https://y.gtimg.cn/music/photo_new/T002R300x300M000'+musicData.albummid+'.jpg?max_age=2592000'
  
      })
    }
  }
  function filterSinger(singer){
	let ret=[];
	if(!singer){
		return "";
	}
  // console.log("创建歌手")
  // console.log(typeof singer)
if(typeof singer ==="string"){
  // console.log("歌手是字符串")
  return singer
}
	singer.forEach((s)=>{
		ret.push(s.name)
	})

	return ret.join('/')
}