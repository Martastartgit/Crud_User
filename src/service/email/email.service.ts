import * as nodemailer from 'nodemailer';
import * as emailTemplate from 'email-templates';
import * as path from 'path';
import {config} from '../../config';
import {CodesEnum, UsersActionEnum} from '../../constants';
import {htmlTemplates} from '../../email-templates';
import {customErrors, ErrorHandler} from '../../error';

const contextExtension = {
  frontendUrl: config.FRONTEND_URL
};

const emailParser = new emailTemplate({
  views: {
    root: path.resolve(__dirname, '../../', 'email-templates')
  }
});

const transporter = nodemailer.createTransport({
  service: config.ROOT_EMAIL_SERVICE,
  auth: {
    user: config.ROOT_EMAIL,
    pass: config.ROOT_EMAIL_PASSWORD
  }
});
export class EmailService {
  async sendMail(email: string, action: UsersActionEnum, context: any = {} ): Promise<void> {
    const emailInfo = htmlTemplates[action];

    if (!emailInfo) {
      throw new ErrorHandler(
        CodesEnum.SERVER,
        customErrors.TEMPLATE_NOT_FOUND.message,
        customErrors.TEMPLATE_NOT_FOUND.code);
    }

    Object.assign(context, contextExtension);

    const html = await emailParser.render(emailInfo.templateFileName, context);

    await transporter.sendMail({
      from: `NO REPLY <${config.ROOT_EMAIL}>`,
      to: email,
      subject: emailInfo.subject,
      html
    });

  }
}

export const emailService = new EmailService();

