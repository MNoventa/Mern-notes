const express = require('express');
const router = express.Router();

const Task = require('../models/task');

router.get('/', async (req, res) => {
    const tasks = await Task.find();
    console.log(tasks)
    res.json(tasks)
})

router.post('/', async (req, res) => {
    const { title, description } = req.body;
    //note: versión extendida:
    // new Task({
    //     title: title,
    //     description: description
    // })

    //note: versión corta:
    const task = new Task({title, description}) 
    await task.save();
    console.log(task)
    res.json({status: 'Task created'});
})

router.put('/:id', async (req, res) => {
    const { title, description } = req.body;
    const newTask = {title, description};
    await Task.findByIdAndUpdate(req.params.id, newTask);
    console.log(req.params.id)
    res.json({status: 'Task updated'});
})

router.delete('/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id)
    res.json({status: 'Tarea eliminada'})
})

router.get('/:id', async (req, res) => {
    const tarea = await Task.findById(req.params.id)
    res.json({tarea})

})

module.exports = router;