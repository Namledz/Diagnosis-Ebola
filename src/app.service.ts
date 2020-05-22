import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
	getHello(): string {
		return 'Hello World!';
	}

	getEbolaSymptoms(): object {
		let formFields = {
			sex: '',
			age: 65,
			symptoms: [
				{
					id: 1,
					title: 'Bleeding eyes',
					linguistic: '',
					isNotAffected: false,
					isAnswered: false
				},
				{
					id: 2,
					title: 'Bloody cough',
					linguistic: '',
					isNotAffected: false,
					isAnswered: false
				},
				{
					id: 3,
					title: 'Bleeding gums',
					linguistic: '',
					isNotAffected: false,
					isAnswered: false
				},
				{
					id: 4,
					title: 'Bleeding mouth',
					linguistic: '',
					isNotAffected: false,
					isAnswered: false
				},
				{
					id: 5,
					title: 'Backache',
					linguistic: '',
					isNotAffected: false,
					isAnswered: false
				},
				{
					id: 6,
					title: 'Breathing difficulty',
					linguistic: '',
					isNotAffected: false,
					isAnswered: false
				},
				{
					id: 7,
					title: 'Chest pain',
					linguistic: '',
					isNotAffected: false,
					isAnswered: false
				},
				{
					id: 8,
					title: 'Fever',
					linguistic: '',
					isNotAffected: false,
					isAnswered: false
				},
				{
					id: 9,
					title: 'Fatigue',
					linguistic: '',
					isNotAffected: false,
					isAnswered: false
				},
			],

			setNoSymptoms: (id) => {
				formFields.symptoms.forEach(element => {
					if (element.id == id) {
						element.isNotAffected = true;
						element.linguistic = ''
					}
				});
			},
			livingArea: {
				name: '',
				isAffected: true
			},
			regionsAffected: null,
			threeMonthVisited: null,
			patientInfo: {
				name: '',
				email: ''
			}
		}
		return formFields
	}

	getCovidSymptoms(): object {
		let formFields = {
			sex: '',
			age: 65,
			ethanol: null,
			atmosphericTemperature: null,
			bodyTemperature: null,
			symptoms: [
				{
					id: 'BS',
					title: 'Breath Shortness',
					linguistic: '',
					isNotAffected: false,
					isAnswered: false
				},
				{
					id: "CD",
					title: 'Cold',
					linguistic: '',
					isNotAffected: false,
					isAnswered: false
				},
				{
					id: "CH",
					title: 'Cough',
					linguistic: '',
					isNotAffected: false,
					isAnswered: false
				}
			],
			setNoSymptoms: (id) => {
				formFields.symptoms.forEach(element => {
					if (element.id == id) {
						element.isNotAffected = true;
						element.linguistic = ''
					}
				});
			},
			regionsAffected: null,
			patientInfo: {
				name: '',
				email: ''
			}
		}

		return formFields;
	}

	getConclusions(): object {
		let symptoms = ["bleedingEyes", "bloodyCough", "bleedingGums", "bleedingMouth", "backache", "breathingDifficulty", "chestPain", "fever", "fatigue", "regionIsAfrica", "africaVisited", "threeMonthVisisted"]

		let constMild = 0.2;
		let constModerate = 0.45;
		let constServere = 0.7;

		let ruleResult = [];

		return { 'test': 123 }
	}



	getNonZeroMinmumValue(array: Array<number>): number {
		let result;
		array.sort((a, b) => { return a - b })
		for (let i in array) {
			if (array[i] != 0) result = array[i]; break
		}
		return result
	}
}
