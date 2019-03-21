const defOpts = {
  max: Infinity,
  min: -Infinity,
  defMax: 1,
  defMin: 0,
  minStep: -Infinity,
  step: 1,
  count: 2,
}

const ceil = (val, step) => val % step ? (Math.floor(val / step) + 1) * step : val
const floor = (val, step) => val % step ? Math.floor(val / step) * step : val
const isCeil = (val, step) => val % step * 2 >= step
const round = (val, step) => isCeil(val, step) ? ceil(val, step) : floor(val, step)

export const calcCoordinates = (values = [], opts) => {
  const {
    max: maxMax,
    min: minMin,
    defMax,
    defMin,
    minStep,
    step,
    count,
  } = {
    ...defOpts,
    ...opts
  }

  if (isFinite(maxMax) && isFinite(minMin) && (maxMax - minMin) / (count - 1) % step !== 0) {
    throw new Error('(max - min) / (count -1)应该能整除step')
  }

  // 求最大值和最小值
  let max = Math.max(...values)
  let min = Math.min(...values)

  max = !isFinite(max) ? defMax : max
  min = !isFinite(min) ? defMin : min

  // 判断是否大于最大值，或少于最少值
  max = max > maxMax ? maxMax : max
  min = min < minMin ? minMin : min

  let stepC = (max - min) / (count - 1)
  stepC = stepC < minStep ? minStep : stepC
  stepC = ceil(stepC, step)
  let mid = (max + min) / 2 // 中间值

  for (let i = 0; i < 100; i++) {
    let maxC = (count - 1) / 2 * stepC + round(mid, count % 2 ? step : stepC / 2)
    let minC = maxC - stepC * (count - 1)

    if (maxC < max || minC > min) {
      stepC += step
      continue
    }

    if (minC < minMin) {
      if (maxC + step <= maxMax) {
        mid += step
        continue
      }
      stepC += step
      continue
    }

    if (maxC > maxMax) {
      if (minC - step >= minMin) {
        mid -= step
        continue
      }
      stepC += step
      continue
    }

    max = maxC
    min = minC
    break
  }

  const arr = [...new Array(count)].map((item, index) => min + index * stepC)

  return {
    min,
    max,
    step: stepC,
    arr
  }
}

/**
 * 使用方式
 *
 * const arr = [[1, 1], [2, 2], [3, 3]]
 *
 * const path = generatePath(arr, {closepath: true})
 *
 * path == 'M 1 1 L 2 2 L 3 3 Z'
 *
 * @param values
 */
export const generatePath = (values, {closepath = false} = {}) => {
  let path = values.map(([x, y]) => {
    return `${x} ${y}`
  }).join(' L ')
  path = 'M ' + path
  if (closepath) {
    path += ' Z'
  }
  return path
}
