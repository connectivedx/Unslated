export const GuideStylist = (el) => {
  const ui = {
    el,
    pageExamples: document.querySelectorAll('.examples'),
    minMax: el.querySelector('.guide__stylist-minmax'),
    examples: el.querySelector('.guide__stylist-examples'),
    examplesNative: el.querySelector('.guide__stylist-examples .field__native'),
    breakpoints: el.querySelector('.guide__stylist-breakpoint-size'),
    breakpointsNative: el.querySelector('.guide__stylist-breakpoint-size .field__native'),
    breakpointSpeeds: el.querySelector('.guide__stylist-breakpoint-speed'),
    breakpointSpeedsNative: el.querySelector('.guide__stylist-breakpoint-speed .field__native'),
    jsStats: el.querySelector('.guide__stylist-js-stat'),
    cssStats: el.querySelector('.guide__stylist-css-stat')
  };

  const state = {};

  // Switch between examples with stylist
  const switchExamples = (selection) => {
    Object.keys(ui.pageExamples).map((key, index) => {
      if (ui.examplesNative.options[ui.examplesNative.selectedIndex].value === '0') {
        ui.pageExamples[index].classList.remove('hide');
        state.currentExample = 'all';
      } else {
        ui.pageExamples[index].classList.add('hide');
        if (selection === parseInt(index + 1, 10)) {
          state.currentExample = ui.pageExamples[(parseInt(selection, 10) - 1)];
          ui.pageExamples[(parseInt(selection, 10) - 1)].classList.remove('hide');
        }
      }

      return true;
    });
  };

  // Switch between minimized and maximized stylist window
  const switchStylistMinMax = () => {
    if (ui.el.classList.contains('open')) {
      ui.el.classList.remove('open');
    } else {
      ui.el.classList.add('open');
    }
  };

  // Switch between breakpoint sizes for all examples
  const switchBreakpointSizes = (selection) => {
    Object.keys(ui.pageExamples).map((key, index) => {
      const pallet = ui.pageExamples[index].querySelector('.examples__pallet');
      pallet.style.width = [pallet.offsetWidth, 'px'].join('');
      pallet.style.width = (selection !== 'none') ? selection : '100%';
      return true;
    });
  };

  // Switch between breakpoint speeds for all examples
  const switchBreakpointSpeeds = (selection) => {
    Object.keys(ui.pageExamples).map((key, index) => {
      const pallet = ui.pageExamples[index].querySelector('.examples__pallet');
      const styles = window.getComputedStyle(pallet);

      pallet.setAttribute(
        'style',
        [
          'width: ',
          (pallet.style.width) ? pallet.style.width : '100%',
          '; --speed:',
          selection,
          '; --padding:',
          styles.getPropertyValue('--padding'),
          '; --brightness:',
          styles.getPropertyValue('--brightness'),
          '; --background: ',
          styles.getPropertyValue('--background'),
          ';'
        ].join('')
      );

      return true;
    });
  };

  // Filter build stats data
  const filterBuildStats = (stats) => {
    let i = stats.length;
    const collection = [];
    const elementName = window.location.href.split('/')[window.location.href.split('/').length - 1];
    while (i--) {
      if (stats[i].name.indexOf(elementName) !== -1) {
        collection.push(stats[i]);
      }
    }
    return collection;
  };

  const init = () => {
    // Sets up event for stylist minimize and maximize
    if (ui.minMax) {
      ui.minMax.addEventListener('click', () => {
        switchStylistMinMax();
      });
    }

    // Sets up event for stylist example change
    if (ui.examplesNative) {
      ui.examplesNative.addEventListener('change', () => {
        switchExamples(ui.examplesNative.selectedIndex);
      });
    }

    // Sets up event for stylist breakpoint change
    if (ui.breakpointsNative) {
      ui.breakpointsNative.addEventListener('change', () => {
        switchBreakpointSizes(ui.breakpointsNative.options[ui.breakpointsNative.selectedIndex].value);
      });
    }

    // Sets up event for stylist breakpoint debug speed change
    if (ui.breakpointSpeedsNative) {
      ui.breakpointSpeedsNative.addEventListener('change', () => {
        switchBreakpointSpeeds(ui.breakpointSpeedsNative.options[ui.breakpointSpeedsNative.selectedIndex].value);
      });
    }


    const stats = filterBuildStats(__stats__.chunks.modules); // eslint-disable-line
    let i = stats.length;

    while (i--) {
      const isJS = (stats[i].name.indexOf('.js') !== -1);
      const isCSS = (stats[i].name.indexOf('.css') !== -1);

      if (ui.jsStats && isJS) {
        ui.jsStats.innerHTML = ['<strong>JS</strong>: ', GuideUtils.bytesToSize(stats[i].size)].join('');
      }

      if (ui.cssStats && isCSS) {
        ui.cssStats.innerHTML = ['<strong>CSS</strong>: ', GuideUtils.bytesToSize(stats[i].size)].join('');
      }
    }
  };

  init();
};

export default GuideStylist;
