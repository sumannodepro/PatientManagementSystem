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
import { createPatient } from "../graphql/mutations";
export default function PatientCreateForm(props) {
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
    title: "",
    patientName: "",
    mobileNumber: "",
    landlineNumber: "",
    city: "",
    emailId: "",
    address: "",
    address2: "",
    religion: "",
    dateOfBirth: "",
    age: "",
    bloodGroup: "",
    gender: "",
    owner: "",
  };
  const [patientID, setPatientID] = React.useState(initialValues.patientID);
  const [title, setTitle] = React.useState(initialValues.title);
  const [patientName, setPatientName] = React.useState(
    initialValues.patientName
  );
  const [mobileNumber, setMobileNumber] = React.useState(
    initialValues.mobileNumber
  );
  const [landlineNumber, setLandlineNumber] = React.useState(
    initialValues.landlineNumber
  );
  const [city, setCity] = React.useState(initialValues.city);
  const [emailId, setEmailId] = React.useState(initialValues.emailId);
  const [address, setAddress] = React.useState(initialValues.address);
  const [address2, setAddress2] = React.useState(initialValues.address2);
  const [religion, setReligion] = React.useState(initialValues.religion);
  const [dateOfBirth, setDateOfBirth] = React.useState(
    initialValues.dateOfBirth
  );
  const [age, setAge] = React.useState(initialValues.age);
  const [bloodGroup, setBloodGroup] = React.useState(initialValues.bloodGroup);
  const [gender, setGender] = React.useState(initialValues.gender);
  const [owner, setOwner] = React.useState(initialValues.owner);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setPatientID(initialValues.patientID);
    setTitle(initialValues.title);
    setPatientName(initialValues.patientName);
    setMobileNumber(initialValues.mobileNumber);
    setLandlineNumber(initialValues.landlineNumber);
    setCity(initialValues.city);
    setEmailId(initialValues.emailId);
    setAddress(initialValues.address);
    setAddress2(initialValues.address2);
    setReligion(initialValues.religion);
    setDateOfBirth(initialValues.dateOfBirth);
    setAge(initialValues.age);
    setBloodGroup(initialValues.bloodGroup);
    setGender(initialValues.gender);
    setOwner(initialValues.owner);
    setErrors({});
  };
  const validations = {
    patientID: [{ type: "Required" }],
    title: [],
    patientName: [{ type: "Required" }],
    mobileNumber: [{ type: "Required" }],
    landlineNumber: [],
    city: [],
    emailId: [],
    address: [],
    address2: [],
    religion: [],
    dateOfBirth: [],
    age: [],
    bloodGroup: [],
    gender: [],
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
          title,
          patientName,
          mobileNumber,
          landlineNumber,
          city,
          emailId,
          address,
          address2,
          religion,
          dateOfBirth,
          age,
          bloodGroup,
          gender,
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
            query: createPatient.replaceAll("__typename", ""),
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
      {...getOverrideProps(overrides, "PatientCreateForm")}
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
              title,
              patientName,
              mobileNumber,
              landlineNumber,
              city,
              emailId,
              address,
              address2,
              religion,
              dateOfBirth,
              age,
              bloodGroup,
              gender,
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
        label="Title"
        isRequired={false}
        isReadOnly={false}
        value={title}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              patientID,
              title: value,
              patientName,
              mobileNumber,
              landlineNumber,
              city,
              emailId,
              address,
              address2,
              religion,
              dateOfBirth,
              age,
              bloodGroup,
              gender,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.title ?? value;
          }
          if (errors.title?.hasError) {
            runValidationTasks("title", value);
          }
          setTitle(value);
        }}
        onBlur={() => runValidationTasks("title", title)}
        errorMessage={errors.title?.errorMessage}
        hasError={errors.title?.hasError}
        {...getOverrideProps(overrides, "title")}
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
              title,
              patientName: value,
              mobileNumber,
              landlineNumber,
              city,
              emailId,
              address,
              address2,
              religion,
              dateOfBirth,
              age,
              bloodGroup,
              gender,
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
        isRequired={true}
        isReadOnly={false}
        value={mobileNumber}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              patientID,
              title,
              patientName,
              mobileNumber: value,
              landlineNumber,
              city,
              emailId,
              address,
              address2,
              religion,
              dateOfBirth,
              age,
              bloodGroup,
              gender,
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
        label="Landline number"
        isRequired={false}
        isReadOnly={false}
        value={landlineNumber}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              patientID,
              title,
              patientName,
              mobileNumber,
              landlineNumber: value,
              city,
              emailId,
              address,
              address2,
              religion,
              dateOfBirth,
              age,
              bloodGroup,
              gender,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.landlineNumber ?? value;
          }
          if (errors.landlineNumber?.hasError) {
            runValidationTasks("landlineNumber", value);
          }
          setLandlineNumber(value);
        }}
        onBlur={() => runValidationTasks("landlineNumber", landlineNumber)}
        errorMessage={errors.landlineNumber?.errorMessage}
        hasError={errors.landlineNumber?.hasError}
        {...getOverrideProps(overrides, "landlineNumber")}
      ></TextField>
      <TextField
        label="City"
        isRequired={false}
        isReadOnly={false}
        value={city}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              patientID,
              title,
              patientName,
              mobileNumber,
              landlineNumber,
              city: value,
              emailId,
              address,
              address2,
              religion,
              dateOfBirth,
              age,
              bloodGroup,
              gender,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.city ?? value;
          }
          if (errors.city?.hasError) {
            runValidationTasks("city", value);
          }
          setCity(value);
        }}
        onBlur={() => runValidationTasks("city", city)}
        errorMessage={errors.city?.errorMessage}
        hasError={errors.city?.hasError}
        {...getOverrideProps(overrides, "city")}
      ></TextField>
      <TextField
        label="Email id"
        isRequired={false}
        isReadOnly={false}
        value={emailId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              patientID,
              title,
              patientName,
              mobileNumber,
              landlineNumber,
              city,
              emailId: value,
              address,
              address2,
              religion,
              dateOfBirth,
              age,
              bloodGroup,
              gender,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.emailId ?? value;
          }
          if (errors.emailId?.hasError) {
            runValidationTasks("emailId", value);
          }
          setEmailId(value);
        }}
        onBlur={() => runValidationTasks("emailId", emailId)}
        errorMessage={errors.emailId?.errorMessage}
        hasError={errors.emailId?.hasError}
        {...getOverrideProps(overrides, "emailId")}
      ></TextField>
      <TextField
        label="Address"
        isRequired={false}
        isReadOnly={false}
        value={address}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              patientID,
              title,
              patientName,
              mobileNumber,
              landlineNumber,
              city,
              emailId,
              address: value,
              address2,
              religion,
              dateOfBirth,
              age,
              bloodGroup,
              gender,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.address ?? value;
          }
          if (errors.address?.hasError) {
            runValidationTasks("address", value);
          }
          setAddress(value);
        }}
        onBlur={() => runValidationTasks("address", address)}
        errorMessage={errors.address?.errorMessage}
        hasError={errors.address?.hasError}
        {...getOverrideProps(overrides, "address")}
      ></TextField>
      <TextField
        label="Address2"
        isRequired={false}
        isReadOnly={false}
        value={address2}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              patientID,
              title,
              patientName,
              mobileNumber,
              landlineNumber,
              city,
              emailId,
              address,
              address2: value,
              religion,
              dateOfBirth,
              age,
              bloodGroup,
              gender,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.address2 ?? value;
          }
          if (errors.address2?.hasError) {
            runValidationTasks("address2", value);
          }
          setAddress2(value);
        }}
        onBlur={() => runValidationTasks("address2", address2)}
        errorMessage={errors.address2?.errorMessage}
        hasError={errors.address2?.hasError}
        {...getOverrideProps(overrides, "address2")}
      ></TextField>
      <TextField
        label="Religion"
        isRequired={false}
        isReadOnly={false}
        value={religion}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              patientID,
              title,
              patientName,
              mobileNumber,
              landlineNumber,
              city,
              emailId,
              address,
              address2,
              religion: value,
              dateOfBirth,
              age,
              bloodGroup,
              gender,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.religion ?? value;
          }
          if (errors.religion?.hasError) {
            runValidationTasks("religion", value);
          }
          setReligion(value);
        }}
        onBlur={() => runValidationTasks("religion", religion)}
        errorMessage={errors.religion?.errorMessage}
        hasError={errors.religion?.hasError}
        {...getOverrideProps(overrides, "religion")}
      ></TextField>
      <TextField
        label="Date of birth"
        isRequired={false}
        isReadOnly={false}
        type="date"
        value={dateOfBirth}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              patientID,
              title,
              patientName,
              mobileNumber,
              landlineNumber,
              city,
              emailId,
              address,
              address2,
              religion,
              dateOfBirth: value,
              age,
              bloodGroup,
              gender,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.dateOfBirth ?? value;
          }
          if (errors.dateOfBirth?.hasError) {
            runValidationTasks("dateOfBirth", value);
          }
          setDateOfBirth(value);
        }}
        onBlur={() => runValidationTasks("dateOfBirth", dateOfBirth)}
        errorMessage={errors.dateOfBirth?.errorMessage}
        hasError={errors.dateOfBirth?.hasError}
        {...getOverrideProps(overrides, "dateOfBirth")}
      ></TextField>
      <TextField
        label="Age"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={age}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              patientID,
              title,
              patientName,
              mobileNumber,
              landlineNumber,
              city,
              emailId,
              address,
              address2,
              religion,
              dateOfBirth,
              age: value,
              bloodGroup,
              gender,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.age ?? value;
          }
          if (errors.age?.hasError) {
            runValidationTasks("age", value);
          }
          setAge(value);
        }}
        onBlur={() => runValidationTasks("age", age)}
        errorMessage={errors.age?.errorMessage}
        hasError={errors.age?.hasError}
        {...getOverrideProps(overrides, "age")}
      ></TextField>
      <TextField
        label="Blood group"
        isRequired={false}
        isReadOnly={false}
        value={bloodGroup}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              patientID,
              title,
              patientName,
              mobileNumber,
              landlineNumber,
              city,
              emailId,
              address,
              address2,
              religion,
              dateOfBirth,
              age,
              bloodGroup: value,
              gender,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.bloodGroup ?? value;
          }
          if (errors.bloodGroup?.hasError) {
            runValidationTasks("bloodGroup", value);
          }
          setBloodGroup(value);
        }}
        onBlur={() => runValidationTasks("bloodGroup", bloodGroup)}
        errorMessage={errors.bloodGroup?.errorMessage}
        hasError={errors.bloodGroup?.hasError}
        {...getOverrideProps(overrides, "bloodGroup")}
      ></TextField>
      <TextField
        label="Gender"
        isRequired={false}
        isReadOnly={false}
        value={gender}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              patientID,
              title,
              patientName,
              mobileNumber,
              landlineNumber,
              city,
              emailId,
              address,
              address2,
              religion,
              dateOfBirth,
              age,
              bloodGroup,
              gender: value,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.gender ?? value;
          }
          if (errors.gender?.hasError) {
            runValidationTasks("gender", value);
          }
          setGender(value);
        }}
        onBlur={() => runValidationTasks("gender", gender)}
        errorMessage={errors.gender?.errorMessage}
        hasError={errors.gender?.hasError}
        {...getOverrideProps(overrides, "gender")}
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
              title,
              patientName,
              mobileNumber,
              landlineNumber,
              city,
              emailId,
              address,
              address2,
              religion,
              dateOfBirth,
              age,
              bloodGroup,
              gender,
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
