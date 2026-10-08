export const validarEmail = (email) => {
  if (!email) return "El correo electrónico es obligatorio.";
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) return "El formato del correo electrónico no es válido.";
  return "";
};

export const validarPassword = (password) => {
  if (!password) return "La contraseña es obligatoria.";
  if (password.length < 6) return "La contraseña debe tener al menos 6 caracteres.";
  return "";
};