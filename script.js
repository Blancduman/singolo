//scroll
document.addEventListener("scroll", onScroll);

const sections = document.querySelectorAll("div.layout > section");
const links = document.querySelectorAll("li.navigation__link a");

function onScroll() {
  const curPos = window.scrollY + 95;
  sections.forEach(el => {
    if (el.offsetTop <= curPos && el.offsetTop + el.offsetHeight > curPos) {
      links.forEach(a => {
        a.parentElement.classList.remove("active");
        if (el.getAttribute("id") === a.getAttribute("href").substring(1)) {
          a.parentElement.classList.add("active");
        }
      });
    }
  });
}

//slider
const multiSlider = (() => {
  const mainElement = document.querySelector(".slider");
  const sliderWrapper = mainElement.querySelector(".slider__wrapper");
  const sliderItems = mainElement.querySelectorAll(".slider__item");
  const wrapperWidth = parseFloat(getComputedStyle(sliderWrapper).width);
  const itemWidth = parseFloat(getComputedStyle(sliderItems[0]).width);
  let positionLeftItem = 0;
  let transform = 0;
  let step = (itemWidth / wrapperWidth) * 100;
  let items = Array.from(sliderItems).map((item, index) => ({
    item: item,
    position: index,
    transform: 0
  }));
  const states = [
    { active: false, minWidth: 0, count: 1 },
    { active: false, minWidth: 980, count: 2 }
  ];

  const _setActive = () => {
    let _index = 0;
    const width = parseFloat(document.body.clientWidth);
    states.forEach((i, index) => {
      states[index].active = false;
      if (width >= states[index].minWidth) _index = index;
    });
    states[_index].active = true;
  };

  const _getActive = () => {
    let _index;
    states.forEach((item, index) => {
      if (states[index].active) _index = index;
    });
    return _index;
  };

  const position = {
    getItemMin: () => {
      let indexItem = 0;
      items.forEach(function(item, index) {
        if (item.position < items[indexItem].position) {
          indexItem = index;
        }
      });
      return indexItem;
    },
    getItemMax: () => {
      let indexItem = 0;
      items.forEach(function(item, index) {
        if (item.position > items[indexItem].position) {
          indexItem = index;
        }
      });
      return indexItem;
    },
    getMin: () => {
      return items[position.getItemMin()].position;
    },
    getMax: function() {
      return items[position.getItemMax()].position;
    }
  };

  const _transformItem = direction => {
    let nextItem;
    if (direction === "right") {
      positionLeftItem++;
      if (positionLeftItem + wrapperWidth / itemWidth - 1 > position.getMax()) {
        nextItem = position.getItemMin();
        items[nextItem].position = position.getMax() + 1;
        items[nextItem].transform += items.length * 100;
        items[nextItem].item.style.transform =
          "translateX(" + items[nextItem].transform + "%)";
      }
      transform -= step;
    }
    if (direction === "left") {
      positionLeftItem--;
      if (positionLeftItem < position.getMin()) {
        nextItem = position.getItemMax();
        items[nextItem].position = position.getMin() - 1;
        items[nextItem].transform -= items.length * 100;
        items[nextItem].item.style.transform =
          "translateX(" + items[nextItem].transform + "%)";
      }
      transform += step;
    }
    sliderWrapper.style.transform = "translateX(" + transform + "%)";
  };

  const _controlClick = e => {
    if (e.target.classList.contains("slider__control--prev")) {
      console.log("left");
      _transformItem("left");
    } else if (e.target.classList.contains("slider__control--next")) {
      console.log("right");
      _transformItem("right");
    }
  };

  const _setUpListeners = () => {
    mainElement.parentElement.addEventListener("click", _controlClick);
    window.addEventListener("resize", () => {
      let _index = 0;
      const width = parseFloat(document.body.clientWidth);
      states.forEach((item, index) => {
        if (width >= states[index].minWidth) _index = index;
      });
      if (_index !== _getActive()) {
        _setActive();
      }
    });
  };

  _setUpListeners();
  _setActive();
})();

const phoneImage = document.querySelectorAll(".phone-image");
const phoneButtons = document.querySelectorAll(".phone > span");

phoneButtons.forEach((i, index) => {
  i.addEventListener("click", e => {
    if (
      phoneImage[index].getAttribute("src") == phoneImage[index].dataset.image
    ) {
      phoneImage[index].setAttribute("src", phoneImage[index].dataset.black);
    } else {
      phoneImage[index].setAttribute("src", phoneImage[index].dataset.image);
    }
  });
});

const works = document.querySelectorAll(".work__image");
const worksContainer = document.querySelector(".work__container");
const tags = document.querySelectorAll(".tag");
const tagsContainer = document.querySelector(".portfolio__tags");

worksContainer.addEventListener("click", event => {
  if (event.target.localName === "img")
    works.forEach(work => {
      if (work === event.target) {
        if (!work.classList.contains("work-selected")) {
          work.classList.add("work-selected");
        } else {
          work.classList.remove("work-selected");
        }
      } else work.classList.remove("work-selected");
    });
});

tagsContainer.addEventListener("click", event => {
  tags.forEach(tag => {
    tag.classList.remove("tag-selected");
    if (tag === event.target) {
      if (!event.target.classList.contains("tag-selected")) {
        tag.classList.add("tag-selected");
        for (let i = worksContainer.children.length; i >= 0; i--) {
          worksContainer.appendChild(
            worksContainer.children[(Math.random() * i) | 0]
          );
        }
      }
    }
  });
});

const modal = document.getElementById("myModal");
const form = document.querySelector("form.contacts-form");
const span = document.getElementsByClassName("close")[0];

form.addEventListener("submit", event => {
  event.preventDefault();
  const [name, email, subject, description] = form;
  const body = modal.querySelectorAll(".modal-body > p");
  if (subject.value !== "") {
    body[0].textContent = `Subject: ${subject.value}`;
  } else {
    body[0].textContent = "No subject";
  }
  if (description.value !== "") {
    body[1].textContent = `Description: ${description.value}`;
  } else {
    body[1].textContent = "No description";
  }
  modal.style.display = "block";
});

span.addEventListener("click", () => {
  form.reset();
  modal.style.display = "none";
});

window.addEventListener("click", event => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});
