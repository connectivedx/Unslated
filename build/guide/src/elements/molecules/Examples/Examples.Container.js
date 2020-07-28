export const GuideExamples = (el) => {
  const ui = {
    el,
    examples: document.querySelectorAll('.examples'),
    examplesCodes: document.querySelectorAll('.examples__code'),
    examplesJumplinks: document.querySelectorAll('.examples__header-jumplink')
  };

  // Switch between code samples under a example
  const switchCodeSamples = (selection, example) => {
    if (!selection) { return; }

    const selected = example.querySelectorAll('.examples__code')[selection];
    if (!selected.classList.contains('hidden')) {
      selected.classList.add('hidden');
      return;
    }

    Object.keys(ui.examplesCodes).map((index) => {
      ui.examplesCodes[index].classList.add('hidden');
      return true;
    });

    selected.classList.remove('hidden');
  };

  const init = () => {
    // Setup events for each example's source code buttons
    if (ui.examples) {
      Object.keys(ui.examples).map((index) => {
        const example = ui.examples[index];
        const pallet = example.querySelector('.examples__pallet'); // eslint-disable-line
        const buttons = example.querySelectorAll('.guide__button');

        Object.keys(buttons).map((j) => {
          if (!buttons[j].hasAttribute('type')) {
            buttons[j].addEventListener('click', (e) => {
              if (!e.target.classList.contains('guide__button')) { return; }
              switchCodeSamples(e.target.dataset.index, example);
              e.preventDefault();
            });
          }

          return true;
        });

        return true;
      });
    }

    // Setup events for each example's jump link
    if (ui.examplesJumplinks) {
      Object.keys(ui.examplesJumplinks).map((index) => {
        const hiddenInput = ui.examplesJumplinks[index].querySelector('.field__native');
        hiddenInput.value = ui.examplesJumplinks[index].href;

        ui.examplesJumplinks[index].addEventListener('click', (e) => {
          ui.examplesJumplinks[index].classList.add('copied');
          hiddenInput.select();
          document.execCommand('copy');

          setTimeout(() => {
            ui.examplesJumplinks[index].classList.remove('copied');
          }, 2000);

          e.preventDefault();
          return false;
        });

        return false;
      });
    }
  };

  init();
};

export default GuideExamples;
