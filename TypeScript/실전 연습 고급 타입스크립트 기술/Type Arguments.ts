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

// 함수형 언어 Result 타입
const makeSafe =
  // 타입인자를 함수의 형태로 받음


    <TFunc extends (...args: any[]) => any>(func: TFunc) =>
    (
      // 타입 유틸리티 Parameters로 TFunc 함수의 매개변수 타입을 가져옴
      ...args: Parameters<TFunc>
    ):
      | {
          type: "success";
          // 타입 유틸리티 ReturnType으로 함수 리턴 타입을 추론
          result: ReturnType<TFunc>;
        }
      | {
          type: "failure";
          error: Error;
        } => {
      try {
        const result = func(...args);

        return {
          type: "success",
          result,
        };
      } catch (e) {
        return {
          type: "failure",
          error: e as Error,
        };
      }
    };
// 첫번째 테스트
it("Should return the result with a { type: 'success' } on a successful call", () => {
  const func = makeSafe(() => 1);

  const result = func();

  expect(result).toEqual({
    type: "success",
    result: 1,
  });

  type tests = [
    Expect<
      Equal<
        typeof result,
        | {
            type: "success";
            result: number;
          }
        | {
            type: "failure";
            error: Error;
          }
      >
    >
  ];
});
// 두번째 테스트
it("Should return the error on a thrown call", () => {
  const func = makeSafe(() => {
    if (1 > 2) {
      return "123";
    }
    throw new Error("Oh dear");
  });

  const result = func();

  expect(result).toEqual({
    type: "failure",
    error: new Error("Oh dear"),
  });

  type tests = [
    Expect<
      Equal<
        typeof result,
        | {
            type: "success";
            result: string;
          }
        | {
            type: "failure";
            error: Error;
          }
      >
    >
  ];
});
// 세번째 테스트
it("Should properly match the function's arguments", () => {
  const func = makeSafe((a: number, b: string) => {
    return `${a} ${b}`;
  });

  // @ts-expect-error
  func();

  // @ts-expect-error
  func(1, 1);

  func(1, "1");
});

// Type arguments 타입 제한
// 타입 제한을 걸지않으면 타입을 추론하여 받음 함수('a')면 string 타입
// 타입 파라미터를 문자형이나 숫자로만 받게 타입 제한을 걸면
// string이나 number 형태가 아닌 받은 타입 그대로 타입을 리턴됨. 함수('a') 면 'a'타입
export const inferItemLiteral = <T extends string | number>(t: T) => {
  return {
    output: t,
    // 위 타입 제한을 하지 않고, 여기에 오는 타입이 제한적이라면 단순하게,
    // output: "a" | "b", 도 괜찮음
  };
};

const result1 = inferItemLiteral("a");
const result2 = inferItemLiteral(123);

type tests = [
  Expect<Equal<typeof result1, { output: "a" }>>,
  Expect<Equal<typeof result2, { output: 123 }>>
];

// @ts-expect-error
const error1 = inferItemLiteral({
  a: 1,
});

// @ts-expect-error
const error2 = inferItemLiteral([1, 2]);

// Argument로 넘어온 Array의 타입
// const makeStatus = <TStatuses extends string[]>(statuses: TStatuses) => {
//   return statuses;
// };
// 타입파라미터를 string으로 제한을 둔 뒤에 받는 Argument의 타입을 배열로 지정하여
// 문자로 이루어진 배열 형태의 타입을 만든다.
const makeStatus = <TStatuses extends string>(statuses: TStatuses[]) => {
  return statuses;
};
// 타입스크립트가 타입 추론을 하여, 문자열로 이루어진 배열에서 요소가 아래의 4가지 형태로 제한할 수 있는 문자열의 유니온 타입으로 추론한다.
// 그러면 결과적으로, ("INFO" | "DEBUG" | "ERROR" | "WARNING")[] 형태의 타입이 추론이 된다.
const statuses = makeStatus(["INFO", "DEBUG", "ERROR", "WARNING"]);

type tests = [
  Expect<Equal<typeof statuses, Array<"INFO" | "DEBUG" | "ERROR" | "WARNING">>>
];

// Cache
export interface Cache<T> {
  get: (key: string) => T | undefined;
  set: (key: string, value: T) => void;
  // You can fix this by only changing the line below!
  clone: <U>(transform: (elem: T) => U) => Cache<U>;
}

const createCache = <T>(initialCache?: Record<string, T>): Cache<T> => {
  const cache: Record<string, T> = initialCache || {};

  return {
    get: (key) => cache[key],
    set: (key, value) => {
      cache[key] = value;
    },
    clone: (transform) => {
      const newCache: Record<string, any> = {};

      for (const key in cache) {
        newCache[key] = transform(cache[key]);
      }
      return createCache(newCache);
    },
  };
};

it("Should let you get and set to/from the cache", () => {
  const cache = createCache<number>();

  cache.set("a", 1);
  cache.set("b", 2);

  expect(cache.get("a")).toEqual(1);
  expect(cache.get("b")).toEqual(2);
});

it("Should let you clone the cache using a transform function", () => {
  const numberCache = createCache<number>();

  numberCache.set("a", 1);
  numberCache.set("b", 2);

  const stringCache = numberCache.clone((elem) => {
    return String(elem);
  });

  const a = stringCache.get("a");

  expect(a).toEqual("1");

  type tests = [Expect<Equal<typeof a, string | undefined>>];
});
