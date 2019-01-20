export const GuidePages = (el) => {
  const ui = {
    el,
    colorLevelSelect: el.querySelector('.accessibility__controls-level select'),
    colorWeightSelect: el.querySelector('.accessibility__controls-weight select'),
    colorLevels: el.querySelectorAll('.AccessibilityLevel'),
    colorBadges: el.querySelectorAll('.AccessibilityLevel__badge')
  };

  // Switch between color sample levels & weights
  const switchColorSamples = (level, weight) => {
    const levels = ui.colorLevels;
    const levelOptions = ui.colorLevelSelect.options;
    const levelIndex = ui.colorLevelSelect.selectedIndex;
    const weightOptions = ui.colorWeightSelect.options;
    const weightIndex = ui.colorWeightSelect.selectedIndex;
    
    // then we conditionally unhide the results
    Object.keys(levels).map((index) => {
    	const level = levels[index];
    	// first hide
      level.style.display = 'none';
      // then reveal
      if (level.classList.contains(levelOptions[levelIndex].value)) {
        level.style.display = 'flex';
        // next we hide all badges
        Object.keys(ui.colorBadges).map((index) => {
          ui.colorBadges[index].style.display = 'none';
          if (ui.colorBadges[index].classList.contains(weightOptions[weightIndex].value)) {
            ui.colorBadges[index].style.display = 'flex';
          }
        });
      }
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

export default GuidePages;