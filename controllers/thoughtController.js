const { Thought, User } = require('../models');

module.exports = {
  async getThoughts(req, res) {
    try {
      const thought = await Thought.find();
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: 'Thought created, but found no user with that ID',
        });
      }

      res.json('Created the thought');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async updateVideo(req, res) {
    try {
      const video = await Video.findOneAndUpdate(
        { _id: req.params.videoId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!video) {
        return res.status(404).json({ message: 'No video with this id!' });
      }

      res.json(video);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
};
