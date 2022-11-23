let chatIsOpened = false;

const answeringMachine = (messages) => {
  const chat = document.querySelector(".widget__chat-history");
  const messageIsTyping = document.querySelector(".widget__message-is-typing");
  const userInput = document.querySelector(".widget__message-input");
  let timeoutCounter = 0;

  messages.forEach((message, index) => {
    messageIsTyping.classList.remove("hidden");
    setTimeout(() => {
      messageIsTyping.insertAdjacentHTML(
        "beforebegin",
        operatorMessage(message.text, message.form)
      );
      chat.scrollTop = chat.scrollHeight;
      if (index + 1 === operatorWelcomeMessages.length) {
        message.form
          ? userInput.classList.add("hidden")
          : userInput.classList.remove("widget__message-input--hidden");
        messageIsTyping.classList.add("hidden");
      }
    }, timeoutCounter + message.timeout);
    timeoutCounter += message.timeout;
  });
};

const editUserMessage = () => {
  const message = document.querySelector(".widget__message--user");
  const editButton = document.querySelector("widget__message-edit");

  message.addEventListener("click", (e) => {
    if (e.target.className === "widget__message-edit") {
      const p = message.querySelector(".widget__message-text");
      const text = p.innerHTML;
      p.setAttribute("contenteditable", "true");
      p.focus();
      p;

      p.addEventListener("keydown", (e) => {
        if (e.code === "Enter") {
          if (p.innerHTML === "") {
            p.innerHTML = text;
          }
          p.setAttribute("contenteditable", "false");
        }
      });

      p.addEventListener("focusout", () => {
        if (p.innerHTML === "") {
          p.innerHTML = text;
        }
        p.setAttribute("contenteditable", "false");
      });
    }
  });
};

const sendUserMessage = () => {
  const chat = document.querySelector(".widget__chat-history");
  const messageIsTyping = document.querySelector(".widget__message-is-typing");
  const sendButton = document.querySelector(".widget__message-send");
  const input = document.querySelector(".widget__message-input input");

  sendButton.addEventListener("click", () => {
    if (input.value) {
      messageIsTyping.insertAdjacentHTML(
        "beforebegin",
        userMessage(input.value)
      );
      answeringMachine(operatorAnswerMessages);
      input.value = "";
      editUserMessage();
    }
  });
  input.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
      if (input.value) {
        messageIsTyping.insertAdjacentHTML(
          "beforebegin",
          userMessage(input.value)
        );
        answeringMachine(operatorAnswerMessages);
        input.value = "";
        editUserMessage();
      }
    }
  });
};

const menu = () => {
  const call = document.getElementById("call");
  const chat = document.getElementById("chat");
  const callContent = document.getElementById("callContent");
  const chatContent = document.getElementById("chatContent");
  const footer = document.getElementById("footer");
  const backToChat = document.getElementById("backToChat");

  const closeAll = () => {
    call.classList.remove("open");
    chat.classList.remove("open");
    call.classList.remove("hidden");
    chat.classList.remove("hidden");
    callContent.classList.add("hidden");
    chatContent.classList.add("hidden");
    footer.classList.add("hidden");
  };

  const openMenu = (openRow, closeRow, openContent) => {
    if (openRow.classList.contains("open")) {
      closeAll();
    } else {
      openRow.classList.add("open");
      closeRow.classList.add("hidden");
      openContent.classList.remove("hidden");
      footer.classList.remove("hidden");
    }
  };

  call.addEventListener("click", () => {
    openMenu(call, chat, callContent);
  });

  chat.addEventListener("click", () => {
    openMenu(chat, call, chatContent);
    if (!chatIsOpened) {
      answeringMachine(operatorWelcomeMessages);
      chatIsOpened = true;
      backToChat.classList.remove("hidden");
    }
  });

  backToChat.addEventListener("click", () => {
    closeAll();
    openMenu(chat, call, chatContent);
  });
};

