const { requireAuth, setCorsHeaders } = require('../_utils/auth');
const { getEmployeeId } = require('../_utils/request');
const supabase = require('../_utils/supabase');

module.exports = async (req, res) => {
  setCorsHeaders(res, ['DELETE']);

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (!requireAuth(req, res)) return;

  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const id = getEmployeeId(req);

  try {
    if (!id) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }

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
