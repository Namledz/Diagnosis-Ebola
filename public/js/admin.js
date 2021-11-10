

var myApp = angular.module('MyApp', []);

myApp.controller('AdminController', [
	'$scope',
	'$http',
	'$timeout',
	'$compile',
	'$location',
	'$window',
	function ($scope, $http, $timeout, $compile, $location, $window) {
		$scope.patient = {}

		$scope.patientTableInit = function () {
			$('#tbl-patient-lists').DataTable({
				language: {
					infoFiltered: "",
					lengthMenu: "Number of patient to show  _MENU_",
					zeroRecords: "No matching patient found",
				},
				pageLength: 10,
				pagingType: 'numbers',
				processing: false,
				serverSide: true,
				ajax: {
					url: '/admin/getListpatient',
					type: "POST"
				},
				columns: [
					{ data: "patient_id", className: 'text-center' },
					{ data: "patient_name", className: 'text-center' },
					{ data: "sex", className: 'text-center capitalize' },
					{ data: "age", className: 'text-center' },
					{ data: "disease", className: 'text-center' },
					{ data: "conclusion", className: 'text-center uppercase conclusion' },
					{ data: "intensity", className: 'text-center' },
					{ data: "email", className: 'text-center' },
					{ data: "date", className: 'text-center' },
					{ data: "action", className: 'text-center' }
				],

				order: [[0, "desc"]]
			});
		}

		$scope.patientTableInit()

		$window.viewDetailPatient = function (id) {

			$http.post('/admin/get-detail-patient', { patientId: id })
				.then(res => {
					$scope.patient = res.data;
					console.log(res.data)
					$timeout(() => {
						$('#tbl-patient-lists_wrapper').css('display', 'none')
						$('#patient-detail').css('display', 'unset');
						$scope.buildPatientChart($scope.patient.set)
					})
				})
				.catch(err => {
					console.log(err)
					toastr.error('Uknown Error')
				})

		}

		$scope.backToList = function () {
			$('#tbl-patient-lists_wrapper').css('display', 'unset')
			$('#patient-detail').css('display', 'none');
		}
 
		$scope.buildPatientChart = function (set) {
			let data = [
				set.positive,
				set.neutral,
				set.negative,
				set.refused,
				100
			]

			let datasets = [{
				label: '% of Result',
				data: data,
				backgroundColor: [
					'rgba(54, 162, 235, 0.7)',
					'rgba(75, 192, 192, 0.7)',
					'rgba(255, 99, 132, 0.7)',
					'rgba(255, 206, 86, 0.7)',
				],
				borderColor: [
					'rgba(54, 162, 235, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(255, 99, 132, 1)',
					'rgba(255, 206, 86, 1)',
				],
				borderWidth: 1
			}]

			let ctx = document.getElementById('patient-chart').getContext("2d");
			ctx.canvas.width = 400;
			ctx.canvas.height = 500;
			var patientChart = new Chart(ctx, {
				type: 'bar',
				data: {
					datasets: datasets,
					labels: ['Positive', 'Neutral', 'Negative', 'Refused'],
				},
				options: {
					tooltips: false,
					events: [''],
					maintainAspectRatio: false,
					scales: {
						yAxes: [{
							ticks: {
								beginAtZero: true
							}
						}]
					},
					animation: {
						onComplete: function () {
							var chartInstance = this.chart,
								ctx = chartInstance.ctx;
							ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
							ctx.textAlign = 'center';
							ctx.textBaseline = 'bottom';

							this.data.datasets.forEach(function (dataset, i) {
								var meta = chartInstance.controller.getDatasetMeta(i);
								meta.data.forEach(function (bar, index) {
									var data = dataset.data[index];
									ctx.fillText(`${data}%`, bar._model.x, bar._model.y - 5);
								});
							});
						}
					},
					plugins: {
						datalabels: {
							formatter: (value, ctx) => {
								let sum = 0;
								let dataArr = ctx.chart.data.datasets[0].data;
								dataArr.map(data => {
									sum += data;
								});
								let percentage = (value * 100 / sum).toFixed(2) + "%";
								return percentage;
							},
							color: '#fff',
						}
					}
				}
			});
		}

	}

])

$(document).ready(function () {
	$('#tbl-patient-lists_filter').hide();
})
