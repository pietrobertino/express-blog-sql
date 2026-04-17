const posts = require('../data/posts')
const connection = require('../data/db');


const index = (req, res) => {
    const sql = 'SELECT * FROM posts';

    connection.query(sql, (err, posts) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.json(posts);

    });
}

const show = (req, res) => {
    const id = Number(req.params.id);

    const sql = 'SELECT * FROM posts WHERE id = ?';
    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        if (results.length === 0) return res.status(404).json({ error: 'Post not found' });
        res.json(results[0]);
    });
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
    connection.query('SELECT * FROM posts WHERE id = ?', [id], (err, post) => {
        if (!post) return res.status(404).json({ error: 'Post not found' }); //gestisco il caso in cui si provi a cancellare un post che non esiste
        connection.query('DELETE FROM posts WHERE id = ?', [id], (err) => {
            if (err) return res.status(500).json({ error: 'Failed to delete post' });
            res.sendStatus(204)
        });
    })
}

module.exports = {
    index,
    show,
    store,
    update,
    modify,
    destroy
}