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
  Req,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import {
  ApiForbiddenResponse,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import {
  Action,
  CaslAbilityFactory,
} from 'src/casl/casl-ability.factory/casl-ability.factory';
import { Usuario } from './entities/usuario.entity';
import { CheckAbilities } from 'src/casl/abilities.decorator';
import { EmpresaService } from 'src/empresa/empresa.service';
import { usuarioEmpresaDto } from './dto/usuario-empresa.dto';

@ApiTags('Users')
@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}
  // private caslAbilityFactory: CaslAbilityFactory,
  // private empresaService: EmpresaService,

  @ApiResponse({ status: 409, description: 'Conflito de email' })
  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @Post()
  async create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return await this.usuarioService.create(createUsuarioDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @Get()
  async findAll() {
    // @Req() req: any
    // console.log(req.user);
    // const user = req.user;
    // const ability = this.caslAbilityFactory.createForUser(user);

    // const isAllowed = ability.can(Action.Read, Usuario);

    // if (!isAllowed) {
    //   throw new ForbiddenException('Only admin!');
    // }

    return await this.usuarioService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @Get('empresa/:id')
  async findOneEmpresa(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.usuarioService.findOneEmpresa(id);
  }

  @UseGuards(AuthGuard('jwt'))
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
        'empresa',
      ],
    });

    // return await this.usuarioService.findOneOrFail2(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @ApiProperty({
    description:
      'Recebe um objeto que precisa ter um conter userId com uuid do user e empresaId com id da empresa, com isso a empresa é cadastrada no usuario, se receber o empresaID como null fara a retirada da empresa',
  })
  @Patch('saindoEmpresa')
  async updateEmpresa(@Body() usuarioEmpresaDto: usuarioEmpresaDto) {
    const userId = usuarioEmpresaDto.userId;
    const empresaId = null;

    return await this.usuarioService.updateEmpresa(userId, empresaId);
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
  // @CheckAbilities({ action: Action.Delete, subject: Usuario })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.usuarioService.remove(id);
  }

  // @UseGuards(AuthGuard(jwt))
  // @Delete('deleteEmpresa')
}
