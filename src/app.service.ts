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
      repiratory_rate: null,
      spo2_level: null,
      pao2_fio2: null,
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
        {
          id: "DY",
          title: "Dyspnea",
          linguistic: "",
          isNotAffected: false,
          isAnswered: false,
        },
        {
          id: "AC",
          title: "Abnormal chest imaging",
          linguistic: "",
          isNotAffected: false,
          isAnswered: false,
        },
        {
          id: "HE",
          title: "Headache",
          linguistic: "",
          isNotAffected: false,
          isAnswered: false,
        },
        {
          id: "NE",
          title: "Nausea",
          linguistic: "",
          isNotAffected: false,
          isAnswered: false,
        },
        {
          id: "VG",
          title: "Vomiting",
          linguistic: "",
          isNotAffected: false,
          isAnswered: false,
        },
        {
          id: "LTS",
          title: "Loss of taste and smell",
          linguistic: "",
          isNotAffected: false,
          isAnswered: false,
        },
        {
          id: "RF",
          title: "Respiratory failure",
          linguistic: "",
          isNotAffected: false,
          isAnswered: false,
        },
        {
          id: "MOD",
          title: "Multiple organ dysfunction",
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

}
