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
import { createAppointment } from "../graphql/mutations";
export default function AppointmentCreateForm(props) {
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
    phoneNumber: "",
    appointmentDateAndTime: "",
    complaint: "",
    doctorID: "",
    doctorName: "",
    owner: "",
  };
  const [patientID, setPatientID] = React.useState(initialValues.patientID);
  const [patientName, setPatientName] = React.useState(
    initialValues.patientName
  );
  const [phoneNumber, setPhoneNumber] = React.useState(
    initialValues.phoneNumber
  );
  const [appointmentDateAndTime, setAppointmentDateAndTime] = React.useState(
    initialValues.appointmentDateAndTime
  );
  const [complaint, setComplaint] = React.useState(initialValues.complaint);
  const [doctorID, setDoctorID] = React.useState(initialValues.doctorID);
  const [doctorName, setDoctorName] = React.useState(initialValues.doctorName);
  const [owner, setOwner] = React.useState(initialValues.owner);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setPatientID(initialValues.patientID);
    setPatientName(initialValues.patientName);
    setPhoneNumber(initialValues.phoneNumber);
    setAppointmentDateAndTime(initialValues.appointmentDateAndTime);
    setComplaint(initialValues.complaint);
    setDoctorID(initialValues.doctorID);
    setDoctorName(initialValues.doctorName);
    setOwner(initialValues.owner);
    setErrors({});
  };
  const validations = {
    patientID: [{ type: "Required" }],
    patientName: [{ type: "Required" }],
    phoneNumber: [{ type: "Required" }],
    appointmentDateAndTime: [{ type: "Required" }],
    complaint: [{ type: "Required" }],
    doctorID: [],
    doctorName: [],
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
  const convertToLocal = (date) => {
    const df = new Intl.DateTimeFormat("default", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      calendar: "iso8601",
      numberingSystem: "latn",
      hourCycle: "h23",
    });
    const parts = df.formatToParts(date).reduce((acc, part) => {
      acc[part.type] = part.value;
      return acc;
    }, {});
    return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
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
          phoneNumber,
          appointmentDateAndTime,
          complaint,
          doctorID,
          doctorName,
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
            query: createAppointment.replaceAll("__typename", ""),
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
      {...getOverrideProps(overrides, "AppointmentCreateForm")}
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
              phoneNumber,
              appointmentDateAndTime,
              complaint,
              doctorID,
              doctorName,
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
              phoneNumber,
              appointmentDateAndTime,
              complaint,
              doctorID,
              doctorName,
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
        label="Phone number"
        isRequired={true}
        isReadOnly={false}
        value={phoneNumber}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              patientID,
              patientName,
              phoneNumber: value,
              appointmentDateAndTime,
              complaint,
              doctorID,
              doctorName,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.phoneNumber ?? value;
          }
          if (errors.phoneNumber?.hasError) {
            runValidationTasks("phoneNumber", value);
          }
          setPhoneNumber(value);
        }}
        onBlur={() => runValidationTasks("phoneNumber", phoneNumber)}
        errorMessage={errors.phoneNumber?.errorMessage}
        hasError={errors.phoneNumber?.hasError}
        {...getOverrideProps(overrides, "phoneNumber")}
      ></TextField>
      <TextField
        label="Appointment date and time"
        isRequired={true}
        isReadOnly={false}
        type="datetime-local"
        value={
          appointmentDateAndTime &&
          convertToLocal(new Date(appointmentDateAndTime))
        }
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              patientID,
              patientName,
              phoneNumber,
              appointmentDateAndTime: value,
              complaint,
              doctorID,
              doctorName,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.appointmentDateAndTime ?? value;
          }
          if (errors.appointmentDateAndTime?.hasError) {
            runValidationTasks("appointmentDateAndTime", value);
          }
          setAppointmentDateAndTime(value);
        }}
        onBlur={() =>
          runValidationTasks("appointmentDateAndTime", appointmentDateAndTime)
        }
        errorMessage={errors.appointmentDateAndTime?.errorMessage}
        hasError={errors.appointmentDateAndTime?.hasError}
        {...getOverrideProps(overrides, "appointmentDateAndTime")}
      ></TextField>
      <TextField
        label="Complaint"
        isRequired={true}
        isReadOnly={false}
        value={complaint}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              patientID,
              patientName,
              phoneNumber,
              appointmentDateAndTime,
              complaint: value,
              doctorID,
              doctorName,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.complaint ?? value;
          }
          if (errors.complaint?.hasError) {
            runValidationTasks("complaint", value);
          }
          setComplaint(value);
        }}
        onBlur={() => runValidationTasks("complaint", complaint)}
        errorMessage={errors.complaint?.errorMessage}
        hasError={errors.complaint?.hasError}
        {...getOverrideProps(overrides, "complaint")}
      ></TextField>
      <TextField
        label="Doctor id"
        isRequired={false}
        isReadOnly={false}
        value={doctorID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              patientID,
              patientName,
              phoneNumber,
              appointmentDateAndTime,
              complaint,
              doctorID: value,
              doctorName,
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
        isRequired={false}
        isReadOnly={false}
        value={doctorName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              patientID,
              patientName,
              phoneNumber,
              appointmentDateAndTime,
              complaint,
              doctorID,
              doctorName: value,
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
              phoneNumber,
              appointmentDateAndTime,
              complaint,
              doctorID,
              doctorName,
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
