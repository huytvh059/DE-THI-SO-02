// js/game.js

// --- CẤU HÌNH GAME ---
const MIN = 50;
const MAX = 150;
let secretNumber;
let attempts = 0;

// --- 1. KHỞI TẠO GAME ---
document.addEventListener('DOMContentLoaded', () => {
    initGame();
});

function initGame() {
    // Logic Random: (max - min + 1) + min
    // Giải thích: Math.random() ra 0->1. Nhân với khoảng cách (101) sẽ ra 0->100.99.
    // Floor làm tròn xuống (0->100). Cộng thêm Min (50) -> Kết quả: 50 -> 150.
    secretNumber = Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
    
    attempts = 0;
    updateUI("Nhập số từ 50 - 150 và nhấn Đoán", "#fff");
    
    // Reset input
    const input = document.getElementById('guessInput');
    const btn = document.getElementById('guessBtn');
    input.value = '';
    input.disabled = false;
    btn.style.display = 'inline-block';
    
    // Ẩn nút chơi lại
    document.getElementById('restartBtn').style.display = 'none';
    document.getElementById('attemptCount').innerText = attempts;
}

// --- 2. XỬ LÝ ĐOÁN SỐ ---
function checkGuess() {
    const inputElement = document.getElementById('guessInput');
    const userGuess = parseInt(inputElement.value);

    // Validation (Kiểm tra lỗi nhập liệu)
    if (isNaN(userGuess) || userGuess < MIN || userGuess > MAX) {
        updateUI(`Cảnh báo: Chỉ nhập số trong khoảng ${MIN} - ${MAX}!`, "orange");
        return;
    }

    attempts++;
    document.getElementById('attemptCount').innerText = attempts;

    // So sánh kết quả
    if (userGuess === secretNumber) {
        winGame();
    } else if (userGuess > secretNumber) {
        updateUI("Quá cao! Hãy thử số nhỏ hơn.", "#ff4444");
    } else {
        updateUI("Quá thấp! Hãy thử số lớn hơn.", "#ff4444");
    }
}

// Hàm xử lý khi thắng
function winGame() {
    updateUI(`CHÚC MỪNG! Bạn đoán đúng số ${secretNumber} sau ${attempts} lần thử!`, "#00ff00"); // Màu xanh lá
    
    // Khóa input
    document.getElementById('guessInput').disabled = true;
    document.getElementById('guessBtn').style.display = 'none';
    document.getElementById('restartBtn').style.display = 'inline-block';

    // Kích hoạt hiệu ứng pháo giấy
    createConfetti();
}

// Hàm cập nhật thông báo
function updateUI(message, color) {
    const msgElement = document.getElementById('message');
    msgElement.innerText = message;
    msgElement.style.color = color;
}

// --- 3. HIỆU ỨNG CONFETTI (Pháo giấy) ---
function createConfetti() {
    const colors = ['#ff0', '#f00', '#0f0', '#00f', '#f0f', '#0ff'];
    const container = document.body;

    for (let i = 0; i < 50; i++) {
        const conf = document.createElement('div');
        conf.classList.add('confetti');
        
        // Vị trí ngẫu nhiên
        conf.style.left = Math.random() * 100 + 'vw';
        conf.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Tốc độ rơi ngẫu nhiên
        conf.style.animationDuration = (Math.random() * 2 + 2) + 's';
        
        container.appendChild(conf);

        // Xóa phần tử sau khi rơi xong để tránh nặng máy
        setTimeout(() => {
            conf.remove();
        }, 4000);
    }
}