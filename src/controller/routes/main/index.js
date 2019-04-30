const mainRoute = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
  res.write('<h1>Status watch server</h1>');
  res.end();
};

module.exports = mainRoute;
