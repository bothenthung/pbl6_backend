import httpsServer from "./src/app"
// const PORT = 3000
// const PORT = process.env.PORT
const PORT = 3009

httpsServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
