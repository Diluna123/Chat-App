import { RowDataPacket } from 'mysql2';
import db from '../db';
import { Router } from 'express';

const router = Router();

router.post('/login', (req, res) => {
    const { mobile, password } = req.body;

    db.query("SELECT * FROM user WHERE user.mobile = ? AND user.password = ?", [mobile, password], (err, results: RowDataPacket[]) => {
        if (!err) {
            console.log(results);
            if (results.length > 0) {
                res.status(200).send({ user: results[0] })

            } else {
                res.status(401).send({ message: "Invalid mobile number or password" })
            }
        } else {
            console.error('Error executing MySQL query:', err.message);
            res.status(500).send(err.message);
        }
    });
});

router.post('/register', (req, res) => {
    const { firstName, lastName, mobile, password } = req.body;

    db.query("SELECT * FROM user WHERE user.mobile = ? ", [mobile], (err, results: RowDataPacket[]) => {
        if (!err) {
            if (results.length > 0) {
                res.status(409).send({ message: "Mobile number already exists" })
            } else {
                db.query("INSERT INTO user (mobile, fname, lname, password) VALUES (?,?,?,?) ", [mobile, firstName, lastName, password], (err, results) => {
                    if (!err) {
                        res.status(201).send({ message: "User registered successfully" })
                    } else {
                        console.error('Error executing MySQL query:', err.message);
                        res.status(500).send(err.message);
                    }
                })

            }
        }
    })





})

export default router;

