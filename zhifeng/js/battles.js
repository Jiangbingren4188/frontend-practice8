const battles = [
  { id: 1, name: '帕甸平原遭遇战', chapter: '第一章', enemy: '帝国西境军团', result: '胜利', troops: 120, loss: 18 },
  { id: 2, name: '围攻加伦多城堡', chapter: '第一章', enemy: '加伦多守军', result: '胜利', troops: 200, loss: 55 },
  { id: 3, name: '雪岭伏击战', chapter: '第二章', enemy: '斯特吉亚游骑', result: '失败', troops: 90, loss: 47 },
  { id: 4, name: '河谷会战', chapter: '第二章', enemy: '瓦兰迪亚重骑', result: '胜利', troops: 260, loss: 88 },
  { id: 5, name: '北境攻城战', chapter: '第三章', enemy: '斯特吉亚军', result: '失败', troops: 300, loss: 160 }
];

let nextId = 6;
const state = { chapter: 'all', result: 'all' };

const chapterFilter = document.querySelector('#chapter-filter');
const resultFilter = document.querySelector('#result-filter');
const list = document.querySelector('#battle-list');
const emptyTip = document.querySelector('#empty-tip');
const form = document.querySelector('#battle-form');
const formTitle = document.querySelector('#form-title');
const formTip = document.querySelector('#form-tip');
const resetBtn = document.querySelector('#reset-btn');

const render = () => {
  list.innerHTML = '';
  const shown = battles.filter(b =>
    (state.chapter === 'all' || b.chapter === state.chapter) &&
    (state.result === 'all' || b.result === state.result)
  );
  emptyTip.hidden = shown.length > 0;
  shown.forEach(b => {
    const col = document.createElement('div');
    col.className = 'col-md-6 col-lg-4';
    const card = document.createElement('div');
    card.className = 'card h-100';
    const body = document.createElement('div');
    body.className = 'card-body';
    const title = document.createElement('h3');
    title.className = 'card-title h6';
    title.textContent = b.name;
    const meta = document.createElement('p');
    meta.className = 'card-text small text-muted mb-1';
    meta.textContent = b.chapter + ' · 对阵 ' + b.enemy;
    const troops = document.createElement('p');
    troops.className = 'card-text mb-2';
    troops.textContent = '投入 ' + b.troops + ' 人 · 损失 ' + b.loss + ' 人';
    const badge = document.createElement('span');
    badge.className = 'badge ' + (b.result === '胜利' ? 'bg-success' : 'bg-danger');
    badge.textContent = b.result;
    const actions = document.createElement('div');
    actions.className = 'mt-3';
    const editBtn = document.createElement('button');
    editBtn.className = 'btn btn-sm btn-outline-primary me-2';
    editBtn.textContent = '编辑';
    editBtn.addEventListener('click', () => startEdit(b.id));
    const delBtn = document.createElement('button');
    delBtn.className = 'btn btn-sm btn-outline-danger';
    delBtn.textContent = '删除';
    delBtn.addEventListener('click', () => removeBattle(b.id));
    actions.append(editBtn, delBtn);
    body.append(title, meta, troops, badge, actions);
    card.appendChild(body);
    col.appendChild(card);
    list.appendChild(col);
  });
};

const resetForm = () => {
  form.reset();
  document.querySelector('#battle-id').value = '';
  formTitle.textContent = '录入战报';
  resetBtn.hidden = true;
  formTip.textContent = '';
};

const startEdit = (id) => {
  const b = battles.find(item => item.id === id);
  document.querySelector('#battle-id').value = b.id;
  document.querySelector('#battle-name').value = b.name;
  document.querySelector('#battle-chapter').value = b.chapter;
  document.querySelector('#battle-enemy').value = b.enemy;
  document.querySelector('#battle-result').value = b.result;
  document.querySelector('#battle-troops').value = b.troops;
  document.querySelector('#battle-loss').value = b.loss;
  formTitle.textContent = '编辑战报';
  resetBtn.hidden = false;
  form.scrollIntoView({ behavior: 'smooth' });
};

const removeBattle = (id) => {
  const b = battles.find(item => item.id === id);
  if (!confirm('确定删除「' + b.name + '」的战报吗？')) return;
  const index = battles.findIndex(item => item.id === id);
  battles.splice(index, 1);
  if (document.querySelector('#battle-id').value === String(id)) resetForm();
  render();
};

chapterFilter.addEventListener('change', () => {
  state.chapter = chapterFilter.value;
  render();
});

resultFilter.addEventListener('change', () => {
  state.result = resultFilter.value;
  render();
});

resetBtn.addEventListener('click', resetForm);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.querySelector('#battle-name').value.trim();
  const enemy = document.querySelector('#battle-enemy').value.trim();
  const troops = Number(document.querySelector('#battle-troops').value);
  const loss = Number(document.querySelector('#battle-loss').value);
  if (name === '' || enemy === '') {
    formTip.textContent = '战役名称与对阵势力不能为空';
    return;
  }
  if (Number.isNaN(troops) || troops < 0 || Number.isNaN(loss) || loss < 0) {
    formTip.textContent = '兵力需为非负数字';
    return;
  }
  const idValue = document.querySelector('#battle-id').value;
  const data = {
    name: name,
    chapter: document.querySelector('#battle-chapter').value,
    enemy: enemy,
    result: document.querySelector('#battle-result').value,
    troops: troops,
    loss: loss
  };
  if (idValue === '') {
    battles.push(Object.assign({ id: nextId }, data));
    nextId += 1;
  } else {
    const target = battles.find(item => item.id === Number(idValue));
    Object.assign(target, data);
  }
  resetForm();
  render();
});

render();
