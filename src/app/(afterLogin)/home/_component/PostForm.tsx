'use client';
import { ChangeEventHandler, FormEvent, FormEventHandler, useRef, useState } from 'react';
import styles from './postForm.module.css';
import { Session } from '@auth/core/types';
import TextareaAutosize from 'react-textarea-autosize';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Post } from '@/model/Post';

type Props = {
    me: Session | null;
};

export default function PostForm({ me }: Props) {
    const imageRef = useRef<HTMLInputElement>(null);
    const [content, setContent] = useState('');
    const [preview, setPreview] = useState<Array<{ dataUrl: string; file: File } | null>>([]);

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (e: FormEvent) => {
            e.preventDefault();
            const formData = new FormData();
            formData.append('content', content);
            preview.forEach((p) => {
                p && formData.append('images', p.file);
            });

            return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`, {
                method: 'post',
                credentials: 'include',
                body: formData,
            });
        },
        async onSuccess(response, variable) {
            const newPost = await response.json();
            setContent('');
            setPreview([]);
            if (queryClient.getQueryData(['posts', 'recommends'])) {
                queryClient.setQueryData(['posts', 'recommends'], (prevData: { pages: Post[][] }) => {
                    const shallow = {
                        ...prevData,
                        pages: [...prevData.pages],
                    };

                    shallow.pages[0] = [...shallow.pages[0]];
                    shallow.pages[0].unshift(newPost);
                    return shallow;
                });
            }
            if (queryClient.getQueryData(['posts', 'followings'])) {
                queryClient.setQueryData(['posts', 'followings'], (prevData: { pages: Post[][] }) => {
                    const shallow = {
                        ...prevData,
                        pages: [...prevData.pages],
                    };

                    shallow.pages[0] = [...shallow.pages[0]];
                    shallow.pages[0].unshift(newPost);
                    return shallow;
                });
            }
        },
        onError(error) {
            console.error(error);
            alert('업로드 중 에러가 발생했습니다.');
        },
    });
    const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        setContent(e.target.value);
    };

    const handleClickButton = () => {
        if (imageRef.current !== null) imageRef.current.click();
    };

    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        e.preventDefault();
        if (e.target.files) {
            Array.from(e.target.files).forEach((file, idx) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreview((prevPreview) => {
                        const prev = [...prevPreview];
                        prev[idx] = {
                            dataUrl: reader.result as string,
                            file,
                        };
                        return prev;
                    });
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const onRemoveImage = (index: number) => {
        setPreview((prevPreview) => {
            const prev = [...prevPreview];
            prev[index] = null;
            return prev;
        });
    };

    return (
        <form className={styles.postForm} onSubmit={mutation.mutate}>
            <div className={styles.postUserSection}>
                <div className={styles.postUserImage}>
                    <img src={me?.user?.image as string} alt={me?.user?.email as string} />
                </div>
            </div>
            <div className={styles.postInputSection}>
                <TextareaAutosize value={content} onChange={handleChange} placeholder="무슨 일이 일어나고 있나요?" />
                <div style={{ display: 'flex' }}>
                    {preview.map(
                        (v, idx) =>
                            v && (
                                <div onClick={() => onRemoveImage(idx)} style={{ flex: 1 }} key={idx}>
                                    <img src={v.dataUrl} style={{ width: '100%', objectFit: 'contain', maxHeight: 100 }} />
                                </div>
                            )
                    )}
                </div>
                <div className={styles.postButtonSection}>
                    <div className={styles.footerButtons}>
                        <div className={styles.footerButtonLeft}>
                            <input type="file" name="imageFiles" multiple hidden ref={imageRef} onChange={onChange} />
                            <button className={styles.uploadButton} type="button" onClick={handleClickButton}>
                                <svg width={24} viewBox="0 0 24 24" aria-hidden="true">
                                    <g>
                                        <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path>
                                    </g>
                                </svg>
                            </button>
                        </div>
                        <button className={styles.actionButton} disabled={!content}>
                            게시하기
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}
