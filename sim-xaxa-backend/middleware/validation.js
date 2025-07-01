
import Joi from 'joi';

export const validateRegistration = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    first_name: Joi.string().min(2).max(50).required(),
    last_name: Joi.string().min(2).max(50).required(),
    pesel: Joi.string().pattern(/^[0-9]{11}$/).required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

export const validateSimRegistration = (req, res, next) => {
  const schema = Joi.object({
    network: Joi.string().valid('Orange', 'Plus', 'T-Mobile', 'Play', 'Virgin Mobile', 'Heyah', 'NJU Mobile', 'Lyca Mobile').required(),
    phone_number: Joi.string().pattern(/^[0-9]{9}$/).required(),
    serial_number: Joi.string().max(20).required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

export const validateTicket = (req, res, next) => {
  const schema = Joi.object({
    subject: Joi.string().min(5).max(200).required(),
    description: Joi.string().min(10).max(2000).required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};
