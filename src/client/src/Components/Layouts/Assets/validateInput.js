const upper = ["Ą", "Ć", "Ę", "Ł", "Ń", "Ó", "Ś", "Ź", "Ż"];
const lower = ["ą", "ć", "ę", "ł", "ń", "ó", "ś", "ź", "ż"];

export const validateName = input => {
    if (input === "") return false;

    if (input.length === 1) {
        return 'Name must be at least 2 characters long!';
    }

    if (!upper.includes(input[0]) && (input[0].charCodeAt() < "A".charCodeAt() || input[0].charCodeAt() > "Z".charCodeAt())) {
        return 'First letter must be uppercase!';
    }

    for (const c of input.slice(1, input.length)) {
        if (!lower.includes(c) && (c.charCodeAt() < "a".charCodeAt() || c.charCodeAt() > "z".charCodeAt())) {
            return 'The rest must be lowercase letters!';
        }
    }

    return false;
};

export const validatePassword = input => {
    if (input === "") return false;
    
    if (input.length < 8) return 'Password must be at least 8-characters long!';
    
    for (const c of input) 
        if (
            (c.charCodeAt() < "A".charCodeAt() || c.charCodeAt() > "Z".charCodeAt()) && 
            (c.charCodeAt() < "a".charCodeAt() || c.charCodeAt() > "z".charCodeAt()) && 
            (c.charCodeAt() < "0".charCodeAt() || c.charCodeAt() > "9".charCodeAt())
        ) 
            return 'Password should be made up of letters and digits.';

    return false;
};