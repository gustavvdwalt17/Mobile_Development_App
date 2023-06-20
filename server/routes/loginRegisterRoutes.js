
import express from 'express'
import { loginUser, registerUser } from '../controllers/loginRegisterController.js';
const router = express.Router();


router.post('/register',registerUser)
router.post('/login',loginUser)

// router.delete('/delete/:id',deleteAppointment)
// router.get('/getUser',getUserAppointments)
// router.get('/getHealthPrac',getHealthPrac)
// router.post('/make',makeAppointment)

// router.post('/create',auth,createPost)
// router.delete('/delete/:id',auth,deletePost)
// // router.get('/:type',fetchListing)
// router.get('/:type',fetchListing)
// router.patch('/update/:id',updatePost)
// router.get('/search/:searching',getListingbySearch)



export default router