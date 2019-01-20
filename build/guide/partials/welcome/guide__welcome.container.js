const Chart = require('chart.js');

// Helper method to get random gray scale color
const getRandomGray = () => {
  let value = Math.random() * 0xFF | 0;
  let grayscale = (value << 16) | (value << 8) | value;
  return '#' + grayscale.toString(16);
};

// Little helper method to convert raw int into bytes, kb or kb for display.
const bytesToSize = (bytes) => {
   const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
   if (bytes == 0) return '0 Byte';
   let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
   return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
};

// Main method to get custom data struct out of webpack-stats object
const getFilteredData = (data, filters) => {
  if (!data) { return; }

  const filterData = (data) => {
    if (!data.name) { return; }
    if (data.name.indexOf('elements') !== -1) {

    }
  };

  const collection = [
    ...data.assets,
    ...data.chunks[0].modules,
    ...data.chunks[1].modules
  ];

  const atomicLevels = ['atoms', 'molecules', 'organisms', 'modifiers', 'templates', 'pages'];
  const returnedData = Object.keys(atomicLevels).map((i) => {
    let data = {
      level: atomicLevels[i],
      size: 0,
      files: []
    };

    Object.keys(collection).map((j) => {
      const file = collection[j];
      if (!file.name) { return; }
      if (file.name.indexOf(atomicLevels[i]) !== -1 && file.name.indexOf('/elements/') !== -1) {
      let j = filters.length;
        while (j--) {
          if (file.name.match(filters[j])) {
            data.size += file.size;
            data.files.push(file);
          }
        } 
      }
    });

    return data;
  });

  return returnedData;
};

export const GuideWelcome = (el) => {
  // UI element references.
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

  // Method to fetch our webpack-stats JSON file at page load via XHR.
  const getPerformanceStats = (callback) => {
    const XHR = new XMLHttpRequest();
    XHR.onreadystatechange = () => {
      if (XHR.readyState == 4 && XHR.status == 200) {
       if (typeof callback === 'function') {
         callback(JSON.parse(XHR.responseText));
       }
      }
    };
    XHR.open("get", "./node_modules/.bin/webpack.stats.json", true);
    XHR.send();
  }

  // Method to use our custom data struct and render a doughnut chart from chart.js module
  const renderDoughnutChart = (element, data, title) => {
    if (!data) { return; }

    // abstract our data struct into custom struct for charts.js
    const collection = {
      datasets: []
    };

    const atomicSet = {
      labels:[],
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
      atomicSet.backgroundColor.push(getRandomGray());
      for (let j = 0; j < data[i].files.length; j++) {
        const file = data[i].files[j];
        fileSet.labels.push(file.name.split('/')[file.name.split('/').length - 1]);
        fileSet.data.push(file.size);
        fileSet.backgroundColor.push(getRandomGray());
      }      
    }

    collection.datasets.push(atomicSet);
    collection.datasets.push(fileSet);

    new Chart(element, {
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
            label: (tip, tipData) => {
              return ` ${tipData.datasets[tip.datasetIndex].labels[tip.index]} / ${bytesToSize(tipData.datasets[tip.datasetIndex].data[tip.index])}`;
            }
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
        
        const heading = document.createElement('h3');
        heading.setAttribute('class', 'heading h3--heading');
        heading.innerHTML = `${atomicLevel.level} - ${bytesToSize(atomicLevel.size)}`;

        const list = document.createElement('ul');
        list.setAttribute('class', `list list--blank guide__welcome__assets-list total-${atomicLevel.level}`);

        let k = atomicLevel.files.length;

        while(k--) {
          const files = atomicLevel.files[k];
          const listItem = document.createElement('li');
          listItem.setAttribute('class', 'list__item list__item--default');
          listItem.innerHTML = `${files.name} / ${bytesToSize(files.size)}`;
          
          list.appendChild(listItem);
        }
        cardBody.appendChild(heading);
        cardBody.appendChild(list);
        card.appendChild(cardBody);
        fragment.appendChild(card);
      }
    }

    target.appendChild(fragment);

    if (typeof callback === 'function') {
      callback(atomicData);
    }
  }

  // Method to calculate the total size of assets (.css, .js, .jsx etc) across all atomic levels.
  const getAssetsTotal = (data, title) => {
    let size = 0;
    let i = data.length;
    while (i--) {
      size += data[i].size;
    }
    return `<span>${title}</span> <strong>${bytesToSize(size)}</strong>`;
  };

  // Our main install point
  const init = () => {
    // Start by getting webpack-stats JSON file data
    // We use XHR to get this data instaed of a direct import to avoid endless build looping.
    getPerformanceStats((JSON) => {

      // Install JS Size card
      ui.cards.jsSize.innerHTML = getAssetsTotal(getFilteredData(JSON, ['/*.js$']), 'JS Size:');
      createAtomicList(ui.JSAtomicList, getFilteredData(JSON, ['/*.js$']));
      renderDoughnutChart(ui.charts.JSChart, getFilteredData(JSON, ['/*.js$']), 'Project JS (files and atomic levels)');
      
      // Install CSS Size card
      ui.cards.cssSize.innerHTML = getAssetsTotal(getFilteredData(JSON, ['/*.css']), 'CSS Size:');
      createAtomicList(ui.CSSAtomicList, getFilteredData(JSON, ['/*.css']));
      renderDoughnutChart(ui.charts.CSSChart, getFilteredData(JSON, ['/*.css']), 'Project CSS (files and atomic levels)');
      
      // Install Total Builds card
      ui.cards.totalBuilds.innerHTML = `<span>Build Counts / Time</span> <strong>${JSON.builds.count} / <small>${JSON.builds.time}ms</small></strong>`;
      
      // Install Total Errors card
      ui.cards.totalErrors.innerHTML = `<span>Build Fails</span> <strong>${JSON.builds.errors}</strong>`;  
    });
  };

  init();
};

export default GuideWelcome;