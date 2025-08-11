import { decode as atob } from "base-64";

/**
 * Decodifica uma string Base64. Se o resultado for JSON válido, formata como JSON.
 * Caso contrário, retorna o texto puro.
 */
export default function Base64Decoder(encoded: string): string {
  let decoded: string;

  try {
    decoded = atob(encoded);
  } catch (error) {
    return "Erro ao decodificar Base64";
  }

  try {
    const json = JSON.parse(decoded);
    return JSON.stringify(json, null, 2); // formatado
  } catch {
    return decoded; // texto puro
  }
}
