// Script para probar la API de contacto
const testContactAPI = async () => {
  try {
    console.log('🧪 Probando API de contacto...\n');
    
    const testData = {
      name: 'Juan Pérez',
      email: 'juan@example.com',
      subject: 'Prueba desde script',
      message: 'Este es un mensaje de prueba para verificar que la API funciona correctamente.'
    };

    const response = await fetch('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    const result = await response.json();
    
    console.log('📊 Respuesta del servidor:');
    console.log('Status:', response.status);
    console.log('Data:', result);
    
    if (result.success) {
      console.log('✅ ¡API funcionando correctamente!');
      console.log('📝 Contacto guardado con ID:', result.contact.id);
    } else {
      console.log('❌ Error en la API:', result.error);
    }
    
  } catch (error) {
    console.log('💥 Error de conexión:', error.message);
  }
};

// Ejecutar la prueba
testContactAPI();