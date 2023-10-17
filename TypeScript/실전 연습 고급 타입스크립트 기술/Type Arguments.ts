// 복잡한 Argument 타입 해부해보기
// 제네릭을 사용하여 homepage의 타입 추론
export const getHomePageFeatureFlags = <T>(
  // 함수의 argument 타입 완성하기
  // config: unknown,
  config: {
    rawConfig: {
      featureFlags: {
        homePage: T;
        // 찾고자하는 타입(homepage)을 추론
      };
    };
  },
  // override: (flags: unknown) => unknown
  // 위의 homepage값을 사용을 할테니 그대로 T를 넣어 추론을 함.
  override: (flags: T) => T
) => {
  return override(config.rawConfig.featureFlags.homePage);
};

describe("getHomePageFeatureFlags", () => {
  // 아래 객체의 hompage 의 값들을 override 할 수 있도록 하는것이 getHomePageFeatureFlags의 역할
  const EXAMPLE_CONFIG = {
    apiEndpoint: "https://api.example.com",
    apiVersion: "v1",
    apiKey: "1234567890",
    rawConfig: {
      featureFlags: {
        homePage: {
          showBanner: true,
          showLogOut: false,
        },
        loginPage: {
          showCaptcha: true,
          showConfirmPassword: false,
        },
      },
    },
  };
  // 아래부터는 테스트 코드
  it("Should return the homePage flag object", () => {
    const flags = getHomePageFeatureFlags(
      EXAMPLE_CONFIG,
      (defaultFlags) => defaultFlags
    );

    expect(flags).toEqual({
      showBanner: true,
      showLogOut: false,
    });

    type tests = [
      // flags라는 변수는 최종적으로 object를 추론하는데, 위 homepage value 이다.
      Expect<Equal<typeof flags, { showBanner: boolean; showLogOut: boolean }>>
    ];
  });

  it("Should allow you to modify the result", () => {
    const flags = getHomePageFeatureFlags(EXAMPLE_CONFIG, (defaultFlags) => ({
      ...defaultFlags,
      showBanner: false,
    }));

    expect(flags).toEqual({
      showBanner: false,
      showLogOut: false,
    });

    type tests = [
      Expect<Equal<typeof flags, { showBanner: boolean; showLogOut: boolean }>>
    ];
  });
});

// Object Argument의 Key 타입 추론하기
// const typedObjectKeys = (obj: unknown) => {
//     return Object.keys(obj);
// };

// any를 넣은 이유는 숫자또는 다른 타입이 들어 올 수 있기 때문(여기서는 키만 뽑는 이유도 있음)
// Record 에 들어 갈 수 있는 타입은 string, number, symbol 등 뿐이라 변경해줘야함
// 어처피 TKey는 오브젝트 키들은 문자형이기 때문에 string으로 제한
const typedObjectKeys = <TKey extends string>(obj: Record<TKey, any>) => {
  return Object.keys(obj) as Array<TKey>;
  // Object.keys()는 string을 리턴하는 함수이기 때문에 as로 아래에서 테스트코드에 있는 Array<"a" | "b">를 최종적으로 추론하게 만든다.
};

it("Should return the keys of the object", () => {
  const result1 = typedObjectKeys({
    a: 1,
    b: 2,
  });

  expect(result1).toEqual(["a", "b"]);

  type test = Expect<Equal<typeof result1, Array<"a" | "b">>>;
});
