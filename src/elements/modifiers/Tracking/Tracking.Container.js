const getCookie = (cname) => {
  const name = [cname, '='].join('');
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return false;
};

const setCookie = (cname, cvalue, exdays) => {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  const expires = ['expires=', d.toUTCString()].join('');
  document.cookie = [cname, '=', cvalue, ';', expires, ';path=/'].join('');
};

class Tracking {
  constructor(options) {
    this.settings = {
      eventTypes: [
        'load',
        'pageload',
        'beforeunload',
        'unload',
        'reset',
        'submit',
        'resize',
        'scroll',
        'cut',
        'copy',
        'paste',
        'drag',
        'dragend',
        'dragover',
        'dragleave',
        'drop',
        'mouseenter',
        'mouseover',
        'mousemove',
        'mousedown',
        'mouseup',
        'mouseout',
        'mouseleave',
        'auxclick',
        'click',
        'dblclick',
        'contextmenu',
        'select',
        'pointerlockchange',
        'pointerlockerror',
        'select',
        'keyup',
        'keypress',
        'keydown',
        'focus',
        'blur',
        'play',
        'pause',
        'seeking',
        'seeked',
        'volumechange',
        'ratechange',
        'stalled',
        'ended',
        'waiting',
        'complete',
        'change',
        'input'
      ]
    };

    this.debounceList = [
      'input',
      'keydown',
      'waiting',
      'mousemove',
      'keypress',
      'scroll'
    ];

    this.ui = {
      trackingAttrs: document.querySelectorAll('[data-tracking]')
    };

    this.init(options);
    this.debounceWait = undefined;
  }

  setupGoogleTagManager = (id) => {
    if (!id) {
      console.log('Error: Google Tag Manager requires an account id to complete tracking setup. See src/scripts.js for Tracking config setup.'); // eslint-disable-line
      return;
    }

    // Google Tag Manager Setup Code
    ((w, d, s, l, i) => {
      w[l] = w[l] || [];
      w[l].push({
        'gtm.start': new Date().getTime(),
        event: 'gtm.js'
      });
      const f = d.querySelector('head');
      if (!f) { return; }
      const j = d.createElement(s);
      const dl = (l !== 'dataLayer') ? `&l=${l}` : '';
      j.async = true;
      j.src = `https://www.googletagmanager.com/gtm.js?id=${i}${dl}`;
      // j.src = ['//www.googletagmanager.com/gtm.js?id=', i, dl].join('');
      f.appendChild(j, f);
    })(window, document, 'script', 'dataLayer', id);

    const iframe = document.createElement('iframe');
    iframe.setAttribute('src', `https://www.googletagmanager.com/ns.html?id=${id}`);
    iframe.setAttribute('width', '0');
    iframe.setAttribute('height', '0');
    iframe.setAttribute('style', 'display:none;visibility:hidden');
    document.body.insertBefore(iframe, document.body.firstChild);
  }

  setupVendors = (vendors) => {
    let v = vendors.length;
    while (v--) {
      if (vendors[v].type.match('Google')) {
        this.setupGoogleTagManager(vendors[v].id);
      }
    }
  }

