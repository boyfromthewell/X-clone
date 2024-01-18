export async function getFollowRecommends() {
    const res = await fetch('http://localhost:9090/api/followRecommends', {
        next: {
            tags: ['users', 'followRecommends'],
        },
    });
    if (!res.ok) throw new Error('Failded to fetch data');

    return res.json();
}