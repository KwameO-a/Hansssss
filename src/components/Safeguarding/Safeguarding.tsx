import React, { useState, useEffect } from 'react';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Button,
  Box,
  useMediaQuery,
  Grid,
  Paper
} from '@mui/material';
import logoImage from '../../assets/Hanson RGB 60PX.jpg'; // Adjust path as necessary
import bannerImage from '../../assets/cm.jpg'; // Adjust path as necessary

// Assumed logoImage and bannerImage imports

interface Answers {
  [key: string]: string | undefined;
}

interface QuestionnaireFormProps {
  onNext: () => void;
  onPrev: () => void;
}

const QuestionnaireForm: React.FC<QuestionnaireFormProps> = ({ onNext, onPrev }) => {
  const [answers, setAnswers] = useState<Answers>({});
  const isNonMobileScreens = useMediaQuery('(min-width:600px)');

  useEffect(() => {
    const savedAnswers = localStorage.getItem('questionnaireAnswers');
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
    }
  }, []);

  useEffect(() => {
    if (answers.questionNumber ==="no" || answers.questionNumber ==="not_applicable") {
      setAnswers((prev) => ({ ...prev, question1_detail : "" }));
    localStorage.setItem("questionnaireAnswers", JSON.stringify({ ...answers, question1_detail : ""  }))
      
    }
  }, [answers]);


  const handleRadioChange = (questionNumber: string, value: string) => {
    const updatedAnswers = { ...answers, [questionNumber]: value };
    setAnswers(updatedAnswers);
    localStorage.setItem('questionnaireAnswers', JSON.stringify(updatedAnswers));
  };

  const handleDetailChange = (questionNumber: string, detail: string) => {
    const updatedAnswers = { ...answers, [${questionNumber}_detail]: detail };
    setAnswers(updatedAnswers);
    localStorage.setItem('questionnaireAnswers', JSON.stringify(updatedAnswers));
  };

  const renderConditionalTextField = (questionNumber: string) => {
    if (answers[questionNumber] === 'yes') {
      return (
        <TextField
          fullWidth
          label="If yes, please provide details here"
          margin="normal"
          variant="outlined"
          value={answers[${questionNumber}_detail] || ''}
          onChange={(e) => handleDetailChange(questionNumber, e.target.value)}
        />
      );
    }
    return null;
  };

  const isNextDisabled = (): boolean => {
    // Implement validation logic as needed
    return false; // Placeholder logic
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onNext();
  };

  function handleInputChange(arg0: string, value: string): void {
    throw new Error('Function not implemented.');
  }

  return (
    <Grid container spacing={2} sx={{ height: '100vh', padding: 4 }}>
      <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Paper elevation={3} sx={{ padding: 4, margin: 2 }}>
        <Box sx={{ textAlign: 'center', marginBottom: 2 }}>
          <img src={logoImage} alt="Company Logo" style={{ height: '50px' }} />
          <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold' }}>
            Apply for this role
          </Typography>
          <Typography variant="subtitle1">
            UX Designer • Full time • Remote
          </Typography>
        </Box>
        <Box
    width={isNonMobileScreens ? "50%" : "93%"}
    p="1rem"
    m="1rem auto"
    borderRadius="1.5rem"
  ></Box>
      {/* Form structure */}
      <form onSubmit={handleSubmit}>
        {/* Iterate through questions or manually list them */}
        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">1. Do you have any convictions or adult cautions that are unspent?</FormLabel>
          <RadioGroup
            row
            name="question1"
            value={answers['question1'] || ''}
            onChange={(e) => handleRadioChange('question1', e.target.value)}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
            {/* <FormControlLabel value="not_applicable" control={<Radio />} label="Not applicable" /> */}
          </RadioGroup>
          
          {renderConditionalTextField('question1')}
        </FormControl>
        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">2. Do you have any other cautions or convictions that would not be filtered?</FormLabel>
          <RadioGroup
            row
            name="question2"
            value={answers['question2'] || ''}
            onChange={(e) => handleRadioChange('question2', e.target.value)}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
            {/* <FormControlLabel value="not_applicable" control={<Radio />} label="Not applicable" /> */}
          </RadioGroup>
          
          {renderConditionalTextField('question2')}
        </FormControl>
        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">3. Are you included on the DBS children’s barred list?  </FormLabel>
          <RadioGroup
            row
            name="question3"
            value={answers['question3'] || ''}
            onChange={(e) => handleRadioChange('question3', e.target.value)}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
            {/* <FormControlLabel value="not_applicable" control={<Radio />} label="Not applicable" /> */}
          </RadioGroup>
          
          {renderConditionalTextField('question3')}
        </FormControl>
        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">4. <strong>(Teaching posts only)</strong> Are you, or have you ever been, prohibited from teaching by the TRA or sanctioned by the GTCE?  </FormLabel>
          <RadioGroup
            row
            name="question4"
            value={answers['question4'] || ''}
            onChange={(e) => handleRadioChange('question4', e.target.value)}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
            <FormControlLabel value="not_applicable" control={<Radio />} label="Not applicable" />
          </RadioGroup>
          
          {renderConditionalTextField('question4')}
        </FormControl>
        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">5. Have you been prohibited from management of an independent school (s128)? </FormLabel>
          <RadioGroup
            row
            name="question5"
            value={answers['question5'] || ''}
            onChange={(e) => handleRadioChange('question5', e.target.value)}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
            <FormControlLabel value="not_applicable" control={<Radio />} label="Not applicable" />
          </RadioGroup>
          
          {renderConditionalTextField('question5')}
        </FormControl>
        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">6.Have you lived or worked outside the UK for more than 3 months in the last 5 years?</FormLabel>
          <RadioGroup
            row
            name="question6"
            value={answers['question6'] || ''}
            onChange={(e) => handleRadioChange('question6', e.target.value)}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
            {/* <FormControlLabel value="not_applicable" control={<Radio />} label="Not applicable" /> */}
          </RadioGroup>
          
          {renderConditionalTextField('question6')}
        </FormControl>
        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">7. Are you subject to any sanctions relating to work with children in any country outside the UK? ?</FormLabel>
          <RadioGroup
            row
            name="question7"
            value={answers['question7'] || ''}
            onChange={(e) => handleRadioChange('question7', e.target.value)}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
            {/* <FormControlLabel value="not_applicable" control={<Radio />} label="Not applicable" /> */}
          </RadioGroup>
          
          {renderConditionalTextField('question7')}
        </FormControl>
        <FormControl component="fieldset" margin="normal" style={{ textAlign: 'justify' }}>
          <FormLabel component="legend">8.  The Disqualification under the Childcare Act 2006 Regulations (2018) state that anyone employed to care for children in early years (children under the age of 5) or later years (wrap-around care for children under the age of 8) is disqualified from that work if they meet certain criteria. These criteria include (this is not an exhaustive list): 
            Certain serious criminal offences 
            Court orders relating to the care of your own child
            Being prohibited from private fostering.
            <div><strong>Do you have any reason to believe you are disqualified from working in childcare?</strong></div>
            </FormLabel>
          <RadioGroup
            row
            name="question8"
            value={answers['question8'] || ''}
            onChange={(e) => handleRadioChange('question8', e.target.value)}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
            {/* <FormControlLabel value="not_applicable" control={<Radio />} label="Not applicable" /> */}
          </RadioGroup>
          
          {renderConditionalTextField('question8')}
        </FormControl>
        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">9. Are you aware of any current police investigation in the United Kingdom or any other country following allegations made against you by the police? </FormLabel>
          <RadioGroup
            row
            name="question9"
            value={answers['question9'] || ''}
            onChange={(e) => handleRadioChange('question9', e.target.value)}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
            {/* <FormControlLabel value="not_applicable" control={<Radio />} label="Not applicable" /> */}
          </RadioGroup>
          
          {renderConditionalTextField('question9')}
        </FormControl>
        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">10. Are you aware of any current NHS Counter Fraud and Security Management Service Investigation following allegations made against you? </FormLabel>
          <RadioGroup
            row
            name="question10"
            value={answers['question10'] || ''}
            onChange={(e) => handleRadioChange('question10', e.target.value)}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
            {/* <FormControlLabel value="not_applicable" control={<Radio />} label="Not applicable" /> */}
          </RadioGroup>
          
          {renderConditionalTextField('question10')}
        </FormControl>
        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">11. Have you ever been investigated by the Police, CFSMS or any other Investigatory Body resulting in a caution, conviction or dismissal from your employment?
          (Investigatory bodies include Local Authorities, Customs and Exercise, Immigration, Passport Agency, Inland Revenue, Department of Trade and Industry, Department of work and Pensions, DBS, Security Agencies, Financial Service Authority, Banks and Building Societies, General, Life Insurance Companies- This list is not exhaustive, and you must declare any investigation conducted by an Investigatory Body) 
          </FormLabel>
          <RadioGroup
            row
            name="question11"
            value={answers['question11'] || ''}
            onChange={(e) => handleRadioChange('question11', e.target.value)}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
            {/* <FormControlLabel value="not_applicable" control={<Radio />} label="Not applicable" /> */}
          </RadioGroup>
          
          {renderConditionalTextField('question11')}
        </FormControl>
        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">12. Have you ever been dismissed by reason of misconduct from any employment, office or other position previously held by you?</FormLabel>
          <RadioGroup
            row
            name="question12"
            value={answers['question12'] || ''}
            onChange={(e) => handleRadioChange('question12', e.target.value)}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
            {/* <FormControlLabel value="not_applicable" control={<Radio />} label="Not applicable" /> */}
          </RadioGroup>
          
          {renderConditionalTextField('question12')}
        </FormControl>
        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">13. Have you ever been disqualified from the practice of a profession or required to practice subject to specified limitations following fitness to practice proceedings by a regulatory or licencing body in the United Kingdom or any other country?</FormLabel>
          <RadioGroup
            row
            name="question13"
            value={answers['question13'] || ''}
            onChange={(e) => handleRadioChange('question13', e.target.value)}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
            {/* <FormControlLabel value="not_applicable" control={<Radio />} label="Not applicable" /> */}
          </RadioGroup>
          
          {renderConditionalTextField('question13')}
        </FormControl>
        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">14. Are you currently the subject of any Investigation or fitness to practice proceedings by any licencing or regulatory body in the United Kingdom or in any other country?  </FormLabel>
          <RadioGroup
            row
            name="question14"
            value={answers['question14'] || ''}
            onChange={(e) => handleRadioChange('question14', e.target.value)}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
            {/* <FormControlLabel value="not_applicable" control={<Radio />} label="Not applicable" /> */}
          </RadioGroup>
          
          {renderConditionalTextField('question14')}
        </FormControl>
        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">15. Are you currently subject to any other prohibition, limitation, or restriction that means that means we are unable to consider you for the position which you are applying? </FormLabel>
          <RadioGroup
            row
            name="question15"
            value={answers['question15'] || ''}
            onChange={(e) => handleRadioChange('question15', e.target.value)}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
            {/* <FormControlLabel value="not_applicable" control={<Radio />} label="Not applicable" /> */}
          </RadioGroup>
          
          {renderConditionalTextField('question15')}
        </FormControl>
        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">16. Have you ever been disqualified from a practise on grounds relating to the care of children (Including where an order is made in respect of a child under the person’s care) in the UK or in any other country? </FormLabel>
          <RadioGroup
            row
            name="question16"
            value={answers['question16'] || ''}
            onChange={(e) => handleRadioChange('question16', e.target.value)}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
            {/* <FormControlLabel value="not_applicable" control={<Radio />} label="Not applicable" /> */}
          </RadioGroup>
          
          {renderConditionalTextField('question16')}
        </FormControl>
        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">17. Are or have your children ever been, the subject of a child protection order</FormLabel>
          <RadioGroup
            row
            name="question17"
            value={answers['question17'] || ''}
            onChange={(e) => handleRadioChange('question17', e.target.value)}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
            {/* <FormControlLabel value="not_applicable" control={<Radio />} label="Not applicable" /> */}
          </RadioGroup>
          
          {renderConditionalTextField('question17')}
        </FormControl>
        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">18. Has your children been taken into care? </FormLabel>
          <RadioGroup
            row
            name="question18"
            value={answers['question18'] || ''}
            onChange={(e) => handleRadioChange('question18', e.target.value)}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
            {/* <FormControlLabel value="not_applicable" control={<Radio />} label="Not applicable" /> */}
          </RadioGroup>
          
          {renderConditionalTextField('question18')}
        </FormControl>
        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">19. Please read the Disqualification under the Childcare Act 2006 for a full list of relevant offences and ordered for disqualification under the Childcare Act. Are you disqualified on any of the grounds set up in the DfE guidance (not already mentioned in the questions above) 
</FormLabel>
          <RadioGroup
            row
            name="question19"
            value={answers['question19'] || ''}
            onChange={(e) => handleRadioChange('question19', e.target.value)}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
            {/* <FormControlLabel value="not_applicable" control={<Radio />} label="Not applicable" /> */}
          </RadioGroup>
          
          {renderConditionalTextField('question19')}
        </FormControl>
        <FormControl component="fieldset" margin="normal">
        <FormLabel component="legend">20. If you have answered “yes” to any of the questions above, please use this space to provide details. Please clearly indicate the number or numbers of the question that you are answering</FormLabel>
        
        <TextField
          fullWidth
          name="question20"
          value={answers['question20'] || ''}
          onChange={(e) => handleInputChange('question20', e.target.value)}
          multiline
          rows={4}
          variant="outlined"
          margin="normal"
        />

        {renderConditionalTextField('question20')}
      </FormControl>

        
        {/* Repeat for other questions */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button variant="contained" onClick={onPrev}>
              Previous
            </Button>
            <Button variant="contained" color="primary" type="submit" disabled={isNextDisabled()}>
              Next
            </Button>
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
              backgroundImage: url(${bannerImage}),
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

export default QuestionnaireForm;