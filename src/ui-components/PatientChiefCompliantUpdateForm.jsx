/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { API } from "aws-amplify";
import { getPatientChiefCompliant } from "../graphql/queries";
import { updatePatientChiefCompliant } from "../graphql/mutations";
export default function PatientChiefCompliantUpdateForm(props) {
  const {
    id: idProp,
    patientChiefCompliant: patientChiefCompliantModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    profileId: "",
    patientName: "",
    mobileNumber: "",
    chiefComplaint: "",
    findings: "",
    diagnosis: "",
    date: "",
    doctorname: "",
    payment: "",
    treatment: "",
    owner: "",
  };
  const [profileId, setProfileId] = React.useState(initialValues.profileId);
  const [patientName, setPatientName] = React.useState(
    initialValues.patientName
  );
  const [mobileNumber, setMobileNumber] = React.useState(
    initialValues.mobileNumber
  );
  const [chiefComplaint, setChiefComplaint] = React.useState(
    initialValues.chiefComplaint
  );
  const [findings, setFindings] = React.useState(initialValues.findings);
  const [diagnosis, setDiagnosis] = React.useState(initialValues.diagnosis);
  const [date, setDate] = React.useState(initialValues.date);
  const [doctorname, setDoctorname] = React.useState(initialValues.doctorname);
  const [payment, setPayment] = React.useState(initialValues.payment);
  const [treatment, setTreatment] = React.useState(initialValues.treatment);
  const [owner, setOwner] = React.useState(initialValues.owner);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = patientChiefCompliantRecord
      ? { ...initialValues, ...patientChiefCompliantRecord }
      : initialValues;
    setProfileId(cleanValues.profileId);
    setPatientName(cleanValues.patientName);
    setMobileNumber(cleanValues.mobileNumber);
    setChiefComplaint(cleanValues.chiefComplaint);
    setFindings(cleanValues.findings);
    setDiagnosis(cleanValues.diagnosis);
    setDate(cleanValues.date);
    setDoctorname(cleanValues.doctorname);
    setPayment(cleanValues.payment);
    setTreatment(cleanValues.treatment);
    setOwner(cleanValues.owner);
    setErrors({});
  };
  const [patientChiefCompliantRecord, setPatientChiefCompliantRecord] =
    React.useState(patientChiefCompliantModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await API.graphql({
              query: getPatientChiefCompliant.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getPatientChiefCompliant
        : patientChiefCompliantModelProp;
      setPatientChiefCompliantRecord(record);
    };
    queryData();
  }, [idProp, patientChiefCompliantModelProp]);
  React.useEffect(resetStateValues, [patientChiefCompliantRecord]);
  const validations = {
    profileId: [{ type: "Required" }],
    patientName: [],
    mobileNumber: [],
    chiefComplaint: [],
    findings: [],
    diagnosis: [],
    date: [],
    doctorname: [],
    payment: [],
    treatment: [],
    owner: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          profileId,
          patientName: patientName ?? null,
          mobileNumber: mobileNumber ?? null,
          chiefComplaint: chiefComplaint ?? null,
          findings: findings ?? null,
          diagnosis: diagnosis ?? null,
          date: date ?? null,
          doctorname: doctorname ?? null,
          payment: payment ?? null,
          treatment: treatment ?? null,
          owner: owner ?? null,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await API.graphql({
            query: updatePatientChiefCompliant.replaceAll("__typename", ""),
            variables: {
              input: {
                id: patientChiefCompliantRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "PatientChiefCompliantUpdateForm")}
      {...rest}
    >
      <TextField
        label="Profile id"
        isRequired={true}
        isReadOnly={false}
        value={profileId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              profileId: value,
              patientName,
              mobileNumber,
              chiefComplaint,
              findings,
              diagnosis,
              date,
              doctorname,
              payment,
              treatment,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.profileId ?? value;
          }
          if (errors.profileId?.hasError) {
            runValidationTasks("profileId", value);
          }
          setProfileId(value);
        }}
        onBlur={() => runValidationTasks("profileId", profileId)}
        errorMessage={errors.profileId?.errorMessage}
        hasError={errors.profileId?.hasError}
        {...getOverrideProps(overrides, "profileId")}
      ></TextField>
      <TextField
        label="Patient name"
        isRequired={false}
        isReadOnly={false}
        value={patientName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              profileId,
              patientName: value,
              mobileNumber,
              chiefComplaint,
              findings,
              diagnosis,
              date,
              doctorname,
              payment,
              treatment,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.patientName ?? value;
          }
          if (errors.patientName?.hasError) {
            runValidationTasks("patientName", value);
          }
          setPatientName(value);
        }}
        onBlur={() => runValidationTasks("patientName", patientName)}
        errorMessage={errors.patientName?.errorMessage}
        hasError={errors.patientName?.hasError}
        {...getOverrideProps(overrides, "patientName")}
      ></TextField>
      <TextField
        label="Mobile number"
        isRequired={false}
        isReadOnly={false}
        value={mobileNumber}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              profileId,
              patientName,
              mobileNumber: value,
              chiefComplaint,
              findings,
              diagnosis,
              date,
              doctorname,
              payment,
              treatment,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.mobileNumber ?? value;
          }
          if (errors.mobileNumber?.hasError) {
            runValidationTasks("mobileNumber", value);
          }
          setMobileNumber(value);
        }}
        onBlur={() => runValidationTasks("mobileNumber", mobileNumber)}
        errorMessage={errors.mobileNumber?.errorMessage}
        hasError={errors.mobileNumber?.hasError}
        {...getOverrideProps(overrides, "mobileNumber")}
      ></TextField>
      <TextField
        label="Chief complaint"
        isRequired={false}
        isReadOnly={false}
        value={chiefComplaint}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              profileId,
              patientName,
              mobileNumber,
              chiefComplaint: value,
              findings,
              diagnosis,
              date,
              doctorname,
              payment,
              treatment,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.chiefComplaint ?? value;
          }
          if (errors.chiefComplaint?.hasError) {
            runValidationTasks("chiefComplaint", value);
          }
          setChiefComplaint(value);
        }}
        onBlur={() => runValidationTasks("chiefComplaint", chiefComplaint)}
        errorMessage={errors.chiefComplaint?.errorMessage}
        hasError={errors.chiefComplaint?.hasError}
        {...getOverrideProps(overrides, "chiefComplaint")}
      ></TextField>
      <TextField
        label="Findings"
        isRequired={false}
        isReadOnly={false}
        value={findings}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              profileId,
              patientName,
              mobileNumber,
              chiefComplaint,
              findings: value,
              diagnosis,
              date,
              doctorname,
              payment,
              treatment,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.findings ?? value;
          }
          if (errors.findings?.hasError) {
            runValidationTasks("findings", value);
          }
          setFindings(value);
        }}
        onBlur={() => runValidationTasks("findings", findings)}
        errorMessage={errors.findings?.errorMessage}
        hasError={errors.findings?.hasError}
        {...getOverrideProps(overrides, "findings")}
      ></TextField>
      <TextField
        label="Diagnosis"
        isRequired={false}
        isReadOnly={false}
        value={diagnosis}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              profileId,
              patientName,
              mobileNumber,
              chiefComplaint,
              findings,
              diagnosis: value,
              date,
              doctorname,
              payment,
              treatment,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.diagnosis ?? value;
          }
          if (errors.diagnosis?.hasError) {
            runValidationTasks("diagnosis", value);
          }
          setDiagnosis(value);
        }}
        onBlur={() => runValidationTasks("diagnosis", diagnosis)}
        errorMessage={errors.diagnosis?.errorMessage}
        hasError={errors.diagnosis?.hasError}
        {...getOverrideProps(overrides, "diagnosis")}
      ></TextField>
      <TextField
        label="Date"
        isRequired={false}
        isReadOnly={false}
        type="date"
        value={date}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              profileId,
              patientName,
              mobileNumber,
              chiefComplaint,
              findings,
              diagnosis,
              date: value,
              doctorname,
              payment,
              treatment,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.date ?? value;
          }
          if (errors.date?.hasError) {
            runValidationTasks("date", value);
          }
          setDate(value);
        }}
        onBlur={() => runValidationTasks("date", date)}
        errorMessage={errors.date?.errorMessage}
        hasError={errors.date?.hasError}
        {...getOverrideProps(overrides, "date")}
      ></TextField>
      <TextField
        label="Doctorname"
        isRequired={false}
        isReadOnly={false}
        value={doctorname}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              profileId,
              patientName,
              mobileNumber,
              chiefComplaint,
              findings,
              diagnosis,
              date,
              doctorname: value,
              payment,
              treatment,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.doctorname ?? value;
          }
          if (errors.doctorname?.hasError) {
            runValidationTasks("doctorname", value);
          }
          setDoctorname(value);
        }}
        onBlur={() => runValidationTasks("doctorname", doctorname)}
        errorMessage={errors.doctorname?.errorMessage}
        hasError={errors.doctorname?.hasError}
        {...getOverrideProps(overrides, "doctorname")}
      ></TextField>
      <TextField
        label="Payment"
        isRequired={false}
        isReadOnly={false}
        value={payment}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              profileId,
              patientName,
              mobileNumber,
              chiefComplaint,
              findings,
              diagnosis,
              date,
              doctorname,
              payment: value,
              treatment,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.payment ?? value;
          }
          if (errors.payment?.hasError) {
            runValidationTasks("payment", value);
          }
          setPayment(value);
        }}
        onBlur={() => runValidationTasks("payment", payment)}
        errorMessage={errors.payment?.errorMessage}
        hasError={errors.payment?.hasError}
        {...getOverrideProps(overrides, "payment")}
      ></TextField>
      <TextField
        label="Treatment"
        isRequired={false}
        isReadOnly={false}
        value={treatment}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              profileId,
              patientName,
              mobileNumber,
              chiefComplaint,
              findings,
              diagnosis,
              date,
              doctorname,
              payment,
              treatment: value,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.treatment ?? value;
          }
          if (errors.treatment?.hasError) {
            runValidationTasks("treatment", value);
          }
          setTreatment(value);
        }}
        onBlur={() => runValidationTasks("treatment", treatment)}
        errorMessage={errors.treatment?.errorMessage}
        hasError={errors.treatment?.hasError}
        {...getOverrideProps(overrides, "treatment")}
      ></TextField>
      <TextField
        label="Owner"
        isRequired={false}
        isReadOnly={false}
        value={owner}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              profileId,
              patientName,
              mobileNumber,
              chiefComplaint,
              findings,
              diagnosis,
              date,
              doctorname,
              payment,
              treatment,
              owner: value,
            };
            const result = onChange(modelFields);
            value = result?.owner ?? value;
          }
          if (errors.owner?.hasError) {
            runValidationTasks("owner", value);
          }
          setOwner(value);
        }}
        onBlur={() => runValidationTasks("owner", owner)}
        errorMessage={errors.owner?.errorMessage}
        hasError={errors.owner?.hasError}
        {...getOverrideProps(overrides, "owner")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || patientChiefCompliantModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || patientChiefCompliantModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
