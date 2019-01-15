export const GuideNav = (el) => {
  const ui = {
    el,
    nav: document.querySelector('.guide__nav'),
    navInner: document.querySelector('.guide__nav-inner'),
    navLists: document.querySelectorAll('.heading + .list'),
    search: document.querySelector('.guide__search')
  };

  const init = () => {
    if (ui.nav) {
      ui.nav.addEventListener('click', (e) => {
        const target = e.target;

        // navigaiton toggle open/close
        if (target === ui.nav || target == ui.navInner || target === ui.search) {
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
          const items = ui.navLists;
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
  };

  init();
};

export default GuideNav;