export const weekDays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
export function getCurrentDates(date: Date): Date[] {
    const days = [];

    const firstInMonth = new Date(date);
    firstInMonth.setDate(1);
    firstInMonth.setMonth(date.getMonth());
    firstInMonth.setFullYear(date.getFullYear());
    const firstInMonthWeekDay = firstInMonth.getDay();

    const startDate = new Date(firstInMonth);
    startDate.setDate(startDate.getDate() - (firstInMonthWeekDay - 1));

    for (let i = 0; i < 42; i++) {
        const eachDate = new Date(startDate);
        eachDate.setDate(eachDate.getDate() + i);
        days.push(eachDate);
    }

    return days;
}

export function getMonthName(date: Date): string {
    const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

    return months[date.getMonth()];
}

export function getDateFromStr(dateStr: string): Date | null {
    const dots = dateStr.split('').filter((ch) => ch === '.');

    if (dateStr.length !== 10 || dots.length !== 2) {
        return null;
    }

    const day = dateStr.slice(0, 2);
    const month = dateStr.slice(3, 5);
    const year = dateStr.slice(6, 10);

    const dateObj = new Date(month + '.' + day + '.' + year);
    // @ts-ignore
    if (!(dateObj instanceof Date) || isNaN(dateObj)) {
        return null;
    }

    return dateObj;
}

export function removeExtraChars(dateStr: string) {
    return dateStr
        .split('')
        .filter((ch) => ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '-'].includes(ch))
        .join('');
}

export function getDateStr(date?: Date) {
    if (!date) {
        return '';
    }

    return date.getDate().toString().padStart(2, '0') + '.' + (date.getMonth() + 1).toString().padStart(2, '0') + '.' + date.getFullYear();
}