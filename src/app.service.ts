import { Injectable } from "@nestjs/common";
import * as fs from "fs";
import { data_path } from "config/local.js";
import { from } from "rxjs";
import { isArray } from "util";

const options = {
  encoding: "utf8",
  flag: "w",
};

@Injectable()
export class AppService {
  getHello(): string {
    return "Hello World!";
  }

  getEbolaSymptoms(): object {
    let formFields = {
      sex: "",
      age: 65,
      symptoms: [
        {
          id: 1,
          title: "Bleeding eyes",
          linguistic: "",
          isNotAffected: false,
          isAnswered: false,
        },
        {
          id: 2,
          title: "Bloody cough",
          linguistic: "",
          isNotAffected: false,
          isAnswered: false,
        },
        {
          id: 3,
          title: "Bleeding gums",
          linguistic: "",
          isNotAffected: false,
          isAnswered: false,
        },
        {
          id: 4,
          title: "Bleeding mouth",
          linguistic: "",
          isNotAffected: false,
          isAnswered: false,
        },
        {
          id: 5,
          title: "Backache",
          linguistic: "",
          isNotAffected: false,
          isAnswered: false,
        },
        {
          id: 6,
          title: "Breathing difficulty",
          linguistic: "",
          isNotAffected: false,
          isAnswered: false,
        },
        {
          id: 7,
          title: "Chest pain",
          linguistic: "",
          isNotAffected: false,
          isAnswered: false,
        },
        {
          id: 8,
          title: "Fever",
          linguistic: "",
          isNotAffected: false,
          isAnswered: false,
        },
        {
          id: 9,
          title: "Fatigue",
          linguistic: "",
          isNotAffected: false,
          isAnswered: false,
        },
      ],

      setNoSymptoms: (id) => {
        formFields.symptoms.forEach((element) => {
          if (element.id == id) {
            element.isNotAffected = true;
            element.linguistic = "";
          }
        });
      },
      livingArea: {
        name: "",
        isAffected: true,
      },
      regionsAffected: null,
      threeMonthVisited: null,
      patientInfo: {
        name: "",
        email: "",
      },
    };
    return formFields;
  }

  getCovidSymptoms(): object {
    let formFields = {
      sex: "",
      age: 65,
      ethanol: null,
      atmosphericTemperature: null,
      bodyTemperature: null,
      symptoms: [
        {
          id: "BS",
          title: "Breath Shortness",
          linguistic: "",
          isNotAffected: false,
          isAnswered: false,
        },
        {
          id: "CD",
          title: "Cold",
          linguistic: "",
          isNotAffected: false,
          isAnswered: false,
        },
        {
          id: "CH",
          title: "Cough",
          linguistic: "",
          isNotAffected: false,
          isAnswered: false,
        },
      ],
      setNoSymptoms: (id) => {
        formFields.symptoms.forEach((element) => {
          if (element.id == id) {
            element.isNotAffected = true;
            element.linguistic = "";
          }
        });
      },
      regionsAffected: null,
      patientInfo: {
        name: "",
        email: "",
      },
    };

    return formFields;
  }

  addPatientInfo(data): object {
    let file = fs.readFileSync(`${data_path}patient_data.json`, {
      encoding: "utf8",
    });
    let arr = JSON.parse(file);
    // console.log(isArray(file));
    let id = arr[arr.length - 1].id + 1;
    let patientName = data.patientName ? data.patientName : "";
    let disease = data.disease ? data.disease : "";
    let intensity = data.intensity ? data.intensity : "";
    let date = data.date ? data.date : "";
    let conclusion = data.conclusion ? data.conclusion : "";
    let email = data.email ? data.email : "";
    let age = data.age ? data.age : "";
    let sex = data.sex ? data.sex : "";
    let set = data.set ? data.set : {};

    // 	{
    // 	"id": 1000,
    // 	"patient_name": "Nam",
    // 	"sex": "Male",
    // 	"age": 21,
    // 	"disease": "Handsome",
    // 	"conclusion": "SO HANDSOME",
    // 	"intensity": 100,
    // 	"email": "namledz@gmail.com",
    // 	"date": "28-5-2020"
    // 	}

    arr.push({
      id: id,
      patient_name: patientName,
      sex: sex,
      age: age,
      disease: disease,
      conclusion: conclusion,
      intensity: intensity,
      email: email,
      date: date,
      set: set,
    });
    // console.log(arr);
    let newData = JSON.stringify(arr);
    fs.writeFileSync(`${data_path}patient_data.json`, newData, options);
    return {};
  }

