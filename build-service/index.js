const fastify = require('fastify')()
const getBuiltPackageStats = require('package-build-stats')

fastify.get('/size', async(req, res) => {
  const packageString = decodeURIComponent(req.query.p)
  try {
    const result = await getBuiltPackageStats(packageString, {
      client: 'npm',
    })
    return res.code(200).send(result)
  } catch (err) {
    console.log(err)
    return res.code(500).send(err)
  }
})

fastify.listen(7002, '127.0.0.1', function (err) {
  if (err) throw err
  console.log(`server listening on ${fastify.server.address().port}`)
})
