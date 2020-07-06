import { Controller, Post, Body } from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/create-player.dto';
import { PlayersService } from './players.service';

@Controller('api/v1/players')
export class PlayersController {

    constructor(private readonly playersService: PlayersService) {};

    @Post()
    async createUpdatePlayer( @Body() createPlayerDTO: CreatePlayerDTO) {
        await this.playersService.createUpatePlayer(createPlayerDTO);
    }
}
