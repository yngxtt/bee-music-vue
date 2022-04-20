import get from '@/service/get'

/* 获取音乐url */
export const getMusicUrl = (id) => get('/song/url', { id })

/* 获取音乐歌词 */
export const getLyric = (id) => get('/lyric', { id })

/* login 获取日推歌曲 */
export const getRecommendSong = () => get('/recommend/songs')

/* login 获取喜欢的音乐ID列表 */
export const getLikeIdList = (uid) => get('/likelist', { uid, timestamp: Date.now() })

/* 获取音乐详情 */
export const getMusicListByIds = (ids) => get('/song/detail', { ids })

/* login 喜欢音乐 */
export const likeMusic = (id, like = true) => get('/like?', { id, like, timestamp: Date.now() })

/* 新歌速递 */
//全部:0 华语:7 欧美:96 日本:8 韩国:16
export const getTopMusic = (type) => get('/top/song', { type })

/* login 私人FM */
export const getPersonalFm = () => get('/personal_fm',{timestamp: Date.now()})

/* login 私人FM垃圾桶 */
export const fmTrash =(id)=>get('/fm_trash',{id})