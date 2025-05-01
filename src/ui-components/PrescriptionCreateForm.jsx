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
import { createPrescription } from "../graphql/mutations";
export default function PrescriptionCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    patientID: "",
    patientName: "",
    doctorID: "",
    doctorName: "",
    prescription: "",
    date: "",
    owner: "",
  };
  const [patientID, setPatientID] = React.useState(initialValues.patientID);
  const [patientName, setPatientName] = React.useState(
    initialValues.patientName
  );
  const [doctorID, setDoctorID] = React.useState(initialValues.doctorID);
  const [doctorName, setDoctorName] = React.useState(initialValues.doctorName);
  const [prescription, setPrescription] = React.useState(
    initialValues.prescription
  );
  const [date, setDate] = React.useState(initialValues.date);
  const [owner, setOwner] = React.useState(initialValues.owner);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setPatientID(initialValues.patientID);
    setPatientName(initialValues.patientName);
    setDoctorID(initialValues.doctorID);
    setDoctorName(initialValues.doctorName);
    setPrescription(initialValues.prescription);
    setDate(initialValues.date);
    setOwner(initialValues.owner);
    setErrors({});
  };
  const validations = {
    patientID: [{ type: "Required" }],
    patientName: [{ type: "Required" }],
    doctorID: [{ type: "Required" }],
    doctorName: [{ type: "Required" }],
    prescription: [{ type: "Required" }],
    date: [{ type: "Required" }],
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
          patientID,
          patientName,
          doctorID,
          doctorName,
          prescription,
          date,
          owner,
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
            query: createPrescription.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "PrescriptionCreateForm")}
      {...rest}
    >
      <TextField
        label="Patient id"
        isRequired={true}
        isReadOnly={false}
        value={patientID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              patientID: value,
              patientName,
              doctorID,
              doctorName,
              prescription,
              date,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.patientID ?? value;
          }
          if (errors.patientID?.hasError) {
            runValidationTasks("patientID", value);
          }
          setPatientID(value);
        }}
        onBlur={() => runValidationTasks("patientID", patientID)}
        errorMessage={errors.patientID?.errorMessage}
        hasError={errors.patientID?.hasError}
        {...getOverrideProps(overrides, "patientID")}
      ></TextField>
      <TextField
        label="Patient name"
        isRequired={true}
        isReadOnly={false}
        value={patientName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              patientID,
              patientName: value,
              doctorID,
              doctorName,
              prescription,
              date,
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
        label="Doctor id"
        isRequired={true}
        isReadOnly={false}
        value={doctorID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              patientID,
              patientName,
              doctorID: value,
              doctorName,
              prescription,
              date,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.doctorID ?? value;
          }
          if (errors.doctorID?.hasError) {
            runValidationTasks("doctorID", value);
          }
          setDoctorID(value);
        }}
        onBlur={() => runValidationTasks("doctorID", doctorID)}
        errorMessage={errors.doctorID?.errorMessage}
        hasError={errors.doctorID?.hasError}
        {...getOverrideProps(overrides, "doctorID")}
      ></TextField>
      <TextField
        label="Doctor name"
        isRequired={true}
        isReadOnly={false}
        value={doctorName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              patientID,
              patientName,
              doctorID,
              doctorName: value,
              prescription,
              date,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.doctorName ?? value;
          }
          if (errors.doctorName?.hasError) {
            runValidationTasks("doctorName", value);
          }
          setDoctorName(value);
        }}
        onBlur={() => runValidationTasks("doctorName", doctorName)}
        errorMessage={errors.doctorName?.errorMessage}
        hasError={errors.doctorName?.hasError}
        {...getOverrideProps(overrides, "doctorName")}
      ></TextField>
      <TextField
        label="Prescription"
        isRequired={true}
        isReadOnly={false}
        value={prescription}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              patientID,
              patientName,
              doctorID,
              doctorName,
              prescription: value,
              date,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.prescription ?? value;
          }
          if (errors.prescription?.hasError) {
            runValidationTasks("prescription", value);
          }
          setPrescription(value);
        }}
        onBlur={() => runValidationTasks("prescription", prescription)}
        errorMessage={errors.prescription?.errorMessage}
        hasError={errors.prescription?.hasError}
        {...getOverrideProps(overrides, "prescription")}
      ></TextField>
      <TextField
        label="Date"
        isRequired={true}
        isReadOnly={false}
        type="date"
        value={date}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              patientID,
              patientName,
              doctorID,
              doctorName,
              prescription,
              date: value,
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
        label="Owner"
        isRequired={false}
        isReadOnly={false}
        value={owner}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              patientID,
              patientName,
              doctorID,
              doctorName,
              prescription,
              date,
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
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
