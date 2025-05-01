// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Patient, Treatment, PatientChiefCompliant } = initSchema(schema);

export {
  Patient,
  Treatment,
  PatientChiefCompliant
};