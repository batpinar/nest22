import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class UsersService {
    // Constructor logic can be added here if needed
    constructor(private readonly prismaService: PrismaService) {
        // Initialization logic can be added here if needed
    }
    // admin tarafından kullanıcıları listeleme
    async getAllUsers() {
        // Logic to get all users goes here
        return this.prismaService.user.findMany();
    }
    // users tarafından kullanıcıları listeleme
    async getUserById(id: number)
    {
        // Logic to get a user by ID goes here
        return this.prismaService.user.findUnique({
            where: { id },
        });
    }
}
