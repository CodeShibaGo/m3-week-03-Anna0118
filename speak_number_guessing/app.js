const randomNum = getRandomNumber();
console.log("Number:", randomNum);

// 隨機產生1~100的數字
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

//  recognition 物件的 start 方法，開始語音識別。開始使用麥克風捕捉語音輸入。
recognition.start();

// 會觸發一個 result 事件，並調用為該事件註冊的處理函數（如 onSpeak），同時將包含識別結果的事件對象 event 傳遞給該函數。
function onSpeak(event) {
  const msg = event.results[0][0].transcript;
  writeMessage(msg);
  checkNumber(msg);
}

// 從語音識別結果中提取的文本
function writeMessage(msg) {
  document.querySelector("#msg").innerHTML = `
    <div>You said: </div>
    <span class="box">${msg}</span>
  `;
}

// 檢查數字
function checkNumber(msg) {
  const num = +msg; // +：將字符轉為數字

  // Check if valid number
  if (Number.isNaN(num)) {
    const msgDiv = document.createElement("div");
    msgDiv.textContent = "That is not a valid number";
    document.querySelector("#msg").appendChild(msgDiv);

    return;
  }

  // Check in range
  if (num > 100 || num < 1) {
    const rangeDiv = document.createElement("div");
    rangeDiv.textContent = "Number must be between 1 and 100";
    document.querySelector("#msg").appendChild(rangeDiv);
    return;
  }

  // Check number
  if (num === randomNum) {
    document.body.innerHTML = `
      <h2>Congrats! You have guessed the number! <br><br>
      It was ${num}</h2>
      <button class="play-again" id="play-again">Play Again</button>
    `;
  } else if (num > randomNum) {
    document
      .querySelector("#msg")
      .insertAdjacentHTML("beforeend", "<div>GO LOWER</div>");
  } else {
    document
      .querySelector("#msg")
      .insertAdjacentHTML("beforeend", "<div>GO HIGHER</div>");
  }
}

recognition.addEventListener("result", onSpeak);
recognition.addEventListener("end", () => recognition.start());

document.body.addEventListener("click", function (e) {
  if (e.target.id === "play-again") {
    window.location.reload();
  }
});
