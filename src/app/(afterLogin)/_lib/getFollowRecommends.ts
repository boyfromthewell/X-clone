export async function getFollowRecommends() {
    const res = await fetch('http://localhost:9090/api/users/followRecommends', {
        next: {
            tags: ['users', 'followRecommends'],
        },
        credentials: 'include'
    });
    if (!res.ok) throw new Error('Failded to fetch data');

    return res.json();
}