import { knowledgeMap } from '../../knowledge-map.mjs'

export const whyHttpExistsLesson = {
  id: '001',
  topicFolder: 'topics/01-http-message',
  title: '为什么 HTTP 会存在？',
  durationMinutes: '30-45',
  coreIdea: 'Every technology exists because of a problem. TCP 只负责传输字节，HTTP 负责定义这些字节代表什么。',
  modules: {
    mystery: {
      prompt: '如果世界上没有 HTTP，两台电脑要怎么交换网页？',
      goal: '先进入问题：电脑之间能传字节，但浏览器和服务器怎么知道这些字节代表网页、错误、JSON 或登录结果？',
    },
    why: [
      'TCP 可以建立连接并可靠传输字节，但它不规定这些字节的语义。',
      '浏览器和服务器需要一种共同语言：请求什么资源、用什么动作、结果是否成功、内容是什么格式。',
      'HTTP 的价值不是“传输”，而是“约定”：method、path、headers、body、status code。',
    ],
    history: [
      'HTTP 诞生于万维网早期，最初目标很朴素：让研究者可以通过超文本互相链接和读取文档。',
      '早期 Web 的成功不只因为技术复杂，而是因为协议足够简单，任何服务器和浏览器都能按同一套格式沟通。',
    ],
    mechanism: [
      'Browser -> HTTP Request -> Server -> HTTP Response',
      'Request 说明：我要对哪个 path 做什么 method，附带哪些 headers 和 body。',
      'Response 说明：结果状态是什么，返回内容是什么格式，body 是什么。',
    ],
    tradeOff: [
      '只用 TCP：双方都要私下约定字节格式，生态无法互通。',
      '每个网站自创协议：浏览器无法通用，调试和代理也会变困难。',
      'HTTP 不是所有场景的最佳答案：实时双向通信可能需要 WebSocket，高性能内部 RPC 可能会选择 gRPC。',
    ],
    lab: [
      '写一个 Fastify /hello API。',
      '用 curl -i http://localhost:3000/hello 查看 status line、headers 和 body。',
      '新增 /users/:id，id 为 1 返回 200，其他 id 返回 404。',
      '修改 header、status code、body，观察 response 的变化。',
    ],
    realWorld: [
      'GitHub API 用 HTTP method 表达读取、创建、更新、删除资源。',
      '用户登录后的页面仍然走 HTTP，但登录状态通常靠 Cookie、Session 或 Token 补上。',
    ],
    bossChallenge: 'PM 要一个订单系统，支持查看、创建、更新、取消订单。请设计 REST API，并解释每个 method 为什么合理。',
  },
  test: [
    {
      level: 1,
      category: 'Concept',
      question: 'HTTP 主要解决了什么问题？',
    },
    {
      level: 2,
      category: 'API Design',
      question: 'POST /orders/123/delete 是不是好的 REST 设计？为什么？',
    },
    {
      level: 3,
      category: 'Reasoning',
      question: '同一个 TCP 连接里传过去一段字节，为什么接收方还需要 HTTP headers？',
    },
    {
      level: 4,
      category: 'API Design',
      question: '设计一个 Order API：查看列表、查看单个订单、创建订单、局部更新地址、取消订单。',
    },
    {
      level: 5,
      category: 'Architecture',
      question: 'HTTP 默认无状态，但网站可以保持登录。请解释 Cookie、Session 或 Token 如何补上这件事。',
    },
  ],
  knowledgeMap,
  next: {
    pass: '002',
    reinforce: '001R',
  },
}
