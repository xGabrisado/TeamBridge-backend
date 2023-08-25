import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { EmpresaModule } from './empresa/empresa.module';
import { ProjetoModule } from './projeto/projeto.module';
import { TarefaModule } from './tarefa/tarefa.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
// import { Usuario } from './usuario/entities/usuario.entity';
// import { Tarefa } from './tarefa/entities/tarefa.entity';
// import { Projeto } from './projeto/entities/projeto.entity';
// import { Empresa } from './empresa/entities/empresa.entity';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CaslModule } from './casl/casl.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsuarioModule,
    EmpresaModule,
    ProjetoModule,
    TarefaModule,
    TypeOrmModule.forRoot({
      type: 'postgres', //process.env.TYPEORM_CONNECTION
      host: 'localhost', // process.env.TYPEORM_HOST
      port: 5432, // process.env.TYPEORM_PORT
      username: 'postgres', //process.env.TYPEORM_USERNAME
      password: 'admin', // process.env.TYPEORM_PASSWORD
      database: 'teambridge', // process.env.TYPEORM_DATABASE
      entities: [
        __dirname + '/**/**/*.entity{.js, .ts}',
        // Usuario, Tarefa, Projeto, Empresa
      ],
      // autoLoadEntities: true,
      synchronize: true,
    } as TypeOrmModuleOptions),
    AuthModule,
    CaslModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
