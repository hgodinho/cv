/**
 * Adiciona transparência a uma cor hex
 *
 * @param color | Cor
 * @param alpha | Transparência em decimal (0 a 1) | 0.5 = 50%
 *
 * @returns Cor modificada
 */
export function alphaHex(color: string, alpha: number = 0): string | undefined {
    if (alpha < 0 || alpha > 1)
        throw new Error("Alpha deve ser um valor entre 0 e 1");
    const alphaHex = Math.round(alpha * 255)
        .toString(16)
        .padStart(2, "0");
    return color ? color + alphaHex : color;
}
