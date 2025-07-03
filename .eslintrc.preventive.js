// .eslintrc.js - Regla preventiva para componentes Slot
module.exports = {
  // ... configuración existente
  rules: {
    // ... reglas existentes

    // Regla personalizada para prevenir errores de React.Children.only
    'react/no-multiple-children-in-slot': 'error',
  },

  // Plugin personalizado (requiere implementación adicional)
  overrides: [
    {
      files: ['**/*.tsx', '**/*.jsx'],
      rules: {
        // Advertir cuando se usen múltiples hijos en componentes con asChild
        'react/jsx-no-multiple-children-in-slot-components': 'warn'
      }
    }
  ]
};
