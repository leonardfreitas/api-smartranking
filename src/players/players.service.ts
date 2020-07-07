import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PlayersService {

    private players: Player[] = [];

    private readonly logger = new Logger(PlayersService.name);

    async createUpatePlayer(createPlayerDTO: CreatePlayerDTO): Promise<void> {

        const { email } = createPlayerDTO;

        const playerFounded = await this.players.find(player => player.email == email);

        if (playerFounded) {
            await this.update(playerFounded, createPlayerDTO);
        } else {
            await this.create(createPlayerDTO);
        }
    }

    async getAllPlayers(): Promise<Player[]> {
        return await this.players;
    }

    async getPlayersByEmail(email: string): Promise<Player> {
        const playerFounded = await this.players.find(player => player.email === email);
        if (!playerFounded) {
            throw new NotFoundException(`Jogador não encontrado`);
        }
        return playerFounded;
    }

    async deletePlayer(email: string): Promise<void> {
        const playerFounded = await this.players.find(player => player.email === email);
        if (!playerFounded) {
            throw new NotFoundException(`Jogador não encontrado`);
        } else {
            this.players = this.players.filter(player => player.email !== playerFounded.email);
        }
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

    private update(playerFounded: Player, createPlayerDTO: CreatePlayerDTO): void {
        const { name } = createPlayerDTO;

        playerFounded.name = name;
    }
}
