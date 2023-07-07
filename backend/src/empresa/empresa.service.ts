import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { Empresa } from './entities/empresa.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EmpresaService {
  constructor(
    // @Inject('COMPANY_REPOSITORY')
    @InjectRepository(Empresa)
    private readonly empresaRepository: Repository<Empresa>,
  ) {}

  create(createEmpresaDto: CreateEmpresaDto) {
    const company = this.empresaRepository.create({ ...createEmpresaDto });

    return this.empresaRepository.save(company);
  }

  async findAll(): Promise<Empresa[]> {
    return this.empresaRepository.find();
  }

  async findOne(id: number) {
    const company = await this.empresaRepository.findOne({ where: { id } });

    if (!company) {
      throw new NotFoundException(`Company not found`);
    }

    return company;
  }

  async update(id: number, updateEmpresaDto: UpdateEmpresaDto) {
    const company = await this.empresaRepository.preload({
      id: id,
      ...updateEmpresaDto,
    });

    if (!company) {
      throw new NotFoundException(`Company not found`);
    }

    return this.empresaRepository.save(company);
  }

  async remove(id: number) {
    const company = await this.empresaRepository.findOne({ where: { id } });

    if (!company) {
      throw new NotFoundException(`Company not found`);
    }

    return this.empresaRepository.remove(company);
  }
}
