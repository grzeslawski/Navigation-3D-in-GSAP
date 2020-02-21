const tab = document.querySelector(".tab");
const items = document.querySelectorAll(".tab__item");
const itemsParent = document.querySelector(".tab__items");
const indicator = document.querySelector(".tab__indicator");

TweenMax.set(tab, {
  transformPerspective: 300,
  transformOrigin: "center center"
});

const getActiveTabIndex = () => {
  return Array.from(items).findIndex(item =>
    item.classList.contains("tab__item--active")
  );
};

const getIndicatorPosition = () => {
  const { x: tabX } = tab.getBoundingClientRect();
  const { width: itemWidth, x: itemX } = items[
    getActiveTabIndex()
  ].getBoundingClientRect();
  const { width: indicatorWidth } = indicator.getBoundingClientRect();

  const indicatorPosition = itemX + itemWidth / 2 - indicatorWidth / 2 - tabX;

  return indicatorPosition;
};

const setIndicatorPosition = () => {
  TweenMax.set(indicator, { x: getIndicatorPosition() });
};

const tilt = e => {
  if (e.target.classList.contains("tab__item")) {
    const pageX = e.pageX ? e.pageX : e.touches[0].pageX;
    const rotate = pageX - window.innerWidth / 2;

    TweenMax.to(e.target, 0.2, { scale: 0.8, ease: "Power4.easeOut" });
    TweenMax.to(tab, 0.2, {
      rotationY: 0.05 * rotate,
      rotationX: -Math.abs(0.015 * rotate),
      rotationZ: -0.1
    });
  }
};

const activateTab = e => {
  if (e.target.classList.contains("tab__item")) {
    items.forEach(item => item.classList.remove("tab__item--active"));
    e.target.classList.add("tab__item--active");

    TweenMax.to(e.target, 0.2, { scale: 1, ease: Back.easeOut.config(4) });
    TweenMax.to(indicator, 0.5, { x: getIndicatorPosition() });
    TweenMax.to(tab, 0.2, { rotationY: 0, rotationX: 0, rotationZ: 0 });
  }
};

setIndicatorPosition();

itemsParent.addEventListener("mousedown", tilt);
itemsParent.addEventListener("tauchstart", tilt);

itemsParent.addEventListener("mouseup", activateTab);
itemsParent.addEventListener("tauchend", activateTab);

window.addEventListener("resize", setIndicatorPosition);
