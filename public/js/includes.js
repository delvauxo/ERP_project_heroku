const includeHTMLs = async function(arrayIncludesWrappers) {
  for (const include of arrayIncludesWrappers) {
      const page = include.getAttribute('include-html')
      const response = await fetch('./public/pages/' + page + '.html', {method: 'GET'})
      const text = await response.text()
      include.innerHTML = text
  }
}

export default includeHTMLs