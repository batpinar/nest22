import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
// Kendi yazdığımız guard
export class TokenGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.headers['x-auth-token']; // Token header name can be changed as needed

        if (!token) {
            throw new HttpException('Token not found', HttpStatus.UNAUTHORIZED);
        }

        // Token validation logic goes here
        // For example, you can check if the token is valid or expired

        return true; // Return true if the token is valid, false otherwise
    }
}