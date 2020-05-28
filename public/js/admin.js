

var myApp = angular.module('MyApp', []);

myApp.controller('AdminController', [
	'$scope',
	'$http',
	'$timeout',
	'$compile',
	'$location',
	function ($scope, $http, $timeout, $compile, $location) { 
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
					{ data: "date", className: 'text-center' }
				],
				
				order: [[0, "desc"]]
			});
		}
		$scope.patientTableInit()
	} 

])

$(document).ready(function () {
	$('#tbl-patient-lists_filter').hide();
})
