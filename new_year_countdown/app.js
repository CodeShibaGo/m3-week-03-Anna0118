const currentYear = new Date().getFullYear();
const newYearTime = new Date(`January 01 ${currentYear + 1} 00:00:00`);

// 設置年份
document.getElementById("year").textContent = currentYear + 1;
function updateCountdown() {
  const currentTime = new Date();
  const diff = newYearTime - currentTime;

  const d = Math.floor(diff / 1000 / 60 / 60 / 24);
  const h = Math.floor(diff / 1000 / 60 / 60) % 24; // 超過天數以外的小時數
  const m = Math.floor(diff / 1000 / 60) % 60;
  const s = Math.floor(diff / 1000) % 60;

  document.getElementById("days").textContent = d;
  document.getElementById("hours").textContent = h < 10 ? "0" + h : h;
  document.getElementById("minutes").textContent = m < 10 ? "0" + m : m;
  document.getElementById("seconds").textContent = s < 10 ? "0" + s : s;
}

// 初始移除 loading，顯示倒計時
setTimeout(() => {
  document.getElementById("loading").remove();
  document.getElementById("countdown").style.display = "flex";
}, 1000);

// 每秒更新倒計時
setInterval(updateCountdown, 1000);
