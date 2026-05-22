const { requireAuth, setCorsHeaders } = require('../_utils/auth');
const { getEmployeeId } = require('../_utils/request');
const supabase = require('../_utils/supabase');
const { validateEmployeePayload } = require('../_utils/validation');

module.exports = async (req, res) => {
  setCorsHeaders(res, ['PUT']);

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (!requireAuth(req, res)) return;

  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const id = getEmployeeId(req);

  const { data: employee, errors } = validateEmployeePayload(req.body);

  if (errors) {
    return res.status(400).json({ error: 'Datos invalidos', details: errors });
  }

  try {
    if (!id) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }

    const { data, error } = await supabase
      .from('empleados')
      .update(employee)
      .eq('id', id)
      .select()
      .maybeSingle();

    if (error) {
      console.error('Supabase UPDATE error:', error);
      return res.status(500).json({ error: 'Error al actualizar empleado' });
    }

    if (!data) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }

    return res.status(200).json({ message: 'Empleado actualizado con éxito', data });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};
