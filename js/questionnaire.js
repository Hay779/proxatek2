// --- START OF FILE js/questionnaire.js ---

// Variables pour suivre l'état du questionnaire
let currentStep = "accueil";
let currentService = '';
let userResponses = {
  service: '',
  details: {},
  // Les champs de contact seront ajoutés directement à la racine de userResponses
};

// Sélecteurs DOM fréquemment utilisés
const backBtn = document.getElementById('backBtn');
const progressFill = document.getElementById('progressFill');
const step1Label = document.getElementById('step-1-label');
const step2Label = document.getElementById('step-2-label');
const step3Label = document.getElementById('step-3-label');
const questionContainer = document.getElementById('question-container');
const questionnaireHeader = document.getElementById('questionnairePageHeader');
const bottomNavWrapper = document.querySelector('.bottom-navigation-wrapper'); // Sélecteur pour le wrapper du bouton retour

// Historique des étapes pour le bouton retour
let stepHistory = [];

// Fonction pour mettre à jour la barre de progression
function updateProgress(value) {
  const progressFillElement = document.getElementById('progressFill') || document.querySelector('.progress-fill-proxatek');
  if (progressFillElement) {
    progressFillElement.style.width = value + '%';
  }
}

// Fonction pour générer le HTML d'une question
function generateQuestionHTML(stepId, stepConfig) {
  let html = '';
  if (stepConfig.type === 'text' || stepConfig.type === 'email' || stepConfig.type === 'tel') {
    const placeholderText = stepConfig.placeholder || '';
    html = `
      <div class="question-section active">
        <div class="question">${stepConfig.question}</div>
        ${stepConfig.subtitle ? `<div class="subtitle">${stepConfig.subtitle}</div>` : '<div class="subtitle"></div>'}
        <div class="form-input-group">
          <input type="${stepConfig.type}" id="${stepConfig.responseKey}" class="input-field" placeholder="${placeholderText}">
          <div id="${stepConfig.responseKey}Error" class="error-message" style="display: none;">${stepConfig.errorMessage || ''}</div>
          <button id="${stepConfig.responseKey}Btn" class="input-button" type="button">Suivant</button>
        </div>
      </div>
    `;
  } else {
    let choicesHTML = '';
    if (stepConfig.choices) {
        stepConfig.choices.forEach(choice => {
        let iconHTML = choice.icon ? `<i>${choice.icon}</i>` : '';
        choicesHTML += `<button class="choice" data-value="${choice.value}" type="button">${iconHTML}${choice.label}</button>`;
        });
    }
    html = `
      <div class="question-section active">
        <div class="question">${stepConfig.question}</div>
        ${stepConfig.subtitle ? `<div class="subtitle">${stepConfig.subtitle}</div>` : '<div class="subtitle"></div>'}
        <div class="choices">
          ${choicesHTML}
        </div>
      </div>
    `;
  }
  return html;
}

