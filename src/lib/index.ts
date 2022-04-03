export const formatDate = (dt: Date) => {
  const y = dt.getFullYear()
  const m = ('00' + (dt.getMonth() + 1)).slice(-2)
  const d = ('00' + dt.getDate()).slice(-2)
  const h = ('00' + dt.getHours()).slice(-2)
  const M = ('00' + dt.getMinutes()).slice(-2)
  const s = ('00' + dt.getSeconds()).slice(-2)
  return y + '-' + m + '-' + d + ' ' + h + ':' + M + ':' + s
}
