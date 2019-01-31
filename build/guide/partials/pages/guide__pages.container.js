export const GuidePages = (el) => {
  const ui = {
    el,
    colorLevelSelect: el.querySelector('.accessibility__controls-level select'),
    colorWeightSelect: el.querySelector('.accessibility__controls-weight select'),
    colorLevels: el.querySelectorAll('.AccessibilityLevel'),
    colorBadges: el.querySelectorAll('.AccessibilityLevel__badge'),
    iconSearch: el.querySelector('.icons__controls-search .field__native'),
    iconCards: el.querySelectorAll('.card[data-icon]'),
    iconUtilities: el.querySelectorAll('.icon__utilities')
  };

  // Switch between color sample levels & weights
  const switchColorSamples = () => {
    const levels = ui.colorLevels;
    const levelOptions = ui.colorLevelSelect.options;
    const levelIndex = ui.colorLevelSelect.selectedIndex;
    const weightOptions = ui.colorWeightSelect.options;
    const weightIndex = ui.colorWeightSelect.selectedIndex;

    // then we conditionally unhide the results
    Object.keys(levels).map((i) => {
      const level = levels[i];
      // first hide
      level.style.display = 'none';
      // then reveal
      if (level.classList.contains(levelOptions[levelIndex].value)) {
        level.style.display = 'flex';
        // next we hide all badges
        Object.keys(ui.colorBadges).map((j) => {
          ui.colorBadges[j].style.display = 'none';
          if (ui.colorBadges[j].classList.contains(weightOptions[weightIndex].value)) {
            ui.colorBadges[j].style.display = 'flex';
          }

          return true;
        });
      }

      return true;
    });
  };

  const init = () => {
    // Sets up events for color accessibility level change
    if (ui.colorLevelSelect) {
      ui.colorLevelSelect.addEventListener('change', () => {
        switchColorSamples();
      });
      switchColorSamples();
    }

    // Sets up event for color accessibility weight change
    if (ui.colorWeightSelect) {
      ui.colorWeightSelect.addEventListener('change', () => {
        switchColorSamples();
      });
    }


    // Helper method to gather icon GUI variables
    const serializeIconUtilities = (inputs) => Object.keys(inputs).map((i) => ['--icon-', inputs[i].name, ':', inputs[i].value, (inputs[i].type !== 'color') ? 'px;' : ';'].join('')).join('');

    // Sets up events for icon size range sliders
    if (ui.iconUtilities) {
      Object.keys(ui.iconUtilities).map((i) => {
        const natives = ui.iconUtilities[i].querySelectorAll('.field__native');

        Object.keys(natives).map((j) => {
          const native = natives[j];
          native.addEventListener('input', () => {
            const GUIStyles = serializeIconUtilities(natives);
            Utils.parents(native, '.card').setAttribute('style', GUIStyles);
          });
          return false;
        });

        return false;
      });
    }

    if (ui.iconSearch) {
      ui.iconSearch.addEventListener('keyup', () => {
        const query = ui.iconSearch.value;
        if (query.length) {
          let i = ui.iconCards.length;

          while (i--) {
            ui.iconCards[i].classList.add('hide');
            if (ui.iconCards[i].dataset.icon.match(query) !== null) {
              ui.iconCards[i].classList.remove('hide');
            }
          }
        } else {
          let i = ui.iconCards.length;

          while (i--) {
            ui.iconCards[i].classList.remove('hide');
          }
        }
      });
    }
  };

  init();
};

export default GuidePages;
