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

const listBySearch = async (req, res) => {
    const { q } = req.query;
    if(!q) {
        const allPosts = await postService.listPosts()
    return res.status(200).json(allPosts);
    }
    const posts = await postService.getBySearch(`${q}`)
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

// const deletePost = async (req, res) => {
//     try{
//         const { id } = req.params;
//         const  { displayName } = req.user
//         const [post] = await postService.getById(id)
//         const postOwner = post.user.displayName
//         if(displayName !== postOwner){
//                 return res.status(201).json({ message: 'Unauthorized user'})
//     }
//         if(!post || post === undefined) {
//             return res.status(404).json({ message: 'Post does not exist'})
//         }
//     // await postService.deleted(id)
//     // res.status(204).end();
//     res.status(200).json(postOwner);
// } catch (error) {
//     res.status(500).json({ message: error.message})
// }
// }
// const registerPost = async (req, res) => {
//     const { title, content, categoryIds } = req.body;
//     const { id } = req.user
//     const posts = await postService.createPosts(title, content, id, categoryIds)
//     res.status(201).json(posts)
// }

module.exports = {
    listAll,
    listById,
    listBySearch,
    updatePost,
    // deletePost,
    // registerPost,
}