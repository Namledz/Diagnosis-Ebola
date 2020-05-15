import { Controller, Get, Post, Body, Res, Req, Param, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { Request } from 'express';
const data = require("../data/data.json");

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

	@Get('/get-covid-19-symptoms')
	getCovid() {
		return this.appService.getCovidSymptoms()
	}
	
	@Get('/admin')
	@Render('admin/index.ejs')
	admin(){
		return
	}

	@Post('/getConclusions')
	getConclusions(@Req() request: Request ) {
		// console.log(data)
		console.log(request.body)
		console.log(12313123)
		// return this.appService.getConclusions()
	}
}
