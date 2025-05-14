import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import e from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
        // Constructor logic can be added here if needed
    }

    @Post('register')
    async register(@Body() body: {email: string, password: string, role}) {
        // Call the register method from AuthService
        return this.authService.register(body.email, body.password, body.role);
    }

    @Post('login')
    async login(@Body() body: {email: string, password: string}) {
        // Call the login method from AuthService
        const user = await this.authService.validateUser(body.email, body.password);
        if (!user) {
            throw new Error('User not found');
        }
        return this.authService.generateToken(user);
    }
        
}
