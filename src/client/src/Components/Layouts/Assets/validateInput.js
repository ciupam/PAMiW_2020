const upper = ["Ą", "Ć", "Ę", "Ł", "Ń", "Ó", "Ś", "Ź", "Ż"];
const lower = ["ą", "ć", "ę", "ł", "ń", "ó", "ś", "ź", "ż"];

export const validateName = input => {
    if (input === "") return true;

    if (input.length === 1) {
        return false;
    }

    if (!upper.includes(input[0]) && (input[0].charCodeAt() < "A".charCodeAt() || input[0].charCodeAt() > "Z".charCodeAt())) {
        return false;
    }

    for (const c of input.slice(1, input.length)) {
        if (!lower.includes(c) && (c.charCodeAt() < "a".charCodeAt() || c.charCodeAt() > "z".charCodeAt())) {
            return false;
        }
    }

    return true;
};

export const validatePassword = input => {
    if (input === "") return true;
    
    if (input.length < 8) return false;
    
    for (const c of input) if ((c.charCodeAt() < "A".charCodeAt() || c.charCodeAt() > "Z".charCodeAt()) && (c.charCodeAt() < "a".charCodeAt() || c.charCodeAt() > "z".charCodeAt())) return false;

    return true;
};