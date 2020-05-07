export namespace CenterOfGravity {

    const CenterValues = [0.2, 0.45, 0.7]

    /**
     * 
     * @param degrees The list of output membership function strengths for each classification.
     */
    export const compute = (degrees: number[]) => {
        return (degrees[Orders.LOW] * CenterValues[Orders.LOW]
            + degrees[Orders.MEDIUM] * CenterValues[Orders.MEDIUM]
            + degrees[Orders.HIGH] * CenterValues[Orders.HIGH]) /
            degrees.reduce((x, y) => x + y)
    }
    enum Orders {
        LOW, MEDIUM, HIGH
    }
}