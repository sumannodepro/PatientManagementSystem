import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerPatient = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Patient, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly patientID: string;
  readonly title?: string | null;
  readonly patientName: string;
  readonly mobileNumber: string;
  readonly landlineNumber?: string | null;
  readonly city?: string | null;
  readonly emailId?: string | null;
  readonly address?: string | null;
  readonly address2?: string | null;
  readonly religion?: string | null;
  readonly dateOfBirth?: string | null;
  readonly age?: number | null;
  readonly bloodGroup?: string | null;
  readonly gender?: string | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPatient = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Patient, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly patientID: string;
  readonly title?: string | null;
  readonly patientName: string;
  readonly mobileNumber: string;
  readonly landlineNumber?: string | null;
  readonly city?: string | null;
  readonly emailId?: string | null;
  readonly address?: string | null;
  readonly address2?: string | null;
  readonly religion?: string | null;
  readonly dateOfBirth?: string | null;
  readonly age?: number | null;
  readonly bloodGroup?: string | null;
  readonly gender?: string | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Patient = LazyLoading extends LazyLoadingDisabled ? EagerPatient : LazyPatient

export declare const Patient: (new (init: ModelInit<Patient>) => Patient) & {
  copyOf(source: Patient, mutator: (draft: MutableModel<Patient>) => MutableModel<Patient> | void): Patient;
}

type EagerTreatment = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Treatment, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly treatmentName: string;
  readonly price: number;
  readonly description?: string | null;
  readonly doctorID?: string | null;
  readonly category?: string | null;
  readonly duration?: number | null;
  readonly discount?: number | null;
  readonly insuranceCovered?: boolean | null;
  readonly notes?: string | null;
  readonly imageUrl?: string | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTreatment = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Treatment, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly treatmentName: string;
  readonly price: number;
  readonly description?: string | null;
  readonly doctorID?: string | null;
  readonly category?: string | null;
  readonly duration?: number | null;
  readonly discount?: number | null;
  readonly insuranceCovered?: boolean | null;
  readonly notes?: string | null;
  readonly imageUrl?: string | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Treatment = LazyLoading extends LazyLoadingDisabled ? EagerTreatment : LazyTreatment

export declare const Treatment: (new (init: ModelInit<Treatment>) => Treatment) & {
  copyOf(source: Treatment, mutator: (draft: MutableModel<Treatment>) => MutableModel<Treatment> | void): Treatment;
}

type EagerPatientChiefCompliant = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PatientChiefCompliant, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly profileId: string;
  readonly patientName: string;
  readonly mobileNumber: string;
  readonly chiefComplaint: string;
  readonly findings: string;
  readonly diagnosis: string;
  readonly date: string;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPatientChiefCompliant = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PatientChiefCompliant, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly profileId: string;
  readonly patientName: string;
  readonly mobileNumber: string;
  readonly chiefComplaint: string;
  readonly findings: string;
  readonly diagnosis: string;
  readonly date: string;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type PatientChiefCompliant = LazyLoading extends LazyLoadingDisabled ? EagerPatientChiefCompliant : LazyPatientChiefCompliant

export declare const PatientChiefCompliant: (new (init: ModelInit<PatientChiefCompliant>) => PatientChiefCompliant) & {
  copyOf(source: PatientChiefCompliant, mutator: (draft: MutableModel<PatientChiefCompliant>) => MutableModel<PatientChiefCompliant> | void): PatientChiefCompliant;
}