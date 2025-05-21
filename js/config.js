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
      { value: "audit", label: "Audit & Conseil", icon: "🔍" }
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
    progress: 10, // Progresse de 10% par question dans ce parcours (jusqu'à 60%)
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
    nextStep: "contact-1" // Transition vers les questions de contact
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
    progress: 10, // Progresse de 6% par question (10 questions -> 60%)
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
    progress: 16,
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
    progress: 22,
    responseKey: "sauvegarde",
    nextStep: "securite-4"
  },
  "securite-4": {
    question: "Déjà subi cyberattaque ?",
    choices: [
      { value: "oui", label: "Oui" },
      { value: "non", label: "Non" }
    ],
    progress: 28,
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
    progress: 34,
    responseKey: "sensibilite",
    nextStep: "securite-6"
  },
  "securite-6": {
    question: "Audit de sécurité déjà réalisé ?", // Question clarifiée
    choices: [
      { value: "oui", label: "Oui" },
      { value: "non", label: "Non" },
      { value: "inconnu", label: "Je ne sais pas" }
    ],
    progress: 40,
    responseKey: "audit_secu_interne", // Clé spécifique
    nextStep: "securite-7"
  },
  "securite-7": {
    question: "Gestion IT dédiée ?",
    choices: [
      { value: "interne", label: "Interne" },
      { value: "prestataire", label: "Prestataire" },
      { value: "non", label: "Non" }
    ],
    progress: 46,
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
    progress: 52,
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
    progress: 58,
    responseKey: "chiffrement_donnees_securite", // Clé plus spécifique
    nextStep: "securite-10"
  },
  "securite-10": {
    question: "Sensibilisation collaborateurs aux risques cyber ?", // Question clarifiée
    choices: [
      { value: "oui", label: "Oui" },
      { value: "non", label: "Non" }
    ],
    progress: 64, // Ajusté pour dépasser légèrement 60 pour la dernière question de service
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
    progress: 10, // Progresse de ~6% par question
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
    progress: 16,
    responseKey: "utilisateurs_cloud",
    nextStep: "cloud-3"
  },
  "cloud-3": {
    question: "Volume de données souhaité pour le cloud ?", // Clarifié
    choices: [
      { value: "petit", label: "< 50 Go" },
      { value: "moyen", label: "50–200 Go" },
      { value: "grand", label: "> 200 Go" }
    ],
    progress: 22,
    responseKey: "volume_donnees_cloud", // Clé plus spécifique
    nextStep: "cloud-4"
  },
  "cloud-4": {
    question: "Partage de fichiers nécessaire via le cloud ?", // Clarifié
    choices: [
      { value: "oui", label: "Oui" },
      { value: "non", label: "Non" }
    ],
    progress: 28,
    responseKey: "partage_fichiers_cloud", // Clé plus spécifique
    nextStep: "cloud-5"
  },
  "cloud-5": {
    question: "Suite collaborative utilisée (Microsoft 365, Google Workspace) ?", // Clarifié
    choices: [
      { value: "office365", label: "Microsoft 365" },
      { value: "google", label: "Google Workspace" },
      { value: "autre_suite", label: "Autre suite" },
      { value: "aucune_suite", label: "Aucune" },
      { value: "inconnu_suite", label: "Je ne sais pas" }
    ],
    progress: 34,
    responseKey: "suite_collaborative",
    nextStep: "cloud-6"
  },
  "cloud-6": {
    question: "Automatisation des sauvegardes dans le cloud souhaitée ?", // Clarifié
    choices: [
      { value: "oui", label: "Oui" },
      { value: "non", label: "Non" },
      { value: "inconnu_auto_sauvegarde", label: "Je ne sais pas" }
    ],
    progress: 40,
    responseKey: "auto_sauvegarde_cloud", // Clé plus spécifique
    nextStep: "cloud-7"
  },
  "cloud-7": {
    question: "Possibilité de restaurer des données en cas de perte depuis le cloud ?", // Clarifié
    choices: [
      { value: "oui", label: "Oui, c'est un besoin" },
      { value: "non", label: "Non, pas prioritaire" }
    ],
    progress: 46,
    responseKey: "restauration_cloud", // Clé plus spécifique
    nextStep: "cloud-8"
  },
  "cloud-8": {
    question: "Préférence pour un hébergement des données cloud en FR/UE ?", // Clarifié
    choices: [
      { value: "oui_hebergement_ue", label: "Oui, impératif" },
      { value: "preferable_hebergement_ue", label: "Préférable mais pas bloquant" },
      { value: "non_peu_importe_hebergement", label: "Peu importe" }
    ],
    progress: 52,
    responseKey: "hebergement_eu_cloud", // Clé plus spécifique
    nextStep: "cloud-9"
  },
  "cloud-9": {
    question: "Les données à stocker dans le cloud sont-elles sensibles (santé, finance, etc.) ?", // Clarifié
    choices: [
      { value: "oui_donnees_sensibles", label: "Oui" },
      { value: "non_donnees_standards", label: "Non, données standards" },
      { value: "inconnu_donnees_sensibles", label: "Je ne sais pas" }
    ],
    progress: 58,
    responseKey: "donnees_sensibles_cloud", // Clé plus spécifique
    nextStep: "cloud-10"
  },
  "cloud-10": {
    question: "Le chiffrement des données dans le cloud est-il une exigence ?", // Clarifié
    choices: [
      { value: "oui_chiffrement_cloud", label: "Oui, indispensable" },
      { value: "non_chiffrement_cloud", label: "Non, pas spécifiquement" },
      { value: "inconnu_chiffrement_cloud", label: "Je ne sais pas" }
    ],
    progress: 64, // Ajusté
    responseKey: "chiffrement_cloud_exigence", // Clé plus spécifique
    nextStep: "contact-1"
  },

  // Questions Réseau / Téléphonie
  "reseau-1": {
    question: "Combien de postes ou lignes téléphoniques à connecter au réseau ?", // Clarifié
    choices: [
      { value: "1-5", label: "1 à 5" },
      { value: "6-20", label: "6 à 20" },
      { value: "21-50", label: "21 à 50" },
      { value: "50+", label: "Plus de 50" }
    ],
    progress: 10, // Progresse de ~6% par question
    responseKey: "postes_lignes_reseau", // Clé plus spécifique
    nextStep: "reseau-2"
  },
  "reseau-2": {
    question: "Le bâtiment est-il déjà câblé (RJ45, fibre) ?", // Clarifié
    choices: [
      { value: "oui_cablage_complet", label: "Oui, entièrement câblé" },
      { value: "oui_cablage_partiel", label: "Oui, partiellement câblé" },
      { value: "non_pas_cable", label: "Non, pas câblé" },
      { value: "inconnu_cablage", label: "Je ne sais pas" }
    ],
    progress: 16,
    responseKey: "cablage_existant", // Clé plus spécifique
    nextStep: "reseau-3"
  },
  "reseau-3": {
    question: "Quel type d'accès Internet avez-vous ou souhaitez-vous ?", // Clarifié
    choices: [
      { value: "fibre_pro", label: "Fibre optique professionnelle (FTTH/FTTO)" },
      { value: "adsl_vdsl", label: "ADSL / VDSL" },
      { value: "4g_5g_box", label: "Box 4G/5G" },
      { value: "pas_encore_acces", label: "Pas encore d'accès / À définir" }
    ],
    progress: 22,
    responseKey: "type_acces_internet", // Clé plus spécifique
    nextStep: "reseau-4"
  },
  "reseau-4": {
    question: "Combien de sites (bureaux, agences) doivent être connectés entre eux ?", // Clarifié
    choices: [
      { value: "1_site_principal", label: "1 site principal" },
      { value: "2_3_sites", label: "2 à 3 sites" },
      { value: "plus_3_sites", label: "Plus de 3 sites" },
      { value: "pas_besoin_connexion_sites", label: "Pas de connexion inter-sites nécessaire" }
    ],
    progress: 28,
    responseKey: "nombre_sites_connecter", // Clé plus spécifique
    nextStep: "reseau-5"
  },
  "reseau-5": {
    question: "Avez-vous besoin d'installer ou de réorganiser une baie de brassage / local technique ?", // Clarifié
    choices: [
      { value: "oui_baie_necessaire", label: "Oui" },
      { value: "non_baie_pas_necessaire", label: "Non" },
      { value: "inconnu_baie", label: "Je ne sais pas / À évaluer" }
    ],
    progress: 34,
    responseKey: "besoin_baie_brassage", // Clé plus spécifique
    nextStep: "reseau-6"
  },
  "reseau-6": {
    question: "Un audit de votre réseau existant ou un plan de câblage est-il souhaité ?", // Clarifié
    choices: [
      { value: "oui_audit_plan_reseau", label: "Oui" },
      { value: "non_audit_plan_reseau", label: "Non, pas pour l'instant" }
    ],
    progress: 40,
    responseKey: "audit_plan_reseau_interne", // Clé spécifique
    nextStep: "reseau-7"
  },
  "reseau-7": {
    question: "Êtes-vous intéressé par la téléphonie sur IP (VoIP) pour remplacer ou compléter votre système actuel ?", // Clarifié
    choices: [
      { value: "oui_interet_voip", label: "Oui, très intéressé" },
      { value: "peut_etre_voip", label: "Peut-être, à discuter" },
      { value: "non_pas_interet_voip", label: "Non, pas pour l'instant" },
      { value: "deja_equipe_voip", label: "Déjà équipé en VoIP" }
    ],
    progress: 46,
    responseKey: "interet_voip", // Clé plus spécifique
    nextStep: "reseau-8"
  },
  "reseau-8": {
    question: "Avez-vous besoin de bornes Wi-Fi professionnelles pour couvrir vos locaux ?", // Clarifié
    choices: [
      { value: "oui_besoin_wifi_pro", label: "Oui" },
      { value: "non_pas_besoin_wifi_pro", label: "Non" },
      { value: "wifi_existant_a_ameliorer", label: "Wi-Fi existant à améliorer/étendre" }
    ],
    progress: 52,
    responseKey: "besoin_wifi_pro", // Clé plus spécifique
    nextStep: "reseau-9"
  },
  "reseau-9": {
    question: "Souhaitez-vous un réseau Wi-Fi invité séparé et sécurisé pour vos visiteurs ?", // Clarifié
    choices: [
      { value: "oui_wifi_invite", label: "Oui" },
      { value: "non_pas_wifi_invite", label: "Non" }
    ],
    progress: 58,
    responseKey: "reseau_wifi_invite", // Clé plus spécifique
    nextStep: "reseau-10"
  },
  "reseau-10": {
    question: "Le monitoring et la supervision de votre réseau sont-ils importants pour vous ?", // Clarifié
    choices: [
      { value: "oui_monitoring_important", label: "Oui, essentiel" },
      { value: "secondaire_monitoring", label: "Secondaire, mais intéressant" },
      { value: "non_pas_monitoring", label: "Non, pas prioritaire" }
    ],
    progress: 64, // Ajusté
    responseKey: "importance_monitoring_reseau", // Clé plus spécifique
    nextStep: "contact-1"
  },

  // Questions Matériel Pro
  "materiel-1": {
    question: "S'agit-il d'équiper de nouveaux locaux/employés ou de renouveler du matériel existant ?", // Clarifié
    choices:
      [
      { value: "nouvel_equipement", label: "Nouvel équipement" },
      { value: "renouvellement", label: "Renouvellement" },
      { value: "mixte_equip_renouv", label: "Un peu des deux" }
    ],
    progress: 10, // Progresse de 10% par question
    responseKey: "contexte_equipement", // Clé plus spécifique
    nextStep: "materiel-2"
  },
  "materiel-2": {
    question: "Envisagez-vous un achat direct ou une solution de location/leasing pour ce matériel ?", // Clarifié
    choices: [
      { value: "achat_direct", label: "Achat direct" },
      { value: "location_leasing", label: "Location / Leasing" },
      { value: "etude_comparative", label: "À étudier ensemble (avantages/inconvénients)" }
    ],
    progress: 20,
    responseKey: "mode_acquisition_materiel", // Clé plus spécifique
    nextStep: "materiel-3"
  },
  "materiel-3": {
    question: "Quels types de matériel informatique recherchez-vous principalement ?", // Clarifié (permet choix multiples conceptuellement)
    choices: [ // Peut-être transformer en checkboxes plus tard ou poser plusieurs questions
      { value: "ordinateurs_bureau", label: "Ordinateurs de bureau (fixes)" },
      { value: "ordinateurs_portables", label: "Ordinateurs portables" },
      { value: "serveurs_nas", label: "Serveurs / NAS (Stockage)" },
      { value: "imprimantes_multifonctions", label: "Imprimantes / Multifonctions" },
      { value: "equipements_reseau_specifiques", label: "Équipements réseau (switchs, routeurs avancés)" },
      { value: "peripheriques_accessoires", label: "Périphériques et accessoires (écrans, claviers, etc.)" },
      { value: "autre_materiel", label: "Autre (à préciser)" }
    ],
    progress: 30,
    responseKey: "type_materiel_recherche", // Clé plus spécifique
    nextStep: "materiel-4"
  },
  "materiel-4": {
    question: "Quelle est la quantité approximative de matériel nécessaire par catégorie principale ?", // Clarifié
    type: "text",
    placeholder: "Ex: 5 portables, 1 serveur, 2 imprimantes...",
    progress: 40,
    responseKey: "quantite_par_type_materiel", // Clé plus spécifique
    nextStep: "materiel-5",
    errorMessage: "Veuillez donner une estimation ou indiquer 'À définir'"
  },
  "materiel-5": {
    question: "Souhaitez-vous que Proxatek se charge de l'installation et de la configuration du matériel ?", // Clarifié
    choices: [
      { value: "oui_installation_complete", label: "Oui, installation et configuration complètes" },
      { value: "oui_installation_partielle", label: "Oui, pour certains équipements seulement" },
      { value: "non_installation_interne", label: "Non, nous gérons l'installation en interne" }
    ],
    progress: 50,
    responseKey: "service_installation_materiel", // Clé plus spécifique
    nextStep: "materiel-6"
  },
  "materiel-6": {
    question: "Avez-vous des préférences de marques ou des exigences techniques spécifiques pour ce matériel ?", // Clarifié
    type: "text",
    placeholder: "Ex: Dell Latitude, serveurs HP ProLiant, écrans 27 pouces...",
    progress: 60,
    responseKey: "preferences_exigences_materiel", // Clé plus spécifique
    nextStep: "contact-1",
    errorMessage: "Veuillez préciser ou indiquer 'Aucune préférence spécifique'"
  },

  // Questions Audit & Conseil
  "audit-1": {
    question: "Quel type d'audit ou de conseil vous intéresse principalement ?",
    choices: [
      { value: "audit_si_general", label: "Audit général du Système d'Information" },
      { value: "audit_securite", label: "Audit de sécurité spécifique" },
      { value: "audit_performance", label: "Audit de performance (réseau, applications)" },
      { value: "audit_conformite_rgpd", label: "Audit de conformité (RGPD, normes métiers)" },
      { value: "conseil_strategique_it", label: "Conseil stratégique IT / Schéma directeur" },
      { value: "accompagnement_projet", label: "Accompagnement sur un projet spécifique" },
      { value: "autre_audit_conseil", label: "Autre (à préciser)" }
    ],
    progress: 15, // Progression typique pour un parcours de 4 questions avant contact
    responseKey: "type_audit_conseil",
    nextStep: "audit-2"
  },
  "audit-2": {
    question: "Quelle est la taille approximative de votre entreprise (nombre d'employés) ?",
    choices: [
      { value: "tpe_1_9", label: "Très Petite Entreprise (1-9 employés)" },
      { value: "pme_10_49", label: "Petite Entreprise (10-49 employés)" },
      { value: "pme_50_250", label: "Moyenne Entreprise (50-250 employés)" },
      { value: "eti_plus_250", label: "Plus de 250 employés" }
    ],
    progress: 30,
    responseKey: "taille_entreprise_audit",
    nextStep: "audit-3"
  },
  "audit-3": {
    question: "Avez-vous des objectifs clairs ou des problématiques identifiées que cet audit/conseil devrait adresser ?",
    type: "text",
    placeholder: "Ex: Optimiser les coûts, améliorer la sécurité, préparer une migration cloud...",
    progress: 45,
    responseKey: "objectifs_preoccupations_audit",
    nextStep: "audit-4",
    errorMessage: "Veuillez décrire vos objectifs ou indiquer 'À définir ensemble'"
  },
  "audit-4": {
    question: "Avez-vous une idée de votre budget ou un délai pour cette prestation d'audit/conseil ?",
    choices: [
      { value: "budget_defini_oui", label: "Oui, budget/délai approximatif défini" },
      { value: "budget_defini_non", label: "Non, à évaluer selon les recommandations" },
      { value: "ne_sais_pas", label: "Je ne sais pas encore" }
    ],
    progress: 60,
    responseKey: "budget_delai_audit",
    nextStep: "contact-1"
  },

  // Questions Contact (Communes à tous les parcours)
  "contact-1": {
    question: "Où est située votre entreprise ?",
    type: "text",
    placeholder: "Ville, code postal...", // Plus précis
    progress: 70, // Commence après les questions de service (max 60-65%)
    responseKey: "location",
    nextStep: "contact-2",
    errorMessage: "Veuillez indiquer la localisation de votre entreprise"
  },
  "contact-2": {
    question: "Quel est votre secteur d'activité principal ?", // Clarifié
    type: "text",
    placeholder: "Ex: Commerce de détail, Conseil, Industrie, Santé...",
    progress: 78, // Progression plus fine
    responseKey: "secteur",
    nextStep: "contact-3",
    errorMessage: "Veuillez indiquer votre secteur d'activité"
  },
  "contact-3": {
    question: "Votre adresse e-mail professionnelle ?", // Clarifié
    type: "email",
    placeholder: "vous@votreentreprise.com",
    progress: 86,
    responseKey: "email",
    nextStep: "contact-4",
    errorMessage: "Veuillez entrer une adresse e-mail valide"
  },
  "contact-4": {
    question: "Votre nom et prénom ?", // Combiné
    type: "text",
    placeholder: "Ex: Jean Dupont",
    progress: 93,
    responseKey: "nom_prenom", // Clé modifiée
    nextStep: "contact-5",
    errorMessage: "Veuillez indiquer votre nom et prénom"
  },
  "contact-5": {
    question: "Votre numéro de téléphone professionnel ?", // Clarifié
    type: "tel",
    placeholder: "Ex: 01 23 45 67 89",
    progress: 98, // Ajusté pour laisser de la marge avant 100%
    responseKey: "telephone",
    nextStep: "fin", // Mène à la page de remerciement
    errorMessage: "Veuillez indiquer un numéro de téléphone valide"
  }
  // "fin" n'est pas une étape de question, mais un marqueur pour le JS.
};