const express = require("express");
const router = express.Router();
const Post = require("./models/Post");

router.get("/posts", async(req, res) => {

       const posts = await Post.find();
       return res.send(posts);

});

router.post("/posts", async(req, res) => {

    const post = new Post({
      title: req.body.title,
      content: req.body.content
    });

    await post.save();
    return res.send(post);
});
  
router.get("/posts/:id", async (req, res) => {
       try{
           const post = await Post.findOne({_id: req.params.id})
           return res.send(post);
       }
       catch(error){
           return res.status(400).send({error: "Post doesn't exist!"});
       }
})

router.patch("/posts/:id", async (req, res) => {
    try {
      const post = await Post.findOne({ _id: req.params.id });
  
      if (req.body.title) {
        post.title = req.body.title;
      }
  
      if (req.body.content) {
        post.content = req.body.content;
      }
  
      await post.save();
      return res.send(post);
    } catch {
      return res.status(400).send({error: "Post doesn't exist!"});
    }
});

router.delete("/posts/:id", async (req, res) => {
    try {
      await Post.deleteOne({_id: req.params.id});
      return res.status(204).send();
    } catch {
      return res.status(404).send({ error: "Post doesn't exist!"});
    }
});

module.exports = router;