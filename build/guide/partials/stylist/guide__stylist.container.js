export const GuideStylist = (el) => {
  const ui = {
    el,
    examples: document.querySelectorAll('.examples'),
    stylist: document.querySelector('.guide__stylist'),
    stylistMinMax: document.querySelector('.guide__stylist-minmax'),
    stylistExampleSelect: document.querySelector('.guide__stylist-examples'),
    stylistBreakpointSelect: document.querySelector('.guide__stylist-breakpoint-size'),
    stylistBreakpointSpeed: document.querySelector('.guide__stylist-breakpoint-speed')
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
        if (selection === parseInt(index+1, 10)) {
          state.currentExample = ui.examples[(parseInt(selection, 10) - 1)];
          ui.examples[(parseInt(selection, 10) - 1)].classList.remove('hide');
        }
      }
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
      pallet.style.width = pallet.offsetWidth + 'px';
      pallet.style.width = (selection !== 'none') ? selection : '100%';
    });
  };

  // Switch between breakpoint speeds for all examples
  const switchBreakpointSpeeds = (selection) => {
    Object.keys(ui.examples).map((key, index) => {
      const pallet = ui.examples[index].querySelector('.examples__pallet');
      const width = (pallet.style.width) ? pallet.style.width : '100%';
      const background = pallet.style.backgroundImage;
      pallet.setAttribute('style', ['--breakpoint-speed:', selection, '; width:', width, '; background-image:', background, ';'].join(''));
    });
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
  };

  init();
};

export default GuideStylist;