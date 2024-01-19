export async function getPostRecommends() {
    const res = await fetch('http://localhost:9090/api/postRecommends', {
        next: {
            tags: ['posts', 'recommends'],
        },
        cache:'no-store'
    });
    if (!res.ok) throw new Error('Failded to fetch data');

    return res.json();
}