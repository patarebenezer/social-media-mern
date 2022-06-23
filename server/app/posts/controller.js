const e = require("express");
const { default: mongoose } = require("mongoose");
const postModel = require("./model");

module.exports = {
  index: async (req, res) => {
    const { page } = req.query
    try {
      const LIMIT = 4
      const startIndex = (Number(page) - 1) * LIMIT
      const total = await postModel.countDocuments({})
      const posts = await postModel.find().sort({_id: -1}).limit(LIMIT).skip(startIndex);

      res.status(200).json({
        data:posts,
        currentPage: Number(page),
        numberOfPages: Math.ceil(total / LIMIT)
      });
      console.log(page);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  getPostDetail: async(req, res) => {
    const { id } = req.params
    try {
      // if (id.match(/^[0-9a-fA-F]{24}$/)) {
      const post = await postModel.findById(id)
      res.status(200).json(post)
      // }
    } catch (error) {
      res.status(404).json({ message: error.message })
    }
  },

  createPost: async (req, res) => {
    const post = req.body;
    const newPost = new postModel({
      ...post,
      creator: req.userId,
      createdAt: new Date().toISOString(),
    });
    try {
      await newPost.save();
      res.status(200).json(newPost);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  updatePost: async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send("No post with that id");
    const updatedPost = await postModel.findByIdAndUpdate(_id, post, {
      new: true,
    });
    res.json(updatedPost);
  },

  deletePost: async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("No post with that id");
    await postModel.findByIdAndRemove(id);
    res.json({ message: "Data berhasil dihapus!" });
  },

  likePost: async (req, res) => {
    const { id } = req.params;
    if (!req.userId) return res.json({ message: "Silahkan login dulu" });
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("No post with that id");
    const post = await postModel.findById(id);
    const index = post.likeCount.findIndex((id) => id === String(req.userId));
    if (index === -1) {
      post.likeCount.push(req.userId);
    } else {
      post.likeCount = post.likeCount.filter((id) => id !== String(req.userId));
    }
    const updatePost = await postModel.findByIdAndUpdate(id, post, {
      new: true,
    });
    res.json(updatePost);
  },

  getPostsBySearch: async (req, res) => {
    const { searchQuery, tags } = req.query;
    
    try {
      // query untuk ngambil parameter dalam sebuah url, /posts?page=1 maka yg diambil otomatis page=1
      const title = new RegExp(searchQuery, "i"); // jika sebuah text seperti : Text, text, TEXT maka akan otomatis jadi : text
      // const posts = await postModel.find({
      //   $or: [{ title }, { tags: { $in: tags.split(",") } }] // disini pencarian kata demi kata untuk search
      // });
      const posts = await postModel.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ]});
      res.json({ data: posts });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

};
