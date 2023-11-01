import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TarefaService } from './tarefa.service';
import { CreateTarefaDto } from './dto/create-tarefa.dto';
import { UpdateTarefaDto } from './dto/update-tarefa.dto';
import { ApiForbiddenResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CreateComentarioDto } from 'src/comentario/dto/create-comentario.dto';
import { ComentarioService } from 'src/comentario/comentario.service';
import { log } from 'console';
import { UpdateComentarioDto } from 'src/comentario/dto/update-comentario.dto';

@ApiTags('Tasks')
@UseGuards(AuthGuard('jwt'))
@Controller('tarefa')
export class TarefaController {
  constructor(
    private readonly tarefaService: TarefaService,
    private readonly comentarioService: ComentarioService,
  ) {}

  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @Post()
  create(@Body() createTarefaDto: CreateTarefaDto) {
    return this.tarefaService.create(createTarefaDto);
  }

  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @Get()
  findAll(@Req() req: any) {
    const id = req.user.id;

    return this.tarefaService.findAll(id);
  }

  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @Post(':id/comentario')
  createComment(
    @Param('id') tarefaId: string,
    @Body() createComentarioDto: CreateComentarioDto,
    @Req() req: any,
  ) {
    // console.log(req.user);

    return this.comentarioService.create(
      +tarefaId,
      createComentarioDto,
      req.user.id,
    );
  }

  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @Get(':id/comentario')
  findAllComments(@Param('id') tarefaId: string) {
    // console.log(req.user);

    return this.comentarioService.findAll(+tarefaId);
  }

  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @Get(':id/comentario/:commentId')
  findOneComments(
    @Param('id') tarefaId: string,
    @Param('commentId') commentId: any,
  ) {
    // console.log(req.user);

    return this.comentarioService.findOne(+tarefaId, commentId);
  }

  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @Patch(':id/comentario/:commentId')
  editComments(
    @Param('id') tarefaId: string,
    @Param('commentId') commentId: any,
    @Body() updateComentarioDto: UpdateComentarioDto,
  ) {
    // console.log(req.user);

    return this.comentarioService.update(commentId, updateComentarioDto);
  }

  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tarefaService.findOne(+id);
  }

  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTarefaDto: UpdateTarefaDto,
    @Req() req: any,
  ) {
    // console.log(req.user.id)

    return this.tarefaService.update(req.user.id, +id, updateTarefaDto);
  }

  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tarefaService.remove(+id);
  }
}
