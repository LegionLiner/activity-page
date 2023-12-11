export function getCountLabel(count: number, labels: string[]) {
    const strCount = count.toString();
    const lastChar = strCount[strCount.length - 1];

    if (count > 10 && count < 20) {
        return labels[2];
    }

    if (['2', '3', '4'].includes(lastChar)) {
        return labels[1];
    }

    if (lastChar === '1') {
        return labels[0];
    }

    if (['5', '6', '7', '8', '9', '0'].includes(lastChar)) {
        return labels[2];
    }

    return '';
}
