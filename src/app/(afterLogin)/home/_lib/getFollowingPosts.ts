export async function getFollowingPosts() {
    const res = await fetch('http://localhost:9090/api/followingPosts', {
        next: {
            tags: ['posts', 'followings'],
        },
    });
    if (!res.ok) throw new Error('Failded to fetch data');

    return res.json();
}