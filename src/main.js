const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.addButton')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [{
    logo: 'http://gitee.com/favicon.ico',
    url: 'https://gitee.com'
  },
  {
    logo: 'http://www.iconfont.cn/favicon.ico',
    url: 'https://www.iconfont.cn/'
  }
]

const simplifyUrl = (url) => {
  return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, '') //删除/开头的内容
}

const render = () => {
  $siteList.find('li:not(.addButton)').remove()
  hashMap.forEach((node, index) => {
    const $li = $(`<li>
        <div class="site">
          <div class="logo">
          <img width=32 title alt src="${node.logo}">
          </div>
          <div class="link">${simplifyUrl(node.url)}</div>
          <div class="close">
            <svg class="icon">
              <use xlink:href="#icon-close"></use>
            </svg>
          </div>
        </div>
      <div>
    </li>`).insertBefore($lastLi)
    $li.on(
      'click', () => {
        window.open(node.url)
      }
    )

    $li.on('click', '.close', (e) => {
      e.stopPropagation() //阻止冒泡
      hashMap.splice(index, 1)
      render()
    })
  })
}

render()

$('.addButton')
  .on('click', () => {
    let url = window.prompt('请问你要添加的网址是啥？')
    if (url.length !== 0) {
      if (url.indexOf('http') !== 0) {
        url = 'https://' + url
      }
      hashMap.push({
        logo: 'http://' + simplifyUrl(url) + '/favicon.ico',
        url: url
      })
      render()
    }
  })

window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap)
  localStorage.setItem('x', string)
}