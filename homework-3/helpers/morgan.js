import morgan from 'morgan';

morgan.token('body', (req) => JSON.stringify(req.body));

export default (stream) => morgan(':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]', { stream });
