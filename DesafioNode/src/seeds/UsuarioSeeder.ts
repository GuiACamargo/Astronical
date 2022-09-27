import bcrypt from 'bcrypt';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Usuario } from '../entities/Usuario';

export class UsuarioSeeder implements Seeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    const usuarioRepository = dataSource.getRepository(Usuario);

    const usuarios = [
      {
        nome: 'Joao Silveira',
        cpf: '582.340.000-47',
        email: 'jogao@email.com',
        cargo: 'usuario',
        senha: await bcrypt.hash('teste123456', 10),
        isAtivo: true,
      },
      {
        nome: 'Rafael Silveira',
        cpf: '842.621.860-16',
        email: 'rafael@email.com',
        cargo: 'admin',
        senha: await bcrypt.hash('teste123456', 10),
        isAtivo: true,
      },
    ];

    const usuarioExiste = await usuarioRepository.findOneBy({ email: usuarios[0].email });

    if (!usuarioExiste) {
      const novosUsuarios = usuarioRepository.create(usuarios);
      await usuarioRepository.save(novosUsuarios);
    }
  }
}
