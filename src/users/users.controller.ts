import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { HttpException, HttpStatus } from '@nestjs/common';
import { TokenGuard } from 'src/guards/token.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
        // Constructor logic can be added here if needed
    }
    @UseGuards(JwtAuthGuard)
    @Get()
    async getAllUsers(@Req() req: Request) { // Request interface  güncellemeniz gerekiyor
        const user = req.user;
        if (user.role !== 'admin') {
            throw new HttpException('You do not have admin authority', HttpStatus.UNAUTHORIZED);
        }
        return this.usersService.getAllUsers();
    }
    @UseGuards(JwtAuthGuard)
    @Get('me')
    async getMe(@Req() req: Request) { // Request interface  güncellemeniz gerekiyor
        const user = req.user;
        if (!req.user || !req.user.id) {
            throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
        }
        return this.usersService.getUserById(Number(user.id));
    }
    @UseGuards(TokenGuard)
    @Get('check-header')
    async checkHeader(@Req() req: Request) { // Request interface  güncellemeniz gerekiyor
        const token = req.headers['x-auth-token'];
        if (!token) {
            throw new HttpException('Token not found', HttpStatus.UNAUTHORIZED);
        }
        return { message: 'Token is valid' };
    }
}
