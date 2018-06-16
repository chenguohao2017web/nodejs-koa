window.onload = function () {
  init()
}

function init() {
  const subBtn = document.getElementById('submit')

  subBtn.onclick = function () {
    const userVal = document.getElementById('username').value
    const passVal = document.getElementById('password').value

    const params = {
      username: userVal,
      password: passVal
    }
    axios({
      method: 'post',
      url: '/api/post',
      data: {
        username: userVal,
        password: passVal
      },
      haders: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      transformRequest: [function (data) {
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }]
    })
      .then(res => {
        if (res.status === 200) {
          if (res.data.token) {
            alert('登陆成功: ' + res.data.token)
          } else {
            alert('登录失败: ' + res.data.message)
          }
        }
      })
  }
}