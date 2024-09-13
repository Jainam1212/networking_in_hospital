// document.addEventListener("DOMContentLoaded", function () {
//   const addInputBtn = document.getElementById("addInput");

//   let inputCount = 1;
// //   let checkboxCount = 0;

//   addInputBtn.addEventListener("click", function () {
//     const parentBox = document.getElementById("outerBox");
//     const container = document.createElement( "div" );
//     container.className = "prescription";
//     const box1 = document.createElement("div");
//     container.className = "timings";
//     const box2 = document.createElement("div");
//     container.className = "checkboxes";
//     const box3a = document.createElement("div");
//     container.className = "boxes";
//     const box3b = document.createElement("div");
//     container.className = "boxes";
//     const box3c = document.createElement("div");
//     container.className = "boxes";
//     const box3d = document.createElement("div");
//     container.className = "boxes";
      
      
//     const selectOpt = document.createElement('select');
//     selectOpt.name = `medicines${inputCount}`;

//     const opt1 = document.createElement('option');
//     opt1.value=""
//     opt1.innerText = "--Select a medicine";
//     const opt2 = document.createElement('option');
//     opt2.value = "Dolo";
//     opt2.innerText = "Dolo";
//     const opt3 = document.createElement('option');
//     opt3.value = "Amlodiphine";
//     opt3.innerText = "Amlodiphine";
//     const opt4 = document.createElement('option');
//     opt4.value = "Omeprazole";
//     opt4.innerText = "Omeprazole";
//     const opt5 = document.createElement('option');
//     opt5.value = "Cyclobenzaprine";
//     opt5.innerText = "Cyclobenzaprine";
//     const opt6 = document.createElement('option');
//     opt6.value = "Ellegra";
//     opt6.innerText = "Ellegra";
//     const opt7 = document.createElement('option');
//     opt7.value = "Decold";
//     opt7.innerText = "Decold";

//     selectOpt.append(opt1);
//     selectOpt.append(opt2);
//     selectOpt.append(opt3);
//     selectOpt.append(opt4);
//     selectOpt.append(opt5);
//     selectOpt.append(opt6);
//     selectOpt.append(opt7);

//     container.appendChild(selectOpt);

//     const para = document.createElement('p');
//     para.innerText = "Select time slots to take medicine";
//     box1.appendChild(para);

//     const l1 = document.createElement('label');
//     const i1 = document.createElement('input');
//     i1.type = 'checkbox';
//     i1.name = `additionalCheckbox${inputCount}`;
//     i1.id = 'morning';
//     i1.value = 'customValue';
//     l1.htmlFor = 'morning';
//     l1.textContent = 'Morning';
//     const hiddenInput1 = document.createElement("input");
//     hiddenInput1.type = "hidden";
//     hiddenInput1.name = `additionalCheckboxValue${inputCount}`;
//     hiddenInput1.value = `morning`;

//     const l2 = document.createElement("label");
//     const i2 = document.createElement("input");
//     i2.type = "checkbox";
//     i2.name = `additionalCheckbox${inputCount}`;
//     i2.id = "afternoon";
//     i2.value = "customValue";
//     l2.htmlFor = "afternoon";
//     l2.textContent = "Afternoon";
//     const hiddenInput2 = document.createElement("input");
//     hiddenInput2.type = "hidden";
//     hiddenInput2.name = `additionalCheckboxValue${inputCount}`;
//     hiddenInput2.value = `afternoon`;

//     const l3 = document.createElement("label");
//     const i3 = document.createElement("input");
//     i3.type = "checkbox";
//     i3.name = `additionalCheckbox${inputCount}`;
//     i3.id = "evening";
//     i3.value = "customValue";
//     l3.htmlFor = "evening";
//     l3.textContent = "Evening";
//     const hiddenInput3 = document.createElement("input");
//     hiddenInput3.type = "hidden";
//     hiddenInput3.name = `additionalCheckboxValue${inputCount}`;
//     hiddenInput3.value = `evening`;

//     const l4 = document.createElement("label");
//     const i4 = document.createElement("input");
//     i4.type = "checkbox";
//     i4.name = `additionalCheckbox${inputCount}`;
//     i4.id = "night";
//     i4.value = "customValue";
//     l4.htmlFor = "night";
//     l4.textContent = "Night";
//     const hiddenInput4 = document.createElement("input");
//     hiddenInput4.type = "hidden";
//     hiddenInput4.name = `additionalCheckboxValue${inputCount}`;
//     hiddenInput4.value = `night`;

//     box3a.appendChild(l1);
//     box3a.appendChild(i1);
//     box3a.appendChild(hiddenInput1);
//     box3b.appendChild(l2);
//     box3b.appendChild(i2);
//     box3a.appendChild(hiddenInput2);
//     box3c.appendChild(l3);
//     box3c.appendChild(i3);
//     box3a.appendChild(hiddenInput3);
//     box3d.appendChild(l4);
//     box3d.appendChild(i4);
//     box3a.appendChild(hiddenInput4);

//     box2.appendChild(box3a);
//     box2.appendChild(box3b);
//     box2.appendChild(box3c);
//     box2.appendChild(box3d);

//     box1.appendChild(box2);

//     container.appendChild(box1);

//     const ip = document.createElement('input');
//     ip.name = `duration${inputCount}`;
//     ip.type = 'number';
//     ip.placeholder = "Enter duration of course in days";

//     container.appendChild(ip);
//     parentBox.appendChild(container);

//     inputCount+=1;
//     console.log(inputCount);
//   });
// });


// const combinedData = [];
  // Object.keys(additionalData).forEach((key) => {
  //   if (key.startsWith("additionalCheckbox")) {
  //     if (additionalData[key] === "customValue") {
  //       const valueKey = key.replace(
  //         "additionalCheckbox",
  //         "additionalCheckboxValue"
  //       );
  //       combinedData.push({
  //         name: additionalData[key],
  //         value: additionalData[valueKey],
  //       });
  //     } else {
  //       combinedData.push({
  //         name: key,
  //         value: additionalData[key],
  //       });
  //     }
  //   }
  // });
  // console.log(combinedData);
  