export function getFirstLetterName(name: string) {
    const split = name.split(" ");
    const fisrtLetter = split[0].substring(0, 1).toUpperCase();
    if (split[1]) {
        const secondLetter = split[1].substring(0, 1).toUpperCase();
        return fisrtLetter + secondLetter;
    }
    return fisrtLetter;
}
