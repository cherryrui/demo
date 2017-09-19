/**
 * Created by 17272 on 2017/9/18.
 */
import request from 'request';

export default class ReqTool {
    static async reqKitMethod({options}) {
        return await new Promise((resolve, reject) => {
            request(options, (error, response, data) => {
                if (!error && response.statusCode === 200) {
                    resolve(data);
                } else {
                    reject(new Error(error));
                }
            });
        });
}
}

export {ReqTool};