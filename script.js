let currentPage = 0;

const pages = document.querySelectorAll('.page');
const stepsBar = document.getElementById('stepsBar');
const stepItems = document.querySelectorAll('.step-item');

/* ======================
   显示指定页
====================== */
function showPage(index) {
  pages.forEach(p => p.classList.remove('active'));

  if (pages[index]) {
    pages[index].classList.add('active');
    currentPage = index;
    handleStepsBar(index);
  }
}

/* ======================
   控制步骤条显示 / 高亮
====================== */
function handleStepsBar(index) {
  // 默认先隐藏
  stepsBar.classList.remove('show');

  // 只在 6-9 显示
  if (index >= 6 && index <= 9) {
    stepsBar.classList.add('show');

    const stepIndex = index - 6;

    stepItems.forEach((item, i) => {
      item.classList.remove('active', 'bounce');

      if (i === stepIndex) {
        setTimeout(() => {
          item.classList.add('active', 'bounce');
        }, 120);
      }
    });

  } // 👈 这个你原来少了
}   // 👈 这个你原来少了
/* ======================
   普通下一页
====================== */
function nextPage() {
  showPage(currentPage + 1);
}

/* ======================
   进入挑选加载页
====================== */
function startSelection() {
  showPage(5); // 进入加载页

  const bar = document.getElementById('enterProgressBar');
  if (bar) {
    bar.style.width = '0%';
    setTimeout(() => bar.style.width = '100%', 50);

    setTimeout(() => {
      showPage(6); // 进入胸部页（步骤条在这里首次出现）
    }, 2600);
  }
}

/* ======================
   图片选择
====================== */
function selectOption(el) {
  const parent = el.parentElement;
  parent.querySelectorAll('.option').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');

  setTimeout(() => {

    // 如果是姿势页（9），进入系统匹配
    if (currentPage === 9) {
      showPage(10);

      const bar = document.getElementById('progressBar');
      if (bar) {
        bar.style.width = '0%';
        setTimeout(() => bar.style.width = '100%', 50);

        setTimeout(() => {
          showPage(11); // 最终页
        }, 2600);
      }

    } else {
      showPage(currentPage + 1);
    }

  }, 300);
}

/* ======================
   初始化
====================== */
document.addEventListener("DOMContentLoaded", () => {
  pages.forEach((p, i) => {
    if (i === 0) p.classList.add('active');
    else p.classList.remove('active');
  });

  // 强制隐藏步骤条
  stepsBar.classList.remove('show');
});

/* ======================
   TG 跳转
====================== */
const tgList = [
  "https://t.me/xiaoxiao58410",
  "https://t.me/xiaoxiao58410",
  "https://t.me/xiaoxiao58410",
  "https://t.me/xiaoxiao58410"
];

let tgIndex = 0;

function tgJump() {
  const url = tgList[tgIndex];
  tgIndex = (tgIndex + 1) % tgList.length;

  if (typeof fbq !== "undefined") {
    fbq('track', 'Contact');
    fbq('track', 'CompleteRegistration');
  }

  window.open(url, "_blank");
}
