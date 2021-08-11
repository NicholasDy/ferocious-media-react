const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// email setup
const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

const mailgunAuth = {
    auth: {
        api_key: 'key-5b39db9eb9bccb75ac9dce23068a91d2',
        domain: 'mg.virtuosoacquisition.com',
    },
};

const smtpTransport = nodemailer.createTransport(mg(mailgunAuth));

// @route       POST api/emails
// @description Post new email
// @access      Public
router.post(
    '/',
    [
        [
            check('fullName', 'Name is Required').not().isEmpty(),
            check('phone', 'Last Name is Required').not().isEmpty(),
            check('email', 'Emails is Required').not().isEmpty(),
            check('message', 'Message is Required').not().isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const emailTemplateSource = fs.readFileSync(
                path.join(__dirname, '../../htmltemplates/email-template.hbs'),
                'utf8'
            );
            const template = handlebars.compile(emailTemplateSource);

            const htmlToSend = template({
                fullName: `${req.body.fullName}`,
                phone: `${req.body.phone}`,
                email: `${req.body.email}`,
                address: `${req.body.address}`,
                message: `${req.body.message}`,
            });

            const mailOptions = {
                from: `"${req.body.fullName}" <${req.body.email}>`,
                to: `evangoldberg@gmail.com`,
                subject: 'Submission from Damstrong Website',
                html: htmlToSend,
            };

            smtpTransport.sendMail(mailOptions, (err, data) => {
                if (err) {
                    res.json({
                        msg: 'fail',
                    });
                } else {
                    res.json({
                        msg: 'success',
                    });
                }
            });
        } catch (err) {
            console.error(err.messsage);
            res.status(500).send('Server Error Sending Email');
        }
    }
);

module.exports = router;
