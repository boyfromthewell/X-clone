export async function getPostRecommends({ pageParam } : { pageParam? : number}) {
    const res = await fetch(`http://localhost:9090/api/posts/recommends?cursor=${pageParam}`, {
        next: {
            tags: ['posts', 'recommends'],
        },
        cache:'no-store'
    });
    if (!res.ok) throw new Error('Failded to fetch data');

    return res.json();
}