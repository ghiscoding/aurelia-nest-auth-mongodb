import { Body, Controller, Get, Param, Res, Req, Request, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

import authConfig from './auth-config.development';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { TokenDto, UsernameDto, UserSignupDto } from './dto';

@ApiTags('Authorization API')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private readonly userService: UserService) { }

  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  @ApiOperation({ summary: 'Initiates the Facebook OAuth2 login flow' })
  facebookLogin() { }

  @Get('facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  @ApiOperation({ summary: 'Handles the Facebook OAuth2 callback and return User Info when Successful' })
  facebookLoginCallback(@Req() req, @Res() res) {
    const jwt: string = req.user.jwt;
    if (jwt) {
      res.redirect(`${authConfig.callbackSuccessUrl}?code=${jwt}`);
    } else {
      res.redirect(authConfig.callbackFailureUrl);
    }
  }

  @Get('github')
  @UseGuards(AuthGuard('github'))
  @ApiOperation({ summary: 'Initiates the GitHub OAuth2 login flow' })
  githubLogin() { }

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  @ApiOperation({ summary: 'Handles the GitHub OAuth2 callback and return User Info when Successful' })
  githubLoginCallback(@Req() req, @Res() res) {
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
  @ApiOperation({ summary: 'Initiates the Google OAuth2 login flow' })
  googleLogin() { }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Handles the Google OAuth2 callback and return User Info when Successful' })
  googleLoginCallback(@Req() req, @Res() res) {
    const jwt: string = req.user.jwt;
    if (jwt) {
      res.redirect(`${authConfig.callbackSuccessUrl}?code=${jwt}`);
    } else {
      res.redirect(authConfig.callbackFailureUrl);
    }
  }

  @Get('twitter')
  @UseGuards(AuthGuard('twitter'))
  @ApiOperation({ summary: 'Initiates the Twitter OAuth2 login flow' })
  twitterLogin() { }

  @Get('twitter/callback')
  @UseGuards(AuthGuard('twitter'))
  @ApiOperation({ summary: 'Handles the Twitter Windows Live OAuth2 callback and return User Info when Successful' })
  twitterLoginCallback(@Req() req, @Res() res) {
    const jwt: string = req.user.jwt;
    if (jwt) {
      res.redirect(`${authConfig.callbackSuccessUrl}?code=${jwt}`);
    } else {
      res.redirect(authConfig.callbackFailureUrl);
    }
  }

  @Get('windowslive')
  @UseGuards(AuthGuard('windowslive'))
  @ApiOperation({ summary: 'Initiates the Microsoft Windows Live OAuth2 login flow' })
  windowsliveLogin() { }

  @Get('windowslive/callback')
  @UseGuards(AuthGuard('windowslive'))
  @ApiOperation({ summary: 'Handles the Microsoft Windows Live OAuth2 callback and return User Info when Successful' })
  windowsliveLoginCallback(@Req() req, @Res() res) {
    console.log('this is the req.user::', req.user.jwt, req.user.userId)
    const jwt: string = req.user.jwt;
    if (jwt) {
      res.redirect(`${authConfig.callbackSuccessUrl}?code=${jwt}`);
    } else {
      res.redirect(authConfig.callbackFailureUrl);
    }
  }

  @Get('linkedin')
  @UseGuards(AuthGuard('linkedin'))
  @ApiOperation({ summary: 'Initiates the LinkedIn OAuth2 login flow' })
  linkedinLogin() { }

  @Get('linkedin/callback')
  @UseGuards(AuthGuard('linkedin'))
  @ApiOperation({ summary: 'Handles the LinkedIn OAuth2 callback and return User Info when Successful' })
  linkedinLoginCallback(@Req() req, @Res() res) {
    const jwt: string = req.user.jwt;
    if (jwt) {
      res.redirect(`${authConfig.callbackSuccessUrl}?code=${jwt}`);
    } else {
      res.redirect(authConfig.callbackFailureUrl);
    }
  }

  @Get('microsoft')
  @UseGuards(AuthGuard('microsoft'))
  @ApiOperation({ summary: 'Initiates the Microsoft OAuth2 login flow' })
  microsoftLogin() { }

  @Get('microsoft/callback')
  @UseGuards(AuthGuard('microsoft'))
  @ApiOperation({ summary: 'Handles the Microsoft OAuth2 callback and return User Info when Successful' })
  microsoftLoginCallback(@Req() req, @Res() res) {
    const jwt: string = req.user.jwt;
    if (jwt) {
      res.redirect(`${authConfig.callbackSuccessUrl}?code=${jwt}`);
    } else {
      res.redirect(authConfig.callbackFailureUrl);
    }
  }

  @ApiOperation({ summary: 'Login Current User' })
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @ApiOperation({ summary: 'Logout Current User' })
  @Get('/logout')
  logout(@Req() req, @Res() res) {
    req.logout();
    res.redirect('/');
  }

  @ApiOperation({ summary: 'Signup a new User' })
  @Post('signup')
  async signup(@Body() signupUser: UserSignupDto) {
    return await this.authService.signup(signupUser);
  }

  @ApiOperation({ summary: 'Check if Username is Available in the DB' })
  @Post('username-available')
  async usernameAvailable(@Body() username: UsernameDto) {
    return await this.authService.usernameAvailable(username);
  }

  // @Get('link/:providerName/:id')
  // @UseGuards(AuthGuard('jwt'))
  // link(@Param() params, @Request() req) {
  //   console.log('link::', req.user, 'provider::', params.providerName, params.id)
  // }

  @ApiOperation({ summary: 'Link a new OAuth Provider to a User' })
  @Post('link/:providerName')
  @UseGuards(AuthGuard('jwt'))
  providerLink(@Param() params, @Body() tokenDto: TokenDto, @Request() req) {
    console.log('link::', req.user, 'providerName::', params.providerName, ' - token::', tokenDto)
    return this.userService.link(req.user.userId, tokenDto.token, params.providerName);
  }

  @ApiOperation({ summary: 'Unlink an OAuth Provider from a User' })
  @Get('unlink/:providerName')
  @UseGuards(AuthGuard('jwt'))
  unlink(@Param() params, @Request() req) {
    console.log('user is', req.user)
    return this.userService.unlink(req.user.userId, params.providerName)
  }

  @ApiOperation({ summary: 'Get User\'s Information' })
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getProfile(@Request() req) {
    return this.userService.findOne({ 'providers.providerId': req.user.userId });
  }
}
