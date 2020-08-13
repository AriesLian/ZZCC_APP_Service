/**
 * 系统核心配置
 * @author Aries
 */


module.exports = {


    APP: {
      PORT: 3388
    },
  
  
    SESSION: {
      SECRET_KEY: 'ASFegasha238!!23@#na'
    },
  
  
    JWT: {
      SECRET_KEY: 'DSF#tasdf9)93+12$!'
    },
  
  
    LOG: {
      //1:error
      //2:error,warn
      //3:error,warn,info
      //4:error,warn,info,log
      LEVEL: 4
    },
  
  
    MYSQL: {
      CONNECTION_LIMIT: 10,
      HOST: '10.10.10.10',
      PORT: '',
      DATABASE: 'zc',
      USER: 'zc',
      PASSWORD: 'asdfa#@%SDF3q'
    },
  
  
    REDIS: {
      HOST: '10.10.10.10',
      PORT: 6379,
      DB: '',
      PASSWORD: 'ASDFfa23r@#FASF23r',

      ACCESS_TOKEN_EXPIRE_TIME: 60 * 60 * 2,
      APP_TEMP_KEY_PAIRS_EXPIRE_TIME: 60
    },
  
  
    ALI_OSS: {
      REGION_ID: 'asd;flkj',
      ACCESS_KEY_ID: 'Aries',
      ACCESS_KEY_SECRET: 'asdfljasljehF@#RDFfasdf',
      BUCKET: 'asdf32fasdf32@!4@',
      DIR: 'aries',
    },
  
  
    BROP: {
      URL: 'http://10.10.10.10:999/',
      MAINTAIN_CONTRACT: '0x00000000004c58a23412',
      REGION_ID: '0x00000faaaa123142390123f'
    },
  
  
    MESSAGE: {
      //所有以10开始的均为成功访问(STATUS)
      10000: 'success',
  
      //11000 Server error
      //所有以11开始的均为服务器端错误(FATAL)
      11000: '服务器错误',
  
      //12000 Database error
      //所有以12开始的均为数据库错误(FATAL)
      12000: '数据库错误',
  
      //13000 Developer operation error
      //所有以13开始的均为开发者编写错误(WARNING)
      13000: '未知的方法名',
      13001: '请求方式错误',
      13002: '非法参数',
      13003: 'JSON格式错误',
      13004: '某个或某几个请求参数不能为空',
      13005: '时间格式错误',
      13006: '分页值应为自然数且page_index>=1 && 1<=page_size<=100',
      13007: 'page_size或page_index应为数值型',
      13008: '解密失败',
  
      //14000 User operation error
      //所有以14开始的均为用户操作错误(INFORMATIONAL)
      14000: '无访问权限',
      14001: '帐号密码不匹配',
      14002: '非法访问',
      14003: '重复提交',
      14004: '用户不存在',
      14005: '用户已存在',
      14006: '操作太频繁',
      14007: '手机号格式错误',
      14008: '邮箱格式错误',
      14009: '邮箱已存在',
      14010: '手机号已存在',
      14011: '密码错误',
      14012: 'access_token不存在或已过期',
      14013: '帐号名不合法',
      14014: '密码格式不对'
  
  
    }
  
  
  }