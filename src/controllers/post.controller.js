const { postService } = require('../services');

const listAll = async (_req, res) => {
    const posts = await postService.listPosts();
    res.status(200).json(posts);
};

const listById = async (req, res) => {
    const { id } = req.params;
    const [posts] = await postService.getById(id);
    if (!posts) {
        return res.status(404).json({ message: 'Post does not exist' });
    }
    res.status(200).json(posts);
};

const listBySearch = async (req, res) => {
    const { q } = req.query;
    if (!q) {
        const allPosts = await postService.listPosts();
    return res.status(200).json(allPosts);
    }
    const posts = await postService.getBySearch(`${q}`);
    res.status(200).json(posts);
};

const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const userId = req.user.id;
    await postService.update(id, title, content);
    const [updatedPost] = await postService.getById(id);
    if (userId !== updatedPost.user.id) {
        return res.status(401).json({ message: 'Unauthorized user' });
    }
    if (!title || !content) {
        return res.status(400).json({ message: 'Some required fields are missing' });
    }
    res.status(200).json(updatedPost);
};

const deletePost = async (req, res) => {
        const { id } = req.params;
        const userId = req.user.id;
        const [post] = await postService.getById(id)
        if(!post || post === undefined) {
            return res.status(404).json({ message: 'Post does not exist'})
        }
        if(userId !== post.user.id){
                return res.status(401).json({ message: 'Unauthorized user'})
    }
    await postService.deleted(id)
    res.status(204).end();
}

// const registerPost = async (req, res) => {
//     const { title, content, categoryIds } = req.body;
//     const { id } = req.user;
//     const posts = await postService.createPosts(title, content, id, categoryIds)
//     res.status(201).json(posts)
// }

module.exports = {
    listAll,
    listById,
    listBySearch,
    updatePost,
    deletePost,
    // registerPost,
};