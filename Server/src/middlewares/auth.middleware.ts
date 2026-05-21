import { ExceptionTypeUser } from '@exceptions/userExceptions.type';
import { HttpException } from '@exceptions/HttpException';
import { TokenRepository } from '@repositories/user-repositories/token.repository';
import { TokenService } from '@services/user-services/token.service';
import { Response, NextFunction, Request } from 'express';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const tokenService = new TokenService();
    const authorizationHeader = req.headers.authorization;
    const accessToken = authorizationHeader.split(' ')[1];

    const userData = tokenService.validateAccessToken(accessToken);
    const { refreshToken } = req.cookies;
    if (!refreshToken) throw new HttpException(404, ExceptionTypeUser.AUTHORIZATION_ERROR);
    if (!authorizationHeader) throw new HttpException(404, ExceptionTypeUser.AUTHORIZATION_ERROR);
    if (!userData) throw new HttpException(404, ExceptionTypeUser.AUTHORIZATION_ERROR);
    req.user = userData;
    next();
  } catch (error) {
    next(error);
  }
};
