export function hasKey(
  obj: Record<string, unknown>,
  prop: string,
  checkEmpty: boolean = false
): boolean {
  if (typeof obj !== 'object') return false
  if (Array.isArray(obj)) return false
  if (!Object.prototype.hasOwnProperty.call(obj, prop)) return false
  if (!(prop in obj)) return false
  if (obj[prop] == null) return false
  if (!checkEmpty) return true
  return Boolean(obj[prop])
}

export function isEmptyObj(data: unknown): boolean {
  if (
    data === null ||
    data === undefined ||
    data === false ||
    data === '' ||
    data === '0' ||
    data === 0
  ) {
    return true
  }

  if (typeof data === 'object') {
    if (Array.isArray(data)) return data.length === 0
    if (Object.keys(data as Record<string, unknown>).length > 0) return false
    if (
      typeof Object.getOwnPropertySymbols !== 'undefined' &&
      Object.getOwnPropertySymbols(data).length > 0
    )
      return false

    const valueOfData = (data as { valueOf(): unknown }).valueOf()
    if (typeof valueOfData === 'string' || Array.isArray(valueOfData)) {
      return valueOfData.length === 0
    } else if (typeof valueOfData !== 'object') {
      return isEmptyObj(valueOfData)
    }
  }

  return false
}

export function isEqualObjs(obj1: any, obj2: any): boolean {
  // 両方が同じオブジェクトの参照であれば true
  if (obj1 === obj2) {
    return true
  }

  // 型がオブジェクトでない場合、またはどちらかが null なら false
  if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) {
    return false
  }

  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)

  // オブジェクトのキーの数が異なる場合は false
  if (keys1.length !== keys2.length) {
    return false
  }

  // obj1 の各キーに対して再帰的に比較
  for (const key of keys1) {
    if (!keys2.includes(key)) {
      return false
    }

    // 値がオブジェクトの場合、再帰的に isEqual を呼び出す
    if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      if (!isEqualObjs(obj1[key], obj2[key])) {
        return false
      }
    } else if (obj1[key] !== obj2[key]) {
      // プリミティブ値の場合、直接比較
      return false
    }
  }

  return true
}
