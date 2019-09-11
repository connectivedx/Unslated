export const GuideIcons = (el) => {
  const ui = {
    el,
    iconSearch: el.querySelector('.icons__controls-search .field__native'),
    iconCards: el.querySelectorAll('.card[data-icon]'),
    iconUtilities: el.querySelectorAll('.icon__utilities')
  };


  const init = () => {
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

    // Search icons setup
    if (ui.iconSearch) {
      ui.iconSearch.addEventListener('keyup', () => {
        const query = ui.iconSearch.value;
        if (query.length) {
          let i = ui.iconCards.length;

          while (i--) {
            ui.iconCards[i].style.opacity = 0.05;
            if (ui.iconCards[i].dataset.icon.match(query) !== null) {
              ui.iconCards[i].style.opacity = 1;
            }
          }
        } else {
          let i = ui.iconCards.length;

          while (i--) {
            ui.iconCards[i].style.opacity = 1;
          }
        }
      });
    }
  };

  init();
};

export default GuideIcons;
