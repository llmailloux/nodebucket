/*============================================
; Title:          base-response.js
; Author:         Laurie Mailloux
; Date:           05 October 2020
; Description:    Base Response
;===========================================*/


class BaseResponse {
    constructor(httpCode, message, data){
        this.httpCode = httpCode;
        this.message = message;
        this.data = data;
    }

    toObject(){
        return {
            'httpcode': this.httpCode,
            'message': this.message,
            'data': this.data,
            'timestamp': new Date().toLocaleDateString()
        }
    }
}

module.exports = BaseResponse;
