// src/menu/dto/create-menu.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, IsUUID, IsNumber } from 'class-validator';

export class CreateMenuDto {
  @ApiProperty({ description: 'The name of the menu' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'The URL of the menu' })
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

  @ApiProperty({ description: 'The description of the menu' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'The price of the menu' })
  @IsNumber()
  price: number;
}
