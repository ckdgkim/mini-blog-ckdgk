const jsonServer = require('json-server')
const cors = require('cors')
const server = jsonServer.create()
const router = jsonServer.router('db.json') // json 파일을 DB로 사용
const middlewares = jsonServer.defaults()

// CORS 미들웨어 추가
server.use(cors())

// 기본적인 JSON Server 미들웨어 사용
server.use(middlewares)

// 라우터 적용 (db.json 파일을 경로로 사용)
server.use(router)

// 서버 실행, 4000번 포트에서 실행
server.listen(4000, () => {
  console.log('JSON Server is running on port 4000')
})
