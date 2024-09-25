import { Test, TestingModule } from '@nestjs/testing';
import { PokeApiController } from '../infrastructure/controllers/poke-api.controller';
import { PokeApiService } from '../infrastructure/services/poke-api.service';

describe('PokeApiController', () => {
  let controller: PokeApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PokeApiController],
      providers: [PokeApiService],
    }).compile();

    controller = module.get<PokeApiController>(PokeApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
