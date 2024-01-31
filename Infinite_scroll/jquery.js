let limit = 5;
let page = 1;

// 函數用於向 API 發送請求並顯示帖子
function showPosts() {
  // 使用 fetch 發送 HTTP 請求
  fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  )
    .then((response) => response.json()) // Promise 處理 , 解析為JSON
    .then((data) => {
      // 遍歷每個post
      data.forEach((post) => {
        // 創新的 div 元素
        const postEl = document.createElement("div");
        postEl.classList.add("post"); // 添加 CSS
        // 添加 HTML 內容
        postEl.innerHTML = `
          <div class="number">${post.id}</div>
          <div class="post-info">
            <h2 class="post-title">${post.title}</h2>
            <p class="post-body">${post.body}</p>
          </div>
        `;
        // 將帖子添加到頁面上
        document.getElementById("posts-container").appendChild(postEl);
      });
    });
}

// 在Searchbar做過濾post
function filterPosts() {
  // 拿input的值
  const term = document.querySelector('input').value.toLowerCase();
  // 拿所有post
  const posts = document.querySelectorAll('.post');
  //遍歷post內容字符有沒有符合輸入匡內容
  posts.forEach(post => {
    post.style.display = post.textContent.toLowerCase().includes(term) ? 'flex' : 'none';
  });
}

// 綁定搜索過濾的事件
document.querySelector('input').addEventListener('input', function () {
  filterPosts();
});

// 加載post
showPosts();

// 加載動畫並加載更多post
function showLoading() {
  const loader = document.querySelector('.loader');
  loader.classList.add('show'); // 顯示加載動畫
  setTimeout(() => {
    loader.classList.remove('show'); // 先隱藏加載動畫
    setTimeout(() => {
      page++; // 再來，增加頁碼
      showPosts(); // 加載新的post
    }, 300);
  }, 1000);
}


window.addEventListener("scroll", function () {
  if (
    // 檢查是否滾動到接近頁面底部
    window.scrollY + window.innerHeight >
    document.documentElement.scrollHeight - 5
  ) {
    showLoading();
  }
});