  getListPatient(): object {
    let file = fs.readFileSync(`${data_path}patient_data.json`, {
      encoding: "utf8",
    });
    let arr = JSON.parse(file);
    let data = arr.map((patient) => {
      let action = `<button type="button" onclick="viewDetailPatient(${patient.id})" class="btn btn-view-patient  view-patient-detail">View</button>`;
      return {
        patient_id: patient.id,
        patient_name: patient.patient_name,
        sex: patient.sex,
        age: patient.age,
        disease: patient.disease,
        conclusion: patient.conclusion,
        intensity: `${patient.intensity}%`,
        email: patient.email,
        date: patient.date,
        action: action,
      };
    });
    return {
      recordsFiltered: arr.length,
      data: data,
    };
  }

  getDoctersDiagnosis(): object {
    let prediction = {
      positive: null,
      neutral: null,
      negative: null,
    };
    let data = {
      numberOfDoctors: null,
      predictions: [
        {
          id: "atmosphericTemperature",
          name: "Atmospheric Temperature",
          prediction: prediction,
        },
        {
          id: "bodyTemperature",
          name: "Body Temperature",
          prediction: prediction,
        },
        { id: "ethanol", name: "Ethanol", prediction: prediction },
        {
          id: "breathShortness",
          name: "Breath Shortness",
          prediction: prediction,
        },
        { id: "cold", name: "Cold", prediction: prediction },
        { id: "cough", name: "Cough", prediction: prediction },
      ],
    };
    return data;
  }

  getPatientDetail(id): object {
    let file = fs.readFileSync(`${data_path}patient_data.json`, {
      encoding: "utf8",
    });
    let arr = JSON.parse(file);
    let data = arr.filter((patient) => {
      return patient.id == id;
    });

    return data[0];
  }

  getNonZeroMinmumValue(array: Array<number>): number {
    let result;
    array.sort((a, b) => {
      return a - b;
    });
    for (let i in array) {
      if (array[i] != 0) result = array[i];
      break;
    }
    return result;
  }

