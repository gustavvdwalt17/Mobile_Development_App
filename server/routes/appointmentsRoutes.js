import express from 'express'
import  {deleteAppointment, makeAppointment}  from '../controllers/AppointmentControllers.js'
import { getUserAppointments } from '../controllers/AppointmentControllers.js'
import { getHealthPrac } from '../controllers/AppointmentControllers.js';
const router = express.Router();

router.delete('/delete/:id',deleteAppointment)
router.get('/getUser/:id',getUserAppointments)
router.get('/getHealthPrac/:id',getHealthPrac)
router.post('/make',makeAppointment)

// router.post('/create',auth,createPost)
// router.delete('/delete/:id',auth,deletePost)
// // router.get('/:type',fetchListing)
// router.get('/:type',fetchListing)
// router.patch('/update/:id',updatePost)
// router.get('/search/:searching',getListingbySearch)



export default router