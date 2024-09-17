import Express from "express"
import medicineRoute from "./router/medicineRouter"

const app = Express()

// allow to read a body request with json format
app.use(Express.json())

// prefix for medicine
app.use(`/medicine`, medicineRoute)

const PORT = 1992
app.listen(PORT, () => {
    console.log(`Server Drugstore run on PORT ${PORT}`);
 })