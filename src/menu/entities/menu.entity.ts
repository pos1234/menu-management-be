import { ApiProperty } from '@nestjs/swagger';

export class Menu {
  @ApiProperty({ description: 'The id of the menu' })
  id: string;

  @ApiProperty({ description: 'The name of the menu' })
  name: string;

  @ApiProperty({ description: 'The description of the menu' })
  description: string;

  @ApiProperty({ description: 'The price of the menu' })
  price: number;
}
