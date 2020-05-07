import { Controller, Get, Post, Res, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) { }

	@Get('/')
	@Render('index.ejs')
	index() {
		return { message: '' };
	}

	@Get('/get-ebola-symptoms')
	getEbola(){
		return this.appService.getEbolaSymptoms()
	}

	@Get('/get-covid-symtoms')
	getCovid() {
		return this.appService.getCovidSymptoms()
	}
	
	@Get('/admin')
	@Render('admin/index.ejs')
	admin(){
		return
	}
}
