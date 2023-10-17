function onResize(cb) {
  let w = window.innerWidth;
  let h = window.innerHeight;
  window.addEventListener("resize", function () {
    if (w !== window.innerWidth || h !== window.innerHeight) {
      w = window.innerWidth;
      h = window.innerHeight;
      cb();
    }
  });
}

function getRect(el) {
  const rect = el.getBoundingClientRect();
  return { 
    top: rect.top + window.scrollY,
    left: rect.left + window.scrollX,
    bottom: rect.bottom + window.scrollY,
    right: rect.right + window.scrollX,
    width: rect.width,
    height: rect.height,
  }
}