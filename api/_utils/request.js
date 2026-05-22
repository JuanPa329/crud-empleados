function readFirst(value) {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

function cleanId(value) {
  if (value === undefined || value === null) {
    return null;
  }

  const id = String(value).split('?')[0].trim();

  if (!id || id === '[id]' || id === 'api' || id === 'update' || id === 'delete') {
    return null;
  }

  return id;
}

function getEmployeeId(req) {
  const queryId = cleanId(readFirst(req.query && req.query.id));
  if (queryId) return queryId;

  const bodyId = cleanId(req.body && req.body.id);
  if (bodyId) return bodyId;

  const url = new URL(req.url || '', 'http://localhost');
  const pathParts = url.pathname.split('/').filter(Boolean);

  for (let index = pathParts.length - 1; index >= 0; index -= 1) {
    const id = cleanId(pathParts[index]);
    if (id) return id;
  }

  return null;
}

module.exports = {
  getEmployeeId,
};
