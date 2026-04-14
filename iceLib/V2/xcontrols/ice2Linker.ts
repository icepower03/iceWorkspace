import { iXElement } from '../iceBase';
import { ice2WrapPanel } from './ice2WrapPanel';
import { ice2Label } from './ice2Label';
import { ice2ContainerEvent } from './ice2ContainerEvent';
import { ice2RouteContainer } from './ice2RouteContainer';
import { IconeP12, enumIconeP12, Icone } from '../iceIcones';
import { iceOutils } from '../../iceOutils';

     interface Optionsice2Linker {
        renderLienTheorique: () => Promise<{ lien: string, params: string[] }>;
        routeur: ice2RouteContainer;
        icone?: Icone | 'none',
        textLocalise?: string,
        textVariable?: string

    }

export class ice2Linker implements iXElement {
        private elementPrincipal: ice2ContainerEvent;
        private monRouteur: ice2RouteContainer;
        private renderLienTheorique: () => Promise<{ lien: string, params: string[] }>;


       
         get y() { return this.elementPrincipal.y; }

        constructor(o: Optionsice2Linker) {

            let myThis: ice2Linker = this;
            myThis.monRouteur = o.routeur;
            myThis.renderLienTheorique = o.renderLienTheorique;
            let st = new ice2WrapPanel({ retourALaLigne: false });


            if (o.icone != 'none') {
                let icone: Icone;
                if (o.icone == undefined) {
                    icone = new IconeP12(enumIconeP12.ice2RouteContainer_Partager);
                }
                else { icone = o.icone; }
                st.append(icone);
            }
            if (o.textLocalise != undefined || o.textVariable != undefined) {
                st.append(new ice2Label({ class: 'txtice2xLinker', textLocalise: o.textLocalise, textVariable: o.textVariable }));
            }
            myThis.elementPrincipal = new ice2ContainerEvent({
                class: 'ice2xLinker',
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
                        iceOutils.afficherMessageAlertifyLocaliseSuccess('Copié')
                    }, function () {
                        //dans le cas de firefow il n'est pas possible d'avoir une action sur le presse paiers à partir d'une backgroup page 
                        //c'est ce qu'il se passe quand on utilise l'evenement 'contextmenu' correspond au clic droit
                        iceOutils.afficherMessageConfirmationPromise("Cliquez ok pour copier le lien", false).then(() => {
                            iceOutils.copyToClipboard(Acopier);
                        });
                    });





                },
                initContent: st
            })



        }
    }