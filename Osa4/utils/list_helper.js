const blog = require("../models/blog");

const dummy = (blogs) => {
  return 1; //?
};

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes;
  };
  const res = blogs.map((n) => n);
  return res.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  const mostLiked = blogs.sort((blogs, b) => b.likes - blogs.likes)[0];

  return {
    title: mostLiked.title,
    author: mostLiked.author,
    likes: mostLiked.likes,
  };
};

module.exports = { dummy, totalLikes, favoriteBlog };
