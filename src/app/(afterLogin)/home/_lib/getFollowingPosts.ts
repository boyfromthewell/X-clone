export async function getFollowingPosts() {
    const res = await fetch('http://localhost:9090/api/posts/followings', {
        next: {
            tags: ['posts', 'followings'],
        },
        credentials: 'include',
        cache: 'no-store'
    });
    if (!res.ok) throw new Error('Failded to fetch data');

    return res.json();
}