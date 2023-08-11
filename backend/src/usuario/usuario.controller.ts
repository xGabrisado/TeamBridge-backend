import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { ApiForbiddenResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @ApiResponse({ status: 409, description: 'Conflito de email' })
  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @Post()
  async create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return await this.usuarioService.create(createUsuarioDto);
  }

  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @Get()
  async findAll() {
    return await this.usuarioService.findAll();
  }

  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.usuarioService.findOneOrFail({ where: { id } });
  }

  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ) {
    return await this.usuarioService.update(id, updateUsuarioDto);
  }

  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.usuarioService.remove(id);
  }
}
