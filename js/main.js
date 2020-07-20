var user_form = document.querySelector('.user-form');
var elements = document.querySelectorAll('.user-form input');

document.getElementById('submit').addEventListener('click', function (evt) {
    evt.preventDefault();
    clearAll();

    if(!passordValidation(user_form.password.value)) {
        user_form.password.classList.add('invalid');
        var pass_err = getHelperTag(user_form.password);
        pass_err.innerHTML = 'Your password must have number, Uppercase and special Char';
        pass_err.style = 'display : block';
    }

    if(user_form.confirm_password.value !== user_form.password.value) {
        user_form.confirm_password.classList.add('invalid');
        var con_err = getHelperTag(confirm_password);
        con_err.innerHTML = 'This field and password field must be the same';
        con_err.style = 'display : block';
    }

    var birth = user_form.birth_day.value;
    var age = (new Date().getTime() - new Date(birth).getTime()) / (365.25 * 24 * 60 * 60 * 1000) > 18 ;
    if(age < 18) {
        user_form.birth_day.classList.add('invalid');
        var birth_err = getHelperTag(birth_day);
        birth_err.innerHTML = 'Your age must be 18 or more';
        birth_err.style = 'display : block';
    }

    if(!validateEmail(user_form.email.value)) {
        user_form.email.classList.add('invalid');
        var email_err = getHelperTag(email);
        email_err.innerHTML = 'Your email is wrong';
        email_err.style = 'display : block';
    }

    for (var i = 0, element; element = elements[i++];) {
        if(required(element.value)) {
            element.classList.add('invalid');
            var err = getHelperTag(element);
            err.innerHTML = 'This field is required.';
            err.style = 'display : block';
        }
        
    }

    
    
})

function passordValidation(str) {
    if(str == '') {
        return false
    }
    if(str.match(/[a-z]/g) && str.match(/[A-Z]/g) && 
        str.match(/[0-9]/g) && str.match(/[^a-zA-Z\d]/g) && str.length >= 8)
        return true;
}

function required(str) {
    return str == '';
}

function getHelperTag(element) {
    // if(element = '' || isNull(element)) return '';
    if(!element) return '';
    return document.getElementById(`help_${element.name}`);
}

function clearAll() {
    for (var i = 0, element; element = elements[i++];) {
        element.classList.remove('invalid');
        var err = getHelperTag(element);
        err.style = 'display : none';
    }
}

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}