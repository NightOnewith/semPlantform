/**
 * common.js
 */

"use strict";

var Common = (function () {

    //  正则表达式map
    var regExps = {
        //  邮箱
        mail: /^\w+[\+\.\w-]*@([\w-]+\.)*\w+[\w-]*\.([a-z]{2,4}|\d+)$/i,

        //  手机号
        mobile: /^(1[0-9]{2})\d{8}$/,

        //  整数
        digital: /^\d+$/,

        //  网址
        url: new RegExp("((http|ftp|https)://)(([a-zA-Z0-9\._-]+\.[a-zA-Z]{2,6})|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,4})*(/[a-zA-Z0-9\&%_\./-~-]*)?")
    };

    return {

        /**
         * date bug safri prefix
         * @param date
         * @return {Date}
         * @constructor
         */
        Date: function (date) {
            if(/^\d+$/g.test(date)) {
                return new Date(parseInt(date));
            } else if(("" + date).indexOf(/\D/) > -1) {
                return new Date(parseInt(date));
            }
            return (date instanceof Date) ? date : (date !== undefined ? new Date(("" + date).replace(/\-/g, "/")) : new Date);
        },

        /**
         * get date info
         * @param date
         * @return {string}
         */
        getDate: function (date) {
            date = this.Date(date);
            var _year = date.getFullYear(),
                _month = date.getMonth() + 1,
                _date = date.getDate(),
                _hour = date.getHours(),
                _minute = date.getMinutes(),
                _second = date.getSeconds();
            return [_year, _month, _date].map(this.toDouble).join("-") +
                    " " +
                    [_hour, _minute, _second].map(this.toDouble).join(":");
        },

        /**
         * transfer to double digit number
         * @param num
         * @return {string}
         */
        toDouble: function (num) {
            return num > 9 ? num : ("0" + num);
        },

        /**
         * 检测数据类型
         * @param type
         * @param val
         * @return {boolean}
         */
        check: function (type, val) {
            return regExps[type].test(val);
        },

        /**
         * 生成随机key
         * @return {string}
         */
        randomKey: function () {
            return Math.random().toString(36).slice(2) + (new Date().getTime());
        }

    };

})();
