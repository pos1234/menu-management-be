// src/menu/dto/create-menu.dto.ts
import {
  IsOptional,
  IsString,
  IsInt,
  IsUUID,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMenuDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ description: 'The name of the menu', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: 'The URL of the menu', required: false })
  @IsOptional()
  @IsString()
  url?: string;

  @ApiProperty({ description: 'The icon of the menu', required: false })
  @IsOptional()
  @IsString()
  icon?: string;

  @ApiProperty({ description: 'The order of the menu', required: false })
  @IsOptional()
  @IsInt()
  order?: number;

  @ApiProperty({ description: 'The parent menu ID', required: false })
  @IsOptional()
  @IsUUID()
  parentId?: string;
}
