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

  const SEUIL_FIN_UTILISATEUR = 60; // Ajusté pour que les questions de service soient en phase 2
  const SEUIL_DEBUT_DEVIS = 70;

  if (stepId === 'accueil') {
    if (step1Label) step1Label.classList.add('current');
  } else if (stepConfig.nextStep === 'fin' || currentStep.startsWith("contact-")) {
    if (step3Label) step3Label.classList.add('current');
    if (step2Label && currentProgress < SEUIL_DEBUT_DEVIS) step2Label.classList.add('current'); // Garder étape 2 active si on n'est pas encore aux questions de contact
    if (step1Label && currentProgress < SEUIL_FIN_UTILISATEUR) step1Label.classList.add('current'); // Garder étape 1 active si on n'est pas encore à la fin des questions de service
  } else if (currentService && (stepConfig.responseKey || stepConfig.choices)) {
    if (currentProgress >= 0 && currentProgress < SEUIL_FIN_UTILISATEUR) { // Questions de service
      if (step2Label) step2Label.classList.add('current');
      if (step1Label) step1Label.classList.remove('current'); // Étape 1 est passée
    } else if (currentProgress >= SEUIL_FIN_UTILISATEUR && currentProgress < SEUIL_DEBUT_DEVIS) { // Normalement pas atteint si contact- commence à 70
      if (step2Label) step2Label.classList.add('current');
    }
  } else {
      if (step1Label) step1Label.classList.add('current'); // Fallback (devrait être l'accueil)
  }

  // Affichage bouton retour
  if(backBtn) {
    // On cache le bouton retour si on est à l'accueil OU si on est sur la première question d'un parcours pré-sélectionné
    const isFirstStepOfPreselected = stepHistory.length === 0 && stepId !== 'accueil';
    backBtn.style.display = (stepId === 'accueil' || isFirstStepOfPreselected) ? 'none' : 'flex';
  }


  if(questionContainer) questionContainer.innerHTML = generateQuestionHTML(stepId, stepConfig);

  if (stepConfig.type === 'text' || stepConfig.type === 'email' || stepConfig.type === 'tel') {
    setTimeout(() => {
      const inputField = document.getElementById(stepConfig.responseKey);
      if (inputField) {
        let existingResponse = '';
        if (currentStep.startsWith("contact-")) {
            existingResponse = userResponses[stepConfig.responseKey];
        } else if (currentService && userResponses.details[currentService] && userResponses.details[currentService][stepConfig.responseKey]) {
            existingResponse = userResponses.details[currentService][stepConfig.responseKey];
        } else if(userResponses[stepConfig.responseKey]) { // Pour les cas où responseKey n'est pas dans details (peu probable ici)
            existingResponse = userResponses[stepConfig.responseKey];
        }

        if (existingResponse) {
          inputField.value = existingResponse;
        }
        inputField.focus();
      }
    }, 50);
  }

  if (stepConfig.type === 'text' || stepConfig.type === 'email' || stepConfig.type === 'tel') {
    const proceedButton = document.getElementById(`${stepConfig.responseKey}Btn`);
    const inputElement = document.getElementById(stepConfig.responseKey);

    const validateAndProceed = function() {
      const errorElement = document.getElementById(`${stepConfig.responseKey}Error`);
      let inputValue = inputElement.value.trim();
      let isValid = true;

      const isContactQuestion = currentStep.startsWith("contact-");
      // Définir quels champs sont requis. Ex: tous les champs contact, ou certains champs de service.
      const isRequiredField = isContactQuestion ||
                              (stepConfig.type === 'email') || // Email toujours requis
                              (stepConfig.type === 'tel' && isContactQuestion) || // Tel requis seulement si c'est une question de contact
                              stepConfig.required === true; // Si une question de service texte est marquée comme requise

      if (isRequiredField && inputValue === '') {
          isValid = false;
      } else if (inputValue !== '') { // Validation de format seulement si non vide
          if (stepConfig.type === 'email') {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(inputValue)) isValid = false;
          } else if (stepConfig.type === 'tel') {
            const telPattern = /^[+]?[\d\s()-]{8,}$/; // Accepte chiffres, espaces, (), -, et + au début, min 8 chiffres
            if (!telPattern.test(inputValue)) isValid = false;
          }
      }

      if (!isValid && isRequiredField) {
        errorElement.textContent = stepConfig.errorMessage || "Ce champ est requis ou le format est incorrect.";
        errorElement.style.display = 'block';
        inputElement.focus();
        return;
      }

      if(errorElement) errorElement.style.display = 'none';

      if (isContactQuestion) {
        userResponses[stepConfig.responseKey] = inputValue;
      } else if (currentService) {
        if(!userResponses.details[currentService]) userResponses.details[currentService] = {};
        userResponses.details[currentService][stepConfig.responseKey] = inputValue;
      } else { // Ne devrait pas arriver si currentService est bien géré
          userResponses[stepConfig.responseKey] = inputValue;
      }

      stepHistory.push(currentStep);

      if (stepConfig.nextStep === 'fin') {
        handleEndOfQuiz();
      } else {
        showStep(stepConfig.nextStep);
      }
    };

    if (proceedButton) proceedButton.addEventListener('click', validateAndProceed);
    if (inputElement) inputElement.addEventListener('keypress', function(event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        if(proceedButton) proceedButton.click();
      }
    });

  } else if (stepConfig.choices) {
    document.querySelectorAll('.choice').forEach(button => {
      button.addEventListener('click', function() {
        const choiceValue = this.getAttribute('data-value');

        if (stepId === 'accueil') {
          currentService = choiceValue;
          userResponses.service = choiceValue;
          // Réinitialiser les détails pour ce service si on revient à l'accueil et choisit un nouveau service
          userResponses.details[currentService] = {};
        } else if (stepConfig.responseKey && currentService) {
          if (!userResponses.details[currentService]) { // Assure que l'objet details existe pour le service
            userResponses.details[currentService] = {};
          }
          userResponses.details[currentService][stepConfig.responseKey] = choiceValue;
        } else if (stepConfig.responseKey) { // Pour des questions hors service (peu probable ici)
            userResponses[stepConfig.responseKey] = choiceValue;
        }

        stepHistory.push(currentStep);

        let nextStepValue;
        if (typeof stepConfig.nextStep === 'function') {
          nextStepValue = stepConfig.nextStep(choiceValue);
        } else {
          nextStepValue = stepConfig.nextStep;
        }

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

  setTimeout(() => {
    const smsPhoneField = document.getElementById('smsPhone');
    if (smsPhoneField) smsPhoneField.focus();
  }, 50);

  const smsButton = document.getElementById('smsButton');
  const smsPhoneInput = document.getElementById('smsPhone');
  const smsPhoneError = document.getElementById('smsPhoneError');


  if (smsButton && smsPhoneInput && smsPhoneError) {
    smsButton.addEventListener('click', function() {
      const phoneNumber = smsPhoneInput.value.trim();
      const telPattern = /^[+]?[\d\s()-]{8,}$/;
      if (phoneNumber && telPattern.test(phoneNumber)) {
        smsPhoneError.style.display = 'none';
        console.log(`Demande d'envoi SMS au ${phoneNumber} avec le code BIENVENUE250`);

        // Simulation de l'appel API
        // Remplacez ceci par votre véritable appel API
        // fetch('VOTRE_ENDPOINT_SMS', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ phoneNumber: phoneNumber, code: 'BIENVENUE250', responses: userResponses })
        // })
        // .then(response => response.json())
        // .then(data => {
        //   console.log('Réponse API SMS:', data);
        //   this.textContent = 'Envoyé !';
        //   this.disabled = true;
        //   smsPhoneInput.disabled = true;
        //   // Afficher un message de succès plus persistant si nécessaire
        // })
        // .catch(error => {
        //   console.error('Erreur API SMS:', error);
        //   smsPhoneError.textContent = "Erreur lors de l'envoi du SMS. Veuillez réessayer.";
        //   smsPhoneError.style.display = 'block';
        // });

        // Simulation (à remplacer par un vrai appel API)
        this.textContent = 'Envoyé !';
        this.disabled = true;
        smsPhoneInput.disabled = true;
        setTimeout(() => {
          alert('Le code BIENVENUE250 a été (simulé) envoyé au ' + phoneNumber + '. Un conseiller vous contactera bientôt.');
        }, 500);


      } else {
        smsPhoneError.textContent = "Veuillez entrer un numéro de téléphone valide.";
        smsPhoneError.style.display = 'block';
        smsPhoneInput.focus();
      }
    });

    smsPhoneInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
          event.preventDefault();
          if(smsButton && !smsButton.disabled) smsButton.click();
        }
    });
  }
}

// Fonction pour revenir à l'étape précédente
function goBack() {
  if (stepHistory.length > 0) {
    const previousStepId = stepHistory.pop();

    // Si on revient à l'accueil, réinitialiser le service et les détails
    if (previousStepId === 'accueil') {
        currentService = ''; // Réinitialiser le service en cours
        userResponses.service = ''; // Effacer le service sélectionné des réponses
        userResponses.details = {}; // Effacer tous les détails de service
    } else {
        // Si on revient à une question de service (ex: maintenance-2 vers maintenance-1)
        // currentService devrait déjà être correctement défini par userResponses.service
        // et on ne veut pas le réinitialiser, seulement afficher l'étape précédente.
        // Si on revient d'une question de contact vers une question de service, currentService est aussi déjà bon.
        if (userResponses.service) {
            currentService = userResponses.service;
        }
    }
    showStep(previousStepId);
  }
}

// Initialiser le questionnaire (UNIQUE BLOC DOMContentLoaded)
document.addEventListener('DOMContentLoaded', function() {
  console.log("Questionnaire DOMContentLoaded: Début de l'initialisation.");

  if (typeof questionnaireConfig === 'undefined') {
    console.error("questionnaireConfig n'est pas défini. Vérifiez que config.js est chargé et correct.");
    if (questionContainer) questionContainer.innerHTML = "<p style='color:red;text-align:center;'>Erreur de configuration du questionnaire.</p>";
    return;
  }
  console.log("questionnaireConfig est chargé.");

  const urlParams = new URLSearchParams(window.location.search);
  const preselectedType = urlParams.get('type');
  console.log("Paramètre 'type' de l'URL:", preselectedType);

  let initialStep = 'accueil'; // Étape par défaut

  if (preselectedType) {
    let mappedServiceKey = '';
    console.log(`Traitement du type pré-sélectionné: '${preselectedType}'`);

    switch (preselectedType) {
      case 'parc':
        mappedServiceKey = 'maintenance';
        console.log(`Type 'parc' mappé à '${mappedServiceKey}'`);
        break;
      case 'reseau':
        mappedServiceKey = 'reseau';
        console.log(`Type 'reseau' mappé à '${mappedServiceKey}'`);
        break;
      case 'cybersecurite': // Note: le questionnaire utilise 'securite' comme clé interne
        mappedServiceKey = 'securite';
        console.log(`Type 'cybersecurite' mappé à '${mappedServiceKey}'`);
        break;
      case 'audit': // Nouveau cas pour le type audit
        mappedServiceKey = 'audit';
        console.log(`Type 'audit' mappé à '${mappedServiceKey}'`);
        break;
      // Vous pouvez ajouter d'autres cas pour d'autres 'type' si besoin
      default:
        console.warn(`Type pré-sélectionné '${preselectedType}' n'a pas de mapping défini dans le switch.`);
    }

    if (mappedServiceKey && questionnaireConfig[mappedServiceKey + "-1"]) {
      console.log(`Service mappé '${mappedServiceKey}' trouvé. L'étape initiale sera '${mappedServiceKey + "-1"}'`);
      currentService = mappedServiceKey;
      userResponses.service = mappedServiceKey;
      // Ne pas ajouter 'accueil' à l'historique si on démarre directement sur une sous-question
      // stepHistory.push('accueil'); // Cette ligne est commentée intentionnellement
      initialStep = mappedServiceKey + "-1";
    } else {
      if (!mappedServiceKey && preselectedType) {
        console.warn(`Aucun mappedServiceKey pour le type '${preselectedType}'. Affichage de l'accueil.`);
      } else if (mappedServiceKey) {
        console.warn(`Étape initiale '${mappedServiceKey + "-1"}' non trouvée dans questionnaireConfig pour le type '${preselectedType}'. Affichage de l'accueil.`);
      }
    }
  } else {
    console.log("Aucun paramètre 'type' dans l'URL. Affichage de l'accueil par défaut.");
  }

  console.log("Appel de showStep avec initialStep:", initialStep);
  showStep(initialStep);

  if (backBtn) {
      backBtn.addEventListener('click', goBack);
  }
  console.log("Questionnaire DOMContentLoaded: Fin de l'initialisation.");
});

// --- END OF FILE js/questionnaire.js ---