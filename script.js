const monthYear = document.getElementById("monthYear");

const calendarDays = document.querySelector(".calendar-days");

const calendarDates = document.querySelector(".calendar-dates");

const prevMonthBtn = document.getElementById("prevMonth");

const nextMonthBtn = document.getElementById("nextMonth");

const eventModal = document.getElementById("eventModal");

const closeModalBtn = document.querySelector(".close-btn");

const eventDateInput = document.getElementById("eventDate");

const eventTitleInput = document.getElementById("eventTitle");

const saveEventBtn = document.getElementById("saveEvent");

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let currentDate = new Date();

let events = {};  // Store events in an object

// Render calendar

function renderCalendar(date) {

  calendarDates.innerHTML = "";

  calendarDays.innerHTML = daysOfWeek.map(day => `<div>${day}</div>`).join("");

  const year = date.getFullYear();

  const month = date.getMonth();

  monthYear.textContent = `${months[month]} ${year}`;

  const firstDay = new Date(year, month, 1);

  const lastDay = new Date(year, month + 1, 0);

  const firstDayIndex = firstDay.getDay();

  const lastDate = lastDay.getDate();

  // Previous month's days

  const prevMonthDays = new Date(year, month, 0).getDate();

  for (let i = firstDayIndex; i > 0; i--) {

    createDayElement(prevMonthDays - i + 1, "inactive");

  }

  // Current month's days

  for (let i = 1; i <= lastDate; i++) {

    const dateStr = `${year}-${month + 1}-${i}`;

    const dayElement = createDayElement(i);

    if (events[dateStr]) {

      dayElement.classList.add("event-day");

    }

    dayElement.addEventListener("click", () => openEventModal(dateStr));

  }

}

// Create day elements

function createDayElement(day, extraClass = "") {

  const dayElement = document.createElement("div");

  dayElement.textContent = day;

  if (extraClass) dayElement.classList.add(extraClass);

  calendarDates.appendChild(dayElement);

  return dayElement;

}

// Open modal to add event

function openEventModal(dateStr) {

  eventDateInput.value = dateStr;

  eventTitleInput.value = events[dateStr] || "";

  eventModal.style.display = "flex";

}

// Close modal

closeModalBtn.addEventListener("click", () => {

  eventModal.style.display = "none";

});

// Save event

saveEventBtn.addEventListener("click", () => {

  const dateStr = eventDateInput.value;

  const eventTitle = eventTitleInput.value.trim();

  if (eventTitle) {

    events[dateStr] = eventTitle;

    renderCalendar(currentDate);

  } else {

    delete events[dateStr]; // Remove event if title is empty

  }

  eventModal.style.display = "none";

});

// Navigate months

prevMonthBtn.addEventListener("click", () => {

  currentDate.setMonth(currentDate.getMonth() - 1);

  renderCalendar(currentDate);

});

nextMonthBtn.addEventListener("click", () => {

  currentDate.setMonth(currentDate.getMonth() + 1);

  renderCalendar(currentDate);

});

// Initial render

renderCalendar(currentDate);