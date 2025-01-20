export function formatDate(date: Date, format: string): string {
    const replacements: Record<string, string> = {
        YYYY: String(date.getFullYear()),
        YY: String(date.getFullYear()).slice(-2),
        MM: String(date.getMonth() + 1).padStart(2, '0'),
        DD: String(date.getDate()).padStart(2, '0'),
        HH: String(date.getHours()).padStart(2, '0'),
        mm: String(date.getMinutes()).padStart(2, '0'),
        ss: String(date.getSeconds()).padStart(2, '0'),
    };

    return format.replace(/YYYY|YY|MM|DD|HH|mm|ss/g, (match) => replacements[match]);
}

export function minuteToTime(minute: number, hourFormat: string, minuteFormat: string): string {
    const hours = Math.floor(minute / 60);
    const minutes = minute % 60;

    // 정규식을 이용해 포맷팅
    const template = '{HH}' + hourFormat + ' {MM}' + minuteFormat;
    return template.replace(/\{HH\}/g, String(hours)).replace(/\{MM\}/g, String(minutes));
}