  getTopsisHospital(district_id: any, rate: any): any {
    /*
{
    expertise: , chuyen mon bac si
    healthCare: , cham soc suc khoe
    cost: , gia tien
    equipment: , trang bi
    accuracyCovidTest: do chinh xac
}
*/
    const property = [
      "expertise",
      "healthCare",
      "cost",
      "equipment",
      "accuracyCovidTest",
    ];

    const intensity = [
      {
        rate: "low", // 0% - 30%
        expertise: 0.15,
        healthCare: 0.15,
        cost: 0.3,
        equipment: 0.1,
        accuracyCovidTest: 0.3,
      },
      {
        rate: "medium", // 30% - 60%
        expertise: 0.2,
        healthCare: 0.15,
        cost: 0.2,
        equipment: 0.15,
        accuracyCovidTest: 0.3,
      },
      {
        rate: "high", // 60% - 100%
        expertise: 0.15,
        healthCare: 0.3,
        cost: 0.1,
        equipment: 0.15,
        accuracyCovidTest: 0.3,
      },
    ];

    const hospitalValueBylocation = [
      {
        idLocation: 1,
        name: "Bệnh Viện Thanh Nhàn",
        expertise: 7,
        healthCare: 7,
        cost: 7,
        equipment: 8,
        accuracyCovidTest: 7,
      },
      {
        idLocation: 1,
        name: "Bệnh Viện Y Học Cổ Truyền Trung Ương",
        expertise: 7,
        healthCare: 9,
        cost: 4,
        equipment: 7,
        accuracyCovidTest: 6,
      },
      {
        idLocation: 1,
        name: "Bệnh Viện Hữu Nghị",
        expertise: 7,
        healthCare: 5,
        cost: 5,
        equipment: 8,
        accuracyCovidTest: 7,
      },
      {
        idLocation: 1,
        name: "Bệnh Viện Phổi Hà Nội",
        expertise: 6,
        healthCare: 8,
        cost: 9,
        equipment: 6,
        accuracyCovidTest: 6,
      },
      {
        idLocation: 2,
        name: "Bệnh Viện K Cơ sở 1",
        expertise: 8,
        healthCare: 4,
        cost: 7,
        equipment: 6,
        accuracyCovidTest: 6,
      },
      {
        idLocation: 2,
        name: "Bệnh Viện Hữu Nghị Việt Đức",
        expertise: 9,
        healthCare: 5,
        cost: 7,
        equipment: 8,
        accuracyCovidTest: 7,
      },
      {
        idLocation: 2,
        name: "Bệnh Viện Răng Hàm Mặt Trung Ương",
        expertise: 4,
        healthCare: 7,
        cost: 4,
        equipment: 9,
        accuracyCovidTest: 6,
      },
      {
        idLocation: 3,
        name: "Bệnh Viện Bạch Mai",
        expertise: 8,
        healthCare: 7,
        cost: 5,
        equipment: 9,
        accuracyCovidTest: 8,
      },
      {
        idLocation: 3,
        name: "Bệnh Viện Giao Thông Vận Tải",
        expertise: 6,
        healthCare: 3,
        cost: 6,
        equipment: 8,
        accuracyCovidTest: 9,
      },
      {
        idLocation: 3,
        name: "Bệnh Viện Tai Mũi Họng Trung Ương",
        expertise: 4,
        healthCare: 7,
        cost: 2,
        equipment: 5,
        accuracyCovidTest: 7,
      },
      {
        idLocation: 3,
        name: "Bệnh Viện Nhiệt Đới Trung Ương",
        expertise: 8,
        healthCare: 3,
        cost: 6,
        equipment: 5,
        accuracyCovidTest: 7,
      },
      {
        idLocation: 4,
        name: "Bệnh Viện Đa Khoa Thăng Long",
        expertise: 3,
        healthCare: 8,
        cost: 5,
        equipment: 7,
        accuracyCovidTest: 4,
      },
      {
        idLocation: 4,
        name: "Bệnh Viện Bưu Điện",
        expertise: 7,
        healthCare: 4,
        cost: 6,
        equipment: 7,
        accuracyCovidTest: 8,
      },
      {
        idLocation: 4,
        name: "Bệnh Viện Y Học Cổ Truyền Quân Đội",
        expertise: 2,
        healthCare: 4,
        cost: 9,
        equipment: 5,
        accuracyCovidTest: 8,
      },
      {
        idLocation: 4,
        name: "Bệnh Viện Y Phóng Xạ và U Bướu Quân Đội",
        expertise: 3,
        healthCare: 6,
        cost: 7,
        equipment: 8,
        accuracyCovidTest: 3,
      },
      {
        idLocation: 5,
        name: "Bệnh Viện E",
        expertise: 6,
        healthCare: 7,
        cost: 4,
        equipment: 6,
        accuracyCovidTest: 3,
      },
      {
        idLocation: 5,
        name: "Viện Huyết Học Truyền Máu Trung Ương",
        expertise: 6,
        healthCare: 7,
        cost: 3,
        equipment: 6,
        accuracyCovidTest: 2,
      },
      {
        idLocation: 5,
        name: "Bệnh Viện Đa khoa y học cổ truyền Hà Nội",
        expertise: 6,
        healthCare: 7,
        cost: 8,
        equipment: 4,
        accuracyCovidTest: 3,
      },
      {
        idLocation: 5,
        name: "Bệnh Viện 19-8 Bộ công an",
        expertise: 9,
        healthCare: 4,
        cost: 8,
        equipment: 6,
        accuracyCovidTest: 5,
      },
      {
        idLocation: 6,
        name: "Bệnh Viện Đa khoa Xanh Pôn",
        expertise: 8,
        healthCare: 4,
        cost: 3,
        equipment: 6,
        accuracyCovidTest: 7,
      },
      {
        idLocation: 6,
        name: "Bệnh Viện quân y 354",
        expertise: 7,
        healthCare: 3,
        cost: 6,
        equipment: 3,
        accuracyCovidTest: 7,
      },
      {
        idLocation: 6,
        name: "Bệnh Viện Đa khoa Bảo Sơn 2",
        expertise: 8,
        healthCare: 5,
        cost: 6,
        equipment: 4,
        accuracyCovidTest: 8,
      },
      {
        idLocation: 6,
        name: "Bệnh Viện Phổi Trung ương",
        expertise: 9,
        healthCare: 6,
        cost: 5,
        equipment: 8,
        accuracyCovidTest: 5,
      },
      {
        idLocation: 7,
        name: "Bệnh Viện Đa Khoa Hà Đông",
        expertise: 9,
        healthCare: 8,
        cost: 6,
        equipment: 5,
        accuracyCovidTest: 8,
      },
      {
        idLocation: 7,
        name: "Bệnh Viện Y Học Cổ Truyền Hà Đông",
        expertise: 9,
        healthCare: 3,
        cost: 6,
        equipment: 8,
        accuracyCovidTest: 9,
      },
      {
        idLocation: 7,
        name: "Bệnh viện Quân y 103",
        expertise: 3,
        healthCare: 8,
        cost: 7,
        equipment: 5,
        accuracyCovidTest: 3,
      },
      {
        idLocation: 7,
        name: "Bệnh Viện Tuệ Tĩnh",
        expertise: 9,
        healthCare: 7,
        cost: 2,
        equipment: 6,
        accuracyCovidTest: 9,
      },
    ];

    const findHospitalBylocation = (arr, idLocation) => {
      // deep clone arr of objects
      const oldArr = arr.filter(
        (hospital) => hospital.idLocation === idLocation
      );
      const newArr = JSON.parse(JSON.stringify(oldArr));
      return newArr;
    };

    const findIntensity = (input, intensity) => {
		if(input > 0 && input < 30){
			return intensity[0]
		} else if(input >= 30 && input < 60) {
			return intensity[1]
		} else if(input >=60 && input <= 100){
			return intensity[2]
		}
    };

    const findArray = (arr, key, name) => {
      return arr.findIndex((elm) => elm[name] === key);
    };

    const topsisHospital = (idLocation, inputInten) => {
      const array = findHospitalBylocation(hospitalValueBylocation, idLocation);
      const inten = findIntensity(inputInten, intensity);

      //  for step 3
      const arrMax = [];
      const arrMin = [];

      //  for step 4
      const arrGoodIdeal = [];
      const arrBadIdeal = [];

      //  for step 5
      const arrSameGoodIdeal = [];

      // step 1, 2, 3
      for (let i = 0; i < property.length; i++) {
        let max = 0,
          min = 1;
        let total = array.reduce((acc, obj) => {
          return acc + Math.pow(obj[property[i]], 2);
        }, 0);

        total = inten[property[i]] / Math.sqrt(total);

        for (let j = 0; j < array.length; j++) {
          array[j][property[i]] = total * array[j][property[i]];
          if (max < array[j][property[i]]) max = array[j][property[i]];
          if (min > array[j][property[i]]) min = array[j][property[i]];
        }
        arrMax.push(max);
        arrMin.push(min);
      }

      // step 4
      for (let i = 0; i < array.length; i++) {
        let totalMax = 0;
        let totalMin = 0;
        for (let j = 0; j < property.length; j++) {
          let sumMax = array[i][property[j]] - arrMax[j];
          totalMax = totalMax + Math.pow(sumMax, 2);

          let sumMin = array[i][property[j]] - arrMin[j];
          totalMin = totalMin + Math.pow(sumMin, 2);
        }

        array[i].goodIdeal = Math.sqrt(totalMax);
        array[i].badIdeal = Math.sqrt(totalMin);

        arrGoodIdeal.push(array[i].goodIdeal);
        arrBadIdeal.push(array[i].badIdeal);
      }

      // step 5
      for (let i = 0; i < array.length; i++) {
        let sum = arrBadIdeal[i] / (arrBadIdeal[i] + arrGoodIdeal[i]);

        arrSameGoodIdeal.push(sum);
        array[i].sameGoodIdeal = sum;
      }

      arrGoodIdeal.sort();
      arrBadIdeal.sort((a, b) => b - a);
      arrSameGoodIdeal.sort((a, b) => b - a);

      for (let i = 0; i < array.length; i++) {
        arrGoodIdeal[i] = findArray(array, arrGoodIdeal[i], "goodIdeal");
        arrBadIdeal[i] = findArray(array, arrBadIdeal[i], "badIdeal");
        arrSameGoodIdeal[i] = findArray(
          array,
          arrSameGoodIdeal[i],
          "sameGoodIdeal"
        );
      }

      // for(let i = 0; i < array.length; i++){
      //     console.log(`S*[${i + 1}]: ` + array[arrGoodIdeal[i]].name);
      //     console.log(`S-[${i + 1}]: ` + array[arrBadIdeal[i]].name);
      //     console.log(`C [${i + 1}]: ` + array[arrSameGoodIdeal[i]].name);
      //     console.log('-------------------');
      // }

    //   console.log(`S*: ` + array[arrGoodIdeal[0]].name);
    //   console.log(`S-: ` + array[arrBadIdeal[0]].name);
    //   console.log(`C : ` + array[arrSameGoodIdeal[0]].name);
    //   console.log("-------------------");

      // console.log(array);
		let result = array.sort((a, b) => b.sameGoodIdeal - a.sameGoodIdeal);
   		console.log(result);
		return result;
    };

	return topsisHospital(district_id, rate)
  }
}
