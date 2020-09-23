/**
 * 获取按钮对象，在指定时间禁止click，返回相应的定时器
 * @param {any} button
 * @param {object} params
 * @return {any} a interval
 */
export function checkIt(button: any, seconds: number, after: string): number {
  seconds = seconds || 60;
  after = after || button.value;
  button.innerText = `${seconds--}`;
  button.disabled = true;
  const inter = setInterval(() => {
    if (seconds > 0) {
      button.innerText = `${seconds}`;
      --seconds;
    } else {
      button.disabled = false;
      button.innerText = after;
      clearInterval(inter);
    }
  }, 1000);
  return inter;
}