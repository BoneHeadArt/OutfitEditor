/*
=====================================================
OUTFIT IMAGE LISTS
=====================================================

Add your image filenames here.

Images should be located in:

tops/
bottoms/
shoes/

=====================================================
*/

const wardrobe = {

    tops: [
        "top1.png",
        "top2.png",
        "top3.png"
    ],

    bottoms: [
        "bottom1.png",
        "bottom2.png",
        "bottom3.png"
    ],

    shoes: [
        "shoes1.png",
        "shoes2.png",
        "shoes3.png"
    ]

};


/*
=====================================================
CURRENT IMAGE POSITION
=====================================================
*/

const currentIndex = {
    tops: 0,
    bottoms: 0,
    shoes: 0
};

let activeCategory = "tops";


/*
=====================================================
UPDATE IMAGE
=====================================================
*/

function updateImage(category, animate = true) {

    const image =
        document.getElementById(category + "-image");

    const counter =
        document.getElementById(category + "-counter");

    const images =
        wardrobe[category];


    if (!images || images.length === 0) {

        image.removeAttribute("src");
        counter.textContent = "No images";

        return;
    }


    const filename =
        images[currentIndex[category]];

    const newSource =
        category + "/" + filename;


    if (animate) {

        image.classList.add("changing");

        setTimeout(() => {

            image.src = newSource;
            image.classList.remove("changing");

        }, 120);

    } else {

        image.src = newSource;

    }


    counter.textContent =
        (currentIndex[category] + 1)
        + " / "
        + images.length;
}


/*
=====================================================
NEXT IMAGE
=====================================================
*/

function nextImage(category) {

    const images =
        wardrobe[category];

    if (!images.length)
        return;


    currentIndex[category]++;


    if (
        currentIndex[category] >= images.length
    ) {

        currentIndex[category] = 0;

    }


    updateImage(category);
}


/*
=====================================================
PREVIOUS IMAGE
=====================================================
*/

function previousImage(category) {

    const images =
        wardrobe[category];

    if (!images.length)
        return;


    currentIndex[category]--;


    if (
        currentIndex[category] < 0
    ) {

        currentIndex[category] =
            images.length - 1;

    }


    updateImage(category);
}


/*
=====================================================
BUTTON EVENTS
=====================================================
*/

document
.querySelectorAll(".clothing-section")
.forEach(section => {

    const category =
        section.dataset.category;

    const leftButton =
        section.querySelector(".left");

    const rightButton =
        section.querySelector(".right");


    /*
    Previous button
    */

    leftButton.addEventListener(
        "click",
        () => {

            activeCategory = category;
            previousImage(category);

        }
    );


    /*
    Next button
    */

    rightButton.addEventListener(
        "click",
        () => {

            activeCategory = category;
            nextImage(category);

        }
    );


    /*
    Mouse wheel support
    */

    section.addEventListener(
        "wheel",
        event => {

            event.preventDefault();

            activeCategory = category;


            if (event.deltaY > 0) {

                nextImage(category);

            } else {

                previousImage(category);

            }

        },
        {
            passive: false
        }
    );


    /*
    Clicking a section makes it
    the active keyboard category
    */

    section.addEventListener(
        "click",
        () => {

            activeCategory = category;

        }
    );

});


/*
=====================================================
KEYBOARD CONTROLS
=====================================================

1 = Tops
2 = Bottoms
3 = Shoes

Left / Right arrows change the
currently selected category.

=====================================================
*/

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "1") {

            activeCategory = "tops";

        }

        else if (event.key === "2") {

            activeCategory = "bottoms";

        }

        else if (event.key === "3") {

            activeCategory = "shoes";

        }

        else if (
            event.key === "ArrowRight"
        ) {

            nextImage(activeCategory);

        }

        else if (
            event.key === "ArrowLeft"
        ) {

            previousImage(activeCategory);

        }

    }
);


/*
=====================================================
INITIAL LOAD
=====================================================
*/

updateImage("tops", false);
updateImage("bottoms", false);
updateImage("shoes", false);