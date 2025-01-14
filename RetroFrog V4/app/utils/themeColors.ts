export function changeThemeColor(theme: string) {
  if (theme === 'dark') {
    return {
      primaryBg: '#151a2d', // Fondo oscuro
      highlightBg: '#1f253d', // Fondo de resalte
      textColor: '#e6e6e6', // Color de texto claro
      textHighlight: '#f3f4f6', // Resaltado de texto en tema oscuro
    };
  } else {
    return {
      primaryBg: '#ffffff', // Fondo blanco
      highlightBg: '#f3f4f6', // Fondo de resalte claro
      textColor: '#1f253d', // Color de texto oscuro
      textHighlight: '#151a2d', // Resaltado de texto en tema claro
    };
  }
}
