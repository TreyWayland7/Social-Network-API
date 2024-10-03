const router = require('express').Router();
const {
  getThoughts,
  getSingleVideo,
  createThought,
  updateVideo,
  deleteVideo,
  addVideoResponse,
  removeVideoResponse,
} = require('../../controllers/thoughtController');

// /api/videos
router.route('/').get(getThoughts).post(createThought);

// /api/videos/:videoId
// router
//   .route('/:videoId')
//   .get(getSingleVideo)
//   .put(updateVideo)
//   .delete(deleteVideo);

// /api/videos/:videoId/responses
// router.route('/:videoId/responses').post(addVideoResponse);

// /api/videos/:videoId/responses/:responseId
// router.route('/:videoId/responses/:responseId').delete(removeVideoResponse);

module.exports = router;
