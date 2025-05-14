import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule, //.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: "1234567890", // process.env.JWT_SECRET,
      signOptions: { expiresIn: '60m' },
    }),
    PrismaModule
  ],
  providers: [
    AuthService, JwtStrategy
  ],
  controllers: [AuthController]
})
export class AuthModule {}
