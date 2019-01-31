require('es6-promise').polyfill();
const fetch = require('isomorphic-fetch');

class Insights {
  setUpQuery() { // eslint-disable-line
    const api = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';
    const parameters = {
      url: encodeURIComponent('http://localhost:8080/tools/colors')
    };
    let query = `${api}?`;
    Object.keys(parameters).map((key) => {
      query += `${key}=${parameters[key]}`;
      return false;
    });
    return query;
  }

  showInitialContent(id) { // eslint-disable-line
    document.body.innerHTML = '';
    const title = document.createElement('h1');
    title.textContent = 'PageSpeed Insights API Demo';
    document.body.appendChild(title);
    const page = document.createElement('p');
    page.textContent = `Page tested: ${id}`;
    document.body.appendChild(page);
  }

  showCruxContent(cruxMetrics) { // eslint-disable-line
    const cruxHeader = document.createElement('h2');
    cruxHeader.textContent = 'Chrome User Experience Report Results';
    document.body.appendChild(cruxHeader);
    Object.keys(cruxMetrics).map((key) => {
      if (key) {
        const p = document.createElement('p');
        p.textContent = `${key}: ${cruxMetrics[key]}`;
        document.body.appendChild(p);
      }
      return false;
    });
  }

  showLighthouseContent(lighthouseMetrics) { // eslint-disable-line
    const lighthouseHeader = document.createElement('h2');
    lighthouseHeader.textContent = 'Lighthouse Results';
    document.body.appendChild(lighthouseHeader);
    Object.keys(lighthouseMetrics).map((key) => {
      const p = document.createElement('p');
      p.textContent = `${key}: ${lighthouseMetrics[key]}`;
      document.body.appendChild(p);
      return false;
    });
  }

  run() {
    const url = this.setUpQuery();
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        // See https://developers.google.com/speed/docs/insights/v5/reference/pagespeedapi/runpagespeed#response
        // to learn more about each of the properties in the response object.
        this.showInitialContent(json.id);
        const cruxMetrics = {
          'First Contentful Paint': json.loadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS.category,
          'First Input Delay': json.loadingExperience.metrics.FIRST_INPUT_DELAY_MS.category
        };
        this.showCruxContent(cruxMetrics);
        const lighthouse = json.lighthouseResult;
        const lighthouseMetrics = {
          'First Contentful Paint': lighthouse.audits['first-contentful-paint'].displayValue,
          'Speed Index': lighthouse.audits['speed-index'].displayValue,
          'Time To Interactive': lighthouse.audits.interactive.displayValue,
          'First Meaningful Paint': lighthouse.audits['first-meaningful-paint'].displayValue,
          'First CPU Idle': lighthouse.audits['first-cpu-idle'].displayValue,
          'Estimated Input Latency': lighthouse.audits['estimated-input-latency'].displayValue
        };

        this.showLighthouseContent(lighthouseMetrics);
      });
  }
}

module.exports = Insights;
