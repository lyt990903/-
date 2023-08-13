// wx.getSetting({
//   success(res) {
//     const authSetting = res.authSetting["scope.address"];
//     if (authSetting || authSetting == undefined) {
//       // 判断用户是否有权限或者没有设置过权限，如果是直接获取地址
//       wx.chooseAddress({
//         success(address) {
//           console.log(address);
//         }
//       })
//     } else {
//       // 如果用户曾经关闭过权限，引导用户打开权限
//       wx.openSetting({
//         success() {
//           wx.chooseAddress({
//             success(address) {
//               console.log(address);
//             }
//           })
//         }
//       })
//     }
//   }
// })

export default function() {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success(res) {
        const authSetting = res.authSetting["scope.address"];
        if (authSetting == false) {
          wx.openSetting({
            success(res) {
              wx.chooseAddress({
                success: resolve
              })
            }
          })
        } else {
          wx.chooseAddress({
            success: resolve
          })
        }
      }
    })
  })
}