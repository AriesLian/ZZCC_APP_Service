/**
 * Redis操作工具
 * @author Aries
 */


let { REDIS } = require('../CONFIG.JS');
let host = REDIS.HOST;
let port = REDIS.PORT;
let password = REDIS.PASSWORD;
let redis = require('async-redis').createClient({ host, port, password });


//Commenting for avoiding a large quantity log garbage and huge journal file size.

// if (CONFIG.async_redis.pwd && CONFIG.async_redis.pwd.length > 0) {
//     redis.auth(CONFIG.async_redis.pwd, function () {
//         console.log('redis: auth passed');
//     });
// }
// redis.on('connect', function () {
//     console.log('redis: connect to' + CONFIG.async_redis.host + " port=" + CONFIG.async_redis.port);
// });
// redis.on('ready', function (err) {
//     console.log('redis: ready');
// });
// redis.select(CONFIG.async_redis.select, function (err) {
//     if (err) {
//         console.log('connect fails err=', err);
//         return false;
//     }
//     else {
//         console.log('connect success');
//     }
// });


module.exports = {


    set: async function (key, value, expire = 0) {
        console.log(key, value);
        let rtlval = await redis.set(key, this._checkvalue(value));
        if (expire > 0) {
            this.expire(key, expire);
        }
        return rtlval;
    },


    get: async function (key) {
        return redis.get(key);
    },


    _checkvalue: function (value) {
        let ret = value;
        if (value instanceof Array || value instanceof Object) {
            ret = JSON.stringify(value);
        }
        return ret;
    },


    del: async function (key) {
        return redis.del(key);
    },


    hset: async function (key, subkey, value) {
        return redis.hset(key, subkey, this._checkvalue(value));
    },


    hget: async function (key, subkey) {
        return redis.hget(key, subkey);
    },


    hgetall: async function (key) {
        return redis.hgetall(key);
    },


    hdel: async function (key, subkey) {
        return redis.hdel(key, subkey);
    },


    hexists: async function (key, subkey) {
        return redis.hexists(key, subkey);
    },


    expire: async function (key, second) {
        return redis.expire(key, second);
    },


    persist: async function (key) {
        return redis.persist(key);
    },


    exists: async function (key) {
        return redis.exists(key);
    },


    lrange: async function (key, start, stop) {
        return redis.lrange(key, start, stop);
    },


    lrangetopn: async function (key, topn) {
        let llen = await redis.llen(key);
        return this.lrange(key, -llen, topn - 1);
    },


    lpush: async function (key, value) {
        return redis.lpush(key, this._checkvalue(value));
    },

    rpop: async function (key) {
        let obj = await redis.rpop(key);
        return obj;
    },


    llen: async function (key) {
        return redis.llen(key);
    },


    lock: async function (key, expire) {
        return await redis.set(key, "1", 'NX', 'EX', expire);
    },


    unlock: async function (key) {
        return await redis.del(key);
    },


    incrby: async function (key, val = 1, expire = 0) {
        let ret = await redis.incrby(key, val);
        if (expire > 0) {
            this.expire(key, expire);
        }
        return ret;
    },


    decrby: async function (key, val = 1, expire = 0) {
        let ret = await redis.decrby(key, val);
        if (expire > 0) {
            this.expire(key, expire);
        }
        return ret;
    }


};

