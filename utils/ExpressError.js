class ExpressError extends Error{
    constructor(statusCode,message){
        super();//bhai error calss ko inherit kiya hai to uske construtor ko call krne ke liye likha hia
        this.statusCode=statusCode;
        this.message=message;
    }
}

module.exports=ExpressError;