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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
