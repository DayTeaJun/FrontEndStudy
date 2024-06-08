import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/providers/themeProvier';
import Sidebar from '@/components/Sidebar';
import PlayerWrapper from '@/components/player/PlayerWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Clone YT Music',
  description: 'Clone Youtube Music',
};

// RootLayout은 하나로 존재
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // console.log('before layout');
  // await sleep(2000);
  // console.log('after layout');
  // 외부에 백엔드에서 데이터를 가져오는데 2초 걸린다

  // html화 하는데 또 시간이 걸림
  // RootLayout에서 시간이 많이걸리는 작업을 하는것은 좋지 않음 위의 sleep(2000)처럼
  // 데이터를 가져오는 작업은 서브 페이지에서 작업에서만
  // RootLayout에서 데이터를 가져오면 Loading 같은 컴포넌트를 보여줄 수 없음
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Sidebar>{children}</Sidebar>
          <PlayerWrapper />
        </ThemeProvider>
      </body>
    </html>
  );
}
