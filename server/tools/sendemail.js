/**
 * Created by 17272 on 2017/9/18.
 */

// /**
//  * Created by Administrator on 2017/1/16.
//  */
import nodemailer from 'nodemailer';
import schedule from 'node-schedule';
import moment from 'moment';
import _ from 'lodash';

export default class SendEmail {

    static async send({emails}) {
        return new Promise((res,rej) => {
            let result = false;
            var vercode = _.random(1000,9999);
            var times = moment().format('YYYYMMDDHHmmss');
            var config_email = {
                host: 'smtp.exmail.qq.com',
                post: '465',
                secureConnection: true,
                auth: {
                    user: 'gwxry@xh.vc',
                    pass: 'gwxrY201722'
                }
            };
            var transporter = nodemailer.createTransport(config_email);
            var data = {
                from: '皓珈<gwxry@xh.vc>',
                to: emails,
                subject: `验证消息${times}`,
                html: `<h4>验证码为：${vercode}</h4>`
            };
            transporter.sendMail(data, function (err, info) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Message sent' + info.response);
                    result = info;
                }
                res(result);
            });
        });

    }

}

export  { SendEmail };
