export const GuideTypography = (el) => {
  const ui = {
    el,
    select: document.querySelector('.select'),
    selectNative: document.querySelector('#fonts'),
    selectLabel: document.querySelector('.field__label'),
    cssSheets: document.styleSheets,
    familyFilter: ['auto', 'cursive', 'fantasy', 'inherit', 'monospace', 'none', 'unset']
  };

  // Our main install point
  const init = () => {
    const getFonts = () => {
      const collection = document.createDocumentFragment();
      const noDuplicates = [];

      Object.keys(ui.cssSheets).map((sheetDex) => {
        const rules = ui.cssSheets[sheetDex].cssRules;

        Object.keys(rules).map((rulesDex) => {
          const styles = rules[rulesDex].style;
          if (!styles) { return false; }

          if (styles.fontFamily) {
            const family = styles.fontFamily;
            const fonts = family.replace(/"/g, '').replace(/'/g, '').replace(/\\/g, '').split(',');
            let i = fonts.length;

            while (i--) {
              const font = fonts[i].trim();
              if (noDuplicates.indexOf(font) === -1 && ui.familyFilter.indexOf(font) === -1) {
                const option = document.createElement('option');
                option.value = font;
                option.innerHTML = font;
                collection.appendChild(option);
                noDuplicates.push(font);
              }
            }
          }

          return collection;
        });

        return collection;
      });

      return collection;
    };

    ui.selectNative.innerHTML = '';
    ui.selectNative.appendChild(getFonts());

    ui.select.addEventListener('change', () => {
      const all = el.querySelectorAll('*');
      let i = all.length;
      while (i--) {
        all[i].style.fontFamily = ui.selectNative.value;
      }
      el.querySelector('.heading').innerHTML = ui.selectNative.value;
    });
  };

  init();
};

export default GuideTypography;
