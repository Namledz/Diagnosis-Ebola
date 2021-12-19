import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      //expect(appController.getHello()).toBe('Hello World!');	
    });
  });
});

// getTopsisHospital(district_id: any, rate: any): any {
//   /*
// {
//   expertise: , chuyen mon bac si
//   healthCare: , cham soc suc khoe
//   cost: , gia tien
//   equipment: , trang bi
//   accuracyCovidTest: do chinh xac
// }
// */
//   const property = [
//     "expertise",
//     "healthCare",
//     "cost",
//     "equipment",
//     "accuracyCovidTest",
//   ];

//   const intensity = [
//     {
//       rate: "low", // 0% - 30%
//       expertise: 0.15,
//       healthCare: 0.15,
//       cost: 0.3,
//       equipment: 0.1,
//       accuracyCovidTest: 0.3,
//     },
//     {
//       rate: "medium", // 30% - 60%
//       expertise: 0.2,
//       healthCare: 0.15,
//       cost: 0.2,
//       equipment: 0.15,
//       accuracyCovidTest: 0.3,
//     },
//     {
//       rate: "high", // 60% - 100%
//       expertise: 0.15,
//       healthCare: 0.3,
//       cost: 0.1,
//       equipment: 0.15,
//       accuracyCovidTest: 0.3,
//     },
//   ];

