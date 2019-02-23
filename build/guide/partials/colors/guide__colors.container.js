export const GuideColors = (el) => {
  const ui = {
    el,
    colorLevelSelect: el.querySelector('.accessibility__controls-level'),
    colorLevelSelectNative: el.querySelector('.accessibility__controls-level select'),
    colorWeightSelect: el.querySelector('.accessibility__controls-weight'),
    colorWeightSelectNative: el.querySelector('.accessibility__controls-weight select'),
    colorLevels: el.querySelectorAll('.AccessibilityLevel'),
    colorBadges: el.querySelectorAll('.AccessibilityLevel__badge')
  };

  // Switch between color sample levels & weights
  const switchColorSamples = () => {
    const levels = ui.colorLevels;
    const levelOptions = ui.colorLevelSelectNative.options;
    const levelIndex = ui.colorLevelSelectNative.selectedIndex;
    const weightOptions = ui.colorWeightSelectNative.options;
    const weightIndex = ui.colorWeightSelectNative.selectedIndex;

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
  };

  init();
};

export default GuideColors;
