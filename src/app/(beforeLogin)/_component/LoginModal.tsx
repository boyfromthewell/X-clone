'use client';
import { signIn } from 'next-auth/react';
// 폴더 이름에 _ -> private 폴더 (주소창에서 걸러짐)

// 기본적으로 next14 의 모든 컴포넌트들은 서버 컴포넌트
// 클라이언트 컴포넌트로 바꾸기 위해선 "use client" 사용
import style from './login.module.css';
import { redirect, useRouter } from 'next/navigation';
import { FormEventHandler, useState } from 'react';

export default function LoginModal() {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const router = useRouter();

    const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        setMessage('');
        const callbackUrl = `${process.env.NEXT_PUBLIC_LOCAL}/home`;
        console.log('DD', callbackUrl);
        signIn('credentials', {
            username: id,
            password,
            redirect: true,
            callbackUrl,
        })
            .then((res) => {
                console.log('res', res);
                router.replace(callbackUrl);
            })
            .catch((err) => console.log(err));
    };

    const onClickClose = () => {
        router.back();
    };

    const onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
        setId(e.target.value);
    };

    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    return (
        <div className={style.modalBackground}>
            <div className={style.modal}>
                <div className={style.modalHeader}>
                    <button className={style.closeButton} onClick={onClickClose}>
                        <svg
                            width={24}
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="r-18jsvk2 r-4qtqp9 r-yyyyoo r-z80fyv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-19wmn03"
                        >
                            <g>
                                <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
                            </g>
                        </svg>
                    </button>
                    <div>로그인하세요.</div>
                </div>
                <form onSubmit={onSubmit}>
                    <div className={style.modalBody}>
                        <div className={style.inputDiv}>
                            <label className={style.inputLabel} htmlFor="id">
                                아이디
                            </label>
                            <input id="id" className={style.input} value={id} onChange={onChangeId} type="text" placeholder="" />
                        </div>
                        <div className={style.inputDiv}>
                            <label className={style.inputLabel} htmlFor="password">
                                비밀번호
                            </label>
                            <input
                                id="password"
                                className={style.input}
                                value={password}
                                onChange={onChangePassword}
                                type="password"
                                placeholder=""
                            />
                        </div>
                    </div>
                    <div className={style.message}>{message}</div>
                    <div className={style.modalFooter}>
                        <button className={style.actionButton} disabled={!id && !password}>
                            로그인하기
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
