const { Category } = require('../models/category');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) => {
    const categoryList = await Category.find();

    if (!categoryList) {
        res.status(500).json({ success: false })
    }
    res.status(200).send(categoryList);
})
router.get(`/:id`, async (req, res) => {
    const category = await Category.findById(req.params.id);

    if (!category) {
        res.status(500).json({ success: false, message: "Category mot found!" })
    }
    res.status(200).send(category);
})

router.post('/', async (req, res) => {
    let category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color,
    })
    category = await category.save();

    if (!category) {
        return res.status(404).send('The category cannot be created!');
    }
    res.send(category);
})

router.delete('/:id', async (req, res) => {
    try {
        let deletedCategory = await Category.findByIdAndRemove(req.params.id) // get id param from frontend
        if (!deletedCategory) {
            return res.status(404).json({ success: false, message: 'category not found!' });
        }
        return res.status(200).json({ success: true, message: 'Category deleted' });
    } catch (err) {
        return res.status(400).json({ success: false, error: err });

    }
})

router.put('/:id', async (req, res) => {
    try{
    const category = await Category.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            icon: req.body.icon,
            color: req.body.color,
        },
        {new : true} // this mean that I want to return the new updated data not the old one
    )

    if (!category) {
        return res.status(404).send('The category cannot be updated!');
    }
    res.send(category);
}
catch(err){
    console.log("ERRRRRRRRRRRRR" , err)
}
})

module.exports = router;