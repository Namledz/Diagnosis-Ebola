import { Injectable } from "@nestjs/common";
import * as fs from "fs";
import { data_path } from "config/local.js";
import { from } from "rxjs";
import { CovidFieldsService } from "./fields.service";

const options = {
  encoding: "utf8",
  flag: "w",
};

@Injectable()
export class CovidService {
  constructor(private readonly cService: CovidFieldsService) {}

  prepareData(factors): any {
    let self = this;

    let data = {
      body_temperature: self.cService.getBodyTemperatureData(
        factors.body_temperature
      ),
      spo2_level: self.cService.getSpO2Data(factors.spo2_level),
      cold: self.cService.getColdData(factors.cold),
      cough: self.cService.getCoughData(factors.cough),
      dyspnea: self.cService.getDyspneaData(factors.dyspnea),
      abnormal_chest_imaging: self.cService.getChestImagingData(
        factors.abnormal_chest_imaging
      ),
      headache: self.cService.getHeadacheData(factors.headache),
      nausea: self.cService.getNauseaData(factors.nausea),
      vomiting: self.cService.getVomitingData(factors.vomiting),
      loss_of_taste_and_smell: self.cService.getTasteAndSmellData(
        factors.loss_of_taste_and_smell
      ),
      respiratory_failure: self.cService.getRespiratoryData(
        factors.respiratory_failure
      ),
      multiple_organ_dysfunction: self.cService.getOrganDisfunctionData(
        factors.multiple_organ_dysfunction
      ),
      repiratory_rate: self.cService.getRepiratoryRateData(
        factors.repiratory_rate
      ),
      pao2_fio2: self.cService.getPaO2Data(factors.pao2_fio2),
    };
    return self.cService.getTransposeArray(
      Object.keys(data).map((key) => data[key])
    );
  }

  getTreatments = (type) => {
    switch(type){
      case 'mid_illness':
        return this.cService.getMidTreatments();
      case 'moderate_illness':
        return this.cService.getModerateTreatments();
      case 'severe_illness':
        return this.cService.getSevereTreatments();
      case 'critical_illness':
        return this.cService.getCriticalTreatments();
    }
  }

  evaluateResult = (type) => {
    let data = {
      message: '',
      title: ''

    }
    switch(type){
      case 'mid_illness':
        data.title = 'Mid Illness'
        break;
      case 'moderate_illness':
        data.title = 'Moderate Illness'
        break;
      case 'severe_illness':
        data.title = 'Severe Illness'
        break;
      case 'critical_illness':
        data.title = 'Critical Illness'
        break;
    }
    return data;
  }

  submitCovid = (data) => {
    let Factors = this.prepareData(data);

    let Weights = this.cService.getWeights();

    // let normalizedMatrix = Factors.map(factor => {

    // })

    let i, j, sum, max, min;

    // Step 1
    let sumR = [];

    for (j = 0; j < Factors[0].length; j++) {
      sum = 0;
      for (i = 0; i < Factors.length; i++) {
        sum += Factors[i][j] * Factors[i][j];
      }
      sumR.push(Math.sqrt(sum));
    }

    // Step 2
    for (i = 0; i < Factors.length; i++) {
      for (j = 0; j < Factors[0].length; j++) {
        Factors[i][j] = (Factors[i][j] / sumR[j]) * Weights[j];
      }
    }
    //   console.log(Factors);

    // Step 3
    let Ap = [];
    let Am = [];

    for (j = 0; j < Factors[0].length; j++) {
      max = Factors[0][j];
      min = Factors[0][j];
      for (i = 0; i < Factors.length; i++) {
        max = Factors[i][j] > max ? Factors[i][j] : max;
        min = Factors[i][j] < min ? Factors[i][j] : min;
      }
      Ap.push(max);
      Am.push(min);
    }

    //   console.log(Ap);
    //   console.log(Am);

    // Step 4
    let C = [];
    let Sips = [];
    let Sim = [];

    for (i = 0; i < Factors.length; i++) {
      let valueSiP = 0;
      let valueSiM = 0;
      for (j = 0; j < Factors[0].length; j++) {
        valueSiP += Math.pow(Factors[i][j] - Ap[j], 2);
        valueSiM += Math.pow(Factors[i][j] - Am[j], 2);
      }
      valueSiP = Math.sqrt(valueSiP);
      valueSiM = Math.sqrt(valueSiM);
      Sips.push(valueSiP);
      Sim.push(valueSiM);
      let value = valueSiM / (valueSiP + valueSiM);
      C.push(value);
    }

    console.log(C);

    let ordering = JSON.parse(JSON.stringify(C)).sort((a, b) => b - a);
    let results =  [
      {
        type: 'mid_illness',
        value: C[0],
        sp: Sips[0],
        sm: Sim[0],
        rank: ordering.indexOf(C[0]) + 1,
        name: this.evaluateResult('mid_illness')
      },
      {
        type: 'moderate_illness',
        value: C[1],
        sp: Sips[1],
        sm: Sim[1],
        rank: ordering.indexOf(C[1]) + 1,
        name: this.evaluateResult('moderate_illness')
      },
      {
        type: 'severe_illness',
        value: C[2],
        sp: Sips[2],
        sm: Sim[2],
        rank: ordering.indexOf(C[2]) + 1,
        name: this.evaluateResult('severe_illness')
      },
      {
        type: 'critical_illness',
        value: C[3],
        sp: Sips[3],
        sm: Sim[3],
        rank: ordering.indexOf(C[3]) + 1,
        name: this.evaluateResult('critical_illness')
      },
    ];
    let final_results = {
      rank_1: results.find(r => r.rank == 1),
      list: Object.keys(results).map(key => results[key]),
      data: this.evaluateResult(results.find(r => r.rank == 1).type),
      treatments: this.getTreatments(results.find(r => r.rank == 1).type)
    };
    return final_results
  };
}
