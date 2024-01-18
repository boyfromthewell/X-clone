'use client';

import { useContext } from 'react';
import { TabContext } from './TabProvider';
import PostRecommends from './PostRecommends';
import FollowingPosts from './FollowingPosts';

export default function TabDecider() {
    const { tab } = useContext(TabContext);
    if (tab === 'rec') {
        return <PostRecommends />;
    }
    return <FollowingPosts />;
}
