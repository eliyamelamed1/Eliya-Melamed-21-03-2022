export const degreesConverter = ({
    degreesValue,
    degreesType,
}: {
    degreesValue: number;
    degreesType: string;
}): number => {
    if (degreesType === 'C') return degreesValue;

    return (degreesValue * 9) / 5 + 32;
};
