export default function randomHexColorGenerator() {
  let hex = Math.random().toString(16).substr(2, 6);
  let rgb = parseInt(hex, 16);
  let r = (rgb >> 16) & 0xff;
  let g = (rgb >> 8) & 0xff;
  let b = (rgb >> 0) & 0xff;
  let luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
  while (luma > 155) {
    hex = Math.random().toString(16).substr(2, 6);
    rgb = parseInt(hex, 16);
    r = (rgb >> 16) & 0xff;
    g = (rgb >> 8) & 0xff;
    b = (rgb >> 0) & 0xff;
    luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
  }
  return `#${hex}`;
}
