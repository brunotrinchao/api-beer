const Sequelize = require('sequelize');

function errorMiddleware(err, req, res, next) {
    console.log('ERRO: ',err)
  if (err instanceof Sequelize.ValidationError) {
    const errors = err.errors.map((error) => ({
      message: error.message,
      field: error.path,
      type: error.type,
    }));

    return res.status(400).json({ errors });
  }

  if (err instanceof Sequelize.ForeignKeyConstraintError) {
    return res.status(400).json({ error: 'ForeignKeyConstraintError', code: 400 });
  }

  if (err instanceof Sequelize.UniqueConstraintError) {
    return res.status(400).json({ error: 'UniqueConstraintError', code: 400 });
  }

  if (err instanceof Sequelize.EmptyResultError) {
    return res.status(404).json({ error: 'EmptyResultError', code: 404 });
  }

  console.error(err);
  return res.status(500).json({ error: 'Internal Server Error', code: 500 });
}

module.exports = errorMiddleware;
