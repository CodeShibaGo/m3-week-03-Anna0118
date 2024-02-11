// 等待 DOM 內容完全加載完成
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("li.q").forEach(function (question) {
    question.addEventListener("click", function () {
      // 獲取下個元素
      let nextElement = this.nextElementSibling;
      if (nextElement.style.display === "none" || !nextElement.style.display) {
        nextElement.style.display = "block";
      } else {
        nextElement.style.display = "none";
      }

      // 選擇並收起所有其他答案
      let allAnswers = Array.from(this.parentNode.querySelectorAll("li.a"));
      allAnswers.forEach(function (ans) {
        // 如果不是一組的Q&A，就收起來
        if (ans !== nextElement) {
          ans.style.display = "none"; // 等效於 slideUp
        }
      });

      // 獲取當前問題的圖像，和處理旋轉圖像效果
      let img = this.querySelector("img");
      // 除了當前的，把所有圖像移除 'rotate' 類，
      document.querySelectorAll("li.q img").forEach(function (otherImg) {
        if (otherImg !== img) {
          otherImg.classList.remove("rotate");
        }
      });
      img.classList.toggle("rotate");
    });
  });
});
