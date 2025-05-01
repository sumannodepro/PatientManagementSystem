/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePatient = /* GraphQL */ `
  subscription OnCreatePatient(
    $filter: ModelSubscriptionPatientFilterInput
    $owner: String
  ) {
    onCreatePatient(filter: $filter, owner: $owner) {
      id
      patientID
      title
      patientName
      mobileNumber
      landlineNumber
      city
      emailId
      address
      address2
      religion
      dateOfBirth
      age
      bloodGroup
      gender
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdatePatient = /* GraphQL */ `
  subscription OnUpdatePatient(
    $filter: ModelSubscriptionPatientFilterInput
    $owner: String
  ) {
    onUpdatePatient(filter: $filter, owner: $owner) {
      id
      patientID
      title
      patientName
      mobileNumber
      landlineNumber
      city
      emailId
      address
      address2
      religion
      dateOfBirth
      age
      bloodGroup
      gender
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeletePatient = /* GraphQL */ `
  subscription OnDeletePatient(
    $filter: ModelSubscriptionPatientFilterInput
    $owner: String
  ) {
    onDeletePatient(filter: $filter, owner: $owner) {
      id
      patientID
      title
      patientName
      mobileNumber
      landlineNumber
      city
      emailId
      address
      address2
      religion
      dateOfBirth
      age
      bloodGroup
      gender
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateTreatment = /* GraphQL */ `
  subscription OnCreateTreatment(
    $filter: ModelSubscriptionTreatmentFilterInput
    $owner: String
  ) {
    onCreateTreatment(filter: $filter, owner: $owner) {
      id
      treatmentName
      price
      description
      doctorID
      category
      duration
      discount
      insuranceCovered
      notes
      imageUrl
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateTreatment = /* GraphQL */ `
  subscription OnUpdateTreatment(
    $filter: ModelSubscriptionTreatmentFilterInput
    $owner: String
  ) {
    onUpdateTreatment(filter: $filter, owner: $owner) {
      id
      treatmentName
      price
      description
      doctorID
      category
      duration
      discount
      insuranceCovered
      notes
      imageUrl
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteTreatment = /* GraphQL */ `
  subscription OnDeleteTreatment(
    $filter: ModelSubscriptionTreatmentFilterInput
    $owner: String
  ) {
    onDeleteTreatment(filter: $filter, owner: $owner) {
      id
      treatmentName
      price
      description
      doctorID
      category
      duration
      discount
      insuranceCovered
      notes
      imageUrl
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreatePatientChiefCompliant = /* GraphQL */ `
  subscription OnCreatePatientChiefCompliant(
    $filter: ModelSubscriptionPatientChiefCompliantFilterInput
    $owner: String
  ) {
    onCreatePatientChiefCompliant(filter: $filter, owner: $owner) {
      id
      profileId
      patientName
      mobileNumber
      chiefComplaint
      findings
      diagnosis
      date
      doctorname
      payment
      treatment
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdatePatientChiefCompliant = /* GraphQL */ `
  subscription OnUpdatePatientChiefCompliant(
    $filter: ModelSubscriptionPatientChiefCompliantFilterInput
    $owner: String
  ) {
    onUpdatePatientChiefCompliant(filter: $filter, owner: $owner) {
      id
      profileId
      patientName
      mobileNumber
      chiefComplaint
      findings
      diagnosis
      date
      doctorname
      payment
      treatment
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeletePatientChiefCompliant = /* GraphQL */ `
  subscription OnDeletePatientChiefCompliant(
    $filter: ModelSubscriptionPatientChiefCompliantFilterInput
    $owner: String
  ) {
    onDeletePatientChiefCompliant(filter: $filter, owner: $owner) {
      id
      profileId
      patientName
      mobileNumber
      chiefComplaint
      findings
      diagnosis
      date
      doctorname
      payment
      treatment
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreatePatientTreatment = /* GraphQL */ `
  subscription OnCreatePatientTreatment(
    $filter: ModelSubscriptionPatientTreatmentFilterInput
    $owner: String
  ) {
    onCreatePatientTreatment(filter: $filter, owner: $owner) {
      id
      invoiceNumber
      patientID
      treatmentID
      treatmentName
      price
      discount
      totalAmount
      date
      doctorID
      modeOfPayment
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdatePatientTreatment = /* GraphQL */ `
  subscription OnUpdatePatientTreatment(
    $filter: ModelSubscriptionPatientTreatmentFilterInput
    $owner: String
  ) {
    onUpdatePatientTreatment(filter: $filter, owner: $owner) {
      id
      invoiceNumber
      patientID
      treatmentID
      treatmentName
      price
      discount
      totalAmount
      date
      doctorID
      modeOfPayment
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeletePatientTreatment = /* GraphQL */ `
  subscription OnDeletePatientTreatment(
    $filter: ModelSubscriptionPatientTreatmentFilterInput
    $owner: String
  ) {
    onDeletePatientTreatment(filter: $filter, owner: $owner) {
      id
      invoiceNumber
      patientID
      treatmentID
      treatmentName
      price
      discount
      totalAmount
      date
      doctorID
      modeOfPayment
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateDoctor = /* GraphQL */ `
  subscription OnCreateDoctor(
    $filter: ModelSubscriptionDoctorFilterInput
    $owner: String
  ) {
    onCreateDoctor(filter: $filter, owner: $owner) {
      id
      doctorName
      doctorID
      email
      phone
      specialization
      experience
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateDoctor = /* GraphQL */ `
  subscription OnUpdateDoctor(
    $filter: ModelSubscriptionDoctorFilterInput
    $owner: String
  ) {
    onUpdateDoctor(filter: $filter, owner: $owner) {
      id
      doctorName
      doctorID
      email
      phone
      specialization
      experience
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteDoctor = /* GraphQL */ `
  subscription OnDeleteDoctor(
    $filter: ModelSubscriptionDoctorFilterInput
    $owner: String
  ) {
    onDeleteDoctor(filter: $filter, owner: $owner) {
      id
      doctorName
      doctorID
      email
      phone
      specialization
      experience
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateAppointment = /* GraphQL */ `
  subscription OnCreateAppointment(
    $filter: ModelSubscriptionAppointmentFilterInput
    $owner: String
  ) {
    onCreateAppointment(filter: $filter, owner: $owner) {
      id
      patientID
      patientName
      phoneNumber
      appointmentDateAndTime
      complaint
      doctorID
      doctorName
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateAppointment = /* GraphQL */ `
  subscription OnUpdateAppointment(
    $filter: ModelSubscriptionAppointmentFilterInput
    $owner: String
  ) {
    onUpdateAppointment(filter: $filter, owner: $owner) {
      id
      patientID
      patientName
      phoneNumber
      appointmentDateAndTime
      complaint
      doctorID
      doctorName
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteAppointment = /* GraphQL */ `
  subscription OnDeleteAppointment(
    $filter: ModelSubscriptionAppointmentFilterInput
    $owner: String
  ) {
    onDeleteAppointment(filter: $filter, owner: $owner) {
      id
      patientID
      patientName
      phoneNumber
      appointmentDateAndTime
      complaint
      doctorID
      doctorName
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreatePrescription = /* GraphQL */ `
  subscription OnCreatePrescription(
    $filter: ModelSubscriptionPrescriptionFilterInput
    $owner: String
  ) {
    onCreatePrescription(filter: $filter, owner: $owner) {
      id
      patientID
      patientName
      doctorID
      doctorName
      prescription
      date
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdatePrescription = /* GraphQL */ `
  subscription OnUpdatePrescription(
    $filter: ModelSubscriptionPrescriptionFilterInput
    $owner: String
  ) {
    onUpdatePrescription(filter: $filter, owner: $owner) {
      id
      patientID
      patientName
      doctorID
      doctorName
      prescription
      date
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeletePrescription = /* GraphQL */ `
  subscription OnDeletePrescription(
    $filter: ModelSubscriptionPrescriptionFilterInput
    $owner: String
  ) {
    onDeletePrescription(filter: $filter, owner: $owner) {
      id
      patientID
      patientName
      doctorID
      doctorName
      prescription
      date
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateLastRecordID = /* GraphQL */ `
  subscription OnCreateLastRecordID(
    $filter: ModelSubscriptionLastRecordIDFilterInput
    $owner: String
  ) {
    onCreateLastRecordID(filter: $filter, owner: $owner) {
      id
      lastPatientID
      newPatientID
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateLastRecordID = /* GraphQL */ `
  subscription OnUpdateLastRecordID(
    $filter: ModelSubscriptionLastRecordIDFilterInput
    $owner: String
  ) {
    onUpdateLastRecordID(filter: $filter, owner: $owner) {
      id
      lastPatientID
      newPatientID
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteLastRecordID = /* GraphQL */ `
  subscription OnDeleteLastRecordID(
    $filter: ModelSubscriptionLastRecordIDFilterInput
    $owner: String
  ) {
    onDeleteLastRecordID(filter: $filter, owner: $owner) {
      id
      lastPatientID
      newPatientID
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
