/*
  Please note __stats__ is a global variable injected
  into workflow via the WebpackStatsPlugin under buid/guide/plugins/webpack.stats.plugin.js
*/

// Main method to get custom data struct out of webpack-stats object
const getFilteredData = (stats, filters) => {
  if (!stats) { return false; }

  const collection = [...stats.data];

  const atomicLevels = ['atoms', 'molecules', 'organisms', 'modifiers', 'templates', 'pages'];

  const returnedData = Object.keys(atomicLevels).map((i) => {
    const levels = {
      level: atomicLevels[i],
      size: 0,
      files: []
    };

    Object.keys(collection).map((j) => {
      const file = collection[j];
      if (
        file.name.indexOf(atomicLevels[i]) !== -1
        && file.name.indexOf('elements') !== -1
      ) {
        let k = filters.length;
        while (k--) {
          if (file.name.match(filters[k])) {
            levels.size += file.size;
            levels.files.push(file);
          }
        }
      }
      return true;
    });

    return levels;
  });

  return returnedData;
};

// Lets get font-face names

export const GuideMetrics = (el) => {
  const ui = {
    el,
    chart: el.querySelector('#chart'),
    JSAssetList: el.querySelector('.guide__welcome__assets-list.js'),
    CSSAssetList: el.querySelector('.guide__welcome__assets-list.css'),
    JSAtomicList: el.querySelector('.atomic-js'),
    CSSAtomicList: el.querySelector('.atomic-css'),
    cards: {
      all: el.querySelectorAll('.tabs__trigger'),
      jsSize: el.querySelector('.js-size'),
      cssSize: el.querySelector('.css-size'),
      totalJsx: el.querySelector('.total-elements'),
      totalCSS: el.querySelector('.total-css'),
      totalBuilds: el.querySelector('.total-builds'),
      totalErrors: el.querySelector('.total-errors')
    },
    charts: {
      JSChart: el.querySelector('#js-chart'),
      CSSChart: el.querySelector('#css-chart'),
      TotalJSXChart: el.querySelector('#total-jsx'),
      TotalCSSChart: el.querySelector('#total-css')
    }
  };

  // Method to use our custom data struct and render a doughnut chart from chart.js module
  const renderDoughnutChart = (element, data, title) => {
    if (!data) { return; }
    // abstract our data struct into custom struct for charts.js
    const collection = {
      datasets: []
    };

    const atomicSet = {
      labels: [],
      data: [],
      backgroundColor: []
    };

    const fileSet = {
      labels: [],
      data: [],
      backgroundColor: []
    };

    for (let i = 0; i < data.length; i++) {
      atomicSet.labels.push(data[i].level);
      atomicSet.data.push(data[i].size);

      atomicSet.backgroundColor.push();

      if (data[i].level.indexOf('atoms') !== -1) {
        atomicSet.backgroundColor.push('#ff8080');
      }

      if (data[i].level.indexOf('molecules') !== -1) {
        atomicSet.backgroundColor.push('#68b2fe');
      }

      if (data[i].level.indexOf('organisms') !== -1) {
        atomicSet.backgroundColor.push('#70ff8e');
      }

      if (data[i].level.indexOf('modifiers') !== -1) {
        atomicSet.backgroundColor.push('#feab62');
      }

      if (data[i].level.indexOf('templates') !== -1) {
        atomicSet.backgroundColor.push('#bbbbbb');
      }

      if (data[i].level.indexOf('variable') !== -1) {
        atomicSet.backgroundColor.push('#00cdbc');
      }

      for (let j = 0; j < data[i].files.length; j++) {
        const file = data[i].files[j];
        fileSet.labels.push(file.name.split('/')[file.name.split('/').length - 1]);
        fileSet.data.push(file.size);

        if (file.name.indexOf('.js') !== -1) {
          fileSet.backgroundColor.push('#f1e05a');
        }

        if (file.name.indexOf('.css') !== -1) {
          fileSet.backgroundColor.push('#563d7c');
        }
      }
    }

    collection.datasets.push(atomicSet);
    collection.datasets.push(fileSet);

    new Chart(element, { // eslint-disable-line
      type: 'doughnut',
      data: collection,
      options: {
        aspectRatio: 1,
        animation: {
          animateScale: true,
          animateRotate: true
        },
        title: {
          display: true,
          text: title,
          fontSize: 24,
          position: 'bottom',
          padding: 24
        },
        tooltips: {
          callbacks: {
            label: (tip, tipData) => ` ${tipData.datasets[tip.datasetIndex].labels[tip.index]} / ${GuideUtils.bytesToSize(tipData.datasets[tip.datasetIndex].data[tip.index])}`
          }
        }
      }
    });
  };

  // Method to use our custom data struct and render a list of items based on atomic levels
  const createAtomicList = (target, data, callback) => {
    if (!data || !target) { return; }

    let j = data.length;
    const fragment = document.createDocumentFragment();
    while (j--) {
      const atomicLevel = data[j];
      if (atomicLevel.files.length) {
        const card = document.createElement('div');
        card.setAttribute('class', 'card card--color-white card--default');

        const cardBody = document.createElement('div');
        cardBody.setAttribute('class', 'card__body card__body--default');

        const cardHeader = document.createElement('div');
        cardHeader.setAttribute('class', 'card__header card__header--default');

        const heading = document.createElement('h3');
        heading.setAttribute('class', 'heading heading--h3');
        heading.innerHTML = `${atomicLevel.level} - ${GuideUtils.bytesToSize(atomicLevel.size)}`;

        const list = document.createElement('ul');
        list.setAttribute('class', `list list--blank guide__welcome__assets-list total-${atomicLevel.level}`);

        let k = atomicLevel.files.length;

        while (k--) {
          const files = atomicLevel.files[k];
          const listItem = document.createElement('li');
          listItem.setAttribute('class', 'list__item list__item--default');
          listItem.innerHTML = `${files.name} / ${GuideUtils.bytesToSize(files.size)}`;

          list.appendChild(listItem);
        }
        cardHeader.appendChild(heading);
        cardBody.appendChild(list);
        card.appendChild(cardHeader);
        card.appendChild(cardBody);
        fragment.appendChild(card);
      }
    }

    target.appendChild(fragment);

    if (typeof callback === 'function') {
      callback(data);
    }
  };

  // Method to calculate the total size of assets (.css, .js, .jsx etc) across all atomic levels.
  const getAssetsTotal = (data, title) => {
    let size = 0;
    let i = data.length;
    while (i--) {
      size += data[i].size;
    }
    return `<span>${title}</span> <strong>${GuideUtils.bytesToSize(size)}</strong>`;
  };

  const init = () => {
    // Install JS Size card
    ui.cards.jsSize.innerHTML = getAssetsTotal(getFilteredData(__stats__, ['/*.js$']), 'JS Size:');
    createAtomicList(ui.JSAtomicList, getFilteredData(__stats__, ['/*.js$']));
    renderDoughnutChart(ui.charts.JSChart, getFilteredData(__stats__, ['/*.js$']), 'Project JS (files and atomic levels)');

    // Install CSS Size card
    ui.cards.cssSize.innerHTML = getAssetsTotal(getFilteredData(__stats__, ['/*.css']), 'CSS Size:');
    createAtomicList(ui.CSSAtomicList, getFilteredData(__stats__, ['/*.css']));
    renderDoughnutChart(ui.charts.CSSChart, getFilteredData(__stats__, ['/*.css']), 'Project CSS (files and atomic levels)');
    if (process.env.NODE_ENV === 'development') {
      // Install Total Builds card
      ui.cards.totalBuilds.innerHTML = `<span>Build Counts / Time</span> <strong>${__stats__.builds.count} / <small>${__stats__.builds.time}ms</small></strong>`;

      // Install Total Errors card
      ui.cards.totalErrors.innerHTML = `<span>Build Fails</span> <strong>${__stats__.builds.errors}</strong>`;
    }
  };

  init();
};

export default GuideMetrics;
