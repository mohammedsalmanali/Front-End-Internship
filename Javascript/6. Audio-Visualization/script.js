// utils.js
function hslToRgb(h, s, l) {
    let r;
    let g;
    let b;
  
    if (s == 0) {
      r = g = b = l; // achromatic
    } else {
      const hue2rgb = function hue2rgb(p, q, t) {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
  
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }
  
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  }
  
  // sound.js
  const WIDTH = 1000;
  const HEIGHT = 1000;
  
  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  
  let analyzer;
  let bufferLength;
  
  function handleError() {
    console.log("You must provide access to your microphone to proceed.");
  }
  
  // gets the audio input
  async function getAudio() {
    const stream = await navigator.mediaDevices
      .getUserMedia({ audio: true })
      .catch(handleError);
    const audioCtx = new AudioContext();
    analyzer = audioCtx.createAnalyser();
    const source = audioCtx.createMediaStreamSource(stream);
    source.connect(analyzer);
    // how much data do we want to collect?
    // ** is to the power of - so 2 to the power of 10
    analyzer.fftSize = 2 ** 10;
    // pull the data off the audio
    bufferLength = analyzer.frequencyBinCount;
    const timeData = new Uint8Array(bufferLength);
    const frequencyData = new Uint8Array(bufferLength);
    drawTimeData(timeData);
    drawFrequency(frequencyData);
  }
  
  // draws the time data - the top line
  function drawTimeData(timeData) {
    // injects the time data into the timeData array
    analyzer.getByteTimeDomainData(timeData);
    // now that the data is coming in, we can visualize it
    // clear the canvas first
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    // setup the drawing
    ctx.lineWidth = 10;
    ctx.strokeStyle = "#0f866f";
    ctx.beginPath();
    // how big each slice will be
    const sliceWidth = WIDTH / bufferLength;
    let x = 0;
    timeData.forEach((data, i) => {
      const v = data / 128;
      const y = (v * HEIGHT) / 2.75;
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
      x += sliceWidth;
    });
    ctx.stroke();
    // call itself as soon as possible
    requestAnimationFrame(() => drawTimeData(timeData));
  }
  
  // draws the frequency - the bottom bars
  function drawFrequency(frequencyData) {
    // put the data into our array
    analyzer.getByteFrequencyData(frequencyData);
    // figure out the bar width
    const barWidth = (WIDTH / bufferLength) * 2.75;
    let x = 0;
    frequencyData.forEach((amount) => {
      // 0 - 255
      const percent = amount / 255;
      const [h, s, l] = [360 / (percent * 360) - 0.25, 0.5, 0.5];
      const barHeight = (HEIGHT * percent) / 1.5;
      // convert color to use hsl - then converted to rgb for fillStyle
      const [r, g, b] = hslToRgb(h, s, l);
      ctx.fillStyle = `rgb(${r},${g}, ${b}`;
      ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
      x += barWidth + 3;
    });
  
    // run as often as needed
    requestAnimationFrame(() => drawFrequency(frequencyData));
  }
  
  getAudio();
  