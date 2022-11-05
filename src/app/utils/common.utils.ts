export const prefixZero = (digit: number) => {
    const digitstr = String(digit);
    return digitstr.length > 1 ? digit : '0'+digitstr;
}
