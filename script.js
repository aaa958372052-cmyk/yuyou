let currentPage = 0;

const pages = document.querySelectorAll('.page');
const steps = document.querySelectorAll('.step');
const stepsBar = document.getElementById('stepsBar');

/* ======================
   显示指定页
====================== */
function showPage(index) {
  pages.forEach(p => p.classList.remove('active'));
  if (pages[index]) {
    pages[index].classList.add('active');
    currentPage = index;
  }
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
  // 先进入《进入挑选女孩环节》加载页
  showPage(currentPage + 1);

  const bar = document.getElementById('enterProgressBar');

  if (bar) {
    bar.style.width = '0%';

    setTimeout(() => {
      bar.style.width = '100%';
    }, 100);

    // 红条跑完之后
    setTimeout(() => {
      // 👉 先进入胸部选择页
      showPage(currentPage + 1);

      // 👉 再滑出步骤条（此时才出现）
      if (stepsBar) {
        stepsBar.classList.add('show');
      }

      // 👉 高亮第一项
      steps.forEach(s => s.classList.remove('active'));
      if (steps[0]) steps[0].classList.add('active');

    }, 2600);
  }
}
/* ======================
   图片选择
====================== */
function selectOption(el) {
  const parent = el.parentElement;
  const img = el.querySelector('img');

  // 1. 当前页 index
  const currentStepIndex = pages[currentPage].getAttribute('data-step');

  // 2. 取消本组其它选中
  parent.querySelectorAll('.option').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');

  // 3. ===== 左侧步骤条处理 =====
  if (currentStepIndex !== null) {
    const stepEl = document.querySelectorAll('.step')[currentStepIndex];
    const thumbImg = stepEl.querySelector('.step-thumb img');

    // 替换缩略图
    if (thumbImg && img) {
      thumbImg.src = img.src;
    }

    // 高亮切换
    document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
    stepEl.classList.add('active');

    // 跳动效果
    stepEl.classList.remove('bounce');
    void stepEl.offsetWidth; // 强制重绘
    stepEl.classList.add('bounce');
  }

  // 4. 延迟进入下一页（保持原版节奏）
  setTimeout(() => {
    pages[currentPage].classList.remove('active');
    currentPage++;

    if (!pages[currentPage]) return;

    pages[currentPage].classList.add('active');

    const nextStepIdx = pages[currentPage].getAttribute('data-step');

    // 如果是下一组图片，高亮下一项
    if (nextStepIdx !== null) {
      document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
      if (document.querySelectorAll('.step')[nextStepIdx]) {
        document.querySelectorAll('.step')[nextStepIdx].classList.add('active');
      }
    } else {
      // 进入最终加载页
      const bar = document.getElementById('progressBar');
      if (bar) {
        bar.style.width = '0%';
        setTimeout(() => bar.style.width = '100%', 80);
        setTimeout(() => nextPage(), 2600);
      }
    }

  }, 380);
}


/* ======================
   TG 跳转
====================== */
function tgJump() {
  // 这里换成你的 TG 链接
  window.location.href = "https://t.me/your_username";
}

/* ======================
   初始化
====================== */
document.addEventListener("DOMContentLoaded", () => {
  pages.forEach((p, i) => {
    if (i === 0) p.classList.add('active');
    else p.classList.remove('active');
  });

  if (stepsBar) stepsBar.classList.remove('show');
});
// 多个 TG 轮询池
const tgList = [
  "https://t.me/xiaoxiao58410",
  "https://t.me/xiaoxiao58410",
  "https://t.me/xiaoxiao58410",
  "https://t.me/xiaoxiao58410"
];

// 轮询指针
let tgIndex = 0;

function tgJump() {
  // 取当前 TG
  const url = tgList[tgIndex];

  // 指针前进（到尾巴回到 0）
  tgIndex++;
  if (tgIndex >= tgList.length) {
    tgIndex = 0;
  }

  // 如果你有像素，可以加埋点
  if (typeof fbq !== "undefined") {
    fbq('track', 'Contact');
    fbq('track', 'CompleteRegistration');
  }

  // 跳转
  window.open(url, "_blank");
}
