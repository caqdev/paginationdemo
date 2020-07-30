console.log("loaded");
(function(){
    let books;
    let currentPage = 1;
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            books = JSON.parse(this.responseText).books;
            console.log(books);
            let firstPageOfBooks = books.slice(0,6);
            displayBooks(firstPageOfBooks);
        }else
        {
            books = [];
        }
    }
    xhttp.open("GET", "https://run.mocky.io/v3/8ffb4015-5ef2-41e0-9b23-aec68e075975", true)
    xhttp.send();
    
    let displayBooks = function(booksToAdd){
        let bookContainer = document.getElementById("bookcontainer");
        while(bookContainer.firstChild){
            bookContainer.removeChild(bookContainer.lastChild);
        }
        let numBooksPerRow = 3;
        let bookItemAdded = 1;
        let currentRow;
        booksToAdd.forEach(element => {
            console.log(element);
            if(bookItemAdded % numBooksPerRow === 1){
                currentRow = document.createElement("DIV");
                currentRow.classList.add("row");
                bookContainer.appendChild(currentRow);
            }
            let bookItem = document.createElement("SECTION");
            bookItem.innerHTML = "<p>" + element.id + ") "+ element.title + " by " + element.author + "</p>";
            bookItem.classList = "col-sm";
            currentRow.appendChild(bookItem);
            bookItemAdded++;
        });
    }

    let handlePagination = function(evt){
        console.log(evt);
        let paginationLinkText = evt.currentTarget.children[0].innerHTML;
        let pageNumber = parseInt(paginationLinkText);
        let booksToAdd;
        if(Number.isNaN(pageNumber)) {
            pageNumber = currentPage;
            if(paginationLinkText.includes("Previous")) {
                pageNumber--;
            } else {
                pageNumber++;
            }
        }
        currentPage=pageNumber;
        //Managed is Prev/Next are disbled
        if(pageNumber === 1){
            document.getElementById("prevButton").classList.add("disabled");
        }else if(pageNumber === 4){
            document.getElementById("nextButton").classList.add("disabled");
        }
        if(pageNumber !== 1){
            document.getElementById("prevButton").classList.remove("disabled");
        }
         if(pageNumber !== 4){
            document.getElementById("nextButton").classList.remove("disabled");
        }
        //Remove active state from previous page link
        document.getElementsByClassName("active")[0].classList.remove("active");
        //Set selected Page Number (Uses ID because I can't rely on the evt.currentTarget because of the Prev/Next Buttons)
        document.getElementById("page"+pageNumber).classList.add("active");
        //Updating Displayed Books
        let startIndex = (pageNumber - 1) * 6;
        let endIndex = (startIndex + 6 > 20) ? 20 : startIndex + 6 ;
        booksToAdd = books.slice(startIndex, endIndex);
        displayBooks(booksToAdd);
    }

    let children = document.getElementById("bookpagination").children;
    for(let i = 0; i < 6 ; i++){
        children[i].onclick = handlePagination;
    }
    

})();

