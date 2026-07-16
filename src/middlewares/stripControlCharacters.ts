import { Request, Response, NextFunction } from 'express';
import AppError from '../errors/AppError';

// eslint-disable-next-line no-control-regex
const CONTROL_CHARACTERS = /[\x00-\x1F\x7F]/;

function hasControlCharacters(value: unknown): boolean {
  if (typeof value === 'string') {
    return CONTROL_CHARACTERS.test(value);
  }

  if (Array.isArray(value)) {
    return value.some(hasControlCharacters);
  }

  if (value !== null && typeof value === 'object') {
    return Object.values(value as Record<string, unknown>).some(hasControlCharacters);
  }

  return false;
}

// Rejeita, com 400, qualquer entrada de string em req.body ou req.query que
// contenha caracteres de controle (incluindo bytes nulos), antes de qualquer
// validacao/handler rodar. Rejeitar (em vez de remover silenciosamente)
// mantem o mesmo comportamento ja validado para campos especificos como
// guestName, em vez de aceitar a requisicao com o dado silenciosamente
// modificado.
// Nao cobre multipart/form-data (multer parseia o body por rota, depois
// deste middleware ja ter rodado) - rotas de upload precisam da propria
// validacao (ex.: SongCreateDTO).
export default function stripControlCharacters(request: Request, _response: Response, next: NextFunction): void {
  if (hasControlCharacters(request.body) || hasControlCharacters(request.query)) {
    throw new AppError('A requisição contém caracteres de controle inválidos.', 400);
  }

  next();
}
