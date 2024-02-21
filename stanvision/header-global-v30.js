// Delayed loading of Tolstoy Widget
setTimeout(function () {
  window.tolstoyAppKey = "99cb933d-4cf4-4ad1-b66b-de8ed96a1925";
  var tolstoyScript = document.createElement("script");
  tolstoyScript.type = "text/javascript";
  tolstoyScript.async = true;
  tolstoyScript.src = "https://widget.gotolstoy.com/widget/widget.js";
  document.head.appendChild(tolstoyScript);
}, 1600);

// Hotjar Tracking
(function (h, o, t, j, a, r) {
  h.hj =
    h.hj ||
    function () {
      (h.hj.q = h.hj.q || []).push(arguments);
    };
  h._hjSettings = { hjid: 1470216, hjsv: 6 };
  a = o.getElementsByTagName("head")[0];
  r = o.createElement("script");
  r.async = 1;
  r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
  a.appendChild(r);
})(window, document, "https://static.hotjar.com/c/hotjar-", ".js?sv=");

// Finsweet Mirror Click
var finsweetScript = document.createElement("script");
finsweetScript.defer = true;
finsweetScript.src =
  "https://cdn.jsdelivr.net/npm/@finsweet/attributes-mirrorclick@1/mirrorclick.js";
document.head.appendChild(finsweetScript);
