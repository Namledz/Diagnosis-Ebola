import { Injectable } from "@nestjs/common";
import * as fs from "fs";
import { data_path } from "config/local.js";
import { from } from "rxjs";
import { isArray } from "util";
import e = require("express");

@Injectable()
export class CovidFieldsService {
  getWeights(): any {
    // "body_temperature"
    // "spo2_level"
    // "cold" X
    // "cough" X
    // "dyspnea" X
    // "abnormal_chest_imaging" X
    // "headache" X
    // "nausea" X
    // "vomiting" X
    // "loss_of_taste_and_smell" X
    // "respiratory_failure" X
    // "multiple_organ_dysfunction" X
    // "repiratory_rate" X
    // "pao2_fio2"

    return [
      0.05,
      0.15,
      0.02,
      0.04,
      0.08,
      0.07,
      0.02,
      0.06,
      0.07,
      0.06,
      0.12,
      0.11,
      0.06,
      0.09,
    ];
  }

  getTransposeArray(a): any {
    let b = [[], [], [], []];

    let i, j;
    for (i = 0; i < b.length; i++) {
      for (j = 0; j < a.length; j++) {
        b[i][j] = a[j][i];
      }
    }
    return b;
  }

  // Mid Moderate Severe Critical
  getBodyTemperatureData(data): any {
    if (data >= 36 && data <= 37.5) {
      return [5, 4, 3, 3];
    } else if (data > 37.5 && data < 40) {
      return [2, 3, 5, 4];
    } else if (data < 36) {
      return [1, 2, 2, 5];
    }
    return [2, 3, 4, 5];
  }

  getSpO2Data(data): any {
    if (data > 97) {
      return [5, 2, 2, 1];
    } else if (data >= 95 && data <= 97) {
      return [3, 5, 3, 3];
    } else if (data >= 93 && data <= 94) {
      return [2, 2, 5, 4];
    } else if (data < 93 && data >= 92) {
      return [1, 2, 4, 5];
    }
    return [1, 1, 3, 5];
  }

  getPaO2Data(data): any {
    if (data >= 390) {
      return [5, 3, 2, 1];
    } else if (data >= 340 && data <= 389) {
      return [4, 5, 3, 1];
    } else if (data >= 300 && data <= 339) {
      return [3, 4, 5, 3];
    } else if (data >= 286 && data <= 299) {
      return [1, 2, 4, 4 ];
    }
    return [1, 1, 2, 5];
  }

  getRepiratoryRateData(data): any {
      if (data >= 12 && data <= 16) {
        return [5, 4, 1, 1];
      } else if (data > 16 && data <= 23) {
        return [3, 4, 3, 2];
      } else if (data > 23 && data <= 32) {
        return [2, 3, 5, 4];
      } else if (data < 12) {
        return [1, 1, 2, 5];
      }
      return [1, 2, 3, 5];
  }

  getColdData(data): any {
    return data == 1 ? [3, 3, 3, 3] : [2, 1, 2, 3];
  }

  getCoughData(data): any {
    return data == 1 ? [4, 5, 4, 3] : [4, 3, 3, 2];
  }

  getDyspneaData(data): any {
    return data == 1 ? [1, 3, 4, 5] : [4, 4, 2, 2];
  }

  getChestImagingData(data): any {
    return data == 1 ? [1, 3, 4, 5] : [4, 4, 2, 1];
  }

  getHeadacheData(data): any {
    return data == 1 ? [5, 3, 5, 4] : [2, 4, 2, 2];
  }

  getNauseaData(data): any {
    return data == 1 ? [2, 4, 5, 5] : [4, 3, 3, 2];
  }

  getVomitingData(data): any {
    return data == 1 ? [1, 1, 5, 4] : [4, 3, 2, 2];
  }

  getTasteAndSmellData(data): any {
    return data == 1 ? [4, 5, 3, 3] : [3, 2, 2, 2];
  }

  getRespiratoryData(data): any {
    return data == 1 ? [1, 3, 5, 5] : [4, 4, 2, 2];
  }

  getOrganDisfunctionData(data): any {
    return data == 1 ? [1, 2, 4, 5] : [4, 4, 3, 2];
  }

