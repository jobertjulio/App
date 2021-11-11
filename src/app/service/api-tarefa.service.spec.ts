import { TestBed } from '@angular/core/testing';

import { ApiTarefaService } from './api-tarefa.service';

describe('ApiTarefaService', () => {
  let service: ApiTarefaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiTarefaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
