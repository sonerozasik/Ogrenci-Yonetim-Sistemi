let currPage = 1;
let numPerPage = 8;
let numPages = 1;

function renderAll(){
  getStudents();
  renderPageNums();
  renderPerPageButtons();

}


function getStudents(){
    fetch('http://localhost:3000/students')
    .then((response)=>response.json())
    .then(data=>renderTable(data));
} 


function renderTable(students){

    const table = document.querySelector("#tableContent");
    const lastItemIndex = currPage*numPerPage;
    const firsItemIndex = lastItemIndex - numPerPage;
    const items = students.slice(firsItemIndex, lastItemIndex);

    table.innerHTML="";
    
    let template = '';

    for (let i=0; i<items.length; i++){
        template += 
        `<tr>
          <td class="px-5">${items[i].fname + ' ' + items[i].lname}</td>
          <td class="d-none d-md-table-cell">${items[i].num}</td>
          <td class="d-none d-lg-table-cell">${depts[items[i].dept]}</td>
          <td> 
          <button class="btn button bg-red">Sil</button>
          <button class="btn button bg-blue">Düzenle</button>
          <button class="btn button bg-green">Detay</button>
          </td>
        </tr>
        `;
    } // end-for
    table.innerHTML = template;




    /*for (let i = 0; i < items.length; i++) {

      tr = table.insertRow(-1);


      let tabCell1 = tr.insertCell(-1);
      tabCell1.className="px-5";
      tabCell1.innerHTML = items[i].fname + ' ' + items[i].lname;
      let tabCell2 = tr.insertCell(-1);
      tabCell2.className="d-none d-md-table-cell"
      tabCell2.innerHTML = items[i].num;
      let tabCell3 = tr.insertCell(-1);
      tabCell3.className="d-none d-lg-table-cell"
      tabCell3.innerHTML = depts[items[i].dept];
      

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
    divShowData.appendChild(table);*/
  }

  function renderPageNums(){
  const pageNumsDiv = document.querySelector("#pageButtonContainer")
    numPages = Math.ceil(students.length/numPerPage);
    let template = '<div>';

    for (let i=1; i<=numPages; i++){
        template += `<button style="margin:auto" 
        class="btn border border-2 pagebtn ${i==currPage? 'active': 'bg-white'}"
        onclick="pageClicked(${i})">${i}</button>
        `;
    } // end-for
    template += "</div>"
    pageNumsDiv.innerHTML = template;
}

function pageClicked(pageNum){
  if (pageNum == currPage) return;
  currPage = pageNum;
  renderAll();
} // end-pageClicked

function perPageClicked(perPageNum){
  if (perPageNum == numPerPage) return;
  numPerPage = perPageNum;
  renderAll();
} // end-pageClicked

function renderPerPageButtons(){
  const perPageNumsDiv = document.querySelector("#perPageButtonContainer")

      let template = `<button class="perPageBtn perPageBtn-5 px-2 ${numPerPage==5? 'active': ''}" onclick="perPageClicked(5)">5</button>
      <button class="perPageBtn perPageBtn-8 px-2  ${numPerPage==8? 'active': ''}" onclick="perPageClicked(8)">8</button>
      <button class="perPageBtn perPageBtn-10 px-2  ${numPerPage==10? 'active': ''}" onclick="perPageClicked(10)">10</button>
      `;

      perPageNumsDiv.innerHTML = template;
}



