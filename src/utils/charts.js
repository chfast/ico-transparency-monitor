/* eslint-env browser */
const saveAs = require('file-saver').saveAs;

const svgDataURL = (svg) => {
  const svgAsXML = new XMLSerializer().serializeToString(svg);
  return `data:image/svg+xml,${encodeURIComponent(svgAsXML)}`;
};

export const downloadChartImage = (chartId, title, xLabel, yLabel) => {
  const div = document.getElementById(chartId);
  const rect = div.getBoundingClientRect();

  const canvas = document.createElement('canvas');

  canvas.width = rect.width;
  canvas.height = rect.height + 50;

  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
  gradient.addColorStop('0', '#424344');
  gradient.addColorStop('0.5', '#D9DBDC');
  gradient.addColorStop('1.0', '#D4E20F');


  const svgTag = document.getElementById(chartId).getElementsByTagName('svg')[0];
  const url = svgDataURL(svgTag);
  const img = new Image();

  img.width = canvas.width;
  img.height = canvas.height;

  img.onload = function () {
    ctx.drawImage(img, 0, canvas.height / 5);

    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.font = '10px Montserrat';
    ctx.fillText(yLabel, 20, 70);
    ctx.fillText(xLabel, canvas.width / 2, canvas.height - 10);

    ctx.font = '20px Montserrat';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillText(title, canvas.width / 2, 30);

    ctx.font = '30px Montserrat';
    ctx.fillStyle = gradient;
    ctx.fillText('Powered by Neufund', canvas.width / 2, (canvas.height / 2) - 40);

    canvas.toBlob((blob) => {
      saveAs(blob, `${chartId}.png`);
    });
  };
  img.src = url;
};
