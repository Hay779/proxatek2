// Configuration du questionnaire
const questionnaireConfig = {
  // Page d'accueil
  "accueil": {
    id: "section-1",
    question: "Quel est votre besoin en services informatiques ?",
    subtitle: "Démarrez votre projet dès maintenant !",
    choices: [
      { value: "maintenance", label: "Maintenance & assistance", icon: "🛠️" },
      { value: "securite", label: "Sécurité informatique", icon: "🔐" },
      { value: "cloud", label: "Cloud & sauvegarde", icon: "☁️" },
      { value: "reseau", label: "Réseau / Téléphonie", icon: "🌐" },
      { value: "materiel", label: "Matériel Pro", icon: "🖥️" },
      { value: "audit", label: "Audit & Conseil", icon: "📋" } // ADDED AUDIT OPTION
    ],
    progress: 0,
    nextStep: function(choice) {
      return choice + "-1"; // Aller à la première question du service choisi
    }
  },
  
  // Questions Maintenance & assistance
  "maintenance-1": {
    question: "Combien de postes doivent être maintenus ?",
    choices: [
      { value: "1-3", label: "1 à 3" },
      { value: "4-7", label: "4 à 7" },
      { value: "8-12", label: "8 à 12" },
      { value: "13-17", label: "13 à 17" },
      { value: "18+", label: "Plus de 18" }
    ],
    progress: 10,
    responseKey: "postes",
    nextStep: "maintenance-2"
  },
  "maintenance-2": {
    question: "Disposez-vous d'un serveur ou NAS ?",
    choices: [
      { value: "oui", label: "Oui" },
      { value: "non", label: "Non" },
      { value: "inconnu", label: "Je ne sais pas" }
    ],
    progress: 20,
    responseKey: "serveur",
    nextStep: "maintenance-3"
  },
  "maintenance-3": {
    question: "Combien de sites ?",
    choices: [
      { value: "1", label: "1 site" },
      { value: "2-3", label: "2 à 3 sites" },
      { value: "3+", label: "Plus de 3 sites" }
    ],
    progress: 30,
    responseKey: "sites",
    nextStep: "maintenance-4"
  },
  "maintenance-4": {
    question: "Assistance téléphonique ?",
    choices: [
      { value: "non", label: "Non" },
      { value: "semaine", label: "En semaine" },
      { value: "24-7", label: "24 h/24 – 7 j/7" }
    ],
    progress: 40,
    responseKey: "assistance",
    nextStep: "maintenance-5"
  },
  "maintenance-5": {
    question: "Fréquence des interventions préventives ?",
    choices: [
      { value: "demande", label: "À la demande" },
      { value: "mensuelle", label: "Mensuelle" },
      { value: "trimestrielle", label: "Trimestrielle" }
    ],
    progress: 50,
    responseKey: "frequence",
    nextStep: "maintenance-6"
  },
  "maintenance-6": {
    question: "Prestataire actuel ?",
    choices: [
      { value: "oui", label: "Oui" },
      { value: "non", label: "Non" },
      { value: "inconnu", label: "Je ne sais pas" }
    ],
    progress: 60,
    responseKey: "prestataire",
    nextStep: "contact-1"
  },
  
  // Questions Sécurité informatique
  "securite-1": {
    question: "Combien de postes à sécuriser ?",
    choices: [
      { value: "1-5", label: "1 à 5" },
      { value: "6-20", label: "6 à 20" },
      { value: "21-50", label: "21 à 50" },
      { value: "50+", label: "Plus de 50" }
    ],
    progress: 10,
    responseKey: "postes_securite",
    nextStep: "securite-2"
  },
  "securite-2": {
    question: "Antivirus/pare-feu actif ?",
    choices: [
      { value: "oui", label: "Oui" },
      { value: "non", label: "Non" },
      { value: "inconnu", label: "Je ne sais pas" }
    ],
    progress: 15,
    responseKey: "antivirus",
    nextStep: "securite-3"
  },
  "securite-3": {
    question: "Politique de sauvegarde ?",
    choices: [
      { value: "interne", label: "Interne" },
      { value: "cloud", label: "Cloud" },
      { value: "aucune", label: "Aucune" },
      { value: "inconnu", label: "Je ne sais pas" }
    ],
    progress: 20,
    responseKey: "sauvegarde",
    nextStep: "securite-4"
  },
  "securite-4": {
    question: "Déjà subi cyberattaque ?",
    choices: [
      { value: "oui", label: "Oui" },
      { value: "non", label: "Non" }
    ],
    progress: 25,
    responseKey: "cyberattaque",
    nextStep: "securite-5"
  },
  "securite-5": {
    question: "Sensibilité des données ?",
    choices: [
      { value: "standard", label: "Standard" },
      { value: "confidentiel", label: "Confidentiel" },
      { value: "tres-sensible", label: "Très sensible" }
    ],
    progress: 30,
    responseKey: "sensibilite",
    nextStep: "securite-6"
  },
  "securite-6": {
    question: "Audit de sécurité ?",
    choices: [
      { value: "oui", label: "Oui" },
      { value: "non", label: "Non" },
      { value: "inconnu", label: "Je ne sais pas" }
    ],
    progress: 35,
    responseKey: "audit",
    nextStep: "securite-7"
  },
  "securite-7": {
    question: "Gestion IT dédiée ?",
    choices: [
      { value: "interne", label: "Interne" },
      { value: "prestataire", label: "Prestataire" },
      { value: "non", label: "Non" }
    ],
    progress: 40,
    responseKey: "gestion_it",
    nextStep: "securite-8"
  },
  "securite-8": {
    question: "Plan de Reprise d'Activité (PRA) ?",
    choices: [
      { value: "oui", label: "Oui" },
      { value: "non", label: "Non" },
      { value: "inconnu", label: "Je ne sais pas" }
    ],
    progress: 45,
    responseKey: "pra",
    nextStep: "securite-9"
  },
  "securite-9": {
    question: "Données chiffrées ?",
    choices: [
      { value: "oui", label: "Oui" },
      { value: "non", label: "Non" },
      { value: "inconnu", label: "Je ne sais pas" }
    ],
    progress: 50,
    responseKey: "chiffrement",
    nextStep: "securite-10"
  },
  "securite-10": {
    question: "Sensibilisation collaborateurs ?",
    choices: [
      { value: "oui", label: "Oui" },
      { value: "non", label: "Non" }
    ],
    progress: 60,
    responseKey: "sensibilisation",
    nextStep: "contact-1"
  },
  
  // Questions Cloud & sauvegarde
  "cloud-1": {
    question: "Solution cloud existante ?",
    choices: [
      { value: "oui", label: "Oui" },
      { value: "non", label: "Non" }
    ],
    progress: 10,
    responseKey: "cloud_existant",
    nextStep: "cloud-2"
  },
  "cloud-2": {
    question: "Combien d'utilisateurs doivent accéder aux fichiers ?",
    choices: [
      { value: "1-5", label: "1 à 5" },
      { value: "6-20", label: "6 à 20" },
      { value: "21-50", label: "21 à 50" },
      { value: "50+", label: "Plus de 50" }
    ],
    progress: 15,
    responseKey: "utilisateurs_cloud",
    nextStep: "cloud-3"
  },
  "cloud-3": {
    question: "Volume de données souhaité ?",
    choices: [
      { value: "petit", label: "< 50 Go" },
      { value: "moyen", label: "50–200 Go" },
      { value: "grand", label: "> 200 Go" }
    ],
    progress: 20,
    responseKey: "volume_donnees",
    nextStep: "cloud-4"
  },
  "cloud-4": {
    question: "Partage de fichiers ?",
    choices: [
      { value: "oui", label: "Oui" },
      { value: "non", label: "Non" }
    ],
    progress: 25,
    responseKey: "partage_fichiers",
    nextStep: "cloud-5"
  },
  "cloud-5": {
    question: "Suite collaborative utilisée ?",
    choices: [
      { value: "office365", label: "Office 365" },
      { value: "google", label: "Google Workspace" },
      { value: "non", label: "Non" },
      { value: "inconnu", label: "Je ne sais pas" }
    ],
    progress: 30,
    responseKey: "suite_collaborative",
    nextStep: "cloud-6"
  },
  "cloud-6": {
    question: "Automatisation des sauvegardes ?",
    choices: [
      { value: "oui", label: "Oui" },
      { value: "non", label: "Non" },
      { value: "inconnu", label: "Je ne sais pas" }
    ],
    progress: 35,
    responseKey: "auto_sauvegarde",
    nextStep: "cloud-7"
  },
  "cloud-7": {
    question: "Restaurer en cas de perte ?",
    choices: [
      { value: "oui", label: "Oui" },
      { value: "non", label: "Non" }
    ],
    progress: 40,
    responseKey: "restauration",
    nextStep: "cloud-8"
  },
  "cloud-8": {
    question: "Hébergement FR/UE ?",
    choices: [
      { value: "oui", label: "Oui" },
      { value: "non", label: "Non" },
      { value: "peu-importe", label: "Peu importe" }
    ],
    progress: 45,
    responseKey: "hebergement_eu",
    nextStep: "cloud-9"
  },
  "cloud-9": {
    question: "Données sensibles ?",
    choices: [
      { value: "oui", label: "Oui" },
      { value: "non", label: "Non" },
      { value: "inconnu", label: "Je ne sais pas" }
    ],
    progress: 50,
    responseKey: "donnees_sensibles",
    nextStep: "cloud-10"
  },
  "cloud-10": {
    question: "Chiffrement dans le cloud ?",
    choices: [
      { value: "oui", label: "Oui" },
      { value: "non", label: "Non" },
      { value: "inconnu", label: "Je ne sais pas" }
    ],
    progress: 60,
    responseKey: "chiffrement_cloud",
    nextStep: "contact-1"
  },
  
  // Questions Réseau / Téléphonie
  "reseau-1": {
    question: "Postes ou lignes à connecter ?",
    choices: [
      { value: "1-5", label: "1 à 5" },
      { value: "6-20", label: "6 à 20" },
      { value: "21-50", label: "21 à 50" },
      { value: "50+", label: "Plus de 50" }
    ],
    progress: 10,
    responseKey: "postes_reseau",
    nextStep: "reseau-2"
  },
  "reseau-2": {
    question: "Bâtiment déjà câblé ?",
    choices: [
      { value: "oui", label: "Oui" },
      { value: "non", label: "Non" },
      { value: "partiellement", label: "Partiellement" }
    ],
    progress: 15,
    responseKey: "cablage",
    nextStep: "reseau-3"
  },
  "reseau-3": {
    question: "Accès Internet ?",
    choices: [
      { value: "fibre", label: "Fibre" },
      { value: "adsl", label: "ADSL" },
      { value: "non", label: "Non" },
      { value: "en-cours", label: "En cours" }
    ],
    progress: 20,
    responseKey: "acces_internet",
    nextStep: "reseau-4"
  },
  "reseau-4": {
    question: "Nombre de sites à connecter ?",
    choices: [
      { value: "1", label: "1 site" },
      { value: "2-3", label: "2 à 3 sites" },
      { value: "3+", label: "Plus de 3 sites" }
    ],
    progress: 25,
    responseKey: "sites_reseau",
    nextStep: "reseau-5"
  },
  "reseau-5": {
    question: "Installer une baie de brassage ?",
    choices: [
      { value: "oui", label: "Oui" },
      { value: "non", label: "Non" },
      { value: "inconnu", label: "Je ne sais pas" }
    ],
    progress: 30,
    responseKey: "baie_brassage",
    nextStep: "reseau-6"
  },
  "reseau-6": {
    question: "Audit/plan de réseau ?",
    choices: [
      { value: "oui", label: "Oui" },
      { value: "non", label: "Non" }
    ],
    progress: 35,
    responseKey: "audit_reseau",
    nextStep: "reseau-7"
  },
  "reseau-7": {
    question: "Téléphonie VOIP ?",
    choices: [
      { value: "oui", label: "Oui" },
      { value: "non", label: "Non" },
      { value: "inconnu", label: "Je ne sais pas" }
    ],
    progress: 40,
    responseKey: "voip",
    nextStep: "reseau-8"
  },
  "reseau-8": {
    question: "Bornes Wi-Fi professionnelles ?",
    choices: [
      { value: "oui", label: "Oui" },
      { value: "non", label: "Non" },
      { value: "inconnu", label: "Je ne sais pas" }
    ],
    progress: 45,
    responseKey: "wifi_pro",
    nextStep: "reseau-9"
  },
  "reseau-9": {
    question: "Isolation réseau invité ?",
    choices: [
      { value: "oui", label: "Oui" },
      { value: "non", label: "Non" },
      { value: "inconnu", label: "Je ne sais pas" }
    ],
    progress: 50,
    responseKey: "reseau_invite",
    nextStep: "reseau-10"
  },
  "reseau-10": {
    question: "Monitoring du réseau ?",
    choices: [
      { value: "oui", label: "Oui" },
      { value: "non", label: "Non" },
      { value: "inconnu", label: "Je ne sais pas" }
    ],
    progress: 60,
    responseKey: "monitoring",
    nextStep: "contact-1"
  },
  
  // Questions Matériel Pro
  "materiel-1": {
    question: "Équiper ou renouveler ?",
    choices: [
      { value: "oui", label: "Oui" },
      { value: "non", label: "Non" }
    ],
    progress: 10,
    responseKey: "equipement",
    nextStep: "materiel-2"
  },
  "materiel-2": {
    question: "Achat ou location ?",
    choices: [
      { value: "achat", label: "Achat" },
      { value: "location", label: "Location" },
      { value: "etude", label: "À étudier ensemble" }
    ],
    progress: 20,
    responseKey: "mode_acquisition",
    nextStep: "materiel-3"
  },
  "materiel-3": {
    question: "Types de matériel recherchés ?",
    choices: [
      { value: "desktop", label: "Ordinateurs de bureau" },
      { value: "laptop", label: "Portables" },
      { value: "imprimantes", label: "Imprimantes" },
      { value: "serveurs", label: "Serveurs" },
      { value: "nas", label: "NAS" },
      { value: "autre", label: "Autre" }
    ],
    progress: 30,
    responseKey: "type_materiel",
    nextStep: "materiel-4"
  },
  "materiel-4": {
    question: "Quantité approximative ?",
    choices: [
      { value: "1-3", label: "1–3" },
      { value: "4-10", label: "4–10" },
      { value: "11-20", label: "11–20" },
      { value: "20+", label: "> 20" }
    ],
    progress: 40,
    responseKey: "quantite",
    nextStep: "materiel-5"
  },
  "materiel-5": {
    question: "Installation/configuration par nos soins ?",
    choices: [
      { value: "oui", label: "Oui" },
      { value: "non", label: "Non" }
    ],
    progress: 50,
    responseKey: "installation",
    nextStep: "materiel-6"
  },
  "materiel-6": {
    question: "Marque/exigences techniques ?",
    type: "text",
    placeholder: "Ex: Dell, HP, Apple...",
    progress: 60,
    responseKey: "exigences",
    nextStep: "contact-1",
    errorMessage: "Veuillez préciser ou indiquer 'Aucune préférence'"
  },

  // ===================================================
  // ===== START: Questions Audit & Conseil Path =====
  // ===================================================
  "audit-1": {
    question: "Quel est l'objectif principal de cet audit ?",
    subtitle: "Cela nous aidera à cibler nos investigations.",
    choices: [
      { value: "securite", label: "Évaluation de la sécurité", icon: "🛡️" },
      { value: "performance", label: "Optimisation des performances", icon: "⚙️" },
      { value: "conformite", label: "Mise en conformité (RGPD, etc.)", icon: "📜" },
      { value: "strategie", label: "Définition de stratégie IT globale", icon: "🧭" },
      { value: "inventaire", label: "Inventaire et cartographie du parc", icon: "🗺️" },
      { value: "autre_audit", label: "Autre (à préciser)", icon: "✍️" } 
    ],
    progress: 10, 
    responseKey: "objectif_audit",
    nextStep: "audit-2"
  },
  "audit-2": {
    question: "Quelle est la taille approximative de votre infrastructure à auditer ?",
    subtitle: "Indiquez le nombre d'éléments concernés.",
    choices: [
      { value: "petite_audit", label: "Petite (<10 postes, 0-1 serveur)" },
      { value: "moyenne_audit", label: "Moyenne (10-50 postes, 1-3 serveurs)" },
      { value: "grande_audit", label: "Grande (>50 postes, >3 serveurs)" },
      { value: "specifique_audit", label: "Périmètre spécifique (ex: 1 application, 1 site)" }
    ],
    progress: 20,
    responseKey: "taille_infra_audit",
    nextStep: "audit-3"
  },
  "audit-3": {
    question: "Disposez-vous d'une documentation technique de votre système d'information ?",
    choices: [
      { value: "oui_complete_doc", label: "Oui, complète et à jour" },
      { value: "oui_partielle_doc", label: "Oui, mais partielle ou ancienne" },
      { value: "non_doc", label: "Non, pas de documentation" },
      { value: "ne_sais_pas_doc", label: "Je ne sais pas" }
    ],
    progress: 30,
    responseKey: "documentation_existante_audit",
    nextStep: "audit-4"
  },
  "audit-4": {
    question: "Quels sont les éléments critiques ou les préoccupations majeures à investiguer ?",
    type: "text", 
    placeholder: "Ex: Lenteurs réseau, sécurité des emails, accès distant, sauvegardes...",
    subtitle: "Décrivez brièvement vos points d'attention.",
    progress: 40,
    responseKey: "preoccupations_audit",
    nextStep: "audit-5",
    errorMessage: "Veuillez décrire vos préoccupations ou indiquer 'Aucune'." 
  },
   "audit-5": {
    question: "Souhaitez-vous un rapport détaillé avec des préconisations chiffrées ?",
    choices: [
      { value: "oui_detaille_chiffre_rapport", label: "Oui, rapport détaillé et chiffré" },
      { value: "oui_synthese_rapport", label: "Oui, une synthèse des points clés" },
      { value: "non_juste_oral_rapport", label: "Non, un retour oral suffira" }
    ],
    progress: 50,
    responseKey: "type_rapport_audit",
    nextStep: "audit-6"
  },
  "audit-6": { 
    question: "Quel est le délai souhaité pour la réalisation de cet audit ?",
    choices: [
      { value: "urgent_audit", label: "Urgent (< 1 mois)" },
      { value: "normal_audit", label: "Standard (1 à 2 mois)" },
      { value: "flexible_audit", label: "Flexible (> 2 mois)" }
    ],
    progress: 60, 
    responseKey: "delai_audit",
    nextStep: "contact-1" 
  },
  // ===================================================
  // ===== END: Questions Audit & Conseil Path =====
  // ===================================================
  
  // Questions Contact (Common to all paths)
  "contact-1": {
    question: "Où est située votre entreprise ?",
    type: "text",
    placeholder: "Ville, pays...",
    progress: 70, // Assuming contact questions start around 70%
    responseKey: "location",
    nextStep: "contact-2",
    errorMessage: "Veuillez indiquer votre localisation"
  },
  "contact-2": {
    question: "Secteur d'activité ?",
    type: "text",
    placeholder: "ex : Finance, Santé...",
    progress: 75,
    responseKey: "secteur",
    nextStep: "contact-3",
    errorMessage: "Veuillez indiquer votre secteur d'activité"
  },
  "contact-3": {
    question: "Votre e-mail ?",
    type: "email",
    placeholder: "ex : vous@domaine.com",
    progress: 80,
    responseKey: "email",
    nextStep: "contact-4",
    errorMessage: "Veuillez entrer une adresse email valide"
  },
  "contact-4": {
    question: "Votre nom ?",
    type: "text",
    placeholder: "ex : Jean Dupont",
    progress: 90,
    responseKey: "nom",
    nextStep: "contact-5",
    errorMessage: "Veuillez indiquer votre nom"
  },
  "contact-5": {
    question: "Votre téléphone ?",
    type: "tel",
    placeholder: "ex : +33 6 12 34 56 78",
    progress: 95,
    responseKey: "telephone",
    nextStep: "fin",
    errorMessage: "Veuillez indiquer votre numéro de téléphone"
  }
};