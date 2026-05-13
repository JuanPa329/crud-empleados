const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  // Extract id from URL: /api/update/123
  const parts = req.url.split('/');
  const id = parts[parts.length - 1];

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  const { nombre, edad, pais, cargo, anios } = req.body;

  if (!nombre || !pais || !cargo) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  try {
    const { error } = await supabase
      .from('empleados')
      .update({ nombre, edad: Number(edad), pais, cargo, anios: Number(anios) })
      .eq('id', Number(id));

    if (error) {
      console.error('Supabase UPDATE error:', error);
      return res.status(500).json({ error: 'Error al actualizar empleado' });
    }

    return res.status(200).json({ message: 'Empleado actualizado con éxito' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};
