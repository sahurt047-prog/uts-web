// navigasi halus
const btnCv = document.getElementById('btnCv');
const btnPorto = document.getElementById('btnPorto');
const btnGame = document.getElementById('btnGame');
const cvPage = document.getElementById('cvPage');
const portoPage = document.getElementById('portoPage');
const gamePage = document.getElementById('gamePage');
const navs = [btnCv, btnPorto, btnGame];
const pages = [cvPage, portoPage, gamePage];

function setActivePage(index) {
    navs.forEach((b, i) => {
        if (i === index) b.classList.add('active');
        else b.classList.remove('active');
    });
    pages.forEach((p, i) => {
        if (i === index) p.classList.add('active-page');
        else p.classList.remove('active-page');
    });
    if (index === 2) resetGame();  // reset game saat dibuka
}

btnCv.addEventListener('click', () => setActivePage(0));
btnPorto.addEventListener('click', () => setActivePage(1));
btnGame.addEventListener('click', () => setActivePage(2));

// ========== GAME LOGIC ==========
let score = 0, timeLeft = 30, currentAnswer, gameActive = false, timerInterval;
const soalEl = document.getElementById('soal');
const jawabanInput = document.getElementById('jawaban');
const cekBtn = document.getElementById('cekBtn');
const nextBtn = document.getElementById('nextBtn');
const scoreSpan = document.getElementById('score');
const timerSpan = document.getElementById('timer');
const messageEl = document.getElementById('message');

function generateSoal() {
    let a = Math.floor(Math.random() * 12) + 1;
    let b = Math.floor(Math.random() * 12) + 1;
    let op = Math.random() > 0.4 ? '+' : '-';
    if (op === '-' && a < b) [a, b] = [b, a];
    soalEl.innerText = `${a} ${op} ${b}`;
    currentAnswer = op === '+' ? a + b : a - b;
}

function updateTimerDisplay() { timerSpan.innerText = timeLeft; }

function startTimer() {
    if (timerInterval) clearInterval(timerInterval);
    gameActive = true;
    timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            gameActive = false;
            messageEl.innerText = '⌛ Waktu habis! klik Next';
            cekBtn.disabled = true;
        } else {
            timeLeft--;
            updateTimerDisplay();
        }
    }, 1000);
}

function resetGame() {
    clearInterval(timerInterval);
    score = 0;
    timeLeft = 30;
    gameActive = true;
    scoreSpan.innerText = score;
    updateTimerDisplay();
    messageEl.innerText = '';
    generateSoal();
    jawabanInput.value = '';
    cekBtn.disabled = false;
    startTimer();
}

cekBtn.addEventListener('click', () => {
    if (!gameActive) { messageEl.innerText = '⏳ game paused, tekan Next'; return; }
    const userAns = parseInt(jawabanInput.value);
    if (isNaN(userAns)) { messageEl.innerText = 'masukkan angka!'; return; }
    if (userAns === currentAnswer) {
        score += 10;
        scoreSpan.innerText = score;
        messageEl.innerText = '✅ benar! +10 poin';
        generateSoal();
        jawabanInput.value = '';
    } else {
        messageEl.innerText = '❌ coba lagi';
    }
});

nextBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    timeLeft = 30;
    gameActive = true;
    updateTimerDisplay();
    generateSoal();
    jawabanInput.value = '';
    messageEl.innerText = '';
    cekBtn.disabled = false;
    startTimer();
});

// inisialisasi pertama
setActivePage(0);