  validateFormatting = (formatting) => {
    try {
      return JSON.parse(formatting.replace(/'/g, '"'));
    } catch (err) {
      console.log('Error: It appears this element has a malformatted data-tracking value. Please correct syntax issues.'); // eslint-disable-line
      return false;
    }
  }

  validateSelector = (query) => {
    const attr = query.split(':attr');
    let selector;
    try {
      selector = document.querySelector(attr[0]);
      // if element selector contained a attribute selection
      if (selector) {
        if (attr[1]) {
          const prop = attr[1].replace(/\((.*?)\)/g, '$1');
          if (typeof selector[prop] !== 'undefined') {
            return selector[prop];
          }
          return selector.getAttribute(prop);
        }
        return selector.innerHTML;
      }

      // if element selector failed double check to see if its just a missing element on page
      if (attr[0].indexOf('#') === 0 || attr[0].indexOf('.') === 0 || attr[1].length) {
        // if any of these conditions are true, we know we have selector based tracking, but missing element on page.
        // so we continue to treat this as a element tracking, not string data tracking.
        return '';
      }
      return false;
    } catch (e) {
      return false;
    }
  }

  validateDate = (data) => {
    // for the sakes of re-usability, we boil down data to a collection variable
    let collection = null; // prep collection to be null for null based data

    if (data) {
      collection = data; // catch for null or string based data

      // if data is a potential JSON object
      if (typeof data === 'object') {
        // when data is a JSON object
        collection = [];
        const keys = Object.keys(data).reverse();
        let j = keys.length;

        while (j--) {
          if (this.validateSelector(data[keys[j]]) !== false) {
            // selector for value of data spread
            collection[keys[j]] = this.validateSelector(data[keys[j]]);
          } else {
            // string for value of data spread
            collection[keys[j]] = data[keys[j]];
          }
        }
      // if data is a potential element selector
      } else if (this.validateSelector(data)) {
        collection = this.validateSelector(data);
      }
    }

    // returns collection as null, string, element innerHTML (string), element attribute (string) or object
    return collection;
  }

  execute = (elm, eventType, debounceBool) => {
    // first we validate dataset.tracking
    if (!this.validateFormatting(elm.dataset.tracking)) {
      return;
    }

    if (debounceBool) {
      clearTimeout(this.debounceWait);
      this.debounceWait = setTimeout(() => {
        // scrub the incoming data against data tracking requirements
        this.eventScrub(this.validateFormatting(elm.dataset.tracking), eventType, elm);
        // conditional debounce or non-debounce period
      }, 250);
    } else {
      this.eventScrub(this.validateFormatting(elm.dataset.tracking), eventType, elm);
    }
  }

  eventScrub = (dataset, type, elm) => {
    // mutli-event track looping
    let i = dataset.length;
    while (i--) {
      const { session } = dataset[i];
      const { sessionEnd } = dataset[i];
      const { elements } = dataset[i];
      const { event } = dataset[i];
      let { label } = dataset[i];
      let { data } = dataset[i];

      label = label.replace(/ /g, '');

      // multi-element track check
      if (elements) {
        // because the element that got us here was orignally a child of our then re-focused target
        // looping over dataset.tracking.elements and checking if lack of parent with dataset.tracking attribute is sufficent
        const elms = elm.querySelectorAll(elements);
        let j = elms.length;
        while (j--) {
          // again, if a single element doesn't have a parent with tracking, we break out of eventScrub.
          if (!this.getParent(elms[j])) {
            console.log('Error: There appears to be mult-element tracking setup on non-existent children.'); // eslint-disable-line
            return;
          }
        }
      }

      if (event === type) {
        if (global.dataLayer) { // Google Tag Manager
          // when no data is supplied we only push out event
          data = this.validateDate(data);

          // Session based tracking
          if (session) {
            const trackingData = {};
            if (getCookie(session)) { // we already have this cookie
              Object.keys(data).map((index) => { // eslint-disable-line
                trackingData[index] = data[index];
                return false;
              });

              const cookieData = JSON.parse(getCookie(session));
              Object.keys(trackingData).map((jdex) => {
                if (cookieData[jdex]) {
                  if (trackingData[jdex] !== '') {
                    cookieData[jdex] = trackingData[jdex];
                  }
                } else {
                  cookieData[jdex] = trackingData[jdex];
                }
                return false;
              });

              setCookie(session, JSON.stringify(cookieData), 300);
            } else {
              Object.keys(data).map((index) => { // eslint-disable-line\
                trackingData[index] = data[index];
                return false;
              });

              setCookie(session, JSON.stringify(trackingData), 300);
            }
            continue; // eslint-disable-line
          }

          if (sessionEnd) {
            // take data from session and put it into the tracking that is ending the session now.
            data = Object.assign(data, JSON.parse(getCookie(sessionEnd)));
          }

          if (typeof data === 'string') {
            global.dataLayer.push({
              event: label,
              data
            });
          } else {
            global.dataLayer.push({
              event: label,
              ...data
            });
          }
          if (window.location.search.indexOf('debug=true') !== -1) {
            console.clear();          // eslint-disable-line
            console.log(global.dataLayer);   // eslint-disable-line
          }
        }
      }
    }
  }

  // search parents with tracking data attribute
  getParent = (el) => {
    while (el.parentNode) {
      el = el.parentNode;
      if (el === document) { return false; }

      if (el.hasAttribute('data-tracking')) {
        return el;
      }
    }
    return false;
  }

  // init the watcher
  init = (options) => {
    this.setupVendors(options.vendors);

    // Installs event based tracking
    let i = this.settings.eventTypes.length;
    while (i--) {
      document.body.addEventListener(this.settings.eventTypes[i], (e) => {
        const { target } = e;
        const { type } = e;
        const { tracking } = target.dataset;
        const parent = this.getParent(target);

        // if clicked target or parent element has tracking
        if (tracking || parent) {
          // if parent has tracking using `elements`, and clicked element matches `elements` selector we send off parent
          if (parent.dataset) {
            const parsedEvents = JSON.parse(parent.dataset.tracking.replace(/'/g, '"'));
            let j = parsedEvents.length;
            while (j--) {
              const { elements } = parsedEvents[j];
              if (elements) {
                const testElements = parent.querySelectorAll(elements);
                let k = testElements.length;
                while (k--) {
                  if (testElements[k] === target) {
                    // otherwise, we send of target
                    this.execute(
                      parent,
                      type,
                      (this.debounceList.indexOf(type) !== -1)
                    );
                  }
                }
              }
            }
          } else {
            // otherwise, we send of target
            this.execute(
              target,
              type,
              (this.debounceList.indexOf(type) !== -1)
            );
          }
        }
      }, true, true);
    }

    // Allows for direct data layer pushing from API.
    this.send = (data) => {
      global.dataLayer.push(data);
    };

    this.sent = global.dataLayer;

    // Performs pageload tracking setup
    const pageloadTrack = (elm) => {
      // Validate prior to parsing
      if (!this.validateFormatting(elm.dataset.tracking)) {
        return null;
      }

      // Parse tracking attribute into object
      const trackingAttr = JSON.parse(elm.dataset.tracking.replace(/'/g, '"'));
      // Because we can have more multiple tracking events in a single tracking attribute, we must loop over each event entry
      Object.keys(trackingAttr).map((attrIndex) => {
        // Now that we are down to a single tracking entry, lets condition for only pageload events
        const trackingEntry = trackingAttr[attrIndex];
        const trackingEvent = trackingEntry.event;

        if (trackingEvent === 'pageload') {
          // finally we return the execute method with our found pageload tracking record to perform tracking.
          return (this.execute(elm, trackingEvent, (this.debounceList.indexOf(trackingEvent) !== -1)));
        }
        return null;
      });

      return false;
    };

    Object.keys(this.ui.trackingAttrs).map((elmIndex) => {
      pageloadTrack(this.ui.trackingAttrs[elmIndex]);
      return null;
    });

    // Mutation observer for XHR loaded DOM to check for pageload tracking
    document.body.addEventListener('DOMNodeInserted', (event) => {
      const elm = event.path[0];
      if (elm.dataset) {
        if (elm.dataset.tracking) {
          if (elm.dataset.tracking.indexOf('pageload') !== -1) {
            pageloadTrack(elm);
          }
        }
      }

      // search for tracking within new element now
      if (elm) {
        try {
          const children = elm.querySelectorAll('[data-tracking]');
          let k = children.length;
          while (k--) {
            const child = children[k];
            if (child.dataset.tracking.indexOf('pageload') !== -1) {
              pageloadTrack(child);
            }
          }
        } catch (e) {
          // no error to return
        }
      }
    }, false);
  }
}

export default Tracking;
