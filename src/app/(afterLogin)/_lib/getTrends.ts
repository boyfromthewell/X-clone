export async function getTrends() {
    const res = await fetch('http://localhost:9090/api/hashtags/trends', {
        next: {
            tags: ['trends'],
        },
        credentials:'include',
        cache:'no-store'
    });
    if (!res.ok) throw new Error('Failded to fetch data');

    return res.json();
}