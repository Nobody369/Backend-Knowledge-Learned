const nextLessons = {
  '002': '为什么 HTTP 是无状态的，却可以登录？',
  '001R': 'HTTP 补强课：Request、Response 和 REST 语义再验证',
}

const scoringRubric = {
  Concept: ['http', 'tcp', '协议', '语义', '标准', '字节', '浏览器', '服务器'],
  Reasoning: ['因为', '所以', '如果', '没有', 'headers', 'status', 'body', '约定'],
  'API Design': ['get', 'post', 'put', 'patch', 'delete', '/orders', '资源', 'method'],
  Architecture: ['无状态', 'cookie', 'session', 'token', '登录', '状态', '服务端', '客户端'],
  Experiment: ['curl', '-i', 'header', 'status code', '200', '404', 'response', 'fastify'],
}

export function scoreAnswers(answers = {}) {
  const combinedAnswer = Object.values(answers).join(' ').toLowerCase()

  const categories = Object.fromEntries(
    Object.entries(scoringRubric).map(([category, keywords]) => {
      const hits = keywords.filter((keyword) => combinedAnswer.includes(keyword.toLowerCase())).length
      const lengthBonus = Math.min(4, Math.floor(combinedAnswer.length / 280))
      const score = Math.min(20, Math.round((hits / keywords.length) * 20) + lengthBonus)

      return [category, score]
    }),
  )

  const total = Object.values(categories).reduce((sum, score) => sum + score, 0)

  return {
    title: 'Backend Odyssey 001 Score',
    categories,
    total,
    result: total >= 80 ? 'Pass' : 'Reinforce',
    feedback: {
      strong: total >= 80 ? '你已经能把 HTTP 当作“问题的答案”来理解，而不是只背定义。' : '你已经开始抓到 HTTP 的基本用途。',
      memorized: categories.Reasoning < 14 ? '推理部分还偏像记忆答案，需要多解释“为什么不是只用 TCP”。' : '推理里已经有因果关系，不只是名词堆叠。',
      review: Object.entries(categories)
        .filter(([, score]) => score < 14)
        .map(([category]) => category),
      nextLesson: total >= 80 ? nextLessons['002'] : nextLessons['001R'],
    },
  }
}
