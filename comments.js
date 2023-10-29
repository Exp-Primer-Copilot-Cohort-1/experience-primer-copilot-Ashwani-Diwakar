// Create web server

const express = require('express');
const router = express.Router();

const Comment = require('../models/comment');

router.get('/', (req, res) => {
    Comment.find({}, (err, comments) => {
        if (err) {
            console.log(err);
        } else {
            res.json(comments);
        }
    });
});

router.get('/:id', (req, res) => {
    Comment.findById(req.params.id, (err, comment) => {
        if (err) {
            console.log(err);
        } else {
            res.json(comment);
        }
    });
});

router.post('/', (req, res) => {
    let comment = new Comment(req.body);
    comment.save()
        .then(comment => {
            res.status(200).json({'comment': 'Added successfully'});
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
});

router.put('/:id', (req, res) => {
    Comment.findById(req.params.id, (err, comment) => {
        if (!comment) {
            return next(new Error('Could not load document'));
        } else {
            comment.comment = req.body.comment;
            comment.save()
                .then(comment => {
                    res.json('Update done');
                })
                .catch(err => {
                    res.status(400).send('Update failed');
                });
        }
    });
});


router.delete('/:id', (req, res) => {
    Comment.findByIdAndRemove(req.params.id, (err, comment) => {
        if (err) {
            res.json(err);
        } else {
            res.json('Remove successfully');
        }
    });
});


module.exports = router;