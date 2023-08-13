export default function formatPhone(value) {
    const num = value.replace(/\D/g, '');
    let formatedNumber = '';

    if (num.length >= 3) {
        formatedNumber = `(${num.substring(0, 2)}) `;

        if (num.length >= 8) {
            formatedNumber += `${num.substring(2, 7)}-`;

            if (num.length > 6) {
                formatedNumber += num.substring(7);
            }
        } else {
            formatedNumber += num.substring(2);
        }
    } else {
        formatedNumber = num;
    }

    return formatedNumber;
}