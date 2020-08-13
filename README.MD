### <font color=olive drab>溯源APP服务</font>
> 为面向B&C客户开放的APP提供后台服务
> 基础框架,无实际内容,已中断开发,仅做保存,不提供维护
> 第一次使用Express,非常希望有人能指出我项目结构/小工具/中间件/MySQL表定义/编码风格方面的缺陷,给予我建议并共同探讨共同进步.感谢!!!
---

#### <font color=olive drab>API</font>
> *仅对拥有API访问权限的用户可见*

* 基础功能
    * [注册](http://rap2.taobao.org/repository/editor?id=254290&mod=380684&itf=1574326)
    * [登录](http://rap2.taobao.org/repository/editor?id=254290&mod=380684&itf=1574331)
    * [登出](http://rap2.taobao.org/repository/editor?id=254290&mod=380684&itf=1574335)
    * [获取临时公钥](http://rap2.taobao.org/repository/editor?id=254290&mod=380684&itf=1610183)

* 广告功能
    * [获取广告](http://rap2.taobao.org/repository/editor?id=254290&mod=381322&itf=1577521)

* 日志功能
    * [获取加密的云码的查询日志](http://rap2.taobao.org/repository/editor?id=254290&mod=388096&itf=1610380)

* 云码功能

* 用户功能
    * 用户自行修改密码
    > *敏感内容修改应通过短信等手段进行验证*
    * 修改我的信息

---

#### <font color=olive drab>配置文件说明</font>
> 项目根目录下的CONFIG.JS文件

* JWT
access_token密码,可更改,更改后所有用户需重新登录

* REDIS.APP_TEMP_KEY_PAIRS_EXPIRE_TIME
app临时键值对在redis中可保存的时间,unit:s

* LOG
日志级别共分为4级,1级时仅输出ERROR日志,4级时输入所有日志(不输出DEBUG日志)

---

#### <font color=olive drab>其它</font>

---

#### <font color=olive drab>本服务涉及的数据库改动</font>

* 添加app_user表
```sql
SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;
-- ----------------------------
-- Table structure for app_user
-- ----------------------------
DROP TABLE IF EXISTS `app_user`;
CREATE TABLE `app_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `account` varchar(16) NOT NULL COMMENT '帐号',
  `password` varchar(64) NOT NULL COMMENT '密码',
  `creater_id` int(11) DEFAULT NULL COMMENT '创建者id,对应userinfo表中的id',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `account_unique` (`account`)
) ENGINE=InnoDB AUTO_INCREMENT=96 DEFAULT CHARSET=utf8;
SET FOREIGN_KEY_CHECKS = 1;
```

* 添加app_advertisement表
```sql
SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;
-- ----------------------------
-- Table structure for app_advertisement
-- ----------------------------
DROP TABLE IF EXISTS `app_advertisement`;
CREATE TABLE `app_advertisement` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(255) NOT NULL COMMENT '广告图片地址',
  `title` varchar(255) DEFAULT NULL COMMENT '广告标题',
  `content` varchar(255) DEFAULT NULL COMMENT '广告内容',
  `detail_url` varchar(255) DEFAULT NULL COMMENT '广告详情页面',
  `createBy` int(11) DEFAULT NULL COMMENT '创建者,关联userInfo表的userId(可能会调整)',
  `createTime` datetime DEFAULT CURRENT_TIMESTAMP,
  `updateTime` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_usable` tinyint(1) DEFAULT '1' COMMENT '是否可用',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
SET FOREIGN_KEY_CHECKS = 1;
```

* 添加key_pairs表
```sql
SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;
-- ----------------------------
-- Table structure for key_pairs
-- ----------------------------
DROP TABLE IF EXISTS `key_pairs`;
CREATE TABLE `key_pairs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `public_key` varchar(255) NOT NULL,
  `private_key` varchar(512) NOT NULL,
  `create_by` int(11) NOT NULL COMMENT '创建者id,对应userinfo的userid',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8;
SET FOREIGN_KEY_CHECKS = 1;
```

* 添加keys表
``` sql
SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;
-- ----------------------------
-- Table structure for keys
-- ----------------------------
DROP TABLE IF EXISTS `keys`;
CREATE TABLE `keys` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `key` varchar(32) NOT NULL COMMENT 'aes128为16位key',
  `iv` varchar(32) NOT NULL COMMENT 'initialization vector',
  `create_by` int(11) NOT NULL COMMENT '创建者id,对应userinfo的userid',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8;
SET FOREIGN_KEY_CHECKS = 1;
```

---