import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

// Configuração padrão para setar os tipos de logs que a aplicação poderá exibir
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['debug', 'error', 'log', 'warn']
  });

  app.enableCors();

/*Transform: transforma o que vem via post para nossos objetos
  Whitelist: mapeia apenas o que vem na requisição que esteja de acordo com o DTOS
  ForbidNonWhiteLis: não retorna erro se chegar campos mapeados, apenas serão ignorados 
*/
  app.useGlobalPipes(new ValidationPipe({transform: true, whitelist: true, forbidNonWhitelisted:false}));

  app.setGlobalPrefix('api');

  await app.listen(3000);
}
bootstrap();