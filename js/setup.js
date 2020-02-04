'use strict';

var WIZARD_NAMES = [' Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES = ['black', 'red', 'blue', 'yellow', 'green'];
var FIRE_BALL = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var WIZARDS_NUMBER = 4;
var ESC_KEY = 'Escape';
var MIN_NAME_LENGTH = 2;
var MAX_NAME_LENGTH = 25;
var userDialog = document.querySelector('.setup');
var userNameInput = document.querySelector('.setup-user-name');

// открываем-закрываем
var setupOpen = document.querySelector('.setup-open-icon');
var setupClose = document.querySelector('.setup-close');

var onPopupEscPress = function (evt) {
  if (userNameInput === document.activeElement) {
    return evt;
  } else {
    if (evt.key === ESC_KEY) {
      closePopup();
    }
  }
};

var openPopup = function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    closePopup();
  }
});


// меняем цвета мантии, глаз, файербола
var setupWizard = document.querySelector('.setup-wizard')
  .querySelector('.wizard');
var setupFireball = document.querySelector('.setup-fireball-wrap');

var randomColor = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

var wizardCoat = setupWizard.querySelector('.wizard-coat');
wizardCoat.addEventListener('click', function () {
  wizardCoat.style.fill = COAT[randomColor(0, COAT.length)];
  var coatFill = wizardCoat.style.fill;
  document.querySelector('[name=coat-color]').value = coatFill;
});

var wizardEyes = setupWizard.querySelector('.wizard-eyes');
wizardEyes.addEventListener('click', function () {
  wizardEyes.style.fill = EYES[randomColor(0, EYES.length)];
  var eyesFill = wizardEyes.style.fill;
  document.querySelector('[name=eyes-color]').value = eyesFill;
});


setupFireball.addEventListener('click', function () {
  setupFireball.style.background = FIRE_BALL[randomColor(0, FIRE_BALL.length)];
  var fireballBack = setupFireball.style.background;
  document.querySelector('[name=fireball-color]').value = fireballBack;
});

// валидация
userNameInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < MIN_NAME_LENGTH) {
    target.setCustomValidity('Имя должно содержать не менее ' + MIN_NAME_LENGTH + '-х символов');
  } else {
    target.setCustomValidity('');
  }
});

userNameInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length >= MAX_NAME_LENGTH) {
    target.setCustomValidity('Имя должно содержать не более ' + MAX_NAME_LENGTH + '-х символов');
  } else {
    target.setCustomValidity('');
  }
});

userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Пожалуйста, заполните обязательное поле!');
  } else {
    userNameInput.setCustomValidity('');
  }
});


document.querySelector('.setup-similar').classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var createWizard = function (length) {
  var arr = [];
  for (var i = 0; i <= length - 1; i++) {
    arr.push({
      name: WIZARD_NAMES[(Math.floor(Math.random() * (WIZARD_NAMES.length)))] + ' ' + WIZARD_SURNAMES[(Math.floor(Math.random() * (WIZARD_SURNAMES.length)))],
      coatColor: COAT[(Math.floor(Math.random() * (COAT.length)))],
      eyesColor: EYES[(Math.floor(Math.random() * (EYES.length)))]
    }
    );
  }
  return arr;
};

var wizards = createWizard(WIZARDS_NUMBER);
var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

var fragment = document.createDocumentFragment();

for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
