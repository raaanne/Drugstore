import Express from "express"
import medicineRoute from "./router/medicineRouter"
import adminRoute from "./router/adminRouter"

const app = Express()

// allow to read a body request with json format
app.use(Express.json())

// prefix for medicine
app.use(`/medicine`, medicineRoute)
app.use(`/admin`, adminRoute)

const PORT = 1992
app.listen(PORT, () => {
    console.log(`Server Drugstore run on PORT ${PORT}`);
 })