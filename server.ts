import app from "./src/app"
// const PORT = 3000
// const PORT = process.env.PORT
const PORT = 30

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
