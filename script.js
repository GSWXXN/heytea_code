const cardDefinitions = [
  {
    note: '关闭杯杯检测',
    getCode: () => 'ht009',
  },
  {
    note: '开启手动出茶',
    getCode: (date) => `ht${String(date.getHours() * 7 + date.getDate() * 3).padStart(3, '0')}`,
  },
  {
    note: '开启超级权限',
    getCode: () => 'ht0101',
  },
  {
    note: '发送时间密码日志',
    getCode: (date) => `ht${String(((43 - (date.getMonth() + 1)) - date.getDate()) * 3).padStart(3, '0')}`,
  },
];

const cardsRoot = document.getElementById('cards');
const cardTemplate = document.getElementById('card-template');
const toast = document.getElementById('toast');

let toastTimer = null;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('is-visible');

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('is-visible');
  }, 1400);
}

function buildCards() {
  const now = new Date();
  const fragment = document.createDocumentFragment();

  cardDefinitions.forEach((item) => {
    const card = cardTemplate.content.firstElementChild.cloneNode(true);
    const code = item.getCode(now);

    card.querySelector('.card-note').textContent = item.note;
    card.querySelector('.card-code').textContent = code;
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `${item.note}，代码 ${code}`);

    const copyCode = async () => {
      try {
        await navigator.clipboard.writeText(code);
        showToast('已复制');
      } catch {
        showToast('复制失败');
      }
    };

    card.addEventListener('click', copyCode);
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        copyCode();
      }
    });

    fragment.appendChild(card);
  });

  cardsRoot.replaceChildren(fragment);
}

buildCards();

setInterval(buildCards, 5 * 60 * 1000);
