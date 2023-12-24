/* ***** ----------------------------------------------- ***** **
/* ***** Add Header Credit Transform
/* ***** ----------------------------------------------- ***** */

const markupHeader = [
  '<!DOCTYPE html>',
  '<!--',
  '**',
  '**',
  '**',
  '**',
  '**',
  '**',
  '**              {{ @bymattlee }}',
  '**              {{ bymattlee.com }}',
  '**              {{ Adapting Ghost by 1900 }}',
  '**              {{ 1900.live }}',
  '**',
  '**',
  '**',
  '**',
  '**',
  '**',
  '-->\n',
]

module.exports = (content, outputPath) => {
  if (outputPath.endsWith('.html')) {
    return markupHeader.join('\n') + content
  }
  return content
}
