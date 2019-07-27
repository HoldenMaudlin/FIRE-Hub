// Parses 'Money' number into integer
export function _stringToInt(num) {
    return (parseInt(num.replace(/\D/g, ''), 10))
}