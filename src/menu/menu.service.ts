// src/menu/menu.service.ts
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Menu } from '@prisma/client';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}

  /**
   * Retrieves all menus and constructs a hierarchical tree.
   */
  async getMenus(): Promise<any[]> {
    // Fetch all menus ordered by the 'order' field
    const menus: Menu[] = await this.prisma.menu.findMany({
      orderBy: { order: 'asc' },
    });
    return this.buildHierarchy(menus);
  }

  /**
   * Builds a nested tree from a flat list of menus.
   */
  private buildHierarchy(menus: Menu[]): any[] {
    // Create a map for constant time lookup.
    const menuMap: Record<string, any> = {};

    // Initialize map and add a children array to each menu.
    menus.forEach((menu) => {
      menuMap[menu.id] = { ...menu, children: [] };
    });

    // Build the hierarchy.
    const roots: any[] = [];
    menus.forEach((menu) => {
      if (menu.parentId) {
        // If there is a parent, add this menu to its children array.
        if (menuMap[menu.parentId]) {
          if (menuMap[menu.parentId].children) {
            menuMap[menu.parentId].children.push(menuMap[menu.id]);
          } else {
            menuMap[menu.parentId].children = [menuMap[menu.id]];
          }
        }
      } else {
        // If no parent, this is a root node.
        roots.push(menuMap[menu.id]);
      }
    });

    return roots;
  }

  async createMenu(createMenuDto: CreateMenuDto): Promise<Menu> {
    const { name, url, icon, order, parentId } = createMenuDto;
    return this.prisma.menu.create({
      data: {
        name,
        url,
        icon,
        order: order ?? 0,
        parentId,
      },
    });
  }

  async updateMenu(id: string, updateMenuDto: UpdateMenuDto): Promise<Menu> {
    const { name, url, icon, order, parentId } = updateMenuDto;

    if (!id) {
      throw new Error('Invalid ID provided for update');
    }

    if ((await this.prisma.menu.findUnique({ where: { id } })) === null) {
      throw new NotFoundException('Menu not found');
    }

    return this.prisma.menu.update({
      where: { id },
      data: {
        name: name ?? undefined,
        url: url ?? undefined,
        icon: icon ?? undefined,
        order: order ?? undefined,
        parentId: parentId ?? undefined,
      },
    });
  }

  async deleteMenu(id: string): Promise<Menu> {
    if ((await this.prisma.menu.findUnique({ where: { id } })) === null) {
      throw new NotFoundException('Menu not found');
    }

    // Find all child menus
    const childMenus = await this.prisma.menu.findMany({
      where: {
        parentId: id,
      },
    });

    // Recursively delete child menus
    for (const childMenu of childMenus) {
      await this.deleteMenu(childMenu.id);
    }

    // Delete the menu
    return this.prisma.menu.delete({
      where: { id },
    });
  }
}
