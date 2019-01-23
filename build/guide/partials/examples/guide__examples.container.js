export const GuideExamples = (el) => {
  const ui = {
    el,
    examples: document.querySelectorAll('.examples'),
    examplesCodes: document.querySelectorAll('.examples__code')
  };

  // Switch between code samples under a example
  const switchCodeSamples = (selection, example) => {
    if (!selection) { return; }

    const selected = example.querySelectorAll('.examples__code')[selection];
    if (!selected.classList.contains('hide')) {
      selected.classList.add('hide');
      return;
    }

    Object.keys(ui.examplesCodes).map((index) => {
      ui.examplesCodes[index].classList.add('hide');
      return true;
    });

    selected.classList.remove('hide');
  };

  const init = () => {
    // Sets up events for each example's source code buttons
    if (ui.examples) {
      Object.keys(ui.examples).map((index) => {
        const example = ui.examples[index];
        const buttons = example.querySelectorAll('.button');
        Object.keys(buttons).map((j) => {
          if (!buttons[j].hasAttribute('type')) {
            buttons[j].addEventListener('click', (e) => {
              if (!e.target.classList.contains('button')) { return; }
              switchCodeSamples(e.target.dataset.index, example);
              e.preventDefault();
            });
          }

          return true;
        });

        return true;
      });
    }
  };

  init();
};

export default GuideExamples;
