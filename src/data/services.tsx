import { Home, Handshake, Building, Stethoscope, Users, Car } from "lucide-react";
import React from "react";

export const services = [
    {
        slug: "domiciliation-premium",
        title: "Domiciliation Premium",
        text: "Offrez à votre entreprise l'élégance d'une adresse dans l'un des quartiers les plus convoités de Marrakech.",
        fullDescription: "La domiciliation premium chez TAW 10 n'est pas seulement une adresse postale. C'est un positionnement stratégique pour votre entreprise. Nous vous proposons des adresses prestigieuses à Marrakech, renforçant votre image de marque auprès de vos clients et partenaires. Notre service inclut la gestion de votre courrier, l'accès à des salles de réunion modernes et un support administratif dédié.",
        icon: <Home className="w-10 h-10" />,
        color: "bg-blue-50 text-blue-600 border-blue-100",
        features: [
            "Adresse prestigieuse à Marrakech",
            "Gestion du courrier et colis",
            "Notification immédiate de réception",
            "Accès aux salles de réunion",
            "Support administratif multilingue"
        ]
    },
    {
        slug: "creation-entreprise",
        title: "Création d'Entreprise",
        text: "Faites naître votre projet en un clic. Nous prenons en charge toutes les formalités pour vous.",
        fullDescription: "Transformer une idée en entreprise peut être complexe. Notre équipe d'experts vous accompagne à chaque étape du processus de création au Maroc. Du choix de la forme juridique (SARL, Auto-entrepreneur, etc.) à l'obtention du RC et de l'Identifiant Fiscal, nous gérons tout pour vous permettre de vous concentrer sur votre business.",
        icon: <Handshake className="w-10 h-10" />,
        color: "bg-amber-50 text-amber-600 border-amber-100",
        features: [
            "Conseil sur la forme juridique",
            "Rédaction des statuts",
            "Obtention du Certificat Négatif",
            "Inscription à la Patente et IF",
            "Support pour l'ouverture du compte bancaire"
        ]
    },
    {
        slug: "secretariat-virtuel",
        title: "Secrétariat Virtuel",
        text: "Gestion et numérisation quotidienne de votre courrier, fax et colis. Votre réalité quotidienne.",
        fullDescription: "Gérez votre entreprise à distance en toute sérénité. Notre service de secrétariat virtuel assure une permanence pour votre activité. Nous réceptionnons vos appels, gérons vos rendez-vous et numérisons votre courrier quotidiennement. Un bureau complet à votre service, sans les coûts fixes d'un secrétariat classique.",
        icon: <Building className="w-10 h-10" />,
        color: "bg-green-50 text-green-600 border-green-100",
        features: [
            "Accueil téléphonique personnalisé",
            "Gestion d'agenda",
            "Numérisation du courrier",
            "Scan et envoi d'emails",
            "Service de fax"
        ]
    },
    {
        slug: "support-juridique",
        title: "Support Juridique",
        text: "Modifications de statuts, transferts de siège, cessions de parts – chaque démarche est gérée par nos experts.",
        fullDescription: "La vie d'une entreprise est ponctuée de changements. Notre département juridique vous assiste dans toutes les modifications structurelles : augmentation de capital, transfert de siège social, changement de gérant ou cession de parts sociales. Nous garantissons la conformité de vos actes avec la législation marocaine en vigueur.",
        icon: <Stethoscope className="w-10 h-10" />,
        color: "bg-red-50 text-red-600 border-red-100",
        features: [
            "Modifications des statuts",
            "Transfert de siège social",
            "Cession de parts",
            "Procès-verbaux d'assemblées",
            "Veille juridique"
        ]
    },
    {
        slug: "support-administratif",
        title: "Support Administratif",
        text: "Libérez-vous des tâches administratives chronophages grâce à notre service de support personnalisé.",
        fullDescription: "Déléguez votre administration pour gagner en productivité. Nos assistants qualifiés gèrent pour vous vos déclarations CNSS, vos relations avec les administrations publiques et vos relances clients. Nous devenons votre back-office efficace pour que vous puissiez piloter votre croissance.",
        icon: <Users className="w-10 h-10" />,
        color: "bg-purple-50 text-purple-600 border-purple-100",
        features: [
            "Gestion des déclarations sociales",
            "Relations administratives",
            "Relances clients",
            "Organisation de documents",
            "Assistance polyvalente"
        ]
    },
    {
        slug: "conseil-strategique",
        title: "Conseil Stratégique",
        text: "Nous vous accompagnons dans la croissance de votre entreprise grâce à notre conseil en développement.",
        fullDescription: "Prenez les bonnes décisions au bon moment. Nos consultants vous apportent un regard extérieur et expert sur votre stratégie de développement au Maroc. Analyse de marché, optimisation opérationnelle ou recherche de financements, nous sommes à vos côtés pour transformer vos ambitions en succès pérenne.",
        icon: <Car className="w-10 h-10" />,
        color: "bg-indigo-50 text-indigo-600 border-indigo-100",
        features: [
            "Plan de développement",
            "Optimisation des coûts",
            "Analyse stratégique",
            "Accompagnement opérationnel",
            "Réseautage business"
        ]
    },
];