const colors = () => {
  const r = document.querySelector(":root");
  Object.keys(colorPalette).map((variable) => {
    r.style.setProperty(`--${variable}`, colorPalette[variable]);
  });
};

const position = () => {
  const widget = document.querySelector(".widget");
  const isMobile = window.innerWidth < 460;

  if (isMobile) return;

  Object.keys(positionValues).map((property) => {
    widget.style.setProperty(property, positionValues[property]);
  });
};

const titles = () => {
  const callTitle = document.querySelector(
    ".widget__row--call .widget__row-name"
  );
  const callDescription = document.querySelector(
    ".widget__row--call .widget__row-description"
  );
  const chatTitle = document.querySelector(
    ".widget__row--chat .widget__row-name"
  );
  const chatDescription = document.querySelector(
    ".widget__row--chat .widget__row-description"
  );

  callTitle.innerHTML = texts.callTitle;
  callDescription.innerHTML = texts.callDescription;
  chatTitle.innerHTML = texts.chatTitle;
  chatDescription.innerHTML = texts.chatDescription;
};

const operatorMessage = (message, withForm) => {
  const now = new Date().toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (withForm) {
    return `
	<div class="widget__message widget__message--operator widget__message--form">
		<div class="widget__message-text">
			<p>${message}</p>
			<form>
			<input type="tel" placeholder="Телефон *" required />
			<input type="text" placeholder="Имя" />
			<button>Ответить</button>
			</form>
      <svg class="chat-arrow" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" shape-rendering="geometricPrecision" text-rendering="geometricPrecision"><path d="M12.48641,2.86123c-.137231,7.40254-2.334071,8.514395-7.897,10.30043" transform="matrix(.978148 0.207912-.207912 0.978148 3.077987-2.138515)" fill="none" stroke="var(--border)" stroke-width="0.5"/><path d="M17.742752,8.063182C15.25045,12.341268,8.766228,16.660439,4.58941,12.81958" transform="matrix(.978148 0.207912-.207912 0.978148 2.81636-1.847575)" fill="none" stroke="var(--border)" stroke-width="0.5"/><path d="M15.118741,3.256261C13.243681,9.686808,12.740035,11.237498,5.629051,12c1.970767,2.254561,7.11808,2.848809,12.216937-2.271667-.778292-5.176701-.128161.338544-2.727247-6.472072Z" transform="translate(.000001 0)" fill="#f9f9f9" stroke="#f9f9f9" stroke-width="0.5"/></svg>
		</div>
		<span class="widget__message-sent">Отправлено в ${now}</span>
	</div>
	`;
  }

  return `
	<div class="widget__message widget__message--operator">
		<p class="widget__message-text">
      ${message}
      <svg class="chat-arrow" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" shape-rendering="geometricPrecision" text-rendering="geometricPrecision"><path d="M12.48641,2.86123c-.137231,7.40254-2.334071,8.514395-7.897,10.30043" transform="matrix(.978148 0.207912-.207912 0.978148 3.077987-2.138515)" fill="none" stroke="var(--border)" stroke-width="0.5"/><path d="M17.742752,8.063182C15.25045,12.341268,8.766228,16.660439,4.58941,12.81958" transform="matrix(.978148 0.207912-.207912 0.978148 2.81636-1.847575)" fill="none" stroke="var(--border)" stroke-width="0.5"/><path d="M15.118741,3.256261C13.243681,9.686808,12.740035,11.237498,5.629051,12c1.970767,2.254561,7.11808,2.848809,12.216937-2.271667-.778292-5.176701-.128161.338544-2.727247-6.472072Z" transform="translate(.000001 0)" fill="#f9f9f9" stroke="#f9f9f9" stroke-width="0.5"/></svg>
    </p>
		<span class="widget__message-sent">Отправлено в ${now}</span>
	</div>
		`;
};

