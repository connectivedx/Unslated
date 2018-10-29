export const Guide = (el) => {
  const ui = {
    el,
    nav: document.querySelector('.guide__nav'),
    examples: document.querySelectorAll('.examples__item'),
    examplesCodes: document.querySelectorAll('.examples__code'),
    examplesReadmeTogglers: document.querySelectorAll('.guide__readme-toggler'),
    stylist: document.querySelector('.guide__stylist'),
    stylistMinMax: document.querySelector('.guide__stylist-minmax'),
    stylistExampleSelect: document.querySelector('.guide__stylist-examples'),
    stylistBreakpointSelect: document.querySelector('.guide__stylist-breakpoint-size'),
    stylistBreakpointSpeed: document.querySelector('.guide__stylist-breakpoint-speed'),
    colorAccessibilityLevel: document.querySelector('.accessibility__controls-level'),
    colorAccessibilityWeight: document.querySelector('.accessibility__controls-weight')
  };

  const state = {
    currentExample: document.querySelectorAll('.examples__item')[0]
  }

  // Switch between minimized and maximized stylist window
  const switchStylistMinMax = () => {
    if (ui.stylist.classList.contains('open')) {
      ui.stylist.classList.remove('open');
    } else {
      ui.stylist.classList.add('open');
    }
  };

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

  // Switch between code samples under a example
  const switchCodeSamples = (selection, example) => {
    Object.keys(ui.examplesCodes).map(index => {
      ui.examplesCodes[index].classList.add('hide');
    });

    if (!selection) { return; }

    example.querySelectorAll('.examples__code')[selection].classList.remove('hide');
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

  // Switch between color sample levels & weights
  const switchColorSamples = (level, weight) => {
    const levels = document.querySelectorAll('.AccessibilityLevel');
    const levelOptions = ui.colorAccessibilityLevel.options;
    const levelIndex = ui.colorAccessibilityLevel.selectedIndex;
    const weightOptions = ui.colorAccessibilityWeight.options;
    const weightIndex = ui.colorAccessibilityWeight.selectedIndex;
    
    // then we conditionally unhide the results
    Object.keys(levels).map(index => {
      const level = levels[index];
      level.style.display = 'none';
      if (level.classList.contains(levelOptions[levelIndex].value)) {
        const badges = document.querySelectorAll('.AccessibilityLevel__badge');
        level.style.display = 'flex';

        // next we hide all badges
        Object.keys(badges).map(index => {
          badges[index].style.display = 'none';
          if (badges[index].classList.contains(weightOptions[weightIndex].value)) {
            badges[index].style.display = 'flex';
          }
        });
      }
    });
  };

  // Toggle open and close example page's "Read me" section
  const toggleExamplesReadmeTable = (target) => {
    const table = target.parentNode.querySelector('.guide__readme-togglee');

    // we don't use classList toggle method due to IE11.
    if (table.classList.contains('hide')) {
      table.classList.remove('hide');
    } else {
      table.classList.add('hide');
    }
  };

  // Install styleguide JS
  const init = () => {
    if (ui.nav) {
      ui.nav.addEventListener('click', (e) => {
        const target = e.target;

        // navigaiton toggle open/close
        if (target === ui.nav || target == ui.nav.querySelector('.guide__nav-inner')) {
          if (ui.nav.classList.contains('open')) {
            ui.nav.classList.remove('open');
            ui.nav.classList.add('close');
            setTimeout(() => {
              ui.nav.classList.remove('close');
              document.body.style.overflow = '';
            }, 1000);
          } else {
            ui.nav.classList.add('open');
            document.body.style.overflow = 'hidden';
          }
        }

        // navigation accordion
        if (target.classList.contains('heading')) {
          const items = ui.nav.querySelectorAll('.heading + .list');
          const closeAllSections = () => {
            Object.keys(items).map(index => {
              items[index].classList.add('hide');
            });
          };

          if (target.nextSibling.classList.contains('hide')) {
            target.nextSibling.classList.remove('hide');
          } else {
            target.nextSibling.classList.add('hide');
          }

          e.preventDefault();
        }
      });
    }

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

    // Sets up events for each example's source code buttons
    if (ui.examples) {
      Object.keys(ui.examples).map(index => {
        const example = ui.examples[index];
        const buttons = example.querySelectorAll('.button');

        Object.keys(buttons).map(index => {
          buttons[index].addEventListener('click', (e) => {
            if (!e.target.classList.contains('button')) { return; }          
            switchCodeSamples(e.target.dataset.index, example);
            e.preventDefault();
          });
        });
      });
    }

    // Sets up open/close toggle event for both props and methods readme headers
    if (ui.examplesReadmeTogglers) {
      Object.keys(ui.examplesReadmeTogglers).map(index => {
        const trigger = ui.examplesReadmeTogglers[index];
        trigger.addEventListener('click', () => {
          toggleExamplesReadmeTable(trigger);
        });
      });
    }

    // Sets up events for color accessibility level change
    if (ui.colorAccessibilityLevel) {
      ui.colorAccessibilityLevel.addEventListener('change', () => {
        switchColorSamples();
      });
    }

    // Sets up event for color accessibility weight change
    if (ui.colorAccessibilityWeight) {
      ui.colorAccessibilityWeight.addEventListener('change', () => {
        switchColorSamples();
      });
    }
  };

  init();
};

export default Guide;