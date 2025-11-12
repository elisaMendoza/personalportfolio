// Formulario de contacto con validación frontend y manejo de estado
'use client';

import { useState } from 'react';
import styles from './ContactForm.module.css';

// Componente ContactForm
export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // Estado para errores, envío y carga
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Validaciones
  const validateForm = () => {
    const newErrors = {};

    // Validar nombre
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres';
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Formato de email inválido';
    }

    // Validar asunto
    if (!formData.subject.trim()) {
      newErrors.subject = 'El asunto es requerido';
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = 'El asunto debe tener al menos 5 caracteres';
    }

    // Validar mensaje
    if (!formData.message.trim()) {
      newErrors.message = 'El mensaje es requerido';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'El mensaje debe tener al menos 10 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejo de cambios en los campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Manejo del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Limpiar errores previos
    setSubmitError('');
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    // Enviar datos al endpoint API
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      
      if (result.success) {
        setIsSubmitted(true);
        
        // Resetear formulario después de 3 segundos
        setTimeout(() => {
          setFormData({ name: '', email: '', subject: '', message: '' });
          setIsSubmitted(false);
        }, 3000);
      } else {
        setSubmitError(result.error || 'Error al enviar el mensaje');
      }
    } catch (error) {
      console.error('Error al enviar formulario:', error);
      setSubmitError('Error de conexión. Por favor, inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className={styles.contactSection}>
        <div className={styles.container}>
          <h2 className={styles.title}>Contacto</h2>
          <div className={styles.successMessage}>
            <div className={styles.successIcon}>✓</div>
            <h3>¡Mensaje Enviado!</h3>
            <p>Gracias por contactarme. Te responderé pronto.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.contactSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>Contacto</h2>
        <p className={styles.subtitle}>
          ¿Tienes un proyecto en mente? ¡Hablemos!
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label htmlFor="name" className={styles.label}>
                Nombre *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                placeholder="Tu nombre completo"
              />
              {errors.name && (
                <span className={styles.errorText}>{errors.name}</span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                placeholder="tu@email.com"
              />
              {errors.email && (
                <span className={styles.errorText}>{errors.email}</span>
              )}
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="subject" className={styles.label}>
              Asunto *
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className={`${styles.input} ${errors.subject ? styles.inputError : ''}`}
              placeholder="Asunto de tu mensaje"
            />
            {errors.subject && (
              <span className={styles.errorText}>{errors.subject}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="message" className={styles.label}>
              Mensaje *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
              placeholder="Cuéntame sobre tu proyecto..."
              rows="6"
            />
            {errors.message && (
              <span className={styles.errorText}>{errors.message}</span>
            )}
          </div>

          {submitError && (
            <div className={styles.submitError}>
              {submitError}
            </div>
          )}

          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={isLoading}
          >
            <span>{isLoading ? 'Enviando...' : 'Enviar Mensaje'}</span>
            <div className={styles.buttonGlow}></div>
          </button>
        </form>
      </div>
    </section>
  );
}