//   const hospitalValueBylocation = [
//     {
//       idLocation: 1,
//       name: "Bệnh Viện Thanh Nhàn",
//       expertise: 7,
//       healthCare: 7,
//       cost: 7,
//       equipment: 8,
//       accuracyCovidTest: 7,
//     },
//     {
//       idLocation: 1,
//       name: "Bệnh Viện Y Học Cổ Truyền Trung Ương",
//       expertise: 7,
//       healthCare: 9,
//       cost: 4,
//       equipment: 7,
//       accuracyCovidTest: 6,
//     },
//     {
//       idLocation: 1,
//       name: "Bệnh Viện Hữu Nghị",
//       expertise: 7,
//       healthCare: 5,
//       cost: 5,
//       equipment: 8,
//       accuracyCovidTest: 7,
//     },
//     {
//       idLocation: 1,
//       name: "Bệnh Viện Phổi Hà Nội",
//       expertise: 6,
//       healthCare: 8,
//       cost: 9,
//       equipment: 6,
//       accuracyCovidTest: 6,
//     },
//     {
//       idLocation: 2,
//       name: "Bệnh Viện K Cơ sở 1",
//       expertise: 8,
//       healthCare: 4,
//       cost: 7,
//       equipment: 6,
//       accuracyCovidTest: 6,
//     },
//     {
//       idLocation: 2,
//       name: "Bệnh Viện Hữu Nghị Việt Đức",
//       expertise: 9,
//       healthCare: 5,
//       cost: 7,
//       equipment: 8,
//       accuracyCovidTest: 7,
//     },
//     {
//       idLocation: 2,
//       name: "Bệnh Viện Răng Hàm Mặt Trung Ương",
//       expertise: 4,
//       healthCare: 7,
//       cost: 4,
//       equipment: 9,
//       accuracyCovidTest: 6,
//     },
//     {
//       idLocation: 3,
//       name: "Bệnh Viện Bạch Mai",
//       expertise: 8,
//       healthCare: 7,
//       cost: 5,
//       equipment: 9,
//       accuracyCovidTest: 8,
//     },
//     {
//       idLocation: 3,
//       name: "Bệnh Viện Giao Thông Vận Tải",
//       expertise: 6,
//       healthCare: 3,
//       cost: 6,
//       equipment: 8,
//       accuracyCovidTest: 9,
//     },
//     {
//       idLocation: 3,
//       name: "Bệnh Viện Tai Mũi Họng Trung Ương",
//       expertise: 4,
//       healthCare: 7,
//       cost: 2,
//       equipment: 5,
//       accuracyCovidTest: 7,
//     },
//     {
//       idLocation: 3,
//       name: "Bệnh Viện Nhiệt Đới Trung Ương",
//       expertise: 8,
//       healthCare: 3,
//       cost: 6,
//       equipment: 5,
//       accuracyCovidTest: 7,
//     },
//     {
//       idLocation: 4,
//       name: "Bệnh Viện Đa Khoa Thăng Long",
//       expertise: 3,
//       healthCare: 8,
//       cost: 5,
//       equipment: 7,
//       accuracyCovidTest: 4,
//     },
//     {
//       idLocation: 4,
//       name: "Bệnh Viện Bưu Điện",
//       expertise: 7,
//       healthCare: 4,
//       cost: 6,
//       equipment: 7,
//       accuracyCovidTest: 8,
//     },
//     {
//       idLocation: 4,
//       name: "Bệnh Viện Y Học Cổ Truyền Quân Đội",
//       expertise: 2,
//       healthCare: 4,
//       cost: 9,
//       equipment: 5,
//       accuracyCovidTest: 8,
//     },
//     {
//       idLocation: 4,
//       name: "Bệnh Viện Y Phóng Xạ và U Bướu Quân Đội",
//       expertise: 3,
//       healthCare: 6,
//       cost: 7,
//       equipment: 8,
//       accuracyCovidTest: 3,
//     },
//     {
//       idLocation: 5,
//       name: "Bệnh Viện E",
//       expertise: 6,
//       healthCare: 7,
//       cost: 4,
//       equipment: 6,
//       accuracyCovidTest: 3,
//     },
//     {
//       idLocation: 5,
//       name: "Viện Huyết Học Truyền Máu Trung Ương",
//       expertise: 6,
//       healthCare: 7,
//       cost: 3,
//       equipment: 6,
//       accuracyCovidTest: 2,
//     },
//     {
//       idLocation: 5,
//       name: "Bệnh Viện Đa khoa y học cổ truyền Hà Nội",
//       expertise: 6,
//       healthCare: 7,
//       cost: 8,
//       equipment: 4,
//       accuracyCovidTest: 3,
//     },
//     {
//       idLocation: 5,
//       name: "Bệnh Viện 19-8 Bộ công an",
//       expertise: 9,
//       healthCare: 4,
//       cost: 8,
//       equipment: 6,
//       accuracyCovidTest: 5,
//     },
//     {
//       idLocation: 6,
//       name: "Bệnh Viện Đa khoa Xanh Pôn",
//       expertise: 8,
//       healthCare: 4,
//       cost: 3,
//       equipment: 6,
//       accuracyCovidTest: 7,
//     },
//     {
//       idLocation: 6,
//       name: "Bệnh Viện quân y 354",
//       expertise: 7,
//       healthCare: 3,
//       cost: 6,
//       equipment: 3,
//       accuracyCovidTest: 7,
//     },
//     {
//       idLocation: 6,
//       name: "Bệnh Viện Đa khoa Bảo Sơn 2",
//       expertise: 8,
//       healthCare: 5,
//       cost: 6,
//       equipment: 4,
//       accuracyCovidTest: 8,
//     },
//     {
//       idLocation: 6,
//       name: "Bệnh Viện Phổi Trung ương",
//       expertise: 9,
//       healthCare: 6,
//       cost: 5,
//       equipment: 8,
//       accuracyCovidTest: 5,
//     },
//     {
//       idLocation: 7,
//       name: "Bệnh Viện Đa Khoa Hà Đông",
//       expertise: 9,
//       healthCare: 8,
//       cost: 6,
//       equipment: 5,
//       accuracyCovidTest: 8,
//     },
//     {
//       idLocation: 7,
//       name: "Bệnh Viện Y Học Cổ Truyền Hà Đông",
//       expertise: 9,
//       healthCare: 3,
//       cost: 6,
//       equipment: 8,
//       accuracyCovidTest: 9,
//     },
//     {
//       idLocation: 7,
//       name: "Bệnh viện Quân y 103",
//       expertise: 3,
//       healthCare: 8,
//       cost: 7,
//       equipment: 5,
//       accuracyCovidTest: 3,
//     },
//     {
//       idLocation: 7,
//       name: "Bệnh Viện Tuệ Tĩnh",
//       expertise: 9,
//       healthCare: 7,
//       cost: 2,
//       equipment: 6,
//       accuracyCovidTest: 9,
//     },
//   ];

