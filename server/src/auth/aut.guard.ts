  import { CanActivate, ExecutionContext, Injectable, UnauthorizedException,} from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { JwtService } from '@nestjs/jwt';
  //import { jwtConstants } from './constants';
  import { Request } from 'express';
  import { SetMetadata } from '@nestjs/common';

    // export const IS_PUBLIC_KEY = 'isPublic';
    // export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
    
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private reflector: Reflector) {}


    //async canActivate(context: ExecutionContext): Promise<boolean> {
       
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
    // const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
    //     context.getHandler(),
    //     context.getClass(),
    //     ]);
    //     if (isPublic) {
       
    //     return true;
    //     }
      const request = context.switchToHttp().getRequest();
    //const token = request.headers.split()
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        console.log("no token");
                                
        throw new UnauthorizedException();
      }
      try {
        const payload = await this.jwtService.verifyAsync(
          token
        );
        // 💡 We're assigning the payload to the request object here
        // so that we can access it in our route handlers
        request['user'] = payload;
      } catch(err) {
        console.log("cath token", err);
        
        throw new UnauthorizedException();
      }
      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      console.log("55",request.headers)
      const [type, token] = request.headers.authorization.split(' ');
      console.log("tokenn",token);''
      return token;
    }
  }