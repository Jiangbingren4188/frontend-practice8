const rooms = [
  { name: 'A101 自习室', floor: '一楼', status: '开放', seats: 120 },
  { name: 'A102 自习室', floor: '一楼', status: '已满', seats: 60 },
  { name: 'B201 自习室', floor: '二楼', status: '开放', seats: 150 },
  { name: 'B202 自习室', floor: '二楼', status: '关闭', seats: 80 },
  { name: 'C301 自习室', floor: '三楼', status: '开放', seats: 100 },
  { name: 'C302 自习室', floor: '三楼', status: '已满', seats: 45 }
];

const floorFilter = document.querySelector('#floor-filter');
const statusFilter = document.querySelector('#status-filter');
const list = document.querySelector('#room-list');
const emptyTip = document.querySelector('#empty-tip');
const state = { floor: 'all', status: 'all' };

const render = () => {
  list.innerHTML = '';
  const shown = rooms.filter(r =>
    (state.floor === 'all' || r.floor === state.floor) &&
    (state.status === 'all' || r.status === state.status)
  );
  emptyTip.hidden = shown.length > 0;
  shown.forEach(room => {
    const col = document.createElement('div');
    col.className = 'col-md-4';
    const card = document.createElement('div');
    card.className = 'card h-100';
    const body = document.createElement('div');
    body.className = 'card-body';
    const title = document.createElement('h5');
    title.className = 'card-title';
    title.textContent = room.name;
    const text = document.createElement('p');
    text.className = 'card-text';
    text.textContent = room.floor + ' · 座位 ' + room.seats + ' 个';
    const badge = document.createElement('span');
    badge.className = 'badge ' + (room.status === '开放'
      ? 'bg-success'
      : room.status === '已满' ? 'bg-warning text-dark' : 'bg-secondary');
    badge.textContent = room.status;
    body.append(title, text, badge);
    card.appendChild(body);
    col.appendChild(card);
    list.appendChild(col);
  });
};

floorFilter.addEventListener('change', () => {
  state.floor = floorFilter.value;
  render();
});

statusFilter.addEventListener('change', () => {
  state.status = statusFilter.value;
  render();
});

render();
