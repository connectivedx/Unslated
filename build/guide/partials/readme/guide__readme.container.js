export const GuideReadme = (el) => {
  const ui = {
    el,
    examplesReadmeTogglers: document.querySelectorAll('.guide__readme-toggler')
  };

  // Toggle open and close example page's "Read me" section
  const toggleExamplesReadmeTable = (target) => {
    const table = target.parentNode.querySelector('.guide__readme-togglee');

    // we don't use classList toggle method due to IE11.
    if (table.classList.contains('hide')) {
      table.classList.remove('hide');
      target.classList.add('open');
    } else {
      table.classList.add('hide');
      target.classList.remove('open');
    }
  };  

  const init = () => {
    // Sets up open/close toggle event for both props and methods readme headers
    if (ui.examplesReadmeTogglers) {
      Object.keys(ui.examplesReadmeTogglers).map(index => {
        const trigger = ui.examplesReadmeTogglers[index];
        trigger.addEventListener('click', () => {
          toggleExamplesReadmeTable(trigger);
        });
      });
    }
  };

  init();
};

export default GuideReadme;