
// 讓使用者可以拖拉來改變品牌的順序，並透過點擊check來檢查品牌名稱的當前順序是否正確

// const draggable_list = $("#draggable-list")[0];
const draggable_list = document.getElementById("draggable-list");
const powerfulBrands = [
  "Apple Inc.",
  "Amazon.com Inc.",
  "Microsoft",
  "Google",
  "Samsung",
  "Coca-Cola",
  "Toyota",
  "Mercedes-Benz",
  "McDonald’s",
  "Disney",
];

const listItems = [];

let dragStartIndex;
createList();

function createList() {
// 獲得隨機排序的品牌名稱表
  [...powerfulBrands]
    //  map會遍歷陣列中的每一個元素
    .map(function (data) {
      return {
        // 品牌名
        value: data,
        //  Math.random()會返回一個介於 0（包括）與 1（不包括）之間的浮點數
        sort: Math.random(),
      };
    })
    .sort(function (a, b) {
      return a.sort - b.sort;
    })
    // 再拿取排序後的品牌名稱
    .map(function (data) {
      return data.value;
    })

    .forEach((company, index) => {
      const listItem = document.createElement("li");

    //   index 是 .forEach() 方法提供的第二个参数
      listItem.setAttribute("data-index", index);
      listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
          <p class="company-name">${company}</p>
          <i class="fas fa-grip-lines"></i>
        </div>
      `;

      listItems.push(listItem);

    //   放在<ul>裡面
      draggable_list.appendChild(listItem);
    });
  addEventListeners();
}
                                                                                                                                        

// <li data-index="0">
//   <span class="number">1</span>
//   <div class="draggable" draggable="true">
//     <p class="company-name">Amazon.com Inc.</p>
//     <i class="fas fa-grip-lines" aria-hidden="true"></i>
//   </div>
// </li>;

function addEventListeners() {
  const draggables = document.querySelectorAll(".draggable");
  const dragListItems = document.querySelectorAll(".draggable-list li");

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
  });

  dragListItems.forEach((item) => {
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", dragDrop);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);
  });
}


// <li data-index="0">
//   <span class="number">1</span>
//   <div class="draggable" draggable="true">
//     <p class="company-name">Amazon.com Inc.</p>
//     <i class="fas fa-grip-lines" aria-hidden="true"></i>
//   </div>
// </li>;

function dragStart() {
  // 使用 closest 方法找到最近的 <li> 元素，和獲取其 data-index 屬性 (在很多情况下，被拖曳的元素可能是 <li>的子元素，而不是 <li> 元素本身)
  // + 是將字符轉為數字
  dragStartIndex = +this.closest("li").getAttribute("data-index");
}

function dragEnter() {
  this.classList.add("over");
}

function dragLeave() {
  this.classList.remove("over");
}

// 告訴瀏覽器："當我試圖把一個品牌名稱拖到另一個上面時，允許我這樣做"
function dragOver(e) {
  e.preventDefault();
}

// 放下拖曳項目
// "我要把手裡的這張牌和桌子上位置為 dragEndIndex 的那張牌交換"
function dragDrop() {
  const dragEndIndex = +this.getAttribute("data-index");
  swapItems(dragStartIndex, dragEndIndex);
  this.classList.remove("over");
}
// 交換兩個元素
function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector(".draggable");
  const itemTwo = listItems[toIndex].querySelector(".draggable");

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

function checkOrder() {
  listItems.forEach(function (listItem, index) {
    const randomBrands = listItem.querySelector(".draggable").innerText.trim();

    if (randomBrands !== powerfulBrands[index]) {
      listItem.classList.add("wrong");
    } else {
      listItem.classList.remove("wrong");
      listItem.classList.add("right");
    }
  });
}

// $("#check").click(checkOrder);
document.getElementById("check").addEventListener("click", checkOrder);