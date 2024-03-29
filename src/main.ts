
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } 
from '@nestjs/platform-fastify';
import { join } from 'path';
import { AppModule } from './app.module';
var cors = require('cors')

async function bootstrap() {
	const app = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		new FastifyAdapter(),
	);

	app.useStaticAssets({
		root: join(__dirname, '..', 'public'),
		prefix: '/public/',
	});
	app.setViewEngine({
		engine: {
			ejs: require('ejs'),
		},
		templates: join(__dirname, '..', 'views'),
	});

	await app.listen(6969);
	console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap()