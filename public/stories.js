function renderTemplate(alias, data) {
  switch (alias) {
    case "leaders":
      return leadersTemplate(data);
    case "vote":
      return voteTemplate(data);
    case "chart":
      return chartTemplate(data);
    case "diagram":
      return diagramTemplate(data);
    case "activity":
      return activityTemplate(data);
    default:
      throw new Error(`No template ${alias}`);
  }
}

function headerComponent({ title, subtitle }) {
  return `
  <div class="header">
      <div class="header__title">${title}</div>
      <div class="header__subtitle">${subtitle}</div>
  </div>
  `;
}

function leadersTemplate(data) {
  const { title, subtitle } = data;
  const { users, emoji } = data;
  function userComponent(user, rank, classes, emoji) {
    const { posMod, placeMod, mobileMod } = classes;
    return `
    <div class="leaderboard__leader leaderboard__leader_${placeMod} ${
      mobileMod ? `leaderboard__leader_mobile-${mobileMod}` : ""
    }">
        <div class="leaderboard__leader-avatar">
            ${emoji ? `<span class="emoji-leader">${emoji}</span>` : ""}
            <img class="${posMod ? posMod : ""}" src="/images/1x/${
      user.avatar
    }" alt="фото">
        </div>
        <div class="leaderboard__leader-info leader-info">
            <span class="leader-info__name ${posMod ? posMod : ""}">${
      user.name
    }</span>
            <span class="leader-info__rank ${posMod ? posMod : ""}">${
      user.valueText
    }</span>
        </div>
        <div class="leaderboard__leader-position leaderboard__leader-position_${rank} ${
      posMod ? `leaderboard__leader-position_${posMod}` : ""
    }"><div${
      posMod ? ` class="rank__position_${posMod}"` : ""
    }>${rank}</div></div>
    </div>
    `;
  }
  return `<div class="container container_full-page">
  ${headerComponent({ title, subtitle })}
  <div class="container_over">
      <div class="leaderboard leaderboard__leaders">
        ${userComponent(users[4], 5, {
          placeMod: "last",
          posMod: "left",
          mobileMod: "hidden",
        })}
        ${userComponent(users[2], 3, { placeMod: "secondary", posMod: "left" })}
        ${userComponent(users[0], 1, { placeMod: "main" }, emoji)}
        ${userComponent(users[1], 2, {
          placeMod: "secondary",
          posMod: "right",
        })}
        ${userComponent(users[3], 4, {
          placeMod: "last",
          posMod: "right",
          mobileMod: "hidden",
        })}
      </div>
      </div>
  </div>`;
}
function voteTemplate(data) {
  const { title, subtitle, users: initUsers, likeId, direction = 'next' } = data;
  const users = initUsers.map(user => ({
    ...user, liked: user.id === likeId
  }))
  function voteComponent(user, classes) {
    const { mobileMod } = classes;
    return `
    <div 
    data-action="update" data-params='${JSON.stringify({
      alias: 'vote', data: {likeId: user.id}
    })}'
    class="vote__leader ${mobileMod ? `vote__leader_${mobileMod}` : ""} ${
      user.liked ? 'vote__leader_nice' : "" }">
          <div class="vote__leader-avatar">
            ${user.liked ? `<span class="emoji-leader">👍</span>` : ""}
            <img src="/images/1x/${user.avatar}" alt="Фото" />
          </div>
          <div class="vote__leader-name">${user.name}</div>
        </div>
    `;
  }
  function circleComponent(classes) {
    const { position, color } = classes;
    return `
          <div class="circles__item circles__item_${position}">
          <div 
          data-action="update" data-params='${JSON.stringify({
            alias: 'vote', data: {direction: position === 'down' ? 'next' : 'prev'}
          })}'
          class="circles__clickable"></div>
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path id="circleBtn" fill-rule="evenodd" clip-rule="evenodd" d="M32 62C48.5685 62 62 48.5685 62 32C62 15.4315 48.5685 2 32 2C15.4315 2 2 15.4315 2 32C2 48.5685 15.4315 62 32 62ZM32 64C49.6731 64 64 49.6731 64 32C64 14.3269 49.6731 0 32 0C14.3269 0 0 14.3269 0 32C0 49.6731 14.3269 64 32 64ZM59 32C59 46.9117 46.9117 59 32 59C17.0883 59 5 46.9117 5 32C5 17.0883 17.0883 5 32 5C46.9117 5 59 17.0883 59 32ZM25.0607 27.9393C24.4749 27.3536 23.5251 27.3536 22.9393 27.9393C22.3536 28.5251 22.3536 29.4749 22.9393 30.0607L30.9393 38.0607C31.5251 38.6464 32.4749 38.6464 33.0607 38.0607L41.0607 30.0607C41.6464 29.4749 41.6464 28.5251 41.0607 27.9393C40.4749 27.3536 39.5251 27.3536 38.9393 27.9393L32 34.8787L25.0607 27.9393Z" fill="${color}"/>
              </svg>
          </div>`;
  }
  return `<div class="container">
  ${headerComponent({ title, subtitle })}
  <div class="vote vote__mobile">
      <div class="vote__leaders">
        ${voteComponent(users[0], { mobileMod: "" })}
        ${voteComponent(users[3], { mobileMod: "mobile" })}
        ${voteComponent(users[6], { mobileMod: "mobile" })}
      </div>
      <div class="vote__leaders">
        ${voteComponent(users[1], { mobileMod: "not-mobile", markMode: "nice" })}
        ${voteComponent(users[4], { mobileMod: "not-mobile" })}
      </div>
      <div class="vote__leaders circles circles__mobile">
          ${circleComponent({ position: "up", color: direction === 'prev' ? "#f4b000" : "#BFBFBF" })}
          <div class="vote__leaders">
          ${voteComponent(
            users[1],
            { mobileMod: "mobile", markMode: "nice" },
            
          )}
          ${voteComponent(users[4], { mobileMod: "mobile" })}
        </div>
          ${circleComponent({ position: "down", color: direction === 'next' ? "#f4b000" : "#BFBFBF" })}
      </div>
      <div class="vote__leaders">
        ${voteComponent(users[2], { mobileMod: "not-mobile" })}
        ${voteComponent(users[5], { mobileMod: "not-mobile" })}
      </div>
      <div class="vote__leaders">
        ${voteComponent(users[3], { mobileMod: "not-mobile" })}
        ${voteComponent(users[2], { mobileMod: "mobile" })}
        ${voteComponent(users[5], { mobileMod: "mobile" })}
        ${voteComponent(users[7], { mobileMod: "mobile" })}
      </div>
    </div>
  </div>`;
}
function chartTemplate(data) {
  const { title, subtitle } = data;
  const { values, users } = data;
  const koeff = 0.7; // максимальная высота, доступная для колонки

  function columnComponent(value, classes) {
    const { activeMode } = classes;
    const { percent } = value;
    return `
  <div class="commits__scale">
      <div class="commits__scale-amount ${
        activeMode ? `commits__scale-amount_top` : ""
      }">${value.value === 0 ? "" : value.value}</div>
      <div
      style = "height: ${Math.floor(percent * koeff)}%"
        class="commits__scale-column ${
          activeMode ? `commits__scale-column_top` : ""
        }"
      ></div>
      <div class="commits__scale-date">${value.title}</div>
    </div>`;
  }

  function personComponent(user, classes) {
    const { borderSide, displayMod } = classes;
    return `
  <div class="top-person${
    displayMod ? `_${displayMod}` : ""
  } top-person__mobile ${borderSide ? `border-side` : ""}">
    <div class="top-person__avatar">
      <img src="/images/1x/${user.avatar}" alt="Фото" />
    </div>
    <div class="top-person__info">
      <div class="top-person__info-name">${user.name}</div>
      <div class="top-person__info-quantity">${user.valueText}</div>
    </div>
  </div>`;
  }
  const indexes = [4, 5, 6, 7, 8, 9, 10, 11, 12];
  let maxValue = 0;
  for (let index of indexes) {
    let item = values[index];
    if (maxValue < item.value) {
      maxValue = item.value;
    }
  }
  for (let index of indexes) {
    let item = values[index];
    item.percent = Math.floor((item.value * 100) / maxValue);
    if (item.percent < 3) {
      item.percent = 3;
    }
  }

  return `
<div class="container container_full-page">
  ${headerComponent({ title, subtitle })}
  <div class="commits">
    <div class="commits__scales">
      ${indexes
        .map((index) =>
          columnComponent(values[index], {
            activeMode: !!values[index].active,
          })
        )
        .join("")}
    </div>
  </div>
  <div class="top-persons">
    ${personComponent(users[0], { borderSide: "border-side" })}
    ${personComponent(users[1], "")}
    ${personComponent(users[2], { displayMod: "hidden" })}
  </div>
</div>
`;
}
function diagramTemplate(data) {
  const { title, subtitle } = data;
  const { totalText, differenceText, categories } = data;
  function diagramComponent() {
    let values = [];
    let circleValue = 260;
    let maxValue = parseInt(data.totalText.match(/\d+/));
    let itemValue = 0;
    let percent = 0;
    for (let item of data.categories) {
      itemValue = parseInt(item.valueText.match(/\d+/));
      percent = itemValue / maxValue;
      values.push(percent);
    }
    const deg = [
      Math.floor(values[0] * 360),
      Math.floor((values[0] + values[1]) * 360),
      Math.floor((values[0] + values[1] + values[2]) * 360),
    ];
    return `
  <div class="diagram__circle">
  <svg viewBox="0 0 100 100">
        <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        <stop offset="100%" style="stop-color:brown;stop-opacity:1" />
        </radialGradient>
        <radialGradient id="grad2" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        <stop offset="100%" style="stop-color:red;stop-opacity:1" />
        </radialGradient>
        <radialGradient id="grad3" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        <stop offset="100%" style="stop-color:green;stop-opacity:1" />
        </radialGradient>
        <radialGradient id="grad4" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        <stop offset="100%" style="stop-color:purple;stop-opacity:1" />
        </radialGradient>
      <circle  cx="50" cy="50" r="41" fill="none" stroke-width="15" stroke="url(#grad1)" stroke-dasharray="${
        values[0] * circleValue - 1
      } ${circleValue}" />
      <circle style="transform: rotate(${
        deg[0]
      }deg)" cx="50" cy="50" r="41" fill="none" stroke-width="15" stroke="url(#grad2)" stroke-dasharray="${
      values[1] * circleValue - 1
    } ${circleValue}" />
      <circle style="transform: rotate(${
        deg[1]
      }deg)"  cx="50" cy="50" r="41" fill="none" stroke-width="15" stroke="url(#grad3)" stroke-dasharray="${
      values[2] * circleValue - 1
    } ${circleValue}" />
      <circle style="transform: rotate(${
        deg[2]
      }deg)"  cx="50" cy="50" r="41" fill="none" stroke-width="15" stroke="url(#grad4)" stroke-dasharray="${
      values[3] * circleValue - 1
    } ${circleValue}" />
    </svg>
    </div>`;
  }
  function diagramInfoComponent(totalText, differenceText) {
    return `
  <div class="diagram__info">
      <div class="diagram__info-total">${totalText}</div>
      <div class="diagram__info-advantage">${differenceText}</div>
    </div>`;
  }
  function categoryComponent(category, classes) {
    let { mark } = classes;
    return `
  <div class="statistics__scale">
      <div class="statistics__scale-rank scale-rank">
        <div class="scale-rank__mark scale-rank__${mark}"></div>
        <div class="scale-rank__spot">${category.title}</div>
      </div>
      <div class="statistics__scale-info scale-info">
        <div class="scale-info__addition">${category.differenceText.match(
          /\+\d+/
        )}</div>
        <div class="scale-info__total">${parseInt(category.valueText)}</div>
      </div>
    </div>`;
  }
  return `<div class="container">
${headerComponent({ title, subtitle })}
<div class="diagram-statistics diagram-statistics__distance">
  <div class="diagram">
    ${diagramComponent()}
    ${diagramInfoComponent(totalText, differenceText)}
  </div>
  <div class="statistics">
      ${categoryComponent(categories[0], { mark: "mark_1" })}
      ${categoryComponent(categories[1], { mark: "mark_2" })}
      ${categoryComponent(categories[2], { mark: "mark_3" })}
      ${categoryComponent(categories[3], { mark: "mark_4" })}
  </div>
</div>
</div>`;
}
function activityTemplate(data) {
  function rangeComponent(classes) {
    const { mobileMod } = classes;
    let allValue = [];
    let maxNumber = 0;

    for (let item in daysDictionary) {
      allValue.push(daysDictionary[item]);
    }
    let trueValue = [].concat(...allValue);
    for (let number of trueValue) {
      if (number > maxNumber) {
        maxNumber = number;
      }
    }

    let firstIt = 0;
    let secondSt = firstIt + 1;
    let secondFn = Math.round(maxNumber / 3);
    let thirdSt = secondFn + 1;
    let thirdFn = Math.round(maxNumber / 3) + secondFn;
    let fourthSt = thirdFn + 1;
    let fourthFn = maxNumber;

    return `
  <div class="activity__row ${mobileMod}">
          <div class="activity__colomn">
              <div class="lines">
                  <div class="lines__left"></div>
                  <div class="lines__middle"></div>
                  <div class="lines__right"></div>
              </div>
              <div class="lines__step">${
                mobileMod === "table" ? "1 час" : "2 часа"
              }</div>
          </div>
          <div class="activity__colomn">
              <div class="activity__colomn-block activity__colomn-block_1"></div>
              <div class="activity__colomn-amount">${firstIt}</div>
          </div>
          <div class="activity__colomn">
              <div class="activity__colomn-block activity__colomn-block_2"></div>
              <div class="activity__colomn-amount">${
                secondSt == secondFn ? secondSt : `${secondSt} – ${secondFn}`
              }</div>
          </div>
          <div class="activity__colomn">
              <div class="activity__colomn-block activity__colomn-block_3"></div>
              <div class="activity__colomn-amount">${
                thirdSt == thirdFn ? thirdSt : `${thirdSt} – ${thirdFn}`
              }</div>
          </div>
          <div class="activity__colomn">
              <div class="activity__colomn-block activity__colomn-block_4"></div>
              <div class="activity__colomn-amount">${
                fourthSt == fourthFn ? fourthSt : `${fourthSt} – ${fourthFn}`
              }</div>
          </div>
      </div>`;
  }
  const { title, subtitle, data: daysDictionary } = data;
  const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
  // группировка по часу
  const daysArr = days.map((day) => {
    return daysDictionary[day].map((hour) => {
      let sizeMod = "minimal";
      if (hour > 0) {
        sizeMod = "min";
      }
      if (hour > 2) {
        sizeMod = "max";
      }
      if (hour > 4) {
        sizeMod = "extra";
      }
      return sizeMod;
    });
  });
  // группировка по 2 часа
  const daysArr2 = days.map((day) => {
    const doubleHoursArr = [];
    for (let i = 0; i < 24; i += 2) {
      let sizeMod = "minimal";
      let hour = daysDictionary[day][i] + daysDictionary[day][i + 1];
      if (hour > 0) {
        sizeMod = "min";
      }
      if (hour > 2) {
        sizeMod = "max";
      }
      if (hour > 4) {
        sizeMod = "extra";
      }
      doubleHoursArr.push(sizeMod);
    }
    return doubleHoursArr;
  });

  return `
  <div class="container">
    ${headerComponent({ title, subtitle })}
    <div class="days mobile-hidden">
      ${daysArr2
        .map((day, index) => {
          return `
          <div class="days__day day" style="z-index: ${index}">
            ${day
              .map((sizeMod) => {
                return `
                <div class="day__hour day__hour_${sizeMod}"></div>
              `;
              })
              .join("")}
          </div>
        `;
        })
        .join("")}
    </div>
    <div class="days tablet-hidden">
      ${daysArr
        .map((day, index) => {
          return `
          <div class="days__day day">
            ${day
              .map((sizeMod, index) => {
                return `
                <div class="day__hour day__hour_${sizeMod}" style="z-index: ${index}"></div>
              `;
              })
              .join("")}
          </div>
        `;
        })
        .join("")}
    </div>
  ${rangeComponent({ mobileMod: "table" })}
  ${rangeComponent({ mobileMod: "mobile" })}
  </div>
`;
}
