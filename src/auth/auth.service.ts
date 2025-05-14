import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly prismaService: PrismaService,private readonly jwtService: JwtService) {
        // Constructor logic can be added here if needed
    }

    async register(email: string, password: string, role: string) {
        // Registration logic goes here
        const hashedPassword = await bcrypt.hash(password, 10);
        return await this.prismaService.user.create({
            data: {
                email,
                password: hashedPassword,
                role,
            },
        });
    }

    async validateUser(email: string, password: string) {
        // Login logic goes here
        const user = await this.prismaService.user.findUnique({
            where: { email },
        });

        if (user && (await bcrypt.compare(password, user.password))) {
            return {
                id: user.id,
                // email ve role eklenmemesi lazım, id ile databaseden çekilecek
                email: user.email,
                role: user.role,
            };
        }
        return null;
    }

    async generateToken(user: any) {
        // Token generation logic goes here
        // This is a placeholder. You should implement JWT or any other token generation logic.
        return {
            access_token:this.jwtService.sign(user)
        }

    }

}
