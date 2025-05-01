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
import { getDoctor } from "../graphql/queries";
import { updateDoctor } from "../graphql/mutations";
export default function DoctorUpdateForm(props) {
  const {
    id: idProp,
    doctor: doctorModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    doctorName: "",
    doctorID: "",
    email: "",
    phone: "",
    specialization: "",
    experience: "",
    owner: "",
  };
  const [doctorName, setDoctorName] = React.useState(initialValues.doctorName);
  const [doctorID, setDoctorID] = React.useState(initialValues.doctorID);
  const [email, setEmail] = React.useState(initialValues.email);
  const [phone, setPhone] = React.useState(initialValues.phone);
  const [specialization, setSpecialization] = React.useState(
    initialValues.specialization
  );
  const [experience, setExperience] = React.useState(initialValues.experience);
  const [owner, setOwner] = React.useState(initialValues.owner);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = doctorRecord
      ? { ...initialValues, ...doctorRecord }
      : initialValues;
    setDoctorName(cleanValues.doctorName);
    setDoctorID(cleanValues.doctorID);
    setEmail(cleanValues.email);
    setPhone(cleanValues.phone);
    setSpecialization(cleanValues.specialization);
    setExperience(cleanValues.experience);
    setOwner(cleanValues.owner);
    setErrors({});
  };
  const [doctorRecord, setDoctorRecord] = React.useState(doctorModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await API.graphql({
              query: getDoctor.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getDoctor
        : doctorModelProp;
      setDoctorRecord(record);
    };
    queryData();
  }, [idProp, doctorModelProp]);
  React.useEffect(resetStateValues, [doctorRecord]);
  const validations = {
    doctorName: [{ type: "Required" }],
    doctorID: [{ type: "Required" }],
    email: [{ type: "Required" }],
    phone: [{ type: "Required" }],
    specialization: [{ type: "Required" }],
    experience: [{ type: "Required" }],
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
          doctorName,
          doctorID,
          email,
          phone,
          specialization,
          experience,
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
            query: updateDoctor.replaceAll("__typename", ""),
            variables: {
              input: {
                id: doctorRecord.id,
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
      {...getOverrideProps(overrides, "DoctorUpdateForm")}
      {...rest}
    >
      <TextField
        label="Doctor name"
        isRequired={true}
        isReadOnly={false}
        value={doctorName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              doctorName: value,
              doctorID,
              email,
              phone,
              specialization,
              experience,
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
        label="Doctor id"
        isRequired={true}
        isReadOnly={false}
        value={doctorID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              doctorName,
              doctorID: value,
              email,
              phone,
              specialization,
              experience,
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
        label="Email"
        isRequired={true}
        isReadOnly={false}
        value={email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              doctorName,
              doctorID,
              email: value,
              phone,
              specialization,
              experience,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.email ?? value;
          }
          if (errors.email?.hasError) {
            runValidationTasks("email", value);
          }
          setEmail(value);
        }}
        onBlur={() => runValidationTasks("email", email)}
        errorMessage={errors.email?.errorMessage}
        hasError={errors.email?.hasError}
        {...getOverrideProps(overrides, "email")}
      ></TextField>
      <TextField
        label="Phone"
        isRequired={true}
        isReadOnly={false}
        value={phone}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              doctorName,
              doctorID,
              email,
              phone: value,
              specialization,
              experience,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.phone ?? value;
          }
          if (errors.phone?.hasError) {
            runValidationTasks("phone", value);
          }
          setPhone(value);
        }}
        onBlur={() => runValidationTasks("phone", phone)}
        errorMessage={errors.phone?.errorMessage}
        hasError={errors.phone?.hasError}
        {...getOverrideProps(overrides, "phone")}
      ></TextField>
      <TextField
        label="Specialization"
        isRequired={true}
        isReadOnly={false}
        value={specialization}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              doctorName,
              doctorID,
              email,
              phone,
              specialization: value,
              experience,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.specialization ?? value;
          }
          if (errors.specialization?.hasError) {
            runValidationTasks("specialization", value);
          }
          setSpecialization(value);
        }}
        onBlur={() => runValidationTasks("specialization", specialization)}
        errorMessage={errors.specialization?.errorMessage}
        hasError={errors.specialization?.hasError}
        {...getOverrideProps(overrides, "specialization")}
      ></TextField>
      <TextField
        label="Experience"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={experience}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              doctorName,
              doctorID,
              email,
              phone,
              specialization,
              experience: value,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.experience ?? value;
          }
          if (errors.experience?.hasError) {
            runValidationTasks("experience", value);
          }
          setExperience(value);
        }}
        onBlur={() => runValidationTasks("experience", experience)}
        errorMessage={errors.experience?.errorMessage}
        hasError={errors.experience?.hasError}
        {...getOverrideProps(overrides, "experience")}
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
              doctorName,
              doctorID,
              email,
              phone,
              specialization,
              experience,
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
          isDisabled={!(idProp || doctorModelProp)}
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
              !(idProp || doctorModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
