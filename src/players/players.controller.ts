import { Controller, Post, Body, Get, Query, Delete } from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/create-player.dto';
import { PlayersService } from './players.service';
import { Player } from './interfaces/player.interface';

@Controller('api/v1/players')
export class PlayersController {

    constructor(private readonly playersService: PlayersService) {};

    @Post()
    async createUpdatePlayer( @Body() createPlayerDTO: CreatePlayerDTO): Promise<void> {
        await this.playersService.createUpatePlayer(createPlayerDTO);
    }

    @Get()
    async getPlayers( @Query('email') email: string ): Promise<Player[] | Player> {
        if (email) {
            return this.playersService.getPlayersByEmail(email);
        }
        return this.playersService.getAllPlayers(); 
    }

    @Delete()
    async deletePlayer(@Query('email') email: string): Promise<void> {
        this.playersService.deletePlayer(email);
    }
}
