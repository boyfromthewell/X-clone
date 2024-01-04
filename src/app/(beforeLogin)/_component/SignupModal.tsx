'use client';
import style from './signup.module.css';
import onSubmit from '../_lib/signup';
import BackButton from './BackButton';
import { useFormState, useFormStatus } from 'react-dom';

export default function SignupModal() {
    const [state, formAction] = useFormState<{ message: string | null }>(onSubmit, { message: null });
    const { pending } = useFormStatus();

    const showMessage = (message: string) => {
        if (message === 'no_id') {
            return '아이디를 입력하세요.';
        }
        if (message === 'no_name') {
            return '닉네임을 입력하세요.';
        }
        if (message === 'no_password') {
            return '비밀번호를 입력하세요';
        }
        if (message === 'no_images') {
            return '이미지를 업로드 하세요.';
        }
        if (message === 'user_exists') {
            return '이미 사용 중인 아이디 입니다.';
        }
        return '';
    };

    /* const onChangeId: ChangeEventHandler<HTMLInputElement> = (e) => {
        setId(e.target.value);
    };

    const onChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
        setPassword(e.target.value);
    };
    const onChangeNickname: ChangeEventHandler<HTMLInputElement> = (e) => {
        setNickname(e.target.value);
    };

    const onChangeImageFile: ChangeEventHandler<HTMLInputElement> = (e) => {
        e.target.files && setImageFile(e.target.files[0]);
    }; */

    /* const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        fetch('http://localhost:9090/api/users', {
            method: 'post',
            body: JSON.stringify({
                id,
                nickname,
                image,
                password,
            }),
            credentials: 'include',
        })
            .then((response: Response) => {
                console.log(response.status);
                if (response.status === 200) {
                    router.replace('/home');
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }; */

    return (
        <>
            <div className={style.modalBackground}>
                <div className={style.modal}>
                    <div className={style.modalHeader}>
                        <BackButton />
                        <div>계정을 생성하세요.</div>
                    </div>
                    <form action={formAction}>
                        <div className={style.modalBody}>
                            <div className={style.inputDiv}>
                                <label className={style.inputLabel} htmlFor="id">
                                    아이디
                                </label>
                                <input id="id" name="id" className={style.input} type="text" placeholder="" required />
                            </div>
                            <div className={style.inputDiv}>
                                <label className={style.inputLabel} htmlFor="name">
                                    닉네임
                                </label>
                                <input id="name" name="name" className={style.input} type="text" placeholder="" required />
                            </div>
                            <div className={style.inputDiv}>
                                <label className={style.inputLabel} htmlFor="password">
                                    비밀번호
                                </label>
                                <input id="password" name="password" className={style.input} type="password" placeholder="" required />
                            </div>
                            <div className={style.inputDiv}>
                                <label className={style.inputLabel} htmlFor="image">
                                    프로필
                                </label>
                                <input id="image" name="image" className={style.input} type="file" accept="image/*" required />
                            </div>
                        </div>
                        <div className={style.modalFooter}>
                            <button type="submit" className={style.actionButton} disabled={pending}>
                                가입하기
                            </button>
                            <div className={style.error}>{showMessage(state?.message)}</div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
