import React, { useState, useEffect } from 'react';
import { TextField, Button, FormControlLabel, RadioGroup, Radio, Typography, Box, Grid, Paper, Checkbox } from '@mui/material';
import logoImage from '../../assets/Hanson RGB 60PX.jpg';
import bannerImage from '../../assets/cm.jpg';
import { set } from 'mongoose';

interface DisclosureOfCriminalRecordsProps {
  onNext: () => void;
  onPrev: () => void;
}

const DisclosureOfCriminalRecords: React.FC<DisclosureOfCriminalRecordsProps> = ({ onNext, onPrev }) => {
  const [formValues, setFormValues] = useState({
    hasCriminalRecord: '',
    criminalRecordDetails: '',
    CriminalConsentGiven: false,
    date: '',
  });

  const [formErrors, setFormErrors] = useState({
    hasCriminalRecord: '',
    criminalRecordDetails: '',
    CriminalConsentGiven: '',
    date: '',
  });

  const validate = (values: typeof formValues) => {
    const errors: any = {};
    if (!values.hasCriminalRecord) {
      errors.hasCriminalRecord = 'Required';
    }
    if (values.hasCriminalRecord === 'Yes, I have a criminal record' && !values.criminalRecordDetails) {
      errors.criminalRecordDetails = 'You must provide details for your criminal record';
    }
    if (!values.CriminalConsentGiven) {
      errors.CriminalConsentGiven = 'You must agree to the declarations to proceed';
    }
    if (!values.date) {
      errors.date = 'Date is required';
    }
    return errors;
  };

  useEffect(() => {
    const storedValues = JSON.parse(localStorage.getItem('formValues') || '{}');
    if (Object.keys(storedValues).length > 0) {
      setFormValues(storedValues);
    }
  }, [
  ]);
  useEffect(() => {
    if (formValues.hasCriminalRecord ==="No, I do not have a criminal record") {
      // FormValues.((prev: any)=>({...prev,criminalRecordDetails:" "}))
      formValues.criminalRecordDetails = "";
    }
  }, [formValues]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    // console.log(`Name: ${name}, Value: ${value}`);
    const updatedValues = {
      ...formValues,
      [name]: type === 'checkbox' ? checked : value,
    };
    setFormValues(updatedValues);

    // Optionally validate on change
    setFormErrors(validate(updatedValues));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors = validate(formValues);
    if (Object.keys(errors).length === 0) {
      localStorage.setItem('formValues', JSON.stringify(formValues));
      onNext();
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <Grid container spacing={2} sx={{ height: '100vh', padding: 4 }}>
      <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Paper elevation={3} sx={{ padding: 4, margin: 2 }}>
          <Box sx={{ textAlign: 'center', marginBottom: 2 }}>
            <img src={logoImage} alt="Company Logo" style={{ height: '60px' }} />
            <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold',margin: 2 }}>Disclosure of Criminal Records</Typography>
            <Typography variant="subtitle1" textAlign={'left'} margin={2}>
            Do you have any convictions, cautions, reprimands or final warnings that are not “protected” as defined by the rehabilitation of Offenders Act 1974 (Exceptions) order 1975 (as amended in 2013)? Are you aware of any police enquiries undertaken following allegations made against you which may have a bearing on your suitability for this work?
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            {/* <Typography variant="h5" component="h2" gutterBottom style={{ fontWeight: 'bold' }}>Disclosure of Criminal Records</Typography> */}

            <RadioGroup
              name="hasCriminalRecord"
              value={formValues.hasCriminalRecord}
              onChange={handleInputChange}
            >
              <FormControlLabel value="Yes, I have a criminal record" control={<Radio />} label="Yes, I have a criminal record" />
              <FormControlLabel value="No, I do not have a criminal record" control={<Radio />} label="No, I do not have a criminal record" />
            </RadioGroup>
            {formErrors.hasCriminalRecord && <Typography color="error">{formErrors.hasCriminalRecord}</Typography>}

            {formValues.hasCriminalRecord === 'Yes, I have a criminal record' && (
              <TextField
                name="criminalRecordDetails"
                label="If Yes, please provide details:"
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                onChange={handleInputChange}
                value={formValues.criminalRecordDetails}
                error={!!formErrors.criminalRecordDetails}
                helperText={formErrors.criminalRecordDetails}
              />
            )}
            <Typography component="div">
              <ul>
              {[
              "I certify that I have answered all questions on this form fully and accurately, and that I possess the qualifications that I claim to hold",
              "I certify that I am not on the List 99/ DBS Barred List or disqualified to work with children",
              "I give my consent for Hanson Recruitment to request a DBS update Service Check and other checks such as references, and the Teaching Regulation Agency lists",
              " certify that I am not subject to sanctions imposed by the Teaching Agency and I am not currently suspended from work or awaiting the outcome of a disciplinary enquiry",
              "I certify that I am legally entitled to work in the UK",
              "I am aware that physical contact with pupils should be avoided and that inflicting physical punishment could have serious consequences including criminal prosecution and referral to the Disclosure & Barring Service (DBS)/ EWC/ LADO/ NCTL",
              "I agree to support Hanson Recruitment’s commitment to child protection and Equal Opportunities and I have received and understand Hanson Recruitment’s Health & Safety information for temporary workers",
              "I understand that if I have knowingly given false information omitted or concealed any relevant fact about my eligibility for work, I will have my name removed from Hanson Recruitment’s register and will be reported to the National College for Teaching and leadership/ LADO / EWC which could lead to barring from work within education and possible referral to the police",
              "I have read the DFE Keeping Children Safe in Education (Part 1). You have been sent a link on this before you attend interview.",
              "I have read the DFE Guidance Disqualification Under the Childcare Act 2006 (for working with children under the age of 8) you have been sent this link before interview.",
              "I am not disqualified on any of the grounds set out in the DfE guidance.",
              "I will notify Hanson Recruitment if any of the above changes.",
              "I understand that communication between pupils and supply staff, by whatever method, should take place within clear professional boundaries as outlined in Hanson Recruitment’ s E-Safety policy. This includes the wider use of technology such as mobile phone text messaging, emails, digital cameras, videos, web-cams, websites, social networking sites,instant messaging and blogs",
              "I will return all swipes/ keys and school property to the school at the end of my placement with them, either directly or by post if necessary.",
              "I give permission for Hanson Recruitment to share any references obtained by the agency with a school/ setting for the purposes of employment."


              ].map((point, index) => (
              <li key={index}>
                {index === 4|| index === 8|| index === 13 || index === 14 || index === 14? <strong>{point}</strong> : point}
                
                </li>
              ))}
              </ul>
              </Typography>


            <FormControlLabel
              control={
                <Checkbox
                  name="CriminalConsentGiven"
                  checked={formValues.CriminalConsentGiven}
                  onChange={handleInputChange}
                />
              }
              label="By checking this box I allow Hanson Recruitment to process my application using the information that I have provided in accordance with the requirements of the Data
              Protection Policy and in keeping with the Data Protection Act 1998.The information
              provided will be used by Hanson Recruitment recruitment Ltd to inform you by letter,
              phone or email of relevant information and other services which may interest you. No
              information wil be passed to any third parties"
            />
            {formErrors.CriminalConsentGiven && <Typography color="error">{formErrors.CriminalConsentGiven}</Typography>}

            <TextField
              name="date"
              label="Date"
              type="date"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              onChange={handleInputChange}
              value={formValues.date}
              error={!!formErrors.date}
              helperText={formErrors.date}
            />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button variant="contained" onClick={onPrev}>Previous</Button>
              <Button variant="contained" color="primary" type="submit">Next</Button>
            </Box>
          </form>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
        <Box
         sx={{
          position: 'relative',
          height: '100%',
          '&::before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            borderRadius: 1,
            zIndex: 1,
          },
          '&::after': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${bannerImage})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            opacity: 1,
            borderRadius: 1,
            zIndex: 0,
          },
        }}
        />
      </Grid>
    </Grid>
  );
};

export default DisclosureOfCriminalRecords;
