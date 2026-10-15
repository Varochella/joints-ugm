// Skrining — simple 10-question flow driven by data.

const QUESTIONS = [
  { text: "Dalam 2 minggu terakhir, seberapa sulit kamu merasa rileks?",
    options: ["Tidak sama sekali", "Beberapa hari", "Lebih dari separuh hari", "Hampir setiap hari"] },
  { text: "Seberapa sering kamu merasa cemas atau khawatir berlebihan?",
    options: ["Tidak sama sekali", "Beberapa hari", "Lebih dari separuh hari", "Hampir setiap hari"] },
  { text: "Dalam 2 minggu terakhir, seberapa sering kamu merasa lelah atau kurang berenergi?",
    options: ["Tidak sama sekali", "Beberapa hari", "Lebih dari separuh hari", "Hampir setiap hari"] },
  { text: "Seberapa sering kamu kehilangan minat pada hal yang biasanya menyenangkan?",
    options: ["Tidak sama sekali", "Beberapa hari", "Lebih dari separuh hari", "Hampir setiap hari"] },
  { text: "Seberapa sering kamu sulit tidur atau tidur terlalu banyak?",
    options: ["Tidak sama sekali", "Beberapa hari", "Lebih dari separuh hari", "Hampir setiap hari"] },
  { text: "Seberapa sering kamu merasa mudah tersinggung atau marah?",
    options: ["Tidak sama sekali", "Beberapa hari", "Lebih dari separuh hari", "Hampir setiap hari"] },
  { text: "Seberapa sering kamu sulit berkonsentrasi pada tugas?",
    options: ["Tidak sama sekali", "Beberapa hari", "Lebih dari separuh hari", "Hampir setiap hari"] },
  { text: "Seberapa sering kamu merasa gelisah dan sulit untuk diam?",
    options: ["Tidak sama sekali", "Beberapa hari", "Lebih dari separuh hari", "Hampir setiap hari"] },
  { text: "Seberapa sering kamu merasa putus asa tentang masa depan?",
    options: ["Tidak sama sekali", "Beberapa hari", "Lebih dari separuh hari", "Hampir setiap hari"] },
  { text: "Seberapa sering kamu merasa tidak berharga?",
    options: ["Tidak sama sekali", "Beberapa hari", "Lebih dari separuh hari", "Hampir setiap hari"] },
];

const answers = new Array(QUESTIONS.length).fill(null);
let current = 2; // start at question 3 (matches the design)

const stepEl = document.getElementById("qStep");
const barEl = document.getElementById("progressBar");
const qTextEl = document.getElementById("questionText");
const optionsEl = document.getElementById("options");
const backBtn = document.getElementById("backBtn");
const nextBtn = document.getElementById("nextBtn");

function render() {
  const q = QUESTIONS[current];
  stepEl.textContent = `Skrining · Pertanyaan ${current + 1} / ${QUESTIONS.length}`;
  barEl.style.width = `${((current + 1) / QUESTIONS.length) * 100}%`;
  qTextEl.textContent = q.text;

  optionsEl.innerHTML = "";
  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "option" + (answers[current] === i ? " active" : "");
    btn.textContent = opt;
    btn.addEventListener("click", () => {
      answers[current] = i;
      render();
    });
    optionsEl.appendChild(btn);
  });

  backBtn.disabled = current === 0;
  backBtn.style.opacity = current === 0 ? "0.5" : "1";
  nextBtn.textContent = current === QUESTIONS.length - 1 ? "Selesai" : "Lanjut";
}

backBtn.addEventListener("click", () => {
  if (current > 0) { current--; render(); }
});

nextBtn.addEventListener("click", () => {
  if (current < QUESTIONS.length - 1) {
    current++;
    render();
  } else {
    const score = answers.reduce((s, a) => s + (a ?? 0), 0);
    const level = score <= 10 ? "Rendah" : score <= 20 ? "Sedang" : "Tinggi";
    alert(`Skrining selesai!\nSkor: ${score}\nTingkat: ${level}\n\nIni bukan diagnosis, hanya langkah awal mengenali dirimu.`);
  }
});

// Preselect the third option on the starting question to match the mock.
answers[current] = 2;
render();
