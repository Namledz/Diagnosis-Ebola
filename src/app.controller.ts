import { Controller, Get, Post, Body, Res, Req, Param, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { CovidService } from './covid.service';
import { Response, response } from 'express';
import { Request } from 'express';
import { request } from 'http';
const data = require("../data/data.json");

@Controller()	
export class AppController {
	constructor(private readonly appService: AppService, private readonly covidService: CovidService) { }

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

	@Post('/addPatientInfo')
	addPatientInfo(@Req() request: Request ) {
		let body = request.body

		let date = new Date()
		var month = date.getUTCMonth() + 1; //months from 1-12
		var day = date.getUTCDate();
		var year = date.getUTCFullYear();
		let newDate = `${day}-${month}-${year}` ;

		let data = {
			patientName: body.patientName,
			disease: body.disease,
			intensity: body.intensity,
			conclusion: body.conclusion,
			date: newDate,
			email: body.email,
			age: body.age,
			sex: body.sex,
			set: body.set
		}
		return this.appService.addPatientInfo(data)
	}

	@Post('/admin/getListpatient')
	getListpatient(@Req() request: Request ) {
		return this.appService.getListPatient()
	}

	@Post('/admin/get-detail-patient')
	getPatientDetail(@Req() request: Request ) {
		let body = request.body;
		let patientId = body.patientId
		return this.appService.getPatientDetail(patientId)
	}

	@Get('/get-docter-diagnosis')
	getDocterDiagnosis() {
		return this.appService.getDoctersDiagnosis()
	}


	@Post('/submit-covid')
	submitCovid(@Req() request: Request) {
		let body = request.body
		let data = body.factors;
		console.log(data);
		return this.covidService.submitCovid(data);
	}

	// @Post('/get-topsis-hospital')
	// getTopsisHospital(@Req() request: Request ) {
	// 	let body = request.body;
	// 	let district_id = body.district_id
	// 	let rate = body.rate
	// 	return this.appService.getTopsisHospital(district_id, rate)
	// }
}
