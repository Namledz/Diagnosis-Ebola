var myApp = angular.module('MyApp', ['ngAnimate']);

myApp.controller('HomePageController', [
	'$scope',
	'$http',
	'$timeout',
	'$compile',
	'$location',
	function ($scope, $http, $timeout, $compile, $location) {

		$scope.sectionBlock = [
			{
				title: "Patient",
				isVisited: true,
			},
			{
				title: "Symptoms",
				isVisited: false,
			},

			{
				title: "Regions",
				isVisited: false
			},
			{
				title: "Review",
				isVisited: false
			},
		]

		$scope.screenBlock = []

		$scope.currentScreen = { title: 'Sex', index: 0 }

		$scope.formFields = {}

		$scope.controls = {
			screen: {
				previous: false,
				next: true,
				isCompleted: false,
			},
			question: {
				isAnswered: false,
			}
		}


		$scope.blockIsActivated = $scope.sectionBlock[0]

		$scope.isBlockVisited = (block) => {
			if (block.isVisited)
				return true
			return false
		}

		$scope.isBlockActivated = (block) => {
			if (block.title == $scope.blockIsActivated.title) {
				return true
			}
			return false
		}


		// Next and Previous Pages
		$scope.nextScreen = () => {
			let screenBlock = $scope.screenBlock

			let checkAnswered = $scope.isScreenAnswered($scope.currentScreen)

			if (checkAnswered.status == "Not Finish") {
				let title = ($scope.selectedDisease == "covid-19") ? "Covid-19 Diagnosis" : 'Ebola Diagnosis'
				toastr[checkAnswered.type](checkAnswered.message, title)
				return;
			}

			$scope.currentScreen.index += 1;
			let index = $scope.currentScreen.index

			if (index > 0) {
				$scope.controls.screen.previous = true
			}

			if ($scope.currentScreen.index == (screenBlock.length - 1)) {
				$scope.controls.screen.next = false;
				$('body').addClass('blur-loading')
				$timeout(() => {
					$scope.controls.screen.isCompleted = true;
					$scope.currentScreen.title = screenBlock[$scope.currentScreen.index]
					$('body').removeClass('blur-loading')
				}, 800)
			}
			else {
				$scope.currentScreen.title = screenBlock[$scope.currentScreen.index]
			}
		}

		$scope.previousScreen = () => {
			let screenBlock = $scope.screenBlock
			$scope.currentScreen.index -= 1;
			let index = $scope.currentScreen.index
			$scope.currentScreen.title = screenBlock[$scope.currentScreen.index]

			if (index == 0) {
				$scope.controls.screen.previous = false
			}

			if ($scope.currentScreen.index != (screenBlock.length - 1)) {
				$scope.controls.screen.isCompleted = false;
				$scope.controls.screen.next = true;
			}

		}

		$scope.showScreenSection = (screen) => {
			if (screen == $scope.currentScreen.title) {
				return true;
			}
			return false
		}

		$scope.isScreenAnswered = (screen) => {
			let form = $scope.formFields
			let data = { status: '', message: '', type: 'error' }
			switch (screen.title) {
				case 'Sex':
					if (form.sex == '' || form.sex == null) {
						data.status = 'Not Finish'
						data.message = 'Please choose your sex. Are you gay?'
					}
					break;
				case 'Symptoms':
					form.symptoms.forEach(symptom => {
						if (!symptom.isAnswered) {
							$(`#choosing_symptom_${symptom.id}`).addClass('unchecked-symptom')
							data.status = 'Not Finish'
							data.message = 'Please make sure you have filled up all your possibilities symptoms!'
						} else {
							$(`#choosing_symptom_${symptom.id}`).removeClass('unchecked-symptom')
						}
					})
					break;
				case 'Living Area':
					if (form.livingArea.name == '' || form.livingArea.name == null) {
						data.status = 'Not Finish'
						data.message = 'Please make sure you have choose your place!'
					}
					break;
				case 'Regions':
					data.status = 'Finished'
					break;
				case 'Docter-Diagnosis':
					data.status = 'Not Finish'
					let docterDiagnosis = $scope.docterDiagnosis;

					if (!docterDiagnosis.numberOfDoctors || docterDiagnosis.numberOfDoctors == null) {
						data.message = "Please Input total of docters"
						$(`#numberOfDoctors`).addClass('unchecked-symptom');
						break;
					} else {
						data.status = 'Finished'
						$(`#numberOfDoctors`).removeClass('unchecked-symptom')
					}

					let count = 0;
					docterDiagnosis.predictions.forEach(predict => {
						if (predict.prediction.positive == null || predict.prediction.neutral == null || predict.prediction.negative == null) {
							data.message = 'Please make sure you have filled up all!'
							data.status = 'Not Finish'
							$(`#docter_prediction_${predict.id}`).addClass('unchecked-symptom');
							count++;
						} else {
							$(`#docter_prediction_${predict.id}`).removeClass('unchecked-symptom');
						}
					})

					if (count == 0) {
						docterDiagnosis.predictions.forEach(predict => {
							let positive = predict.prediction.positive;
							let neutral = predict.prediction.neutral;
							let negative = predict.prediction.negative;
							let total = positive + neutral + negative;

							if (total > docterDiagnosis.numberOfDoctors) {
								data.status = 'Not Finish';
								data.message = "The total number of all prediction must not higher than number of docters";
								$(`#docter_prediction_${predict.id}`).addClass('unchecked-symptom');
							}
							else {
								$(`#docter_prediction_${predict.id}`).removeClass('unchecked-symptom');
							}

						})
					}

					break;
				case 'Overview':
					if (form.patientInfo.name == '' || form.patientInfo.email == '') {
						data.status = 'Not Finish'
						data.message = 'Please make sure you have fill up the information!'
					}
					break;
				default:
					data.status = 'Finished'
					break;
			}
			return data;
		}


		$scope.getDiseases = () => {

		}

		$scope.selectedDisease = ''

		$scope.getSymptoms = (name) => {
			$scope.selectedDisease = name
			let selectedDisease = (name == 'covid-19') ? 'covid-19' : 'ebola';

			if (name == 'covid-19') $scope.screenBlock = ['Sex', 'Age', 'Symptoms', 'Ethanol', 'Body-Tempature', 'Atmospheric-Temperature', 'Regions', 'Docter-Diagnosis', 'Overview']
			else $scope.screenBlock = ['Sex', 'Age', 'Living Area', 'Symptoms', 'Regions', 'Overview']

			let url = `/get-${selectedDisease}-symptoms`
			$('body').addClass('blur-loading')
			$http.get(url)
				.then((data) => {
					window.location.href = '#service'
					if (data.status == 200) {
						$scope.formFields = data.data;
						$scope.setUpTooltips();
					}
					$timeout(() => {
						$('body').removeClass('blur-loading')
					}, 600)

					$scope.getDocterDiagnosis()
				})
				.catch(err => {
					toastr['error']('Unknown Error', "Diagnosis")
					console.log(err)
				})
		}

		$scope.setUpTooltips = () => {
			$scope.setUpAgeTooltip();
			$scope.setUpEthanolTooltip();
			$scope.setUpBodyTempatureTooltip();
			$scope.setUpAtmosphericTemperatureTooltip();
		}

		//  Sex
		$scope.setFormFieldSex = (sex) => {
			$scope.formFields.sex = sex
			$(`.${sex}`).addClass('click-animation-add');
			$timeout(() => {
				$(`.${sex}`).removeClass('click-animation-add');
			}, 410)
		}

		// Age

		$scope.setUpAgeTooltip = () => {
			let sliderToolTip = (event, ui) => {
				var curAge = ui.value || 65
				var tooltip = '<div class="tooltip tooltip-main top in"><div class="tooltip-arrow"></div><div class="tooltip-inner">' + curAge + '</div></div>';
				$(`#age-range-${$scope.selectedDisease} .ui-slider-handle`).html(tooltip);
				$scope.formFields.age = ui.value || 65
			}
			$(`#age-range-${$scope.selectedDisease}`).slider({
				range: "max",
				min: 1, // Change this to change the min value
				max: 130, // Change this to change the max value
				value: 65, // Change this to change the display value
				step: 1, // Change this to change the increment by value.
				create: sliderToolTip,
				slide: sliderToolTip
			});
		}


		// Symptoms

		$scope.hadCheckedSymptom = (symptomId) => {
			$scope.formFields.symptoms.forEach(symptom => {
				if (symptom.id == symptomId) {
					symptom.isAnswered = true;
					$(`#choosing_symptom_${symptom.id}`).removeClass('unchecked-symptom')
				}
			})
		}

		// Ethanol level

		$scope.setUpEthanolTooltip = () => {
			let sliderToolTip = (event, ui) => {
				var curValue = ui.value || 95
				var tooltip = '<div class="tooltip tooltip-main top in"><div class="tooltip-arrow"></div><div class="tooltip-inner">' + curValue + '</div></div>';
				$(`#ethanol-range-covid-19 .ui-slider-handle`).html(tooltip);
				$scope.formFields.ethanol = ui.value || 95
				angular.element('#button-ethanol-range-covid-19').triggerHandler('click')
			}
			$(`#ethanol-range-covid-19`).slider({
				range: "max",
				min: 0, // Change this to change the min value
				max: 190, // Change this to change the max value
				value: 95, // Change this to change the display value
				step: 1, // Change this to change the increment by value.
				create: sliderToolTip,
				slide: sliderToolTip
			});
		}

		// Body Tempature

		$scope.setUpBodyTempatureTooltip = () => {
			let sliderToolTip = (event, ui) => {
				var curValue = ui.value || 100
				var tooltip = '<div class="tooltip tooltip-main top in"><div class="tooltip-arrow"></div><div class="tooltip-inner">' + curValue + '</div></div>';
				$(`#body-tempature-range-covid-19 .ui-slider-handle`).html(tooltip);
				$scope.formFields.bodyTemperature = ui.value || 100
				angular.element('#button-body-tempature-range-covid-19').triggerHandler('click')
			}
			$(`#body-tempature-range-covid-19`).slider({
				range: "max",
				min: 95, // Change this to change the min value
				max: 105, // Change this to change the max value
				value: 100, // Change this to change the display value
				step: 1, // Change this to change the increment by value.
				create: sliderToolTip,
				slide: sliderToolTip
			});
		}

		$scope.testClick = () => {
			console.log(123123123)
		}

		// Atmospheric Temperature
		$scope.setUpAtmosphericTemperatureTooltip = () => {
			let sliderToolTip = (event, ui) => {
				var curValue = ui.value || 30
				var tooltip = '<div class="tooltip tooltip-main top in"><div class="tooltip-arrow"></div><div class="tooltip-inner">' + curValue + '</div></div>';
				$(`#atmospheric-temperature-range-covid-19 .ui-slider-handle`).html(tooltip);
				$scope.formFields.atmosphericTemperature = ui.value || 30
				angular.element('#button-atmospheric-temperature-range-covid-19').triggerHandler('click')
			}
			$(`#atmospheric-temperature-range-covid-19`).slider({
				range: "max",
				min: 0, // Change this to change the min value
				max: 60, // Change this to change the max value
				value: 30, // Change this to change the display value
				step: 1, // Change this to change the increment by value.
				create: sliderToolTip,
				slide: sliderToolTip
			});
		}

		// Region
		$scope.areaInGlobal = [
			{
				id: 'West-Asia',
				name: 'West Asia',
				ebolaAffected: true
			},
			{
				id: 'South-Africa',
				name: 'South Africa',
				ebolaAffected: true
			},
			{
				id: 'Middle-Africa',
				name: 'Middle Africa',
				ebolaAffected: true
			},
			{
				id: 'North-Africa',
				name: 'North Africa',
				ebolaAffected: true
			},
			{
				id: 'South-Asia',
				name: 'South Asia',
				ebolaAffected: false
			},
			{
				id: 'Australia-Area',
				name: 'Australia',
				ebolaAffected: false
			},
			{
				id: 'North-Asia',
				name: 'North Asia',
				ebolaAffected: true
			},
			{
				id: 'EU',
				name: 'Europe',
				ebolaAffected: true
			},
			{
				id: 'North-America',
				name: 'North America',
				ebolaAffected: false
			},
			{
				id: 'South-America',
				name: 'South America',
				ebolaAffected: false
			},
		]



		// Map
		$scope.listAreaChoosen = [];

		$scope.checkAnyAreaAffectedEbola = () => {
			let list = $scope.listAreaChoosen
			for (let i in list) {
				for (let j in $scope.areaInGlobal) {
					if (list[i] == $scope.areaInGlobal[j].id && $scope.areaInGlobal[j].ebolaAffected) {
						$scope.formFields.regionsAffected = true;
						return
					}
				}
			}
		}

		$scope.hoverEnter = (event) => {
			let area = $(event.target).attr('data-area')
			$(`[data-area='${area}']`).addClass('hovered')
		}

		$scope.hoverLeave = (event) => {
			let area = $(event.target).attr('data-area')
			$(`[data-area='${area}']`).removeClass('hovered')
		}

		$scope.regionSelect = (event) => {
			let area = $(event.target).attr('data-area')
			let list = $scope.listAreaChoosen;
			if ($(`[data-area='${area}']`).hasClass("selected")) {
				$scope.listAreaChoosen.splice(list.indexOf(area), 1)
				$(`[data-area='${area}']`).removeClass("selected")
			} else {
				$scope.listAreaChoosen.push(area)
				$(`[data-area='${area}']`).addClass('selected');
			}
			$scope.checkAnyAreaAffectedEbola();
		}

		$scope.results = {}

		$scope.getResultClass = () => {
			if ($scope.results.conclusion == 'Low') return 'green'
			if ($scope.results.conclusion == 'Medium') return 'orange'
			if ($scope.results.conclusion == 'High') return 'danger'
		}

		$scope.submitForm = () => {
			let checkAnswered = $scope.isScreenAnswered($scope.currentScreen)

			if (checkAnswered.status == "Not Finish") {
				let title = ($scope.selectedDisease == "covid-19") ? "Covid-19 Diagnosis" : 'Ebola Diagnosis'
				toastr[checkAnswered.type](checkAnswered.message, title)
				return;
			}

			if ($scope.selectedDisease == 'ebola') {
				$scope.submitFormEbola();
				console.log(123)
			}
			else {
				$scope.submitFormCovid19()
				console.log(456)
			}
		}

		$scope.submitFormEbola = () => {
			$scope.formFields.threeMonthVisited = $scope.formFields.regionsAffected != null ? true : false;
			let moderate = "Moderate"
			let mild = "Mild"
			let severe = "Severe"
			let NotAffected = 'NotAffected'
			let form = $scope.formFields;
			let symptoms = {}
			let convertSymptoms = form.symptoms.map((symptom) => {
				if (symptom.linguistic == mild) symptom.fuzzyValue = 0
				if (symptom.linguistic == moderate) symptom.fuzzyValue = 1
				if (symptom.linguistic == severe) symptom.fuzzyValue = 2
				if (symptom.linguistic == NotAffected) symptom.fuzzyValue = -1;
				return { title: symptom.title, value: symptom.fuzzyValue }
			})
			convertSymptoms.forEach(element => {
				if (element.title == 'Bleeding eyes') symptoms.bleedingEyes = element.value
				if (element.title == 'Bloody cough') symptoms.bloodyCough = element.value
				if (element.title == 'Bleeding gums') symptoms.bleedingGums = element.value
				if (element.title == 'Bleeding mouth') symptoms.bleedingMouth = element.value
				if (element.title == 'Backache') symptoms.backache = element.value
				if (element.title == 'Breathing difficulty') symptoms.breathingDifficulty = element.value
				if (element.title == 'Chest pain') symptoms.chestPain = element.value
				if (element.title == 'Fever') symptoms.fever = element.value
				if (element.title == 'Fatigue') symptoms.fatigue = element.value
			})
			let africaVisited = form.regionsAffected == true ? 1 : 0
			let threeMonthVisisted = form.threeMonthVisisted == true ? 1 : 0
			let regionIsAfrica = form.livingArea.isAffected == true ? 1 : 0
			let data = {
				bleedingEyes: symptoms.bleedingEyes,
				bloodyCough: symptoms.bloodyCough,
				bleedingGums: symptoms.bleedingGums,
				bleedingMouth: symptoms.bleedingMouth,
				backache: symptoms.backache,
				breathingDifficulty: symptoms.breathingDifficulty,
				chestPain: symptoms.chestPain,
				fever: symptoms.fever,
				fatigue: symptoms.fatigue,
				africaVisited: africaVisited,
				threeMonthVisisted: threeMonthVisisted,
				regionIsAfrica: regionIsAfrica
			}
			$('body').addClass('blur-loading')
			$http.post('https://disease-diagnosis.herokuapp.com/diagnosis', data)
				.then(res => {
					let result = res.data;
					if (result.conclusion == 0) {
						$scope.results.conclusion = 'Low'
						$scope.results.title = 'Consult a doctor'
						$scope.results.message = 'Your symptoms may require medical evaluation. Schedule an appointment with your doctor. If your symptoms get worse, see a doctor immediately.'
					}
					if (result.conclusion == 1) {
						$scope.results.conclusion = 'Medium'
						$scope.results.title = 'See a doctor immediately'
						$scope.results.message = 'Your symptoms are serious, Schedule an appointment with your doctor.'
					}
					if (result.conclusion == 2) {
						$scope.results.conclusion = 'High'
						$scope.results.title = 'Call an ambulance'
						$scope.results.message = "Your symptoms are very serious, and you may require emergency care."
					}
					$scope.results.intensity = result.intensity;
					$('body').removeClass('blur-loading')
					$("#resultModal-ebola").modal()
				})
				.catch(err => {
					toastr['error']('Unknown Error', "Ebola Diagnosis")
					$('body').removeClass('blur-loading')
				})
		}

		$scope.getResultCovidClass = () => {
			if ($scope.results.conclusion == 'Low Risk') return 'green'
			if ($scope.results.conclusion == 'High Risk') return 'danger'
		}

		$scope.submitFormCovid19 = () => {
			let docterDiagnosis = $scope.docterDiagnosis

			let docterPredictionsName = {}
			let docterPredictions = {}
			docterDiagnosis.predictions.forEach(predict => {
				docterPredictions[predict.id] = predict.prediction;
				docterPredictionsName[predict.id] = predict.name;
			})

			let predictions = {
				"numberOfDoctors": docterDiagnosis.numberOfDoctors,
				"predictions": docterPredictions
			}

			let factors = {
				"atmosphericTemperature": $scope.formFields.atmosphericTemperature,
				"bodyTemperature": $scope.formFields.bodyTemperature,
				"ethanol": $scope.formFields.ethanol,
				"cold": parseInt($scope.formFields.symptoms[1].linguistic),
				"cough": parseInt($scope.formFields.symptoms[2].linguistic),
				"breathShortness": parseInt($scope.formFields.symptoms[0].linguistic)
			}

			let data = {
				"factors": factors,
				"predictions": predictions
			}

			// let url = "https://disease-diagnosis.herokuapp.com/covid-diagnosis"
			let url = "http://disease-diagnosis.herokuapp.com/degreeset"

			$('body').addClass('blur-loading')
			$http.post(url, data)
				.then(res => {
					let result = res.data;

					// if (result.level == "LESS SEVERE") {
					// 	$scope.results.conclusion = 'Low Risk'
					// 	$scope.results.title = 'Consult a doctor'
					// 	$scope.results.message = 'The symptoms may require medical evaluation. Please avoid close contact with other people (social distancing), looking after The wellbeing and using the NHS and other services.'
					// }
					// if (result.level == "NORMAL") {
					// 	$scope.results.conclusion = 'Medium Risk'
					// 	$scope.results.title = 'See a doctor immediately'
					// 	$scope.results.message = 'The symptoms are serious. Seek immediate medical attention if you have serious symptoms. Always call before visiting your doctor or health facility.'
					// }
					// if (result.level == "SEVERE") {
					// 	$scope.results.conclusion = 'High Risk'
					// 	$scope.results.title = 'Call an ambulance'
					// 	$scope.results.message = "The symptoms are very serious. Call 113 or call ahead to your local emergency facility: Notify the operator that you are seeking care for someone who has or may have COVID-19."
					// }

					if (result.conclusion) {
						$scope.results.conclusion = 'High Risk'
						$scope.results.title = 'High Risk'
						$scope.results.message = "Call an ambulance. The symptoms are very serious. Call 113 or call ahead to your local emergency facility: Notify the operator that you are seeking care for someone who has or may have COVID-19."
					} else {
						$scope.results.conclusion = 'Low Risk'
						$scope.results.title = 'Low Risk'
						$scope.results.message = 'You are handsome and OK!'
					}

					console.log(result.intensity)
					$scope.results.intensity = parseFloat(result.intensity).toFixed(2);
					
					console.log(result.description)
					let uniqSymptoms = []
					result.description.forEach(element => {
						if (uniqSymptoms.indexOf(element) == -1) {
							uniqSymptoms.push(element)
						}
					})
					let alarmingSymptoms = uniqSymptoms.map((element) => {
						return docterPredictionsName[element];
					})
					$scope.alarmingSymptoms = alarmingSymptoms;
					console.log($scope.alarmingSymptoms)

					$('body').removeClass('blur-loading')
					$("#resultModal-covid-19").modal()
					$timeout($scope.addPatientInfo(), 500)
				})
				.catch(err => {
					toastr['error']('Unknown Error', "Covid-19 Diagnosis")
					$('body').removeClass('blur-loading')
				})


		}
		// Add patient Info

		$scope.addPatientInfo = function () {
			let data = {
				patientName: $scope.formFields.patientInfo.name ? $scope.formFields.patientInfo.name : '',
				email: $scope.formFields.patientInfo.email ? $scope.formFields.patientInfo.email : '',
				disease: $scope.selectedDisease == 'covid-19' ? "Covid-19 Disease" : "Ebola Disease" ,
				intensity: $scope.results.intensity ? $scope.results.intensity : '',
				conclusion: $scope.results.conclusion ? $scope.results.conclusion : '',
				sex: $scope.formFields.sex ? $scope.formFields.sex : '',
				age: $scope.formFields.age ? $scope.formFields.age : ''
			}

			$http.post('/addPatientInfo', data)
				.then(res => {
					// console.log(res)
				})
				.catch(err => {
					console.log(err)
				})
		}

		// Docter Diagnosis

		$scope.docterDiagnosis = {}

		$scope.getDocterDiagnosis = function () {

			$http.get('/get-docter-diagnosis')
				.then(res => {
					$scope.docterDiagnosis = res.data;
				})
				.catch(err => {
					console.log(err)
				})
		}

		// Clear data

		$scope.clearData = () => {
			$scope.currentScreen = { title: 'Sex', index: 0 }
			$scope.controls = {
				screen: {
					previous: false,
					next: true,
					isCompleted: false,
				},
				question: {
					isAnswered: false,
				}
			}
			$scope.formFields = {}
			$scope.blockIsActivated = $scope.sectionBlock[0]
			$scope.selectedDisease = ''
			$scope.listAreaChoosen = [];
			$scope.results = {}
			$scope.setUpAgeTooltip()
		}

		$scope.reAnalyze = () => {
			// $('body').addClass('blur-loading')
			// $scope.clearData();
			// $('input[type="radio"]').prop('checked', false);
			// $('path.selected').removeClass('selected')
			// $('html, body').animate({
			// 	scrollTop: $("#service").offset().top
			// }, 100);
			// $timeout(() => {
			// 	$('body').removeClass('blur-loading')
			// }, 500)
			location.reload()
		}

		$scope.clickTest = () => {
			$http.post('/getConclusions', { 'test': 123 })
				.then(res => {

				})
				.catch(err => {

				})
		}

		$scope.checkCovidRangeSymptoms = (id) => {
			let range = ['CH', 'CD', 'BS']
			if (range.indexOf(id) != -1) return false;
			else return true;
		}
	}

])

