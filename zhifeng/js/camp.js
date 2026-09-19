const campCount = document.querySelector('#camp-count');
const campNote = document.querySelector('#camp-note');

const init = async () => {
  try {
    const battles = await DATASET.load();
    campCount.setAttribute('value', '织丰大营 · 已记录战役 ' + battles.length + ' 场');
  } catch (error) {
    campNote.textContent = '战报数据加载失败，营地仅静态展示。';
  }
};

init();
