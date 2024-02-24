// Fetching data from the JSONPlaceholder API
fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((users) => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((postsData) => {
        const posts = [];
        for (let i = 0; i < postsData.length; i++) {
          if (
            posts.filter((post) => post.userId === postsData[i].userId).length <
            1
          ) {
            posts.push(postsData[i]);
          }
        }
        const payload = users.map((user, index) => {
          return {
            ...user,
            postId: posts[index].id,
            title: posts[index].title.slice(0, 20) + "...",
            body: posts[index].body.slice(0, 20) + "...",
          };
        });
        populateTable(payload);
      });
  });

// Function to populate the data fetched from the API in the table
function populateTable(data) {
  const table = document.getElementById("dataTable");
  const tbody = table.getElementsByTagName("tbody")[0];
  data.forEach((item) => {
    const row = document.createElement("tr");

    const userIdCell = document.createElement("td");
    userIdCell.textContent = item.id;
    row.appendChild(userIdCell);

    const postIdCell = document.createElement("td");
    postIdCell.textContent = item.postId;
    row.appendChild(postIdCell);

    const titleCell = document.createElement("td");
    titleCell.textContent = item.title;
    row.appendChild(titleCell);

    const bodyCell = document.createElement("td");
    bodyCell.textContent = item.body;
    row.appendChild(bodyCell);

    const nameCell = document.createElement("td");
    nameCell.textContent = item.name;
    row.appendChild(nameCell);

    const usernameCell = document.createElement("td");
    usernameCell.textContent = item.username;
    row.appendChild(usernameCell);

    const emailCell = document.createElement("td");
    emailCell.textContent = item.email;
    row.appendChild(emailCell);

    const addressCell = document.createElement("td");
    addressCell.textContent = `${item.address.street}, ${item.address.suite}, ${item.address.city}, ${item.address.zipcode}`;
    row.appendChild(addressCell);

    const phoneCell = document.createElement("td");
    phoneCell.textContent = item.phone;
    row.appendChild(phoneCell);

    const websiteCell = document.createElement("td");
    websiteCell.textContent = item.website;
    row.appendChild(websiteCell);

    const companyCell = document.createElement("td");
    companyCell.textContent = item.company.name;
    row.appendChild(companyCell);

    const EditButtonCell = document.createElement("td");
    const EditButton = document.createElement("button");
    EditButton.textContent = "Edit";
    EditButton.setAttribute("class", "btn btn-primary");
    EditButton.setAttribute("onclick", "showModal()");
    EditButtonCell.appendChild(EditButton);
    row.appendChild(EditButtonCell);

    const DeleteButtonCell = document.createElement("td");
    const DeleteButton = document.createElement("button");
    DeleteButton.textContent = "Delete";
    DeleteButton.setAttribute("class", "btn btn-danger");
    DeleteButtonCell.appendChild(DeleteButton);
    row.appendChild(DeleteButtonCell);
    

    tbody.appendChild(row);
  });
}

// Function to implement real time search based on UserID, Name, Username, and Email Columns.
function search() {
  const searchValue = document.getElementById("search").value.toLowerCase();

  const table = document.getElementById("dataTable");
  const rows = table.getElementsByTagName("tr");

  for (let i = 1; i < rows.length; i++) {
    const userIdCell = rows[i].getElementsByTagName("td")[0];
    const nameCell = rows[i].getElementsByTagName("td")[4];
    const usernameCell = rows[i].getElementsByTagName("td")[5];
    const emailCell = rows[i].getElementsByTagName("td")[6];
    if (userIdCell && nameCell && usernameCell && emailCell) {
      const userIdValue = userIdCell.textContent || userIdCell.innerText;
      const nameValue = nameCell.textContent || nameCell.innerText;
      const usernameValue = usernameCell.textContent || usernameCell.innerText;
      const emailValue = emailCell.textContent || emailCell.innerText;
      if (
        userIdValue.toLowerCase().indexOf(searchValue) > -1 ||
        nameValue.toLowerCase().indexOf(searchValue) > -1 ||
        usernameValue.toLowerCase().indexOf(searchValue) > -1 ||
        emailValue.toLowerCase().indexOf(searchValue) > -1
      ) {
        rows[i].style.display = "";
      } else {
        rows[i].style.display = "none";
      }
    }
  }
}

// Function to implement sorting based on UserID, PostID, and Name Columns.
function sort(columnIndex) {
  const table = document.getElementById("dataTable");
  let rows, switching, i, x, y, shouldSwitch;
  switching = true;
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < rows.length - 1; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[columnIndex];
      y = rows[i + 1].getElementsByTagName("TD")[columnIndex];
      if (Number(x.innerHTML) > Number(y.innerHTML)) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

// Function to implement pagination functionality
let currentPage = 1;
let rowsPerPage = 5;
function paginate() {
  const table = document.getElementById("dataTable");
  const rows = table.getElementsByTagName("tr");
  const totalPages = Math.ceil((rows.length - 1) / rowsPerPage);
  if (currentPage < 1) {
    currentPage = 1;
  } else if (currentPage > totalPages) {
    currentPage = totalPages;
  }
  const start = (currentPage - 1) * rowsPerPage + 1;
  const end = start + rowsPerPage;
  for (let i = 1; i < rows.length; i++) {
    if (i >= start && i < end) {
      rows[i].style.display = "";
    } else {
      rows[i].style.display = "none";
    }
  }
}

// Function to implement modal display
function showModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "block";
}