  getMidTreatments(): any {
    let data = [
      {
        text:
          "Using one of the following anti-SARS-CoV-2 mAbs to treat outpatients with mild to moderate COVID-19 who are at high risk of clinical progression, as defined by the EUA criteria (treatments are listed in alphabetical order, and they may change based on circulating variants):",
        list: [
          "<b>Bamlanivimab plus etesevimab</b>",
          "<b>Casirivimab plus imdevimab</b>",
          "<b>Sotrovimab</b>",
        ],
      },
      {
        text:
          "The availability of <b>bamlanivimab</b> and <b>etesevimab</b> is restricted in areas with an elevated prevalence of variants that have markedly reduced in vitro susceptibility to these agents (e.g., the <b>Gamma</b> and <b>Beta</b> variants).",
        list: [],
      },
      {
        text:
          "Use dexamethasone or other systemic glucocorticoids to treat outpatients with mild to moderate COVID-19 who do not require hospitalization or supplemental oxygen. There is currently a lack of safety and efficacy data on the use of these agents, and systemic glucocorticoids may cause harm in these patients. Patients who are receiving <b>dexamethasone</b> or another corticosteroid for other indications should continue therapy for their underlying conditions as directed by their health care providers.",
        list: [],
      },
    ];

    return data;
  }
  getModerateTreatments(): any {
    return this.getMidTreatments();
  }
  getSevereTreatments(): any {
    let data = [
      {
        text:
          'Using 1 of the following options for hospitalized patients who require supplemental oxygen',
        list: [
          '<b>Remdesivir</b> (e.g., for patients who require minimal supplemental oxygen)',
          '<b>Dexamethasone plus remdesivir</b>',
          '<b>Dexamethasone</b>; for patients on dexamethasone who have rapidly increasing oxygen needs and systemic inflammation, add a second immunomodulatory drug (e.g., <b>tocilizumab</b> or <b>baricitinib</b>)',
        ],
      },
      {
        text:
          'If <b>dexamethasone</b> is not available, an alternative corticosteroid such as <b>prednisone</b>, <b>methylprednisolone</b>, or <b>hydrocortisone</b> can be used',
        list: [],
      },
      {
        text:
          'Using 1 of the following options for hospitalized patients who require oxygen through a high-flow device or NIV:',
        list: ['<b>Dexamethasone</b>', '<b>Dexamethasone plus remdesivir</b>'],
      },
      {
        text:
          "For patients who have rapidly increasing oxygen needs and have increased markers of inflammation, add either <b>baricitinib</b> or <b>tocilizumab</b> (drugs are listed alphabetically) to 1 of the 2 options above",
        list: [],
      },
      {
        text:
          "Using <b>dexamethasone</b> for hospitalized patients with COVID-19 who require mechanical ventilation or ECMO",
        list: [],
      },
      {
        text:
          "Using <b>dexamethasone plus tocilizumab</b> for patients with COVID-19 who are within 24 hours of admission to the ICU",
        list: [],
      },
    ];
    return data;
  }
  getCriticalTreatments(): any {
    let data = [
      {
        text: "<b>Hemodynamics</b>",
        list: [
          "For adults with COVID-19 and shock, using dynamic parameters, skin temperature, capillary refilling time, and/or lactate levels over static parameters to assess fluid responsiveness",
          "For the acute resuscitation of adults with COVID-19 and shock, using buffered/balanced crystalloids over unbalanced crystalloids",
          "For the acute resuscitation of adults with COVID-19 and shock, we recommend against the initial use of <b>albumin</b> for resuscitation",
          "For adults with COVID-19 and shock, we recommend <b>norepinephrine</b> as the first-line vasopressor",
          "For adults with COVID-19 and shock, the Panel recommends titrating vasoactive agents to target a mean arterial pressure (MAP) of 60 to 65 mm Hg over higher MAP targets",
          "We recommend against using <b>hydroxyethyl<b> starches for intravascular volume replacement in patients with sepsis or septic shock",
          "When norepinephrine is available, we recommend against using <b>dopamine</b> for patients with COVID-19 and shock",
          "As a second-line vasopressor, adding either <b>vasopressin</b> (up to 0.03 units/min) or <b>epinephrine</b> to norepinephrine to raise MAP to target or adding <b>vasopressin</b> (up to 0.03 units/min) to decrease norepinephrine dosage.",
          "Using <b>low-dose dopamine</b> for renal protection",
          "Using <b>dobutamine</b> in patients who show evidence of cardiac dysfunction and persistent hypoperfusion despite adequate fluid loading and the use of vasopressor agents",
          "All patients who require vasopressors have an arterial catheter placed as soon as practical, if the resources to do so are available",
          "For adults with refractory septic shock who have completed a course of corticosteroids to treat their COVID-19, we recommend using <b>low-dose corticosteroid</b> therapy (“shock-reversal”) over no corticosteroid therapy",
        ],
      },
      {
        text: "<b>Oxygenation and Ventilation</b>",
        list: [
          "For adults with COVID-19 and acute hypoxemic respiratory failure despite conventional oxygen therapy, we recommend <b>high-flow nasal cannula</b>(HFNC) oxygen over noninvasive ventilation (NIV)",
          "For adults with COVID-19 and acute hypoxemic respiratory failure who do not have an indication for endotracheal intubation and for whom HFNC oxygen is not available, we recommend performing a closely monitored trial of NIV",
          "For adults with persistent hypoxemia who require HFNC oxygen and for whom endotracheal intubation is not indicated, we recommend a trial of awake prone positioning",
          "We recommend against using awake prone positioning as a rescue therapy for refractory hypoxemia to avoid intubation in patients who otherwise meet the indications for intubation and mechanical ventilation",
          "If intubation becomes necessary, the procedure should be performed by an experienced practitioner in a controlled setting due to the enhanced risk of exposing health care practitioners to SARS-CoV-2 during intubation",
        ],
      },
      {
        text:
          "<b>For mechanically ventilated adults with COVID-19 and acute respiratory distress syndrome (ARDS)</b>",
        list: [
          "We recommend using low tidal volume (VT) ventilation (VT 4–8 mL/kg of predicted body weight) over higher VT ventilation (VT >8 mL/kg)",
          "We recommend targeting plateau pressures of <30 cm H2O",
          "We recommend using a conservative fluid strategy over a liberal fluid strategy",
          "We recommend against the routine use of <b>inhaled nitric oxide</b>",
        ],
      },
      {
        text: "<b>Acute Kidney Injury and Renal Replacement Therapy</b>",
        list: [
          "For critically ill patients with COVID-19 who have acute kidney injury and who develop indications for renal replacement therapy, we recommend continuous renal replacement therapy (CRRT), if available",
          "If CRRT is not available or not possible due to limited resources, the Panel recommends prolonged intermittent renal replacement therapy rather than intermittent hemodialysis",
        ],
      },
    ];
    return data;
  }
}
