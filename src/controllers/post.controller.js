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

const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const { displayName } = req.user
    await postService.update(id, title, content)
    const [updatedPost] = await postService.getById(id)
    if(displayName !== updatedPost.user.displayName){
        return res.status(401).json({ message: 'Unauthorized user'})
    }
    if(!title || !content) {
        return res.status(400).json({ message: 'Some required fields are missing'})
    }
    res.status(200).json(updatedPost)
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
    updatePost,
    // registerPost,
}