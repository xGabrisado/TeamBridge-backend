import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  create(createUsuarioDto: CreateUsuarioDto) {
    const user = this.usuarioRepository.create({ ...createUsuarioDto });
    return this.usuarioRepository.save(user);
  }

  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  async findOne(id: number) {
    const user = await this.usuarioRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User id: ${id} not found!`);
    }
    return user;
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const user = await this.usuarioRepository.preload({
      id: id,
      ...updateUsuarioDto,
    });

    if (!user) {
      throw new NotFoundException(`User id: ${id} not found`);
    }
    return this.usuarioRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.usuarioRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User ID: ${id} not found!`);
    }

    return this.usuarioRepository.remove(user);
  }
}
