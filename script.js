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
function handleStepsBar(pageIndex) {
  // 只在 6-9 显示
  if (pageIndex >= 6 && pageIndex <= 9) {
    stepsBar.classList.add('show');

    const stepIndex = pageIndex - 6;

   stepItems.forEach((item, i) => {
  item.classList.remove('active', 'pulse');
  if (i === stepIndex) {
    item.classList.add('active', 'pulse');
  }
});

  } else {
    stepsBar.classList.remove('show');
  }
}

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
      showPage(6); // 进入胸部选择页（步骤条在这里出现）
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
    // 如果现在是姿势页（9），下一步是系统匹配
    if (currentPage === 9) {
      showPage(10); // 系统匹配中

      const bar = document.getElementById('progressBar');
      if (bar) {
        bar.style.width = '0%';
        setTimeout(() => bar.style.width = '100%', 50);

        setTimeout(() => {
          showPage(11); // 最终页
        }, 2600);
      }

    } else {
      // 其他图片页正常 +1
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
