const { Bathroom, Appointment } = require('../Schemas/userSchema');

const appointmentController = {
/* To create an appointment
Needs user id ,bathrooms and users username
_id, Bathroom_id, username  */

  async createAppointment(req, res, next) {
    console.log(req.body);
    const { _id, bathroom_id, username } = req.body;
    if (_id === null || bathroom_id === null || username === null) {
      return res.status(400).send('missing data to create appointment');
    }
    try {
      // creates appointment
      const app = await Appointment.create({ bathroomId: bathroom_id, userId: _id, username });
      const newApp = await app.save();
      // should make avalibale to false and be set to true in 30 minutes
      const makeunavailable = await Bathroom.findOneAndUpdate({ _id: bathroom_id }, { available: false });
      setTimeout(async () => {
        const makeavailable = await Bathroom.findOneAndUpdate({ _id: bathroom_id }, { available: true });
      }, 30000);
      res.locals.newApp = newApp;
      next();
    } catch (error) {
      next({
        log: 'appointmentController.createApp', error,
      });
    }
  },
  // host should send and array of appointments
  async getAppointments(req, res, next) {
    const { _id } = req.body;
    try {
      const app = [];
      bathrooms = await Bathroom.find({ hostId: _id });
      // console.log('bath', bathrooms);
      if (bathrooms.length === 0) {
        console.log('no restrooms');
        return res.send('Host has no bathrooms');
      }

      for (let i = 0; i < bathrooms.length; i++) {
        appointments = await Appointment.find({ bathroomId: bathrooms[i]._id });
        if (appointments.length > 0) {
          console.log('app', appointments);
          app.push(appointments);
        }
      }
      res.locals.getAppointments = app;
      next();
    } catch (error) {
      next({
        log: 'appointmentController.getAppointment', error,
      });
    }
  },

};
module.exports = appointmentController;
