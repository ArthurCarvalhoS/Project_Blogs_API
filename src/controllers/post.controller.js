const { postService } = require('../services');
const listAll = async (_req, res) => {
    const posts = await postService.listPosts()
    res.status(200).json(posts);
}

const listById = async (req, res) => {
    const { id } = req.params;
    const [posts] = await postService.getById(id)
    if(!posts) {
        return res.status(404).json({ message: 'Post does not exist'})
    }
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
    listById,
    // registerPost,
}