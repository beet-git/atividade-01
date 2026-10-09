
import { Controller, Get } from '@nestjs/common';
import { TarefasService } from './tarefas.service';

// Prefixo das rotas: /api/tarefas
@Controller('tarefas')
export class TarefasController {
  constructor(
    private readonly tarefasService: TarefasService,
  ) {}

  @Get()
  findAll() {
    return this.tarefasService.findAll();
  }
}