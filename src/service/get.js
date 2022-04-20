import axios from "axios";
import Vue from 'vue'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.timeout = 10000
/* 项目大部分为get请求，封装一个统一的处理错误、传递参数和url的get方法 */
const urlBase = '/beeapi'
export default (url, params) => {
    return axios.get(`${urlBase}${url}`, { params })
        .then(res => res.data)
        .catch(err => err)
}

/* 下载 */
export const downloadMusic = (url, fileName) => {
    axios
        .get(
            `${urlBase}${url}`, {
            responseType: "blob"
        })
        .then((res) => {
            let blob = res.data;
            let href = URL.createObjectURL(blob);
            console.log(href);
            let a = document.createElement("a");
            a.href = href;
            a.download = fileName
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            Vue.prototype.$message.success(`${fileName}下载成功`)
        })
        .catch((err) => {
            console.log(err);
            Vue.prototype.$message.$message.error('下载失败,请稍后重试!')
        });

}
export const uploadPlayListImg = ({ id, imgSize, data, imgX = 0, imgY = 0 }) =>
    axios({
        method: 'post',
        url: `${urlBase}/playlist/cover/update?id=${id}&imgSize=${imgSize}&imgX=${imgX}&imgY=${imgY}&timestamp=${Date.now()}`,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        data,
    }).then((res) => res.data).catch(err => err)

/* 更新用户头像 */
export const uploadAvatar = ({ imgSize, data, imgX = 0, imgY = 0 }) => axios({
    method: 'post',
    url: `${urlBase}/avatar/upload?&imgSize=${imgSize}&imgX=${imgX}&imgY=${imgY}&timestamp=${Date.now()}`,
    headers: {
        'Content-Type': 'multipart/form-data',
    },
    data,
}).then((res) => res.data).catch(err => err)