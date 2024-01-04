import { http, HttpResponse } from "msw";

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
    })
];