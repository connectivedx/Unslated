/*
  Please note __stats__ is a global variable injected
  into workflow via the WebpackStatsPlugin under buid/guide/plugins/webpack.stats.plugin.js
*/

// Main method to get custom data struct out of webpack-stats object
const getFilteredData = (stats, filters) => {
  const collection = [...stats.files];

  const atomicLevels = ['atoms', 'molecules', 'organisms', 'modifiers', 'templates', 'pages'];
  const returnedData = [];

  Object.keys(atomicLevels).map((i) => {
    const levels = {
      level: atomicLevels[i],
      size: 0,
      files: {}
    };

    Object.keys(collection).map((j) => {
      const file = collection[j];
      if (
        file.name.indexOf(atomicLevels[i]) !== -1
        && file.name.indexOf('elements') !== -1
        && !levels.files[file.name]
      ) {
        let k = filters.length;
        while (k--) {
          if (file.name.match(filters[k])) {
            levels.size += file.size;
            if (!levels.files[file.name]) {
              levels.files[file.name] = file.size;
            }
          }
        }
      }
      return true;
    });

    returnedData.push(levels);
    return true;
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
    MediaAssetList: el.querySelector('.guide__welcome__assets-list.media'),
    JSAtomicList: el.querySelector('.atomic-js'),
    CSSAtomicList: el.querySelector('.atomic-css'),
    MediaAtomicList: el.querySelector('.atomic-media'),
    cards: {
      all: el.querySelectorAll('.tabs__trigger'),
      jsSize: el.querySelector('.js-size'),
      cssSize: el.querySelector('.css-size'),
      mediaSize: el.querySelector('.media-size'),
      totalJsx: el.querySelector('.total-elements'),
      totalCSS: el.querySelector('.total-css'),
      totalMedia: el.querySelector('.total-media'),
      totalBuilds: el.querySelector('.total-builds'),
      totalErrors: el.querySelector('.total-errors')
    },
    charts: {
      JSChart: el.querySelector('#js-chart'),
      CSSChart: el.querySelector('#css-chart'),
      MediaChart: el.querySelector('#media-chart'),
      TotalJSXChart: el.querySelector('#total-jsx'),
      TotalCSSChart: el.querySelector('#total-css'),
      TotalMediaChart: el.querySelector('#total-media')
    },
    jsMetrics: {
      const: el.querySelector('.const'),
      lets: el.querySelector('.lets'),
      loops: el.querySelector('.loops'),
      for: el.querySelector('.for'),
      forIn: el.querySelector('.forIn'),
      forOf: el.querySelector('.forOf'),
      while: el.querySelector('.while'),
      object: el.querySelector('.object'),
      variables: el.querySelector('.variables'),
      methods: el.querySelector('.methods'),
      expressions: el.querySelector('.expressions'),
      functions: el.querySelector('.functions'),
      arrows: el.querySelector('.arrows'),
      calls: el.querySelector('.calls'),
      members: el.querySelector('.members'),
      assignments: el.querySelector('.assignments')
    },
    cssMetrics: {
      selectors: el.querySelector('.selectors'),
      declarations: el.querySelector('.declarations'),
      properties: el.querySelector('.properties'),
      ids: el.querySelector('.ids'),
      classes: el.querySelector('.classes'),
      pseudoClass: el.querySelector('.pseudo__class'),
      pseudoElement: el.querySelector('.pseudo__element'),
      display: el.querySelector('.display'),
      float: el.querySelector('.float'),
      width: el.querySelector('.width'),
      height: el.querySelector('.height'),
      minWidth: el.querySelector('.minWidth'),
      maxWidth: el.querySelector('.maxWidth'),
      minHeight: el.querySelector('.minHeight'),
      maxHeight: el.querySelector('.maxHeight'),
      color: el.querySelector('.color'),
      backgroundColor: el.querySelector('.backgroundColor'),
      borderColor: el.querySelector('.borderColor'),
      boxShadow: el.querySelector('.boxShadow'),
      family: el.querySelector('.family'),
      size: el.querySelector('.size'),
      weight: el.querySelector('.weight'),
      alignment: el.querySelector('.alignment'),
      lineHeight: el.querySelector('.lineHeight'),
      letterSpace: el.querySelector('.letterSpace'),
      decoration: el.querySelector('.decoration'),
      transform: el.querySelector('.transform'),
      shadow: el.querySelector('.shadow'),
      spacingPadding: el.querySelector('.spacing__padding'),
      spacingPaddingTop: el.querySelector('.spacing__padding-top'),
      spacingPaddingRight: el.querySelector('.spacing__padding-right'),
      spacingPaddingBottom: el.querySelector('.spacing__padding-bottom'),
      spacingPaddingLeft: el.querySelector('.spacing__padding-left'),
      spacingMargin: el.querySelector('.spacing__margin'),
      spacingMarginTop: el.querySelector('.spacing__margin-top'),
      spacingMarginRight: el.querySelector('.spacing__margin-right'),
      spacingMarginBottom: el.querySelector('.spacing__margin-bottom'),
      spacingMarginLeft: el.querySelector('.spacing__margin-left'),
      resetPadding: el.querySelector('.reset__padding'),
      resetPaddingTop: el.querySelector('.reset__padding-top'),
      resetPaddingRight: el.querySelector('.reset__padding-right'),
      resetPaddingBottom: el.querySelector('.reset__padding-bottom'),
      resetPaddingLeft: el.querySelector('.reset__padding-left'),
      resetMargin: el.querySelector('.reset__margin'),
      resetMarginTop: el.querySelector('.reset__margin-top'),
      resetMarginRight: el.querySelector('.reset__margin-right'),
      resetMarginBottom: el.querySelector('.reset__margin-bottom'),
      resetMarginLeft: el.querySelector('.reset__margin-left'),
      compDisplay: el.querySelector('.comp__display'),
      compFloat: el.querySelector('.comp__float'),
      compWidth: el.querySelector('.comp__width'),
      compHeight: el.querySelector('.comp__height'),
      compMaxWidth: el.querySelector('.comp__max-width'),
      compMinWidth: el.querySelector('.comp__min-width'),
      compMaxHeight: el.querySelector('.comp__max-height'),
      compMinHeight: el.querySelector('.comp__min-height'),
      compPadding: el.querySelector('.comp__padding'),
      compPaddingTop: el.querySelector('.comp__padding-top'),
      compPaddingRight: el.querySelector('.comp__padding-right'),
      compPaddingBottom: el.querySelector('.comp__padding-bottom'),
      compPaddingLeft: el.querySelector('.comp__padding-left'),
      compMargin: el.querySelector('.comp__margin'),
      compMarginTop: el.querySelector('.comp__margin-top'),
      compMarginRight: el.querySelector('.comp__margin-right'),
      compMarginBottom: el.querySelector('.comp__margin-bottom'),
      compMarginLeft: el.querySelector('.comp__margin-left')
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

      Object.keys(data[i].files).map((j) => {
        const file = data[i].files[j];
        fileSet.labels.push(j.split('/')[j.split('/').length - 1]);
        fileSet.data.push(file);

        if (j.indexOf('.js') !== -1) {
          fileSet.backgroundColor.push('#f1e05a');
        }

        if (j.indexOf('.css') !== -1) {
          fileSet.backgroundColor.push('#563d7c');
        }

        return true;
      });
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
    const fragment = document.createDocumentFragment();

    Object.keys(data).map((j) => {
      const atomicLevel = data[j];
      if (Object.keys(atomicLevel.files).length) {
        const card = document.createElement('div');
        card.setAttribute('class', 'guide__card guide__card--color-white guide__card--default');

        const cardBody = document.createElement('div');
        cardBody.setAttribute('class', 'guide__card__body guide__card__body--default');

        const cardHeader = document.createElement('div');
        cardHeader.setAttribute('class', 'guide__card__header guide__card__header--default');

        const heading = document.createElement('h3');
        heading.setAttribute('class', 'heading heading--h3');
        heading.innerHTML = `${atomicLevel.level} - ${GuideUtils.bytesToSize(atomicLevel.size)}`;

        const list = document.createElement('ul');
        list.setAttribute('class', `guide__list guide__list--blank guide__welcome__assets-list total-${atomicLevel.level}`);

        Object.keys(atomicLevel.files).map((k) => {
          const listItem = document.createElement('li');
          listItem.setAttribute('class', 'list__item list__item--default');
          listItem.innerHTML = `${k} / ${GuideUtils.bytesToSize(atomicLevel.files[k])}`;

          list.appendChild(listItem);

          return true;
        });

        cardHeader.appendChild(heading);
        cardBody.appendChild(list);
        card.appendChild(cardHeader);
        card.appendChild(cardBody);
        fragment.appendChild(card);
      }

      return true;
    });

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

    // Install Media Size card
    ui.cards.mediaSize.innerHTML = getAssetsTotal(getFilteredData(__stats__, ['/*.svg', '/*.jpg', '/*.png']), 'Media Size:');
    createAtomicList(ui.MediaAtomicList, getFilteredData(__stats__, ['/*.svg', '/*.jpg', '/*.png']));
    renderDoughnutChart(ui.charts.MediaChart, getFilteredData(__stats__, ['/*.svg', '/*.jpg', '/*.png']), 'Project Media (files and atomic levels)');

    if (process.env.NODE_ENV === 'development') {
      // Install Total Builds card
      // ui.cards.totalBuilds.innerHTML = `<span>Build Counts / Time</span> <strong>${__stats__.builds.count} / <small>${__stats__.builds.time}ms</small></strong>`;

      // Install Total Errors card
      // ui.cards.totalErrors.innerHTML = `<span>Build Fails</span> <strong>${__stats__.builds.errors}</strong>`;
    }

    // Install JS Metrics
    ui.jsMetrics.variables.innerHTML = `${__stats__.js.variables.all} <sup>/ variables</sup>`;
    ui.jsMetrics.loops.innerHTML = `${__stats__.js.loops.all} <sup>/ loops</sup>`;
    ui.jsMetrics.methods.innerHTML = `${__stats__.js.methods.all} <sup>/ functions</sup>`;
    ui.jsMetrics.expressions.innerHTML = `${__stats__.js.expressions.all} <sup>/ expressions</sup>`;

    ui.jsMetrics.const.innerHTML = `${__stats__.js.variables.const} <sup>/ const</sup>`;
    ui.jsMetrics.lets.innerHTML = `${__stats__.js.variables.lets} <sup>/ lets</sup>`;

    ui.jsMetrics.for.innerHTML = `${__stats__.js.loops.for} <sup>/ for() loops</sup>`;
    ui.jsMetrics.forIn.innerHTML = `${__stats__.js.loops.forIn} <sup>/ forIn() loops</sup>`;
    ui.jsMetrics.forOf.innerHTML = `${__stats__.js.loops.forOf} <sup>/ forOf() loops</sup>`;
    ui.jsMetrics.while.innerHTML = `${__stats__.js.loops.while} <sup>/ while() loops</sup>`;
    ui.jsMetrics.object.innerHTML = `${__stats__.js.loops.object} <sup>/ object.key() loops</sup>`;

    ui.jsMetrics.functions.innerHTML = `${__stats__.js.methods.functions} <sup>/ Functions()</sup>`;
    ui.jsMetrics.arrows.innerHTML = `${__stats__.js.methods.arrows} <sup>/ (Arrows) =></sup>`;

    ui.jsMetrics.calls.innerHTML = `${__stats__.js.expressions.calls} <sup>/ x() calls</sup>`;
    ui.jsMetrics.members.innerHTML = `${__stats__.js.expressions.members} <sup>/ x.y() members</sup>`;
    ui.jsMetrics.assignments.innerHTML = `${__stats__.js.expressions.assignments} <sup>/ x = y assignments</sup>`;

    // Install CSS Metrics
    ui.cssMetrics.selectors.innerHTML = `${__stats__.css.selectors} <sup>/ selectors</sup>`;
    ui.cssMetrics.declarations.innerHTML = `${__stats__.css.selectors} <sup>/ declarations</sup>`;
    ui.cssMetrics.declarations.innerHTML = `${__stats__.css.declarations} <sup>/ declarations</sup>`;
    ui.cssMetrics.properties.innerHTML = `${__stats__.css.properties} <sup>/ properties</sup>`;
    ui.cssMetrics.ids.innerHTML = `${__stats__.css.ids} <sup>/ ids</sup>`;
    ui.cssMetrics.classes.innerHTML = `${__stats__.css.classes} <sup>/ classes</sup>`;
    ui.cssMetrics.pseudoClass.innerHTML = `${__stats__.css.pseudo.class} <sup>/ pseudo class</sup>`;
    ui.cssMetrics.pseudoElement.innerHTML = `${__stats__.css.pseudo.element} <sup>/ pseudo element</sup>`;

    ui.cssMetrics.display.innerHTML = `${__stats__.css.layout.display} <sup>/ display</sup>`;
    ui.cssMetrics.float.innerHTML = `${__stats__.css.layout.float} <sup>/ float</sup>`;
    ui.cssMetrics.width.innerHTML = `${__stats__.css.layout.width} <sup>/ width</sup>`;
    ui.cssMetrics.height.innerHTML = `${__stats__.css.layout.height} <sup>/ height</sup>`;
    ui.cssMetrics.maxWidth.innerHTML = `${__stats__.css.layout.maxWidth} <sup>/ max-width</sup>`;
    ui.cssMetrics.minWidth.innerHTML = `${__stats__.css.layout.minWidth} <sup>/ min-width</sup>`;
    ui.cssMetrics.maxHeight.innerHTML = `${__stats__.css.layout.maxHeight} <sup>/ max-height</sup>`;
    ui.cssMetrics.minHeight.innerHTML = `${__stats__.css.layout.minHeight} <sup>/ min-height</sup>`;

    ui.cssMetrics.color.innerHTML = `${__stats__.css.skin.color} <sup>/ color</sup>`;
    ui.cssMetrics.backgroundColor.innerHTML = `${__stats__.css.skin.backgroundColor} <sup>/ background-color</sup>`;
    ui.cssMetrics.borderColor.innerHTML = `${__stats__.css.skin.borderColor} <sup>/ border-color</sup>`;
    ui.cssMetrics.boxShadow.innerHTML = `${__stats__.css.skin.boxShadow} <sup>/ box-shadow</sup>`;

    ui.cssMetrics.family.innerHTML = `${__stats__.css.typography.family} <sup>/ font-family</sup>`;
    ui.cssMetrics.size.innerHTML = `${__stats__.css.typography.size} <sup>/ font-size</sup>`;
    ui.cssMetrics.weight.innerHTML = `${__stats__.css.typography.weight} <sup>/ font-weight</sup>`;
    ui.cssMetrics.alignment.innerHTML = `${__stats__.css.typography.alignment} <sup>/ text-align</sup>`;
    ui.cssMetrics.lineHeight.innerHTML = `${__stats__.css.typography.lineHeight} <sup>/ line-height</sup>`;
    ui.cssMetrics.letterSpace.innerHTML = `${__stats__.css.typography.letterSpace} <sup>/ letter-spacing</sup>`;
    ui.cssMetrics.decoration.innerHTML = `${__stats__.css.typography.decoration} <sup>/ decoration</sup>`;
    ui.cssMetrics.transform.innerHTML = `${__stats__.css.typography.transform} <sup>/ transform</sup>`;
    ui.cssMetrics.shadow.innerHTML = `${__stats__.css.typography.shadow} <sup>/ shadow</sup>`;

    ui.cssMetrics.spacingPadding.innerHTML = `${__stats__.css.spacing.padding.all} <sup>/ padding</sup>`;
    ui.cssMetrics.spacingPaddingTop.innerHTML = `${__stats__.css.spacing.padding.top} <sup>/ padding-top</sup>`;
    ui.cssMetrics.spacingPaddingRight.innerHTML = `${__stats__.css.spacing.padding.right} <sup>/ padding-right</sup>`;
    ui.cssMetrics.spacingPaddingBottom.innerHTML = `${__stats__.css.spacing.padding.bottom} <sup>/ padding-bottom</sup>`;
    ui.cssMetrics.spacingPaddingLeft.innerHTML = `${__stats__.css.spacing.padding.left} <sup>/ padding-left</sup>`;

    ui.cssMetrics.spacingMargin.innerHTML = `${__stats__.css.spacing.margin.all} <sup>/ margin</sup>`;
    ui.cssMetrics.spacingMarginTop.innerHTML = `${__stats__.css.spacing.margin.top} <sup>/ margin-top</sup>`;
    ui.cssMetrics.spacingMarginRight.innerHTML = `${__stats__.css.spacing.margin.right} <sup>/ margin-right</sup>`;
    ui.cssMetrics.spacingMarginBottom.innerHTML = `${__stats__.css.spacing.margin.bottom} <sup>/ margin-bottom</sup>`;
    ui.cssMetrics.spacingMarginLeft.innerHTML = `${__stats__.css.spacing.margin.left} <sup>/ margin-left</sup>`;

    ui.cssMetrics.resetPadding.innerHTML = `${__stats__.css.resets.padding.all} <sup>/ padding</sup>`;
    ui.cssMetrics.resetPaddingTop.innerHTML = `${__stats__.css.resets.padding.top} <sup>/ padding-top</sup>`;
    ui.cssMetrics.resetPaddingRight.innerHTML = `${__stats__.css.resets.padding.right} <sup>/ padding-right</sup>`;
    ui.cssMetrics.resetPaddingBottom.innerHTML = `${__stats__.css.resets.padding.bottom} <sup>/ padding-bottom</sup>`;
    ui.cssMetrics.resetPaddingLeft.innerHTML = `${__stats__.css.resets.padding.left} <sup>/ padding-left</sup>`;

    ui.cssMetrics.resetMargin.innerHTML = `${__stats__.css.resets.margin.all} <sup>/ margin</sup>`;
    ui.cssMetrics.resetMarginTop.innerHTML = `${__stats__.css.resets.margin.top} <sup>/ margin-top</sup>`;
    ui.cssMetrics.resetMarginRight.innerHTML = `${__stats__.css.resets.margin.right} <sup>/ margin-right</sup>`;
    ui.cssMetrics.resetMarginBottom.innerHTML = `${__stats__.css.resets.margin.bottom} <sup>/ margin-bottom</sup>`;
    ui.cssMetrics.resetMarginLeft.innerHTML = `${__stats__.css.resets.margin.left} <sup>/ margin-left</sup>`;

    ui.cssMetrics.compDisplay.innerHTML = `Display <br /><sup>${__stats__.css.comparison.layout.display.unique} Unique ${__stats__.css.comparison.layout.display.repeated} Repeated</sup>`;
    ui.cssMetrics.compFloat.innerHTML = `Float <br /><sup>${__stats__.css.comparison.layout.float.unique} Unique ${__stats__.css.comparison.layout.float.repeated} Repeated</sup>`;
    ui.cssMetrics.compWidth.innerHTML = `Width <br /><sup>${__stats__.css.comparison.layout.width.unique} Unique ${__stats__.css.comparison.layout.width.repeated} Repeated</sup>`;
    ui.cssMetrics.compHeight.innerHTML = `Height <br /><sup>${__stats__.css.comparison.layout.height.unique} Unique ${__stats__.css.comparison.layout.height.repeated} Repeated</sup>`;
    ui.cssMetrics.compMinWidth.innerHTML = `Min-width <br /><sup>${__stats__.css.comparison.layout.minWidth.unique} Unique ${__stats__.css.comparison.layout.minWidth.repeated} Repeated</sup>`;
    ui.cssMetrics.compMaxWidth.innerHTML = `Max-width <br /><sup>${__stats__.css.comparison.layout.maxWidth.unique} Unique ${__stats__.css.comparison.layout.maxWidth.repeated} Repeated</sup>`;
    ui.cssMetrics.compMinHeight.innerHTML = `Min-height <br /><sup>${__stats__.css.comparison.layout.minHeight.unique} Unique ${__stats__.css.comparison.layout.minHeight.repeated} Repeated</sup>`;
    ui.cssMetrics.compMaxHeight.innerHTML = `Max-height <br /><sup>${__stats__.css.comparison.layout.maxHeight.unique} Unique ${__stats__.css.comparison.layout.maxHeight.repeated} Repeated</sup>`;

    ui.cssMetrics.compPadding.innerHTML = `Padding <br /><sup>${__stats__.css.comparison.padding.all.unique} Unique ${__stats__.css.comparison.padding.all.repeated} Repeated</sup>`;
    ui.cssMetrics.compPaddingTop.innerHTML = `Padding-top <br /><sup>${__stats__.css.comparison.padding.top.unique} Unique ${__stats__.css.comparison.padding.top.repeated} Repeated</sup>`;
    ui.cssMetrics.compPaddingRight.innerHTML = `Padding-right <br /><sup>${__stats__.css.comparison.padding.right.unique} Unique ${__stats__.css.comparison.padding.right.repeated} Repeated</sup>`;
    ui.cssMetrics.compPaddingBottom.innerHTML = `Padding-bottom <br /><sup>${__stats__.css.comparison.padding.bottom.unique} Unique ${__stats__.css.comparison.padding.bottom.repeated} Repeated</sup>`;
    ui.cssMetrics.compPaddingLeft.innerHTML = `Padding-left <br /><sup>${__stats__.css.comparison.padding.left.unique} Unique ${__stats__.css.comparison.padding.left.repeated} Repeated</sup>`;

    ui.cssMetrics.compMargin.innerHTML = `Margin <br /><sup>${__stats__.css.comparison.margin.all.unique} Unique ${__stats__.css.comparison.margin.all.repeated} Repeated</sup>`;
    ui.cssMetrics.compMarginTop.innerHTML = `Margin-top <br/><sup>${__stats__.css.comparison.margin.top.unique} Unique ${__stats__.css.comparison.margin.top.repeated} Repeated</sup>`;
    ui.cssMetrics.compMarginRight.innerHTML = `Margin-right <br/><sup>${__stats__.css.comparison.margin.right.unique} Unique ${__stats__.css.comparison.margin.right.repeated} Repeated</sup>`;
    ui.cssMetrics.compMarginBottom.innerHTML = `Margin-bottom <br /><sup>${__stats__.css.comparison.margin.bottom.unique} Unique ${__stats__.css.comparison.margin.bottom.repeated} Repeated</sup>`;
    ui.cssMetrics.compMarginLeft.innerHTML = `Margin-left <br /><sup>${__stats__.css.comparison.margin.left.unique} Unique ${__stats__.css.comparison.margin.left.repeated} Repeated</sup>`;
  };

  init();
};

export default GuideMetrics;
