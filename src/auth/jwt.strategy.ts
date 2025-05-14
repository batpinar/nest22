import { Injectable } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey:"1234567890", // process.env.JWT_SECRET,
        }); 
    }
    async validate(payload: any) {
        // You can add additional validation logic here if needed
        return { id: payload.sub, email: payload.email, role: payload.role };
        // you sould return only Id 
        
    }
}