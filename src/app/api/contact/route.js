
// API route para manejar envíos de formularios de contacto
import { createContact } from '../../../server/contact.js';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // Obtener los datos del formulario
    const body = await request.json();
    
    // Validar que tenemos todos los campos requeridos
    const { name, email, subject, message } = body;
    
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Todos los campos son requeridos' 
        },
        { status: 400 }
      );
    }

    // Validación adicional de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Formato de email inválido' 
        },
        { status: 400 }
      );
    }

    // Crear el contacto en la base de datos
    const contact = await createContact({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim()
    });

    // Respuesta exitosa
    return NextResponse.json(
      { 
        success: true, 
        message: 'Mensaje enviado correctamente',
        contact: {
          id: contact.id,
          createdAt: contact.createdAt
        }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error al procesar contacto:', error);
    
    // Manejar errores específicos de Prisma/base de datos
    if (error.message.includes('required')) {
      return NextResponse.json(
        { 
          success: false, 
          error: error.message 
        },
        { status: 400 }
      );
    }

    // Error genérico del servidor
    return NextResponse.json(
      { 
        success: false, 
        error: 'Error interno del servidor' 
      },
      { status: 500 }
    );
  }
}

// Opcional: Manejar método GET para obtener contactos (solo para testing)
export async function GET() {
  return NextResponse.json(
    { 
      success: false, 
      error: 'Método no permitido. Use POST para enviar mensajes.' 
    },
    { status: 405 }
  );
}