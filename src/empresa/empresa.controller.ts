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
import { EmpresaService } from './empresa.service';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { ApiForbiddenResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Company')
@UseGuards(AuthGuard('jwt'))
@Controller('empresa')
export class EmpresaController {
  constructor(private readonly empresaService: EmpresaService) {}

  @ApiResponse({
    status: 409,
    description: 'Conflito de CPF, CNPJ ou de Razao Social',
  })
  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @Post()
  create(@Body() createEmpresaDto: CreateEmpresaDto, @Req() req: any) {
    const userId = req.user.id;
    // console.log(req.user);
    // console.log(userId);

    return this.empresaService.create(createEmpresaDto, userId);
  }

  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @Get()
  findAll() {
    return this.empresaService.findAll();
  }

  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.empresaService.findOne(+id);
  }

  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmpresaDto: UpdateEmpresaDto) {
    return this.empresaService.update(+id, updateEmpresaDto);
  }

  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.empresaService.remove(+id);
  }
}
