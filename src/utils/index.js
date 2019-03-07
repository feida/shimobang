/**
 * Created by jiachenpan on 16/11/18.
 */

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export function isObjectValueEqual(a, b) {
  // 如果a和b不是null或undefined且都是对象或数组才进行判断
  if (a && b && typeof a === 'object' && typeof b === 'object') {
    // 获取两个对象的自有全部属性名的数组
    var aProps = Object.getOwnPropertyNames(a)
    var bProps = Object.getOwnPropertyNames(b)

    // 如果属性数量不一致则直接判定为不相等
    if (aProps.length !== bProps.length) {
      return false
    }

    // 遍历a对象全部自有属性
    for (var i in aProps) {
      var propName = aProps[i]

      // 如果属性是引用类型（数组，对象），且b也具有该属性
      if (b[propName] && typeof a[propName] === 'object') {
        // 则递归调用isObjectValueEqual函数
        var isObjPropEqual = isObjectValueEqual(a[propName], b[propName])
        if (!isObjPropEqual) {
          return false
        }
      } else if (typeof a[propName] === 'function') {
        // 注意：并没有判断对象方法相等，只是判断是具有相同方法名
        if (!b[propName]) {
          return false
        }
      } else if (a[propName] !== b[propName]) { // 如果属性是值类型
        // 则直接比较值和类型，注意使用全等判断，避免隐式类型转换
        return false
      }
    }

    // 如果a或b存在空值或不是都是对象或数组则判定不等
    return true
  } else {
    // 如果a或b存在空值或不是都是对象或数组则判定不等
    return false
  }
}

export function myTypeOf(obj) { // 判断数据类型
  return Object.prototype.toString.call(obj)
}
export function cmparedObj(obj1, obj2) { // 判断两个对象每一项的值是否相等
  var res = true

  // debugger

  for (var key in obj1) {
    var cur = obj1[key]

    var type = myTypeOf(cur)

    if (type !== myTypeOf(obj2[key])) {
      return false
    }

    if (type.indexOf('Object') > -1) {
      for (var k in cur) {
        res = cmparedObj(cur[k], obj2[k])

        if (res === false) {
          return false
        }
      }
    } else if (type.indexOf('Array') > -1) {
      res = cmparedArr(cur, obj2[key])

      if (res === false) {
        return false
      }
    } else {
      if (cur !== obj2[key]) {
        return false
      }
    }
  }

  return res
}

export function cmparedArr(arr1, arr2) { // 判断两个数组每一项的值是否相等
  var res = true

  // debugger

  if (arr1.length !== arr2.length) {
    return false
  }

  for (var i = 0; i < arr1.length; i++) {
    var cur = arr1[i]

    var type = myTypeOf(cur)

    if (type !== myTypeOf(arr2[i])) {
      return false
    }

    if (type.indexOf('Object') > -1) {
      res = cmparedObj(cur, arr2[i])

      if (res === false) {
        return false
      }
    } else if (type.indexOf('Array') > -1) {
      res = cmparedArr(cur, arr2[i])

      if (res === false) {
        return false
      }
    } else {
      if (cur !== arr2[i]) {
        return false
      }
    }
  }

  return res
}
