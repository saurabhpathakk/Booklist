//Book Constructor
function Book(title,author,isbn)
{
    this.title=title;
    this.author=author;
    this.isbn=isbn;
}


//UI Constructor
function UI(){}

    UI.prototype.addBooktoList=function(book)
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
        //console.log(row);
    }

    UI.prototype.clearlist=function()
    {
        document.getElementById('title').value="";
        
        document.getElementById('author').value="";
        
        document.getElementById('isbn').value="";
    };

    UI.prototype.showAlert=function(msg,clas)
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
    };

    UI.prototype.deleteElement=function(target)
    {
        if(target.className==='delete')
        target.parentElement.parentElement.remove();
    }

document.getElementById('book-form').addEventListener('submit',function(e)
{
    const title=document.getElementById('title').value,
    author=document.getElementById('author').value,
    isbn=document.getElementById('isbn').value;

    const book=new Book(title,author,isbn);
    
    const ui=new UI();

    if(author==='' || title==='' || isbn==='')
    ui.showAlert('Please fill out all fields','error');
    else
    {
    ui.addBooktoList(book);
    ui.showAlert('Book added successfully','success');
    ui.clearlist();
    }
    e.preventDefault();
});

document.getElementById('book-list').addEventListener('click',function(e){

    const ui=new UI();
    ui.deleteElement(e.target);
    ui.showAlert('Book Removed!','success');
    e.preventDefault();
})
