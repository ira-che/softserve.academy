exports.hostname = process.argv[2] || process.env.HOST || '127.0.0.1';
exports.port = process.argv[3] || process.env.PORT || 3000;
