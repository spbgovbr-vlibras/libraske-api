const accumulatorFunction = (accumulator: number, currentValue: number) => accumulator + currentValue;

export default (pontuations: number[]): number => {

    const finalPontuation = pontuations ? pontuations.reduce(accumulatorFunction) : 0;
    return Math.round(finalPontuation / pontuations.length);

}