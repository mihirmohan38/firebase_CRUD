

// function to check if email in format of - anystring@anystring.anystring
function validateEmail(email){
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

// function to check if the input is a number 
function validatePhone(phone){
    return !isNaN(phone)

}

module.exports = {validateEmail, validatePhone} ; 
