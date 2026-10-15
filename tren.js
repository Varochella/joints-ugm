// Tren — renders the 14-day mood line chart and the 7-day average bars.

// Mood scale 1 (lowest) .. 5 (highest). 14 days, matching the mock shape.
const MOOD_14 = [3, 3, 2, 1, 4, 4, 3, 2, 2, 2, 3, 4, 2, 1, 2, 5];
// Keep to 14 points.
const data = MOOD_14.slice(0, 14);

const DAYS = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min",
              "Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

const W = 760, H = 300;
const padX = 20, padY = 24;
const innerW = W - padX * 2;
const innerH = H - padY * 2;

// Map a mood value (1..5) and index to an svg coordinate.
function x(i) { return padX + (innerW * i) / (data.length - 1); }
function y(v) { return padY + innerH * (1 - (v - 1) / 4); }

function renderLineChart() {
  const svg = document.getElementById("lineChart");
  if (!svg) return;
  const ns = "http://www.w3.org/2000/svg";

  // Path
  let d = "";
  data.forEach((v, i) => { d += (i === 0 ? "M" : "L") + x(i).toFixed(1) + " " + y(v).toFixed(1) + " "; });
  const path = document.createElementNS(ns, "path");
  path.setAttribute("d", d.trim());
  path.setAttribute("fill", "none");
  path.setAttribute("stroke", "#6d57c0");
  path.setAttribute("stroke-width", "3");
  path.setAttribute("stroke-linejoin", "round");
  path.setAttribute("stroke-linecap", "round");
  svg.appendChild(path);

  // Dots — peaks (value >= 4) get an amber fill.
  data.forEach((v, i) => {
    const c = document.createElementNS(ns, "circle");
    c.setAttribute("cx", x(i));
    c.setAttribute("cy", y(v));
    c.setAttribute("r", "6");
    const peak = v >= 4;
    c.setAttribute("fill", peak ? "#f4c84a" : "#8f7fd4");
    c.setAttribute("stroke", "#fff");
    c.setAttribute("stroke-width", "2.5");
    svg.appendChild(c);
  });
}

function renderXLabels() {
  const el = document.getElementById("xLabels");
  if (!el) return;
  el.innerHTML = DAYS.map((d) => `<span>${d}</span>`).join("");
}

function renderBars() {
  const el = document.getElementById("bars");
  if (!el) return;
  // Average per weekday (Mon..Sun) — Monday is the lowest "peak" marker.
  const avg = [1.5, 3, 3.2, 3.5, 4, 4.3, 4];
  const max = 5;
  el.innerHTML = avg.map((v, i) => {
    const h = Math.round((v / max) * 100);
    const peak = i === 0; // Monday highlighted in the design
    return `<div class="bar${peak ? " peak" : ""}" style="height:${h}%"></div>`;
  }).join("");
}

renderLineChart();
renderXLabels();
renderBars();
