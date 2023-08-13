export default function(confirmText) {
  return new Promise((resolve, reject) => {
    wx.showActionSheet({
      itemList: ['删除'],
      itemColor: '#eb4450',
      success: (res) => {
        // console.log(res);
        wx.showModal({
          title: "提示",
          content: confirmText,
          success: (res) => {
            if (res.confirm) {
              resolve(res);
            }
          }
        })
      }
    })
  })
}