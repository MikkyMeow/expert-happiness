// Цветовая палитра
const colorPalette = {
  main: "#ad5a54",
  mainHover: "#9b524c",
  content: "#ffffff",
  titleColor: "#ffffff",
  border: "#c0c0c0",
  textPrimary: "#000000",
  textSecondary: "#c0c0c0",
  grey: "#888888",
};

// Позиционирование виджета
const positionValues = {
  right: "20px",
  bottom: "0",
};

// Текста для заголовков
const texts = {
  callTitle: "Закажите звонок!",
  callDescription: "Мы перезвоним в свободное время.",
  chatTitle: "Консультант по сложным вопросам",
  chatDescription: "Бесплатная консультация",
};

// Ссылка на аватар
const operatorAvatarSrc =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0S8w4fbLmPZHi_EFCPtwJtEqVpEhQGDiGJA&usqp=CAU";

// Приветственный сообщения оператора
const operatorWelcomeMessages = [
  {
    text: "Здравствуйте! У Вас есть вопрос или Вам нужна помощь?",
    timeout: 2000,
  },
  {
    text: "Напишите, что Вас интересует, и я Вам обязательно помогу.",
    timeout: 2000,
  },
];

// Ответ оператора на сообщение юзера
const operatorAnswerMessages = [
  {
    text: "Давайте я Вам отвечу детально по телефону",
    timeout: 2000,
  },
  {
    text: "Оставьте свои контактные данные и мы ответим на Ваш вопрос.",
    timeout: 2000,
    form: true,
  },
];

// Таймаут всплытия при загрузке страницы
const firstShowingTimeout = 1000;

// Таймаут всплытия для мобильных устройств
const firstShowingTimeoutMobile = 3000;
