// src/menu/menu.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { ApiTags, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { Menu } from './entities/menu.entity';

@Controller('menus')
@ApiTags('menus')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  @ApiOkResponse({
    description: 'Retrieve all menus',
    type: Menu,
    isArray: true,
  })
  async getMenus() {
    return await this.menuService.getMenus();
  }

  @Post()
  @ApiCreatedResponse({
    description: 'The menu has been successfully created.',
    type: Menu,
  })
  async createMenu(@Body() createMenuDto: CreateMenuDto) {
    return await this.menuService.createMenu(createMenuDto);
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'The menu has been successfully updated.',
    type: Menu,
  })
  async updateMenu(
    @Param('id') id: string,
    @Body() updateMenuDto: UpdateMenuDto,
  ) {
    return await this.menuService.updateMenu(id, updateMenuDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'The menu has been successfully deleted.' })
  async deleteMenu(@Param('id') id: string) {
    return await this.menuService.deleteMenu(id);
  }
}
