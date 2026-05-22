const { requireAuth, setCorsHeaders } = require('../_utils/auth');
const supabase = require('../_utils/supabase');

module.exports = async (req, res) => {
  setCorsHeaders(res, ['DELETE']);

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (!requireAuth(req, res)) return;

  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  // Extract id from URL: /api/delete/123
  const parts = req.url.split('/');
  const id = parts[parts.length - 1];

  try {
    const { data, error } = await supabase
      .from('empleados')
      .delete()
      .eq('id', id)
      .select()
      .maybeSingle();

    if (error) {
      console.error('Supabase DELETE error:', error);
      return res.status(500).json({ error: 'Error al eliminar empleado' });
    }

    if (!data) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }

    return res.status(200).json({ message: 'Empleado eliminado con éxito', data });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};
