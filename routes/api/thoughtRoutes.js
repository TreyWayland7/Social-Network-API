const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateVideo,
} = require('../../controllers/thoughtController');

router.route('/').get(getThoughts).post(createThought);

router.route('/:thoughtId').get(getSingleThought);

module.exports = router;
