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
  UseGuards,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { ApiForbiddenResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

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

  // @UseGuards(AuthGuard('jwt'))
  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @Get()
  async findAll() {
    return await this.usuarioService.findAll();
  }

  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.usuarioService.findOneOrFail({
      where: { id },
      select: [
        'userEmail',
        'userName',
        'userLastName',
        'created_At',
        'updated_At',
        'userPost',
        'userPermission',
      ],
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ) {
    const updatedUser = await this.usuarioService.update(id, updateUsuarioDto);
    return {
      userName: updatedUser.userName,
      userLastName: updatedUser.userLastName,
      userEmail: updatedUser.userEmail,
      userPost: updatedUser.userPost,
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.usuarioService.remove(id);
  }
}
