
function GetPreview() {
    let elements = Array.from(document.querySelectorAll('[id^="usertag_"]')).filter(function (element) {
        return element.id !== 'usertag_0' && element.id !== 'usertag_form' && element.id !== 'usertag_action' && element.id !== 'usertag_target';
    }); elements.forEach(function (element) {
        let newDiv = document.createElement('div');
        newDiv.setAttribute('class', 'itg gld');
        newDiv.setAttribute('style', 'display: flex;');
        for (let i = 0; i < 3; i++) {
            let childDiv = document.createElement('div');
            childDiv.setAttribute('class', 'gl1t');
            childDiv.setAttribute('data-new', '1');
            childDiv.setAttribute('style', 'flex: 1;');
            newDiv.appendChild(childDiv);
        }
        element.appendChild(newDiv);
        let hrefElement = element.querySelector('a');
        let hreflink = hrefElement.getAttribute('href');
        console.log(hreflink)
        let fetchData = new Promise((resolve, reject) => {
            fetch(hreflink)
                .then(response => response.text())
                .then(text => {
                    let parser = new DOMParser();
                    const doc = parser.parseFromString(text, 'text/html');
                    const gl1tElements = doc.querySelectorAll('.gl1t');
                    const gl1tContents = [];
                    for (let i = 0; i < 3 && i < gl1tElements.length; i++) {
                        gl1tContents.push(gl1tElements[i].innerHTML);
                    }
                    //y=y+1;
                    resolve(gl1tContents);
                })
                .catch(error => reject(error));
        });

        fetchData.then(gl1tContents => {
            // Your code that uses the gl1tContents array goes here
            const aElement = document.querySelector(`a[href="${hreflink}"]`);
            const parentDiv = aElement.parentElement.parentElement;
            const gl1tElements = parentDiv.querySelectorAll('.gl1t');
            for (let i = 0; i < 3 && i < gl1tElements.length; i++) {
                gl1tElements[i].innerHTML = gl1tContents[i];
            }
        }).catch(error => console.error(error));
    })
}

function Collapse() {
    var targetDiv = document.getElementById('nb');
    var newButton = document.createElement('button');
    newButton.style.height = '18px';
    newButton.style.lineHeight = '10px';
    newButton.style.fontSize = '13px';
    targetDiv.appendChild(newButton);
    newButton.innerHTML = "收起";
    newButton.addEventListener("click", function () {
        if (newButton.innerHTML == "收起") {
            var elements = document.getElementsByClassName('itg gld');
            for (var i = 0; i < elements.length; i++) {
                elements[i].style.display = 'none';
            } newButton.innerHTML = "展开";
        }
        else if (newButton.innerHTML == "展开") {

            var elements = document.getElementsByClassName('itg gld');
            for (var i = 0; i < elements.length; i++) {
                elements[i].style.display = 'flex';
            } newButton.innerHTML = "收起";
        }
    });
}

GetPreview();
Collapse();