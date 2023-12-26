const { parseHTML } = require('linkedom');
const hljs  = require("highlight.js")

module.exports = (value) => {
    const { document } = parseHTML(value);

    const blocks = document.querySelectorAll('pre code');
    for (const block of blocks) {
        block.innerHTML = hljs.highlightAuto(block.innerHTML).value;
    }
    
    value = document.toString();
    return value;
  }
  