//ローディング画面
// const loadingScreen = document.getElementById("loading-screen");
// const loadingText = document.getElementById("loading-text");

// document.addEventListener("DOMContentLoaded", () => {

//    loadingText.style.opacity = "1";
//    loadingScreen.style.opacity = "1";

//     const myPromise = new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(loadingText.style.opacity = "0");
//         }, 5000); // 5秒待機
//     });

//     // Promiseの使用例
//     myPromise.then((result) => {
//         // 成功時の処理
//         setTimeout(() => {
//             loadingScreen.style.opacity = "0";
//         }, 5000);

//         setTimeout(() => {
//             loadingScreen.style.display = "none";
//         }, 9000);
//     }).catch((error) => {
//         // 失敗時の処理
//         console.error("エラー:", error);
//     });
// });

//ハンバーガー
document.addEventListener("DOMContentLoaded", function () {
  // ページの内容（HTMLやCSSなど）を全て読み込み準備が整ったら実行
  document
    .querySelector(".btnHamburger")
    .addEventListener("click", function () {
      // .btnHamburgerがクリックされた時の処理
      document.querySelector(".btnHamburger").classList.toggle("is-active");
      document.querySelector("nav").classList.toggle("is-active");
      document.querySelector("#coverlayer").classList.toggle("is-active");
    });

  // ページ内リンクの場合の設置
  var navLinks = document.querySelectorAll("nav ul li a");
  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      // .btnHamburgerがクリックされた時の処理
      document.querySelector(".btnHamburger").classList.remove("is-active");
      document.querySelector("nav").classList.remove("is-active");
      document.querySelector("#coverlayer").classList.remove("is-active");
    });
  });
});

//top-mainのスライダー

const slideImages = document.querySelectorAll("#top-slider .slide-image");
let currentSlideIndex = 0;

function showNextSlide() {
  // 現在のスライドを非表示にする
  slideImages[currentSlideIndex].style.opacity = "0";

  // 次のスライドのインデックスを計算
  currentSlideIndex = (currentSlideIndex + 1) % slideImages.length;

  // 次のスライドを表示する
  slideImages[currentSlideIndex].style.opacity = "1";
}

// 初期状態で2枚目の画像を表示
slideImages[1].style.opacity = "1";

// 定期的に次のスライドを表示する
setInterval(showNextSlide, 8000);

//トップに戻るボタン
const backbutton = document.getElementById("back");

const scrollToTop = () => {
  document.documentElement.scrollIntoView({ behavior: "smooth" });
};

const handleScroll = () => {
  if (window.pageYOffset > 250) {
    backbutton.style.opacity = "1";
  } else {
    backbutton.style.opacity = "0";
  }
};

backbutton.addEventListener("click", scrollToTop);
window.addEventListener("scroll", handleScroll);

// スクロールに合わせてふわっと表示
const observerCallback = function (entries) {
  entries.forEach(function (entry, i) {
    const target = entry.target;
    if (entry.isIntersecting && !target.classList.contains("is-active")) {
      const delay = i * 200;
      setTimeout(function () {
        target.classList.add("is-active");
      }, delay);
    }
  });
};

window.addEventListener("load", function () {
  const target = document.querySelectorAll(".scr-target");
  const targetArray = Array.prototype.slice.call(target);
  const options = {
    root: null, // 監視するルート要素（親要素）を指定する場合はここに指定します
    rootMargin: "0px 0px",
    threshold: 0.2,
  };

  const observer = new IntersectionObserver(observerCallback, options);
  targetArray.forEach(function (tgt) {
    observer.observe(tgt);
  });
});

//topicsのスライダー

const slide = document.getElementById("slide");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const indicator = document.getElementById("indicator");
const lists = document.querySelectorAll(".list");
const totalSlides = lists.length;
let count = 0;
let autoPlayInterval;
function updateListBackground() {
  for (let i = 0; i < lists.length; i++) {
    lists[i].style.backgroundColor =
      i === count % totalSlides ? "#554a45" : "#d9d9d9";
  }
}
function nextClick() {
  slide.classList.remove(`slide${(count % totalSlides) + 1}`);
  count++;
  slide.classList.add(`slide${(count % totalSlides) + 1}`);
  updateListBackground();
}
function prevClick() {
  slide.classList.remove(`slide${(count % totalSlides) + 1}`);
  count--;
  if (count < 0) count = totalSlides - 1;
  slide.classList.add(`slide${(count % totalSlides) + 1}`);
  updateListBackground();
}
function startAutoPlay() {
  autoPlayInterval = setInterval(nextClick, 3000);
}
function resetAutoPlayInterval() {
  clearInterval(autoPlayInterval);
  startAutoPlay();
}
next.addEventListener("click", () => {
  nextClick();
  resetAutoPlayInterval();
});
prev.addEventListener("click", () => {
  prevClick();
  resetAutoPlayInterval();
});
indicator.addEventListener("click", (event) => {
  if (event.target.classList.contains("list")) {
    const index = Array.from(lists).indexOf(event.target);
    slide.classList.remove(`slide${(count % totalSlides) + 1}`);
    count = index;
    slide.classList.add(`slide${(count % totalSlides) + 1}`);
    updateListBackground();
    resetAutoPlayInterval();
  }
});
startAutoPlay();
