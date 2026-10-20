import { describe, it, expect } from 'vitest';
import { validarEmail, validarPassword } from './validaciones';

describe('Funciones de validación (Utils)', () => {
  
  describe('validarEmail', () => {
    it('retorna error si el email está vacío', () => {
      expect(validarEmail('')).toBe('El correo electrónico es obligatorio.');
      expect(validarEmail(null)).toBe('El correo electrónico es obligatorio.');
    });

    it('retorna error si el formato del email no es válido', () => {
      expect(validarEmail('correo-invalido')).toBe('El formato del correo electrónico no es válido.');
      expect(validarEmail('correo@dominio')).toBe('El formato del correo electrónico no es válido.');
    });

    it('retorna cadena vacía si el email es válido', () => {
      expect(validarEmail('usuario@example.com')).toBe('');
    });
  });

  describe('validarPassword', () => {
    it('retorna error si la contraseña está vacía', () => {
      expect(validarPassword('')).toBe('La contraseña es obligatoria.');
      expect(validarPassword(null)).toBe('La contraseña es obligatoria.');
    });

    it('retorna error si la contraseña tiene menos de 6 caracteres', () => {
      expect(validarPassword('12345')).toBe('La contraseña debe tener al menos 6 caracteres.');
    });

    it('retorna cadena vacía si la contraseña es válida', () => {
      expect(validarPassword('123456')).toBe('');
      expect(validarPassword('passwordSeguro')).toBe('');
    });
  });

});