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
