// Equal, Expect는 타입스크립트의 타입이 맞는지 확인하는 용도
import { Equal, Expect } from "../../helper";

const getLocationWeather = (locationId: string) => {
  return `Weather at location ${locationId}`;
};
type GetLocationWeatherReturn = ReturnType<typeof getLocationWeather>;
const getDetailedWeather = (
  locationId: string,
  details?: {
    tempUnit?: "C" | "F";
    includeForecast?: boolean;
  }
) => {};
type GetDetailedWeatherParameters = Parameters<typeof getDetailedWeather>;

type tests = [
  Expect<Equal<GetLocationWeatherReturn, string>>,
  Expect<
    Equal<
      GetDetailedWeatherParameters,
      // Parameters의 리턴은 tuple (tuple은 배열의 요소가 정해진 것)
      // 함수 표현식에서는 타입을 바로 적어도 되지만 화살표 함수는 값의 이름도 적어야함.
      [
        locationId: string,
        details?: {
          tempUnit?: "C" | "F";
          includeForecast?: boolean;
        }
      ]
    >
  >
];
