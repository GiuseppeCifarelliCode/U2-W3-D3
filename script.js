const getRemoteBooks = function () {
  fetch("https://striveschool-api.herokuapp.com/books")
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Error");
      }
    })

    .then((data) => {
      console.log(data);
      const spinner = document.getElementById("spinner-container");
      spinner.classList.add("d-none");
      data.forEach((book) => {
        let newCol = document.createElement("div");
        newCol.classList.add("col");
        newCol.classList.add("mb-4");
        newCol.innerHTML = `
        <div class="card h-100" style="width: 100%">
        <img src= ${book.img} class="card-img-top" alt="cover">
            <div class="card-body d-flex flex-column justify-content-between">
                <h5 class="card-title">${book.title}</h5>
                 <p class="card-text">Price: $${book.price}</p>
                 <div class="container">
                <a class="btn btn-primary discard-btn ">Discard</a>
                <a class="btn btn-primary cart-btn ">Add To Cart</a>
                </div>
            </div>
        </div>
        `;
        const bookContainer = document.querySelector(".book-container");
        bookContainer.appendChild(newCol);
      });
      const discardButtons = document.querySelectorAll(".discard-btn");
      discardButtons.forEach((button) => {
        button.addEventListener("click", discard);
      });

      const cartButton = document.querySelectorAll(".cart-btn");
      cartButton.forEach((button) => {
        button.addEventListener("click", addToCart);
      });
    });

  // .catch((err) => {
  //   alert("ERROR", err);
  // });
};

const discard = function () {
  this.parentNode.parentNode.parentNode.parentNode.classList.add("d-none");
};

const addToCart = function () {
  const selectedTitle = document.querySelectorAll("h5");
  this.classList.add("selected");
  const cartButton = document.querySelectorAll(".cart-btn");
  cartButton.forEach((button, i) => {
    if (button.classList.contains("selected")) {
      const ul = document.querySelector("ul");
      const newLi = document.createElement("li");
      console.log(selectedTitle[i]);
      newLi.innerText = selectedTitle[i].innerText;
      ul.appendChild(newLi);
    }
  });
  cartButton.forEach((button) => {
    button.classList.remove("selected");
  });
};
getRemoteBooks();
