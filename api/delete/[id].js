const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  // Extract id from URL: /api/delete/123
  const parts = req.url.split('/');
  const id = parts[parts.length - 1];

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  try {
    const { error } = await supabase
      .from('empleados')
      .delete()
      .eq('id', Number(id));

    if (error) {
      console.error('Supabase DELETE error:', error);
      return res.status(500).json({ error: 'Error al eliminar empleado' });
    }

    return res.status(200).json({ message: 'Empleado eliminado con éxito' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};
