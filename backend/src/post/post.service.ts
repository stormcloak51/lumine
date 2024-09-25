import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.post.findMany();
  }

  createPost(content: string) {
    return this.prisma.post.create({
      data: {
        content
      }
    })
  }
}
