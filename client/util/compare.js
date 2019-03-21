export function compareValue(val1, val2, keys) {
  if (val1 === val2) {
    return true
  }

  // 不同类型返回false
  if (typeof (val1) !== typeof (val2)) {
    return false
  }

  // 如果是数组
  if (val1 instanceof Array) {
    return compareArray(val1, val2, keys)
  }

  // 是对象比较各字段是否相同（或指定的字段）
  if (val1 instanceof Object) {
    return compareObject(val1, val2, keys)
  }
}

export function compareObject(obj1, obj2, keys) {
  if (!keys) {
    let keys1 = Object.keys(obj1)
    let keys2 = Object.keys(obj2)
    if (!compareArray(keys1, keys2)) {
      // 字段不一样
      return false
    }
    keys = keys1
  }

  for (let i = 0, l = keys.length; i < l; i++) {
    let key = keys[i]
    if (!compareValue(obj1[key], obj2[key])) {
      return false
    }
  }

  return true
}

// 判断数组是否相等
export function compareArray(arr1, arr2, keys) {
  if (arr1.length !== arr2.length) {
    return false
  }
  for (let i = 0, l = arr1.length; i < l; i++) {
    if (!compareValue(arr1[i], arr2[i], keys)) {
      return false
    }
  }

  return true
}
