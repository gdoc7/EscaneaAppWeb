import React from "react";

const Invoice = ({ data, show }) => {
  const options = { year: "numeric", month: "long", day: "numeric" };

  const changeformatDate = (date) => {
    return new Date(date).toLocaleString("en-US", options);
  };

  return (
    <>
      {show ? (
        <div className="mx-auto p-16 bg-white" style={{ "max-width": "800px" }}>
          <div className="flex items-center justify-between mb-8 px-3">
            <div>
              <span className="text-2xl font-bold"> Factura # {data.nif}</span>
              <br />
              <span className="text-sm text-gray-500">
                Fecha de cargo: {changeformatDate(data.dueDate)}
              </span>
              <br />
              <span className="text-sm text-gray-500">
                Fecha de emisión: {changeformatDate(data.issueDate)}
              </span>
            </div>
            {/* <div className="text-right">
          <img src="" />
        </div> */}
          </div>

          <div className="flex-1 mb-8 px-3">
            <div className="text-right">
              {data.empresa}
              <br />
              {data.address}
              <br />
            </div>
          </div>

          <div className="border border-t-2 border-black mb-8 px-3"></div>

          <div className="flex justify-between mb-4  px-3 py-2">
            <div>Base imponible</div>
            <div className="text-right font-medium">
              {data.amounts["taxableAmount"] + " " + data.currencySign}
            </div>
          </div>
          <div className="flex justify-between mb-4 px-3 py-2">
            <div>IVA ({data.taxPercent}%)</div>
            <div className="text-right font-medium">
              {data.amounts["tax"] + " " + data.currencySign}{" "}
            </div>
          </div>

          <div className="border border-t-2 border-black mb-8 px-3"></div>

          <div className="flex justify-between items-center mb-2 px-3">
            <div className="text-2xl leading-none font-black">
              <span className="">Total</span>:
            </div>
            <div className="text-2xl text-right font-black">
              {data.amounts["total"] + " " + data.currencySign}
            </div>
          </div>
        </div>
      ) : (
        <div className=" text-white">
          <pre>{JSON.stringify(data, null, 5)}</pre>{" "}
        </div>
      )}
    </>
  );
};

export default Invoice;
