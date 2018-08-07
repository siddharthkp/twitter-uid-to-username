const { parse } = require('url')
const axios = require('axios')
const querystring = require('querystring')

const cache = {}

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')

  const { uid } = parse(req.url, true).query

  if (cache[uid]) {
    res.end(JSON.stringify(cache[uid]))
    return
  }

  axios
    .post('https://tweeterid.com/ajax.php', querystring.stringify({ input: uid }))
    .then(response => {
      const username = response.data.replace('@', '')
      cache[uid] = { username }
      res.end(JSON.stringify({ username }))
    })
    .catch(error => res.end())
}
