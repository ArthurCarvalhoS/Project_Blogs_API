const { postService } = require('../services');
const listAll = async (req, res) => {
    const posts = await postService.listPosts(req)
    res.status(200).json(posts);
}
// const registerPost = async (req, res) => {
//     const { title, content, categoryIds } = req.body;
//     const { id } = req.user
//     const posts = await postService.createPosts(title, content, id, categoryIds)
//     res.status(201).json(posts)
// }

module.exports = {
    listAll,
    // registerPost,
}