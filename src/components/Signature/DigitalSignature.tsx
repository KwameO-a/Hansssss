import React, { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import axios from "axios";

// Adjust path as necessary for your assets
import logoImage from "../../assets/Hanson RGB 60PX.jpg";
import bannerImage from "../../assets/cm.jpg";

interface DigitalSignatureProps {
  onSignatureSave: (signature: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

const DigitalSignature: React.FC<DigitalSignatureProps> = ({
  onSignatureSave,
  onNext,
  onPrev,
}) => {
  const sigPad = useRef<SignatureCanvas>(null);
  const isNonMobileScreens = useMediaQuery("(min-width: 600px)");

  const clear = () => sigPad.current?.clear();

  const save = () => {
    if (sigPad.current) {
      const signatureImage = sigPad.current
        .getTrimmedCanvas()
        .toDataURL("image/png");

      // // Prepare the data to send, including the signature
      // const dataToSend1 = {
      //   signature: signatureImage,
      //   // Add any other data you need to send
      //   // name: 'John Doe',
      //   // date: new Date().toISOString(),
      // };
      const { CriminalConsentGiven, criminalRecordDetails, hasCriminalRecord, date } =
        JSON.parse(localStorage.getItem("formValues") || "");

      const { excludedCounties, excludedProvisions, emailMarketing,mailMarketing,smsMarketing, consentGiven, GDPRdate } =
        JSON.parse(localStorage.getItem("GDPRFormData") || "");
        
      const { question1, question1_detail, question2,question2_detail} =
        JSON.parse(localStorage.getItem("questionnaireAnswers") || "");
        

      
      // console.log(localStorage.getItem("date" ));


      const dataToSend = {
        title: localStorage.getItem("title") || "",
        firstName: localStorage.getItem("firstName") || "",
        middleName: localStorage.getItem("middleName") || "",
        lastName: localStorage.getItem("lastName") || "",
        knownAs: localStorage.getItem("knownAs") || "",
        previousNames: localStorage.getItem("previousNames") || "",
        address: localStorage.getItem("address") || "",
        postCode: localStorage.getItem("postcode") || "",
        phoneNumber: localStorage.getItem("phoneNumber") || "",
        email: localStorage.getItem("yourEmail") || "",
        dateOfBirth: localStorage.getItem("dateOfBirth") || "",
        townofBirth: localStorage.getItem("townOfBirth") || "",
        nationality: localStorage.getItem("selectedNationality") || "",
        nationalInsuaranceNumber:localStorage.getItem("nationalInsurance") || "",
        gender: localStorage.getItem("gender") || "",
        needNewDBS: localStorage.getItem("needNewDBS") || "",
        nextofkinName: localStorage.getItem("nextOfKinName") || "",
        relationship: localStorage.getItem("relationship") || "",
        nextofkinaddress: localStorage.getItem("nextofkinaddress") || "",
        nextofkincontact: localStorage.getItem("contactNumber") || "",
        qualification: localStorage.getItem("highestQualification") || "",
        positionOfApplicant: "Teaching Assistant",
        overseasCountries: (String(localStorage.getItem("required"))==="true"?( "Required - "+ (localStorage.getItem("overseasCountries") || "")): "Not Required" )  ,
        forename: localStorage.getItem("forename") || "",
        surname: localStorage.getItem("surname"),
        
        tel: localStorage.getItem("phoneNumber") || "",
        Referencetitle: localStorage.getItem("Referencetitle") || "",
        position: localStorage.getItem("position"),
        company: localStorage.getItem("company"),
        datesOfemployment: localStorage.getItem("startDate") || "",
        datesOfemploymentEnd: localStorage.getItem("endDate") || "",
        ReferenceEmail: localStorage.getItem("ReferenceEmail") || "",
        
        criminalRecordDetails: criminalRecordDetails,
        criminalDetails: hasCriminalRecord,
        CriminalConsentGiven:CriminalConsentGiven
         ?" I consent to the processing of my application with the provided information.":"",
        CriminalDate:date, 
        // criminalConsentDate: localStorage.getItem("date" )|| "" , 
        
        hasHealthIssue:localStorage.getItem('hasHealthIssue')||"" ,
        
        //   ""
        // ) || "",
        healthInfo: localStorage.getItem("healthInfo") || "",
        supportNeeds:localStorage.getItem('supportNeeds')||"" ,
        doctorLetterProvided:String(localStorage.getItem("doctorLetterProvided"))==="true"?" I will provide a doctor's letter.":"",
        HealthConsentGiven:String(localStorage.getItem("HealthConsentGiven"))==="true"?" I consent to the processing of my health information.":"",
        HealthDeclarationDate:localStorage.getItem("HealthDeclarationDate") || "",

        DisclosureConsentGiven:String(localStorage.getItem("DisclosureConsentGiven"))==="true"?" I consent to any health information relevant to my role being disclosed to hirers in order for them to uphold their legal obligations regarding health & Safety and make reasonable adjustments to the workplace where appropriate..":"",
        DisclosureConsentDate:localStorage.getItem("DisclosureConsentDate") || "",

        excludedCounties:excludedCounties,
        excludedProvisions:excludedProvisions,
        emailMarketing:emailMarketing
        ?" No I do not want to be sent Email marketing information":"Yes! I want to be sent Email marketing information",
        mailMarketing:mailMarketing
        ?" No I do not want to be sent Mail marketing information":"Yes! I want to be sent Mail marketing information",
        smsMarketing:smsMarketing
        ?" No I do not want to be sent SMS marketing information":"Yes! I want to be sent SMS marketing information",
        consentGiven:consentGiven
        ?" I consent to confirm that I have my consent to the information as outlined above.":"",
        GDPRdate:GDPRdate,

        question1:question1,
        question1_detail:question1_detail || "",
        question2:question2,
        question2_detail:question2_detail,

        
        // dbs: localStorage.getItem("HealthDeclarationDate") || "",
        country: "",
        signature: signatureImage,
      };

      // Use Axios to send the data to your API endpoint
      axios
        .post("http://192.168.101.161:3002/submit-form", dataToSend)
        .then((response) => {
          console.log("Data submitted successfully", response.data);
          onSignatureSave(signatureImage);
          localStorage.clear();
          onNext();
        })
        .catch((error) => {
          if (error.response) {
            console.error(
              "Server responded with:",
              error.response.status,
              error.response.data
            );
          } else if (error.request) {
            console.error("The request was made but no response was received");
          } else {
            console.error("Error setting up the request:", error.message);
          }
        });
    }
  };

  return (
    <Grid container spacing={2} sx={{ height: "100vh", padding: 4 }}>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Paper elevation={3} sx={{ padding: 4, margin: 2 }}>
          <Box sx={{ textAlign: "center", marginBottom: 2 }}>
            <img
              src={logoImage}
              alt="Company Logo"
              style={{ height: "50px" }}
            />
            <Typography
              variant="h5"
              component="h1"
              fontSize="32px"
              sx={{ fontWeight: "bold" }}
            >
              Confirmation of Declaration
            </Typography>
          </Box>
          <Box
            width={isNonMobileScreens ? "50%" : "93%"}
            p="1rem"
            m="1rem auto"
            borderRadius="1.5rem"
          ></Box>
          <Typography>{/* Declaration text here */}</Typography>
          <div>
            <SignatureCanvas
              penColor="black"
              canvasProps={{ width: 500, height: 200, className: "sigCanvas" }}
              ref={sigPad}
            />
            <Button onClick={clear}>Clear</Button>
            <Button onClick={save}>Save Signature</Button>
            <Button onClick={onPrev}>Previous</Button>
          </div>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} sx={{ display: { xs: "none", md: "block" } }}>
        <Box
          sx={{
            position: "relative",
            height: "100%",
            borderRadius: 1,
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              borderRadius: 1,
              zIndex: 1,
            },
            "&::after": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${bannerImage})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
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

export default DigitalSignature;