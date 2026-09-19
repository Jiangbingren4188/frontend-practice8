const status = document.querySelector('#status');
const source = document.querySelector('#source');
let barChart = null;

const renderBarChart = (data) => {
  if (barChart === null) {
    barChart = echarts.init(document.querySelector('#bar-chart'));
  }
  barChart.setOption({
    title: { text: data.title, left: 'center' },
    tooltip: { trigger: 'axis' },
    xAxis: { data: data.rooms.map(r => r.name) },
    yAxis: { name: data.unit },
    series: [{
      name: data.unit,
      type: 'bar',
      data: data.rooms.map(r => r.usage)
    }]
  });
};

const loadData = async () => {
  status.hidden = false;
  status.textContent = '加载中...';
  try {
    const response = await fetch('data.json');
    if (!response.ok) {
      throw new Error('HTTP ' + response.status);
    }
    const data = await response.json();
    if (data.rooms.length === 0) {
      status.textContent = '暂无数据';
      return;
    }
    status.hidden = true;
    source.textContent = data.source;
    renderBarChart(data);
  } catch (error) {
    status.textContent = '加载失败：' + error.message;
  }
};

window.addEventListener('resize', () => {
  if (barChart) barChart.resize();
});

loadData();
