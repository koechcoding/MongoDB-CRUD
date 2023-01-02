const express = require('express')
const router = express.Router()
const BlogModel = require('../model/Blog')

//GET ALL BLOG
router.get('/', async (req, res) => {

    try {

        const blog = await BlogModel.find();

        res.status(200).json({
            success: true,
            message: 'get All Blog',
            data: blog
        });

    } catch (e) {
        res.status(501).json({
            "success": false,
            "message": "Something went wrong!!",
            "data": e.toString()
        });
    }


})

//GET SINGLE BLOG
router.get("/getSingleBlog/:id", async (req,res) => {

    try {

        const resData = await BlogModel.findById(req.params.id);

        res.status(200).json({
            success: true,
            message: 'get Single Blog',
            data: resData
        });

    } catch(e) {
        res.status(501).json({
            "success": false,
            "message": "Something went wrong!!",
            "data": e.toString()
        });
    }


});

//CREATE BLOG
router.post("/create",async (req,res) => {

    const {title,description} = req.body;

    //validation
    if (!title || !description) {
        res.status(400).json({
            "success": false,
            "message": "Content can not be empty!!",
            "data": ''
        });
    }

    //Create Blog
    const user = new BlogModel({
        title: req.body.title,
        description: req.body.description
    });

    //Save Blog in the DataBase
    await user.save((error,response) => {
        if(error) {
            res.status(501).json(error.toString());
        }

        res.status(200).json({
            "success": true,
            "message": "Blog created successfully!!",
            "data": response
        });

    })

});

//UPDATE BLOG
router.put("/update/:id",async (req,res) => {
    BlogModel.findOneAndUpdate({ _id: req.params.id },
        {
            $set: {
                title: req.body.title,
                description: req.body.description
            },
        },
        {
            new: true,  //for get update data in response
            userFindAndModify:false
        },
        (err, response) => {
            if (err) {
                res.send(err);
            } else{
                res.json(response);
            }
        }
    );
})

//DELETE BLOG
router.delete("/delete/:id",async (req,res)=> {
    BlogModel.deleteOne({ _id: req.params.id },(e,response)=> {
        if(e) {
            res.status(501).json({
                "success": false,
                "message": "Something went wrong!!",
                "data": e.toString()
            });
        }

        res.status(200).json({
            "success": false,
            "message": "deleted Successfully!!",
            "data": response
        });

    })
})

//CREATE MULTIPLE
router.post('/create/all', async (req,res) => {
    await BlogModel.insertMany(req.body, (err,response)=> {
        if(err) {
            res.status('501').json(err.toString());
        } else {
            res.status('200').json("Inserted Successfully.")
        }
    })
})

module.exports = router