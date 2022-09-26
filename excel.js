let selectedFile;
// console.log(window.XLSX);
document.getElementById("input").addEventListener("change", (event) => {
  selectedFile = event.target.files[0];
});

let data = [
  {
    name: "jayanth",
    data: "scd",
    abc: "sdef",
  },
];

let arr = [];
document.getElementById("button").addEventListener("click", () => {
  XLSX.utils.json_to_sheet(data, "out.xlsx");
  if (selectedFile) {
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedFile);
    fileReader.onload = (event) => {
      let data = event.target.result;
      //   console.log(data);
      let workbook = XLSX.read(data, { type: "binary" });
      //   console.log(workbook);
      workbook.SheetNames.forEach((sheet) => {
        let rowObject = XLSX.utils.sheet_to_row_object_array(
          workbook.Sheets[sheet]
        );
        // console.log(rowObject);
        arr.push({ [sheet]: rowObject });
        document.getElementById("jsondata").innerHTML = JSON.stringify(
          arr,
          undefined,
          4
        );
      });
    };
  }
});
