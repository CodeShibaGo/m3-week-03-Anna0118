const songs = ["energy", "inspire", "smallguitar"];
let songIndex = 0;
loadSong(songs[songIndex]);

function loadSong(song) {
  document.getElementById("title").textContent = song;
  document.getElementById("audio").setAttribute("src", `music/${song}.mp3`);
  document.getElementById("cover").setAttribute("src", `images/${song}.jpg`);
}

function playSong() {
  // $("#music-container").addClass("play");
  document.getElementById("music-container").classList.add("play");
  // $("#play").find("i").attr("class", "fas fa-pause");ˋ
  document.querySelector("#play i").className = "fas fa-pause";
  // $("#audio")[0].play();
  document.getElementById("audio").play();
}

function pauseSong() {
  // $("#music-container").removeClass("play");
  document.getElementById("music-container").classList.remove("play");
  // $("#play").find("i").attr("class", "fas fa-play");
  document.querySelector("#play i").className = "fas fa-play";
  // $("#audio")[0].pause();
  document.getElementById("audio").pause();
}

// Next song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Previous song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}


  // ----------------------

// $("#audio").on("timeupdate", function () {
//   const duration = $("#audio")[0].duration;
//   const currentTime = $("#audio")[0].currentTime;
//   const progressPercent = (currentTime / duration) * 100;
//   $("#progress").css("width", `${progressPercent}%`);
// });

//  當currentTime更新時候觸發進度條
document.getElementById("audio").addEventListener("timeupdate", function () {
  const duration = this.duration;
  const currentTime = this.currentTime;
  const progressPercent = (currentTime / duration) * 100;
  document.getElementById("progress").style.width = `${progressPercent}%`;
});


  // ----------------------

// $("#progress-container").click(function (e) {
//   const duration = $("#audio")[0].duration;
//   const width = $("#progress-container").width();
//   const clickX = e.offsetX;
//   const percent = (clickX / width) * duration;
//   $("#audio")[0].currentTime = percent;
// });

// 處理進度條點擊
document
  .getElementById("progress-container")
  .addEventListener("click", function (e) {
    // <audio> 元素的總播放時長（秒）
    const duration = document.getElementById("audio").duration;
    // 進度條容器（progress-container）的寬度（像素）
    const width = this.offsetWidth;
    // 點擊事件相對於進度條容器左邊緣的水平位置（像素）
    const clickX = e.offsetX;
    // 計算點擊位置占進度條總長度的百分比，並根據音樂總時長轉換成應當跳轉到的播放時間
    const percent = (clickX / width) * duration;
    document.getElementById("audio").currentTime = percent;
  });

  // ----------------------

// $("#play").click(function () {
//   const isPlaying = $("#music-container").hasClass("play");
//   if (isPlaying == true) {
//     pauseSong();
//   } else {
//     playSong();
//   }
// });

// 切換音樂的播放狀態。如果音樂正在播放，則暫停；如果音樂已暫停，則播放
document.getElementById("play").addEventListener("click", function () {
  // 檢查 music-container 元素是否包含 play 類別來判斷音樂是否正在播放
  const isPlaying = document
    .getElementById("music-container")
    .classList.contains("play");
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});


  // ----------------------

// Change song
// $("#prev").click(function () {
//   prevSong();
// });
// $("#next").click(function () {
//   nextSong();
// });

// $("audio").on("ended", function () {
//   nextSong();
// });

// Change song
document.getElementById('prev').addEventListener("click", prevSong);
document.getElementById('next').addEventListener("click", nextSong);

document.getElementById('audio').addEventListener("ended", nextSong);
