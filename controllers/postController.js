const posts = require('../data/posts')


const index = (req, res) => {
    let filteredPosts = posts;
    if (req.query.tag) {
        filteredPosts = posts.filter(post => post.tags.includes(req.query.tag));
    }
    res.json(filteredPosts);
}

const show = (req, res) => {
    const id = Number(req.params.id);
    const post = posts.find(post => post.id === id);
    if (!post) {

        res.status(404);

        return res.json({
            status: 404,
            error: "Not Found",
            message: "Post not found"
        })
    }

    res.json(post);
}

const store = (req, res) => {

    const newId = posts[posts.length - 1].id + 1;

    const newPost = {
        id: newId,
        title: req.body.title,
        body: req.body.body,
        img: req.body.img,
        tags: req.body.tags
    }

    posts.push(newPost);

    console.log(posts);

    res.status(201);

    res.json(newPost);
}


const update = (req, res) => {

    const id = parseInt(req.params.id);

    const post = posts.find(post => post.id === id);

    if (!post) {
        res.status(404);
        return res.json({
            error: "Not Found",
            message: "Post not found"
        })
    }

    post.title = req.body.title;
    post.body = req.body.body;
    post.img = req.body.img;
    post.tags = req.body.tags;

    console.log(posts);

    res.json(post);

    //status 200 è già quello giusto

}


const modify = (req, res) => {
    res.send('Aggiorna parzialmente il post con id = ' + req.params.id);
}


const destroy = (req, res) => {
    const id = Number(req.params.id);
    const post = posts.find(post => post.id === id);
    if (!post) {

        res.status(404);

        return res.json({
            status: 404,
            error: "Not Found",
            message: "Post not found"
        })
    }

    posts.splice(posts.indexOf(post), 1);
    console.log(posts);
    res.sendStatus(204);
}

module.exports = {
    index,
    show,
    store,
    update,
    modify,
    destroy
}