const userMessage = (message) => {
  return `<div class="widget__message widget__message--user">
  <p class="widget__message-text" contenteditable="false">
    ${message}
    <svg class="chat-arrow" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" shape-rendering="geometricPrecision" text-rendering="geometricPrecision"><path d="M12.48641,2.86123c-.137231,7.40254-2.334071,8.514395-7.897,10.30043" transform="matrix(.978148 0.207912-.207912 0.978148 3.077987-2.138515)" fill="none" stroke="var(--border)" stroke-width="0.5"/><path d="M17.742752,8.063182C15.25045,12.341268,8.766228,16.660439,4.58941,12.81958" transform="matrix(.978148 0.207912-.207912 0.978148 2.81636-1.847575)" fill="none" stroke="var(--border)" stroke-width="0.5"/><path d="M15.118741,3.256261C13.243681,9.686808,12.740035,11.237498,5.629051,12c1.970767,2.254561,7.11808,2.848809,12.216937-2.271667-.778292-5.176701-.128161.338544-2.727247-6.472072Z" transform="translate(.000001 0)" fill="#f9f9f9" stroke="#f9f9f9" stroke-width="0.5"/></svg>
  </p>
  <button class="widget__message-edit">
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 512.005 512.005"
      xml:space="preserve"
    >
      <g>
        <g>
          <g>
            <rect
              x="6.848"
              y="483.502"
              transform="matrix(-0.7071 -0.7071 0.7071 -0.7071 -325.9751 857.8331)"
              width="15.655"
              height="25.853"
              style="fill: currentColor"
            />

            <rect
              x="479.108"
              y="125.251"
              transform="matrix(-0.7071 -0.7071 0.7071 -0.7071 736.5913 572.8429)"
              width="15.654"
              height="17.235"
              style="fill: currentColor"
            />
            <path
              style="fill: currentColor"
              d="M504.677,91.749c-2.354-2.352-5.066-4.128-7.958-5.348l13.493-13.493L438.203,0.901L244.316,194.787l6.094,6.094
				L67.596,383.695l6.094,6.094l-42.657,42.657l18.281,18.281L24.38,475.662l11.069,11.069l24.934-24.934l18.281,18.281
				l42.657-42.657l6.094,6.094l182.815-182.815l6.094,6.094l163.096-163.097l0.879-0.879c1.776-1.777,4.139-2.755,6.653-2.755
				c2.513,0,4.876,0.979,6.653,2.755c3.669,3.669,3.669,9.636,0,13.305l11.071,11.07
				C514.448,117.423,514.448,101.522,504.677,91.749z M78.665,457.939l-25.493-25.493l31.588-31.587l25.493,25.493L78.665,457.939z
				 M127.417,421.376l-37.681-37.681l13.305-13.305l37.681,37.681L127.417,421.376z M151.791,397.001l-37.681-37.681l147.371-147.37
				l37.68,37.68L151.791,397.001z M316.326,244.655l-49.868-49.868l13.305-13.305l49.868,49.868L316.326,244.655z M340.7,220.279
				l-49.868-49.869L413.827,47.417l49.868,49.868L340.7,220.279z M474.766,86.215l-49.868-49.869l13.305-13.305l49.868,49.868
				L474.766,86.215z"
            />
            <polygon
              style="fill: currentColor"
              points="469.23,140.501 354.006,255.724 371.728,273.447 382.799,262.377 376.146,255.724 480.3,151.57 			"
            />
          </g>
        </g>
      </g>
    </svg>
    Редактировать
  </button>
</div>`;
};

const setOperatorAvatar = () => {
  const avatar = document.getElementById("operatorAvatar");
  if (operatorAvatarSrc) {
    avatar.style.backgroundImage = `url(${operatorAvatarSrc})`;
  }
};

const showWidget = () => {
  const widget = document.querySelector(".widget__hidden");
  const isMobile = window.innerWidth < 460;

  setTimeout(
    () => {
      widget.classList.remove("widget__hidden");
    },
    isMobile ? firstShowingTimeoutMobile : firstShowingTimeout
  );
};

menu();
colors();
position();
titles();
setOperatorAvatar();
sendUserMessage();
showWidget();
