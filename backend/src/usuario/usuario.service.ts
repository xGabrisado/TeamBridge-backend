import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { error } from 'console';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const user = this.usuarioRepository.create({ ...createUsuarioDto });
    return this.usuarioRepository.save(user);
  }

  async findAll(): Promise<Usuario[]> {
    return await this.usuarioRepository.find({
      select: ['id', 'userName', 'userLastName', 'userPost'],
    });
  }

  async findOneOrFail(options: FindOneOptions<Usuario>) {
    try {
      return await this.usuarioRepository.findOneOrFail(options);
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

  async remove(id: string) {
    await this.usuarioRepository.findOneOrFail({ where: { id } });
    return this.usuarioRepository.softDelete(id);
  }
}