// Fonction pour afficher une étape du questionnaire
function showStep(stepId) {
  currentStep = stepId;
  const stepConfig = questionnaireConfig[stepId];

  if (!stepConfig) {
    console.error(`Configuration de l'étape non trouvée pour: ${stepId}`);
    if(questionContainer) questionContainer.innerHTML = `<div class="error-message" style="display:block; text-align:center; padding:20px;">Configuration d'étape manquante. Veuillez contacter le support.</div>`;
    return;
  }

  const currentProgress = stepConfig.progress || 0;
  updateProgress(currentProgress);

  if (step1Label) step1Label.classList.remove('current');
  if (step2Label) step2Label.classList.remove('current');
  if (step3Label) step3Label.classList.remove('current');

  if (stepId === 'accueil') {
    if (step1Label) step1Label.classList.add('current');
  } else if (currentStep.startsWith("contact-") || stepConfig.nextStep === 'fin') {
    if (step3Label) step3Label.classList.add('current');
  } else {
    if (step2Label) step2Label.classList.add('current');
  }

  if (questionnaireHeader) {
    questionnaireHeader.style.display = (stepId === 'accueil') ? '' : 'none';
  }

  // Gestion de l'affichage du bouton retour et de son wrapper
  if (backBtn && bottomNavWrapper) {
    const isFirstStepOfPreselected = stepHistory.length === 0 && stepId !== 'accueil';
    const shouldShowBackButton = !(stepId === 'accueil' || isFirstStepOfPreselected);

    if (shouldShowBackButton) {
      backBtn.style.display = 'inline-flex'; // Ou 'flex' selon le style .btn
      bottomNavWrapper.style.display = 'block'; // Assurez-vous que le wrapper est visible si le CSS le cache par défaut sur desktop
    } else {
      backBtn.style.display = 'none';
      bottomNavWrapper.style.display = 'none'; // Masque le wrapper également
    }
  }

  if(questionContainer) questionContainer.innerHTML = generateQuestionHTML(stepId, stepConfig);

  // Logique pour les champs input (text, email, tel)
  if (stepConfig.type === 'text' || stepConfig.type === 'email' || stepConfig.type === 'tel') {
    setTimeout(() => {
      const inputField = document.getElementById(stepConfig.responseKey);
      if (inputField) {
        let existingResponse = '';
        if (currentStep.startsWith("contact-")) {
            existingResponse = userResponses[stepConfig.responseKey];
        } else if (currentService && userResponses.details[currentService] && userResponses.details[currentService][stepConfig.responseKey]) {
            existingResponse = userResponses.details[currentService][stepConfig.responseKey];
        }
        if (existingResponse) inputField.value = existingResponse;
        inputField.focus();
      }
    }, 50);

    const proceedButton = document.getElementById(`${stepConfig.responseKey}Btn`);
    const inputElement = document.getElementById(stepConfig.responseKey);
    const validateAndProceed = function() {
      const errorElement = document.getElementById(`${stepConfig.responseKey}Error`);
      let inputValue = inputElement.value.trim();
      let isValid = true;
      const isContactQuestion = currentStep.startsWith("contact-");
      const isRequiredField = isContactQuestion || (stepConfig.type === 'email') || (stepConfig.type === 'tel' && isContactQuestion) || stepConfig.required === true;

      if (isRequiredField && inputValue === '') isValid = false;
      else if (inputValue !== '') {
          if (stepConfig.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputValue)) isValid = false;
          else if (stepConfig.type === 'tel' && !/^[+]?[\d\s()-]{8,}$/.test(inputValue)) isValid = false;
      }

      if (!isValid && isRequiredField) {
        errorElement.textContent = stepConfig.errorMessage || "Ce champ est requis ou le format est incorrect.";
        errorElement.style.display = 'block';
        inputElement.focus();
        return;
      }
      if(errorElement) errorElement.style.display = 'none';

      if (isContactQuestion) userResponses[stepConfig.responseKey] = inputValue;
      else if (currentService) {
        if(!userResponses.details[currentService]) userResponses.details[currentService] = {};
        userResponses.details[currentService][stepConfig.responseKey] = inputValue;
      }
      stepHistory.push(currentStep);
      if (stepConfig.nextStep === 'fin') handleEndOfQuiz();
      else showStep(stepConfig.nextStep);
    };
    if (proceedButton) proceedButton.addEventListener('click', validateAndProceed);
    if (inputElement) inputElement.addEventListener('keypress', function(event) { if (event.key === 'Enter') { event.preventDefault(); if(proceedButton) proceedButton.click();}});
  }
  // Logique pour les choix boutons
  else if (stepConfig.choices) {
    document.querySelectorAll('.choice').forEach(button => {
      button.addEventListener('click', function() {
        const choiceValue = this.getAttribute('data-value');
        if (stepId === 'accueil') {
          currentService = choiceValue;
          userResponses.service = choiceValue;
          userResponses.details[currentService] = {};
        } else if (stepConfig.responseKey && currentService) {
          if (!userResponses.details[currentService]) userResponses.details[currentService] = {};
          userResponses.details[currentService][stepConfig.responseKey] = choiceValue;
        }
        stepHistory.push(currentStep);
        let nextStepValue = (typeof stepConfig.nextStep === 'function') ? stepConfig.nextStep(choiceValue) : stepConfig.nextStep;
        showStep(nextStepValue);
      });
    });
  }
}

