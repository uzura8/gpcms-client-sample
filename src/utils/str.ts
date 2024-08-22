export function substr(text: string, len: number, truncation = ''): string {
  const textArray = text.split('')
  let count = 0
  let str = ''
  for (let i = 0, m = textArray.length; i < m; i++) {
    const n = escape(textArray[i])
    if (n.length < 4) {
      count++
    } else {
      count += 2
    }
    if (count > len) {
      return str + truncation
    }
    str += text.charAt(i)
  }
  return text
}

export function serializeURL(path: string, query: Record<string, string>): string {
  // クエリオブジェクトのキーをソートしてクエリ文字列を生成
  const sortedQueryKeys = Object.keys(query).sort()
  const queryString = sortedQueryKeys
    .map((key) => {
      const value = query[key]
      // キーと値をエンコードして結合
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    })
    .join('&')

  // パスとクエリ文字列を結合
  const result = queryString ? `${path}?${queryString}` : path
  return result
}
