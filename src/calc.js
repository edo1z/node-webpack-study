let loop = null
let status = false
let count = 0
exports.start = () => {
  if (!status) {
    loop = setInterval(calc, 500)
    status = true
    console.log('count started')
  }
}
exports.stop = () => {
  clearInterval(loop)
  status = false
  console.log('count stopped')
}
function calc() {
  count++
  console.log(count)
}
