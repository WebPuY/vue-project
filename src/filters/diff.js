export default function diff (diff) {
  let time = ''
  if (diff < 1) {
    time = '刚刚'
  } else if (diff < 60) {
    time = diff + '分钟前'
  } else if (diff < 1440) {
    time = Math.floor(diff / 60) + '小时前'
  } else {
    time = Math.floor(diff / 1400) + '天前'
  }
  return time
}
