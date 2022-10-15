export const isChromeOnMobile = () => {
  var ua = navigator.userAgent;
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua)) {
 
    if (/Chrome/.test(navigator.userAgent) &&/Google Inc/.test(navigator.vendor)) return true
  }
  return false;
};
