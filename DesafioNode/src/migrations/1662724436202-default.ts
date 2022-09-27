import { MigrationInterface, QueryRunner } from 'typeorm';

export class default1662724436202 implements MigrationInterface {
  name = 'default1662724436202';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`usuarios\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(256) NOT NULL, \`email\` varchar(60) NOT NULL, \`cpf\` varchar(16) NOT NULL, \`senha\` varchar(256) NOT NULL, \`cargo\` varchar(16) NOT NULL, \`isAtivo\` tinyint NOT NULL, UNIQUE INDEX \`IDX_446adfc18b35418aac32ae0b7b\` (\`email\`), UNIQUE INDEX \`IDX_ebebcaef8457dcff6e6d69f17b\` (\`cpf\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`publicacoes\` (\`id\` int NOT NULL AUTO_INCREMENT, \`titulo\` varchar(200) NOT NULL, \`descricao\` text NOT NULL, \`pontuacao\` int NOT NULL, \`data\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`isAtivo\` tinyint NOT NULL, \`usuarioId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `ALTER TABLE \`publicacoes\` ADD CONSTRAINT \`FK_826552ce0feefb6f4f5f127ac8a\` FOREIGN KEY (\`usuarioId\`) REFERENCES \`usuarios\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`publicacoes\` DROP FOREIGN KEY \`FK_826552ce0feefb6f4f5f127ac8a\``);
    await queryRunner.query(`DROP TABLE \`publicacoes\``);
    await queryRunner.query(`DROP INDEX \`IDX_ebebcaef8457dcff6e6d69f17b\` ON \`usuarios\``);
    await queryRunner.query(`DROP INDEX \`IDX_446adfc18b35418aac32ae0b7b\` ON \`usuarios\``);
    await queryRunner.query(`DROP TABLE \`usuarios\``);
  }
}
