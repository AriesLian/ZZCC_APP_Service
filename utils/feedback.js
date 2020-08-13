/**
 * 本系统响应工具
 * @author Aries
 */


var MESSAGE = require('../CONFIG.JS').MESSAGE;


module.exports = {


    feedback: (code, data) => {
        return { status: code, message: MESSAGE[code], data }
    }


};

