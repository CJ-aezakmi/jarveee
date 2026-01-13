import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@ApiTags('accounts')
@Controller('accounts')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  @ApiOperation({ summary: 'Add a new social media account' })
  create(@Req() req, @Body() createAccountDto: CreateAccountDto) {
    return this.accountsService.create(req.user.id, createAccountDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all user accounts' })
  findAll(@Req() req) {
    return this.accountsService.findAll(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get account by ID' })
  findOne(@Req() req, @Param('id') id: string) {
    return this.accountsService.findOne(id, req.user.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update account' })
  update(@Req() req, @Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountsService.update(id, req.user.id, updateAccountDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete account' })
  remove(@Req() req, @Param('id') id: string) {
    return this.accountsService.remove(id, req.user.id);
  }
}
