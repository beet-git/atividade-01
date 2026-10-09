
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjetoDto } from './dto/create-projeto.dto';
import { UpdateProjetoDto } from './dto/update-projeto.dto';
import { Projeto } from './entities/projeto.entity';

@Injectable()
export class ProjetosService {
  private projetos: Projeto[] = [
    {
      id: 1,
      nome: 'Faculdade',
      descricao: 'Projeto de estudos',
      cor: 'azul',
    },
    {
      id: 2,
      nome: 'Trabalho',
      descricao: 'Projeto profissional',
      cor: 'verde',
    },
  ];

  private proximoId = 3;

  findAll(): Projeto[] {
    return this.projetos;
  }

  findOne(id: number): Projeto {
    const projeto = this.projetos.find((item) => item.id === id);

    if (!projeto) {
      throw new NotFoundException('Projeto não encontrado');
    }

    return projeto;
  }

  create(dto: CreateProjetoDto): Projeto {
    const novoProjeto: Projeto = {
      id: this.proximoId++,
      ...dto,
    };

    this.projetos.push(novoProjeto);
    return novoProjeto;
  }

  update(id: number, dto: UpdateProjetoDto): Projeto {
    const projeto = this.findOne(id);

    Object.assign(projeto, dto);

    return projeto;
  }

  remove(id: number): void {
    this.findOne(id);

    this.projetos = this.projetos.filter(
      (item) => item.id !== id,
    );
  }
}