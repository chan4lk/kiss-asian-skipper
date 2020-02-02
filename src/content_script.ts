import * as $ from 'jquery';



chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    const map = msg.config;
    console.log('KISS_SKIPPER: mapping', map);

    const firstName = document.querySelector("#formVerify > div:nth-child(1) > p:nth-child(2) > span:nth-child(2)").innerHTML;
    const secondName = document.querySelector("#formVerify > div:nth-child(1) > p:nth-child(2) > span:nth-child(3)").innerHTML;
    console.log('KISS_SKIPPER: names', firstName, secondName);

    const image1 = document.querySelector("#formVerify > div:nth-child(2) > div > div:nth-child(1) > img");
    const image2 = document.querySelector("#formVerify > div:nth-child(2) > div > div:nth-child(2) > img");
    const image3 = document.querySelector("#formVerify > div:nth-child(2) > div > div:nth-child(3) > img");
    const image4 = document.querySelector("#formVerify > div:nth-child(2) > div > div:nth-child(4) > img");
    
    if (msg.skip){
        [image1, image2, image3, image4].forEach(image => {
            const src = image.getAttribute('src');
            console.log('KISS_SKIPPER: image', src);
            if(map[firstName] === src){
                $(image).click();
                console.log('KISS_SKIPPER: image clicked', firstName, src);
            }

            if(map[secondName] === src){
                $(image).click();
                console.log('KISS_SKIPPER: image clicked', secondName, src);
            }
        });

    }

    if(msg.capture){
        [image1, image2, image3, image4].forEach(image => {
            $(image).on('click', () => {
                const src = image.getAttribute('src');
                if(window.confirm("Is this name correct? " + firstName)){
                    map[firstName] = src;
                }else {
                    map[secondName] = src;
                }

                if(window.confirm("Save changes?")){
                    chrome.storage.sync.set({
                        data: map
                      }
                    );
                }
            })
        })
    }
});

