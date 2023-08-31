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
import { ProjetoService } from './projeto.service';
import { CreateProjetoDto } from './dto/create-projeto.dto';
import { UpdateProjetoDto } from './dto/update-projeto.dto';
import { ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Projects')
@UseGuards(AuthGuard('jwt'))
@Controller('projeto')
export class ProjetoController {
  constructor(private readonly projetoService: ProjetoService) {}

  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @Post()
  create(@Body() createProjetoDto: CreateProjetoDto, @Req() req: any) {
    const id = req.user.id;
    console.log(id);

    return this.projetoService.create(createProjetoDto, id);
  }

  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @Get()
  findAll(@Req() req: any) {
    const id = req.user.id;
    return this.projetoService.findAll(id);
  }

  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projetoService.findOne(+id);
  }

  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @Patch('/addUser/:id')
  updateUsuario(@Param('id') id: string, @Body() body: any) {
    // console.log(id);
    // console.log(body.userEmail);

    return this.projetoService.updateUsuario(+id, body.userEmail);
  }

  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjetoDto: UpdateProjetoDto) {
    return this.projetoService.update(+id, updateProjetoDto);
  }

  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projetoService.remove(+id);
  }
}
