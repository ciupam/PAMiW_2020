const firstNameInput = document.querySelector(".wrapper .form .input_field input[name='firstname']");
const lastNameInput = document.querySelector(".wrapper .form .input_field input[name='lastname']");
const peselInput = document.querySelector(".wrapper .form .input_field input[name='pesel']");
const loginInput = document.querySelector(".wrapper .form .input_field input[name='login']");
const passwordInput = document.querySelector(".wrapper .form .input_field input[name='password']");
const birthDateInput = document.querySelector(".wrapper .form .input_date input[name='birthdate']");
const sexInput = document.querySelectorAll(".wrapper .form .input_radio .radio_box input[name='sex']");
const photoInput = document.querySelector(".wrapper .form .input_file input[name='photo']");
const form = document.querySelector(".wrapper .form");

const error = document.querySelector(".alert .alert_message");
const success = document.querySelector(".success .succcess_message");
const submitButton = document.querySelector(".wrapper .submit_btn");
const registerButton = document.querySelector(".wrapper .register_btn");
let attached = false;

const upper = ["Ą", "Ć", "Ę", "Ł", "Ń", "Ó", "Ś", "Ź", "Ż"];
const lower = ["ą", "ć", "ę", "ł", "ń", "ó", "ś", "ź", "ż"];
const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const url = "https://pi.iem.pw.edu.pl";

const runError = (message) => {
    error.parentElement.style.opacity = "100";
    error.innerHTML = message;
};

const runSuccess = (message) => {
    success.parentElement.style.opacity = "100";
    success.innerHTML = message;
};

const disableRegister = () => {
    if (attached) {
        registerButton.removeEventListener("click", sendForm);
        attached = false;
        registerButton.style.background = "gray";
    }
};

const enableRegister = () => {
    registerButton.addEventListener("click", sendForm);
    attached = true;
    registerButton.style.background = "#0F9D58";
}

const errorOut = () => error.parentElement.style.opacity = "0";

const checkInput = (input, err) => {
    if (input != "") {
        if (input.length == 1) {
            runError(err);
            return 0;
        }

        if (!upper.includes(input[0]) && (input[0].charCodeAt() < "A".charCodeAt() || input[0].charCodeAt() > "Z".charCodeAt())) {
            runError(err);
            return 0;
        }

        for (const c of input.slice(1, input.length)) {
            if (!lower.includes(c) && (c.charCodeAt() < "a".charCodeAt() || c.charCodeAt() > "z".charCodeAt())) {
                runError(err);
                return 0;
            }
        }

        errorOut();
        return 1;
    }

    return 0;
};

const sendHttpRequest = (method, url, data) => {
    return new Promise((res, rej) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);

        xhr.onload = () => {
            res(xhr.status);
        };

        xhr.send(data);
    });
};

const sendForm = () => {
//    const data = new FormData(form);
//    sendHttpRequest("POST", `${url}/register`, data).then(statusCode => console.log(statusCode));
    form.submit();
};

const validateLoginInput = () => {
    let isAvailable = false;
    if (loginInput.value != "") {
        sendHttpRequest("GET", `${url}/user/${loginInput.value}`).then(statusCode => {
            if (statusCode == 200) {
                disableRegister();
                runError("Username is taken.");
            }
            
        });
    } else {
        disableRegister();
    }
};

const validateFirstNameInput = () => checkInput(firstNameInput.value, "First name typed wrong!");

const validateLastNameInput = () => checkInput(lastNameInput.value, "Last name typed wrong!");

const validatePeselInput = () => {
    const i = peselInput.value;
    if (i != "") {
        if (i.length != 11) {
            runError("Pesel is 11-digit number!");
            return 0;
        }

        for (const c of i) {
            if (!digits.includes(c)) {
                runError("Pesel is 11 digit number!");
                return 0;
            }
        }

        const sum = (9*Number(i[0])+7*Number(i[1])+3*Number(i[2])+Number(i[3])+9*Number(i[4])+7*Number(i[5])+3*Number(i[6])+Number(i[7])+9*Number(i[8])+7*Number(i[9])).toString();

        if(sum[sum.length-1] != i[10]) {
            runError("Pesel number typed wrong!");
            return 0;
        }

        errorOut();
        return 1;
    }

    return 0;
};

const validateSexInput = () => {
    if (sexInput[0].checked) return 1;
    if (sexInput[1].checked) return 1;
    runError("Select your sex!");
    return 0;
};

const validateBirthDateInput = () => {
    year = Number(birthDateInput.value.split("-")[0]);
    if (year < 1990) {
        runError("Pick correct year!");
        return 0;
    }

    errorOut();
    return 1;
};

const validatePhotoInput = () => {
    if (photoInput.value == "") {
        runError("Select file!");
        return 0;
    }

    return 1;
};

const validatePasswordInput = () => {
    const input = passwordInput.value;

    if (input != "") {
        if (input.length < 8) {
            runError("Passowrd must be at least 8 characters long!");
            return 0;
        }
        
        for (const c of input) {
            if ((c.charCodeAt() < "A".charCodeAt() || c.charCodeAt() > "Z".charCodeAt()) && (c.charCodeAt() < "a".charCodeAt() || c.charCodeAt() > "z".charCodeAt())) {
                runError("Password characters must be [A-Za-z]!");
                return 0;
            }

            errorOut();
            return 1;
        }
    }

    return 0;
};

loginInput.addEventListener("focusout", validateLoginInput);

firstNameInput.addEventListener("focusout", validateFirstNameInput);

lastNameInput.addEventListener("focusout", validateLastNameInput);

peselInput.addEventListener("focusout", validatePeselInput);

birthDateInput.addEventListener("focusout", validateBirthDateInput);

passwordInput.addEventListener("focusout", validatePasswordInput);

submitButton.addEventListener("click", () => {
    if (validateFirstNameInput() && validateLastNameInput() && validatePeselInput() && validateBirthDateInput() && validateSexInput() && validatePhotoInput() && validatePasswordInput()) {
        enableRegister();
        validateLoginInput();
    }
});