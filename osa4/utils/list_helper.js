const dummy = () => {
  return 1
}
const totalLikes = (blogs) => {
  let likesAmount = blogs.reduce(function(sum, blog) {
    return sum + blog.likes
  }, 0)

  return likesAmount
}

const favoriteBlog = (blogs) => {
  let max = 0
  let indexOfMax = 0
  for (let i = 0; i < blogs.length; i++) {
    if (blogs[i].likes > max) {
      max = blogs[i].likes
      indexOfMax = i
    }
  }
  return blogs[indexOfMax]
}

const mostBlogs = (blogs) => {
  let counts = {}
  let compare = 0
  let mostFrequent

  const len = blogs.length
  for (let i = 0; i < len; i++) {
    let word = blogs[i].author

    if(counts[word] === undefined) counts[word] = 1
    else counts[word] = counts[word] + 1

    if(counts[word] > compare) {
      compare = counts[word]
      mostFrequent = blogs[i]
    }
  }
  const ret = { author: mostFrequent.author, number: compare }
  return ret
}

const mostLikes = (blogs) => {
  let counts = {}
  let compare = 0
  let mostFrequent

  const len = blogs.length
  for (let i = 0; i < len; i++) {
    let word = blogs[i].author
    let likes = blogs[i].likes

    if(counts[word] === undefined) counts[word] = likes
    else counts[word] = counts[word] + likes

    if(counts[word] > compare) {
      compare = counts[word]
      mostFrequent = blogs[i]
    }
  }
  const ret = { author: mostFrequent.author, number: compare }
  return ret
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
