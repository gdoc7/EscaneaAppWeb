import axios from "axios";

export const invoiceScan = async ({ pdfBase64, myNIF, myCompany  }) => {
  try {
    const { data } = await axios.post(
      "http://ec2-44-202-14-24.compute-1.amazonaws.com:8081/api/InvoiceScan/dataExtractFromPDFObject",
      {
        content_id: 0,
        myInfo: {
          myNIF: myNIF,
          myCompany: myCompany,
          myAddress: "",
        },
        content: pdfBase64,
      }
    );
    return data;
  } catch (error) {
    console.log("Error", error);
  }
};
