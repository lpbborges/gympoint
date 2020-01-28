import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Sign from '~/pages/Sign';
import Students from '~/pages/Students';
import StudentForm from '~/pages/Students/Form';
import Plans from '~/pages/Plans';
import PlanForm from '~/pages/Plans/Form';
import Registrations from '~/pages/Registrations';
import RegistrationForm from '~/pages/Registrations/Form';
import HelpOrders from '~/pages/HelpOrders';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Sign} />

      <Route path="/students" exact component={Students} isPrivate />
      <Route path="/students/form" exact component={StudentForm} isPrivate />
      <Route path="/students/form/:id" component={StudentForm} isPrivate />

      <Route path="/plans" exact component={Plans} isPrivate />
      <Route path="/plans/form" exact component={PlanForm} isPrivate />
      <Route path="/plans/form/:id" component={PlanForm} isPrivate />

      <Route path="/registrations" exact component={Registrations} isPrivate />
      <Route
        path="/registrations/form"
        exact
        component={RegistrationForm}
        isPrivate
      />
      <Route
        path="/registrations/form/:id"
        component={RegistrationForm}
        isPrivate
      />

      <Route path="/help-orders" component={HelpOrders} isPrivate />
    </Switch>
  );
}
