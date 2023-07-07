'use strict';

/********************************************************************************************
 *                                                                                          *
 * Plese read the following tutorial before implementing tasks:                             *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_dates#Date_object
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date    *
 *                                                                                          *
 ********************************************************************************************/


/**
 * Parses a rfc2822 string date representation into date value
 * For rfc2822 date specification refer to : http://tools.ietf.org/html/rfc2822#page-14
 *
 * @param {string} value
 * @return {date}
 *
 * @example:
 *    'December 17, 1995 03:24:00'    => Date()
 *    'Tue, 26 Jan 2016 13:48:02 GMT' => Date()
 *    'Sun, 17 May 1998 03:00:00 GMT+01' => Date()
 */
function parseDataFromRfc2822(value) {
    return new Date(value);
}

/**
 * Parses an ISO 8601 string date representation into date value
 * For ISO 8601 date specification refer to : https://en.wikipedia.org/wiki/ISO_8601
 *
 * @param {string} value
 * @return {date}
 *
 * @example :
 *    '2016-01-19T16:07:37+00:00'    => Date()
 *    '2016-01-19T08:07:37Z' => Date()
 */
function parseDataFromIso8601(value) {
    return new Date(value);
}


/**
 * Returns true if specified date is leap year and false otherwise
 * Please find algorithm here: https://en.wikipedia.org/wiki/Leap_year#Algorithm
 *
 * @param {date} date
 * @return {boolean}
 *
 * @example :
 *    Date(1900,1,1)    => false
 *    Date(2000,1,1)    => true
 *    Date(2001,1,1)    => false
 *    Date(2012,1,1)    => true
 *    Date(2015,1,1)    => false
 */
function isLeapYear(date) {
    const year = new Date(date).getFullYear();
    return (year % 4 === 0);
    // wrong
}


/**
 * Returns the string represention of the timespan between two dates.
 * The format of output string is "HH:mm:ss.sss"
 *
 * @param {date} startDate
 * @param {date} endDate
 * @return {string}
 *
 * @example:
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,11,0,0)   => "01:00:00.000"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,10,30,0)       => "00:30:00.000"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,10,0,20)        => "00:00:20.000"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,10,0,0,250)     => "00:00:00.250"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,15,20,10,453)   => "05:20:10.453"
 */
function timeSpanToString(startDate, endDate) {
    let year1 = new Date(startDate).getFullYear();
    let year2 = new Date(endDate).getFullYear();
    let month1 = new Date(startDate).getMonth();
    let month2 = new Date(endDate).getMonth();
    let day1 = new Date(startDate).getDate();
    let day2 = new Date(endDate).getDate();
    let hour1 = new Date(startDate).getHours();
    let hour2 = new Date(endDate).getHours();
    let min1 = new Date(startDate).getMinutes();
    let min2 = new Date(endDate).getMinutes();
    let sec1 = new Date(startDate).getSeconds();
    let sec2 = new Date(endDate).getSeconds();
    let ms1 = new Date(startDate).getMilliseconds();
    let ms2 = new Date(endDate).getMilliseconds();
    let ms = (ms2 - ms1) + (sec2 - sec1) * 1000 + (min2 - min1) * 1000 * 60 + (hour2 - hour1) * 1000 * 60 * 60 + (day2 - day1) * 1000 * 60 * 60 * 24;

    let str = String();
    if (Math.trunc(ms / (1000 * 60 * 60)) < 10) {
        str += "0";
    }
    str += Math.trunc(ms / (1000 * 60 * 60)) + ":";
    ms -= Math.trunc(ms / (1000 * 60 * 60)) * 1000 * 60 * 60;

    if (Math.trunc(ms / (1000 * 60)) < 10) {
        str += "0";
    }
    str += Math.trunc(ms / 1000 * 60) + ":";
    ms -= Math.trunc(ms / (1000 * 60)) * 1000 * 60;

    if (Math.trunc(ms / (1000)) < 10) {
        str += "0";
    }
    str += Math.trunc(ms / 1000) + ".";
    ms -= Math.trunc(ms / (1000)) * 1000;
    for (let i = 1000; i > 10; i /= 10) {
        if (ms / i === 0) {
            str += "0";
        }
    }
    str += ms;
    return str;
    // wrong
}


/**
 * Returns the angle (in radians) between the hands of an analog clock for the specified Greenwich time.
 * If you have problem with solution please read: https://en.wikipedia.org/wiki/Clock_angle_problem
 *
 * @param {date} date
 * @return {number}
 *
 * @example:
 *    Date.UTC(2016,2,5, 0, 0) => 0
 *    Date.UTC(2016,3,5, 3, 0) => Math.PI/2
 *    Date.UTC(2016,3,5,18, 0) => Math.PI
 *    Date.UTC(2016,3,5,21, 0) => Math.PI/2
 */
function angleBetweenClockHands(date) {
    let hr = new Date(date).getUTCHours();
    let min = new Date(date).getUTCMinutes();
    if (hr >= 12) {
        hr -= 12;
    }
    if (min >= 12) {
        min -= 12;
    }
    //return (Math.abs(12/2 - Math.abs(min-hr)))/12*Math.PI;
    let hrr = (hr / 12) * Math.PI;
    let minr = (min / 12) * Math.PI;
    return Math.abs((Math.PI * Number((Math.abs(hrr - minr) > Math.PI)) - Math.abs(hrr - minr)));
    // wrong
}


module.exports = {
    parseDataFromRfc2822: parseDataFromRfc2822,
    parseDataFromIso8601: parseDataFromIso8601,
    isLeapYear: isLeapYear,
    timeSpanToString: timeSpanToString,
    angleBetweenClockHands: angleBetweenClockHands
};
