/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPatient = /* GraphQL */ `
  query GetPatient($id: ID!) {
    getPatient(id: $id) {
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
export const listPatients = /* GraphQL */ `
  query ListPatients(
    $filter: ModelPatientFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPatients(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getTreatment = /* GraphQL */ `
  query GetTreatment($id: ID!) {
    getTreatment(id: $id) {
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
export const listTreatments = /* GraphQL */ `
  query ListTreatments(
    $filter: ModelTreatmentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTreatments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getPatientChiefCompliant = /* GraphQL */ `
  query GetPatientChiefCompliant($id: ID!) {
    getPatientChiefCompliant(id: $id) {
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
export const listPatientChiefCompliants = /* GraphQL */ `
  query ListPatientChiefCompliants(
    $filter: ModelPatientChiefCompliantFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPatientChiefCompliants(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getPatientTreatment = /* GraphQL */ `
  query GetPatientTreatment($id: ID!) {
    getPatientTreatment(id: $id) {
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
export const listPatientTreatments = /* GraphQL */ `
  query ListPatientTreatments(
    $filter: ModelPatientTreatmentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPatientTreatments(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getDoctor = /* GraphQL */ `
  query GetDoctor($id: ID!) {
    getDoctor(id: $id) {
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
export const listDoctors = /* GraphQL */ `
  query ListDoctors(
    $filter: ModelDoctorFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDoctors(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getAppointment = /* GraphQL */ `
  query GetAppointment($id: ID!) {
    getAppointment(id: $id) {
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
export const listAppointments = /* GraphQL */ `
  query ListAppointments(
    $filter: ModelAppointmentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAppointments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getPrescription = /* GraphQL */ `
  query GetPrescription($id: ID!) {
    getPrescription(id: $id) {
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
export const listPrescriptions = /* GraphQL */ `
  query ListPrescriptions(
    $filter: ModelPrescriptionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPrescriptions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getLastRecordID = /* GraphQL */ `
  query GetLastRecordID($id: ID!) {
    getLastRecordID(id: $id) {
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
export const listLastRecordIDS = /* GraphQL */ `
  query ListLastRecordIDS(
    $filter: ModelLastRecordIDFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLastRecordIDS(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        lastPatientID
        newPatientID
        owner
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
