import { useState } from "react";
import "./App.css";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import ButtonDelete from "./components/ButtonDelete";
import { useRef } from "react";
import ButtonConfirm from "./components/ButtonConfirm";
import { useMutation } from "@tanstack/react-query";
import { invoiceScan } from "./services/invoiceServices";
import { Spinner } from "./components/Spinner";

function App() {
  const [pdfBase64, setpdfBase64] = useState(null);
  const [pdfError, setPdfError] = useState("");
  const [razonSocial, setrazonSocial] = useState("");
  const [nif, setnif] = useState("");

  const { mutate, data, isLoading, reset } = useMutation(
    ["invoice-scan"],
    invoiceScan
  );

  const inputFile = useRef(null);
  const allowedFiles = ["application/pdf"];

  const handleFile = (e) => {
    let selectedFile = e.target.files[0];
    // console.log(selectedFile.type);
    if (selectedFile) {
      if (selectedFile && allowedFiles.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          setPdfError("");
          setpdfBase64(e.target.result);
        };
      } else {
        setPdfError("Archivo no válido, favor cargar archivo PDF");
        setpdfBase64("");
      }
    } else {
      console.log("please select a PDF");
    }
  };

  const handleClickDelete = () => {
    inputFile.current.value = null;
    setpdfBase64(null);
    setPdfError("");
    reset();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({
      pdfBase64: pdfBase64.substr("data:application/pdf;base64,".length),
      myNIF: nif,
      myCompany: razonSocial,
    });
  };

  return (
    <div className="mx-auto  py-8 sm:px-6 lg:px-8  flex justify-center items-center h-screen">
      <div className="md:grid md:grid-cols-4 md:gap-6">
        <div className="mt-5 md:col-span-2 md:mt-0">
          <div className="overflow-hidden shadow-lg sm:rounded-md">
            <form onSubmit={handleSubmit}>
              <div className="bg-white px-4 py-5 sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="razon-social"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Razon social
                    </label>
                    <input
                      type="text"
                      name="razon-social"
                      id="razon-social"
                      value={razonSocial}
                      onChange={(e) => {
                        setrazonSocial(e.target.value);
                      }}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="nif"
                      className="block text-sm font-medium text-gray-700"
                    >
                      NIF
                    </label>
                    <input
                      type="text"
                      name="nif"
                      id="nif"
                      value={nif}
                      onChange={(e) => {
                        setnif(e.target.value);
                      }}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="invoice"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Cargar factura
                    </label>
                    <input
                      className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                      id="invoice"
                      type="file"
                      ref={inputFile}
                      onChange={handleFile}
                    />
                  </div>
                </div>
                {pdfError && <span className="text-red-400 ">{pdfError}</span>}
              </div>
              <div className="bg-white px-4 py-5 sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="razon-social"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Previzualizacion
                    </label>
                  </div>
                  <div className="bg-gray-400 col-span-6 sm:col-span-6  justify-center flex rounded-md items-center h-[25rem]">
                    {pdfBase64 && (
                      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.0.279/build/pdf.worker.min.js">
                        <Viewer fileUrl={pdfBase64}></Viewer>
                      </Worker>
                    )}
                    <div className="text-white">
                      {!pdfBase64 && <>No ha seleccionado ningún archivo</>}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-3 pt-3">
                  <ButtonDelete onClick={handleClickDelete} />
                  <ButtonConfirm />
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="md:col-span-2">
          <div className="px-4 sm:px-0 flex items-center justify-center bg-gray-400 h-full w-full sm:rounded-md">
            {isLoading ? (
              <Spinner />
            ) : data ? (
              <div className=" text-white">
                <pre>{JSON.stringify(data, null, 5)}</pre>{" "}
              </div>
            ) : (
              <div> No hay data disponible</div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;