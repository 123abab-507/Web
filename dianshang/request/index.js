export const request=(params)=>{
    //定义公共的URL

    const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1"
    return new Promise((resolve,reject)=>{
        wx.request({
            ...params,
            url:baseUrl+params.url,
            success:(result)=>{
                // result是成功后返回的数据
                resolve(result.data.message);
            },
            fail:(err)=>{
                reject(err);
            }
        });
    })
}