import { UserRepository } from '@repositories/user-repositories/user.repository';
import { MailService } from '@services/user-services/mail.service';
import { TokenService } from './token.service';
import { TokenRepository } from '@repositories/user-repositories/token.repository';
import { iUserDto, UserDto } from '@dtos/user.dto';
import { iUser, iUserAttributes } from '@interfaces/user-interfaces/user.model.interface';
import bcrypt from 'bcrypt';
import uuid from 'uuid';
import { API_URL } from '@config/dotenv.config';
import { HttpException } from '@exceptions/HttpException';
import { ExceptionTypeUser } from '@exceptions/userExceptions.type';

export class UserService {
  private salt = 10;
  public userRepository = new UserRepository();
  public mailService = new MailService();
  private tokenService = new TokenService();
  private tokenRepository = new TokenRepository();

  public async getAllUsers(): Promise<iUserAttributes[]> {
    const users = await this.userRepository.getAllUsers();
    return users;
  }
  async getUserById(id: number): Promise<iUserDto> {
    const user = await this.userRepository.getUserById(id);
    const userDto = new UserDto(user);
    return userDto;
  }

  public async regUser(email: string, password: string): Promise<iUser> {
    const hashPassword = await bcrypt.hash(password, this.salt);
    const activationLink = uuid.v4();
    const user = await this.userRepository.regUser(email, hashPassword, activationLink);
    if (user) {
      await this.mailService.sendActivationMail(email, `${API_URL}/api/user/activate/${activationLink}`);
    } else throw new HttpException(404, ExceptionTypeUser.DB_USER_ALREADY_EXISTS);

    const userDto = new UserDto(user);
    const tokens = this.tokenService.generateTokens({ ...userDto });
    await this.tokenRepository.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  public async activate(activatedLink: string): Promise<iUserDto> {
    const user = await this.userRepository.activate(activatedLink);
    const userDto = new UserDto(user);
    return userDto;
  }

  public async loginUser(email: string, password: string): Promise<iUser> {
    const user = await this.userRepository.loginUser(email);
    const hashPassword = user.dataValues.password;
    if (!(await bcrypt.compare(password, hashPassword))) throw new HttpException(404, ExceptionTypeUser.DB_USER_INVALID_PASSWORD);
    const userDto = new UserDto(user);
    const tokens = this.tokenService.generateTokens({ ...userDto });
    await this.tokenRepository.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  public async logoutUser(refreshToken: string) {
    await this.userRepository.logoutUser(refreshToken);
    return 'Success logout';
  }
  public async refresh(refreshToken: string) {
    const validation = await this.tokenService.validateRefreshToken(refreshToken);
    const token = await this.tokenRepository.findRefreshToken(refreshToken);

    if (!validation && !token) {
      throw new HttpException(404, ExceptionTypeUser.DB_USERS_GET_NOT_GOT);
    }

    const user = await this.userRepository.getUserById(token.dataValues.userId);
    const userDto = new UserDto(user);
    const tokens = this.tokenService.generateTokens({ ...userDto });

    return {
      ...tokens,
      user: userDto,
    };
  }
}
