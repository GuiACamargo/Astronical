import { DataSource } from 'typeorm';
import { runSeeder, Seeder, SeederFactoryManager } from 'typeorm-extension';
import { PublicacaoSeeder } from './PublicacaoSeeder';
import { UsuarioSeeder } from './UsuarioSeeder';

export class MainSeeder implements Seeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    await runSeeder(dataSource, UsuarioSeeder);
    await runSeeder(dataSource, PublicacaoSeeder);
  }
}
