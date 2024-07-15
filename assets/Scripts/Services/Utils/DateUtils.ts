/**
 * 格式化日期选项
 */
export class DateFormatOption {
    "M+": number;//月
    "d+": number;//日
    "H+": number;//小时
    "m+": number;//分
    "s+": number;//秒
    "q+": number;//季度
    "S+": number;//毫秒
}

export class DateUtils {
    constructor() {
 
    }
    /**
     * 格式化日期
     * @param date 日期
     * @param fmt 格式化字符串
     * @returns 字符串
     */
    static formatDate(date: Date, fmt: string) {
        const options = new DateFormatOption();
        options["M+"] = date.getMonth() + 1;
        options["d+"] = date.getDate();
        options["H+"] = date.getHours();
        options["m+"] = date.getMinutes();
        options["s+"] = date.getSeconds();
        options["q+"] = Math.floor((date.getMonth() + 3) / 3);
        options["S+"] = date.getMilliseconds();
 
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (const i in options) {
            const key = i as keyof DateFormatOption;//转换key格式
            if (new RegExp("(" + i + ")").test(fmt)) {
                let matchZeros="";//补零
                for (let j = 0; j < RegExp.$1.length; j++) {
                    matchZeros+="0";
                }
                const newVal = (matchZeros + options[key]).substr(("" + options[key]).length);
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (options[key]).toString() : newVal);
            }
        }
        return fmt;
    }
 
    /**
     * 获取时间
     * @param timeStamp 时间戳
     * @returns Date对象
     */
    static getDate(timeStamp: number | string) {
        const unixTimestamp = new Date(timeStamp);
        return unixTimestamp;
    }
 
    /**
     * 获取格式化日期的字符串
     * @param timeStamp Unix时间戳
     * @returns 字符串
     */
    static getDateTimeStr(timeStamp: number | string, format: string) {
        const date = this.getDate(timeStamp);
        if (!format) {
            format = "yyyy-MM-dd HH:mm:ss";
        }
        const result = this.formatDate(date, format)
        return result;
    }
 
    /**
     * 获取格式化日期的字符串,最小单位ms
     * @param timeStamp Unix时间戳
     * @returns 字符串
     */
    static getDateTimeMsStr(timeStamp: number | string) {
        const date = this.getDate(timeStamp);
        const format = "yyyy-MM-dd HH:mm:ss.SSS";
        const result = this.formatDate(date, format)
        return result;
    }
}