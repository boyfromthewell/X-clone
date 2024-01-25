import { http, HttpResponse, StrictResponse } from "msw";
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
  ];

  const RecommendUser = [
    {id: 'thankyou', nickname: '최고민수', image: '/minsu.jpg'},
    {id: "chadoljjambbong", nickname: "철면수심", image: "/profile2.jpg"},
    {id: "panibottle", nickname: "빠니보틀", image: "panni.jpg" }
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
    http.get('/api/postRecommends?cursor=0', ({ request }) =>{
        const url = new URL(request.url);
        const cursor = parseInt(url.searchParams.get('cursor') as string) || 0;

        return HttpResponse.json( [
            {
              postId: cursor + 1,
              User: User[0],
              content: `${cursor+ 1} 아기가 치즈를 좋아하나봐요`,
              Images: [{imageId: 1, link: faker.image.urlLoremFlickr()}],
              createdAt: generateDate(),
            },
            {
              postId: cursor + 2,
              User: User[0],
              content: `${cursor+ 2} 아기가 치즈를 좋아하나봐요`,
              Images: [
                {imageId: 1, link: faker.image.urlLoremFlickr()},
                {imageId: 2, link: faker.image.urlLoremFlickr()},
              ],
              createdAt: generateDate(),
            },
            {
              postId: cursor + 3,
              User: User[0],
              content: `${cursor + 3} 아기가 치즈를 좋아하나봐요`,
              Images: [],
              createdAt: generateDate(),
            },
            {
              postId: cursor + 4,
              User: User[0],
              content: `${cursor + 4} 아기가 치즈를 좋아하나봐요`,
              Images: [
                {imageId: 1, link: faker.image.urlLoremFlickr()},
                {imageId: 2, link: faker.image.urlLoremFlickr()},
                {imageId: 3, link: faker.image.urlLoremFlickr()},
                {imageId: 4, link: faker.image.urlLoremFlickr()},
              ],
              createdAt: generateDate(),
            },
            {
              postId: cursor + 5,
              User: User[0],
              content: `${cursor + 5} 아기가 치즈를 좋아하나봐요`,
              Images: [
                {imageId: 1, link: faker.image.urlLoremFlickr()},
                {imageId: 2, link: faker.image.urlLoremFlickr()},
                {imageId: 3, link: faker.image.urlLoremFlickr()},
              ],
              createdAt: generateDate(),
            },
          ])
    }),
    http.get('/api/followingPosts', ({ request }) =>{
      /* const url = new URL(request.url);
      const parseInt(url.searchParams.get( as string) || 0; */

      return HttpResponse.json( [
          {
            postId: 1,
            User: User[1],
            content: `${1} 팔로우 하지마라 가라 재미없다`,
            Images: [{imageId: 1, link: faker.image.urlLoremFlickr()}],
            createdAt: generateDate(),
          },
          {
            postId: 2,
            User: User[1],
            content: `${2} 팔로우 하지마라 가라 재미없다`,
            Images: [
              {imageId: 1, link: faker.image.urlLoremFlickr()},
              {imageId: 2, link: faker.image.urlLoremFlickr()},
            ],
            createdAt: generateDate(),
          },
          {
            postId: 3,
            User: User[1],
            content: `${3} 팔로우 하지마라 가라 재미없다`,
            Images: [],
            createdAt: generateDate(),
          },
          {
            postId: 4,
            User: User[1],
            content: `${4} 팔로우 하지마라 가라 재미없다`,
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
            User: User[1],
            content: `${5} 팔로우 하지마라 가라 재미없다`,
            Images: [
              {imageId: 1, link: faker.image.urlLoremFlickr()},
              {imageId: 2, link: faker.image.urlLoremFlickr()},
              {imageId: 3, link: faker.image.urlLoremFlickr()},
            ],
            createdAt: generateDate(),
          },
        ])
  }),
  http.get('/api/search/:tag', ({ request, params }) => {
    const { tag } = params;
    /* const url = new URL(request.url);
    const parseInt(url.searchParams.get( as string) || 0; */

    return HttpResponse.json( [
        {
          postId: 1,
          User: User[2],
          content: `${1} search result ${tag}`,
          Images: [{imageId: 1, link: faker.image.urlLoremFlickr()}],
          createdAt: generateDate(),
        },
        {
          postId: 2,
          User: User[2],
          content: `${2} search result ${tag}`,
          Images: [
            {imageId: 1, link: faker.image.urlLoremFlickr()},
            {imageId: 2, link: faker.image.urlLoremFlickr()},
          ],
          createdAt: generateDate(),
        },
        {
          postId: 3,
          User: User[2],
          content: `${3} search result ${tag}`,
          Images: [],
          createdAt: generateDate(),
        },
        {
          postId: 4,
          User: User[2],
          content: `${4} search result ${tag}`,
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
          User: User[2],
          content: `${5} search result ${tag}`,
          Images: [
            {imageId: 1, link: faker.image.urlLoremFlickr()},
            {imageId: 2, link: faker.image.urlLoremFlickr()},
            {imageId: 3, link: faker.image.urlLoremFlickr()},
          ],
          createdAt: generateDate(),
        },
      ])
  }),
  http.get('/api/users/:userId/posts', ({ request, params }) => {
    const { userId } = params;
    /* const url = new URL(request.url);
    const parseInt(url.searchParams.get( as string) || 0; */

    return HttpResponse.json( [
        {
          postId: 1,
          User: User[1],
          content: `${1} ${userId}의 게시글`,
          Images: [{imageId: 1, link: faker.image.urlLoremFlickr()}],
          createdAt: generateDate(),
        },
        {
          postId: 2,
          User: User[1],
          content: `${2} ${userId}의 게시글`,
          Images: [
            {imageId: 1, link: faker.image.urlLoremFlickr()},
            {imageId: 2, link: faker.image.urlLoremFlickr()},
          ],
          createdAt: generateDate(),
        },
        {
          postId: 3,
          User: User[1],
          content: `${3} ${userId}의 게시글`,
          Images: [],
          createdAt: generateDate(),
        },
        {
          postId: 4,
          User: User[1],
          content: `${4} ${userId}의 게시글`,
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
          User: User[1],
          content: `${5} ${userId}의 게시글`,
          Images: [
            {imageId: 1, link: faker.image.urlLoremFlickr()},
            {imageId: 2, link: faker.image.urlLoremFlickr()},
            {imageId: 3, link: faker.image.urlLoremFlickr()},
          ],
          createdAt: generateDate(),
        },
      ])
  }),
  http.get('api/users/:userId', ({ request, params }) : StrictResponse<any> =>{
    const { userId } = params;
    const found = User.find((v)=> v.id === userId);
    if (found) {
      return HttpResponse.json(found);
    }
    return HttpResponse.json({message:'no_such_user'}, {
      status: 404
    })
  }),
  http.get('/api/posts/:postId', ({ request, params }): StrictResponse<any> => {
    const { postId } = params;
    if (parseInt(postId as string) > 10) {
      return HttpResponse.json({message:'no_such_post'}, {
        status: 404
      })
    }
    return HttpResponse.json(
        {
          postId: 6,
          User: User[1],
          content: `${1} 게시글 아이디 ${postId}의 내용`,
          Images: [{imageId: 1, link: faker.image.urlLoremFlickr()}],
          createdAt: generateDate(),
        }
      )
  }),
  http.get('/api/posts/:postId/comments', ({ request, params }) => {
    const { postId } = params;
    /* const url = new URL(request.url);
    const parseInt(url.searchParams.get( as string) || 0; */

    return HttpResponse.json( [
        {
          postId: 1,
          User: User[0],
          content: `${1} ${postId}의 답글 나처럼 살지 마시오`,
          Images: [{imageId: 1, link: faker.image.urlLoremFlickr()}],
          createdAt: generateDate(),
        },
        {
          postId: 2,
          User: User[0],
          content: `${2} ${postId}의 답글 나처럼 살지 마시오`,
          Images: [
            {imageId: 1, link: faker.image.urlLoremFlickr()},
            {imageId: 2, link: faker.image.urlLoremFlickr()},
          ],
          createdAt: generateDate(),
        },
        {
          postId: 3,
          User: User[0],
          content: `${3} ${postId}의 답글 나처럼 살지 마시오`,
          Images: [],
          createdAt: generateDate(),
        },
        {
          postId: 4,
          User: User[0],
          content: `${4} ${postId}의 답글 나처럼 살지 마시오`,
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
          content: `${5} ${postId}의 답글 나처럼 살지 마시오`,
          Images: [
            {imageId: 1, link: faker.image.urlLoremFlickr()},
            {imageId: 2, link: faker.image.urlLoremFlickr()},
            {imageId: 3, link: faker.image.urlLoremFlickr()},
          ],
          createdAt: generateDate(),
        },
      ])
  }),
  http.get('/api/followRecommends', ({ request }) => {
    return HttpResponse.json(RecommendUser);
  }),
  http.get('/api/trends', ({ request }) => {
    return HttpResponse.json([
      {tagId: 1, title: "침덩이", count: '1234'},
      {tagId: 2, title: "55도발", count: '55'},
      {tagId: 3, title: "침착맨 삼국지", count: '223'},
      {tagId: 4, title: "불침번", count: '134'},
      {tagId: 5, title: "침덩이", count: '1234'},
      {tagId: 6, title: "55도발", count: '55'},
      {tagId: 7, title: "침착맨 삼국지", count: '223'},
      {tagId: 8, title: "불침번", count: '134'},   
    ]);
  }),
];