const express = require('express');
const movieRouter = express.Router();
const {} = require("")


movieRouter.post('/movies/:movieId/reviews', authVerify, async (req, res) => {
  try {
    const movieId = req.params.movieId;
    const { userId, rating, review } = req.body;
    const updatedMovie = await addRatingAndReview(movieId, userId, rating, review);
    res.json({success:true, movie:updatedMovie});
  } catch (error) {
    res.status(404).json({ error: 'Movie not found' });
  }
});

movieRouter.get('/movies/:movieId/reviews', async (req, res) => {
  try {
    const movieId = req.params.movieId;
    const reviewsWithUserDetails = await getMovieReviewsWithUserDetails(movieId);
    res.json({success:true, reviews:reviewsWithUserDetails});
  } catch (error) {
    res.status(404).json({ error: 'Movie not found' });
  }
});

module.exports = movieRouter;
