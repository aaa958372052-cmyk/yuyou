let currentPage = 0;

const pages = document.querySelectorAll('.page');
const steps = document.querySelectorAll('.step');
const stepsBar = document.getElementById('stepsBar');
/* ======================
   显示指定页
====================== */
function showPage(index) {
  pages.forEach(p => p.classList.remove('active'));

  const target = [...pages].find(p => parseInt(p.dataset.page) === index);
  if (target) {
    target.classList.add('active');
    currentPage = index;
  }

  // ===== 步骤条显示区间控制 =====
  if (index >= 6 && index <= 9) {
    stepsBar.classList.add('show');
    syncStep(index);
  } else {
    stepsBar.classList.remove('show');
  }

  // 进入系统匹配自动跑进度
  if (index === 10) {
    startMatchLoading();
  }
}
function syncStep(pageIndex) {
  const stepIndex = pageIndex - 6; // 6=胸

  steps.forEach((s, i) => {
    s.classList.remove('active', 'bounce');

    if (i === stepIndex) {
      s.classList.add('active', 'bounce');

      setTimeout(() => {
        s.classList.remove('bounce');
      }, 400);
    }
  });
}
/* ======================
   普通下一页
====================== */
function nextPage() {
  showPage(currentPage + 1);
}

/* ======================
   进入挑选女孩加载页
====================== */
function startSelection() {
  showPage(5); // 进入过渡加载

  const bar = document.getElementById('enterProgressBar');
  if (!bar) return;

  bar.style.width = '0%';
  setTimeout(() => bar.style.width = '100%', 80);

  setTimeout(() => {
    showPage(6); // 进入胸部选择
  }, 2600);
}
/* ======================
   图片选择
====================== */
function selectOption(el) {
  const parent = el.parentElement;
  parent.querySelectorAll('.option').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');

  const now = currentPage;

  setTimeout(() => {
    showPage(now + 1);
  }, 300);
}
function startMatchLoading() {
  const bar = document.getElementById('progressBar');
  if (!bar) return;

  bar.style.width = '0%';
  setTimeout(() => bar.style.width = '100%', 80);

  setTimeout(() => {
    showPage(11); // 最终页
  }, 2600);
}

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

document.addEventListener("DOMContentLoaded", () => {
  showPage(0);
});

