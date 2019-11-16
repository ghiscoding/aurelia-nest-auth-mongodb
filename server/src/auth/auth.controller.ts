import { Body, Controller, Get, Param, Res, Req, Request, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';

import authConfig from './auth-config.development';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { TokenDto, UserDto, UsernameDto } from './dto';

@ApiUseTags('auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private readonly userService: UserService) { }

  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  // initiates the Facebook OAuth2 login flow
  facebookLogin() { }

  @Get('facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  facebookLoginCallback(@Req() req, @Res() res) {
    // handles the Facebook OAuth2 callback
    const jwt: string = req.user.jwt;
    if (jwt) {
      res.redirect(`${authConfig.callbackSuccessUrl}?code=${jwt}`);
    } else {
      res.redirect(authConfig.callbackFailureUrl);
    }
  }

  @Get('github')
  @UseGuards(AuthGuard('github'))
  // initiates the Github OAuth2 login flow
  githubLogin() { }

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  githubLoginCallback(@Req() req, @Res() res) {
    // handles the Github OAuth2 callback
    console.log('this is the req.user::', req.user)
    const jwt: string = req.user.jwt;
    if (jwt) {
      res.redirect(`${authConfig.callbackSuccessUrl}?code=${jwt}`);
    } else {
      res.redirect(authConfig.callbackFailureUrl);
    }
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  // initiates the Google OAuth2 login flow
  googleLogin() { }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleLoginCallback(@Req() req, @Res() res) {
    // handles the Google OAuth2 callback
    const jwt: string = req.user.jwt;
    if (jwt) {
      res.redirect(`${authConfig.callbackSuccessUrl}?code=${jwt}`);
    } else {
      res.redirect(authConfig.callbackFailureUrl);
    }
  }

  @Get('twitter')
  @UseGuards(AuthGuard('twitter'))
  // initiates the twitter OAuth2 login flow
  twitterLogin() { }

  @Get('twitter/callback')
  @UseGuards(AuthGuard('twitter'))
  twitterLoginCallback(@Req() req, @Res() res) {
    // handles the twitter OAuth2 callback
    const jwt: string = req.user.jwt;
    if (jwt) {
      res.redirect(`${authConfig.callbackSuccessUrl}?code=${jwt}`);
    } else {
      res.redirect(authConfig.callbackFailureUrl);
    }
  }

  @Get('windowslive')
  @UseGuards(AuthGuard('windowslive'))
  // initiates the windowslive OAuth2 login flow
  windowsliveLogin() { }

  @Get('windowslive/callback')
  @UseGuards(AuthGuard('windowslive'))
  windowsliveLoginCallback(@Req() req, @Res() res) {
    // handles the windowslive OAuth2 callback
    console.log('this is the req.user::', req.user)
    const jwt: string = req.user.jwt;
    if (jwt) {
      res.redirect(`${authConfig.callbackSuccessUrl}?code=${jwt}`);
    } else {
      res.redirect(authConfig.callbackFailureUrl);
    }
  }

  @Get('linkedin')
  @UseGuards(AuthGuard('linkedin'))
  // initiates the linkedin OAuth2 login flow
  linkedinLogin() { }

  @Get('linkedin/callback')
  @UseGuards(AuthGuard('linkedin'))
  linkedinLoginCallback(@Req() req, @Res() res) {
    // handles the linkedin OAuth2 callback
    const jwt: string = req.user.jwt;
    if (jwt) {
      res.redirect(`${authConfig.callbackSuccessUrl}?code=${jwt}`);
    } else {
      res.redirect(authConfig.callbackFailureUrl);
    }
  }

  @Get('microsoft')
  @UseGuards(AuthGuard('microsoft'))
  // initiates the microsoft OAuth2 login flow
  microsoftLogin() { }

  @Get('microsoft/callback')
  @UseGuards(AuthGuard('microsoft'))
  microsoftLoginCallback(@Req() req, @Res() res) {
    // handles the microsoft OAuth2 callback
    const jwt: string = req.user.jwt;
    if (jwt) {
      res.redirect(`${authConfig.callbackSuccessUrl}?code=${jwt}`);
    } else {
      res.redirect(authConfig.callbackFailureUrl);
    }
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @Get('/logout')
  logout(@Req() req, @Res() res) {
    req.logout();
    res.redirect('/');
  }

  @Post('signup')
  async signup(@Body() signupUser: UserDto) {
    return await this.authService.signup(signupUser);
  }

  @Post('username-available')
  async usernameAvailable(@Body() username: UsernameDto) {
    return await this.authService.usernameAvailable(username);
  }

  // @Get('link/:providerName/:id')
  // @UseGuards(AuthGuard('jwt'))
  // link(@Param() params, @Request() req) {
  //   console.log('link::', req.user, 'provider::', params.providerName, params.id)
  // }

  @Post('link/:providerName')
  @UseGuards(AuthGuard('jwt'))
  providerLink(@Param() params, @Body() tokenDto: TokenDto, @Request() req) {
    console.log('link::', req.user, 'providerName::', params.providerName, ' - token::', tokenDto)
    return this.userService.link(req.user.userId, tokenDto.token);
  }

  @Get('unlink/:provider')
  @UseGuards(AuthGuard('jwt'))
  unlink(@Param() params, @Request() req) {
    console.log(req.user, params.provider)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('protected')
  @UseGuards(AuthGuard('jwt'))
  protectedResource(@Request() req) {
    return { result: 'JWT is working!', user: req.user };
  }
}
