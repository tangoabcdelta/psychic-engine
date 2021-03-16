module.exports = (req, res, next) => {
  res.header('X-Hello', 'World');
  res.header('access-control-allow-origin', '*');
  res.header('content-type', 'application/json');
  res.header('date', new Date());
  res.header('server', 'Werkzeug/0.16.1 Python/3.6.9');
  res.header('XXXXXX', 'BBBB');
  next();
}