function getData() {
  console.log("inFunction");
  const doctors = document.getElementById("doc");
  const selectedOpt = doctors.options[doctors.selectedIndex].value;
  const url = `/getStatPage?doctor=${selectedOpt}`;
  fetch(url)
    .then((response) => response.json())
    .then((dateArr) => {
      console.log(dateArr);
      const dateCounts = {};
      dateArr.forEach((item) => {
        const patientDate = new Date(item.patientdate)
          .toISOString()
          .split("T")[0]; // Extracting date portion only
        if (dateCounts[patientDate]) {
          dateCounts[patientDate]++;
        } else {
          dateCounts[patientDate] = 1;
        }
      });
      console.log(dateCounts);
    });
}
