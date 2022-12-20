let currPage = 1;
let numPerPage = 8;
let numPages = 1;
var students=[];
var selectStudentId=0;

function renderPages(){
  renderPageNums();
  renderTable();
  renderPerPageButtons();
  renderTexts();
}


async function fetchDataAndRender(){
    fetch('http://localhost:3000/students')
    .then((response)=>response.json())
    .then(data=> students = data.slice())
    .then(()=>{ renderPages()  })
    ;
} 


function renderTable(){
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
          <td class="d-flex flex-nowrap" id="${items[i].id}"> 
          <button class="btn button bg-red" data-bs-toggle="modal" data-bs-target="#deleteStudentModal" onclick="displayStudentInDeleteModal($(this).parent().attr('id'))">Sil</button>
          <button class="btn button bg-blue" data-bs-toggle="modal" data-bs-target="#editStudentModal" onclick="displayStudentInEditModal($(this).parent().attr('id'))">Düzenle</button>
          <button class="btn button bg-green" data-bs-toggle="modal" data-bs-target="#studentInfoModal" onclick="displayStudentInInfoModal($(this).parent().attr('id'))">Detay</button>
          </td>
        </tr>
        `;
    } // end-for
    table.innerHTML = template;
  }
  //onclick="deleteStudent($(this).parent().attr('id'))"

  function renderPageNums(){
    const pageNumsDiv = document.querySelector("#pageButtonContainer")
    numPages = Math.ceil(students.length/numPerPage);
    let template = '<div>';
    if(numPages<currPage) currPage=numPages;
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
  fetchDataAndRender();
} // end-pageClicked

function perPageClicked(perPageNum){
  if (perPageNum == numPerPage) return;
  numPerPage = perPageNum;
  fetchDataAndRender();
} // end-pageClicked

function renderPerPageButtons(){
  const perPageNumsDiv = document.querySelector("#perPageButtonContainer")

      let template = `<button class="perPageBtn perPageBtn-5 px-2 ${numPerPage==5? 'active': ''}" onclick="perPageClicked(5)">5</button>
      <button class="perPageBtn perPageBtn-8 px-2  ${numPerPage==8? 'active': ''}" onclick="perPageClicked(8)">8</button>
      <button class="perPageBtn perPageBtn-10 px-2  ${numPerPage==10? 'active': ''}" onclick="perPageClicked(10)">10</button>
      `;

      perPageNumsDiv.innerHTML = template;
}

function renderTexts(){
  const numberOfStudents = document.querySelector("#numberOfStudents")
  numberOfStudents.innerHTML=students.length;
  const numberOfInterval = document.querySelector("#numberOfInterval")
  numberOfInterval.innerHTML=  currPage*numPerPage-numPerPage + 1 + '-' + (currPage*numPerPage > students.length ? students.length : currPage*numPerPage);
  
}

function deleteStudent(id){
  console.log(id)
  
  fetch('http://localhost:3000/students/'+id,
      {
          method:'delete',
      }).then(function(response){
          console.log(response)
      }).catch(function(e){
          console.log(e);
      })
      $('#deleteStudentModal').modal('hide');
      fetchDataAndRender();
  }


function displayStudentInInfoModal(id){
  const fname = document.querySelector('#si_fname');
  const lname = document.querySelector('#si_lname');
  const dept = document.querySelector('#si_dept');
  const num = document.querySelector('#si_num');
  const dob = document.querySelector('#si_dob');
  const pob = document.querySelector('#si_pob');

  fetch('http://localhost:3000/students/'+id)
    .then((response)=>response.json())
    .then((data)=> {
      fname.value = data.fname;
      lname.value = data.lname;
      dept.value = depts[data.dept];
      num.value = data.num;
      dob.value = data.dob.slice(5,7) + '/' + data.dob.slice(10-12)  +'/' + data.dob.slice(0,4);
      pob.value = data.pob;
    })
}
  
function displayStudentInEditModal(id){
  const fname = document.querySelector('#es_fname');
  const lname = document.querySelector('#es_lname');
  const dept = document.querySelector('#es_dept');
  const num = document.querySelector('#es_num');
  const dob = document.querySelector('#es_dob');
  const pob = document.querySelector('#es_pob');
  selectStudentId=id;
  
  fetch('http://localhost:3000/students/'+id)
    .then((response)=>response.json())
    .then((data)=> {
      fname.value = data.fname;
      lname.value = data.lname;
      dept.value = data.dept;
      num.value = data.num;
      dob.value = data.dob;
      pob.value = data.pob;
    })
}

function displayStudentInDeleteModal(id){
  const nameText = document.querySelector("#deleteStudentName")
  selectStudentId=id;
  
  fetch('http://localhost:3000/students/'+id)
    .then((response)=>response.json())
    .then((data)=> {
      nameText.innerHTML = data.fname + ' ' + data.lname;
    })
}

