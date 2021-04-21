export default function hex2rgba(hex, alpha) {
  //let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  //let new_hex = hex.replace(shorthandRegex, function (m, r, g, b) {
  //  return r + r + g + g + b + b;
  //});
  //let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(new_hex);
  //return result
  //  ? `rgba(${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(
  //      result[3],
  //      16
  //    )},${alpha})`
  //  : null;

  let r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r
    ? `rgba(${parseInt(r[1], 16)},${parseInt(r[2], 16)},${parseInt(
        r[3],
        16
      )},${alpha})`
    : null;
}
