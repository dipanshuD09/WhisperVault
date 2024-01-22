import nodemailer from 'nodemailer';
import auth from '../transporterCreds.js';

const {user, pass} = auth;


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: user,
        pass: pass
    }
});

export default transporter;