const latestEl = document.querySelector('#latest-battles');
const statusEl = document.querySelector('#home-status');

const renderLatest = (battles) => {
  latestEl.innerHTML = '';
  if (battles.length === 0) {
    const p = document.createElement('p');
    p.className = 'text-muted';
    p.textContent = '暂无战报，去战报页录入第一场战役。';
    latestEl.appendChild(p);
    return;
  }
  const latest = [...battles].sort((a, b) => b.id - a.id).slice(0, 3);
  latest.forEach(b => {
    const col = document.createElement('div');
    col.className = 'col-md-4';
    const card = document.createElement('div');
    card.className = 'card h-100';
    const body = document.createElement('div');
    body.className = 'card-body';
    const title = document.createElement('h3');
    title.className = 'card-title h6';
    title.textContent = b.name;
    const meta = document.createElement('p');
    meta.className = 'card-text small text-muted';
    meta.textContent = b.chapter + ' · 对阵 ' + b.enemy;
    const badge = document.createElement('span');
    badge.className = 'badge ' + (b.result === '胜利' ? 'bg-success' : 'bg-danger');
    badge.textContent = b.result;
    body.append(title, meta, badge);
    card.appendChild(body);
    col.appendChild(card);
    latestEl.appendChild(col);
  });
};

const init = async () => {
  statusEl.hidden = false;
  statusEl.textContent = '战报数据加载中...';
  try {
    const battles = await DATASET.load();
    statusEl.hidden = true;
    renderLatest(battles);
  } catch (error) {
    statusEl.textContent = '战报数据加载失败：' + error.message;
  }
};

init();
