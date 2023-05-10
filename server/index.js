import  express  from "express";
import cors from 'cors'
import bodyParser from 'body-parser'
const app = express();
app.use(cors())
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))

// T10:00:00.000Z
// let userDate = {
//     date:"2023/05/10",
//     time:"11:00"
// }
// let userobj = [
//     {
//         name:'TimtheTatMan',
//         currAppointments:['2023/05/10','2023/05/12'],
//         currAppointmentsTime:['11:00','13:00'],
//     }
// ]

// app.get('/app',(req,res)=>{
   
// userobj.map((item) => {
// let dates = item.currAppointments
// dates.forEach((date) => {
// if (date===userDate.date){
//     console.log('date already booked')
// }
// })
// })
// })


app.listen(3001,()=>console.log(`Listening on port ${3001}`))