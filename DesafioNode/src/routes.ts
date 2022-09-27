import { Router } from 'express';
import swaggerUI from 'swagger-ui-express';
import { PublicacaoController } from './controllers/PublicacaoController';
import { UsuarioController } from './controllers/UsuarioController';
import { authMiddleware } from './middlewares/authMiddleware';
import { corsMiddleware } from './middlewares/corsMiddleware';
import swaggerDocs from './swagger.json';

const routes = Router();

routes.use(corsMiddleware);
routes.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

routes.post('/login', new UsuarioController().login);
routes.post('/usuario', new UsuarioController().create);

//controle de acesso teste cielio
routes.use(authMiddleware);

routes.get('/usuario', new UsuarioController().listAll);
routes.get('/usuario/:email', new UsuarioController().getByUserEmail);
routes.put('/usuario/:id', new UsuarioController().update);
routes.delete('/usuario/:id', new UsuarioController().delete);

routes.post('/publicacao', new PublicacaoController().create);

routes.get('/publicacao', new PublicacaoController().listAll);
routes.get('/publicacao/:id', new PublicacaoController().getById);
routes.get('/publicacao/usuario/:id', new PublicacaoController().listByUserId);

routes.put('/publicacao/:id', new PublicacaoController().update);
routes.delete('/publicacao/:id', new PublicacaoController().delete);

export default routes;
