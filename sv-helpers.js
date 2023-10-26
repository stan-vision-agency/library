function onResize(cb) {
  let w = window.innerWidth;
  window.addEventListener("resize", function () {
    if (w !== window.innerWidth) {
      w = window.innerWidth;
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
