import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
// import { Empresa } from 'src/empresa/entities/empresa.entity';
// import { log } from 'console';
import { EmpresaService } from 'src/empresa/empresa.service';
import { Projeto } from 'src/projeto/entities/projeto.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    // @InjectRepository(Empresa)
    // private readonly empresaRepository: Repository<Empresa>,
    @Inject(forwardRef(() => EmpresaService))
    private readonly empresaService: EmpresaService,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const user = this.usuarioRepository.create({ ...createUsuarioDto });

    const emailAlreadyExists = await this.usuarioRepository.findOne({
      where: {
        userEmail: user.userEmail,
      },
      select: ['userEmail'],
    });

    console.log(emailAlreadyExists);

    if (emailAlreadyExists) {
      throw new ConflictException();
    }

    const savedUser = this.usuarioRepository.save(user);

    return {
      Name: `${(await savedUser).userName} ${(await savedUser).userLastName}`,
      Email: (await savedUser).userEmail,
    };
  }

  async findAll(): Promise<Usuario[]> {
    return await this.usuarioRepository.find({
      select: ['id', 'userName', 'userLastName', 'userPost'],
    });
  }

  // async findOne(email: string) {
  //   const user = await this.usuarioRepository.findOne({
  //     where: {
  //       userEmail: email,
  //     },
  //   });

  //   if (!user) {
  //     throw new NotFoundException();
  //   }
  //   return user;
  // }

  // async findOne() {
  //   return await this.usuarioRepository.findOne()
  // }

  async findOneOrFail(options: FindOneOptions<Usuario>) {
    try {
      const response = await this.usuarioRepository.findOneOrFail(options);
      return response;
    } catch (error) {
      throw new NotFoundException(error.messge);
    }
  }
  async findOneEmpresa(id) {
    try {
      // const response = await this.usuarioRepository.findOneOrFail(options);
      // response.
      const queryBuilder = this.usuarioRepository
        .createQueryBuilder('n')
        .select([
          'n.id as id',
          'n.empresa as empresa',
          'n.userName as userName',
          'n.userLastName as userLastName',
          'n.userPost as userPost',
          'n.userPermission as userPermission',
          'n.created_At as created_At',
          'n.updated_At as updated_At',
        ])
        .orderBy('n.id', 'DESC')
        .where('n.id = :id', { id });

      // console.log('resultado do query builder');
      // console.log(queryBuilder.getQueryAndParameters());
      // console.log((await queryBuilder.getRawMany())[0]);
      // console.log('options.where');
      // console.log(id);

      return (await queryBuilder.getRawMany())[0];
    } catch (error) {
      throw new NotFoundException(error.messge);
    }
  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    const user = await this.findOneOrFail({ where: { id } });

    this.usuarioRepository.merge(user, updateUsuarioDto);

    // if (!user) {
    //   throw new NotFoundException(`User id: ${id} not found`);
    // }
    return this.usuarioRepository.save(user);
  }

  async updateAfterEmpresa(id: any, userPermission: string) {
    // console.log('id');
    // console.log(id);
    // console.log('userPermission');
    // console.log(userPermission);
    const user = await this.findOneOrFail({ where: { id } });

    return this.usuarioRepository.merge(user, {
      userPermission: userPermission,
    });
  }

  async updateEmpresa(userId: string, empresaId: any) {
    let user: Usuario;
    try {
      user = await this.usuarioRepository.findOneOrFail({
        where: { id: userId },
      });
    } catch (error) {
      return null;
    }
    if (empresaId === null) {
      this.usuarioRepository.merge(user, {
        empresa: null,
        userPermission: 'c',
      });

      return this.usuarioRepository.save(user);
    }
    const company = await this.empresaService.findOne(empresaId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (!company) {
      throw new NotFoundException('Company not found');
    }

    if (company && user.empresa) {
      throw new ForbiddenException('Você ja tem uma empresa');
    }

    this.usuarioRepository.merge(user, { empresa: { id: company.id } });

    return this.usuarioRepository.save(user);
  }

  async updateProject(userId: string, project: any) {
    const user = await this.usuarioRepository.findOne({
      where: { id: userId },
      relations: {
        projeto: true,
      },
    });

    user.projeto.push(project);

    return await this.usuarioRepository.save(user);
  }

  async remove(id: string) {
    await this.usuarioRepository.findOneOrFail({ where: { id } });

    return this.usuarioRepository.softDelete(id);
  }
}
