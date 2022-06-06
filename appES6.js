class Book
{
    constructor(title,author,isbn)
    {
        this.title=title;
        this.author=author;
        this.isbn=isbn;
    }
}

class UI{
      addtoList(book)
    {
        const list=document.getElementById('book-list');

        const row=document.createElement('tr');
         row.innerHTML=`
         <td>${book.title}</td>
         <td>${book.author}</td>
         <td>${book.isbn}</td>
         <td><a href="#" class="delete">X</a></td>
         `;
        
         list.appendChild(row);
    }

    showAlert(msg,clas)
    {
        const div=document.createElement('div');
        div.className=`alert ${clas}`;

        div.appendChild(document.createTextNode(msg));

        const container=document.querySelector('.container');

        const form=document.querySelector('#book-form');

        container.insertBefore(div,form);

        setTimeout(function()
        {
            document.querySelector('.alert').remove()
        },3000);
    }

    deleteBook(target)
    {
        if(target.className==='delete')
        target.parentElement.parentElement.remove();
    }

    clearList()
    { 
        document.getElementById('title').value="";
        
        document.getElementById('author').value="";
        
        document.getElementById('isbn').value="";

    }
}

class Store{

    static getBook()
    {
        let books;
        if(localStorage.getItem('books')===null)
        books=[];
        else
        books=JSON.parse(localStorage.getItem('books'));
        
        return books;
    }

    static addBook(book)
        {
            const books=Store.getBook();
            books.push(book); 

            localStorage.setItem('books',JSON.stringify(books));
        }

    static displayBook()
        {
            const books=Store.getBook();

            books.forEach(book => {
                const ui=new UI();
                ui.addtoList(book);
            });
        }

    static removeBook(isbn){
        const books=Store.getBook();

        books.forEach(book => {
            if(book.isbn===isbn)
            books.splice(book,1);
        });

        localStorage.setItem('books',JSON.stringify(books));
    }   


    
}

document.addEventListener('DOMContentLoader',Store.displayBook());

document.getElementById('book-form').addEventListener('submit',function(e)
{
    const author=document.getElementById('author').value;
    const title=document.getElementById('title').value;
    const isbn=document.getElementById('isbn').value;

    const book=new Book(title,author,isbn);

    const ui=new UI();

    if(author==='' || title==='' || isbn==='')
    ui.showAlert('Please fill out all fields','error');
    else
    {
    ui.addtoList(book);
    Store.addBook(book);
    ui.showAlert('Book added successfully','success');
    ui.clearList();
    }
    e.preventDefault();
});


document.getElementById('book-list').addEventListener('click',function(e){

    const ui=new UI();
    ui.deleteBook(e.target);
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    if(e.target.className=='delete')
    ui.showAlert('Book Removed!','success');
    else
    ui.showAlert('Click on X to Remove an item','error');
    e.preventDefault();
});

