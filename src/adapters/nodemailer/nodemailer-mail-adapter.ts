import nodemailer from 'nodemailer';
import { env } from 'process';

import { MailAdapter, SendMailData } from "../email-adapter";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: env.MAILER_USER,
        pass: env.MAILER_PASS
    }
});

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({ subject, body }: SendMailData) {
        await transport.sendMail({
            from: "Feedget <contato@feedget.net",
            to: "Breno <mrodrigues.breno@gmail.com",
            subject,
            html: body,
        });
    };
}