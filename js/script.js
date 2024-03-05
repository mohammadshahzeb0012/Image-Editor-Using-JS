let choose_img_Btn = document.querySelector(".choose_img button");
let choose_Input = document.querySelector(".choose_img input");
let imgSrc = document.querySelector(".view-img img");
let filter_buttons = document.querySelectorAll(".icons_room button");
let slider = document.querySelector('.slider input')
let filterName = document.querySelector('.filter-info .name')
let sliderValue = document.querySelector('.filter-info .value')
let rotateButtons = document.querySelectorAll('.icons_room1 button')
let reset = document.querySelector('.reset');
let save = document.querySelector('.save')

choose_img_Btn.addEventListener("click", () => choose_Input.click());
choose_Input.addEventListener("change", () => {
    let file = choose_Input.files[0];
    if (!file) return;
    imgSrc.src = URL.createObjectURL(file);
    imgSrc.addEventListener("load", () => {
        document.querySelector(".container").classList.remove("disabled");
    });
})

let brightness = 100,
    contrast = 100,
    saturate = 100,
    invert = 0,
    Blur = 0,
    rotate = 0,
    flip_x = 1,
    flip_y = 1;

filter_buttons.forEach(element => {
    element.addEventListener('click', () => {
        document.querySelector('.active').classList.remove('active');
        element.classList.add('active')
        filterName.innerText = element.id
    })
})

slider.addEventListener('input', (e) => {
    sliderValue.innerText = `${e.target.value}`
    let sliderState = document.querySelector('.icons_room .active');
    if (sliderState.id === 'brightnss') {
        brightness = slider.value
    } else if (sliderState.id === 'contrast') {
        contrast = slider.value
    } else if (sliderState.id === 'opactiy') {
        saturate = slider.value
    } else if (sliderState.id === 'invert') {
        invert = slider.value
    } else if (sliderState.id === 'blur') {
        Blur = slider.value
    }
    imgSrc.style.filter = `brightness(${brightness}%) 
                           contrast(${contrast}%)
                           saturate(${saturate}%) 
                           invert(${invert}%)
                           blur(${Blur}px)`
})

rotateButtons.forEach(buttons => {
    buttons.addEventListener('click', (e) => {
        let el = e.currentTarget
        if (el.id === 'rotateleft') {
            rotate -= 90
        }
        else if (el.id === 'rotateright') {
            rotate += 90
        }
        else if (el.id === `flip_x`) {
            flip_x = flip_x === 1 ? -1 : 1
        } else if (el.id === 'flip_y') {
            flip_y = flip_y === 1 ? -1 : 1
        }
        imgSrc.style.transform = `rotate(${rotate}deg)
                                  scale(${flip_x},  ${flip_y})
                              `
    })
})

reset.addEventListener('click', () => {
    brightness = 100,
        contrast = 100,
        saturate = 100,
        invert = 0,
        Blur = 0,
        rotate = 0,
        flip_x = 1,
        flip_y = 1;
    imgSrc.style.transform = `rotate(${rotate}deg)
    scale(${flip_x},  ${flip_y})
    `
    imgSrc.style.filter = `brightness(${brightness}%) 
           contrast(${contrast}%)
  saturate(${saturate}%) 
  invert(${invert}%)
  blur(${Blur}px)`
})

save.addEventListener('click', () => {
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    canvas.width = imgSrc.naturalWidth;
    canvas.height = imgSrc.naturalHeight;
    ctx.filter = `brightness(${brightness}%) 
                   contrast(${contrast}%)
                   saturate(${saturate}%) 
                   invert(${invert}%)
                   blur(${Blur}px)`;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.scale(flip_x, flip_y);
    ctx.drawImage(
        imgSrc,
        -canvas.width / 2,
        -canvas.height / 2,
        canvas.width,
        canvas.height
    );
    const link = document.createElement('a');
    link.download = "img.jpg";
    link.href = canvas.toDataURL();
    link.click();
});
