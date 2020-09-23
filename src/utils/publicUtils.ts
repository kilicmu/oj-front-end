/**
 * 函数防抖
 * @param {Function} fn 目标函数
 * @param {number} wait 间隔
 */
function debouce<T>(fn: Function, wait: number) {
  let timer: any;
  return (...args: T[]) => {
    timer ? clearTimeout(timer) : null;
    timer = setTimeout(() => {
      fn(args);
    }, wait);
  };
}
/**
 * 函数节流
 * @param {Function} fn 目标函数
 * @param {number} wait 触发间隔
 */
function throttle<T>(fn: Function, wait: number) {
  let timer: any = null;
  return (...args: T[]) => {
    if (!timer) {
      fn(...args);
      timer = setTimeout(() => {
        timer = null;
      }, wait);
    }
  };
}


export { debouce, throttle };
