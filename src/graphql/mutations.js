/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPatient = /* GraphQL */ `
  mutation CreatePatient(
    $input: CreatePatientInput!
    $condition: ModelPatientConditionInput
  ) {
    createPatient(input: $input, condition: $condition) {
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
export const updatePatient = /* GraphQL */ `
  mutation UpdatePatient(
    $input: UpdatePatientInput!
    $condition: ModelPatientConditionInput
  ) {
    updatePatient(input: $input, condition: $condition) {
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
export const deletePatient = /* GraphQL */ `
  mutation DeletePatient(
    $input: DeletePatientInput!
    $condition: ModelPatientConditionInput
  ) {
    deletePatient(input: $input, condition: $condition) {
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
export const createTreatment = /* GraphQL */ `
  mutation CreateTreatment(
    $input: CreateTreatmentInput!
    $condition: ModelTreatmentConditionInput
  ) {
    createTreatment(input: $input, condition: $condition) {
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
export const updateTreatment = /* GraphQL */ `
  mutation UpdateTreatment(
    $input: UpdateTreatmentInput!
    $condition: ModelTreatmentConditionInput
  ) {
    updateTreatment(input: $input, condition: $condition) {
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
export const deleteTreatment = /* GraphQL */ `
  mutation DeleteTreatment(
    $input: DeleteTreatmentInput!
    $condition: ModelTreatmentConditionInput
  ) {
    deleteTreatment(input: $input, condition: $condition) {
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
export const createPatientChiefCompliant = /* GraphQL */ `
  mutation CreatePatientChiefCompliant(
    $input: CreatePatientChiefCompliantInput!
    $condition: ModelPatientChiefCompliantConditionInput
  ) {
    createPatientChiefCompliant(input: $input, condition: $condition) {
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
export const updatePatientChiefCompliant = /* GraphQL */ `
  mutation UpdatePatientChiefCompliant(
    $input: UpdatePatientChiefCompliantInput!
    $condition: ModelPatientChiefCompliantConditionInput
  ) {
    updatePatientChiefCompliant(input: $input, condition: $condition) {
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
export const deletePatientChiefCompliant = /* GraphQL */ `
  mutation DeletePatientChiefCompliant(
    $input: DeletePatientChiefCompliantInput!
    $condition: ModelPatientChiefCompliantConditionInput
  ) {
    deletePatientChiefCompliant(input: $input, condition: $condition) {
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
export const createPatientTreatment = /* GraphQL */ `
  mutation CreatePatientTreatment(
    $input: CreatePatientTreatmentInput!
    $condition: ModelPatientTreatmentConditionInput
  ) {
    createPatientTreatment(input: $input, condition: $condition) {
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
export const updatePatientTreatment = /* GraphQL */ `
  mutation UpdatePatientTreatment(
    $input: UpdatePatientTreatmentInput!
    $condition: ModelPatientTreatmentConditionInput
  ) {
    updatePatientTreatment(input: $input, condition: $condition) {
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
export const deletePatientTreatment = /* GraphQL */ `
  mutation DeletePatientTreatment(
    $input: DeletePatientTreatmentInput!
    $condition: ModelPatientTreatmentConditionInput
  ) {
    deletePatientTreatment(input: $input, condition: $condition) {
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
export const createDoctor = /* GraphQL */ `
  mutation CreateDoctor(
    $input: CreateDoctorInput!
    $condition: ModelDoctorConditionInput
  ) {
    createDoctor(input: $input, condition: $condition) {
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
export const updateDoctor = /* GraphQL */ `
  mutation UpdateDoctor(
    $input: UpdateDoctorInput!
    $condition: ModelDoctorConditionInput
  ) {
    updateDoctor(input: $input, condition: $condition) {
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
export const deleteDoctor = /* GraphQL */ `
  mutation DeleteDoctor(
    $input: DeleteDoctorInput!
    $condition: ModelDoctorConditionInput
  ) {
    deleteDoctor(input: $input, condition: $condition) {
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
export const createAppointment = /* GraphQL */ `
  mutation CreateAppointment(
    $input: CreateAppointmentInput!
    $condition: ModelAppointmentConditionInput
  ) {
    createAppointment(input: $input, condition: $condition) {
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
export const updateAppointment = /* GraphQL */ `
  mutation UpdateAppointment(
    $input: UpdateAppointmentInput!
    $condition: ModelAppointmentConditionInput
  ) {
    updateAppointment(input: $input, condition: $condition) {
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
export const deleteAppointment = /* GraphQL */ `
  mutation DeleteAppointment(
    $input: DeleteAppointmentInput!
    $condition: ModelAppointmentConditionInput
  ) {
    deleteAppointment(input: $input, condition: $condition) {
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
export const createPrescription = /* GraphQL */ `
  mutation CreatePrescription(
    $input: CreatePrescriptionInput!
    $condition: ModelPrescriptionConditionInput
  ) {
    createPrescription(input: $input, condition: $condition) {
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
export const updatePrescription = /* GraphQL */ `
  mutation UpdatePrescription(
    $input: UpdatePrescriptionInput!
    $condition: ModelPrescriptionConditionInput
  ) {
    updatePrescription(input: $input, condition: $condition) {
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
export const deletePrescription = /* GraphQL */ `
  mutation DeletePrescription(
    $input: DeletePrescriptionInput!
    $condition: ModelPrescriptionConditionInput
  ) {
    deletePrescription(input: $input, condition: $condition) {
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
export const createLastRecordID = /* GraphQL */ `
  mutation CreateLastRecordID(
    $input: CreateLastRecordIDInput!
    $condition: ModelLastRecordIDConditionInput
  ) {
    createLastRecordID(input: $input, condition: $condition) {
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
export const updateLastRecordID = /* GraphQL */ `
  mutation UpdateLastRecordID(
    $input: UpdateLastRecordIDInput!
    $condition: ModelLastRecordIDConditionInput
  ) {
    updateLastRecordID(input: $input, condition: $condition) {
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
export const deleteLastRecordID = /* GraphQL */ `
  mutation DeleteLastRecordID(
    $input: DeleteLastRecordIDInput!
    $condition: ModelLastRecordIDConditionInput
  ) {
    deleteLastRecordID(input: $input, condition: $condition) {
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
