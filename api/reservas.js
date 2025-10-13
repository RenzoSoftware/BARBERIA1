// Vercel Serverless Function para recibir reservas
// Valida campos mínimos y registra en logs. Puedes conectar persistencia luego.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
  }

  try {
    const data = req.body || {};
    const { nombre, telefono, email, servicio, fecha, hora, mensaje } = data;

    const missing = [];
    if (!nombre) missing.push('nombre');
    if (!telefono) missing.push('telefono');
    if (!servicio) missing.push('servicio');
    if (!fecha) missing.push('fecha');
    if (!hora) missing.push('hora');
    if (missing.length) {
      return res.status(400).json({ ok: false, error: 'Campos faltantes', fields: missing });
    }

    const digits = String(telefono).replace(/\D/g, '');
    const isValidPeruMobile =
      (digits.length === 9 && digits.startsWith('9')) ||
      (digits.length === 11 && digits.startsWith('51') && digits[2] === '9');
    if (!isValidPeruMobile) {
      return res.status(400).json({ ok: false, error: 'Teléfono inválido' });
    }

    const id = Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8);
    const record = {
      id,
      nombre,
      telefono: digits,
      email: email || null,
      servicio,
      fecha,
      hora,
      mensaje: mensaje || null,
      createdAt: new Date().toISOString()
    };

    console.log('[Reserva nueva]', record);
    // TODO: Persistir: conectar con Supabase, Google Sheets, Email/Resend, etc.

    return res.status(200).json({ ok: true, id, message: 'Reserva recibida', record });
  } catch (err) {
    console.error('Error en reservas:', err);
    return res.status(500).json({ ok: false, error: 'Error interno' });
  }
}