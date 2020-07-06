import { Injectable, Logger } from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PlayersService {

    private players: Player[] = [];

    private readonly logger = new Logger(PlayersService.name);

    async createUpatePlayer(createPlayerDTO: CreatePlayerDTO): Promise<void> {

        await this.create(createPlayerDTO);

    }

    private create(createPlayerDTO: CreatePlayerDTO): void {
        const { name, email, playerPhone } = createPlayerDTO;

        const player: Player = {
            _id: uuidv4(),
            name,
            playerPhone,
            email,
            ranking: 'A',
            rankingPosition: 1,
            photoUrl: 'www.google.com.br/foto123.jpg'
        }

        this.logger.log(`createPlayerDTO: ${JSON.stringify(player)}`);

        this.players.push(player);
    }
}
