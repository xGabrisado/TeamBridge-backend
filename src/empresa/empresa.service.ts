import {
  ConflictException,
  Inject,
  Injectable,
  NotAcceptableException,
  NotFoundException,
  UseGuards,
  forwardRef,
} from '@nestjs/common';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { Empresa } from './entities/empresa.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RegExHelper } from 'src/Helpers/regex.helper';
import { UsuarioService } from 'src/usuario/usuario.service';

@Injectable()
export class EmpresaService {
  constructor(
    // @Inject('COMPANY_REPOSITORY')
    @InjectRepository(Empresa)
    private readonly empresaRepository: Repository<Empresa>,
    @Inject(forwardRef(() => UsuarioService))
    private readonly usuarioService: UsuarioService,
  ) {}

  async create(createEmpresaDto: CreateEmpresaDto, userId: string) {
    const company = this.empresaRepository.create({
      ...createEmpresaDto,
    });
    if (!company.cpfCnpj.match(RegExHelper.cpfCnpj)) {
      throw new NotAcceptableException(
        'CPF ou CNPJ invalido, favor inserir corretamente',
      ); // erro 406
    }

    const companyAlreadyExist =
      (await this.empresaRepository.findOne({
        where: {
          razaoSocial: company.razaoSocial,
        },
      })) ||
      (await this.empresaRepository.findOne({
        where: { cpfCnpj: company.cpfCnpj },
      }));

    // console.log(companyAlreadyExist);

    if (companyAlreadyExist) {
      throw new ConflictException(
        'CPF/CNPJ ou razão social ja existente no sistema',
      );
    }

    const savedCompany = await this.empresaRepository.save(company);
    // console.log(savedCompany);

    try {
      await this.usuarioService.findOneOrFail({
        where: { id: userId },
      });
    } catch (error) {
      return null;
    }
    // console.log('user');
    // console.log(user);

    // const updatedUser =
    // console.log('Salvando empresa no usuario');
    await this.usuarioService.updateEmpresa(userId, savedCompany.id);
    // console.log('updateEmpresa');
    // console.log(teste);
    console.log('userId', userId);

    await this.usuarioService.updateAfterEmpresa(userId, 'g');

    // return 'createdEmpresa';
    return savedCompany;
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
