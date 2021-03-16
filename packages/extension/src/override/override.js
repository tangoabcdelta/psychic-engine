$(function() {
  $("#bookmarks").text("....");

  // const { m, day, date, hours } = UTILS.getCurrentTime();
  // $("#greetings").text(UTILS.getGreetingTime(m));

  // const position = await navigator.geolocation.getCurrentPosition();
  const positionCallback = (position) =>
    $("#location").text(
      `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`
    );

  (navigator.geolocation &&
    navigator.geolocation.getCurrentPosition(positionCallback)) ||
    $("#location").text(`Geolocation is not supported by this browser.`);
});

$(function() {
  const res = document.querySelectorAll("#Result");
  const equal = Array.from(document.querySelectorAll(".equal"));
  const total = Array.from(document.querySelectorAll(".cal_total"));

  var result;

  function del() {
    res.value = "";
  }

  function num(n) {
    res.value += n;
  }

  function eq() {
    result = eval(res.value);
    res.value = result;
  }

  const calc = () => {
    result = eval(res.value);
    res.value = result;
  };

  equal.map((item) => {
    item.addEventListener("click", calc, false);
  });
  total.map((item) => {
    item.addEventListener("click", calc, false);
  });
});
