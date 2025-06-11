export const getAttribute = (key: string, value: string | number | null | undefined) : string => {
    if(value === null || value === undefined) return '';
    return ` ${key}="${value}"`;
}
