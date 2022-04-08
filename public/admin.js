async function load() {

    let response = await fetch('http://localhost:3001/listBooks');
    let books = await response.json();

    books.forEach(renderBook);
};

function renderBook(book) {
    
    let li = document.createElement('li');
    li.textContent = book.title;
    li.style.listStyle = 'none';
    li.style.display = 'flex';
    li.style.flexFlow = 'column nowrap';
    li.style.justifyContent = 'center';
    li.style.alignItems = 'center';
    li.style.marginBottom = '2px';
    li.style.borderTop = '4px solid #000';
    li.style.paddingTop = '10px';
    
    let quantity = document.createElement('input');
    quantity.value = book.quantity;
    quantity.style.textAlign = 'center';
    quantity.style.marginBottom = '5px';
    
    let button = document.createElement('button');
    button.textContent = 'Save';
    button.style.width = '100%';
    button.style.marginBottom = '1em';
    
    button.addEventListener('click', () => {
        fetch('http://localhost:3001/updateBook', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: book.id,
                quantity: quantity.value
            })
        })
    });
    
    li.append(quantity, button);
    
    let root = document.querySelector('#root');
    root.style.position = 'absolute';
    root.style.transform = 'translate(-50%, -50%)';
    root.style.top = '50%';
    root.style.left = '50%';
    root.style.fontSize = '20px';
    root.append(li);
};

load();