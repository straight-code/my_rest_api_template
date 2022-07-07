const Joi = require('joi');
const express = require('express');
const { runInNewContext } = require('vm');
const api = express();

api.use(express.json());

const courses = [
    { id: 1, name: 'course1'},
    { id: 2, name: 'course2'},
    { id: 3, name: 'course3'},
    { id: 4, name: 'course4'}

]; 

api.get('/', (req, res) => {
    res.sendFile(__dirname + '/main.html');
});

api.get('/api', (req, res) => {
    res.sendFile(__dirname + '/api.html');

});

api.get('/api/courses', (req, res) => {
    res.send(courses);
});

api.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).sendFile(__dirname + '/404.html');
    res.send(course);
});

api.post('/api/courses', (req, res) => {

    const { error } = validateCourse(req.body);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

api.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).sendFile(__dirname + '/404.html');

    const { error } = validateCourse(req.body);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }
});

api.delete('/api/courses/:id', (req, res) => {
    
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send(error.details[0].message);
        

    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);
})

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
}



const port = process.env.PORT || 2828;
api.listen(port, () => console.log(`server online @ http://localhost:${port}/api`))