// Fichier minimal iceOutils.ts pour lever les erreurs d'import

export const iceOutils = {
    DateToFrenchDateString: (date: any, a?: any, b?: any) => {
        return date?.toLocaleDateString ? date.toLocaleDateString() : String(date);
    },
    afficherMessageAlertifyLocaliseError: (msg: string) => {
        // Stub: affiche une erreur dans la console
        console.error(msg);
    },
    afficherMessageAlertifyLocalise: (msg: string) => {
        // Stub: affiche un message dans la console
        console.log(msg);
    }
    // Ajoutez d'autres stubs ici si besoin
};
