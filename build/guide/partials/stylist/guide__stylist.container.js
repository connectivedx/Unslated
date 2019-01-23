export const GuideStylist = (el) => {
  const ui = {
    el,
    examples: document.querySelectorAll('.examples'),
    stylist: document.querySelector('.guide__stylist'),
    stylistMinMax: document.querySelector('.guide__stylist-minmax'),
    stylistExampleSelect: document.querySelector('.guide__stylist-examples'),
    stylistBreakpointSelect: document.querySelector('.guide__stylist-breakpoint-size'),
    stylistBreakpointSpeed: document.querySelector('.guide__stylist-breakpoint-speed'),
    stylistJSStat: el.querySelector('.guide__stylist-js-stat'),
    stylistCSSStat: el.querySelector('.guide__stylist-css-stat')
  };

  const state = {};

  // Switch between examples with stylist
  const switchExamples = (selection) => {
    Object.keys(ui.examples).map((key, index) => {
      if (ui.stylistExampleSelect.options[ui.stylistExampleSelect.selectedIndex].value === '0') {
        ui.examples[index].classList.remove('hide');
        state.currentExample = 'all';
      } else {
        ui.examples[index].classList.add('hide');
        if (selection === parseInt(index + 1, 10)) {
          state.currentExample = ui.examples[(parseInt(selection, 10) - 1)];
          ui.examples[(parseInt(selection, 10) - 1)].classList.remove('hide');
        }
      }

      return true;
    });
  };

  // Switch between minimized and maximized stylist window
  const switchStylistMinMax = () => {
    if (ui.stylist.classList.contains('open')) {
      ui.stylist.classList.remove('open');
    } else {
      ui.stylist.classList.add('open');
    }
  };

  // Switch between breakpoint sizes for all examples
  const switchBreakpointSizes = (selection) => {
    Object.keys(ui.examples).map((key, index) => {
      const pallet = ui.examples[index].querySelector('.examples__pallet');
      pallet.style.width = [pallet.offsetWidth, 'px'].join('');
      pallet.style.width = (selection !== 'none') ? selection : '100%';
      return true;
    });
  };

  // Switch between breakpoint speeds for all examples
  const switchBreakpointSpeeds = (selection) => {
    Object.keys(ui.examples).map((key, index) => {
      const pallet = ui.examples[index].querySelector('.examples__pallet');
      const width = (pallet.style.width) ? pallet.style.width : '100%';
      const styles = window.getComputedStyle(pallet);
      const brightness = styles.getPropertyValue('--brightness');
      const background = styles.getPropertyValue('--background');
      const padding = styles.getPropertyValue('--padding');

      pallet.setAttribute('style', ['width: ', width, '; --speed:', selection, '; --padding:', padding, '; --brightness:', brightness, '; --background: ', background, ';'].join(''));
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
    if (ui.stylistMinMax) {
      ui.stylistMinMax.addEventListener('click', () => {
        switchStylistMinMax();
      });
    }

    // Sets up event for stylist example change
    if (ui.stylistExampleSelect) {
      ui.stylistExampleSelect.addEventListener('change', () => {
        switchExamples(ui.stylistExampleSelect.selectedIndex);
      });
    }

    // Sets up event for stylist breakpoint change
    if (ui.stylistBreakpointSelect) {
      ui.stylistBreakpointSelect.addEventListener('change', () => {
        switchBreakpointSizes(ui.stylistBreakpointSelect.options[ui.stylistBreakpointSelect.selectedIndex].value);
      });
    }

    // Sets up event for stylist breakpoint debug speed change
    if (ui.stylistBreakpointSpeed) {
      ui.stylistBreakpointSpeed.addEventListener('change', () => {
        switchBreakpointSpeeds(ui.stylistBreakpointSpeed.options[ui.stylistBreakpointSpeed.selectedIndex].value);
      });
    }

    GuideUtils.getBuildStats((JSON) => {
      const stats = filterBuildStats(JSON.chunks[0].modules);
      let i = stats.length;

      while (i--) {
        const isJS = (stats[i].name.indexOf('.js') !== -1);
        const isCSS = (stats[i].name.indexOf('.css') !== -1);

        if (ui.stylistJSStat && isJS) {
          ui.stylistJSStat.innerHTML = ['<strong>JS</strong>: ', GuideUtils.bytesToSize(stats[i].size)].join('');
        }

        if (ui.stylistCSSStat && isCSS) {
          ui.stylistCSSStat.innerHTML = ['<strong>CSS</strong>: ', GuideUtils.bytesToSize(stats[i].size)].join('');
        }
      }
    });
  };

  init();
};

export default GuideStylist;
