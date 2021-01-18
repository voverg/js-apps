const $container = document.querySelector('.container');

function createElem(data, className='card') {
    const div = document.createElement('div');
    div.innerHTML = `
         <a href="${data.url}" target="_blank" rel="noopener">
            <div class="card-img">
                <img src="${data.img}" alt="${data.title} image" title="${data.title}">
            </div>
            <h2>${data.title}</h2>
        </a>
    `
    div.classList.add(className);

    return div;
}

model.forEach(elemData => {
    const elem = createElem(elemData);
    $container.append(elem);
});

console.log(model);