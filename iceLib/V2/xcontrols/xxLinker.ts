// @ts-nocheck
import { iXElement } from '../xBase';
import { xxWrapPanel } from './xxWrapPanel';
import { xxLabel } from './xxLabel';
import { xxContainerEvent } from './xxContainerEvent';
import { xxRouteContainer } from './xxRouteContainer';
import { IconeP12, enumIconeP12, Icone } from '../xIcones';

     interface OptionsxxLinker {
        renderLienTheorique: () => Promise<{ lien: string, params: string[] }>;
        routeur: xxRouteContainer;
        icone?: Icone | 'none',
        textLocalise?: string,
        textVariable?: string

    }

export class xxLinker implements iXElement {
        private elementPrincipal: xxContainerEvent;
        private monRouteur: xxRouteContainer;
        private renderLienTheorique: () => Promise<{ lien: string, params: string[] }>;


       
         get y() { return this.elementPrincipal.y; }

        constructor(o: OptionsxxLinker) {

            let myThis: xxLinker = this;
            myThis.monRouteur = o.routeur;
            myThis.renderLienTheorique = o.renderLienTheorique;
            let st = new xxWrapPanel({ retourALaLigne: false });


            if (o.icone != 'none') {
                let icone: Icone;
                if (o.icone == undefined) {
                    icone = new IconeP12(enumIconeP12.xxRouteContainer_Partager);
                }
                else { icone = o.icone; }
                st.append(icone);
            }
            if (o.textLocalise != undefined || o.textVariable != undefined) {
                st.append(new xxLabel({ class: 'txtxxxLinker', textLocalise: o.textLocalise, textVariable: o.textVariable }));
            }
            myThis.elementPrincipal = new xxContainerEvent({
                class: 'xxxLinker',
                titleLocalise: "Clic gauche : suivre le lien, clic droit : copier l'url",
                stopPropagation: true,
                onClick: async cb => {
                    let l = await myThis.renderLienTheorique();
                    myThis.monRouteur.afficher(l.lien, l.params);
                    cb();
                },

                onShiftClick: async cb => {
                    cb();
                    let l = await myThis.renderLienTheorique();
                    let cheminPhysique = myThis.monRouteur.routeTheoriqueToRoutePhysique(l.lien, l.params);
                    let url = myThis.monRouteur.createExternalUrl(cheminPhysique);
                    let w = window.open(url, '_blank' + Math.random());
                },
                onRightClick: async cb => {
                    cb();
                    let l = await myThis.renderLienTheorique();
                    let urlInterne = myThis.monRouteur.routeTheoriqueToRoutePhysique(l.lien, l.params);

                    let Acopier = myThis.monRouteur.createExternalUrl(encodeURIComponent(urlInterne));

                    navigator.clipboard.writeText(Acopier).then(function () {
                        /* clipboard successfully set */
                        xOutils.afficherMessageAlertifyLocaliseSuccess('Copié')
                    }, function () {
                        //dans le cas de firefow il n'est pas possible d'avoir une action sur le presse paiers à partir d'une backgroup page 
                        //c'est ce qu'il se passe quand on utilise l'evenement 'contextmenu' correspond au clic droit
                        xOutils.afficherMessageConfirmationPromise("Cliquez ok pour copier le lien", false).then(() => {
                            xOutils.copyToClipboard(Acopier);
                        });
                    });





                },
                initContent: st
            })



        }
    }