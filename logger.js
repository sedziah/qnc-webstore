// logger.js

function disableConsoleInProduction() {
  if (process.env.NODE_ENV === 'production') {
    console.log = () => {};
    console.info = () => {};
    console.warn = () => {};
    console.error = () => {};
    // Add any other console functions that you use.
  }
}

export default disableConsoleInProduction;
