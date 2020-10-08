/*============================================
; Title:          error.response.js
; Author:         Laurie Mailloux
; Date:           05 October 2020
; Description:    Error Response
;===========================================*/


class ErrorResponse {
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

module.exports = ErrorResponse;