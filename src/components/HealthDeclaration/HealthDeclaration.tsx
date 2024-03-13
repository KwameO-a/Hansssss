import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Checkbox, Box, useMediaQuery, Grid, Paper } from '@mui/material';
import logoImage from '../../assets/Hanson RGB 60PX.jpg';
import bannerImage from '../../assets/cm.jpg';

interface HealthDeclarationFormProps {
  onNext: () => void;
  onPrev: () => void;
}

const HealthDeclarationForm: React.FC<HealthDeclarationFormProps> = ({ onNext, onPrev }) => {
  // Correct initialization with parsing for boolean values
  const [formValues, setFormValues] = useState({
    hasHealthIssue: localStorage.getItem('hasHealthIssue') || 'No',
    healthInfo: localStorage.getItem('healthInfo') || '',
    supportNeeds: localStorage.getItem('supportNeeds') || '',
    doctorLetterProvided: localStorage.getItem('doctorLetterProvided') === 'true', // Correctly parse boolean
    HealthConsentGiven: localStorage.getItem('HealthConsentGiven') === 'true', // Correctly parse boolean
    HealthDeclarationDate: localStorage.getItem('HealthDeclarationDate') || '',
  });

  const isNonMobileScreens = useMediaQuery("(min-width:600px)");

  useEffect(() => {
    // Synchronize formValues with localStorage
    Object.entries(formValues).forEach(([key, value]) => {
      localStorage.setItem(key, typeof value === 'boolean' ? String(value) : value);
    });
  }, [formValues]);


  useEffect(() => {
    if (formValues.hasHealthIssue ==="No") {
      localStorage.setItem("healthInfo", "");
      localStorage.setItem("supportNeeds", "");
      localStorage.setItem("doctorLetterProvided", "false");


      formValues.healthInfo = " ";
      formValues.supportNeeds = " ";
      formValues.doctorLetterProvided = false;
    }
  }, [formValues]);



  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onNext(); // Navigate to the next step
  };

  const isNextDisabled = () => {
    if (formValues.hasHealthIssue === 'Yes' && (!formValues.healthInfo || !formValues.supportNeeds)) {
      return true;
    }
    return !formValues.HealthConsentGiven || !formValues.HealthDeclarationDate;
  };

  return (
    <Grid container spacing={2} sx={{ height: '100vh', padding: 4 }}>
      <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Paper elevation={3} sx={{ padding: 4, margin: 2 }}>
          <Box sx={{ textAlign: 'center', marginBottom: 2 }}>
            <img src={logoImage} alt="Company Logo" style={{ height: '50px' }} />
            <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold' }} margin={1.5}>
            Health Declaration 
            </Typography>
            
            <Typography textAlign={'left'} margin={'1.0em'} >
            The Education (Health Standards) (England) Regulations 2003 and The Education (Health Standards) (Wales) Regulations 2004 require employers and employment businesses to satisfy themselves that individuals are medically fit and have the appropriate level of physical and mental fitness to be appointed to a post involving regular contact with children. Under Section 60 of the Equality Act, an individual can be asked relevant questions about disability and health in order to establish whether they have the physical and mental capacity for the specific role. This question does not form part of our recruitment decision, but we may ask you for further information before confirming your registration and deploying you to work. Any proven falsification of this declaration may result in the withdrawal of an offer of a placement if it has not yet commenced and removal from Hanson Recruitment’s register if the placement has already commenced</Typography>
          </Box>
          <Box
      width={isNonMobileScreens ? "50%" : "93%"}
      p="1rem"
      m="1rem auto"
      borderRadius="1.5rem"
    ></Box>

          <form onSubmit={handleSubmit}>
            {/* Health Declaration Fields */}
            <FormControl component="fieldset" margin="normal">
              <FormLabel component="legend">Do you have any health issues or disabilities relevant to the role you seek?</FormLabel>
              <RadioGroup
                row
                aria-label="hasHealthIssue"
                name="hasHealthIssue"
                value={formValues.hasHealthIssue}
                onChange={handleInputChange}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>

            {formValues.hasHealthIssue === 'Yes' && (
              <>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  margin="normal"
                  name="healthInfo"
                  label="Health Information"
                  value={formValues.healthInfo}
                  onChange={handleInputChange}
                />
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  margin="normal"
                  name="supportNeeds"
                  label="Support Needs"
                  value={formValues.supportNeeds}
                  onChange={handleInputChange}
                />
                <FormControlLabel
                  control={<Checkbox checked={formValues.doctorLetterProvided} onChange={handleInputChange} name="doctorLetterProvided" />}
                  label="I will provide a doctor's letter"
                />
              </>
            )}

            <FormControlLabel
              control={<Checkbox checked={formValues.HealthConsentGiven} onChange={handleInputChange} name="HealthConsentGiven" />}
              label="I consent to the processing of my health information"
            />
            <TextField
              fullWidth
              type="date"
              margin="normal"
              name="HealthDeclarationDate"
              label="Date"
              value={formValues.HealthDeclarationDate}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
            />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button variant="contained" onClick={onPrev}>Previous</Button>
              <Button variant="contained" color="primary" type="submit" disabled={isNextDisabled()}>Next</Button>
            </Box>
          </form>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
        <Box
           sx={{
            position: 'relative',
      height: '100%',
      borderRadius: 1,
      '&::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // This creates the dark overlay
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
        opacity: 1, // You can adjust this as needed
        borderRadius: 1,
        zIndex: 0,
        },
            
            
           
            
          }}
        />
      </Grid>
    </Grid>
  );
};

export default HealthDeclarationForm;
