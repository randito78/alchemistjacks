import { useRouter } from 'next/router';
import * as React from 'react';

type Options = {
  shouldRefresh?: (data: string) => boolean;
};

/**
 * Same behavior as next-remote-refresh/hook, but skips opening a WebSocket when
 * `remoteRefreshPort` is missing (avoids ws://localhost:undefined/ws in dev).
 */
export default function useRemoteRefreshOptional(options?: Options) {
  const router = useRouter();
  const wsRef = React.useRef<WebSocket>();

  React.useEffect(() => {
    if (process.env.NODE_ENV === 'production') return;
    const port = process.env.remoteRefreshPort;
    if (!port) return;

    const ws = new WebSocket(`ws://localhost:${port}/ws`);
    wsRef.current = ws;
    return () => ws.close();
  }, []);

  React.useEffect(() => {
    if (process.env.NODE_ENV === 'production') return;
    if (!process.env.remoteRefreshPort) return;

    const ws = wsRef.current;
    if (!ws) return;

    const { shouldRefresh } = options ?? {};
    const listener = (event: MessageEvent) => {
      const data = String(event.data);
      if (!shouldRefresh || shouldRefresh(data)) {
        router.replace(router.asPath, router.asPath, { scroll: false });
      }
    };
    ws.addEventListener('message', listener);
    return () => ws.removeEventListener('message', listener);
  }, [options?.shouldRefresh, router.asPath]);
}
