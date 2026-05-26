const loggerMiddleware = (req, res, next) => {
  const start = Date.now();
  const timestamp = new Date().toISOString();
  
  // Log da requisição
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl} - IP: ${req.ip}`);

  // Capturar o fim da resposta
  res.on('finish', () => {
    const duration = Date.now() - start;
    const statusColor = res.statusCode >= 400 ? '\x1b[31m' : '\x1b[32m';
    console.log(`[${timestamp}] ${req.method} ${req.originalUrl} - ${statusColor}${res.statusCode}\x1b[0m - ${duration}ms`);
  });

  next();
};

module.exports = loggerMiddleware;
