import __ from 'lodash';

export const GuideNav = (el) => {
  const ui = {
    el,
    nav: document.querySelector('.guide__nav'),
    navInner: document.querySelector('.guide__nav-inner'),
    navLists: document.querySelectorAll('.heading + .list'),
    search: el.querySelector('.guide__nav--search .field__native'),
    newElementForms: el.querySelectorAll('.new-element')
  };

  const init = () => {
    if (ui.nav) {
      ui.nav.addEventListener('click', (e) => {
        const target = e.target;

        // navigaiton toggle open/close
        if (target.classList.contains('guide-nav__open') || target.classList.contains('guide-nav__close')) {
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
      
      // Navigation search
      const loopList = (value) => {
        Object.keys(ui.navLists).map(i => {
          const items = ui.navLists[i].querySelectorAll('.list__item');
          let j = items.length;
          let hasMatches = false;

          if (typeof value === 'string') {
            // Searching
            
            // toggle list visibility by value length
            if (value.length) {
              ui.navLists[i].classList.remove('hide');
            } else {
              ui.navLists[i].classList.add('hide');
            }

            // toggle list__items visibility by value match
            while(j--) {
              items[j].classList.add('hide');
              if (items[j].dataset.search.toLowerCase().match(value.toLowerCase())) {
                items[j].classList.remove('hide');
                hasMatches = true;
              }
            }

            // toggle list parent by all list__items being hidden or not.
            if (hasMatches === false) {
              ui.navLists[i].parentNode.classList.add('hide');
            } else {
              ui.navLists[i].parentNode.classList.remove('hide');
            }
          } else {
            // Clearing
            ui.navLists[i].classList.add('hide');
            while(j--) {
              items[j].classList.remove('hide');
              ui.navLists[i].parentNode.classList.remove('hide');
            }            
          }
        });
      };

      // Searching Events
      ui.search.addEventListener('keyup', (e) => {
        loopList(ui.search.value);
      });

      ui.search.addEventListener('search', (e) => {
        loopList(true);
      });

      // Prevent form from searching
      Utils.parents(ui.search, 'form').addEventListener('submit', (e) => {
        e.preventDefault();
      });
    }
  };

  init();
};

export default GuideNav;