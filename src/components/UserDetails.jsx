// src/components/UserDetails.js
import React, { useContext }from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { useLocation} from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  street: yup.string().required(),
  suite: yup.string().required(),
  city: yup.string().required(),
  zipcode: yup.string().required(),
  lat: yup.string().required(),
  lng: yup.string().required(),
  phone: yup.string().required(),
  companyName: yup.string().required(),
  catchPhrase: yup.string().required(),
  bs: yup.string().required(),
});

const UserDetails = () => {
  const location = useLocation();
  const { state } = location;
  const { userData } = state || {};
  const { login } = useContext(AuthContext);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      if (!userData) {
        throw new Error('User data not found');
      }
      const newUser = {
        name: data.name,
        username: userData.username,
        email: data.email,
        address: {
          street: data.street,
          suite: data.suite,
          city: data.city,
          zipcode: data.zipcode,
          geo: {
            lat: data.lat,
            lng: data.lng,
          },
        },
        phone: data.phone,
        website: userData.password,
        company: {
          name: data.companyName,
          catchPhrase: data.catchPhrase,
          bs: data.bs,
        },
      };
      await axios.post('http://localhost:5000/users', newUser);
      login(newUser.username);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Complete User Details</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Name</label>
          <input type="text" {...register('name')} />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div>
          <label>Email</label>
          <input type="text" {...register('email')} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label>Street</label>
          <input type="text" {...register('street')} />
          {errors.street && <p>{errors.street.message}</p>}
        </div>
        <div>
          <label>Suite</label>
          <input type="text" {...register('suite')} />
          {errors.suite && <p>{errors.suite.message}</p>}
        </div>
        <div>
          <label>City</label>
          <input type="text" {...register('city')} />
          {errors.city && <p>{errors.city.message}</p>}
        </div>
        <div>
          <label>Zipcode</label>
          <input type="text" {...register('zipcode')} />
          {errors.zipcode && <p>{errors.zipcode.message}</p>}
        </div>
        <div>
          <label>Latitude</label>
          <input type="text" {...register('lat')} />
          {errors.lat && <p>{errors.lat.message}</p>}
        </div>
        <div>
          <label>Longitude</label>
          <input type="text" {...register('lng')} />
          {errors.lng && <p>{errors.lng.message}</p>}
        </div>
        <div>
          <label>Phone</label>
          <input type="text" {...register('phone')} />
          {errors.phone && <p>{errors.phone.message}</p>}
        </div>
        <div>
          <label>Company Name</label>
          <input type="text" {...register('companyName')} />
          {errors.companyName && <p>{errors.companyName.message}</p>}
        </div>
        <div>
          <label>Catch Phrase</label>
          <input type="text" {...register('catchPhrase')} />
          {errors.catchPhrase && <p>{errors.catchPhrase.message}</p>}
        </div>
        <div>
          <label>BS</label>
          <input type="text" {...register('bs')} />
          {errors.bs && <p>{errors.bs.message}</p>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UserDetails;
