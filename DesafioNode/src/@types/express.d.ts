import { Usuario } from './../entities/Usuario';

declare global {
	namespace Express {
		export interface Request {
			user: Partial<Usuario>
		}
	}
}