export const unitTypeConverter = ({ temp, unit }: { temp: number; unit: string }): number => {
    if (unit === 'C') return temp;

    return (temp * 9) / 5 + 32;
};