// Fonction pour gérer la fin du quiz
function handleEndOfQuiz() {
  updateProgress(100);
  if (step1Label) step1Label.classList.remove('current');
  if (step2Label) step2Label.classList.remove('current');
  if (step3Label) step3Label.classList.add('current');
  console.log('Réponses utilisateur finales:', userResponses);

  if(backBtn) backBtn.style.display = 'none';
  if(bottomNavWrapper) bottomNavWrapper.style.display = 'none'; // Masquer le wrapper aussi
  if (questionnaireHeader) questionnaireHeader.style.display = 'none';

  const confirmationHTML = `
    <div class="confirmation-box">
      <div class="confirmation-icon"><i class="fas fa-check-circle"></i></div>
      <h1>Merci pour votre confiance !</h1>
      <p>Un expert Proxatek vous contactera pour votre projet dans les <span class="highlight">24 heures</span> ouvrées.</p>
      <p>🎁 En attendant, voici votre <span class="highlight">code de réduction de bienvenue de 250 €</span> à mentionner lors de votre échange :</p>
      <div class="code-offre">BIENVENUE250</div>
      <p style="margin-top: 2rem;">📱 Souhaitez-vous recevoir ce code par SMS ?</p>
      <form id="smsForm" class="form-input-group">
        <input type="tel" id="smsPhone" class="input-field" placeholder="Votre numéro de téléphone" value="${userResponses.telephone || ''}">
        <button type="button" id="smsButton" class="input-button">Recevoir le code par SMS</button>
        <div id="smsPhoneError" class="error-message" style="display: none;">Veuillez entrer un numéro de téléphone valide.</div>
      </form>
    </div>
  `;
  if(questionContainer) questionContainer.innerHTML = confirmationHTML;

  setTimeout(() => { const smsPhoneField = document.getElementById('smsPhone'); if (smsPhoneField) smsPhoneField.focus(); }, 50);
  const smsButton = document.getElementById('smsButton');
  const smsPhoneInput = document.getElementById('smsPhone');
  const smsPhoneError = document.getElementById('smsPhoneError');
  if (smsButton && smsPhoneInput && smsPhoneError) {
    smsButton.addEventListener('click', function() {
      const phoneNumber = smsPhoneInput.value.trim();
      if (phoneNumber && /^[+]?[\d\s()-]{8,}$/.test(phoneNumber)) {
        smsPhoneError.style.display = 'none';
        console.log(`Demande d'envoi SMS au ${phoneNumber} avec le code BIENVENUE250`);
        this.textContent = 'Envoyé !'; this.disabled = true; smsPhoneInput.disabled = true;
        setTimeout(() => alert('Le code BIENVENUE250 a été (simulé) envoyé au ' + phoneNumber + '. Un conseiller vous contactera bientôt.'), 500);
      } else {
        smsPhoneError.textContent = "Veuillez entrer un numéro de téléphone valide.";
        smsPhoneError.style.display = 'block'; smsPhoneInput.focus();
      }
    });
    smsPhoneInput.addEventListener('keypress', function(event) { if (event.key === 'Enter') { event.preventDefault(); if(smsButton && !smsButton.disabled) smsButton.click();}});
  }
}

// Fonction pour revenir à l'étape précédente
function goBack() {
  if (stepHistory.length > 0) {
    const previousStepId = stepHistory.pop();
    if (previousStepId === 'accueil') { currentService = ''; userResponses.service = ''; userResponses.details = {}; }
    else if (userResponses.service) { currentService = userResponses.service; }
    showStep(previousStepId);
  }
}

// Initialiser le questionnaire
document.addEventListener('DOMContentLoaded', function() {
  console.log("Questionnaire DOMContentLoaded: Début de l'initialisation.");
  if (typeof questionnaireConfig === 'undefined') {
    console.error("questionnaireConfig n'est pas défini.");
    if (questionContainer) questionContainer.innerHTML = "<p style='color:red;text-align:center;'>Erreur de configuration.</p>";
    return;
  }
  console.log("questionnaireConfig est chargé.");
  const urlParams = new URLSearchParams(window.location.search);
  const preselectedType = urlParams.get('type');
  let initialStep = 'accueil';
  if (preselectedType) {
    let mappedServiceKey = '';
    switch (preselectedType) {
      case 'parc': mappedServiceKey = 'maintenance'; break;
      case 'reseau': mappedServiceKey = 'reseau'; break;
      case 'cybersecurite': mappedServiceKey = 'securite'; break;
      case 'audit': mappedServiceKey = 'audit'; break;
      default: console.warn(`Type pré-sélectionné '${preselectedType}' non mappé.`);
    }
    if (mappedServiceKey && questionnaireConfig[mappedServiceKey + "-1"]) {
      currentService = mappedServiceKey; userResponses.service = mappedServiceKey; initialStep = mappedServiceKey + "-1";
      console.log(`Démarre sur: ${initialStep}`);
    } else if (mappedServiceKey) console.warn(`Étape ${mappedServiceKey + "-1"} non trouvée.`);
  } else console.log("Aucun type pré-sélectionné. Démarre sur l'accueil.");
  showStep(initialStep);
  if (backBtn) backBtn.addEventListener('click', goBack);
  console.log("Questionnaire DOMContentLoaded: Fin de l'initialisation.");
});

// --- END OF FILE js/questionnaire.js ---