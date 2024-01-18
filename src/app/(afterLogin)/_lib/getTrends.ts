export async function getTrends() {
    const res = await fetch('http://localhost:9090/api/trends', {
        next: {
            tags: ['trends'],
        },
    });
    if (!res.ok) throw new Error('Failded to fetch data');

    return res.json();
}