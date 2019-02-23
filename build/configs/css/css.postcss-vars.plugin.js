// Simple little plugin that takes matches var() usage with corresponding variables across project styles and replacing the 
// var() usage with corresponding variable's value.

// Order of operation matters greatly here
// 1) Look for each var() usage.
// 2) Take found var() usage and locate it's corresponding variable
// 3) If corresponding variable is found to be a re-var() usage, repeat step 2
// 4) Take corresponding variable value replace all var() usage with found value

const postcss = require('postcss');
const variables = [];

module.exports = postcss.plugin('postcss-vars', (options) => {
  options = options || {};

  return root => {
    const extractVariables = (value) => {
      value = value.split(' ');
      return Object.keys(value).map(index => {
        if (value[index].replace(/var\((.*?)\)/g, '$1').indexOf('--') !== -1) {
          let quickClean = value[index].replace(/var\((.*?)\)/g, '$1');
          quickClean = quickClean.replace(/,/g, '');
          if (quickClean.split('(').length > 1) {
            return quickClean.split('(')[1];
          }
          return quickClean;
        }
        return;
      }).filter((n) => n);
    };

    // First, build list of variables
    root.walkRules(':root', rule => {
      rule.walkDecls(decl => {
        if (decl.prop.indexOf('--') !== -1) {
          variables[decl.prop] = decl.value;
        }
      });
    });

    // Nest loop over list of variables values, and determin if
    // values are back referencing another variable or not.
    // if found to be back referencing another variable, use extractVariable method to
    // reverse loop up variables value in our list and update value 
    Object.keys(variables).map(index => {
      const reverseLookupVariable = extractVariables(variables[index]);
      if (reverseLookupVariable.length) {
        const reverseLookupValue = variables[reverseLookupVariable];
        variables[index] = variables[index].replace('var('+reverseLookupVariable+')', reverseLookupValue);
      }
    });

    // Now that we have a distilled down list of all variables, lets replace all usage of variables across the
    // stylesheets using our clean variables list as a key
    root.walkRules(rule => {
      rule.walkDecls(decl => {
        Object.keys(variables).map(index => {
          if (decl.value.indexOf('var('+index+')') !== -1) {
            decl.value = decl.value.replace('var('+index+')', variables[index]);
          }
        });
      });
    });
  };
});
