const express = require('express');
const Movie= require("../models/movie.model");

async function addReview(movieId, userId, reviewText) {
  try {
    const movie = await Movie.findById(movieId);
    if (movie) {
      const review = {
        user: userId,
        text: reviewText,
      };
      movie.reviews.push(review);
      const updatedMovieWithReview = await movie.save();
      return updatedMovieWithReview;
    } else {
      throw new Error("Movie not found");
    }
  } catch (error) {
    throw error;
  }
}

async function topFiveRating(movieId) {
  try {
    const movie = await Movie.findById(movieId);
    if (movie) {
      return {
        rating: movie.ratings.sort((a,b)=>b-a).slice(0,5),
        reviews:movie.ratings.slice(0,5)
      };
    } else {
      throw new Error("Movie not found");
    }
  } catch (error) {
    throw error;
  }
}

async function lastFiveRating(movieId) {
  try {
    const movie = await Movie.findById(movieId);
    if (movie) {
      return {
        rating: movie.ratings.sort((a,b)=>a-b).slice(0,5),
        reviews:movie.ratings.slice(0,5)
      };
    } else {
      throw new Error("Movie not found");
    }
  } catch (error) {
    throw error;
  }
}


async function getMovieReviewsWithUserDetails(movieId) {
  try {
    const movie = await Movie.findById(movieId).populate({
      path: 'reviews',
      populate: {
        path: 'user', select: 'username profilePictureUrl'
      },
    });
    const reviewsWithUserDetails = movie.reviews.slice(0, 3).map(review => ({
      reviewText: review.text,
      user: review.user,
    }));
    return reviewsWithUserDetails;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addReview,
  topFiveRating,
  lastFiveRating,
  getMovieReviewsWithUserDetails
}