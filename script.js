function createGraph(canvas, options) {
  const rmWidth = 1404;
  const rmHeight = 1872;
  const TRANSPARENT = "hsla(0,0%,0%,0)";

  const ctx = canvas.getContext("2d");
  // so that lines are drawn exactly on the pixel to look crisp
  const PIXEL_ADJUST = 0.5;

  let vLines = options.vLines;
  let hLines = options.hLines;
  let vMajorInterval = options.vMajorInterval;
  let hMajorInterval = options.hMajorInterval;

  canvas.width = rmWidth;
  canvas.height = rmHeight;

  let xScale = rmWidth / vLines;
  let yScale = rmHeight / hLines;

  let majorVisible = true;
  let minorVisible = true;

  function drawGraphLines() {
    let colorMajor = `hsla(0,0%,${10 - options.majorDarkness}0%,1)`;
    let colorMinor = `hsla(0,0%,${10 - options.minorDarkness}0%,1)`;

    // draw background
    ctx.fillStyle = TRANSPARENT;

    ctx.fillRect(0, 0, canvas.width, canvas.height);

    function drawLineVertical(x, y, length, color) {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.moveTo(x, y);
      ctx.lineTo(x, y + length);
      ctx.stroke();
      ctx.closePath();
    }
    function drawLineHorizontal(x, y, length, color) {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.moveTo(x, y);
      ctx.lineTo(x + length, y);
      ctx.stroke();
      ctx.closePath();
    }
    drawGridLineVertical = (n, color) => {
      drawLineVertical(
        n * xScale + (ctx.lineWidth % 2 == 0 ? 0 : PIXEL_ADJUST),
        0,
        canvas.height,
        color
      );
    };
    drawGridLineHorizontal = (n, color) => {
      drawLineHorizontal(
        0,
        n * yScale + (ctx.lineWidth % 2 == 0 ? 0 : PIXEL_ADJUST),
        canvas.width,
        color
      );
    };

    // draw vertical lines
    for (let i = 1; i <= vLines; i++) {
      ctx.lineWidth = options.minorThickness;
      drawGridLineVertical(i, colorMinor);

      if (majorVisible && i % vMajorInterval == 0) {
        ctx.lineWidth = options.majorThickness;
        drawGridLineVertical(i, colorMajor);
      }
    }

    // draw horizontal lines
    for (let i = 1; i <= hLines; i++) {
      ctx.lineWidth = options.minorThickness;
      drawGridLineHorizontal(i, colorMinor);

      if (majorVisible && i % hMajorInterval == 0) {
        ctx.lineWidth = options.majorThickness;
        drawGridLineHorizontal(i, colorMajor);
      }
    }
  }

  drawGraphLines();
}