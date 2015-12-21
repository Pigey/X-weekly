/**
 * @file extract keyword
 * @author nighca<nighca@live.cn>
 */

function split (sentence) {
  return sentence.split(/(?=[^\w])|\b/).filter(
    part => part.trim()
  )
}

function combine (units) {
  let result = ''

  for (let i = 0, len = units.length, wasWord = false, word, isWord; i < len; i++) {
    word = units[i]
    isWord = /\w/.test(word)

    result += i && (wasWord && isWord) ? ' ' : ''
    result += word

    wasWord = isWord
  }

  return result
}

function getCountInAll (word, sentenceList, cache) {
  cache = cache.count = cache.count || {}

  if (cache.hasOwnProperty(word)) {
    return cache[word]
  }

  return cache[word] = sentenceList.reduce(
    (num, sentence) => (sentence.indexOf(word) >= 0 ? num + 1 : num),
    0
  )
}

function rate (word) {
  return word.text.length * word.count
}

function getWords (units, sentenceList, cache) {
  let words = []
  let len = units.length

  units.forEach((unit, index) => {
    for (let start = index, end = index + 1; end < len; end++) {
      let wordUnits = units.slice(start, end)
      let wordText = combine(wordUnits)
      let wordCount = getCountInAll(wordText, sentenceList, cache)

      words.push({
        text: wordText,
        units: wordUnits,
        count: wordCount
      })

      if (wordCount <= 1) {
        break
      }
    }
  })

  words = words.filter(
    word => (
      word.count >= 2
      && word.text.length >= 2
    )
  )

  words = words.sort(
    (prev, next) => rate(prev) > rate(next) ? 1 : -1
  )

  words = words.filter(
    (word, i) => {
      for (let len = words.length - 1; len > i; len--) {
        if (
          words[len].text.indexOf(word.text) >= 0
          || word.text.indexOf(words[len].text) >= 0
        ) {
          return false
        }
      }
      return true
    }
  )

  return words.reverse()
}

export default function (items, num, excludeList) {
  items = items.slice(-200)

  items = items.map(split)
  excludeList = excludeList || []

  const cache = {}

  let wordsList = getWords(
    [].concat(...items),
    items.map(combine),
    cache
  )

  wordsList = wordsList.filter(
    word => (
      excludeList.indexOf(word.text) < 0
    )
  )

  wordsList = wordsList.slice(0, num)

  return wordsList
}