//   const findHospitalBylocation = (arr, idLocation) => {
//     // deep clone arr of objects
//     const oldArr = arr.filter(
//       (hospital) => hospital.idLocation === idLocation
//     );
//     const newArr = JSON.parse(JSON.stringify(oldArr));
//     return newArr;
//   };

//   const findIntensity = (input, intensity) => {
//   if(input > 0 && input < 30){
//     return intensity[0]
//   } else if(input >= 30 && input < 60) {
//     return intensity[1]
//   } else if(input >=60 && input <= 100){
//     return intensity[2]
//   }
//   };

//   const findArray = (arr, key, name) => {
//     return arr.findIndex((elm) => elm[name] === key);
//   };

//   const topsisHospital = (idLocation, inputInten) => {
//     const array = findHospitalBylocation(hospitalValueBylocation, idLocation);
//     const inten = findIntensity(inputInten, intensity);

//     //  for step 3
//     const arrMax = [];
//     const arrMin = [];

//     //  for step 4
//     const arrGoodIdeal = [];
//     const arrBadIdeal = [];

//     //  for step 5
//     const arrSameGoodIdeal = [];

//     // step 1, 2, 3
//     for (let i = 0; i < property.length; i++) {
//       let max = 0,
//         min = 1;
//       let total = array.reduce((acc, obj) => {
//         return acc + Math.pow(obj[property[i]], 2);
//       }, 0);

//       total = inten[property[i]] / Math.sqrt(total);

//       for (let j = 0; j < array.length; j++) {
//         array[j][property[i]] = total * array[j][property[i]];
//         if (max < array[j][property[i]]) max = array[j][property[i]];
//         if (min > array[j][property[i]]) min = array[j][property[i]];
//       }
//       arrMax.push(max);
//       arrMin.push(min);
//     }

//     // step 4
//     for (let i = 0; i < array.length; i++) {
//       let totalMax = 0;
//       let totalMin = 0;
//       for (let j = 0; j < property.length; j++) {
//         let sumMax = array[i][property[j]] - arrMax[j];
//         totalMax = totalMax + Math.pow(sumMax, 2);

//         let sumMin = array[i][property[j]] - arrMin[j];
//         totalMin = totalMin + Math.pow(sumMin, 2);
//       }

//       array[i].goodIdeal = Math.sqrt(totalMax);
//       array[i].badIdeal = Math.sqrt(totalMin);

//       arrGoodIdeal.push(array[i].goodIdeal);
//       arrBadIdeal.push(array[i].badIdeal);
//     }

//     // step 5
//     for (let i = 0; i < array.length; i++) {
//       let sum = arrBadIdeal[i] / (arrBadIdeal[i] + arrGoodIdeal[i]);

//       arrSameGoodIdeal.push(sum);
//       array[i].sameGoodIdeal = sum;
//     }

//     arrGoodIdeal.sort();
//     arrBadIdeal.sort((a, b) => b - a);
//     arrSameGoodIdeal.sort((a, b) => b - a);

//     for (let i = 0; i < array.length; i++) {
//       arrGoodIdeal[i] = findArray(array, arrGoodIdeal[i], "goodIdeal");
//       arrBadIdeal[i] = findArray(array, arrBadIdeal[i], "badIdeal");
//       arrSameGoodIdeal[i] = findArray(
//         array,
//         arrSameGoodIdeal[i],
//         "sameGoodIdeal"
//       );
//     }

//     // for(let i = 0; i < array.length; i++){
//     //     console.log(`S*[${i + 1}]: ` + array[arrGoodIdeal[i]].name);
//     //     console.log(`S-[${i + 1}]: ` + array[arrBadIdeal[i]].name);
//     //     console.log(`C [${i + 1}]: ` + array[arrSameGoodIdeal[i]].name);
//     //     console.log('-------------------');
//     // }

//   //   console.log(`S*: ` + array[arrGoodIdeal[0]].name);
//   //   console.log(`S-: ` + array[arrBadIdeal[0]].name);
//   //   console.log(`C : ` + array[arrSameGoodIdeal[0]].name);
//   //   console.log("-------------------");

//     // console.log(array);
//   let result = array.sort((a, b) => b.sameGoodIdeal - a.sameGoodIdeal);
//      console.log(result);
//   return result;
//   };

// return topsisHospital(district_id, rate)
// }
