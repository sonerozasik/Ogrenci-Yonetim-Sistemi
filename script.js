function getStudents(){
    fetch('http://localhost:3000/students')
    .then((response)=>response.json())
    .then((data)=>showStudents(data));
    
}

function showStudents(students){

    const table = document.getElementById("table");

    for (let i = 0; i < students.length; i++) {

      tr = table.insertRow(-1);

      /*for (let j = 0; j < col.length; j++) {
        let tabCell = tr.insertCell(-1);
        tabCell.innerHTML = students[i][col[j]];
      }*/


      let tabCell1 = tr.insertCell(-1);
      tabCell1.className="px-5";
      tabCell1.innerHTML = students[i].fname + ' ' + students[i].lname;
      let tabCell2 = tr.insertCell(-1);
      tabCell2.className="d-none d-md-table-cell"
      tabCell2.innerHTML = students[i].num;
      let tabCell3 = tr.insertCell(-1);
      tabCell3.className="d-none d-lg-table-cell"
      tabCell3.innerHTML = depts[students[i].dept];
      

      let tabCell4 = tr.insertCell(-1);

      const silButton = document.createElement("button");
      silButton.className="btn button bg-red";
      silButton.innerHTML="Sil"
      const duzenleButton = document.createElement("button");
      duzenleButton.className="btn button bg-blue";
      duzenleButton.innerHTML= "Düzenle"
      const detayButton = document.createElement("button");
      detayButton.className="btn button bg-green";
      detayButton.innerHTML="Detay"

      tabCell4.appendChild(silButton)
      tabCell4.appendChild(duzenleButton)
      tabCell4.appendChild(detayButton)

    }

    // Now, add the newly created table with json data, to a container.
    const divShowData = document.getElementById('table-container');
    divShowData.innerHTML = "";
    divShowData.appendChild(table);
  }
