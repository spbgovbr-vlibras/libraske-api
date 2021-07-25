const accumulatorFunction = (accumulator: number, currentValue: number) => accumulator + currentValue;

export default (pontuations: number[]): number => {

    if (!pontuations || pontuations.length === 0) {
        return 0;
    }

    const finalPontuation = pontuations.reduce(accumulatorFunction);

    return Math.round(finalPontuation / pontuations.length);

}