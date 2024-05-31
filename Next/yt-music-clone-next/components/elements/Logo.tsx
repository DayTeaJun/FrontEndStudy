'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import IconButton from './IconButton';

function Logo() {
  const { push } = useRouter();

  // 이벤트 함수를 쓸려면 client로 바꿔야함
  const onClickLogo = () => {
    push('/');
    // 이동하는 함수
  };

  const onClickMenu = () => {};

  return (
    <section className="flex flex-row items-center gap-3">
      <IconButton
        icon={<RxHamburgerMenu size={24} />}
        onClickIcon={onClickMenu}
      />
      <div className="cursor-pointer" onClick={onClickLogo}>
        <Image alt="logo" width={100} height={30} src={'/main-logo.svg'} />
      </div>
    </section>
  );
}

export default Logo;
