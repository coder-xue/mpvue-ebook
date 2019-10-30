import { getOpenId } from './index'
export function getSetting (auth, onSuccess, onFail) {
  // 获取用户的当前设置。返回值中只会出现小程序已经向用户请求获得的权限,具体信息看官方文档
  mpvue.getSetting({
    success (res) {
      console.log(res)
      if (res.authSetting[`scope.${auth}`]) {
        onSuccess(res)
      } else {
        onFail(res)
      }
    },
    fail (res) {
      console.log(res)
    }
  })
}

export function getUserInfo (onSuccess, onFail) {
  mpvue.getUserInfo({
    success (res) {
      console.log(res)
      let { userInfo } = res
      if (userInfo) {
        onSuccess(userInfo)
      } else {
        onFail(res)
      }
    },
    fail (res) {
      console.log(res) // 直接抛出异常
    }
  })
}

export function setStorageSync (key, data) {
  mpvue.setStorageSync(key, data)
}

export function getStorageSync (key) {
  return mpvue.getStorageSync(key)
}

export function getUserOpenId (callback) {
  mpvue.login({
    success (res) {
      if (res.code) {
        const {code} = res
        getOpenId(code).then(response => {
          const { data: { data: { openid } } } = response
          setStorageSync('openId', openid)
          callback && callback(openid)
        }).catch(err => {
          console.log(err) // 直接抛出异常
        })
      } else {
        console.log(res) // 直接抛出异常
      }
    },
    fail (res) {
      console.log(res)
    }
  })
}

export function showLoading (title) {
  mpvue.showLoading({
    title,
    mask: true
  })
}

export function hideLoading () {
  mpvue.hideLoading()
}

export function showToast (title) {
  mpvue.showToast({
    title,
    duration: 2000
  })
}

export function setNavigationBarTitle (title) {
  // 原生api,设置导航标题
  mpvue.setNavigationBarTitle({title})
}
