const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.addButton')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [{
    logo: 'A',
    url: 'https://www.acfun.cn'
  },
  {
    logo: 'B',
    url: 'https://www.bilibili.com'
  }
]

const simplifyUrl = (url) => {
  return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, '') //删除/开头的内容
}

const render = () => {
  $siteList.find('li:not(.addButton)').remove()
  hashMap.forEach(node => {
    const $li = $(`<li>
        <div class="site">
          <div class="logo">${node.logo[0]}</div>
          <div class="link">${simplifyUrl(node.url)}</div>
          <div class="close">
            <svg class="icon">
              <use xlink:href="#icon-close"></use>
            </svg>
          </div>
        </div>
      <div>
    </li>`).insertBefore($lastLi)
    $li.on('click', () => {
      window.open(node.url)
    })
    $li.on('click', '.close', (e) => {
      e.stopPropagation()
    })
  })
}

render()

$('.addButton')
  .on('click', () => {
    let url = window.prompt('请问你要添加的网址是啥？')
    if (url.indexOf('http') !== 0) {
      url = 'https://' + url
    }
    hashMap.push({
      logo: simplifyUrl(url)[0],
      url: url
    })
    render()
  })

window.onbeforeunload = () => {
  console.log('页面要关闭了');
  const string = JSON.stringify(hashMap)
  localStorage.setItem('x', string)
}