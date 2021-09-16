const express = require('express');
const Joi = require('joi');
const mysql = require('mysql');
const bcrypt = require('bcrypt')

const pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sk_ispit'
});

const route = express.Router();

const sema = Joi.object().keys({
    user: Joi.string().trim().min(4).max(12).required(),
    title: Joi.string().max(512).required(),
    due_date: Joi.string().required(),
    category: Joi.string().required()
});

const sema1 = Joi.object().keys({
    username: Joi.string().trim().min(4).max(24).required(),
    password: Joi.string().trim().min(4).max(60).required()
});

const sema2 = Joi.object().keys({
    category: Joi.string().required()
});

route.use(express.json());

route.get('/user', (req, res) => {
    pool.query('select * from user', (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else
            res.send(rows);
    });
});
route.post('/adduser', async (req, res) => {
    let {error} = Joi.validate(req.body, sema1);
    if (error)
        res.status(400).send(error.details[0].message);
    else {
        let query = "insert into user (username, password) values (?, ?)";
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        let formated = mysql.format(query, [req.body.username, hashedPassword]);

        pool.query(formated, (err, response) => {
            if (err)
                res.status(500).send(err.sqlMessage);
            else {
                query = 'select * from user where id=?';
                formated = mysql.format(query, [response.insertId]);

                pool.query(formated, (err, rows) => {
                    if (err)
                        res.status(500).send(err.sqlMessage);
                    else
                        res.send(rows[0]);
                });
            }
        });
    }
});

route.post('/user/login', (req, res) => {

    let { error } = Joi.validate(req.body, sema1);
    if (error)
        res.status(400).send(error.details[0].message);
    else{
        let query = 'select * from user where username=?';
        let formated = mysql.format(query, [req.body.username]);

        pool.query(formated,  async (err, rows) => {
            if (err)
                res.status(401).send();
            else
                try {
                    if (await bcrypt.compare(req.body.password, rows[0].password)) {
                        res.status(200).send(req.body)
                    } else {
                        res.status(401 ).send()
                    }
                } catch {
                    res.status(500).send()
                }
        });
    }

});

route.delete('/user/:id', (req, res) => {
    let query = 'select * from user where id=?';
    let formated = mysql.format(query, [req.params.id]);

    pool.query(formated, (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else {
            let user = rows[0];
            let query = 'delete from user where id=?';
            let formated = mysql.format(query, [req.params.id]);

            pool.query(formated, (err, rows) => {
                if (err)
                    res.status(500).send(err.sqlMessage);
                else
                    res.send(user);
            });
        }
    });
});
route.get('/todo', (req, res) => {
    pool.query('select * from todo', (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else
            res.send(rows);
    });
});

route.get('/todo/:user', (req, res) => {
    let query = 'select * from todo where user=?';
    let formated = mysql.format(query, [req.params.user]);

    pool.query(formated, (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else
            res.send(rows);
    });
});

route.get('/todos/:id', (req, res) => {
    let query = 'select * from todo where id=?';
    let formated = mysql.format(query, [req.params.id]);

    pool.query(formated, (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else
            res.send(rows[0]);
    });
});
route.post('/todo', (req, res) => {
    let { error } = Joi.validate(req.body, sema);

    if (error)
        res.status(400).send(error.details[0].message);
    else {
        let query = "insert into todo (user, title, due_date, category) values (?, ?,?,?)";
        let formated = mysql.format(query, [req.body.user, req.body.title, req.body.due_date, req.body.category]);

        pool.query(formated, (err, response) => {
            if (err)
                res.status(500).send(err.sqlMessage);
            else {
                query = 'select * from todo where id=?';
                formated = mysql.format(query, [response.insertId]);

                pool.query(formated, (err, rows) => {
                    if (err)
                        res.status(500).send(err.sqlMessage);
                    else
                        res.send(rows[0]);
                });
            }
        });
    }
});
route.put('/todo/:id', (req, res) => {
    let { error } = Joi.validate(req.body, sema);

    if (error)
        res.status(400).send(error.details[0].message);
    else {
        let query = "update todo set user=?, title=?, due_date=?, category=? where id=?";
        let formated = mysql.format(query, [req.body.user, req.body.title,req.body.due_date,req.body.category, req.params.id]);

        pool.query(formated, (err, response) => {
            if (err)
                res.status(500).send(err.sqlMessage);
            else {
                query = 'select * from todo where id=?';
                formated = mysql.format(query, [req.params.id]);

                pool.query(formated, (err, rows) => {
                    if (err)
                        res.status(500).send(err.sqlMessage);
                    else
                        res.send(rows[0]);
                });
            }
        });
    }

});

route.delete('/todo/:id', (req, res) => {
    let query = 'select * from todo where id=?';
    let formated = mysql.format(query, [req.params.id]);

    pool.query(formated, (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else {
            let poruka = rows[0];

            let query = 'delete from todo where id=?';
            let formated = mysql.format(query, [req.params.id]);

            pool.query(formated, (err, rows) => {
                if (err)
                    res.status(500).send(err.sqlMessage);
                else
                    res.send(poruka);
            });
        }
    });
});

route.get('/category', (req, res) => {
    pool.query('select * from category', (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else
            res.send(rows);
    });
});

module.exports = route;