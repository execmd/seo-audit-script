function ord(string) {
    var str = string + '';
    var code = str.charCodeAt(0);
    if (0xD800 <= code && code <= 0xDBFF) {
        var hi = code;
        if (str.length === 1) {
            return code;
        }
        var low = str.charCodeAt(1);
        return ((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000;
    }
    if (0xDC00 <= code && code <= 0xDFFF) {
        return code;
    }
    return code;
}

function str2num(string, check, magic) {
    var int32unit = 4294967296; //2^32
    var length = string.length;
    for (var i = 0; i < length; i++) {
        check *= magic;
        if (check >= int32unit) {
            check = (check - int32unit * parseInt(check / int32unit));
            check = (check < -2147483648) ? (check + int32unit) : check;
        }
        check += ord(string[i]);
    }

    return check;
}

function hashURL(string) {
    var check1, check2, t1, t2;
    check1 = str2num(string, 0x1505, 0x21);
    check2 = str2num(string, 0, 0x1003F);
    check1 >>= 2;
    check1 = ((check1 >> 4) & 0x3FFFFC0 ) | (check1 & 0x3F);
    check1 = ((check1 >> 4) & 0x3FFC00 ) | (check1 & 0x3FF);
    check1 = ((check1 >> 4) & 0x3C000 ) | (check1 & 0x3FFF);
    t1 = ((((check1 & 0x3C0) << 4) | (check1 & 0x3C)) << 2) | (check2 & 0xF0F);
    t2 = ((((check1 & 0xFFFFC000) << 4) | (check1 & 0x3C00)) << 0xA) | (check2 & 0xF0F0000);

    return (t1 | t2);
}

function checkHash(hashNum) {
    var checkByte = 0,
        flag = 0,
        hashStr = (hashNum >>> 0).toString(),
        length = hashStr.length;

    for (var i = length - 1; i >= 0; i --) {
        var re = parseInt(hashStr[i]);
        if (1 === (flag % 2)) {
            re += re;
            re = parseInt((re / 10) + (re % 10));
        }
        checkByte += re;
        flag++;
    }

    checkByte %= 10;
    if (0 !== checkByte) {
    checkByte = 10 - checkByte;
        if (1 === (flag % 2)) {
            if (1 === (checkByte % 2)) {
                checkByte += 9;
            }
            checkByte >>= 1;
        }
    }

    return '7' + checkByte + hashStr;
}

module.exports =  function(url) {
    return checkHash(hashURL(url));
};

