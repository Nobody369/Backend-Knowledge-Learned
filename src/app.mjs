import Fastify from 'fastify'
import { lessons } from './data/lessons/index.mjs'
import { knowledgeMap } from './data/knowledge-map.mjs'
import { scoreAnswers } from './services/scoring.mjs'

export function buildApp() {
  const app = Fastify({
    logger: true,
  })

  app.get('/hello', async (request, reply) => {
    reply.header('Content-Type', 'application/json')

    return {
      message: 'Hello Sam',
      method: request.method,
      url: request.url,
    }
  })

  app.get('/users/:id', async (request, reply) => {
    if (request.params.id !== '1') {
      return reply.code(404).send({
        error: 'User not found',
        id: request.params.id,
      })
    }

    return {
      id: '1',
      name: 'Sam',
    }
  })

  app.get('/', async () => ({
    name: 'Backend Odyssey',
    goal: '用最短时间理解一个后端概念，知道它为什么存在，亲手验证它，然后通过测试判断是否真正掌握。',
    currentLesson: '/lessons/001',
    submitAnswers: 'POST /lessons/001/submit',
    topicFolders: [
      'topics/01-http-message',
      'topics/02-rest-api-methods',
      'topics/03-stateless-login',
    ],
  }))

  app.get('/lessons/current', async () => lessons['001'])

  app.get('/lessons/:id', async (request, reply) => {
    const lesson = lessons[request.params.id]

    if (!lesson) {
      return reply.code(404).send({
        error: 'Lesson not found',
        available: Object.keys(lessons),
      })
    }

    return lesson
  })

  app.post('/lessons/:id/submit', async (request, reply) => {
    if (!lessons[request.params.id]) {
      return reply.code(404).send({
        error: 'Lesson not found',
        available: Object.keys(lessons),
      })
    }

    return scoreAnswers(request.body?.answers)
  })

  app.get('/knowledge-map', async () => knowledgeMap)

  return app
}
