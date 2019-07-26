/** 
                        
	RESTfulAPI
	<br />
	<br />nodejs restful api 练习程序。

	@class RESTfulAPI
	
**/
const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());


const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' },
];

/**
 * 这里是默认首页显示方法。
 *
 * @method 首页显示信息
 * @return {String} Returns hello toma!
 */

app.get('/', (req, res) => {
    res.send('Hello toma!');
});

/**
 * 先是课程信息的方法。
 *
 * @method get /api/courses
 * @return {String} Returns 课程信息。
 */

app.get('/api/courses', (req, res) => {
    res.send([1, 2, 3]);
});

/**
 * post信息添加课程信息
 *
 * @method post /api/courses
 * @return {String} Returns 添加好的课程信息。
 */

app.post('/api/courses', (req, res) => {
    const schema = {
        name: Joi.string().min(3).required()
    };

    const result = Joi.validate(req.body, schema);

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

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('not find');
    res.send(course);
});

app.get('/api/courses/:year/:month ', (req, res) => {
    res.send(req.params);
    //res.send(req.query);
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}....`));


