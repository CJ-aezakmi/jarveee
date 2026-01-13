import { PartialType } from '@nestjs/swagger';
import { CreateAccountDto } from './create-account.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AccountStatus } from '../entities/account.entity';

export class UpdateAccountDto extends PartialType(CreateAccountDto) {
  @ApiProperty({ enum: AccountStatus, required: false })
  @IsOptional()
  @IsEnum(AccountStatus)
  status?: AccountStatus;
}
