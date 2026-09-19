const statusEl = document.querySelector('#stats-status');
let barChart = null;
let pieChart = null;

const renderCharts = (battles) => {
  if (battles.length === 0) {
    statusEl.hidden = false;
    statusEl.textContent = '暂无数据';
    return;
  }
  statusEl.hidden = true;
  if (barChart === null) {
    barChart = echarts.init(document.querySelector('#bar-chart'));
  }
  if (pieChart === null) {
    pieChart = echarts.init(document.querySelector('#pie-chart'));
  }
  barChart.setOption({
    title: { text: '各战役兵力投入与损失', left: 'center' },
    tooltip: { trigger: 'axis' },
    legend: { bottom: 0 },
    xAxis: {
      data: battles.map(b => b.name),
      axisLabel: { rotate: 30 }
    },
    yAxis: { name: '人' },
    series: [
      { name: '投入兵力', type: 'bar', data: battles.map(b => b.troops) },
      { name: '损失兵力', type: 'bar', data: battles.map(b => b.loss) }
    ]
  });
  const wins = battles.filter(b => b.result === '胜利').length;
  const losses = battles.length - wins;
  pieChart.setOption({
    title: { text: '胜负场次分布', left: 'center' },
    tooltip: { trigger: 'item' },
    legend: { bottom: 0 },
    series: [{
      name: '场次',
      type: 'pie',
      radius: '55%',
      data: [
        { name: '胜利', value: wins },
        { name: '失败', value: losses }
      ]
    }]
  });
};

const init = async () => {
  statusEl.hidden = false;
  statusEl.textContent = '数据加载中...';
  try {
    const battles = await DATASET.load();
    renderCharts(battles);
  } catch (error) {
    statusEl.textContent = '数据加载失败：' + error.message;
  }
};

window.addEventListener('resize', () => {
  if (barChart) barChart.resize();
  if (pieChart) pieChart.resize();
});

init();
