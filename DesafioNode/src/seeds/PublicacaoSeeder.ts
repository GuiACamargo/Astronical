import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Publicacao } from './../entities/Publicacao';

export class PublicacaoSeeder implements Seeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    const publicacaoRepository = dataSource.getRepository(Publicacao);

    const publicacoes = [
      {
        titulo: 'Number of stars',
        imagem: '',
        descricao: `Considering the existence of hundreds of billions of stars per galaxy, and hundreds of billions of galaxies, multiplying the two yields a total of 100 sextillion stars! 😱	And guess what, that's the approximate number of grains of sand in the world!`,
        pontuacao: 100,
        isAtivo: true,
        usuario: { id: 1 },
      },
      {
        titulo: 'Number of galaxies',
        imagem: '',
        descricao: `According to scientists, there are approximately 100 billion galaxies in our Universe, this number can vary! 🌌`,
        pontuacao: 105,
        isAtivo: true,
        usuario: { id: 1 },
      },
      {
        titulo: 'Biggest space star',
        imagem: '',
        descricao: `The biggest star in the Universe would be the VY Canis Majoris, with about 2.7 billion km in diameter, that is, more than 3 million times larger than the Sun. ☀`,
        pontuacao: 130,
        isAtivo: true,
        usuario: { id: 1 },
      },
      {
        titulo: 'First animal on space',
        imagem: '',
        descricao: `The first living being to arrive in space was the dog Laika launched into space aboard the Soviet spacecraft Sputnik 2 on November 3, 1957 at the age of 3! 🐶🐕`,
        pontuacao: 142,
        isAtivo: true,
        usuario: { id: 2 },
      },
    ];

    const publicacaoExiste = await publicacaoRepository.findOneBy({ titulo: publicacoes[0].titulo });

    if (!publicacaoExiste) {
      const novaspublicacoes = publicacaoRepository.create(publicacoes);
      await publicacaoRepository.save(novaspublicacoes);
    }
  }
}
