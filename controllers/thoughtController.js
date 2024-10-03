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
  async getSingleVideo(req, res) {
    try {
      const video = await Video.findOne({ _id: req.params.videoId })

      if (!video) {
        return res.status(404).json({ message: 'No video with that ID' });
      }

      res.json(video);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new video
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
  },
  async deleteVideo(req, res) {
    try {
      const video = await Video.findOneAndRemove({ _id: req.params.videoId });

      if (!video) {
        return res.status(404).json({ message: 'No video with this id!' });
      }

      const user = await User.findOneAndUpdate(
        { videos: req.params.videoId },
        { $pull: { videos: req.params.videoId } },
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'Video created but no user with this id!' });
      }

      res.json({ message: 'Video successfully deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Add a video response
  async addVideoResponse(req, res) {
    try {
      const video = await Video.findOneAndUpdate(
        { _id: req.params.videoId },
        { $addToSet: { responses: req.body } },
        { runValidators: true, new: true }
      );

      if (!video) {
        return res.status(404).json({ message: 'No video with this id!' });
      }

      res.json(video);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Remove video response
  async removeVideoResponse(req, res) {
    try {
      const video = await Video.findOneAndUpdate(
        { _id: req.params.videoId },
        { $pull: { reactions: { responseId: req.params.responseId } } },
        { runValidators: true, new: true }
      )

      if (!video) {
        return res.status(404).json({ message: 'No video with this id!' });
      }

      res.json(video);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
