// 서버 사이드 Module Federation 유틸리티

interface RemoteComponent {
  default: React.ComponentType<any>;
}

// 서버 사이드에서 remote 컴포넌트를 로드하는 함수
export async function loadRemoteComponent(
  remoteName: string,
  componentPath: string
): Promise<React.ComponentType<any> | null> {
  try {
    // 서버 사이드에서만 실행
    if (typeof window !== "undefined") {
      return null;
    }

    // remoteEntry.js URL 결정
    const remoteUrl =
      remoteName === "remoteApp"
        ? "http://localhost:4173/assets/remoteEntry.js"
        : "http://localhost:4174/assets/remoteEntry.js";

    // 동적으로 remoteEntry.js 로드
    const remoteEntry = await import(remoteUrl);

    // Module Federation의 get 함수를 사용하여 컴포넌트 로드
    const component = await remoteEntry.get(componentPath);

    return component.default || component;
  } catch (error) {
    console.error(
      `Failed to load remote component ${remoteName}/${componentPath}:`,
      error
    );
    return null;
  }
}

// 서버 사이드에서 여러 remote 컴포넌트를 병렬로 로드
export async function loadMultipleRemoteComponents(
  components: Array<{ remoteName: string; componentPath: string; key: string }>
): Promise<Record<string, React.ComponentType<any>>> {
  const results: Record<string, React.ComponentType<any>> = {};

  try {
    const promises = components.map(
      async ({ remoteName, componentPath, key }) => {
        const component = await loadRemoteComponent(remoteName, componentPath);
        if (component) {
          results[key] = component;
        }
      }
    );

    await Promise.all(promises);
  } catch (error) {
    console.error("Failed to load multiple remote components:", error);
  }

  return results;
}

// 서버 사이드에서 preload된 컴포넌트들을 저장할 캐시
const componentCache = new Map<string, React.ComponentType<any>>();

// 캐시된 컴포넌트 로더
export async function loadCachedRemoteComponent(
  remoteName: string,
  componentPath: string
): Promise<React.ComponentType<any> | null> {
  const cacheKey = `${remoteName}:${componentPath}`;

  if (componentCache.has(cacheKey)) {
    return componentCache.get(cacheKey)!;
  }

  const component = await loadRemoteComponent(remoteName, componentPath);
  if (component) {
    componentCache.set(cacheKey, component);
  }

  return component;
}
