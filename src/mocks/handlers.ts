import { http, HttpResponse } from "msw";
import { faker } from "@faker-js/faker";

function generateDate() {
    const lastWeek = new Date(Date.now());
    lastWeek.setDate(lastWeek.getDate() - 7);
    return faker.date.between({
      from: lastWeek,
      to: Date.now(),
    });
  }
  const User = [
    {id: 'socksman', nickname: '주펄', image: '/temp.png'},
    {id: 'calmdownman', nickname: '침덩이', image: '/profile.png'},
    {id: 'leoturtle', nickname: '레오', image: faker.image.avatar()},
  ]

export const handlers = [
    http.post('/api/login', () => {
        console.log("login")
        return HttpResponse.json({
            userId: 1,
            nickname: "침덩이",
            id: "calmdownman",
            image: '/profile.png',
        }, {
            headers: {
                "Set-Cookie": 'connect.sid=msw-cookie;HttpOnly;Path=/'
            }
        })
    }),
    http.post('/api/logout', () => {
        return new HttpResponse(null, {
            headers: {
                "Set-Cookie": 'connect.sid=;HttpOnly;Path=/;Max-Age=0'
            }
        })
    }),
    http.post('/api/users', async () => {
        console.log('sign up')
        return HttpResponse.text(JSON.stringify('ok'), {
            headers: {
                "Set-Cookie": 'connect.sid=msw-cookie;HttpOnly;Path=/;Max-Age=0'
            }
        })
    }),
    http.get('/api/postRecommends', ({ request }) =>{
        /* const url = new URL(request.url);
        const parseInt(url.searchParams.get( as string) || 0; */

        return HttpResponse.json( [
            {
              postId: 1,
              User: User[0],
              content: `${1} Z.com is so marvelous. I'm gonna buy that.`,
              Images: [{imageId: 1, link: faker.image.urlLoremFlickr()}],
              createdAt: generateDate(),
            },
            {
              postId: 2,
              User: User[0],
              content: `${2} Z.com is so marvelous. I'm gonna buy that.`,
              Images: [
                {imageId: 1, link: faker.image.urlLoremFlickr()},
                {imageId: 2, link: faker.image.urlLoremFlickr()},
              ],
              createdAt: generateDate(),
            },
            {
              postId: 3,
              User: User[0],
              content: `${3} Z.com is so marvelous. I'm gonna buy that.`,
              Images: [],
              createdAt: generateDate(),
            },
            {
              postId: 4,
              User: User[0],
              content: `${4} Z.com is so marvelous. I'm gonna buy that.`,
              Images: [
                {imageId: 1, link: faker.image.urlLoremFlickr()},
                {imageId: 2, link: faker.image.urlLoremFlickr()},
                {imageId: 3, link: faker.image.urlLoremFlickr()},
                {imageId: 4, link: faker.image.urlLoremFlickr()},
              ],
              createdAt: generateDate(),
            },
            {
              postId: 5,
              User: User[0],
              content: `${5} Z.com is so marvelous. I'm gonna buy that.`,
              Images: [
                {imageId: 1, link: faker.image.urlLoremFlickr()},
                {imageId: 2, link: faker.image.urlLoremFlickr()},
                {imageId: 3, link: faker.image.urlLoremFlickr()},
              ],
              createdAt: generateDate(),
            },
          ])
    })
];