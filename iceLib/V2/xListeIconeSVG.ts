class ContenusSVG {
	public contenu: string;
	public viewBoxContains: string;
	public epaisseur: number;

	public constructor(contenu: string, viewBoxContains: string, epaisseur: number = 4) {
		this.contenu = contenu;
		this.viewBoxContains = viewBoxContains;
		this.epaisseur = epaisseur;
        xListeIconeSVG
    }
}

class xListeIconeSVG {

	// Template :
	//public static (): ContenusSVG {
	//	let viewBoxContains = ``;
	//	let contenu = ``;
	//	return new ContenusSVG(contenu, viewBoxContains);
	//};

	public static actualiser(): ContenusSVG {
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<g>
				<path class="xsvg-elem xsvg-elem_stroked xsvg-elem_couleurPrincipale" d="M44.4,32.1C41.5,40.2,33.7,46,24.6,46C13,46,3.6,36.6,3.6,24.9S13,3.9,24.6,3.9c4.4,0,8.4,1.3,11.8,3.6"/>
				<polyline class="xsvg-elem xsvg-elem_stroked xsvg-elem_couleurSecondaire" points="37.6,2 39.8,9.8 31.9,12"/>
			</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static administration(): ContenusSVG {
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<g>
				<path class="xsvg-elem xsvg-elem_filled" d="M42.8,27l5.2-3.2l-2.3-10l-6.1-0.7l-1.5-1.9l0.7-6.1l-9.3-4.5l-4.3,4.3h-2.5l-4.3-4.3L9.2,5.1l0.7,6.1	l-1.5,1.9l-6.1,0.7L0,23.8L5.2,27l0.6,2.4l-3.3,5.2l6.4,8l5.7-2l2.2,1.1l2,5.8h10.3l2-5.8l2.2-1.1l5.8,2l6.4-8l-3.3-5.2L42.8,27z	 M24,35.4c-6.3,0-11.4-5.1-11.4-11.4c0-6.3,5.1-11.4,11.4-11.4c6.3,0,11.4,5.1,11.4,11.4c0,0,0,0,0,0C35.4,30.3,30.3,35.4,24,35.4	C24,35.4,24,35.4,24,35.4L24,35.4z"/>
				<path class="xsvg-elem xsvg-elem_filled" d="M24,18.5c-3,0-5.5,2.5-5.5,5.5c0,3,2.5,5.5,5.5,5.5c3,0,5.5-2.5,5.5-5.5C29.5,21,27,18.5,24,18.5	C24,18.5,24,18.5,24,18.5z"/>
			</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static age(): ContenusSVG {
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<g>
				<path class="xsvg-elem xsvg-elem_filled" d="M45,36c-2.6,0-2.9-3-7-3s-4.4,3-7,3s-3-3-7-3s-4.4,3-7,3s-2.9-3-7-3s-4.4,3-7,3v-7.5C3,26,5,24,7.5,24H9V10.5h6V24h6V10.5 h6V24h6V10.5h6V24h1.5c2.5,0,4.5,2,4.5,4.5V36z M45,48H3v-9c4.1,0,4.4-3,7-3s2.9,3,7,3s4.4-3,7-3s2.9,3,7,3s4.4-3,7-3s2.9,3,7,3V48 z M12,9c-1.7,0-3-1.3-3-3c0-2.9,3-2.2,3-6c1.1,0,3,2.8,3,5.2S13.7,9,12,9z M24,9c-1.7,0-3-1.3-3-3c0-2.9,3-2.2,3-6 c1.1,0,3,2.8,3,5.2S25.7,9,24,9z M36,9c-1.7,0-3-1.3-3-3c0-2.9,3-2.2,3-6c1.1,0,3,2.8,3,5.2S37.7,9,36,9z"/>
			</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static ajouter(): ContenusSVG {
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<g>
				<line class="xsvg-elem xsvg-elem_stroked" x1="23.6" y1="2.1" x2="23.6" y2="45.1"/>
				<line class="xsvg-elem xsvg-elem_stroked" x1="2.1" y1="23.6" x2="45.1" y2="23.6"/>
			</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static ajouter_rond(): ContenusSVG {
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<g>
				<path class="xsvg-elem xsvg-elem_filled" d="M24,0C10.7,0,0,10.8,0,24c0,13.3,10.7,24,24,24c13.3,0,24-10.7,24-24C48,10.8,37.3,0,24,0z M38.4,27.1
					c0,0.8-0.7,1.5-1.5,1.5h-8.4v8.4c0,0.8-0.7,1.5-1.5,1.5h-6.1c-0.8,0-1.5-0.7-1.5-1.5v-8.4h-8.4c-0.8,0-1.5-0.7-1.5-1.5v-6.1
					c0-0.8,0.7-1.5,1.5-1.5h8.4v-8.4c0-0.8,0.7-1.5,1.5-1.5h6.1c0.8,0,1.5,0.7,1.5,1.5v8.4h8.4c0.8,0,1.5,0.7,1.5,1.5V27.1z"/>
			</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static alerte(): ContenusSVG
	{
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<g>
				<line class="xsvg-elem xsvg-elem_stroked" x1="24" y1="18.2" x2="24" y2="31.8"/>
				<line class="xsvg-elem xsvg-elem_stroked" x1="24" y1="37.8" x2="24" y2="37.8"/>
				<path class="xsvg-elem xsvg-elem_stroked" d="M25,3.2l20.3,40.5c0.4,0.7-0.2,1.5-1,1.5H3.7c-0.8,0-1.3-0.8-1-1.5L23,3.2C23.4,2.5,24.6,2.5,25,3.2z"/>
			</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static annuler_action(): ContenusSVG
	{
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<g>
				<polyline class="xsvg-elem xsvg-elem_stroked" points="3,5 2.8,17.3 15.1,17.5 "/>
				<path class="xsvg-elem xsvg-elem_stroked" d="M6,14.5c11-11,26.5-13.4,34.5-5.4s5.6,23.5-5.4,34.5"/>
			</g>`;
		let epaisseur = 5;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static appareil_photo(): ContenusSVG {
		let viewBoxContains = `0 0 47.64 41.83`;
		let contenu = `
			<g>
				<path class="xsvg-elem xsvg-elem_stroked" d="M43.57,39.83H4.07A2.08,2.08,0,0,1,2,37.75V11.09A2.07,2.07,0,0,1,4.07,9h6.52a2.08,2.08,0,0,0,2-1.58l.7-3.86a2.07,2.07,0,0,1,2-1.58h17a2.07,2.07,0,0,1,2,1.6L35,7.42A2.09,2.09,0,0,0,37,9h6.56a2.07,2.07,0,0,1,2.07,2.07V37.75A2.07,2.07,0,0,1,43.57,39.83Z"/>
				<line class="xsvg-elem xsvg-elem_stroked" x1="20.48" y1="8.02" x2="27.16" y2="8.02"/>
				<circle class="xsvg-elem xsvg-elem_stroked" cx="23.82" cy="24.27" r="9.01"/>
			</g>`;
		let epaisseur = 3;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static associer(): ContenusSVG {
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<g class="xsvg-elem">
				<path class="xsvg-elem xsvg-elem_filled" d="M26.8,35.2h-0.3c-1.8,0-3.5-0.3-5.1-1c-0.3-0.1-0.6-0.1-0.9,0.2l-6.1,6.1c-1.9,1.9-4.9,1.9-6.8,0
					c-1.9-1.9-1.9-4.9,0-6.8l10.3-10.3c1.9-1.9,4.9-1.9,6.8,0c1.3,1.2,3.3,1.2,4.5,0c1.2-1.2,1.3-3.3,0-4.5c0,0,0,0,0,0v0
					c-0.6-0.6-1.2-1.1-1.9-1.5c-4.5-2.9-10.3-2.2-14,1.5L3,29.1C-1.2,33.6-1,40.7,3.6,45c4.3,4,11,4,15.3,0l8.4-8.4
					c0.3-0.3,0.3-0.8,0-1.1C27.2,35.3,27,35.2,26.8,35.2z"/>
				<path class="xsvg-elem xsvg-elem_filled" d="M44.7,3.3C44.7,3.3,44.7,3.3,44.7,3.3c-4.4-4.4-11.5-4.4-15.9,0c0,0,0,0,0,0l-8.4,8.4c-0.3,0.3-0.3,0.8,0,1.1
					c0.2,0.2,0.4,0.2,0.6,0.2h0.3c1.8,0,3.5,0.3,5.1,1c0.3,0.1,0.6,0.1,0.9-0.2l6.1-6.1c2-1.8,5-1.6,6.8,0.4c1.6,1.8,1.6,4.6,0,6.5
					l-7.5,7.5l-0.1,0.1L29.9,25c-1.9,1.9-4.9,1.9-6.8,0c-1.3-1.2-3.3-1.2-4.5,0c-1.2,1.3-1.2,3.3,0,4.5c0.9,0.9,2,1.7,3.2,2.3
					c0.2,0.1,0.3,0.1,0.5,0.2c0.2,0.1,0.3,0.1,0.5,0.2c0.2,0.1,0.3,0.1,0.5,0.2l0.5,0.1c0.3,0.1,0.6,0.1,1,0.2c0.4,0.1,0.8,0.1,1.2,0.1
					h0.6l0.5-0.1c0.2,0,0.4,0,0.6,0h0.3l0.6-0.1l0.3,0l0.5-0.1h0.1c2-0.5,3.8-1.5,5.2-3l10.2-10.2C49.1,14.9,49.1,7.7,44.7,3.3z"/>
			</g>`;
		let epaisseur = 3;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static attente(): ContenusSVG {
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<g>
				<path class="xsvg-elem xsvg-elem_filled" d="M42.9,43.8h-0.6c-0.8-8.5-5.7-15.1-9.6-19.8c3.8-4.7,8.9-11.3,9.6-19.8h0.6c1.3,0,2.1-1.1,2.1-2.1C45,0.8,44,0,42.9,0
					h-38C3.5,0,2.8,1.1,2.8,2.1c0,1.3,1.1,2.1,2.1,2.1h0.6C6.3,12.7,11.2,19.3,15,24c-3.8,4.7-8.9,11.3-9.6,19.8H4.8
					c-1.3,0-2.1,1.1-2.1,2.1c0,1.3,1.1,2.1,2.1,2.1h2.8h32.7h2.8c1.3,0,2.1-1.1,2.1-2.1C45,44.8,44.2,43.8,42.9,43.8z M9.7,43.8
					c0.8-7.6,5.7-13.6,9.6-18.1l0.2-0.2c0.6-0.8,0.6-1.9,0-2.8l-0.2-0.2C15.5,18,10.6,12.1,9.7,4.4h28.1C37,12,32.1,18,28.2,22.5
					L28,22.7c-0.6,0.8-0.6,1.9,0,2.8l0.2,0.2c3.8,4.5,8.7,10.4,9.6,18.1H9.7z"/>
				<path class="xsvg-elem xsvg-elem_filled" d="M24,29.9c-4.5,0-7.9,7.9-7.9,9.4v0.5h15.7v-0.5C31.9,37.9,28.4,29.9,24,29.9z"/>
				<path class="xsvg-elem xsvg-elem_filled" d="M24,18.5c3.3,0,5.9-5.9,5.9-7v-0.4H18.1v0.4C18.1,12.5,20.7,18.5,24,18.5z"/>
			</g>`;
		let epaisseur = 3;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static banette(): ContenusSVG
	{
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<g class="xsvg-elem">
				<path class="xsvg-elem xsvg-elem_filled" d="M46.9,26.8h-0.9V14.9c0-0.6-0.5-1.1-1.1-1.1c0,0,0,0,0,0h-0.9v-3.3c0-0.6-0.5-1.1-1.1-1.1
	c0,0,0,0,0,0h-1.4V6c0-0.6-0.5-1.1-1.1-1.1c0,0,0,0,0,0H7.7C7.1,4.9,6.6,5.4,6.6,6l0,0v3.3H5.2c-0.6,0-1.1,0.5-1.1,1.1l0,0v3.3H3.2
	c-0.6,0-1.1,0.5-1.1,1.1l0,0v11.9H1.1c-0.6,0-1.1,0.5-1.1,1.1c0,0,0,0,0,0v14c0,0.6,0.5,1.1,1.1,1.1h45.7c0.6,0,1.1-0.5,1.1-1.1v-14
	C48,27.3,47.5,26.8,46.9,26.8C46.9,26.8,46.9,26.8,46.9,26.8z M8.9,7.2h30.3v2.2H8.9V7.2z M6.4,11.6h35.3v2.2H6.4V11.6z M4.3,16.1
	h39.3v10.7H35c-0.5,0-1,0.4-1.1,0.9l-1,5H15.1l-1-5c-0.1-0.5-0.6-0.9-1.1-0.9H4.3V16.1z"/>
			</g>`;
		let epaisseur = 3;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static baguette_magique(): ContenusSVG
	{
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<g>
				<path id="baguette" class="xsvg-elem xsvg-elem_filled xsvg-elem_couleurPrincipale" d="M41,47.3L41,47.3c-1.3,0.8-3,0.4-3.8-0.8L19.1,18c-0.8-1.3-0.4-3,0.8-3.8l0,0c1.3-0.8,3-0.4,3.8,0.8
					l18.2,28.5C42.6,44.8,42.3,46.5,41,47.3z"/>
				<path id="etoile" class="xsvg-elem xsvg-elem_filled xsvg-elem_couleurSecondaire" d="M12.5,0.6l5,4.1c0.4,0.3,1,0.4,1.4,0.1l5.4-3.5c1-0.6,2.2,0.4,1.7,1.4l-2.4,6c-0.2,0.5,0,1,0.3,1.3l5,4.1
					c0.9,0.7,0.3,2.2-0.8,2.1l-6.4-0.4c-0.5,0-1,0.3-1.2,0.7l-2.4,6c-0.4,1.1-2,1-2.2-0.1l-1.6-6.2c-0.1-0.5-0.6-0.9-1.1-0.9l-6.4-0.4
					c-1.1-0.1-1.5-1.6-0.6-2.2l5.4-3.5C12.2,9,12.4,8.5,12.2,8l-1.6-6.2C10.3,0.7,11.6-0.2,12.5,0.6z"/>
			</g>`;
		let epaisseur = 3;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static bdd(): ContenusSVG
	{
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<g class="xsvg-elem">
				<path class="xsvg-elem xsvg-elem_filled" d="M24,20.6c4.2,0,8.2-0.4,11.9-1.2c3.7-0.8,6.6-1.9,8.7-3.4v4.6c0,1.2-0.9,2.4-2.8,3.4c-1.8,1.1-4.3,1.9-7.5,2.5
	c-3.2,0.6-6.6,0.9-10.3,0.9c-3.7,0-7.1-0.3-10.3-0.9C10.5,25.9,8,25.1,6.2,24c-1.8-1.1-2.8-2.2-2.8-3.4V16c2.1,1.5,5,2.6,8.7,3.4
	C15.8,20.2,19.8,20.6,24,20.6z M24,41.1c4.2,0,8.2-0.4,11.9-1.2c3.7-0.8,6.6-1.9,8.7-3.4v4.6c0,1.2-0.9,2.4-2.8,3.4
	c-1.8,1.1-4.3,1.9-7.5,2.5C31.1,47.7,27.7,48,24,48c-3.7,0-7.1-0.3-10.3-0.9c-3.2-0.6-5.7-1.5-7.5-2.5c-1.8-1.1-2.8-2.2-2.8-3.4
	v-4.6c2.1,1.5,5,2.6,8.7,3.4C15.8,40.8,19.8,41.1,24,41.1z M24,30.9c4.2,0,8.2-0.4,11.9-1.2c3.7-0.8,6.6-1.9,8.7-3.4v4.6
	c0,1.2-0.9,2.4-2.8,3.4c-1.8,1.1-4.3,1.9-7.5,2.5c-3.2,0.6-6.6,0.9-10.3,0.9c-3.7,0-7.1-0.3-10.3-0.9c-3.2-0.6-5.7-1.5-7.5-2.5
	c-1.8-1.1-2.8-2.2-2.8-3.4v-4.6c2.1,1.5,5,2.6,8.7,3.4C15.8,30.5,19.8,30.9,24,30.9z M24,0c3.7,0,7.1,0.3,10.3,0.9
	c3.2,0.6,5.7,1.5,7.5,2.5c1.8,1.1,2.8,2.2,2.8,3.4v3.4c0,1.2-0.9,2.4-2.8,3.4c-1.8,1.1-4.3,1.9-7.5,2.5c-3.2,0.6-6.6,0.9-10.3,0.9
	c-3.7,0-7.1-0.3-10.3-0.9c-3.2-0.6-5.7-1.4-7.5-2.5c-1.8-1.1-2.8-2.2-2.8-3.4V6.9c0-1.2,0.9-2.4,2.8-3.4c1.8-1.1,4.3-1.9,7.5-2.5
	C16.9,0.3,20.3,0,24,0z"/>
			</g>`;
		let epaisseur = 3;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static calendrier(): ContenusSVG
	{
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<g id="calendrier" class="xsvg-elem xsvg-elem_stroked">
				<path class="xsvg-elem xsvg-elem_stroked" d="M44.69,46.5H3.31c-0.8,0-1.44-0.65-1.44-1.44V6.58c0-0.8,0.65-1.44,1.44-1.44h41.37c0.8,0,1.44,0.65,1.44,1.44
					v38.47C46.13,45.85,45.48,46.5,44.69,46.5z"/>
				<line class="xsvg-elem xsvg-elem_stroked" x1="35.9" y1="8.78" x2="35.9" y2="1.5"/>
				<line class="xsvg-elem xsvg-elem_stroked" x1="1.87" y1="15.04" x2="46.13" y2="15.04"/>
				<line class="xsvg-elem xsvg-elem_stroked" x1="12.1" y1="8.78" x2="12.1" y2="1.5"/>
				<line class="xsvg-elem xsvg-elem_stroked" x1="20.93" y1="23.33" x2="27.07" y2="23.33"/>
				<line class="xsvg-elem xsvg-elem_stroked" x1="32.83" y1="23.33" x2="38.97" y2="23.33"/>
				<line class="xsvg-elem xsvg-elem_stroked" x1="9.03" y1="23.33" x2="15.17" y2="23.33"/>
				<line class="xsvg-elem xsvg-elem_stroked" x1="20.93" y1="30.6" x2="27.07" y2="30.6"/>
				<line class="xsvg-elem xsvg-elem_stroked" x1="32.83" y1="30.6" x2="38.97" y2="30.6"/>
				<line class="xsvg-elem xsvg-elem_stroked" x1="9.03" y1="30.6" x2="15.17" y2="30.6"/>
				<line class="xsvg-elem xsvg-elem_stroked" x1="20.93" y1="38.8" x2="27.07" y2="38.8"/>
				<line class="xsvg-elem xsvg-elem_stroked" x1="32.83" y1="38.8" x2="38.97" y2="38.8"/>
				<line class="xsvg-elem xsvg-elem_stroked" x1="9.03" y1="38.8" x2="15.17" y2="38.8"/>
			</g>`;
		let epaisseur = 3;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static carre(): ContenusSVG {
		let viewBoxContains = `0 0 48 48`;
		let contenu = `<path class="xsvg-elem xsvg-elem_filled" d="M44.5,47.6H3.5c-1.7,0-3.1-1.4-3.1-3.1V3.5c0-1.7,1.4-3.1,3.1-3.1h41.1c1.7,0,3.1,1.4,3.1,3.1v41.1
	C47.6,46.2,46.2,47.6,44.5,47.6z"/>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static cercle(): ContenusSVG
	{
		let viewBoxContains = `0 0 48 48`;
		let contenu = `<circle class="xsvg-elem xsvg-elem_filled" cx="24" cy="24" r="24"/>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static cercle_pointilles(): ContenusSVG
	{
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
		<g id="rond">
			<path class="xsvg-elem xsvg-elem_filled" d="M24.8,48l-0.1-4.8c2.9-0.1,5.6-0.8,8.2-2.1l2.2,4.3C31.8,47,28.4,47.9,24.8,48z M14.4,46c-3.2-1.4-6.2-3.6-8.5-6.3l3.6-3.1
				c1.9,2.1,4.2,3.9,6.8,5L14.4,46z M43.1,38.5l-3.8-2.9c1.7-2.3,2.9-4.9,3.5-7.7l4.7,1C46.8,32.4,45.3,35.7,43.1,38.5z M0.9,30.4
				C0.3,28.3,0,26.2,0,24c0-1.4,0.1-2.8,0.4-4.2l4.7,0.8c-0.2,1.1-0.3,2.2-0.3,3.3c0,1.7,0.2,3.5,0.7,5.1L0.9,30.4z M42.7,19.5
				c-0.7-2.8-2-5.4-3.8-7.6l3.7-3c2.2,2.8,3.9,6,4.7,9.5L42.7,19.5z M8.4,12.9l-3.9-2.8c2.1-2.9,4.8-5.3,7.9-7l2.3,4.2
				C12.2,8.6,10,10.5,8.4,12.9z M32.3,6.7c-2.6-1.2-5.4-1.9-8.3-1.9c-0.4,0-0.8,0-1.2,0L22.5,0c0.5,0,1,0,1.5,0
				c3.6,0,7.1,0.8,10.3,2.3L32.3,6.7z"/>
		</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static cercle_pointexclamation(): ContenusSVG
	{
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
		<g>
			<path id="cercle" class="xsvg-elem xsvg-elem_filled xsvg-elem_couleurPrincipale" d="M24,0C10.7,0,0,10.7,0,24s10.7,24,24,24s24-10.7,24-24S37.3,0,24,0z M24,41.3c-1.7,0-3-1.3-3-3c0-1.7,1.3-3,3-3
				s3,1.3,3,3C27,40,25.7,41.3,24,41.3z M27,29.3c0,1.7-1.3,3-3,3s-3-1.3-3-3V9c0-1.7,1.3-3,3-3s3,1.3,3,3V29.3z"/>
			<path id="trait" class="xsvg-elem xsvg-transparent xsvg-elem_couleurSecondaire" d="M24,6c-1.7,0-3,1.3-3,3v20.3c0,1.7,1.3,3,3,3s3-1.3,3-3V9C27,7.3,25.7,6,24,6z"/>
			<path id="point" class="xsvg-elem xsvg-transparent xsvg-elem_couleurSecondaire" d="M24,35.3c-1.7,0-3,1.3-3,3c0,1.7,1.3,3,3,3s3-1.3,3-3C27,36.6,25.7,35.3,24,35.3z"/>
		</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static chaise(): ContenusSVG
	{
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<g>
				<g id="chaise">
					<path class="xsvg-elem xsvg-elem_filled" d="M13.1,38.7H8.5c-1.8,0-3.3-1.5-3.3-3.3V3.3C5.2,1.5,6.7,0,8.5,0h4.6c1.8,0,3.3,1.5,3.3,3.3v32.1
						C16.4,37.2,15,38.7,13.1,38.7z"/>
					<path class="xsvg-elem xsvg-elem_filled" d="M9.5,35v-3.8c0-2,1.7-3.7,3.7-3.7h26c2,0,3.7,1.7,3.7,3.7V35c0,2-1.7,3.7-3.7,3.7h-26C11.1,38.7,9.5,37.1,9.5,35z"/>
					<g id="piedGauche">
						<line class="xsvg-elem xsvg-elem_filled" x1="11.5" y1="45.5" x2="11.5" y2="33.1"/>
						<path class="xsvg-elem xsvg-elem_filled" d="M11.5,48C10.1,48,9,46.9,9,45.5V33.1c0-1.4,1.1-2.5,2.5-2.5s2.5,1.1,2.5,2.5v12.4C14.1,46.9,12.9,48,11.5,48z"/>
					</g>
					<g id="piedDroite">
						<line class="xsvg-elem xsvg-elem_filled" x1="36.5" y1="45.5" x2="36.5" y2="33.1"/>
						<path class="xsvg-elem xsvg-elem_filled" d="M36.5,48c-1.4,0-2.5-1.1-2.5-2.5V33.1c0-1.4,1.1-2.5,2.5-2.5c1.4,0,2.5,1.1,2.5,2.5v12.4C39,46.9,37.9,48,36.5,48z"/>
					</g>
				</g>
			</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static chevron_bas(): ContenusSVG {
		let viewBoxContains = `0 0 46.87 25.39`;
		let contenu = `
			<g>
			  <polyline class="xsvg-elem xsvg-elem_stroked" points="2 2 23.44 23.39 44.87 2"/>
			</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static chevron_droite(): ContenusSVG {
		let viewBoxContains = `0 0 25.39 46.87`;
		let contenu = `
			<g>
			  <polyline class="xsvg-elem xsvg-elem_stroked" points="2 44.87 23.39 23.44 2 2"/>
			</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static chevron_gauche(): ContenusSVG {
		let viewBoxContains = `0 0 25.39 46.87`;
		let contenu = `
			<g>
			  <polyline class="xsvg-elem xsvg-elem_stroked" points="23.39 2 2 23.44 23.39 44.87"/>
			</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static chevron_haut(): ContenusSVG
	{
		let viewBoxContains = `0 0 46.9 25.4`;
		let contenu = `
			<g>
			  <polyline class="xsvg-elem xsvg-elem_stroked" points="44.9,23.4 23.4,2 2,23.4"/>
			</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static coller(): ContenusSVG {
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<g id="document">
				<path class="xsvg-elem xsvg-elem_stroked" d="M31.2,46.5H2.9c-0.8,0-1.4-0.6-1.4-1.4v-36c0-0.8,0.6-1.4,1.4-1.4h28.3c0.8,0,1.4,0.6,1.4,1.4v36
					C32.6,45.9,32,46.5,31.2,46.5z"/>
				<line class="xsvg-elem xsvg-elem_stroked" x1="8" y1="14" x2="26" y2="14"/>
				<line class="xsvg-elem xsvg-elem_stroked" x1="8" y1="20.1" x2="20.1" y2="20.1"/>
				<line class="xsvg-elem xsvg-elem_stroked" x1="8" y1="40.8" x2="26" y2="40.8"/>
				<path class="xsvg-elem xsvg-elem_stroked" d="M24.6,34.8H9.4c-0.8,0-1.4-0.6-1.4-1.4v-5.1c0-0.8,0.6-1.4,1.4-1.4h15.2c0.8,0,1.4,0.6,1.4,1.4v5.1
					C26,34.2,25.4,34.8,24.6,34.8z"/>
			</g>
			<g id="pointilles">
			<path class="xsvg-elem xsvg-elem_filled" d="M15.4,9.3c-0.8,0-1.5-0.7-1.5-1.5v-1c0-0.8,0.7-1.5,1.5-1.5s1.5,0.7,1.5,1.5v1C16.9,8.6,16.2,9.3,15.4,9.3z"
				/>
			<path class="xsvg-elem xsvg-elem_filled" d="M41.6,41.7h-2c-0.8,0-1.5-0.7-1.5-1.5s0.7-1.5,1.5-1.5h2c0.8,0,1.5,0.7,1.5,1.5S42.4,41.7,41.6,41.7z
				 M46.5,40c-0.8,0-1.5-0.7-1.5-1.5v-2c0-0.8,0.7-1.5,1.5-1.5s1.5,0.7,1.5,1.5v2C48,39.3,47.3,40,46.5,40z M46.5,32
				c-0.8,0-1.5-0.7-1.5-1.5v-2c0-0.8,0.7-1.5,1.5-1.5s1.5,0.7,1.5,1.5v2C48,31.3,47.3,32,46.5,32z M46.5,24c-0.8,0-1.5-0.7-1.5-1.5
				v-2c0-0.8,0.7-1.5,1.5-1.5s1.5,0.7,1.5,1.5v2C48,23.3,47.3,24,46.5,24z M46.5,16c-0.8,0-1.5-0.7-1.5-1.5v-2
				c0-0.8,0.7-1.5,1.5-1.5s1.5,0.7,1.5,1.5v2C48,15.3,47.3,16,46.5,16z M46.5,7.9c-0.8,0-1.5-0.7-1.5-1.5v-2c0-0.8,0.7-1.5,1.5-1.5
				S48,3.6,48,4.4v2C48,7.3,47.3,7.9,46.5,7.9z M16.8,3c-0.8,0-1.4-0.6-1.5-1.4c-0.1-0.8,0.5-1.5,1.4-1.6c0.1,0,0.2,0,0.3,0h1.9
				c0.8,0,1.5,0.7,1.5,1.5S19.6,3,18.8,3h-1.9C16.9,3,16.8,3,16.8,3z M42.8,3h-2c-0.8,0-1.5-0.7-1.5-1.5S40,0,40.8,0h2
				c0.8,0,1.5,0.7,1.5,1.5S43.7,3,42.8,3z M34.8,3h-2c-0.8,0-1.5-0.7-1.5-1.5S32,0,32.8,0h2c0.8,0,1.5,0.7,1.5,1.5S35.6,3,34.8,3z
				 M26.8,3h-2c-0.8,0-1.5-0.7-1.5-1.5S24,0,24.8,0h2c0.8,0,1.5,0.7,1.5,1.5S27.6,3,26.8,3z"/>
			<path class="xsvg-elem xsvg-elem_filled" d="M33.6,41.7h-1c-0.8,0-1.5-0.7-1.5-1.5s0.7-1.5,1.5-1.5h1c0.8,0,1.5,0.7,1.5,1.5S34.4,41.7,33.6,41.7z"/>
		</g>`;
		let epaisseur = 3;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static copier(): ContenusSVG
	{
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<g>
				<g id="document">
					<g>
						<path class="xsvg-elem xsvg-elem_stroked" d="M31.1,46.5H2.8c-0.8,0-1.4-0.6-1.4-1.4v-36c0-0.8,0.6-1.4,1.4-1.4h28.3c0.8,0,1.4,0.6,1.4,1.4v36
							C32.5,46,31.9,46.5,31.1,46.5z"/>
						<line class="xsvg-elem xsvg-elem_stroked" x1="7.9" y1="14.1" x2="25.9" y2="14.1"/>
						<line class="xsvg-elem xsvg-elem_stroked" x1="7.9" y1="20.1" x2="20" y2="20.1"/>
						<line class="xsvg-elem xsvg-elem_stroked" x1="7.9" y1="40.8" x2="25.9" y2="40.8"/>
						<path class="xsvg-elem xsvg-elem_stroked" d="M24.5,34.8H9.3c-0.8,0-1.4-0.6-1.4-1.4v-5.1c0-0.8,0.6-1.4,1.4-1.4h15.2c0.8,0,1.4,0.6,1.4,1.4v5.1
							C25.9,34.2,25.3,34.8,24.5,34.8z"/>
					</g>
					<path class="xsvg-elem xsvg-elem_stroked" d="M15.5,7.7V3c0-0.8,0.6-1.4,1.4-1.4h28.3c0.8,0,1.4,0.6,1.4,1.4v36c0,0.8-0.6,1.4-1.4,1.4H32.5"/>
				</g>
			</g>`;
		let epaisseur = 3;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static couper(): ContenusSVG
	{
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<g>
				<path class="xsvg-elem xsvg-elem_filled" d="M29.89,22.47l9.39-12.62C41.6,6.72,40.95,2.32,37.82,0L25.49,16.56L29.89,22.47z"/>
				<path class="xsvg-elem xsvg-elem_filled" d="M10.14,0C7.01,2.32,6.36,6.72,8.68,9.85l10.91,14.64l-4.59,6.16c-0.3,0.45-0.86,0.71-1.36,0.71h-0.45
					c-4.9,0-8.79,4.24-8.23,9.24c0.4,3.79,3.48,6.87,7.32,7.32c5,0.56,9.24-3.38,9.24-8.23c0-1.21-0.25-2.37-0.71-3.38
					c-0.25-0.61-0.2-1.26,0.15-1.77l3.08-4.09l3.08,4.09c0.4,0.5,0.45,1.21,0.15,1.77c-0.61,1.36-0.86,2.88-0.66,4.49
					c0.5,3.64,3.38,6.61,7.02,7.12c5.86,0.81,10.76-4.49,9.19-10.4c-0.96-3.64-4.34-6.11-8.13-6.11h-0.35c-0.56,0-1.06-0.25-1.36-0.71
					L10.14,0z M16.61,39.69c0,1.92-1.57,3.43-3.43,3.43s-3.43-1.57-3.43-3.43c0-1.92,1.57-3.43,3.43-3.43S16.61,37.77,16.61,39.69z
					 M38.22,39.69c0,1.92-1.57,3.43-3.43,3.43s-3.43-1.57-3.43-3.43c0-1.92,1.57-3.43,3.43-3.43S38.22,37.77,38.22,39.69z"/>
			</g>`;
		let epaisseur = 3;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static croix(): ContenusSVG
	{
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<g>
				<line class="xsvg-elem xsvg-elem_stroked" x1="2" y1="2" x2="46" y2="46"/>
				<line class="xsvg-elem xsvg-elem_stroked" x1="2" y1="46" x2="46" y2="2"/>
			</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static demandeavis(): ContenusSVG
	{
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<path class="xsvg-elem xsvg-elem_filled" d="M37.38,0H21.79H10.79c-4.2,0-7.61,3.41-7.61,7.61v1.38v29.21v0.01l-2.98,8c-0.3,0.6,0,1.4,0.7,1.7C1.1,48,1.4,48,1.6,48
		l12.18-2.2h15.63h7.96c4.2,0,7.61-3.41,7.61-7.61V7.61C44.99,3.41,41.58,0,37.38,0z M23.98,36.23c-1.22,0-2.2-0.99-2.2-2.2
		c0-1.25,0.99-2.24,2.2-2.24c1.22,0,2.24,0.99,2.24,2.24C26.22,35.24,25.2,36.23,23.98,36.23z M26.22,27.38
		c0,1.22-1.03,2.2-2.24,2.2c-1.22,0-2.2-0.99-2.2-2.2V11.84c0-1.22,0.99-2.2,2.2-2.2c1.22,0,2.24,0.99,2.24,2.2V27.38z"/>
	<g id="point">
		<path class="xsvg-elem xsvg-elem_filled xsvg-transparent" d="M23.98,9.64c-1.22,0-2.2,0.99-2.2,2.2v15.54c0,1.22,0.99,2.2,2.2,2.2c1.22,0,2.24-0.99,2.24-2.2V11.84
			C26.22,10.62,25.2,9.64,23.98,9.64z"/>
		<path class="xsvg-elem xsvg-elem_filled xsvg-transparent" d="M23.98,31.79c-1.22,0-2.2,0.99-2.2,2.24c0,1.22,0.99,2.2,2.2,2.2c1.22,0,2.24-0.99,2.24-2.2
			C26.22,32.78,25.2,31.79,23.98,31.79z"/>
	</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static demandeavis_ajout(): ContenusSVG
	{
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
		<g id="rondplus">
			<path id="rond" class="xsvg-elem xsvg-elem_filled" d="M38,28c-5.5,0-10,4.5-10,10s4.5,10,10,10s10-4.5,10-10S43.5,28,38,28z M43.8,39.3c0,0.3-0.3,0.6-0.6,0.6h-3.4
				v3.4c0,0.3-0.3,0.6-0.6,0.6h-2.5c-0.3,0-0.6-0.3-0.6-0.6v-3.4h-3.4c-0.3,0-0.6-0.3-0.6-0.6v-2.5c0-0.3,0.3-0.6,0.6-0.6h3.4v-3.4
				c0-0.3,0.3-0.6,0.6-0.6h2.5c0.3,0,0.6,0.3,0.6,0.6v3.4h3.4c0.3,0,0.6,0.2,0.6,0.6V39.3z"/>
			<path id="plus" class="xsvg-elem xsvg-elem_filled xsvg-transparent" d="M43.2,36.2h-3.4v-3.4c0-0.3-0.3-0.6-0.6-0.6h-2.5c-0.3,0-0.6,0.3-0.6,0.6v3.4h-3.4
				c-0.3,0-0.6,0.3-0.6,0.6v2.5c0,0.3,0.3,0.6,0.6,0.6h3.4v3.4c0,0.3,0.3,0.6,0.6,0.6h2.5c0.3,0,0.6-0.3,0.6-0.6v-3.4h3.4
				c0.3,0,0.6-0.3,0.6-0.6v-2.5C43.8,36.4,43.5,36.2,43.2,36.2z"/>
		</g>
		<g id="bullepoint">
			<g id="point">
				<path class="xsvg-elem xsvg-elem_filled xsvg-transparent" d="M19.9,8c-1,0-1.8,0.8-1.8,1.8v13c0,1,0.8,1.8,1.8,1.8c1,0,1.9-0.8,1.9-1.8v-13C21.8,8.9,20.9,8,19.9,8z"/>
				<path class="xsvg-elem xsvg-elem_filled xsvg-transparent" d="M19.9,26.5c-1,0-1.8,0.8-1.8,1.9c0,1,0.8,1.8,1.8,1.8s1.9-0.8,1.9-1.8C21.8,27.3,20.9,26.5,19.9,26.5z"/>
			</g>
			<path id="bulle" class="xsvg-elem xsvg-elem_filled" d="M37.4,26V6.3c0-3.5-2.8-6.3-6.3-6.3h-13H8.9C5.4,0,2.6,2.8,2.6,6.3v1.1v24.3v0l-2.5,6.7c-0.2,0.5,0,1.2,0.6,1.4
				C0.8,40,1.1,40,1.3,40l10.2-1.8h13H26c0-0.1,0-0.1,0-0.2C26,31.6,31.1,26.3,37.4,26z M19.9,30.2c-1,0-1.8-0.8-1.8-1.8
				c0-1,0.8-1.9,1.8-1.9c1,0,1.9,0.8,1.9,1.9C21.8,29.4,20.9,30.2,19.9,30.2z M21.8,22.8c0,1-0.9,1.8-1.9,1.8c-1,0-1.8-0.8-1.8-1.8
				v-13c0-1,0.8-1.8,1.8-1.8c1,0,1.9,0.8,1.9,1.8V22.8z"/>
		</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static demandeavis_pleine(): ContenusSVG
	{
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<path class="xsvg-elem xsvg-elem_filled" d="M38.73-0.33H23.13H12.14c-4.2,0-7.61,3.41-7.61,7.61v1.38v29.21v0.01l-2.98,8c-0.3,0.6,0,1.4,0.7,1.7
	c0.2,0.1,0.5,0.1,0.7,0.1l12.18-2.2h15.63h7.96c4.2,0,7.61-3.41,7.61-7.61V7.27C46.33,3.07,42.93-0.33,38.73-0.33z"/>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static document(): ContenusSVG {
		let viewBoxContains = `0 0 35.11 48`;
		let contenu = `
			<g>
				<rect class="xsvg-elem xsvg-elem_stroked" x="2" y="2" width="31.11" height="44" rx="1.48"/>
				<line class="xsvg-elem xsvg-elem_stroked" x1="8.56" y1="9.06" x2="26.56" y2="9.06"/>
				<line class="xsvg-elem xsvg-elem_stroked" x1="8.56" y1="16.02" x2="20.65" y2="16.02"/>
				<line class="xsvg-elem xsvg-elem_stroked" x1="8.56" y1="39.58" x2="26.56" y2="39.58"/>
				<rect class="xsvg-elem xsvg-elem_stroked" x="8.56" y="23.71" width="18" height="9" rx="1.48"/>
			</g>`;
		let epaisseur = 3;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static dossier(): ContenusSVG {
		let viewBoxContains = `0 0 47.93 35.95`;
		let contenu = `
			<g>
			  <path class="xsvg-elem xsvg-elem_filled" d="M43.44,6h-18l-6-6h-15A4.49,4.49,0,0,0,0,4.49v27A4.49,4.49,0,0,0,4.49,36H43.44a4.49,4.49,0,0,0,4.49-4.49v-21A4.49,4.49,0,0,0,43.44,6Z"/>
			</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static drapeau(): ContenusSVG
	{
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<g>
				<path class="xsvg-elem xsvg-elem_filled" id="drapeau" d="M43,23.2l-9.4-10.1L43,2.9c0.5-0.5,0.6-1.2,0.4-1.9C43.1,0.4,42.4,0,41.7,0H8v26.1h33.7c1,0,1.8-0.8,1.8-1.8
		C43.5,23.9,43.3,23.5,43,23.2z"/>
				<path class="xsvg-elem xsvg-elem_filled" id="hampe" d="M6.3,0c-1,0-1.7,0.7-1.8,1.7c0,0,0,0,0,0.1v44.5c0,1,0.8,1.8,1.8,1.8c1,0,1.8-0.8,1.8-1.8V26.1V0H6.3z"/>
			</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static drapeau_medecin(): ContenusSVG
	{
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<g>
	<g>
		<path class="xsvg-elem xsvg-elem_filled" d="M40.8,20.6l-8.3-9l8.3-9c0.4-0.4,0.5-1.1,0.4-1.7C40.9,0.4,40.3,0,39.7,0H8.3C7.4,0,6.8,0.6,6.7,1.5
			c0,0,0,0,0,0.1V41c0,0.9,0.7,1.6,1.6,1.6s1.5-0.8,1.5-1.7V23.1h29.9c0.9,0,1.6-0.7,1.6-1.6C41.3,21.2,41.1,20.8,40.8,20.6z"/>
	</g>
	<g>
		<g>
			<path class="xsvg-elem xsvg-elem_filled" d="M32.6,40.1c0,0.4-0.4,0.8-0.8,0.8c-0.4,0-0.8-0.4-0.8-0.8c0-0.4,0.4-0.8,0.8-0.8
				C32.2,39.2,32.6,39.6,32.6,40.1z"/>
			<path class="xsvg-elem xsvg-elem_filled" d="M31.8,43.2c-0.3,0-0.6-0.1-0.9-0.1c-0.3,1.3-1,2.3-2.2,2.8c-1.2,0.6-2.5,0.6-3.8,0.4
				c-0.9-0.2-1.7-0.6-2.3-1.3c-0.7-0.8-1-1.7-1.1-2.7c0,0,0-0.1,0-0.1c-0.4,0.4-1.2,0.6-1.7,0.1c0.1,0.1,0.1,0.3,0.1,0.5
				c0.3,1.4,0.8,2.7,1.9,3.7c0.8,0.8,1.8,1.2,2.9,1.4c0.3,0,0.6,0.1,0.8,0.1c0.4,0,0.8,0,1.3,0c0.1,0,0.2,0,0.3,0
				c1-0.1,1.9-0.3,2.8-0.9c1.4-0.9,2.3-2.2,2.6-3.8c0-0.1,0-0.1,0.1-0.2C32.3,43.2,32,43.2,31.8,43.2z"/>
			<path class="xsvg-elem xsvg-elem_filled" d="M18.8,40.5c0.1,0,0.1,0.1,0.1,0.2c0.1,0.6,0.2,1.1,0.8,1.7c0.5,0.5,1.3,0.5,1.8-0.2c0.3-0.4,0.5-1,0.7-1.5
				c0-0.1,0.1-0.1,0.1-0.2c0.3-0.2,0.6-0.4,0.9-0.6c1-0.9,1.6-2,2.1-3.1c0.8-1.8,1.3-3.7,1.6-5.6c0.1-0.8,0-1.4-0.6-2
				c-0.3-0.3-0.7-0.5-1.1-0.8c-0.1-0.1-0.2-0.1-0.2-0.2c-0.4-0.6-1.1-0.8-1.8-0.6c-0.6,0.3-1,1-0.9,1.6c0.2,1,1.4,1.5,2.3,0.8
				c0,0,0.1-0.1,0.2-0.1c0.3,0.1,0.6,0.5,0.5,0.9c0,0.1,0,0.2-0.1,0.4c-0.4,1.9-0.9,3.8-1.8,5.6c-0.4,0.8-0.9,1.5-1.6,2
				c-0.6,0.5-1.3,0.6-2,0.3c-0.4-0.2-0.8-0.5-1.1-0.8c-0.9-0.9-1.4-2-1.8-3.2c-0.5-1.3-0.9-2.7-1.1-4.1c-0.1-0.4,0-0.7,0.4-1
				c0,0,0,0,0,0c0.1-0.1,0.2-0.1,0.3,0c0.6,0.5,1.6,0.4,2.1-0.3c0.5-0.6,0.3-1.6-0.4-2c-0.7-0.5-1.6-0.3-2,0.4
				c-0.1,0.1-0.1,0.2-0.2,0.2c-0.8,0.5-1.5,1-1.7,1.9c0,0.2,0,0.4,0,0.5c0.1,0.5,0.2,1,0.3,1.5c0.5,2.1,1.1,4.2,2.3,6.1
				C17.3,39.3,17.9,40,18.8,40.5z"/>
			<path class="xsvg-elem xsvg-elem_filled" d="M31.8,36.9c-1.8,0-3.2,1.4-3.2,3.2c0,1.8,1.4,3.2,3.2,3.2c1.8,0,3.2-1.4,3.2-3.2
				C35,38.3,33.5,36.9,31.8,36.9z M31.8,41.6c-0.9,0-1.6-0.7-1.6-1.6c0-0.9,0.7-1.6,1.6-1.6c0.9,0,1.6,0.7,1.6,1.6
				C33.3,40.9,32.6,41.6,31.8,41.6z"/>
		</g>
		<path class="xsvg-elem xsvg-elem_filled" d="M18.9,29c0,0.8-0.7,1.5-1.5,1.5c-0.8,0-1.5-0.7-1.5-1.5c0-0.8,0.7-1.5,1.5-1.5C18.2,27.5,18.9,28.1,18.9,29z"
			/>
		<path class="xsvg-elem xsvg-elem_filled" d="M25.2,29c0,0.8-0.7,1.5-1.5,1.5c-0.8,0-1.5-0.7-1.5-1.5c0-0.8,0.7-1.5,1.5-1.5C24.5,27.5,25.2,28.1,25.2,29z"
			/>
	</g>
</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};

	public static download(): ContenusSVG
	{
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
		<g>
			<g>
				<path class="xsvg-elem xsvg-elem_filled" d="M45.73,45H2.29c-1.09,0-1.97-0.88-1.97-1.97v-20.7c0-1.09,0.88-1.97,1.97-1.97s1.97,0.88,1.97,1.97v18.73h39.49V22.32
					c0-1.09,0.88-1.97,1.97-1.97c1.09,0,1.97,0.88,1.97,1.97v20.7C47.71,44.12,46.82,45,45.73,45z"/>
			</g>
			<path class="xsvg-elem xsvg-elem_filled" d="M35.55,21.14c-0.77-0.77-2.02-0.77-2.79,0l-6.77,6.77V6c0-1.09-0.88-1.97-1.97-1.97c-1.09,0-1.97,0.88-1.97,1.97v21.91
				l-6.77-6.77c-0.77-0.77-2.02-0.77-2.79,0c-0.77,0.77-0.77,2.02,0,2.79l10.14,10.14c0.09,0.09,0.19,0.17,0.3,0.25
				c0.05,0.03,0.1,0.05,0.15,0.08c0.06,0.04,0.13,0.07,0.19,0.1c0.06,0.03,0.13,0.04,0.2,0.06c0.06,0.02,0.11,0.04,0.17,0.05
				c0.13,0.03,0.26,0.04,0.39,0.04s0.26-0.01,0.39-0.04c0.06-0.01,0.11-0.03,0.17-0.05c0.07-0.02,0.13-0.03,0.2-0.06
				c0.07-0.03,0.13-0.07,0.2-0.1c0.05-0.03,0.1-0.05,0.14-0.08c0.11-0.07,0.21-0.16,0.3-0.25l10.14-10.14
				C36.32,23.16,36.32,21.91,35.55,21.14z"/>
		</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	}

	public static dupliquer(): ContenusSVG
	{
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
		<g>
			<path class="xsvg-elem xsvg-elem_stroked" d="M16.5,10.5H40c3.3,0,6,2.7,6,6V40c0,3.3-2.7,6-6,6H16.5c-3.3,0-6-2.7-6-6V16.5C10.5,13.2,13.2,10.5,16.5,10.5z
				"/>
			<path class="xsvg-elem xsvg-elem_stroked" d="M37.5,10.5l0.1-2.5c0-3.3-2.7-5.9-5.9-5.9H8.8C5,2,2,5,2,8.8v22.8c0,3.3,2.7,5.9,5.9,5.9h2.5"/>
			<line class="xsvg-elem xsvg-elem_stroked" x1="28.2" y1="19.8" x2="28.2" y2="36.7"/>
			<line class="xsvg-elem xsvg-elem_stroked" x1="36.7" y1="28.2" x2="19.8" y2="28.2"/>
		</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	}
	public static editer_colonnes(): ContenusSVG {
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<g>
				<g>
					<path class="xsvg-elem xsvg-elem_filled" d="M45,45c0.7-0.7,0.7-1.9,0-2.6l-0.2-0.2c0.5-0.8,0.9-1.7,1.1-2.6h0.2c1,0,1.9-0.8,1.9-1.9c0-1-0.8-1.9-1.9-1.9
						h-0.2c-0.2-0.9-0.6-1.8-1.1-2.6l0.2-0.2c0.7-0.7,0.7-1.9,0-2.6c-0.7-0.7-1.9-0.7-2.6,0l-0.2,0.2c-0.8-0.5-1.7-0.9-2.6-1.1v-0.2
						c0-1-0.8-1.9-1.9-1.9s-1.9,0.8-1.9,1.9v0.2c-0.9,0.2-1.8,0.6-2.6,1.1l-0.2-0.2c-0.7-0.7-1.9-0.7-2.6,0c-0.7,0.7-0.7,1.9,0,2.6
						l0.2,0.2c-0.5,0.8-0.9,1.7-1.1,2.6h-0.2c-1,0-1.9,0.8-1.9,1.9s0.8,1.9,1.9,1.9h0.2c0.2,0.9,0.6,1.8,1.1,2.6l-0.2,0.2
						c-0.7,0.7-0.7,1.9,0,2.6c0.4,0.4,0.8,0.5,1.3,0.5s1-0.2,1.3-0.5l0.2-0.2c0.8,0.5,1.7,0.9,2.6,1.1v0.2c0,1,0.8,1.9,1.9,1.9
						s1.9-0.8,1.9-1.9v-0.2c0.9-0.2,1.8-0.6,2.6-1.1l0.2,0.2c0.4,0.4,0.8,0.5,1.3,0.5C44.1,45.5,44.6,45.4,45,45z M37.7,42.4
						c-2.6,0-4.7-2.1-4.7-4.7c0-2.6,2.1-4.7,4.7-4.7s4.7,2.1,4.7,4.7C42.4,40.3,40.3,42.4,37.7,42.4z"/>
					<circle class="xsvg-elem xsvg-elem_filled" cx="37.7" cy="37.7" r="2.8"/>
				</g>
				<line class="xsvg-elem xsvg-elem_stroked" x1="2" y1="12" x2="46" y2="12"/>
				<line class="xsvg-elem xsvg-elem_stroked" x1="2" y1="46" x2="24" y2="46"/>
				<line class="xsvg-elem xsvg-elem_stroked" x1="16" y1="2" x2="16" y2="46"/>
				<line class="xsvg-elem xsvg-elem_stroked" x1="32" y1="2" x2="32" y2="24"/>
				<line class="xsvg-elem xsvg-elem_stroked" x1="2" y1="2" x2="46" y2="2"/>
				<line class="xsvg-elem xsvg-elem_stroked" x1="2" y1="2" x2="2" y2="46"/>
				<line class="xsvg-elem xsvg-elem_stroked" x1="46" y1="2" x2="46" y2="24"/>
			</g>`;
		let epaisseur = 3;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};

	public static envoyer_mail(): ContenusSVG {
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<g class="xsvg-elem" transform="translate(-502.659 -262.306)">
				<path id="enveloppe" class="xsvg-elem xsvg-elem_filled" d="M547.3,273.6H519c-1.8,0-3.3,1.5-3.3,3.3v18.7c0,1.8,1.5,3.3,3.3,3.3h28.4
					c1.8,0,3.3-1.5,3.3-3.3V277C550.7,275.1,549.2,273.6,547.3,273.6z M534.2,288.3c-0.6,0.6-1.5,0.6-2.1,0c0,0,0,0,0,0l-11.8-11.8H546
					L534.2,288.3z M526.3,286.2l-7.9,7.9v-15.7L526.3,286.2z M528.2,288l3.9,3.9c0.6,0.6,1.5,0.6,2.1,0c0,0,0,0,0,0l3.9-3.9l8.1,8.1
					h-26.1L528.2,288z M539.9,286.2l7.9-7.9v15.7L539.9,286.2z"/>
				<path id="trait1" class="xsvg-elem xsvg-elem_filled" d="M513.7,281.7c0,0.8-0.7,1.5-1.5,1.5l0,0h-8.1c-0.8,0-1.5-0.7-1.5-1.5l0,0l0,0
					c0-0.8,0.7-1.5,1.5-1.5l0,0h8.1C513,280.2,513.7,280.9,513.7,281.7L513.7,281.7z"/>
				<path id="trait2" class="xsvg-elem xsvg-elem_filled" d="M513.7,286.3c0,0.8-0.7,1.5-1.5,1.5l0,0h-8.1c-0.8,0-1.5-0.7-1.5-1.5l0,0l0,0
					c0-0.8,0.7-1.5,1.5-1.5l0,0h8.1C513,284.8,513.7,285.5,513.7,286.3L513.7,286.3z"/>
				<path id="trait3" class="xsvg-elem xsvg-elem_filled" d="M513.7,291.2c0,0.8-0.7,1.5-1.5,1.5l0,0h-8.1c-0.8,0-1.5-0.7-1.5-1.5l0,0l0,0
					c0-0.8,0.7-1.5,1.5-1.5l0,0h8.1C513,289.7,513.7,290.4,513.7,291.2L513.7,291.2z"/>
			</g>`;
		let epaisseur = 3;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static etablissement(): ContenusSVG {
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<g class="xsvg-elem">
				<path class="xsvg-elem xsvg-elem_filled" d="M22,0H2C0.9,0,0,0.9,0,2v46h24V2C24,0.9,23.1,0,22,0z M9,35c0,0.6-0.4,1-1,1H4c-0.6,0-1-0.4-1-1v-4
					c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V35z M9,23c0,0.6-0.4,1-1,1H4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V23z M9,11
					c0,0.6-0.4,1-1,1H4c-0.6,0-1-0.4-1-1V7c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V11z M21,35c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4
					c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V35z M21,23c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V23z
					 M21,11c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1V7c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V11z"/>
				<path class="xsvg-elem xsvg-elem_filled" d="M46,21H29c-1.1,0-2,0.9-2,2v25h21V23C48,21.9,47.1,21,46,21z M42,48h-9V37c0-0.6,0.4-1,1-1h7c0.6,0,1,0.4,1,1
					V48z"/>
				<path class="xsvg-elem xsvg-elem_filled" d="M28.5,18h18c0.8,0,1.5-0.7,1.5-1.5S47.3,15,46.5,15h-18c-0.8,0-1.5,0.7-1.5,1.5S27.7,18,28.5,18z"/>
			</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static facture(): ContenusSVG {
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<g>
				<g id="feuille">
					<g>
						<path class="xsvg-elem xsvg-elem_filled" d="M25,3.1l13.3,13.3v27.4c0,0.5-0.4,0.9-0.9,0.9H10.5c-0.5,0-0.9-0.4-0.9-0.9V4c0-0.5,0.4-0.9,0.9-0.9H25 M25.4,0H10.5
							c-2.2,0-4,1.8-4,4V44c0,2.2,1.8,4,4,4h27c2.2,0,4-1.8,4-4V16c0-0.5-0.2-1-0.6-1.4l-14.1-14C26.4,0.2,25.9,0,25.4,0L25.4,0z"/>
					</g>
					<path class="xsvg-elem xsvg-elem_filled" d="M24.8,1.4L40,16.7H26.8c-1.1,0-2.1-0.9-2.1-2.1V1.4z"/>
				</g>
				<g id="euro">
					<path class="xsvg-elem xsvg-elem_filled" d="M26.4,34.9c0.3,2.9,1.2,4.4,2.8,4.4c0.6,0,1.1-0.1,1.6-0.4c0.5-0.3,1-0.9,1.4-2c0.3-0.7,0.5-1.1,0.8-1.3
						c0.2-0.2,0.4-0.2,0.7-0.2c0.5,0,0.9,0.1,1.1,0.4c0.3,0.3,0.4,0.7,0.4,1.2c0,1.2-0.6,2.3-1.8,3.3c-1.2,1-2.6,1.5-4.2,1.5
						c-1.6,0-2.9-0.6-4.1-1.7s-1.9-2.8-2.1-5.1h-1.5c-0.1,0-0.2-0.1-0.2-0.3c0-0.2,0.1-0.5,0.2-0.8c0.2-0.3,0.3-0.5,0.4-0.5h1v-0.4
						c0-0.4,0-0.9,0-1.5h-1.5c-0.1,0-0.2-0.1-0.2-0.3c0-0.2,0.1-0.5,0.2-0.8c0.2-0.3,0.3-0.5,0.4-0.5h1.2c0.5-4.2,2.5-6.3,6-6.3
						c1.5,0,2.8,0.4,3.9,1.2c1.1,0.8,1.7,1.8,1.7,2.9c0,0.4-0.1,0.7-0.4,1c-0.3,0.3-0.6,0.4-0.9,0.4c-0.4,0-0.7-0.1-0.9-0.3
						c-0.2-0.2-0.4-0.5-0.6-1c-0.2-0.6-0.5-1-0.8-1.3c-0.3-0.3-0.9-0.5-1.7-0.5c-0.9,0-1.6,0.3-2.1,0.9c-0.5,0.6-0.8,1.6-0.9,2.9h3.9
						c0.2,0,0.2,0.1,0.2,0.3c0,0.2-0.1,0.5-0.2,0.8c-0.1,0.3-0.3,0.4-0.4,0.4h-3.6l0,1.2c0,0.4,0,0.6,0,0.8h4c0.2,0,0.2,0.1,0.2,0.3
						c0,0.2-0.1,0.5-0.2,0.8c-0.1,0.3-0.3,0.4-0.4,0.4H26.4z"/>
				</g>
			</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static favori(): ContenusSVG {
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<g>
			  <polygon class="xsvg-elem xsvg-elem_filled" points="24,1.17 31.42,16.2 48,18.61 36,30.31 38.83,46.83 24,39.03 9.17,46.83 12,30.31 0,18.61 16.58,16.2 	"/>
			</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static fiche_administrative(): ContenusSVG {
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<g>
			  <path class="xsvg-elem xsvg-elem_filled" d="M45.5,9.4h-43C1.1,9.4,0,10.5,0,11.8v24.3c0,1.4,1.1,2.5,2.5,2.5h43c1.4,0,2.5-1.1,2.5-2.5V11.8C48,10.5,46.9,9.4,45.5,9.4z
	 M21.4,30.3c-4.3,4-11.1,3.8-15.2-0.5c0.4-3,2.3-5.5,5.1-6.6c-1-0.8-1.6-2-1.6-3.3c0.1-2.3,1.9-4.2,4.3-4.3c2.4-0.1,4.4,1.8,4.5,4.3
	c0,1.3-0.6,2.5-1.6,3.3c2.2,0.7,4,2.5,4.8,4.7c0.2,0.6,0.3,1.3,0.4,1.9C21.8,30,21.6,30.1,21.4,30.3z M37.8,31.1h-9.6
	c-0.8,0-1.5-0.7-1.5-1.5s0.7-1.5,1.5-1.5h9.6c0.8,0,1.5,0.7,1.5,1.5S38.6,31.1,37.8,31.1z M26.6,24.1c0-0.8,0.7-1.5,1.5-1.5H33
	c0.8,0,1.5,0.7,1.5,1.5s-0.7,1.5-1.5,1.5h-4.8C27.3,25.6,26.6,25,26.6,24.1z M39.8,20.1H28.1c-0.8,0-1.5-0.7-1.5-1.5
	s0.7-1.5,1.5-1.5h11.7c0.8,0,1.5,0.7,1.5,1.5S40.7,20.1,39.8,20.1z"/>
			</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static filtrer(): ContenusSVG {
		let viewBoxContains = `0 0 47.56 36.1`;
		let contenu = `
			<g>
			  <line class="xsvg-elem xsvg-elem_stroked" x1="2" y1="2" x2="45.56" y2="2"/>
			  <line class="xsvg-elem xsvg-elem_stroked" x1="8.88" y1="18.05" x2="38.68" y2="18.05"/>
			  <line class="xsvg-elem xsvg-elem_stroked" x1="18.05" y1="34.1" x2="29.51" y2="34.1"/>
			</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static flag(): ContenusSVG {
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<g>
			  <path class="xsvg-elem xsvg-elem_filled" d="M43,23.2l-9.4-10.1L43,2.9c0.5-0.5,0.6-1.2,0.4-1.9C43.1,0.4,42.4,0,41.7,0H6.3c-1,0-1.7,0.7-1.8,1.7	c0,0,0,0,0,0.1v44.5c0,1,0.8,1.8,1.8,1.8S8,47.2,8,46.2V26.1h33.7c1,0,1.8-0.8,1.8-1.8C43.5,23.9,43.3,23.5,43,23.2z"/>
			</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static fleche_droite(): ContenusSVG {
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<g>
				<polyline class="xsvg-elem xsvg-elem_stroked" points="26.28,43.77 46,24 26.28,4.23 	"/>
				<line class="xsvg-elem xsvg-elem_stroked" x1="2" y1="24" x2="45.58" y2="24"/>
			</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static fusion(): ContenusSVG {
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<g>
				<path class="xsvg-elem xsvg-elem_filled" d="M37,17.3c4.3-2.9,10.2-6.9,10.2-17.3h-9.8c0,5.2-2,6.5-5.9,9.1c-2.4,1.6-5.2,3.5-7.5,6.5c-2.3-3-5.1-4.9-7.5-6.5
	c-3.9-2.6-5.9-4-5.9-9.1H0.8c0,10.4,5.9,14.4,10.2,17.3c4.2,2.8,7.6,5.1,8,13.5h-8.9l14,17.2l14-17.2H29
	C29.4,22.4,32.8,20.1,37,17.3z"/>
			</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static geolocalisation(): ContenusSVG {
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<g>
				<path class="xsvg-elem xsvg-elem_filled" d="M24,0C14.3,0,6.3,7.9,6.3,17.7c0,2.5,0.5,5,1.5,7.2c4.4,9.7,12.9,19.9,15.4,22.8c0.2,0.2,0.5,0.3,0.7,0.3
					c0.3,0,0.6-0.1,0.7-0.3c2.5-2.9,11-13.1,15.4-22.8c1-2.2,1.5-4.7,1.5-7.2C41.7,7.9,33.7,0,24,0z M24,26.9c-5.1,0-9.2-4.1-9.2-9.2
					c0-5.1,4.1-9.2,9.2-9.2s9.2,4.1,9.2,9.2C33.2,22.7,29.1,26.9,24,26.9z"/>
			</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static historique(): ContenusSVG
	{
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<g>
				<g>
					<path class="xsvg-elem xsvg-elem_stroked" d="M19.3,43.1c7.6,2.9,16.4,0.9,22-5.6c7.1-8.3,6.2-20.7-2.1-27.9s-20.7-6.2-27.9,2.1c-2.7,3.1-4.2,6.8-4.6,10.6"/>
					<polyline class="xsvg-elem xsvg-elem_stroked" points="2,19.8 6.2,26.1 12.6,21.9"/>
					<path class="xsvg-elem xsvg-elem_stroked" d="M19.3,43.1c7.6,2.9,16.4,0.9,22-5.6c7.1-8.3,6.2-20.7-2.1-27.9s-20.7-6.2-27.9,2.1c-3.5,4.1-5.1,9.2-4.7,14.2"/>
				</g>
				<g>
					<polyline class="xsvg-elem xsvg-elem_stroked" points="26.4,11.3 26.4,24.7 33.3,29.9"/>
				</g>
			</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static home(): ContenusSVG
	{
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<g>
			  <polygon class="xsvg-elem xsvg-elem_stroked" points="46,46 2,46 2,20.59 24,2 46,20.59"/>
			</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static horaire(): ContenusSVG {
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<g>
				<circle class="xsvg-elem xsvg-elem_stroked" cx="24" cy="24" r="22"/>
				<polyline class="xsvg-elem xsvg-elem_stroked" points="24,9.88 24,24.13 31.39,29.74"/>
			</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static image(): ContenusSVG {
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<g>
				<path class="xsvg-elem xsvg-elem_stroked" d="M45.01,46.5H2.99c-0.83,0-1.49-0.67-1.49-1.49V2.99c0-0.83,0.67-1.49,1.49-1.49h42.01
					c0.83,0,1.49,0.67,1.49,1.49v42.01C46.5,45.83,45.83,46.5,45.01,46.5z"/>
				<path class="xsvg-elem xsvg-elem_stroked" d="M1.5,42.28c0,0,35.71-15.41,45,0"/>
				<path class="xsvg-elem xsvg-elem_stroked" d="M1.5,37.23c0,0,8.8-13.67,11.49-13.22c0.67,0.11,1.86,0.82,3.27,1.83c4.23,3.01,10.42,8.65,10.42,8.65
					s7.83-9.44,10.76-8.51c2.93,0.93,9.05,3.7,9.05,4.64"/>
				<path class="xsvg-elem xsvg-elem_stroked" d="M35.63,25.89c-0.93-5.06-5.36-8.9-10.69-8.9c-4.91,0-9.05,3.25-10.4,7.72"/>
				<path class="xsvg-elem xsvg-elem_stroked" d="M24.58,10.96"/>
				<line class="xsvg-elem xsvg-elem_stroked" x1="25.09" y1="11.55" x2="25.09" y2="7.42"/>
				<line class="xsvg-elem xsvg-elem_stroked" x1="33.26" y1="13.15" x2="35.32" y2="9.57"/>
				<line class="xsvg-elem xsvg-elem_stroked" x1="17.03" y1="13.15" x2="14.97" y2="9.57"/>
			</g>`;
		let epaisseur = 3;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static imprimer(): ContenusSVG
	{
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<g>
				<polyline class="xsvg-elem xsvg-elem_stroked" points="13.5,36 2,36 2,12 46,12 46,36 34.5,36 	"/>
				<polyline class="xsvg-elem xsvg-elem_stroked" points="34.5,29 34.5,46 13.5,46 13.5,29 	"/>
				<line class="xsvg-elem xsvg-elem_stroked" x1="9" y1="29" x2="39" y2="29"/>
				<rect x="9" y="2" class="xsvg-elem xsvg-elem_stroked" width="30" height="10"/>
				<line class="xsvg-elem xsvg-elem_stroked" x1="41" y1="17" x2="41" y2="17"/>
				<line class="xsvg-elem xsvg-elem_stroked" x1="36" y1="17" x2="36" y2="17"/>
				<line class="xsvg-elem xsvg-elem_stroked" x1="19.5" y1="34.8" x2="28.5" y2="34.8"/>
				<line class="xsvg-elem xsvg-elem_stroked" x1="19.5" y1="40.2" x2="28.5" y2="40.2"/>
			</g>`;
		let epaisseur = 3;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static incident_interne_externe(): ContenusSVG
	{
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<g>
				<path id="cube" class="xsvg-elem xsvg-elem_filled xsvg-elem_couleurSecondaire" d="M47.4,31.7c-2.8-1.4-5.6-2.9-8.4-4.3c-0.2-0.1-0.7-0.1-0.9,0c-2.8,1.4-5.6,2.8-8.4,4.2c-0.4,0.2-0.6,0.5-0.6,0.9
					c0,3.4,0,6.7,0,10.1c0,0.5,0.2,0.8,0.6,1c1.8,0.9,3.6,1.8,5.4,2.7c1,0.5,2,1.1,3.1,1.6c0.2,0,0.4,0,0.7,0c0.2-0.1,0.4-0.2,0.5-0.3
					c2.5-1.3,5.1-2.6,7.6-3.9c0.4-0.2,0.7-0.5,1.1-0.8c0,0,0-0.1,0-0.1c0-3.5,0-6.9,0-10.4c0-0.1,0-0.1,0-0.2
					C47.8,32.1,47.6,31.8,47.4,31.7z M37.6,45.4C37.5,45.4,37.5,45.4,37.6,45.4c-0.9-0.3-1.7-0.6-2.5-1c-1.3-0.7-2.6-1.3-3.9-2
					c-0.1-0.1-0.3-0.3-0.3-0.4c0-2.6,0-5.2,0-7.9c0.6,0.3,1.1,0.5,1.6,0.8c1.6,0.8,3.2,1.6,4.8,2.4c0.1,0.1,0.3,0.2,0.3,0.4
					C37.6,40.3,37.6,42.8,37.6,45.4z M38.7,35.7c-0.1,0.1-0.3,0.1-0.4,0c-1.9-1-3.8-1.9-5.7-2.9c-0.1-0.1-0.3-0.2-0.5-0.3
					c0.4-0.2,0.7-0.4,1-0.6c1.7-0.8,3.3-1.7,5-2.5c0.2-0.1,0.5-0.1,0.7,0c2,1,4,2,6,3c0,0,0.1,0.1,0.1,0.1c-1.4,0.7-2.7,1.4-4.1,2.1
					C40.1,35,39.4,35.4,38.7,35.7z M45.8,42.3c-1.1,0.6-2.2,1.1-3.3,1.7c-1,0.5-2,1-3,1.5c0-0.2,0-0.3,0-0.4c0-2.4,0-4.9,0-7.3
					c0-0.3,0-0.4,0.3-0.5c2-1,4-2,6-3c0.1,0,0.2-0.1,0.2-0.1c0,0,0.1,0.1,0.1,0.1c0,2.6,0,5.1,0,7.7C46.1,42,45.9,42.2,45.8,42.3z"/>
				<g id="document">
					<path class="xsvg-elem xsvg-elem_stroked xsvg-elem_couleurPrincipale" d="M15.9,24.1H2.5c-0.8,0-1.5-0.7-1.5-1.5V2.5C1,1.7,1.7,1,2.5,1h13.4c0.8,0,1.5,0.7,1.5,1.5v20.2
						C17.4,23.5,16.7,24.1,15.9,24.1z"/>
					<line class="xsvg-elem xsvg-elem_stroked xsvg-elem_couleurPrincipale" x1="4.4" y1="4.7" x2="13.9" y2="4.7"/>
					<line class="xsvg-elem xsvg-elem_stroked xsvg-elem_couleurPrincipale" x1="4.4" y1="8.4" x2="10.8" y2="8.4"/>
					<line class="xsvg-elem xsvg-elem_stroked xsvg-elem_couleurPrincipale" x1="4.4" y1="20.8" x2="13.9" y2="20.8"/>
					<path class="xsvg-elem xsvg-elem_stroked xsvg-elem_couleurPrincipale" d="M12.4,17.1H5.9c-0.8,0-1.5-0.7-1.5-1.5v-1.8c0-0.8,0.7-1.5,1.5-1.5h6.5c0.8,0,1.5,0.7,1.5,1.5v1.8
						C13.9,16.5,13.2,17.1,12.4,17.1z"/>
				</g>
				<g id="fleches">
					<g>
						<polyline class="xsvg-elem xsvg-elem_stroked xsvg-elem_couleurTertiaire" points="24.3,8.7 24.2,12.8 28.3,12.9 			"/>
						<path class="xsvg-elem xsvg-elem_stroked xsvg-elem_couleurTertiaire" d="M25.3,11.9c3.6-3.6,8.7-4.4,11.4-1.8s1.9,7.8-1.8,11.4"/>
					</g>
					<g>
						<polyline class="xsvg-elem xsvg-elem_stroked" points="23.7,41.3 23.8,37.2 19.7,37.1 			"/>
						<path class="xsvg-elem xsvg-elem_stroked" d="M22.7,38.1c-3.6,3.6-8.7,4.4-11.4,1.8c-2.7-2.7-1.9-7.8,1.8-11.4"/>
					</g>
				</g>
			</g>`;
		let epaisseur = 3;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static informations(): ContenusSVG {
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<g>
				<path class="xsvg-elem xsvg-elem_filled" d="M32,1.3C31,0.4,29.5,0,27.7,0c-1.5,0-2.8,0.3-4,0.9c-1.2,0.6-2.2,1.5-2.8,2.5c-0.7,1-1,2.2-1,3.4c0,1.4,0.5,2.6,1.5,3.5c1,0.9,2.4,1.3,4.3,1.3c1.5,0,2.8-0.3,4-0.9c1.2-0.6,2.1-1.4,2.8-2.5c0.7-1.1,1-2.2,1-3.4
		C33.5,3.4,33,2.2,32,1.3z"/>
				<path class="xsvg-elem xsvg-elem_filled" d="M31.1,41.6c0,0-5.4,2.2-4.9-0.6l3.7-21c0.5-2.6-1.5-5-4.2-5h-5.9h-0.6h-3.8l-0.3,1.3c0,0,3.9,0.2,3.3,3.6c-1.3,7.6-3.8,21.5-3.8,21.5c-0.3,1.9,0.3,3.8,1.7,5.1c2.1,1.9,5,1.8,7.5,1c0.8-0.3,8.2-3.6,8.2-3.6L31.1,41.6z"/>
			</g>`;
		let epaisseur = 4;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static liste(): ContenusSVG {
		let viewBoxContains = `0 0 47.76 38.54`;
		let contenu = `
			<g>
				<line class="xsvg-elem xsvg-elem_stroked" x1="17.3" y1="2.95" x2="45.76" y2="2.95"/>
				<line class="xsvg-elem xsvg-elem_stroked" x1="17.3" y1="18.77" x2="45.76" y2="18.77"/>
				<line class="xsvg-elem xsvg-elem_stroked" x1="17.3" y1="35.59" x2="45.76" y2="35.59"/>
				<circle class="xsvg-elem xsvg-elem_stroked xsvg-elem_filled" cx="2.95" cy="2.95" r="0.95"/>
				<circle class="xsvg-elem xsvg-elem_stroked xsvg-elem_filled" cx="2.95" cy="35.59" r="0.95"/>
				<circle class="xsvg-elem xsvg-elem_stroked xsvg-elem_filled" cx="2.95" cy="18.77" r="0.95"/>
			</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static liste_simple(): ContenusSVG
	{
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<g>
				<line class="xsvg-elem xsvg-elem_stroked" x1="17.4" y1="23.5" x2="45.9" y2="23.5"/>
				<circle class="xsvg-elem xsvg-elem_stroked" cx="3.1" cy="23.5" r="0.9"/>
			</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static liste_choix_tous(): ContenusSVG
	{
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<g class="xsvg-elem">
				<path class="xsvg-elem xsvg-elem_filled" d="M45.2,3.9c0,2.2-1.7,3.9-3.9,3.9H6.6c-2.2,0-3.9-1.8-3.9-3.9l0,0C2.8,1.8,4.5,0,6.6,0h34.7C43.5,0,45.2,1.8,45.2,3.9
					L45.2,3.9z"/>
				<path class="xsvg-elem xsvg-elem_filled" d="M45.2,17.3c0,2.2-1.7,3.9-3.9,3.9H6.6c-2.2,0-3.9-1.8-3.9-3.9l0,0c0-2.2,1.7-3.9,3.9-3.9h34.7
					C43.5,13.4,45.2,15.1,45.2,17.3L45.2,17.3z"/>
				<path class="xsvg-elem xsvg-elem_filled" d="M45.2,30.7c0,2.2-1.7,3.9-3.9,3.9H6.6c-2.2,0-3.9-1.8-3.9-3.9l0,0c0-2.2,1.7-3.9,3.9-3.9h34.7
					C43.5,26.8,45.2,28.5,45.2,30.7L45.2,30.7z"/>
				<path class="xsvg-elem xsvg-elem_filled" d="M45.2,44.1c0,2.2-1.7,3.9-3.9,3.9H6.6c-2.2,0-3.9-1.8-3.9-3.9l0,0c0-2.2,1.7-3.9,3.9-3.9h34.7
					C43.5,40.2,45.2,41.9,45.2,44.1L45.2,44.1z"/>
			</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static lit(): ContenusSVG
	{
		let viewBoxContains = `0 0 47.7 28.62`;
		let contenu = `
			<g>
			  <path class="xsvg-elem xsvg-elem_filled" d="M13.12,14.31a6,6,0,1,0-6-6A6,6,0,0,0,13.12,14.31ZM39.35,4.77H22.66A1.19,1.19,0,0,0,21.46,6V16.69H4.77V1.19A1.19,1.19,0,0,0,3.58,0H1.19A1.19,1.19,0,0,0,0,1.19V27.42a1.19,1.19,0,0,0,1.19,1.2H3.58a1.19,1.19,0,0,0,1.19-1.2V23.85H42.93v3.57a1.19,1.19,0,0,0,1.19,1.2H46.5a1.2,1.2,0,0,0,1.2-1.2V13.12A8.35,8.35,0,0,0,39.35,4.77Z"/>
			</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static lit_retour(): ContenusSVG
	{
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<g id="lit">
				<path class="xsvg-elem xsvg-elem_filled xsvg-elem_couleurPrincipale" d="M13.3,33c3.3,0,6-2.7,6-6s-2.7-6-6-6s-6,2.7-6,6S10,33,13.3,33z M39.5,23.5H22.8c-0.7,0-1.2,0.5-1.2,1.2v10.7H4.9V19.9
					c0-0.7-0.5-1.2-1.2-1.2H1.3c-0.7,0-1.2,0.5-1.2,1.2v26.2c0,0.7,0.5,1.2,1.2,1.2h2.4c0.7,0,1.2-0.5,1.2-1.2v-3.6h38.2v3.6
					c0,0.7,0.5,1.2,1.2,1.2h2.4c0.7,0,1.2-0.5,1.2-1.2V31.8C47.8,27.2,44.1,23.5,39.5,23.5z"/>
			</g>
			<g id="fleche">
				<polyline class="xsvg-elem xsvg-elem_stroked xsvg-elem_couleurSecondaire" points="35.6,2 27.1,10.5 35.6,19 	"/>
				<line class="xsvg-elem xsvg-elem_stroked fleche xsvg-elem_couleurSecondaire" x1="46" y1="10.5" x2="27.3" y2="10.5"/>
			</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static main_levee(): ContenusSVG {
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<g>
			  <path class="xsvg-elem xsvg-elem_filled" d="M28.89,40.53c0.39-0.38,11.2-13.29,11.57-13.75c1.43-1.72,1.22-4.27-0.47-5.73c-1.59-1.37-3.95-1.31-5.47,0.14l-2.1,1.99
		L32.3,7.37c0-2.39-1.94-4.33-4.34-4.33c-0.5,0-1,0.09-1.47,0.26c-0.57-2.32-2.91-3.75-5.23-3.18c-1.57,0.38-2.79,1.61-3.18,3.18
		c-2.25-0.81-4.73,0.35-5.55,2.6c-0.17,0.47-0.26,0.97-0.26,1.47v1.55C10,8.18,7.56,9.42,6.81,11.69c-0.14,0.44-0.22,0.89-0.22,1.35
		v22.44c0,1.95,0.8,3.81,2.21,5.16c-1.38,0.99-2.21,2.58-2.21,4.28V48h24.68v-3.07C31.27,43.15,30.37,41.5,28.89,40.53z
		 M23.82,39.66H13.75c-2.31,0-4.17-1.87-4.18-4.18V13.04c0-0.75,0.6-1.35,1.35-1.35s1.35,0.6,1.35,1.35v6.41
		c0,0.82,0.67,1.49,1.49,1.49s1.49-0.67,1.49-1.49V7.38c0-0.75,0.6-1.35,1.35-1.35c0.75,0,1.35,0.6,1.35,1.35v12.08
		c0,0.82,0.67,1.49,1.49,1.49c0.82,0,1.49-0.67,1.49-1.49V4.34c0-0.75,0.6-1.35,1.35-1.35s1.35,0.6,1.35,1.35v15.12
		c0,0.82,0.66,1.49,1.49,1.49c0,0,0,0,0,0c0.82,0,1.49-1.49,1.49-1.49V7.38c0-0.75,0.6-1.35,1.35-1.35s1.35,0.6,1.35,1.35
		l0.13,17.86c0.01,1.15,0.95,2.08,2.1,2.07c0.53,0,1.04-0.21,1.42-0.57l3.59-3.41c0.45-0.41,1.15-0.38,1.56,0.08
		c0.37,0.4,0.38,1.01,0.04,1.44l0.01,0.02l-11.16,13.3C26.22,39.11,25.05,39.66,23.82,39.66z"/>
			</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static maison(): ContenusSVG {
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<g>
			  <path class="xsvg-elem xsvg-elem_filled" d="M46.7,20.9L46.7,20.9L27.1,1.3c-1.7-1.7-4.5-1.7-6.2,0L1.3,20.9l0,0c-1.7,1.7-1.7,4.5,0,6.2	c0.8,0.8,1.8,1.2,2.9,1.3h0.1h0.8v14.4c0,2.9,2.3,5.2,5.2,5.2c0,0,0,0,0,0H18c0.8,0,1.4-0.6,1.4-1.4V35.3c0-1.3,1.1-2.4,2.4-2.4h4.5	c1.3,0,2.4,1.1,2.4,2.4v11.3c0,0.8,0.6,1.4,1.4,1.4h7.7c2.9,0,5.2-2.3,5.2-5.2V28.4h0.7c2.4,0,4.4-2,4.4-4.4	C48,22.8,47.5,21.7,46.7,20.9L46.7,20.9z"/>
			</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static materiel(): ContenusSVG
	{
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<g>
				<path id="ciseaux" class="xsvg-elem xsvg-elem_filled xsvg-elem_couleurPrincipale" d="M29.9,0c0.6,0.2,1.2,0.4,1.8,0.6c1.2,0.5,2,1.3,2.7,2.4c0.6,0.9,0.9,2,0.9,3.1c0,1.3-0.4,2.6-1.2,3.7
					c-1,1.4-2.5,2.2-4.2,2.5c-0.6,0.1-1.3,0-1.9-0.1c-0.5-0.1-1,0.2-1.3,0.6c-0.2,0.3-0.3,0.6-0.5,0.9c-0.2,0.4-0.6,0.6-1,0.6
					c-0.2,0-0.4,0-0.5,0.3c-0.7,1.8-1.5,3.5-2.3,5.3c-0.1,0.2-0.1,0.4,0,0.6c0.8,3.3,1.6,6.6,2.5,9.9c0.8,3.3,1.6,6.5,2.4,9.8
					c0.4,1.5,0.8,3,1.1,4.4c0.4,1.5-0.2,2.8-1.7,3.5c-2.7-6.3-5.3-12.6-8.1-19.1c-0.2,0.5-0.4,0.9-0.6,1.3c-1.1,2.6-2.2,5.3-3.3,7.9
					c-1.2,2.8-2.3,5.5-3.5,8.3c-0.2,0.4-0.4,0.8-0.5,1.2C10.5,48,10.3,48,10,47.8c-1.1-0.7-1.5-1.9-1.2-3.2c0.6-2.4,1.2-4.9,1.8-7.3
					c0.6-2.4,1.2-4.8,1.8-7.2c0.5-2.2,1.1-4.3,1.6-6.5c0.3-1.1,0.5-2.1,0.8-3.2c0.1-0.3,0-0.6-0.1-0.9c-0.7-1.6-1.4-3.3-2.1-4.9
					c-0.1-0.1-0.2-0.2-0.4-0.2c-0.6-0.1-1.1-0.3-1.3-0.9c-0.1-0.3-0.4-0.6-0.6-0.9c-0.3-0.4-0.8-0.5-1.3-0.4c-1.7,0.3-3.3-0.1-4.7-1.2
					c-1.3-1-2.1-2.3-2.3-3.9C1.6,5.3,2.1,3.7,3.3,2.2C4.3,1,5.5,0.4,6.9,0.1C7,0.1,7,0,7.1,0c0.6,0,1.2,0,1.8,0C9,0.1,9.2,0.1,9.4,0.2
					c2,0.6,3.5,1.7,4.3,3.7c0.9,2.4,1.8,4.8,2.7,7.2c0.3,0.8,0.2,1.3-0.4,1.9c0.4,0.9,0.7,1.9,1.1,2.8c0.6,1.2,2.2,1.2,2.8,0.2
					c0.5-0.9,0.8-1.9,1.2-2.8c0-0.1-0.1-0.2-0.1-0.3c-0.4-0.5-0.5-1-0.3-1.6c0.1-0.4,0.3-0.7,0.4-1.1c0.7-2,1.4-4,2.2-6
					c0.6-1.5,1.6-2.8,3.1-3.5C27,0.4,27.6,0.2,28.2,0C28.8,0,29.4,0,29.9,0z M8,9.4c1.8,0.1,3.3-1.5,3.3-3.2c0-1.8-1.4-3.3-3.3-3.3
					C6,2.9,4.7,4.4,4.7,6.1C4.7,7.9,6.3,9.5,8,9.4z M29.1,9.4c1.7,0.1,3.4-1.4,3.3-3.3C32.3,4.3,31,2.8,29,2.9
					c-1.9,0.1-3.1,1.4-3.1,3.2C25.8,7.9,27.2,9.4,29.1,9.4z M18.7,19c-0.7,0-1,0.3-1,1c0,0.6,0.4,1,1,1c0.6,0,1.1-0.4,1.1-1
					C19.8,19.5,19.3,18.9,18.7,19z"/>
				<path id="manche" class="xsvg-elem xsvg-elem_filled xsvg-elem_couleurSecondaire" d="M42.8,0c0.4,0.1,0.8,0.2,1.1,0.4c0.6,0.3,0.9,0.8,0.9,1.5c0,5.1,0.1,10.1,0.1,15.2c0,1.3,0,2.7,0,4
					c0,0.6,0,1.1-0.1,1.7c0,0.5-0.7,1.3-1.3,1.4c-1.2,0.3-2.5,0.3-3.7,0c-0.8-0.2-1.2-0.9-1.3-1.7c0-1.3-0.1-2.6-0.1-3.9
					c0-4,0-8.1,0-12.1c0-0.9,0-1.9,0-2.8c0-0.7,0-1.4,0.1-2c0-0.6,0.7-1.3,1.4-1.4c0.2,0,0.4-0.1,0.7-0.2C41.3,0,42.1,0,42.8,0z"/>
				<path id="lame" class="xsvg-elem xsvg-elem_filled xsvg-elem_couleurTertiaire" d="M39.5,25.9c0.8,0,1.5,0.1,2.3,0.1c0.7,0,1.4-0.1,2.2-0.2c0,0.8,0,1.7,0,2.5c0,1,0.2,2.1,0.7,3
					c0.2,0.4,0.7,0.6,1,0.9c0.4,0.2,0.5,0.5,0.5,0.9c0,2.9,0,5.7,0,8.6c0,2.9-1.9,5.4-4.7,6c-0.4,0.1-0.9,0.1-1.4,0.2
					c-0.4,0-0.5-0.2-0.5-0.5c0-0.6-0.1-1.2-0.1-1.8c0-6.5,0-12.9,0-19.4C39.5,26.2,39.5,26.1,39.5,25.9z M41.4,38.8
					C41.4,38.8,41.4,38.8,41.4,38.8c0,1.1,0,2.2,0,3.2c0,0.8,0.6,1.3,1.3,1.2c0.8-0.1,1.3-0.6,1.3-1.6c0-1.9,0-3.8,0-5.7
					c0-0.2,0-0.4-0.1-0.5c-0.2-0.7-0.6-1-1.5-1c-0.6,0-1,0.6-1.1,1.3C41.4,36.7,41.4,37.7,41.4,38.8z"/>
				<path id="transparent"  class="xsvg-elem xsvg-elem_transparent" d="M8,9.4C6.3,9.5,4.7,7.9,4.7,6.1c0-1.7,1.3-3.2,3.2-3.2c2,0,3.3,1.4,3.3,3.3
					C11.3,7.8,9.8,9.5,8,9.4z"/>
				<path id="transparent_00000178177260957560455060000015614209682211690633_"  class="xsvg-elem xsvg-elem_transparent" d="M29.1,9.4c-1.9,0.1-3.3-1.5-3.2-3.2
					c0-1.8,1.2-3.1,3.1-3.2c2-0.1,3.4,1.4,3.4,3.2C32.4,8,30.7,9.5,29.1,9.4z"/>
				<path id="transparent_x24_" class="st1" d="M18.7,19c0.6-0.1,1.1,0.5,1.1,1c0,0.6-0.5,1-1.1,1c-0.6,0-1-0.4-1-1
					C17.6,19.4,18,19,18.7,19z"/>
				<path id="transparent_00000026847700108452291480000004956074725384219289_"  class="xsvg-elem xsvg-elem_transparent" d="M41.4,38.8c0-1,0-2.1,0-3.1
					c0-0.7,0.5-1.2,1.1-1.3c0.8-0.1,1.3,0.3,1.5,1c0,0.2,0.1,0.4,0.1,0.5c0,1.9,0,3.8,0,5.7c0,1-0.5,1.5-1.3,1.6
					c-0.7,0.1-1.3-0.5-1.3-1.2C41.4,40.9,41.4,39.8,41.4,38.8C41.4,38.8,41.4,38.8,41.4,38.8z"/>
			</g>`;
		let epaisseur = 5;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static menu_burger(): ContenusSVG
	{
		let viewBoxContains = `0 0 47.56 37`;
		let contenu = `
			<g>
				<line class="xsvg-elem xsvg-elem_stroked" x1="2" y1="2" x2="45.56" y2="2"/>
				<line class="xsvg-elem xsvg-elem_stroked" x1="2" y1="35" x2="45.56" y2="35"/>
				<line class="xsvg-elem xsvg-elem_stroked" x1="2" y1="18.5" x2="31.8" y2="18.5"/>
			</g>`;
		let epaisseur = 5;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static micro(): ContenusSVG
	{
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<g>
				<path class="xsvg-elem xsvg-elem_filled" d="M24,33c5,0,9-4,9-9V9c0-5-4-9-9-9s-9,4-9,9v15C15,29,19,33,24,33z M39,18h-1.5c-0.8,0-1.5,0.7-1.5,1.5V24
	c0,7-6,12.6-13.2,11.9C16.6,35.3,12,29.7,12,23.5v-4c0-0.8-0.7-1.5-1.5-1.5H9c-0.8,0-1.5,0.7-1.5,1.5v3.8c0,8.4,6,15.9,14.2,17v3.2
	h-5.2c-0.8,0-1.5,0.7-1.5,1.5v1.5c0,0.8,0.7,1.5,1.5,1.5h15c0.8,0,1.5-0.7,1.5-1.5V45c0-0.8-0.7-1.5-1.5-1.5h-5.2v-3.2
	c8-1.1,14.2-8,14.2-16.3v-4.5C40.5,18.7,39.8,18,39,18z"/>
			</g>`;
		let epaisseur = 5;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static modifier(): ContenusSVG {
		let viewBoxContains = `0 0 48 48`;
		let contenu = `<path class="xsvg-elem xsvg-elem_filled" d="M46.68,13.32l-4.32,4.32c-0.44,0.44-1.15,0.44-1.59,0L30.36,7.23c-0.44-0.44-0.44-1.15,0-1.59l4.32-4.32
		c1.75-1.75,4.6-1.75,6.37,0l5.63,5.63C48.44,8.7,48.44,11.55,46.68,13.32z M26.64,9.35L2.02,33.97L0.04,45.36
		c-0.27,1.54,1.07,2.87,2.61,2.61l11.39-2l24.62-24.62c0.44-0.44,0.44-1.15,0-1.59L28.25,9.35C27.8,8.91,27.08,8.91,26.64,9.35
		L26.64,9.35z M11.63,31.86c-0.52-0.52-0.52-1.34,0-1.86l14.44-14.44c0.52-0.52,1.34-0.52,1.86,0c0.52,0.52,0.52,1.34,0,1.86
		L13.49,31.86C12.97,32.38,12.15,32.38,11.63,31.86L11.63,31.86z M8.25,39.74h4.5v3.4L6.7,44.21l-2.92-2.92l1.06-6.05h3.4V39.74z"/>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static modules(): ContenusSVG {
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<g class="xsvg-elem">
				<path class="xsvg-elem xsvg-elem_filled" d="M48,9.8c0-0.1,0-0.2,0-0.3c0,0,0,0,0-0.1c0-0.1-0.1-0.2-0.1-0.2c0,0,0,0,0,0c0,0,0,0,0,0c0-0.1-0.1-0.1-0.1-0.2
				c0,0,0,0,0,0c0-0.1-0.1-0.1-0.1-0.2c0,0,0,0,0,0c0,0-0.1-0.1-0.2-0.1c0,0,0,0-0.1,0c0,0,0,0,0,0L35.9,3c-0.4-0.2-0.9-0.2-1.3,0
				L24,8.3L13.3,3c-0.4-0.2-0.9-0.2-1.3,0L0.8,8.6c0,0,0,0,0,0C0.5,8.8,0.3,9,0.2,9.2c0,0,0,0,0,0c0,0,0,0,0,0c0,0.1,0,0.1-0.1,0.2
				c0,0,0,0.1,0,0.1c0,0,0,0.1,0,0.1c0,0,0,0.1,0,0.1c0,0,0,0,0,0v11.3c0,0.5,0.3,1,0.8,1.3l10.5,5.3v10.4c0,0.5,0.3,1,0.8,1.3L23.4,45
				c0,0,0,0,0,0c0.1,0,0.2,0.1,0.2,0.1c0,0,0,0,0.1,0c0.1,0,0.2,0,0.3,0v0c0.2,0,0.3,0,0.5-0.1c0,0,0.1,0,0.1,0c0,0,0,0,0.1,0l11.3-5.6
				c0.5-0.2,0.8-0.7,0.8-1.3V27.7l10.5-5.3c0.5-0.2,0.8-0.7,0.8-1.3L48,9.8C48,9.9,48,9.9,48,9.8z M25.4,20.3v-8.1l8.5,4.2v8.1
				L25.4,20.3z M22.6,20.3l-8.5,4.2v-8.1l8.5-4.2V20.3z M24,30.9l-8.1-4.1l7.2-3.6l1-0.5l8.1,4.1L24,30.9z M35.3,5.8l8.1,4.1L35.3,14
				l-8.1-4.1L35.3,5.8z M12.7,5.8l8.1,4.1l-6.5,3.2L12.7,14L4.6,9.9L12.7,5.8z M2.8,12.2l8.5,4.2v8.1l-8.5-4.2V12.2z M14.1,29.1
				l8.5,4.2v8.1l-8.5-4.2V29.1z M25.4,41.5v-8.1l8.5-4.2v8.1L25.4,41.5z M36.7,24.5v-8.1l8.5-4.2v8.1L36.7,24.5z"/>
			</g>
		`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static moins(): ContenusSVG
	{
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<g class="xsvg-elem">
				<path class="xsvg-elem xsvg-elem_filled" d="M45.5,31.6c1.4,0,2.5-1.1,2.5-2.5V18.9c0-1.4-1.1-2.5-2.5-2.5h-43c-1.4,0-2.5,1.1-2.5,2.5v10.2c0,1.4,1.1,2.5,2.5,2.5"/>
			</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static observation(): ContenusSVG {
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<g>
				<circle class="xsvg-elem xsvg-elem_stroked xsvg-elem_filled" cx="7.45" cy="3.29" r="1.29"/>
				<path class="xsvg-elem xsvg-elem_stroked" d="M7.33,3.21C4.77,3.61,1.75,5.04,2.02,7.08c0.83,6.35,3.61,19.74,12.58,22.9"/>
				<circle class="xsvg-elem xsvg-elem_stroked" cx="22.33" cy="3.29" r="1.29"/>
				<path class="xsvg-elem xsvg-elem_stroked" d="M22.45,3.21c2.56,0.41,5.58,1.84,5.32,3.87c-0.83,6.35-3.61,19.74-12.58,22.9"/>
				<path class="xsvg-elem xsvg-elem_stroked" d="M40.62,34.46c-0.23,15.06-27.2,17.15-25.9-4.39"/>
				<ellipse class="xsvg-elem xsvg-elem_stroked" cx="40.73" cy="29.11" rx="5.27" ry="5.26"/>
				<path class="xsvg-elem xsvg-elem_stroked" d="M16.86,29.16c0.02,0.67-1.25,3.06-1.96,4.26c-0.8-1.23-1.96-3.41-2.01-4.26c0,0,1.35,0.23,2.06,0.23
					C15.66,29.39,16.86,29.16,16.86,29.16z"/>
			</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static partager(): ContenusSVG
	{
		let viewBoxContains = `0 0 34.43 47.19`;
		let contenu = `
			<g>
				<circle class="xsvg-elem xsvg-elem_stroked xsvg-elem_filled" cx="28.91" cy="5.52" r="3.52"/>
				<circle class="xsvg-elem xsvg-elem_stroked xsvg-elem_filled" cx="28.91" cy="41.67" r="3.52"/>
				<circle class="xsvg-elem xsvg-elem_stroked xsvg-elem_filled" cx="5.52" cy="23.59" r="3.52"/>
				<polyline class="xsvg-elem xsvg-elem_stroked" points="28.91 5.52 5.52 23.59 28.91 41.67"/>
			</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static pdf(): ContenusSVG
	{
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<g>
				<path class="xsvg-elem xsvg-elem_filled" d="M44.2,13.9h-0.3H44.2L44.2,13.9c0-0.3-0.2-0.6-0.4-0.8L31.2,0.4C31.1,0.4,31,0.3,31,0.3l-0.1,0c-0.1,0-0.1-0.1-0.2-0.1
					l-0.1,0c-0.1,0-0.1,0-0.2-0.1c-0.1,0-0.2,0-0.3,0H9.9C9,0,8.3,0.7,8.3,1.5v16.3c0,0.8,0.7,1.5,1.5,1.5s1.5-0.7,1.5-1.5V3h17.2v11
					c0,0.8,0.7,1.5,1.5,1.5l11.1,0.1V45H11.4v-2.3c0-0.8-0.7-1.5-1.5-1.5s-1.5,0.7-1.5,1.5v3.9C8.3,47.3,9,48,9.9,48h32.8
					c0.8,0,1.5-0.7,1.5-1.5V14.1C44.2,14,44.2,14,44.2,13.9z M31.6,12.5V5.2l7.4,7.4L31.6,12.5z"/>
				<path class="xsvg-elem xsvg-elem_filled" d="M21.9,28.2c-0.1-0.2-0.3-0.4-0.5-0.4c-0.3-0.1-0.6-0.1-1-0.1h-1v5.3h1c0.5,0,0.9-0.1,1.3-0.4c0.3-0.4,0.4-0.8,0.4-1.3
					c0-0.3,0-0.6,0-1.1c0-0.4,0-0.7,0-1.1C22.1,28.6,22,28.4,21.9,28.2z"/>
				<path class="xsvg-elem xsvg-elem_filled" d="M13.4,27.6h-1.3v2.8h1.3c0.8,0,1.2-0.5,1.2-1.5c0-0.4-0.1-0.7-0.3-1C14.1,27.7,13.7,27.5,13.4,27.6z"/>
				<path class="xsvg-elem xsvg-elem_filled" d="M35.9,21.1H5.3c-0.8,0-1.5,0.7-1.5,1.5v15.1c0,0.8,0.7,1.5,1.5,1.5h30.6c0.8,0,1.5-0.7,1.5-1.5V22.7
					C37.4,21.8,36.8,21.1,35.9,21.1z M15.7,31.3c-0.6,0.6-1.5,0.9-2.3,0.8h-1.3v2.5h-1.9v-8.7h3.2c2.1,0,3.1,1,3.1,3
					C16.6,29.8,16.3,30.6,15.7,31.3z M24,32c-0.1,0.5-0.3,1-0.5,1.4c-0.3,0.4-0.7,0.7-1.2,0.9c-0.6,0.2-1.2,0.3-1.9,0.3h-2.9v-8.7h3
					c0.6,0,1.2,0.1,1.8,0.2c0.5,0.1,0.9,0.4,1.2,0.8c0.3,0.4,0.5,0.8,0.6,1.3c0.1,0.6,0.2,1.2,0.2,1.9C24.2,30.7,24.1,31.4,24,32z
					 M31,27.6h-3.7v2.3h3v1.7h-3v3h-1.9v-8.7H31V27.6z"/>
			</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static play(): ContenusSVG
	{
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<g>
				<path class="xsvg-elem xsvg-elem_filled" d="M2.98,3.96v40.08c0,1.72,0.58,3,1.61,3.6c1.04,0.59,2.44,0.45,3.93-0.42L42.7,27.24
					c1.49-0.87,2.31-2.02,2.31-3.24c0-1.22-0.82-2.37-2.31-3.24L8.52,0.78C7.03-0.09,5.63-0.24,4.59,0.36
					C3.56,0.95,2.98,2.23,2.98,3.96z"/>
			</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static plus(): ContenusSVG
	{
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<g>
				<path class="xsvg-elem xsvg-elem_filled" d="M45.51,16.41H31.58V2.49C31.58,1.12,30.47,0,29.1,0H18.9c-1.37,0-2.49,1.11-2.49,2.49v13.92H2.49
					C1.12,16.41,0,17.53,0,18.9v10.19c0,1.37,1.12,2.49,2.49,2.49h13.92v13.92c0,1.37,1.12,2.49,2.49,2.49H29.1
					c1.37,0,2.49-1.12,2.49-2.49V31.59h13.92c1.37,0,2.49-1.12,2.49-2.49V18.9C48,17.53,46.88,16.41,45.51,16.41z"/>
			</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static prise(): ContenusSVG
	{
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<g>
				<path class="xsvg-elem xsvg-elem_filled" d="M16.95,11.87c-6.7,0-12.07,5.36-12.07,12.07S10.25,36,16.95,36h8.31V11.87H16.95z"/>
				<path class="xsvg-elem xsvg-elem_filled" d="M29.02,6.77c-2.15,0-3.75,1.88-3.75,3.75v1.34V36v0.8c0,2.15,1.61,3.75,3.75,3.75s3.75-1.61,3.75-3.75V10.53
					C32.77,8.38,31.17,6.77,29.02,6.77z"/>
				<path class="xsvg-elem xsvg-elem_filled" d="M47.79,16.69c0-1.61-1.34-2.68-2.68-2.68H34.12v5.63l10.99-0.27C46.72,19.38,47.79,18.04,47.79,16.69z"/>
				<path class="xsvg-elem xsvg-elem_filled" d="M45.11,28.49H34.12v5.63l10.99-0.27c1.61,0,2.68-1.34,2.68-2.68C47.79,29.57,46.45,28.49,45.11,28.49z"/>
				<path class="xsvg-elem xsvg-elem_filled" d="M3.55,20.18c-2.15,0-3.75,1.61-3.75,3.75s1.61,3.75,3.75,3.75h1.34v-3.75v-3.75H3.55z"/>
			</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static prises_connectees(): ContenusSVG
	{
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<g>
				<g>
					<path class="xsvg-elem xsvg-elem_filled" d="M8.6,26.4C5,30,5,35.8,8.6,39.4c3.6,3.6,9.4,3.6,13,0l4.5-4.5l-13-13L8.6,26.4z"/>
					<path class="xsvg-elem xsvg-elem_filled" d="M12.3,17.2c-1.2,1.2-1,3,0,4l0.7,0.7l13,13l0.4,0.4c1.2,1.2,2.9,1.1,4,0c1.1-1.1,1.1-2.9,0-4L16.4,17.2
						C15.2,16,13.5,16,12.3,17.2z"/>
					<path class="xsvg-elem xsvg-elem_filled" d="M5.9,38.1c-1.2,1.2-1.1,2.9,0,4c1.1,1.1,2.9,1.1,4,0l0.7-0.7l-2-2l-2-2L5.9,38.1z"/>
				</g>
				<g>
					<path class="xsvg-elem xsvg-elem_filled" d="M39.4,21.6c3.6-3.6,3.6-9.4,0-13C35.8,5,30,5,26.4,8.6L22,13.1l13,13L39.4,21.6z"/>
					<path class="xsvg-elem xsvg-elem_filled" d="M35.7,30.8c1.2-1.2,1-3,0-4l-0.7-0.7l-13-13l-0.4-0.4c-1.2-1.2-2.9-1.1-4,0s-1.1,2.9,0,4l14.1,14.1
						C32.8,32,34.5,32,35.7,30.8z"/>
					<path class="xsvg-elem xsvg-elem_filled" d="M42.1,9.9c1.2-1.2,1.1-2.9,0-4c-1.1-1.1-2.9-1.1-4,0l-0.7,0.7l2,2l2,2L42.1,9.9z"/>
				</g>
			</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static prises_deconnectees(): ContenusSVG
	{
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<g>
				<g>
					<path class="xsvg-elem xsvg-elem_filled" d="M3.6,31.4C0,35,0,40.8,3.6,44.4c3.6,3.6,9.4,3.6,13,0l4.5-4.5l-13-13L3.6,31.4z"/>
					<path class="xsvg-elem xsvg-elem_filled" d="M7.3,22.2c-1.2,1.2-1,3,0,4l0.7,0.7l13,13l0.4,0.4c1.2,1.2,2.9,1.1,4,0c1.1-1.1,1.1-2.9,0-4L11.4,22.2
						C10.2,21,8.5,21,7.3,22.2z"/>
					<path class="xsvg-elem xsvg-elem_filled" d="M22.8,17.4c-0.9-0.9-2.2-0.7-2.9,0L14,23.3l3,3l5.8-6.1C23.6,19.4,23.5,18.1,22.8,17.4z"/>
					<path class="xsvg-elem xsvg-elem_filled" d="M27.7,25.2l-5.9,5.9l3,3l5.8-6.1c0.9-0.9,0.7-2.2,0-2.9C29.7,24.3,28.4,24.5,27.7,25.2z"/>
					<path class="xsvg-elem xsvg-elem_filled" d="M0.9,43.1c-1.2,1.2-1.1,2.9,0,4c1.1,1.1,2.9,1.1,4,0l0.7-0.7l-2-2l-2-2L0.9,43.1z"/>
				</g>
				<g>
					<path class="xsvg-elem xsvg-elem_filled" d="M44.4,16.6c3.6-3.6,3.6-9.4,0-13C40.8,0,35,0,31.4,3.6L27,8.1l13,13L44.4,16.6z"/>
					<path class="xsvg-elem xsvg-elem_filled" d="M40.7,25.8c1.2-1.2,1-3,0-4l-0.7-0.7l-13-13l-0.4-0.4c-1.2-1.2-2.9-1.1-4,0s-1.1,2.9,0,4l14.1,14.1
						C37.8,27,39.5,27,40.7,25.8z"/>
					<path class="xsvg-elem xsvg-elem_filled" d="M47.1,4.9c1.2-1.2,1.1-2.9,0-4c-1.1-1.1-2.9-1.1-4,0l-0.7,0.7l2,2l2,2L47.1,4.9z"/>
				</g>
			</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static punaise(): ContenusSVG {
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<g>
				<g>
					<path id="fond" class="xsvg-elem xsvg-elem_filled" d="M32.2,30.4l3.6-3.6c0.7-0.7,2-0.7,2.7,0l0,0c0.7,0.7,2,0.7,2.7,0l6.2-6.2c0.7-0.7,0.7-2,0-2.7
						l-8.7-8.7l-8.7-8.7c-0.7-0.7-2-0.7-2.7,0l-6.2,6.2c-0.7,0.7-0.7,2,0,2.7l0,0c0.7,0.7,0.7,2,0,2.7l-3.6,3.6
						c-0.5,0.5-1.1,0.7-1.8,0.5c-1.7-0.4-5.4-0.9-9.3,0.3c-3.4,1.1-4.4,5.3-1.9,7.8c4,4,9.5,9.5,9.5,9.5l9.5,9.5
						c2.5,2.5,6.8,1.5,7.8-1.9c1.2-3.9,0.7-7.6,0.3-9.3C31.6,31.5,31.8,30.9,32.2,30.4z"/>
					<path id="contour" class="xsvg-elem xsvg-elem_filled" d="M29.5,2.7L29.5,2.7L29.5,2.7 M28.7,3.5l7.9,7.9l7.9,7.9L39.8,24c-0.8-0.5-1.7-0.8-2.6-0.8
						c-1.3,0-2.5,0.5-3.5,1.4l-3.6,3.6c-1.2,1.2-1.7,2.9-1.3,4.5c0.3,1.2,0.8,4.5-0.2,7.7c-0.3,0.9-1,1.2-1.6,1.2
						c-0.3,0-0.8-0.1-1.2-0.5l-9.5-9.5l-9.5-9.5c-0.6-0.6-0.5-1.4-0.5-1.6c0.1-0.3,0.3-1,1.1-1.2c1.3-0.4,2.7-0.6,4.2-0.6
						c1.5,0,2.7,0.2,3.5,0.4c0.3,0.1,0.7,0.1,1.1,0.1c1.3,0,2.5-0.5,3.5-1.4l3.6-3.6c0.9-0.9,1.4-2.2,1.4-3.5c0-0.9-0.3-1.8-0.8-2.6
						L28.7,3.5 M28.7,0c-0.5,0-1,0.2-1.4,0.6l-6.2,6.2c-0.7,0.7-0.7,2,0,2.7c0.7,0.7,0.7,2,0,2.7l-3.6,3.6c-0.4,0.4-0.8,0.6-1.3,0.6
						c-0.1,0-0.3,0-0.4,0c-0.9-0.2-2.4-0.4-4.2-0.4c-1.5,0-3.3,0.2-5.1,0.8c-3.4,1.1-4.4,5.3-1.9,7.8c4,4,9.5,9.5,9.5,9.5l9.5,9.5
						c0.9,0.9,2.2,1.4,3.3,1.4c1.9,0,3.8-1.2,4.5-3.3c1.2-3.9,0.7-7.6,0.3-9.3c-0.1-0.6,0.1-1.3,0.5-1.8l3.6-3.6
						c0.4-0.4,0.9-0.6,1.4-0.6s1,0.2,1.4,0.6c0.4,0.4,0.9,0.6,1.4,0.6s1-0.2,1.4-0.6l6.2-6.2c0.7-0.7,0.7-2,0-2.7l-8.7-8.7l-8.7-8.7
						C29.7,0.2,29.2,0,28.7,0L28.7,0z"/>
				</g>
				<path id="epingle" class="xsvg-elem xsvg-elem_filled" d="M1.5,48c-0.4,0-0.8-0.1-1.1-0.4c-0.6-0.6-0.6-1.6,0-2.2l13.1-13.1c0.6-0.6,1.6-0.6,2.2,0
					c0.6,0.6,0.6,1.6,0,2.2L2.6,47.6C2.3,47.9,1.9,48,1.5,48z"/>
			</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static qr_code(): ContenusSVG {
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<g>
				<path class="xsvg-elem xsvg-elem_filled" d="M1.41,10.31c0.78,0,1.41-0.63,1.41-1.41V2.81h6.09c0.78,0,1.41-0.63,1.41-1.41S9.68,0,8.91,0h-7.5C0.63,0,0,0.63,0,1.41
				v7.5C0,9.68,0.63,10.31,1.41,10.31z"/>
				<path class="xsvg-elem xsvg-elem_filled" d="M46.59,0h-7.5c-0.78,0-1.41,0.63-1.41,1.41s0.63,1.41,1.41,1.41h6.09v6.09c0,0.78,0.63,1.41,1.41,1.41
				c0.78,0,1.41-0.63,1.41-1.41v-7.5C48,0.63,47.37,0,46.59,0z"/>
				<path class="xsvg-elem xsvg-elem_filled" d="M8.91,45.19H2.81v-6.09c0-0.78-0.63-1.41-1.41-1.41S0,38.32,0,39.09v7.5C0,47.37,0.63,48,1.41,48h7.5
				c0.78,0,1.41-0.63,1.41-1.41C10.31,45.82,9.68,45.19,8.91,45.19z"/>
				<path class="xsvg-elem xsvg-elem_filled" d="M46.59,37.69c-0.78,0-1.41,0.63-1.41,1.41v6.09h-6.09c-0.78,0-1.41,0.63-1.41,1.41c0,0.78,0.63,1.41,1.41,1.41h7.5
				c0.78,0,1.41-0.63,1.41-1.41v-7.5C48,38.32,47.37,37.69,46.59,37.69z"/>
				<path class="xsvg-elem xsvg-elem_filled" d="M29.62,19.78h11.25c0.78,0,1.41-0.63,1.41-1.41V7.12c0-0.78-0.63-1.41-1.41-1.41H29.62c-0.78,0-1.41,0.63-1.41,1.41v11.25
				C28.22,19.15,28.85,19.78,29.62,19.78z M31.03,8.53h8.44v8.44h-8.44V8.53z"/>
				<path class="xsvg-elem xsvg-elem_filled" d="M18.38,28.22H7.12c-0.78,0-1.41,0.63-1.41,1.41v11.25c0,0.78,0.63,1.41,1.41,1.41h11.25c0.78,0,1.41-0.63,1.41-1.41V29.62
				C19.78,28.85,19.15,28.22,18.38,28.22z M16.97,39.47H8.53v-8.44h8.44V39.47z"/>
				<path class="xsvg-elem xsvg-elem_filled" d="M42.28,40.88V29.62c0-0.78-0.63-1.41-1.41-1.41c-0.78,0-1.41,0.63-1.41,1.41v9.84h-9.84c-0.78,0-1.41,0.63-1.41,1.41
				c0,0.78,0.63,1.41,1.41,1.41h11.25C41.65,42.28,42.28,41.65,42.28,40.88z"/>
				<path class="xsvg-elem xsvg-elem_filled" d="M18.38,5.72H7.12c-0.78,0-1.41,0.63-1.41,1.41v11.25c0,0.78,0.63,1.41,1.41,1.41h11.25c0.78,0,1.41-0.63,1.41-1.41V7.12
				C19.78,6.35,19.15,5.72,18.38,5.72z M16.97,16.97H8.53V8.53h8.44V16.97z"/>
				<path class="xsvg-elem xsvg-elem_filled" d="M24,19.78c0.78,0,1.41-0.63,1.41-1.41V7.12c0-0.78-0.63-1.41-1.41-1.41s-1.41,0.63-1.41,1.41v11.25
				C22.59,19.15,23.22,19.78,24,19.78z"/>
				<path class="xsvg-elem xsvg-elem_filled" d="M33.84,24c0-0.78-0.63-1.41-1.41-1.41H24c-0.78,0-1.41,0.63-1.41,1.41v16.88c0,0.78,0.63,1.41,1.41,1.41
				s1.41-0.63,1.41-1.41V25.41h7.03C33.21,25.41,33.84,24.78,33.84,24z"/>
				<path class="xsvg-elem xsvg-elem_filled" d="M7.12,25.41h2.81c0.78,0,1.41-0.63,1.41-1.41s-0.63-1.41-1.41-1.41H7.12c-0.78,0-1.41,0.63-1.41,1.41
				S6.35,25.41,7.12,25.41z"/>
				<path class="xsvg-elem xsvg-elem_filled" d="M33.84,29.62v5.62c0,0.78,0.63,1.41,1.41,1.41s1.41-0.63,1.41-1.41v-5.62c0-0.78-0.63-1.41-1.41-1.41
				S33.84,28.85,33.84,29.62z"/>
				<path class="xsvg-elem xsvg-elem_filled" d="M28.22,29.62v5.62c0,0.78,0.63,1.41,1.41,1.41s1.41-0.63,1.41-1.41v-5.62c0-0.78-0.63-1.41-1.41-1.41
				S28.22,28.85,28.22,29.62z"/>
				<path class="xsvg-elem xsvg-elem_filled" d="M40.88,22.59h-2.81c-0.78,0-1.41,0.63-1.41,1.41s0.63,1.41,1.41,1.41h2.81c0.78,0,1.41-0.63,1.41-1.41
				S41.65,22.59,40.88,22.59z"/>
				<circle class="xsvg-elem xsvg-elem_filled" cx="35.25" cy="12.75" r="1.41"/>
				<circle class="xsvg-elem xsvg-elem_filled" cx="12.75" cy="12.75" r="1.41"/>
				<circle class="xsvg-elem xsvg-elem_filled" cx="12.75" cy="35.25" r="1.41"/>
				<path class="xsvg-elem xsvg-elem_filled" d="M18.38,22.59h-2.81c-0.78,0-1.41,0.63-1.41,1.41s0.63,1.41,1.41,1.41h2.81c0.78,0,1.41-0.63,1.41-1.41
				S19.15,22.59,18.38,22.59z"/>
			</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static recherche(): ContenusSVG {
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<g>
				<circle class="xsvg-elem xsvg-elem_stroked" cx="18.63" cy="17.71" r="15.71"/>
				<line class="xsvg-elem xsvg-elem_stroked" x1="28.83" y1="29.76" x2="45.07" y2="46"/>
			</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static recherche_document(): ContenusSVG
	{
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<g id="feuille">
				<g class="xsvg-elem xsvg-elem_filled">
					<path class="xsvg-elem xsvg-elem_filled" d="M26.4,3l12.9,12.9v26.5c0,0.5-0.4,0.9-0.9,0.9H12.4
		c-0.5,0-0.9-0.4-0.9-0.9V3.9c0-0.5,0.4-0.9,0.9-0.9H26.4 M26.8,0H12.4c-2.1,0-3.9,1.7-3.9,3.9v38.6c0,2.1,1.7,3.9,3.9,3.9h26.1
		c2.1,0,3.9-1.7,3.9-3.9V15.5c0-0.5-0.2-1-0.6-1.4L28.2,0.6C27.8,0.2,27.3,0,26.8,0L26.8,0z"/>
				</g>
				<path class="xsvg-elem xsvg-elem_filled" d="M26.2,1.4l14.7,14.7H28.2c-1.1,0-2-0.9-2-2V1.4z"/>
			</g>
			<g id="loupe" class="xsvg-elem xsvg-elem_filled">
				<path class="xsvg-elem xsvg-elem_filled" d="M25.1,18.1c-5.8,0-10.5,4.7-10.5,10.5c0,1.8,0.4,3.5,1.2,5l-9.2,9.2c-1.2,1.2-1.2,3.1,0,4.2c1.2,1.2,3.1,1.2,4.2,0l9.2-9.2
					c1.5,0.8,3.2,1.3,5.1,1.3c5.8,0,10.5-4.7,10.5-10.5C35.6,22.9,30.9,18.1,25.1,18.1z M25.1,36c-4,0-7.3-3.3-7.3-7.3
					c0-4,3.3-7.3,7.3-7.3c4,0,7.3,3.3,7.3,7.3C32.4,32.7,29.1,36,25.1,36z"/>
				<path class="xsvg-elem xsvg-elem_filled" d="M15.7,33.7l-9.2,9.2c-1.2,1.2-1.2,3.1,0,4.2c1.2,1.2,3.1,1.2,4.2,0l9.1-9.1C18.1,37,16.7,35.5,15.7,33.7z"/>
			</g>`;
		let epaisseur = 2;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static sauvegarder(): ContenusSVG {
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<g>
				<polygon class="xsvg-elem xsvg-elem_stroked" points="2,2 34.1,2 46,13.8 46,46 2,46"/>
				<polyline class="xsvg-elem xsvg-elem_stroked" points="23,7.4 23,10.6 23,10.6 23,10.6"/>
				<polyline class="xsvg-elem xsvg-elem_stroked" points="10.3,2 10.3,16.1 29.6,16.1 29.6,2"/>
				<polyline class="xsvg-elem xsvg-elem_stroked" points="10.3,46 10.3,25.8 36.8,25.8 36.8,46"/>
			</g>`;
		let epaisseur = 3;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static sexe_femme(): ContenusSVG {
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<g>
				<circle class="xsvg-elem xsvg-elem_stroked" cx="24" cy="15.6" r="12.6"/>
				<line class="xsvg-elem xsvg-elem_stroked" x1="24" y1="45.1" x2="24" y2="28.2"/>
				<line class="xsvg-elem xsvg-elem_stroked" x1="16.8" y1="37.5" x2="31.2" y2="37.5"/> 
			</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static sexe_homme(): ContenusSVG {
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<g>
				<circle class="xsvg-elem xsvg-elem_stroked" cx="19.9" cy="28.1" r="12.6"/>
				<line class="xsvg-elem xsvg-elem_stroked" x1="40.7" y1="7.3" x2="28.8" y2="19.2"/>
				<line class="xsvg-elem xsvg-elem_stroked" x1="40.7" y1="7.3" x2="40.7" y2="16.8"/>
				<line class="xsvg-elem xsvg-elem_stroked" x1="40.7" y1="7.3" x2="31.2" y2="7.3"/>
			</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static sexe_neutre(): ContenusSVG {
		let viewBoxContains = `0 0 33.26 48`;
		let contenu = `
			<g>
				<line class="xsvg-elem xsvg-elem_stroked" x1="31.26" y1="2" x2="20.84" y2="12.42"/>
				<line class="xsvg-elem xsvg-elem_stroked" x1="31.26" y1="2" x2="31.26" y2="10.3"/>
				<line class="xsvg-elem xsvg-elem_stroked" x1="31.26" y1="2" x2="22.97" y2="2"/>
				<line class="xsvg-elem xsvg-elem_stroked" x1="6.7" y1="39.37" x2="19.37" y2="39.37"/>
				<line class="xsvg-elem xsvg-elem_stroked" x1="13.04" y1="46" x2="13.04" y2="31.26"/>
				<circle class="xsvg-elem xsvg-elem_stroked" cx="13.04" cy="20.23" r="11.04"/>
			</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static sms(): ContenusSVG {
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<g>
				<path id="telephoneetbulle"  class="xsvg-elem xsvg-elem_filled" d="M43.8,11.4H31.1V4.2c0-2.3-1.9-4.2-4.2-4.2H4.2C1.9,0,0,1.9,0,4.2v39.6
					C0,46.1,1.9,48,4.2,48h22.7c2.3,0,4.2-1.9,4.2-4.2v-7.9l4.8-4.8h7.9c2.3,0,4.2-1.9,4.2-4.2V15.7C48,13.3,46.1,11.4,43.8,11.4z
					 M2.8,4.2c0-0.8,0.6-1.4,1.4-1.4h22.7c0.8,0,1.4,0.6,1.4,1.4v1.4H2.8V4.2z M28.3,43.8c0,0.8-0.6,1.4-1.4,1.4H4.2
					c-0.8,0-1.4-0.6-1.4-1.4v-4.2h25.5V43.8z M28.3,36.8H2.8V8.4h25.5v3h-1.4c-2.3,0-4.2,1.9-4.2,4.2v11.2c0,2.3,1.9,4.2,4.2,4.2h1.4
					C28.3,31.8,28.3,36.1,28.3,36.8z M45.2,26.9c0,0.8-0.6,1.4-1.4,1.4h-8.4c-0.4,0-0.7,0.1-1,0.4l-3.2,3.2v-2.2v0
					c0-0.8-0.6-1.4-1.4-1.4h-2.8c-0.8,0-1.4-0.6-1.4-1.4V15.7c0-0.8,0.6-1.4,1.4-1.4h16.9c0.8,0,1.4,0.6,1.4,1.4V26.9z"/>
				<path id="trait1_1_" class="xsvg-elem xsvg-elem_filled" d="M41,17.1H29.7c-0.8,0-1.4,0.6-1.4,1.4s0.6,1.4,1.4,1.4H41c0.8,0,1.4-0.6,1.4-1.4
					S41.7,17.1,41,17.1z"/>
				<path id="trait2_1_" class="xsvg-elem xsvg-elem_filled" d="M35.3,22.7h-5.6c-0.8,0-1.4,0.6-1.4,1.4s0.6,1.4,1.4,1.4h5.6c0.8,0,1.4-0.6,1.4-1.4
					S36.1,22.7,35.3,22.7z"/>
			</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static sollicitation(): ContenusSVG {
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<g>
				<path class="xsvg-elem xsvg-elem_filled" d="M24.2,0C11.1,0,0.6,10.5,0.5,23.5c0,5.4,1.8,10.5,5.1,14.7l-3.4,8c-0.3,0.6,0,1.4,0.7,1.7
					C3.1,48,3.4,48,3.6,48l12.6-2.2c2.5,0.9,5.2,1.4,7.8,1.4c13-0.1,23.5-10.7,23.4-23.7C47.4,10.6,37,0.2,24.2,0z M23.95,36.87
					c-1.22,0-2.2-0.99-2.2-2.2c0-1.25,0.99-2.24,2.2-2.24c1.25,0,2.24,0.99,2.24,2.24C26.19,35.89,25.2,36.87,23.95,36.87z
					 M27.18,25.55c-0.76,0.38-0.99,1.94-0.99,2.47c0,1.22-0.99,2.2-2.24,2.2c-1.22,0-2.2-0.99-2.2-2.2c0-0.49,0.08-4.75,3.46-6.46
					c1.52-0.76,2.09-1.41,2.09-3.53c0-1.82-1.48-3.31-3.34-3.31c-1.82,0-3.31,1.48-3.31,3.31c0,1.22-0.99,2.24-2.24,2.24
					c-1.22,0-2.2-1.03-2.2-2.24c0-4.26,3.5-7.75,7.75-7.75c4.29,0,7.75,3.5,7.75,7.75C31.7,21.71,30.37,23.96,27.18,25.55z"/>
				<g id="point">
					<path class="xsvg-elem xsvg-elem_filled xsvg-transparent" d="M23.95,32.43c-1.22,0-2.2,0.99-2.2,2.24c0,1.22,0.99,2.2,2.2,2.2c1.25,0,2.24-0.99,2.24-2.2
						C26.19,33.42,25.2,32.43,23.95,32.43z"/>
					<path class="xsvg-elem xsvg-elem_filled xsvg-transparent" d="M23.95,10.28c-4.26,0-7.75,3.5-7.75,7.75c0,1.22,0.99,2.24,2.2,2.24c1.25,0,2.24-1.03,2.24-2.24
						c0-1.82,1.48-3.31,3.31-3.31c1.86,0,3.34,1.48,3.34,3.31c0,2.13-0.57,2.77-2.09,3.53c-3.38,1.71-3.46,5.96-3.46,6.46
						c0,1.22,0.99,2.2,2.2,2.2c1.25,0,2.24-0.99,2.24-2.2c0-0.53,0.23-2.09,0.99-2.47c3.19-1.6,4.52-3.84,4.52-7.52
						C31.7,13.77,28.24,10.28,23.95,10.28z"/>
				</g>
			</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static sollicitation_ajout(): ContenusSVG
	{
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<g id="rondplus">
				<path id="rond" class="xsvg-elem xsvg-elem_filled" d="M38,28c-5.5,0-10,4.5-10,10s4.5,10,10,10s10-4.5,10-10S43.5,28,38,28z M43.8,39.3c0,0.3-0.3,0.6-0.6,0.6h-3.4
					v3.4c0,0.3-0.3,0.6-0.6,0.6h-2.5c-0.3,0-0.6-0.3-0.6-0.6v-3.4h-3.4c-0.3,0-0.6-0.3-0.6-0.6v-2.5c0-0.3,0.3-0.6,0.6-0.6h3.4v-3.4
					c0-0.3,0.3-0.6,0.6-0.6h2.5c0.3,0,0.6,0.3,0.6,0.6v3.4h3.4c0.3,0,0.6,0.2,0.6,0.6V39.3z"/>
				<path id="plus" class="xsvg-elem xsvg-elem_filled xsvg-transparent" d="M43.2,36.2h-3.4v-3.4c0-0.3-0.3-0.6-0.6-0.6h-2.5c-0.3,0-0.6,0.3-0.6,0.6v3.4h-3.4
					c-0.3,0-0.6,0.3-0.6,0.6v2.5c0,0.3,0.3,0.6,0.6,0.6h3.4v3.4c0,0.3,0.3,0.6,0.6,0.6h2.5c0.3,0,0.6-0.3,0.6-0.6v-3.4h3.4
					c0.3,0,0.6-0.3,0.6-0.6v-2.5C43.8,36.4,43.5,36.2,43.2,36.2z"/>
			</g>
			<g id="bullepoint">
				<path id="bulle" class="xsvg-elem xsvg-elem_filled" d="M19.7,0h-0.1C8.8,0,0,8.7,0,19.6c0,4.5,1.5,8.8,4.3,12.3l-2.9,6.7c-0.2,0.5,0,1.2,0.6,1.4c0.2,0,0.4,0,0.6,0
					l10.5-1.8c2.1,0.8,4.3,1.1,6.5,1.1c2.2,0,4.4-0.4,6.4-1.1v-0.1C26,31.4,31.4,26,38,26c0.7-2,1.1-4.2,1.1-6.5
					C39,8.8,30.4,0.1,19.7,0z M19.6,31.1c-1,0-1.8-0.8-1.9-1.8c0-1,0.8-1.8,1.8-1.9h0.1c1,0.1,1.8,0.9,1.8,1.9S20.6,31.1,19.6,31.1z
					 M26.5,15.7C26.5,15.7,26.5,15.6,26.5,15.7c0,2.7-1.6,5.2-4.1,6.3c-0.5,0.2-0.9,0.8-0.9,1.3v0.1c0,1-0.8,1.8-1.8,1.9
					c-1,0-1.8-0.8-1.9-1.8v-0.1v-0.1c0-2,1.2-3.9,3.1-4.7c1.2-0.5,1.9-1.6,1.9-2.9c0,0,0,0,0-0.1c0-1.8-1.4-3.2-3.2-3.2
					c-1.8,0-3.2,1.4-3.2,3.2c0,1-0.9,1.8-1.9,1.8s-1.7-0.8-1.8-1.8c0-3.8,3.1-6.8,6.9-6.8C23.4,9,26.4,11.9,26.5,15.7
					C26.5,15.6,26.5,15.7,26.5,15.7z"/>
				<g id="point">
					<path class="xsvg-elem xsvg-elem_filled xsvg-transparent" d="M19.6,27.4h-0.1c-1,0.1-1.8,0.9-1.8,1.9c0.1,1,0.9,1.8,1.9,1.8s1.8-0.8,1.8-1.8S20.6,27.5,19.6,27.4z"/>
					<path class="xsvg-elem xsvg-elem_filled xsvg-transparent" d="M19.6,8.8c-3.8,0-6.9,3-6.9,6.8c0.1,1,0.8,1.8,1.8,1.8s1.9-0.8,1.9-1.8c0-1.8,1.4-3.2,3.2-3.2
						c1.8,0,3.2,1.4,3.2,3.2c0,0.1,0,0.1,0,0.1c0,1.3-0.7,2.4-1.9,2.9c-1.9,0.8-3.1,2.7-3.1,4.7v0.1v0.1c0.1,1,0.9,1.8,1.9,1.8
						c1-0.1,1.8-0.9,1.8-1.9v-0.1c0-0.5,0.4-1.1,0.9-1.3c2.5-1.1,4.1-3.6,4.1-6.4C26.4,11.9,23.4,9,19.6,8.8z"/>
				</g>
			</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static sollicitation_pleine(): ContenusSVG {
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<g>
				<path class="xsvg-elem xsvg-elem_filled" d="M24.2,0C11.1,0,0.6,10.5,0.5,23.5c0,5.4,1.8,10.5,5.1,14.7l-3.4,8c-0.3,0.6,0,1.4,0.7,1.7
					C3.1,48,3.4,48,3.6,48l12.6-2.2c2.5,0.9,5.2,1.4,7.8,1.4c13-0.1,23.5-10.7,23.4-23.7C47.4,10.6,37,0.2,24.2,0z"/>
			</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static statistiques(): ContenusSVG {
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<g>
				<path class="xsvg-elem xsvg-elem_filled barrebas" d="M0,46.5v-7.17c0-0.83,0.67-1.5,1.5-1.5h45c0.83,0,1.5,0.67,1.5,1.5v7.17c0,0.83-0.67,1.5-1.5,1.5h-45
					C0.67,48,0,47.33,0,46.5z"/>
				<path class="xsvg-elem xsvg-elem_filled barre1" d="M15.19,35.58H8.02c-0.83,0-1.5-0.67-1.5-1.5V15.48c0-0.83,0.67-1.5,1.5-1.5h7.17c0.83,0,1.5,0.67,1.5,1.5
					v18.61C16.69,34.91,16.02,35.58,15.19,35.58z"/>
				<path class="xsvg-elem xsvg-elem_filled barre2" d="M27.9,35.58h-7.17c-0.83,0-1.5-0.67-1.5-1.5V1.5c0-0.83,0.67-1.5,1.5-1.5h7.17c0.83,0,1.5,0.67,1.5,1.5v32.58
					C29.4,34.91,28.73,35.58,27.9,35.58z"/>
				<path class="xsvg-elem xsvg-elem_filled barre3" d="M40.4,35.58h-7.17c-0.83,0-1.5-0.67-1.5-1.5V11.66c0-0.83,0.67-1.5,1.5-1.5h7.17c0.83,0,1.5,0.67,1.5,1.5
					v22.42C41.9,34.91,41.22,35.58,40.4,35.58z"/>
			</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static supprimer(): ContenusSVG {
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<g>
				<path class="xsvg-elem xsvg-elem_stroked" d="M40.1,7.7l-2.8,37.4c0,0.5-0.5,0.9-1,0.9H11.5c-0.5,0-0.9-0.4-1-0.9l-2.5-38"/>
				<line class="xsvg-elem xsvg-elem_stroked" x1="43.7" y1="7.7" x2="4.3" y2="7.7"/>
				<polyline class="xsvg-elem xsvg-elem_stroked" points="32.2,7.1 32.2,2 15.8,2 15.8,7.1"/>
				<line class="xsvg-elem xsvg-elem_stroked" x1="24.1" y1="14.5" x2="24.1" y2="39.2"/>
				<line class="xsvg-elem xsvg-elem_stroked" x1="17.3" y1="36.6" x2="16.3" y2="17.2"/>
				<line class="xsvg-elem xsvg-elem_stroked" x1="30.8" y1="36.6" x2="31.8" y2="17.2"/>
			</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static suspendre(): ContenusSVG {
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<g>
				<path class="xsvg-elem xsvg-elem_filled" d="M42.6,0.2H31.9c-1,0-1.7,1-1.7,2.3v42.5c0,1.3,0.7,2.3,1.7,2.3h10.7c1,0,1.7-1,1.7-2.3V2.5C44.3,1.2,43.6,0.2,42.6,0.2z"/>
				<path class="xsvg-elem xsvg-elem_filled" d="M16.8,0.2H6.1c-1,0-1.7,1-1.7,2.3v42.5c0,1.3,0.7,2.3,1.7,2.3h10.7c1,0,1.7-1,1.7-2.3V2.5C18.5,1.2,17.7,0.2,16.8,0.2z"/>
			</g>
			`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static telephone(): ContenusSVG {
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<g>
				<path id="onde1" class="xsvg-elem xsvg-elem_filled" d="M40.4,22.9C40,14.8,33.8,8.1,25.8,7.2c-0.2,0-0.3,0-0.5-0.1C24.8,7.1,24.4,7,24,7
				c-1.1-0.1-2.1,0.7-2.2,1.9c-0.1,0.6,0,1.2,0.3,1.7c0.6,0.6,1.4,1,2.3,1c0.2,0,0.4,0.1,0.6,0.1c7.3,1.6,9.7,4.2,10.9,11.4
				c0,0.2,0,0.4,0.1,0.6c0.1,0.9,0.2,2.7,2.1,2.7l0,0c0.2,0,0.3,0,0.5,0c1.8-0.3,1.7-1.9,1.7-2.7c0-0.2,0-0.4,0-0.6
				C40.4,23,40.4,23,40.4,22.9z"/>
			<path id="onde2" class="xsvg-elem xsvg-elem_filled" d="M23.5,4.4c0.2,0,0.4,0,0.6,0.1c12,1.8,17.5,7.5,19,19.6c0,0.2,0,0.5,0,0.7c0,0.9,0,2.9,2.2,2.9h0.1
				c0.6,0,1.1-0.2,1.6-0.6c0.5-0.7,0.7-1.6,0.6-2.5c0-0.2,0-0.4,0-0.6C47.3,11.3,37.4,0.9,24.7,0.1c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0
				c-0.1,0-0.3,0-0.4,0s-0.4,0-0.6,0c-1.2-0.1-2.3,0.7-2.4,1.9c0,0.1,0,0.2,0,0.3C20.8,4.2,22.7,4.3,23.5,4.4z"/>
			<path id="telephone" class="xsvg-elem xsvg-elem_filled" d="M43.3,34.7c-0.2-0.2-0.5-0.4-0.7-0.5c-1.2-0.9-2.4-1.8-3.6-2.6L38.2,31c-1.2-1-2.7-1.5-4.2-1.6
				c-1.9,0.1-3.6,1.2-4.5,2.9c-0.4,0.8-1.2,1.2-2.1,1.3c-0.6,0-1.1-0.2-1.7-0.4c-4.7-2-8.4-5.6-10.5-10.2c-1-2.2-0.7-3.6,1.1-4.8
				c1.6-0.8,2.6-2.5,2.7-4.3c-1.6-4.7-4.6-8.8-8.6-11.7c-1.1-0.4-2.2-0.4-3.3,0C4.5,2.9,2.3,4.6,1.1,7c-1,2.4-1,5,0.1,7.3
				c3,7.4,7.4,14.1,13,19.8c5.7,5.6,12.4,10,19.7,13.1c0.6,0.3,1.3,0.4,2,0.6c0.2,0,0.3,0.1,0.4,0.1c0.1,0,0.1,0,0.2,0h0.1
				c4.2-0.4,7.8-3.2,9.3-7.1C47.1,37.6,45,36,43.3,34.7z"/>
			</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static traduction(): ContenusSVG {
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<g>
				<path class="caractere2 accent xsvg-elem xsvg-elem_filled" d="M26.98,42.19l0.97,0.53c0.32,0.17,0.72,0.06,0.89-0.26l0.47-0.87c0.11-0.21,0.34-0.34,0.58-0.34h4.8
					c0.24,0,0.46,0.13,0.58,0.34l0.47,0.87c0.17,0.32,0.57,0.44,0.89,0.26l1-0.55c0.3-0.16,0.41-0.54,0.25-0.83l-5.01-9.18
					c-0.25-0.46-0.9-0.46-1.15,0l-4.99,9.15C26.54,41.62,26.66,42.01,26.98,42.19z M30.95,38.58l1.18-2.17c0.07-0.12,0.24-0.12,0.3,0
					l1.18,2.17c0.06,0.12-0.02,0.26-0.15,0.26H31.1C30.97,38.83,30.89,38.69,30.95,38.58z"/>
				<path class="caractere1 accent xsvg-elem xsvg-elem_filled" d="M16.28,4.9h-1.06c-0.37,0-0.68,0.3-0.68,0.68v1.06c0,0.37-0.3,0.68-0.68,0.68H10.4
					c-0.37,0-0.68,0.3-0.68,0.68v1.06c0,0.37,0.3,0.68,0.68,0.68l1.25,0c0.33,0,0.6,0.24,0.67,0.56c0.22,1.03,0.63,1.99,1.19,2.85
					c0.22,0.34,0.08,0.81-0.3,0.97c-0.53,0.22-1.1,0.36-1.69,0.42c-0.33,0.03-0.59,0.34-0.59,0.67v1.06c0,0.42,0.34,0.71,0.75,0.67
					c1.35-0.12,2.61-0.56,3.7-1.24c0.23-0.14,0.51-0.14,0.73,0c1.09,0.68,2.35,1.12,3.7,1.24c0.41,0.04,0.75-0.25,0.75-0.67l0-1.06
					c0-0.33-0.26-0.64-0.59-0.67c-0.59-0.06-1.16-0.2-1.69-0.42c-0.38-0.16-0.53-0.62-0.3-0.97c0.56-0.85,0.97-1.82,1.19-2.85
					c0.07-0.32,0.34-0.56,0.67-0.56l1.12,0c0.51,0,0.81-0.3,0.81-0.68V7.99c0-0.37-0.3-0.68-0.68-0.68h-3.47
					c-0.37,0-0.68-0.3-0.68-0.68l0-1.06C16.96,5.21,16.66,4.9,16.28,4.9z M15.36,11.54c-0.18-0.3-0.33-0.63-0.45-0.96
					c-0.15-0.42,0.17-0.86,0.62-0.86h0.45c0.44,0,0.77,0.44,0.62,0.86c-0.12,0.34-0.27,0.66-0.45,0.96
					C15.97,11.84,15.54,11.84,15.36,11.54z"/>
				<path class="bulle2 base xsvg-elem xsvg-elem_filled" d="M35.83,26.11l2.09,1.76c0.69,0.58,1.56,0.9,2.46,0.9h2.65v16.67H21.54V28.77h10.65
					C33.9,28.77,35.34,27.65,35.83,26.11 M33.87,21.24c-0.22,0-0.42,0.17-0.42,0.42v3.3c0,0.69-0.56,1.26-1.26,1.26H20.24
					c-0.69,0-1.26,0.56-1.26,1.26v19.27c0,0.69,0.56,1.26,1.26,1.26h24.09c0.69,0,1.26-0.56,1.26-1.26V27.47
					c0-0.69-0.56-1.26-1.26-1.26h-3.95c-0.3,0-0.58-0.1-0.81-0.3l-5.43-4.58C34.06,21.27,33.96,21.24,33.87,21.24L33.87,21.24z"/>
				<path class="bulle1 base xsvg-elem xsvg-elem_filled" d="M26.46,2.56v16.67H15.81c-1.7,0-3.15,1.12-3.64,2.66l-2.09-1.76c-0.69-0.58-1.56-0.9-2.46-0.9H4.97V2.56H26.46
					M27.76,0H3.67C2.97,0,2.41,0.56,2.41,1.26v19.27c0,0.69,0.56,1.26,1.26,1.26h3.95c0.3,0,0.58,0.1,0.81,0.3l5.43,4.58
				c0.08,0.07,0.18,0.1,0.27,0.1c0.22,0,0.42-0.17,0.42-0.42v-3.3c0-0.69,0.56-1.26,1.26-1.26h11.96c0.69,0,1.26-0.56,1.26-1.26V1.26
				C29.02,0.56,28.46,0,27.76,0L27.76,0z"/>
			</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static troispoints(): ContenusSVG
	{
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<g class="xsvg-elem xsvg-elem_filled" id="troispoints">
				<circle class="xsvg-elem xsvg-elem_filled" id="point3" cx="24" cy="5.7" r="5.7"/>
				<circle class="xsvg-elem xsvg-elem_filled" id="point2" cx="24" cy="24" r="5.7"/>
				<circle class="xsvg-elem xsvg-elem_filled" id="point1" cx="24" cy="42.3" r="5.7"/>
			</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static troispoints_horizontaux(): ContenusSVG
	{
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<g class="xsvg-elem xsvg-elem_filled" id="troispoints">
				<circle class="xsvg-elem xsvg-elem_filled" id="point3" cx="42.3" cy="24" r="5.7"/>
				<circle class="xsvg-elem xsvg-elem_filled" id="point2" cx="24" cy="24" r="5.7"/>
				<circle class="xsvg-elem xsvg-elem_filled" id="point1" cx="5.7" cy="24" r="5.7"/>
			</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static upload(): ContenusSVG {
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<g>
				<polyline class="xsvg-elem xsvg-elem_stroked" points="46,21.8 46,42.8 2,42.8 2,21.8"/>
				<line class="xsvg-elem xsvg-elem_stroked" x1="24" y1="32.3" x2="24" y2="5.2"/>
				<line class="xsvg-elem xsvg-elem_stroked" x1="34.3" y1="15.5" x2="24" y2="5.2"/>
				<line class="xsvg-elem xsvg-elem_stroked" x1="13.7" y1="15.5" x2="24" y2="5.2"/>
			</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static validation(): ContenusSVG {
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<g>
			  <polyline class="xsvg-elem xsvg-elem_stroked" points="13.85,22.29 24.64,32.47 45.6,11.29"/>
			  <path class="xsvg-elem xsvg-elem_stroked" d="M45.67,29.36C42.7,41.14,30.75,48.29,18.97,45.33C7.19,42.37,0.04,30.42,3,18.64S17.92-0.29,29.7,2.67
			c2.4,0.6,4.69,1.61,6.76,2.98"/>
			</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static valider(): ContenusSVG {
		let viewBoxContains = `0 0 47.31 31.89`;
		let contenu = `
			<g>
				<polyline class="xsvg-elem xsvg-elem_stroked" points="45.31 2 16.82 29.89 2 15.6"/>
			</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static verrouille(): ContenusSVG
	{
		let viewBoxContains = `0 0 36 48`;
		let contenu = `
			<g>
			  <path class="xsvg-elem xsvg-elem_filled" d="M31.5,18H30V12A12,12,0,0,0,6,12v6H4.5A4.51,4.51,0,0,0,0,22.5v21A4.51,4.51,0,0,0,4.5,48h27A4.51,4.51,0,0,0,36,43.5v-21A4.51,4.51,0,0,0,31.5,18ZM10,12a8,8,0,0,1,16,0v6H10ZM20,33.44V38a2,2,0,0,1-4,0V33.44a4,4,0,1,1,4,0Z"/>
			</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static visualiser(): ContenusSVG
	{
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<g>
				<path id="fond" class="xsvg-elem xsvg-elem_filled xsvg-elem_couleurPrincipale" d="M47.3,21.1C42.7,12.7,33.8,7.5,24,7.5S5.3,12.7,0.7,21.1c-1,1.8-1,4,0,5.8C5.3,35.3,14.2,40.5,24,40.5
					s18.7-5.2,23.3-13.6C48.2,25.1,48.2,22.9,47.3,21.1z M24,37.5c-7.5,0-13.5-6-13.5-13.5c0-7.5,6-13.5,13.5-13.5s13.5,6,13.5,13.5
					C37.5,31.5,31.5,37.5,24,37.5z"/>
				<circle id="blanc" class="xsvg-elem xsvg-elem_transparent xsvg-elem_couleurTertiaire" cx="24" cy="24" r="13.5"/>
				<path id="pupille" class="xsvg-elem xsvg-elem_filled xsvg-elem_couleurSecondaire" d="M26.8,24.1c-1.5-0.3-2.7-1.5-3-3c-0.4-1.6,0.3-3.1,1.4-4c0.3-0.2,0.2-0.7-0.2-0.7c-1.1-0.2-2.2-0.1-3.4,0.3
					c-2.7,0.8-4.8,3.2-5.3,6c-0.9,5.2,3.6,9.7,8.8,8.8c2.8-0.5,5.2-2.5,6-5.3c0.4-1.2,0.4-2.3,0.3-3.4c-0.1-0.4-0.5-0.5-0.7-0.2
					C30,23.8,28.5,24.5,26.8,24.1z"/>
			</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static user(): ContenusSVG
	{
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			  <g>
				<path class="xsvg-elem xsvg-elem_filled" d="M24,48c-5.24,0-10.48,0.01-15.72-0.01c-0.75,0-1.53-0.04-2.23-0.27c-1.9-0.62-2.96-2.06-3.01-4
		c-0.06-2.22-0.09-4.49,0.3-6.66c0.98-5.47,5.74-9.47,11.27-9.9c1.43-0.11,2.72,0.02,4.07,0.51c3.56,1.3,7.19,1.33,10.71-0.05
		c2.1-0.82,4.11-0.59,6.13-0.09c5.23,1.28,9.14,5.97,9.35,11.4C44.93,40.2,45,41.48,45,42.76c0.01,3.43-1.78,5.23-5.2,5.23
		C34.53,48,29.26,48,24,48z"/>
				<path class="xsvg-elem xsvg-elem_filled" d="M35.93,11.9c-0.05,6.49-5.04,11.9-11.9,11.95c-6.41,0.04-11.9-4.81-11.96-11.94C12.01,5.52,17,0.03,23.98,0
		C30.52-0.03,35.76,5.05,35.93,11.9z"/>
			  </g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static user_ensemble(): ContenusSVG
	{
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<g id="avant">
				<path class="xsvg-elem xsvg-elem_filled xsvg-elem_couleurPrincipale" d="M30.5,44c-4.4,0-8.7,0-13.1,0c-0.6,0-1.3,0-1.9-0.2c-1.6-0.5-2.5-1.7-2.5-3.3c-0.1-1.9-0.1-3.7,0.3-5.6
					c0.8-4.6,4.8-7.9,9.4-8.3c1.2-0.1,2.3,0,3.4,0.4c3,1.1,6,1.1,8.9,0c1.8-0.7,3.4-0.5,5.1-0.1c4.4,1.1,7.6,5,7.8,9.5
					c0,1.1,0.1,2.1,0.1,3.2c0,2.9-1.5,4.4-4.3,4.4C39.3,44,34.9,44,30.5,44z"/>
				<path class="xsvg-elem xsvg-elem_filled xsvg-elem_couleurPrincipale" d="M40.4,13.9c0,5.4-4.2,9.9-9.9,10c-5.3,0-9.9-4-10-10c0-5.3,4.1-9.9,9.9-9.9C35.9,3.9,40.3,8.2,40.4,13.9z"/>
			</g>
			<g id="arriere">
				<path class="xsvg-elem xsvg-elem_filled xsvg-elem_couleurSecondaire" d="M19.4,24.2c-0.9-0.1-1.9-0.1-2.9,0.3c-2.2,0.9-4.5,0.8-6.7,0c-0.8-0.3-1.7-0.4-2.5-0.3c-3.5,0.3-6.4,2.8-7.1,6.2
					C0,31.7,0,33.2,0,34.6c0,1.2,0.7,2.1,1.9,2.5c0.4,0.1,0.9,0.2,1.4,0.2c2.2,0,4.5,0,6.7,0c0-0.9,0.1-1.9,0.3-2.9
					C11.1,29.5,14.7,25.7,19.4,24.2z"/>
				<path class="xsvg-elem xsvg-elem_filled xsvg-elem_couleurSecondaire" d="M18.3,9.3C17,8,15.2,7.2,13.1,7.2c-4.4,0-7.5,3.5-7.4,7.4c0,4.5,3.5,7.5,7.5,7.5c2.3,0,4.3-1,5.6-2.6
					c-0.8-1.7-1.3-3.6-1.3-5.6C17.5,12.3,17.8,10.8,18.3,9.3z"/>
			</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};

	public static emed_soins(): ContenusSVG {
		let viewBoxContains = `0 0 48 48`;
		let contenu = ` 
			<g>
	<g id="Groupe_293" transform="translate(43.073 113.093) rotate(-11)">
		<path id="Tracé_61" class="xsvg-elem xsvg-elem_filled" d="M20.06-93.36c0.72-0.01,0.98,0.17,0.97,0.93c-0.04,2.79,0.02,5.57-0.03,8.36
			c-0.04,5.26-4.22,9.56-9.48,9.76c-4.93,0.32-9.34-3.06-10.29-7.91c-0.3-2.59-0.37-5.2-0.21-7.8C1-91.1,0.53-92.58,1.23-93.15
			c0.67-0.54,2.08-0.17,3.17-0.19c0.04,0,0.07,0,0.11,0c0.54-0.06,0.76,0.16,0.74,0.72c-0.03,1.02,0,2.04,0,3.06
			c0,0.44,0.14,0.82,0.61,0.85c0.53,0.03,0.7-0.36,0.69-0.85c-0.02-0.99,0.03-1.98-0.02-2.96c-0.03-0.66,0.2-0.84,0.84-0.83
			c2.12,0.03,4.23,0.01,6.35,0.01S17.94-93.32,20.06-93.36z M5.27-85.18c-0.02,0.31,0.21,0.58,0.51,0.6c0.03,0,0.06,0,0.08,0
			c0.32,0.04,0.61-0.18,0.65-0.5c0.01-0.05,0.01-0.1,0-0.15c0.01-0.33-0.25-0.6-0.58-0.61c-0.01,0-0.01,0-0.02,0
			c-0.33-0.03-0.62,0.22-0.65,0.55C5.26-85.26,5.26-85.22,5.27-85.18z"/>
		<path id="Tracé_62" class="xsvg-elem xsvg-elem_filled" d="M1.87-94.68c-0.67,0-0.9-0.14-0.89-0.85c0.05-2.47,0-4.93,0.02-7.4c0.02-5.52,4.51-9.98,10.03-9.96
			c1.2,0,2.39,0.23,3.52,0.65c3.82,1.4,6.38,5,6.45,9.06c0.05,2.54-0.01,5.08,0.03,7.61c0.01,0.68-0.17,0.89-0.87,0.88
			c-3.03-0.04-6.06-0.02-9.09-0.02C8-94.69,4.93-94.71,1.87-94.68z M15.03-108.89c-0.39-0.28-0.85-0.51-1.19,0.01
			c-0.34,0.52,0.05,0.82,0.46,1.09c1.52,1,2.49,2.66,2.61,4.48c0.05,0.6,0.21,1.31,0.76,1.25c0.52-0.05,0.67-0.8,0.54-1.41
			C18.04-105.67,16.87-107.67,15.03-108.89z"/>
	</g>
	<g class="st0">
		<path class="xsvg-elem xsvg-elem_filled" d="M1.99,16.22l9.39-5.42c1.73-1,3.94-0.4,4.94,1.32l2.71,4.69L3.38,25.85l-2.71-4.69C-0.33,19.43,0.27,17.22,1.99,16.22z
			 M11.51,39.93L4.28,27.42l15.65-9.03l7.23,12.52L11.51,39.93z M12.7,29.34c0.65-0.38,0.87-1.2,0.5-1.85
			c-0.38-0.65-1.2-0.87-1.85-0.49c-0.65,0.38-0.87,1.2-0.49,1.85C11.22,29.5,12.05,29.72,12.7,29.34z M15.13,46.19l-2.71-4.69
			l15.65-9.03l2.71,4.69c1,1.72,0.4,3.94-1.32,4.94l-9.39,5.42C18.34,48.51,16.12,47.92,15.13,46.19z M15.41,34.04
			c0.65-0.38,0.87-1.2,0.5-1.85c-0.38-0.65-1.2-0.87-1.85-0.5c-0.65,0.38-0.87,1.2-0.49,1.85S14.76,34.41,15.41,34.04z M17.39,26.63
			c0.65-0.38,0.87-1.2,0.49-1.85c-0.38-0.65-1.2-0.87-1.85-0.49c-0.65,0.38-0.87,1.2-0.5,1.85C15.91,26.79,16.74,27.01,17.39,26.63z
			 M20.1,31.33c0.65-0.38,0.87-1.2,0.49-1.85c-0.38-0.65-1.2-0.87-1.85-0.5c-0.65,0.38-0.87,1.2-0.5,1.85S19.45,31.7,20.1,31.33z"/>
	</g>
</g>
			`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};

	public static emed_perfusions(): ContenusSVG {
		let viewBoxContains = `0 0 27.64 48`;
		let contenu = `
			<g>
				<path class="xsvg-elem xsvg-elem_filled" d="M16.44,41h.64a.49.49,0,0,0,.49-.5h0V38.9H10.08v1.61a.5.5,0,0,0,.5.5h.61a11.43,11.43,0,0,0,10.54,7h4a1.51,1.51,0,0,0,1.51-1.5h0V45a1.52,1.52,0,0,0-1.51-1.51h-4A6.91,6.91,0,0,1,16.44,41Z"/>
				<path class="xsvg-elem xsvg-elem_filled" d="M26.13,4.29H19.44a5.44,5.44,0,0,0-.32-.88A5.82,5.82,0,0,0,9,2.53a6.89,6.89,0,0,0-.5.88,6.59,6.59,0,0,0-.32.88H1.51A1.51,1.51,0,0,0,0,5.79H0v6.49a1.38,1.38,0,0,0,1.38,1.37h4.7A1.31,1.31,0,0,1,7.39,15h0a1.29,1.29,0,0,1-1.28,1.27H1.37A1.37,1.37,0,0,0,0,17.61H0A1.37,1.37,0,0,0,1.37,19H6.11a1.28,1.28,0,0,1,1.28,1.29h0a1.29,1.29,0,0,1-1.28,1.29H1.37A1.37,1.37,0,0,0,0,22.93H0V23a1.37,1.37,0,0,0,1.37,1.38H6.11a1.28,1.28,0,0,1,1.28,1.28h0A1.28,1.28,0,0,1,6.11,27H1.37A1.38,1.38,0,0,0,0,28.33H0v0a3,3,0,0,0,.89,2.13l5.78,5.78a3,3,0,0,0,2.13.89h10A3,3,0,0,0,21,36.26l5.78-5.78a3,3,0,0,0,.89-2.13V5.81a1.5,1.5,0,0,0-1.48-1.52ZM11.57,3.41a3.35,3.35,0,0,1,2-.88h.51a3.34,3.34,0,0,1,2.68,1.76H10.9a3.21,3.21,0,0,1,.67-.88Zm8.39,24a5.12,5.12,0,0,1-7-6.93l3.83-7a.76.76,0,0,1,1-.3.67.67,0,0,1,.3.3l3.8,6.93a5.17,5.17,0,0,1-2,7Z"/>
			</g>
			`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};

	public static emed_posologie(): ContenusSVG {
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<path class="xsvg-elem xsvg-elem_filled" d="M44,41.1H32.5l-5.7,5.7c0.5,0.3,1.1,0.6,1.7,0.6H44c1.7,0,3.1-1.4,3.1-3.1C47.2,42.5,45.8,41.1,44,41.1z"/>
	<path class="xsvg-elem xsvg-elem_filled" d="M25.3,13c0-1.7-1.4-3.1-3.1-3.1h-6.3V3.6c0-1.7-1.4-3.1-3.1-3.1S9.7,1.9,9.7,3.6v6.3H3.4c-1.7,0-3.1,1.4-3.1,3.1
		c0,1.7,1.4,3.1,3.1,3.1h6.3v6.3c0,1.7,1.4,3.1,3.1,3.1s3.1-1.4,3.1-3.1v-6.3h6.3C23.9,16.1,25.3,14.7,25.3,13z"/>
	<g>
		<path class="xsvg-elem xsvg-elem_filled" d="M44.8,7.5c-4-4-10.4-4-14.4,0L28.9,9c0.7,1.2,1.1,2.5,1.1,4c0,3.9-2.8,7.1-6.6,7.7l11.2,11.3l10.1-10
			C48.7,17.9,48.7,11.5,44.8,7.5z"/>
		<path class="xsvg-elem xsvg-elem_filled" d="M20.6,22.5c-0.1,4.2-3.6,7.6-7.8,7.6c-1.5,0-2.9-0.4-4.1-1.2l-1.2,1.2c-4,4-4,10.4,0,14.4c4,4,10.4,4,14.4,0l10.4-10.3
			L20.6,22.5z"/>
	</g>
			`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static emed_suspendre(): ContenusSVG
	{
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<g>
		<path class="xsvg-elem xsvg-elem_filled"  d="M45.4,0.2H31.1c-1.3,0-2.3,1-2.3,2.3v43.1c0,1.3,1,2.3,2.3,2.3h14.3c1.3,0,2.3-1,2.3-2.3V2.5C47.7,1.2,46.7,0.2,45.4,0.2z"
		/>
	<path class="xsvg-elem xsvg-elem_filled" d="M16.9,0.2H2.6c-1.3,0-2.3,1-2.3,2.3v43.1c0,1.3,1,2.3,2.3,2.3h14.3c1.3,0,2.3-1,2.3-2.3V2.5C19.1,1.2,18.1,0.2,16.9,0.2z"
		/>
		</g>
			`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static emed_prolonger(): ContenusSVG {
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<g>
		<polyline class="xsvg-elem xsvg-elem_stroked" points="18.3,45.5 45.8,24 18.3,2.5 	"/>
		<polyline class="xsvg-elem xsvg-elem_stroked" points="2.2,45.5 29.7,24 2.2,2.5 	"/>
		</g>
			`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};
	public static logo_elive(): ContenusSVG {
		let viewBoxContains = `0 0 855 497`;

		let contenu = `<g>
        <path class="coul-logo1" d="M518.3,154C387.5,363.2,248.9,496.6,136.5,496.6c-91.5,0-136-60.1-136-151.7C0.5,177.6,149.5-0.3,311.7-0.3
		c44.5,0,70.6,23.5,70.6,65.4c0,65.4-107.2,177.8-217,170c-28.8,60.1-49.7,122.9-49.7,170c0,28.8,10.5,49.7,36.6,49.7
		c99.4,0,238-143.8,350.4-345.2C518.3,114.8,531.3,133.1,518.3,154z M183.5,198.5c88.9-5.2,162.1-96.8,162.1-133.4
		c0-13.1-5.2-18.3-18.3-18.3C288.1,46.8,228,114.8,183.5,198.5z"/></g><g><g>
		<path class="coul-logo2" d="M341.9,479V234.6h55.8V479H341.9z"/>
		<path class="coul-logo2" d="M421.7,254.6c0-18.2,14.5-31.7,32.7-31.7c17.9,0,32.7,13.4,32.7,31.7c0,17.9-14.8,31.3-32.7,31.3 C436.2,285.9,421.7,272.5,421.7,254.6z M426.9,479V312.1h55.8V479H426.9z"/>
		<path class="coul-logo2" d="M564.6,479l-72.3-166.9h58.9l39.9,96.4l39.9-96.4h58.9L617.6,479H564.6z"/>
		<path class="coul-logo2" d="M853.7,410.9l0.3,1H735c4.5,15.1,16.2,26.8,37.5,26.8c11.7,0,20.7-4.5,25.5-12H853
			c-7.9,34.4-39.9,56.1-81.2,56.1c-54.7,0-91.2-36.5-91.2-87.4c0-50.6,35.5-87.1,88.8-87.1c48.5,0,85.4,33.4,85.4,83.6
			C854.7,398.1,854.7,404.7,853.7,410.9z M734.3,379.2h68.2c-3.1-18.2-15.1-27.9-33-27.9C750.4,351.3,738.4,362.3,734.3,379.2z"/>
	    </g></g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	}

	//---- Icones Emed ----//


	public static age_patient_nouveau_ne(): ContenusSVG {
		let viewBoxContains = `0 0 48 48`;

		let contenu = `
			<g id="silhouette5">
				<path class="base" d="M38.88,24.84c0-2.6-1.61-4.84-3.89-5.78v22.68c0,1.77,0.75,3.37,1.94,4.52c1.19-1.14,1.94-2.74,1.94-4.52
					V24.84z"/>
				<path class="base" d="M35.01,6.56c0.12,2.46,1.68,4.55,3.85,5.46C38.73,9.56,37.18,7.47,35.01,6.56z"/>
				<path class="base" d="M47.5,6.26L47.5,6.26C47.5,2.81,44.69,0,41.25,0c-3.07,0-5.63,2.24-6.15,5.16c2.98,1.03,5.13,3.86,5.13,7.19
					c0,0.02,0,0.05,0,0.07c0.28,0.05,0.57,0.08,0.87,0.09c-0.3,0.01-0.59,0.04-0.88,0.09c-0.08,2.46-1.36,4.66-3.29,6
					c1.99,1.38,3.3,3.68,3.3,6.25v16.91c0,2.08-0.84,3.97-2.21,5.35c0.94,0.57,2.04,0.91,3.22,0.91c3.44,0,6.26-2.82,6.26-6.26V18.75
					c0-3.39-2.73-6.16-6.1-6.25C44.77,12.42,47.5,9.64,47.5,6.26z"/>
				<path class="base" d="M35.02,18.1c2.07-0.87,3.58-2.81,3.82-5.12C36.78,13.85,35.26,15.79,35.02,18.1z"/>
			</g>
			<g id="silhouette4">
				<path class="base" d="M30.25,29.57c0-2.59-1.6-4.44-3.87-5.2c-0.01,0.15-0.02,0.31-0.02,0.46v16.91c0,1.77,0.75,3.37,1.94,4.52
					c1.19-1.14,1.94-2.74,1.94-4.52V29.57z"/>
				<path class="base" d="M26.38,11.97c-0.01,0.12-0.02,0.25-0.02,0.37c0,2.6,1.61,4.83,3.87,5.77c0.01-0.12,0.02-0.24,0.02-0.36
					C30.26,15.15,28.65,12.91,26.38,11.97z"/>
				<path class="base" d="M32.78,18.59c3.37-0.08,6.1-2.86,6.1-6.25c0-3.44-2.82-6.26-6.26-6.26c-2.84,0-5.25,1.92-6.01,4.53
					c2.91,1.07,4.99,3.86,4.99,7.14c0,0.25-0.02,0.5-0.05,0.75c0.29,0.05,0.59,0.09,0.9,0.1c-0.31,0.01-0.62,0.05-0.92,0.1
					c-0.27,2.11-1.41,3.97-3.06,5.19c1.93,1.22,3.12,3.26,3.12,5.7v12.17c0,2.08-0.84,3.97-2.21,5.35c0.94,0.57,2.04,0.91,3.22,0.91
					c3.44,0,6.26-2.82,6.26-6.26V24.84C38.88,21.45,36.14,18.67,32.78,18.59z"/>
				<path class="base" d="M26.52,23.46c1.79-0.79,3.13-2.4,3.57-4.34C28.31,19.91,26.96,21.52,26.52,23.46z"/>
			</g>
			<g id="silhouette3">
				<path class="base" d="M21.6,24.38c-2.26,0.76-3.86,2.6-3.86,5.19v0.04C19.85,28.74,21.39,26.74,21.6,24.38z"/>
				<path class="base" d="M21.63,36.33c0-2.6-1.61-4.85-3.89-5.78v11.19c0,1.77,0.75,3.37,1.94,4.52c1.19-1.14,1.94-2.74,1.94-4.52
					V36.33z"/>
				<path class="base" d="M24.12,24c3.39-0.06,6.14-2.85,6.14-6.25c0-3.44-2.82-6.26-6.26-6.26c-3.06,0-5.62,2.23-6.15,5.14
					c2.98,1.03,5.13,3.86,5.13,7.19c0,0.03,0,0.05-0.01,0.08c0.3,0.05,0.6,0.08,0.9,0.09c-0.31,0-0.61,0.03-0.91,0.07
					c-0.08,2.49-1.35,4.68-3.27,6.01c1.98,1.37,3.28,3.67,3.28,6.26v5.41c0,2.08-0.84,3.97-2.21,5.35C21.72,47.66,22.82,48,24,48
					c3.44,0,6.26-2.82,6.26-6.26V29.57C30.25,26.17,27.5,24.05,24.12,24z"/>
				<path class="base" d="M17.76,18.04c0.12,2.47,1.68,4.57,3.85,5.47C21.49,21.05,19.94,18.95,17.76,18.04z"/>
			</g>
			<g id="silhouette2">
				<path class="base" d="M9.14,23.5c-0.01,0.11-0.02,0.22-0.02,0.33c0,2.6,1.61,4.84,3.87,5.78c0.01-0.11,0.02-0.22,0.02-0.33
					C13.01,26.68,11.4,24.44,9.14,23.5z"/>
				<path class="base" d="M9.14,35.98c-0.01,0.12-0.02,0.24-0.02,0.36v5.41c0,1.77,0.75,3.37,1.94,4.52c1.19-1.14,1.94-2.74,1.94-4.52
					C13.01,39.15,11.4,36.92,9.14,35.98z"/>
				<path class="base" d="M15.37,30.08c3.44,0,6.26-2.82,6.26-6.26c0-3.44-2.81-6.26-6.26-6.26h0c-2.86,0-5.28,1.94-6.02,4.57
					c2.91,1.07,5,3.86,5,7.14c0,0.24-0.02,0.47-0.04,0.71C14.66,30.04,15.01,30.08,15.37,30.08c-0.37,0-0.72,0.04-1.07,0.1
					c-0.26,2.19-1.47,4.12-3.21,5.33c1.98,1.38,3.27,3.67,3.27,6.23c0,2.08-0.84,3.97-2.21,5.35C13.1,47.66,14.2,48,15.37,48h0
					c3.44,0,6.26-2.82,6.26-6.26v-5.41C21.63,32.89,18.82,30.08,15.37,30.08z"/>
				<path class="base" d="M9.27,34.98c1.8-0.8,3.15-2.41,3.59-4.37C11.06,31.41,9.71,33.03,9.27,34.98z"/>
			</g>
			<path id="silhouette1" class="accent" d="M7.17,35.51c3.25-0.22,5.84-2.93,5.84-6.23c0-3.44-2.81-6.26-6.26-6.26
				c-3.44,0-6.26,2.81-6.26,6.26c0,3.3,2.59,6.02,5.84,6.23c-3.25,0.22-5.84,2.93-5.84,6.23C0.5,45.18,3.31,48,6.75,48
				c3.44,0,6.26-2.82,6.26-6.26C13.01,38.44,10.42,35.73,7.17,35.51z"/>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	}
	//---- FIN Icones Emed ----//

	//---- Icones Tuiles ----//


	public static admin(): ContenusSVG {
		let viewBoxContains = `0 0 48 48`;

		let contenu = `
			<g id="rondsinterieur">
				<path class="xsvg-transparent xsvg-elem xsvg-elem_filled" d="M41.49,33.27c-0.26,0.89-0.8,1.55-1.61,1.98c-0.81,0.44-1.66,0.52-2.54,0.26c-0.88-0.27-1.54-0.8-1.98-1.61
					c-0.43-0.79-0.51-1.64-0.24-2.54c0.27-0.89,0.8-1.56,1.59-1.99c0.8-0.43,1.65-0.51,2.54-0.24c0.89,0.27,1.56,0.8,1.99,1.6
					C41.67,31.54,41.76,32.39,41.49,33.27z"/>
				<path class="xsvg-transparent xsvg-elem xsvg-elem_filled" d="M21.5,22.97c-0.49,1.65-1.5,2.88-3.01,3.69c-1.51,0.82-3.09,0.97-4.74,0.48c-1.65-0.5-2.88-1.49-3.69-3.01
					c-0.79-1.48-0.95-3.06-0.44-4.72c0.5-1.67,1.49-2.9,2.97-3.7c1.48-0.8,3.07-0.95,4.73-0.44c1.67,0.5,2.9,1.49,3.7,2.98
					C21.84,19.75,22,21.33,21.5,22.97z"/>
				<path class="xsvg-transparent xsvg-elem xsvg-elem_filled" d="M38.78,13.73c-0.19,0.65-0.59,1.13-1.18,1.45c-0.59,0.32-1.21,0.38-1.86,0.19c-0.65-0.19-1.13-0.59-1.45-1.18
					c-0.31-0.58-0.37-1.2-0.17-1.86c0.2-0.65,0.58-1.14,1.17-1.45c0.58-0.31,1.21-0.37,1.86-0.17c0.65,0.2,1.14,0.59,1.45,1.17
					C38.91,12.46,38.98,13.08,38.78,13.73z"/>
			</g>
			<g>
				<path id="engrenage1" class="xsvg-elem xsvg-elem_filled" d="M28.38,29.92c0-0.17-0.06-0.32-0.17-0.49c-0.91-1.09-1.64-2.02-2.19-2.8c0.34-0.66,0.6-1.28,0.78-1.85l3.77-0.58
					c0.15-0.02,0.28-0.1,0.39-0.26c0.11-0.15,0.17-0.31,0.17-0.48v-4.5c0-0.18-0.06-0.34-0.17-0.47c-0.11-0.14-0.25-0.22-0.41-0.25
					l-3.7-0.56c-0.18-0.55-0.45-1.22-0.83-2c0.24-0.36,0.61-0.84,1.09-1.46c0.49-0.62,0.83-1.05,1.02-1.31
					c0.11-0.16,0.17-0.32,0.17-0.46c0-0.44-1.17-1.73-3.51-3.89c-0.16-0.13-0.33-0.2-0.51-0.2c-0.19,0-0.36,0.05-0.49,0.17l-2.87,2.16
					c-0.66-0.34-1.27-0.59-1.82-0.75l-0.56-3.72c-0.02-0.16-0.1-0.3-0.24-0.43c-0.15-0.12-0.31-0.18-0.49-0.18H13.3
					c-0.37,0-0.62,0.19-0.73,0.59c-0.19,0.75-0.38,1.99-0.56,3.75c-0.7,0.23-1.32,0.49-1.88,0.78l-2.8-2.19
					C7.18,8.43,7.01,8.38,6.84,8.38c-0.31,0-0.95,0.48-1.92,1.44s-1.64,1.68-1.99,2.16c-0.11,0.13-0.17,0.29-0.17,0.49
					c0,0.15,0.06,0.31,0.17,0.49c0.91,1.09,1.64,2.02,2.19,2.8c-0.34,0.66-0.6,1.28-0.78,1.85l-3.77,0.58
					c-0.15,0.02-0.27,0.1-0.39,0.25C0.06,18.58,0,18.74,0,18.91v4.5c0,0.18,0.06,0.34,0.17,0.47c0.12,0.14,0.25,0.22,0.42,0.23
					l3.7,0.59c0.19,0.61,0.48,1.28,0.85,1.99c-0.26,0.36-0.64,0.85-1.15,1.48c-0.5,0.63-0.83,1.07-1,1.29
					c-0.12,0.16-0.17,0.32-0.17,0.46c0,0.44,1.17,1.73,3.5,3.89c0.16,0.13,0.33,0.19,0.51,0.19c0.21,0,0.37-0.05,0.49-0.17l2.87-2.16
					c0.67,0.34,1.27,0.59,1.82,0.75l0.56,3.72c0.02,0.16,0.1,0.31,0.24,0.43c0.15,0.12,0.31,0.18,0.49,0.18h4.52
					c0.37,0,0.62-0.19,0.73-0.58c0.19-0.76,0.38-2.02,0.56-3.77c0.65-0.19,1.27-0.45,1.87-0.75l2.8,2.19c0.17,0.11,0.33,0.17,0.51,0.17
					c0.31,0,0.94-0.48,1.91-1.45c0.96-0.96,1.63-1.69,2-2.18C28.32,30.27,28.38,30.12,28.38,29.92L28.38,29.92L28.38,29.92z
					 M19.97,25.59c-1.22,1.22-2.68,1.82-4.4,1.82c-1.72,0-3.19-0.6-4.4-1.82c-1.21-1.21-1.82-2.68-1.82-4.4c0-1.72,0.61-3.19,1.82-4.4
					c1.22-1.22,2.69-1.82,4.4-1.82c1.72,0,3.19,0.61,4.4,1.82c1.21,1.22,1.82,2.68,1.82,4.4S21.18,24.38,19.97,25.59z"/>
				<path id="engrenage2" class="xsvg-elem xsvg-elem_filled" d="M42.45,27.09c-0.44-0.34-0.88-0.61-1.33-0.83c-0.15-2.15-0.33-3.42-0.53-3.8c-0.03-0.06-0.09-0.1-0.18-0.11
					c-2.41-0.08-3.65-0.11-3.71-0.07l-0.11,0.12c-0.3,0.97-0.54,2.2-0.73,3.71c-0.33,0.14-0.56,0.24-0.72,0.32
					c-0.15,0.08-0.38,0.22-0.66,0.42c-0.38-0.21-1.06-0.51-2.02-0.91c-0.96-0.4-1.51-0.57-1.63-0.5c-0.03,0.01-0.19,0.26-0.49,0.74
					c-0.3,0.47-0.61,0.98-0.94,1.51c-0.33,0.53-0.51,0.83-0.56,0.89c-0.04,0.08-0.04,0.15,0,0.21c0.2,0.38,1.16,1.23,2.87,2.54
					c-0.07,0.49-0.09,1.02-0.05,1.56c-2.15,1.46-3.17,2.31-3.04,2.56l1.72,3.21c0.14,0.25,1.4-0.13,3.81-1.13
					c0.4,0.32,0.85,0.59,1.33,0.83c0.15,2.15,0.33,3.41,0.54,3.8c0.03,0.06,0.09,0.1,0.18,0.11c2.45,0.08,3.69,0.11,3.73,0.09
					c0.12-0.06,0.29-0.61,0.48-1.64c0.19-1.04,0.31-1.77,0.35-2.21c0.32-0.14,0.56-0.24,0.71-0.33c0.16-0.08,0.38-0.22,0.66-0.41
					c0.39,0.2,1.07,0.51,2.04,0.92c0.97,0.41,1.51,0.58,1.64,0.51c0.03-0.01,0.68-1.07,1.97-3.16c0.04-0.08,0.04-0.15,0.01-0.21
					c-0.2-0.38-1.16-1.23-2.88-2.54c0.07-0.53,0.08-1.05,0.04-1.56c2.16-1.46,3.17-2.31,3.04-2.56l-1.73-3.21
					C46.12,25.71,44.85,26.09,42.45,27.09z M41.5,33.27c-0.26,0.89-0.8,1.55-1.61,1.98c-0.81,0.44-1.66,0.52-2.54,0.26
					c-0.88-0.27-1.54-0.8-1.98-1.61c-0.43-0.79-0.51-1.64-0.24-2.54c0.27-0.89,0.8-1.56,1.59-1.99c0.8-0.43,1.65-0.51,2.54-0.24
					c0.89,0.27,1.56,0.8,1.99,1.6C41.68,31.55,41.76,32.39,41.5,33.27z"/>
				<path id="engrenage3" class="xsvg-elem xsvg-elem_filled" d="M40.32,10.06c-0.25-0.32-0.52-0.59-0.8-0.82c0.27-1.55,0.38-2.48,0.3-2.79c-0.01-0.05-0.05-0.09-0.11-0.11
					c-1.7-0.49-2.57-0.73-2.62-0.71l-0.1,0.06c-0.38,0.64-0.77,1.47-1.18,2.5c-0.25,0.04-0.44,0.07-0.57,0.1
					c-0.12,0.03-0.31,0.09-0.55,0.18c-0.23-0.21-0.66-0.55-1.27-1c-0.61-0.46-0.97-0.67-1.07-0.65c-0.02,0.01-0.18,0.15-0.48,0.44
					c-0.29,0.28-0.61,0.58-0.93,0.91c-0.32,0.32-0.51,0.5-0.55,0.53c-0.04,0.05-0.05,0.1-0.04,0.15c0.08,0.31,0.61,1.08,1.58,2.31
					c-0.13,0.34-0.24,0.7-0.31,1.1c-1.79,0.65-2.66,1.07-2.61,1.27l0.66,2.59c0.05,0.2,1.02,0.16,2.9-0.12c0.23,0.29,0.5,0.57,0.8,0.82
					c-0.28,1.55-0.37,2.48-0.3,2.79c0.02,0.05,0.05,0.08,0.11,0.11c1.72,0.49,2.6,0.74,2.62,0.73c0.1-0.02,0.31-0.39,0.63-1.08
					c0.32-0.7,0.54-1.2,0.64-1.5c0.25-0.03,0.44-0.07,0.57-0.1c0.12-0.03,0.31-0.09,0.54-0.18c0.24,0.22,0.66,0.55,1.28,1.02
					c0.62,0.46,0.97,0.67,1.07,0.65c0.02-0.01,0.68-0.64,1.96-1.89c0.04-0.05,0.05-0.1,0.04-0.15c-0.08-0.31-0.61-1.08-1.58-2.31
					c0.14-0.36,0.25-0.73,0.31-1.1c1.79-0.65,2.66-1.07,2.61-1.27l-0.66-2.58C43.16,9.74,42.2,9.78,40.32,10.06
					C40.32,10.06,40.32,10.06,40.32,10.06z M38.54,14.28c-0.34,0.58-0.84,0.95-1.5,1.12c-0.65,0.17-1.26,0.08-1.85-0.27
					c-0.58-0.34-0.95-0.84-1.12-1.5c-0.17-0.64-0.07-1.25,0.28-1.84c0.35-0.59,0.84-0.96,1.48-1.13c0.64-0.16,1.25-0.07,1.84,0.28
					c0.59,0.35,0.96,0.84,1.13,1.48C38.98,13.08,38.89,13.7,38.54,14.28z"/>
			</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	}

	public static aide(): ContenusSVG {
		let viewBoxContains = `0 0 48 48`;

		let contenu = `
			<g id="pointdinterrogation" class="xsvg-transparent xsvg-elem xsvg-elem_filled">
			<path  d="M26.68,39.74c-0.74,0.67-1.68,1-2.82,1c-1.14,0-2.08-0.34-2.84-1.03c-0.76-0.71-1.13-1.55-1.13-2.52
			c0-0.99,0.37-1.83,1.13-2.49c0.76-0.67,1.7-1,2.84-1c1.12,0,2.05,0.33,2.8,1c0.74,0.65,1.11,1.48,1.11,2.49
			C27.77,38.22,27.4,39.07,26.68,39.74z"/>
			<path d="M33.12,19.22c-0.2,0.7-0.49,1.37-0.88,2c-0.38,0.62-0.86,1.23-1.43,1.8c-0.57,0.58-1.22,1.17-1.96,1.78
			c-0.5,0.41-0.94,0.8-1.32,1.15c-0.37,0.36-0.68,0.7-0.93,1.05c-0.25,0.35-0.44,0.72-0.57,1.11c-0.12,0.39-0.19,0.84-0.19,1.33
			c0,0.34,0.05,0.69,0.14,1.05c0.09,0.35,0.22,0.65,0.38,0.89h-5.62c-0.14-0.37-0.25-0.78-0.33-1.25c-0.08-0.46-0.12-0.9-0.12-1.31
			c0-0.65,0.06-1.25,0.19-1.79c0.13-0.54,0.32-1.05,0.58-1.53c0.25-0.48,0.58-0.93,0.96-1.36c0.38-0.44,0.83-0.87,1.34-1.29
			c0.54-0.46,1.01-0.88,1.42-1.27c0.4-0.39,0.75-0.78,1.03-1.17c0.29-0.39,0.5-0.8,0.64-1.22s0.21-0.89,0.21-1.4
			c0-0.44-0.08-0.85-0.24-1.23c-0.16-0.38-0.38-0.7-0.67-0.97c-0.29-0.27-0.64-0.48-1.06-0.64c-0.42-0.15-0.89-0.24-1.4-0.24
			c-1.11,0-2.26,0.23-3.46,0.69c-1.19,0.46-2.32,1.16-3.39,2.1v-6.42c1.1-0.66,2.29-1.15,3.59-1.47c1.29-0.33,2.63-0.49,4.01-0.49
			c1.32,0,2.56,0.15,3.7,0.44c1.13,0.29,2.13,0.75,2.98,1.38c0.85,0.62,1.51,1.43,1.98,2.4c0.48,0.97,0.71,2.14,0.71,3.51
			C33.42,17.74,33.32,18.52,33.12,19.22z"/>
			</g>
			<path id="rond" class="xsvg-elem xsvg-elem_filled" d="M24,0C10.74,0,0,10.75,0,24c0,13.26,10.74,24,24,24s24-10.74,24-24C48,10.75,37.26,0,24,0z M26.68,39.74
			c-0.74,0.67-1.68,1-2.82,1c-1.14,0-2.08-0.34-2.84-1.03c-0.76-0.71-1.13-1.55-1.13-2.52c0-0.99,0.37-1.83,1.13-2.49
			c0.76-0.67,1.7-1,2.84-1c1.12,0,2.05,0.33,2.8,1c0.74,0.65,1.11,1.48,1.11,2.49C27.77,38.22,27.4,39.07,26.68,39.74z M33.12,19.22
			c-0.2,0.7-0.49,1.37-0.88,2c-0.38,0.62-0.86,1.23-1.43,1.8c-0.57,0.58-1.22,1.17-1.96,1.78c-0.5,0.41-0.94,0.8-1.32,1.15
			c-0.37,0.36-0.68,0.7-0.93,1.05c-0.25,0.35-0.44,0.72-0.57,1.11c-0.12,0.39-0.19,0.84-0.19,1.33c0,0.34,0.05,0.69,0.14,1.05
			c0.09,0.35,0.22,0.65,0.38,0.89h-5.62c-0.14-0.37-0.25-0.78-0.33-1.25c-0.08-0.46-0.12-0.9-0.12-1.31c0-0.65,0.06-1.25,0.19-1.79
			c0.13-0.54,0.32-1.05,0.58-1.53c0.25-0.48,0.58-0.93,0.96-1.36c0.38-0.44,0.83-0.87,1.34-1.29c0.54-0.46,1.01-0.88,1.42-1.27
			c0.4-0.39,0.75-0.78,1.03-1.17c0.29-0.39,0.5-0.8,0.64-1.22s0.21-0.89,0.21-1.4c0-0.44-0.08-0.85-0.24-1.23
			c-0.16-0.38-0.38-0.7-0.67-0.97c-0.29-0.27-0.64-0.48-1.06-0.64c-0.42-0.15-0.89-0.24-1.4-0.24c-1.11,0-2.26,0.23-3.46,0.69
			c-1.19,0.46-2.32,1.16-3.39,2.1v-6.42c1.1-0.66,2.29-1.15,3.59-1.47c1.29-0.33,2.63-0.49,4.01-0.49c1.32,0,2.56,0.15,3.7,0.44
			c1.13,0.29,2.13,0.75,2.98,1.38c0.85,0.62,1.51,1.43,1.98,2.4c0.48,0.97,0.71,2.14,0.71,3.51C33.42,17.74,33.32,18.52,33.12,19.22z"
			/>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	}




	public static appelContextuelAdmission(): ContenusSVG {
		let viewBoxContains = `0 0 48 48`;

		let contenu = `
			<g>
				<circle id="tete" class="xsvg-elem xsvg-elem_filled" cx="5.4" cy="7.2" r="4.3"/>
				<polygon id="pieds" class="xsvg-elem xsvg-elem_filled" points="2.8,32.8 45.2,32.8 48,32.8 48,36 48,45.1 45.2,45.1 45.2,36 2.8,36 2.8,45.1 0,45.1 0,36 0,32.8 	"/>
				<path id="draps" class="xsvg-elem xsvg-elem_filled" d="M0.3,15.2c0.2-0.1,0.5-0.3,1,0L12,26h13.2v-5.4l17.5,0c2.9,0,5.2,2.4,5.2,5.3v5H0v-2.8v-2.3V15.5
					C0,15.5,0.1,15.3,0.3,15.2z"/>
				<path id="corps" class="xsvg-elem xsvg-elem_filled" d="M10.6,14.4l6.4,6.2h6.8v4H13.2L3,14.4C7.7,10.8,10.6,14.4,10.6,14.4z"/>
			</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	}


	public static appelContextuelAdmissionLectureSeule(): ContenusSVG {
		let viewBoxContains = `0 0 48 48`;

		let contenu = `
		<g>
			<circle id="tete" class="xsvg-elem xsvg-elem_filled" cx="6.2" cy="11.7" r="4.2"/>
			<polygon id="pieds" class="xsvg-elem xsvg-elem_filled" points="3.7,36.2 44.3,36.2 47,36.2 47,39.3 47,48 44.3,48 44.3,39.3 3.7,39.3 3.7,48 1,48 1,39.3 1,36.2 	"/>
			<path id="draps" class="xsvg-elem xsvg-elem_filled" d="M1.3,19.4c0.2-0.1,0.5-0.3,0.9,0l10.3,10.3h12.7v-5.2l16.7,0c2.8,0,5,2.3,5,5.1v4.8H1v-2.7v-2.2v-9.9
				C1,19.7,1.1,19.5,1.3,19.4z"/>
			<path id="corps" class="xsvg-elem xsvg-elem_filled" d="M11.1,18.5l6.1,5.9h6.5v3.8H13.6l-9.7-9.8C8.4,15.2,11.1,18.5,11.1,18.5z"/>
		</g>
		<g id="cadenas">
			<path class="xsvg-elem xsvg-elem_filled" d="M35.8,5.6c0-1.9,1.5-3.4,3.4-3.4c1.8,0,3.4,1.5,3.4,3.4v2.6h2.2V5.6c0-3.1-2.5-5.6-5.6-5.6
				c-3.1,0-5.6,2.5-5.6,5.6v2.6h2.2V5.6z"/>
			<path class="xsvg-elem xsvg-elem_filled" d="M44.8,8.2h-2.2h-6.7h-2.2c-1.2,0-2.2,1-2.2,2.2v7.4c0,1.2,1,2.2,2.2,2.2h11.2c1.2,0,2.2-1,2.2-2.2v-7.4
				C47,9.2,46,8.2,44.8,8.2z M39.5,14.1V16c0,0.2-0.2,0.4-0.4,0.4c-0.2,0-0.4-0.2-0.4-0.4v-1.9c-0.4-0.2-0.7-0.6-0.7-1.1
				c0-0.6,0.5-1.1,1.1-1.1s1.1,0.5,1.1,1.1C40.3,13.5,40,13.9,39.5,14.1z"/>
		</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	}


	public static appelContextuelPrescription(): ContenusSVG {
		let viewBoxContains = `0 0 48 48`;

		let contenu = `
		<g>
			<path class="xsvg-elem xsvg-elem_filled" d="M47.4,18.1c1.7,9.1-7.3,18.7-20.2,21.6C15.4,42.3,4.3,38.4,0.8,31c0,0.1,0,0.2,0,0.3C2.8,40.4,15,45.5,28.1,42.6
				C41.2,39.7,50.5,30.4,47.4,18.1z"/>
			<g>
				<path class="xsvg-elem xsvg-elem_filled" d="M4.6,33.1L37.8,6.6c-4.9-2.1-11.2-2.7-17.8-1.3C7.2,8.1-1.6,17.5,0.3,26.2C0.8,29,2.4,31.3,4.6,33.1z"/>
				<path class="xsvg-elem xsvg-elem_filled" d="M42.1,9.3L9,35.8c4.9,2.1,11.2,2.7,17.9,1.3C39.6,34.3,48.4,25,46.5,16.2C45.9,13.5,44.4,11.1,42.1,9.3z"/>
			</g>
		</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	}


	public static appelContextuelPrescriptionLectureSeule(): ContenusSVG
	{
		let viewBoxContains = `0 0 48 48`;

		let contenu = `
		<g id="pilule">
			<path class="xsvg-elem xsvg-elem_filled" d="M46.9,29.4c1.3,6.7-5.3,13.7-14.8,15.8c-8.6,1.9-16.7-0.9-19.3-6.4c0,0.1,0,0.1,0,0.2c1.4,6.7,10.4,10.4,20,8.3
				C42.4,45.3,49.2,38.4,46.9,29.4z"/>
			<g>
				<path class="xsvg-elem xsvg-elem_filled" d="M15.6,40.5l24.2-19.4c-3.6-1.6-8.2-2-13.1-1c-9.3,2-15.8,8.9-14.4,15.3C12.9,37.4,14,39.1,15.6,40.5z"/>
				<path class="xsvg-elem xsvg-elem_filled" d="M43.1,23L18.8,42.4c3.6,1.6,8.2,2,13.1,1c9.3-2,15.8-8.9,14.4-15.3C45.8,26.1,44.7,24.4,43.1,23z"/>
			</g>
		</g>
		<g id="cadenas">
			<path class="xsvg-elem xsvg-elem_filled" d="M5.4,5.6c0-1.8,1.5-3.3,3.3-3.3c1.8,0,3.3,1.5,3.3,3.3v2.6h2.2V5.6c0-3.1-2.5-5.6-5.6-5.6
				C5.6,0,3.2,2.5,3.2,5.6v2.6h2.2V5.6z"/>
			<path class="xsvg-elem xsvg-elem_filled" d="M14.3,8.2h-2.2H5.4H3.2c-1.2,0-2.2,1-2.2,2.2v7.4c0,1.2,1,2.2,2.2,2.2h11.1c1.2,0,2.2-1,2.2-2.2v-7.4
				C16.5,9.2,15.5,8.2,14.3,8.2z M9.1,14v1.9c0,0.2-0.2,0.4-0.4,0.4c-0.2,0-0.4-0.2-0.4-0.4V14c-0.4-0.2-0.7-0.6-0.7-1
				c0-0.6,0.5-1.1,1.1-1.1c0.6,0,1.1,0.5,1.1,1.1C9.8,13.5,9.5,13.9,9.1,14z"/>
		</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	}



	public static blocCommerce(): ContenusSVG {
	let viewBoxContains = `0 0 48 48`;

	let contenu = `
		<g>
	<path class="xsvg-elem xsvg-elem_filled" d="M48,16.1c-0.2,0.5-0.5,1.1-0.7,1.6c-0.1-0.9-0.1-1.7-0.3-2.4c-0.4-1.4-1.2-2.6-2.2-3.7C42,8.4,38.6,6.2,34.6,5
		C33,4.5,32,4.5,30.4,4.9c0.3-0.6,1.2-1.1,2.2-1.3c2-0.3,3.9,0.2,5.7,0.9c1,0.4,2,1,3,1.5c1.7-1.5,2.5-3.5,2.5-5.8c0.3,0,0.7,0,1,0
		c0.7,0.1,1.5,0.2,2.3,0.3C47,3.5,46.1,6.1,44,8.1c2.7,2.9,2.8,3,4,6.5C48,15.1,48,15.6,48,16.1z"/>
	<path class="xsvg-elem xsvg-elem_filled" d="M36.6,45.7c-0.2-1.6-1.1-2.5-2.4-2.5c-1.4,0-2.2,0.8-2.5,2.4c-6.3,0-12.7,0-19.1,0c-0.1-0.8-0.3-1.6-1.1-2
		c-0.4-0.2-1-0.4-1.5-0.4c-1.2,0-2,0.8-2.4,2.4c-0.6,0-1.3,0-1.9,0c-0.5,0-0.7-0.4-0.7-0.8c0-0.8,0-1.6,0-2.4c0-0.6,0.3-0.9,1-0.9
		c3.7,0,7.3,0,11,0c0.2,0,0.4,0,0.7,0c0-1,0-2,0-3c-0.2,0-0.4,0-0.6,0c-5.3,0-10.7,0-16,0c-1,0-1.2-0.2-1.2-1.2c0-0.2,0-0.5,0-0.7
		c0-0.9,0.2-1.1,1.1-1.1c3.5,0,6.9,0,10.4,0c10.5,0,21.1,0,31.6,0c1.1,0,1.3,0.2,1.3,1.3c0,0.2,0,0.4,0,0.6c0,1-0.2,1.2-1.2,1.2
		c-5.3,0-10.5,0-15.8,0c-0.3,0-0.5,0-0.8,0c0,1,0,2,0,3c0.2,0,0.3,0,0.5,0c3.6,0,7.3,0,10.9,0c1.1,0,1.3,0.2,1.3,1.3
		c0,0.6,0,1.3,0,1.9c0,0.7-0.3,1-1,1C37.8,45.7,37.2,45.7,36.6,45.7z"/>
	<path class="xsvg-elem xsvg-elem_filled" d="M26.6,28.9c0,0.4,0,0.8,0,1.3c-1.4,0-2.7,0-4.2,0c0.4-0.4,0.2-0.6-0.2-0.9c-0.2-0.2-0.5-0.3-0.7-0.5
		c-0.5-0.4-1-0.6-0.9-1.4c0-0.3-0.3-0.7-0.6-1c-0.5-0.6-1.2-1.2-1.7-1.8c-0.2-0.3-0.3-0.6-0.3-1c0-0.7,0-1.4,0-2.2
		c-0.6,0.4-1,1-0.7,1.7c0.3,0.8,0.7,1.5,1.2,2.2c0.4,0.6,1,1,1.5,1.5c0.5,0.5,0.5,1.2,0.1,1.7c-0.4,0.5-1.2,0.7-1.7,0.3
		c-1.5-1.3-2.9-2.7-3.5-4.6c-0.5-1.6-0.2-3,0.9-4.3c0.8-0.9,1.9-1.5,3.1-1.9c0.4-0.1,0.7-0.1,1.1,0.2c1.5,1.1,3.3,1.1,4.8,0
		c0.2-0.2,0.6-0.3,0.8-0.2c1.9,0.3,3.9,2.2,4.3,4c0.2,1,0,2-0.4,3c-0.7,1.5-1.9,2.7-3.2,3.8c-0.5,0.4-1.3,0.3-1.7-0.1
		c-0.5-0.5-0.5-1.3,0.1-1.8c0.6-0.6,1.2-1.1,1.7-1.8c0.4-0.5,0.7-1.1,0.9-1.6c0.3-0.7,0.1-1.4-0.6-2c0,0.6-0.1,1.1,0,1.5
		c0.1,1-0.3,1.8-1,2.5c-0.4,0.4-0.7,0.7-1.1,1.1c-0.7,0.7-0.8,1.5-0.3,2.2c0.5,0.7,1.3,0.8,2.2,0.4C26.4,29,26.5,29,26.6,28.9z"/>
	<path class="xsvg-elem xsvg-elem_filled" d="M32.3,5c2,0.1,3.8,0.7,5.6,1.6c3.2,1.7,6,3.9,8,7.1c0.6,0.9,1,1.9,1,3c0,1.4-0.8,2.4-2.2,2.6c-1.3,0.2-2.5,0-3.6-0.3
		c-4.4-1.4-8-4-10.6-7.8c-0.6-0.8-1-1.7-1.2-2.7c-0.6-2,0.5-3.4,2.6-3.5C31.9,4.9,32.1,5,32.3,5z M37.9,8.1c-0.8,0-1.1,0.5-0.8,1.1
		c0.4,0.7,0.9,1.3,1.5,1.8c0.7,0.6,1.5,1,2.4,1c0.7,0,1-0.4,0.8-1.1C41.4,9.6,39.3,8.1,37.9,8.1z M34.9,12.3c-0.8,0-1.2,0.5-0.8,1.2
		c0.8,1.5,2.1,2.4,3.8,2.7c0.7,0.1,1.1-0.4,0.9-1.1C38.4,13.8,36.3,12.3,34.9,12.3z M34.5,10.7c1,0,1.4-0.5,1-1.2
		c-0.8-1.5-2.1-2.4-3.8-2.7C31,6.7,30.6,7.3,31,8C31.7,9.6,33.1,10.4,34.5,10.7z M44.1,17.5c0.8,0,1.2-0.5,0.8-1.2
		c-0.8-1.5-2.1-2.4-3.8-2.7c-0.8-0.1-1.1,0.4-0.9,1.2C40.7,15.9,42.8,17.4,44.1,17.5z"/>
	<path class="xsvg-elem xsvg-elem_filled" d="M23.1,30.7c2-0.2,4.1-0.4,6.2-0.6c0.8-0.1,1.6,0.1,2.2,0.5c0.9,0.5,1.2,1.3,1,2.3c-0.1,0.7-0.5,1.4-1,1.9
		c-0.2,0.1-0.4,0.3-0.6,0.3c-3.9,0-7.8,0-11.7,0c-0.6,0-0.7-0.4-0.9-0.7c-0.1-0.3-0.4-0.4-0.7-0.5c-3.6-0.3-7.2,0-10.8,0.9
		c-1.2,0.3-2.3-0.3-2.6-1.4C4,32.3,4.7,31.3,5.9,31c3.6-0.9,7.2-1.3,10.9-1.2c0.5,0,0.9,0.1,1.5,0.1c-0.1,0.1-0.1,0.2-0.2,0.3
		c-0.6,0.9-0.3,2,0.7,2.3c1.5,0.5,3,1,4.6,1.4c2,0.4,4.1,0.5,6.2,0.2c1-0.2,1.6-0.9,1.5-1.8c-0.2-1-1-1.5-2-1.3
		C27.1,31.4,25.1,31.2,23.1,30.7C23.1,30.7,23.1,30.7,23.1,30.7z"/>
	<path class="xsvg-elem xsvg-elem_filled" d="M36.8,27.8c2,0,3.6,1.6,3.6,3.6c0,2-1.7,3.6-3.7,3.6c-1.9,0-3.6-1.7-3.5-3.7C33.2,29.4,34.8,27.8,36.8,27.8z"/>
	<path class="xsvg-elem xsvg-elem_filled" d="M18.8,13c0.1-0.8,0.3-1.6,0.4-2.4c0.2-1.1,0.8-1.7,1.9-1.9c1.1-0.2,2.1-0.2,3.1,0.2c0.5,0.2,0.9,0.5,1,1.1
		c0.2,1.1,0.4,2.3,0.5,3.4c0,0.1-0.1,0.3-0.2,0.4c-1.1,0.3-2.2,0.7-3.3,0.7c-0.9,0-1.8-0.3-2.7-0.5C19,13.9,18.6,13.7,18.8,13z"/>
	<path class="xsvg-elem xsvg-elem_filled" d="M27,34.1c-2.8-0.1-5.4-0.6-7.9-1.7c-0.8-0.3-1.2-1-0.9-1.8c0.3-0.7,1-1,1.9-0.6c2.6,1.1,5.4,1.5,8.2,1.3
		c0.4,0,0.8-0.1,1.1-0.1c0.7,0,1.3,0.4,1.3,1.1c0.1,0.7-0.3,1.3-1,1.4C28.9,34,27.9,34,27,34.1z"/>
	<path class="xsvg-elem xsvg-elem_filled" d="M23.8,17c-0.2,0-0.5-0.1-0.7-0.1c-0.5,0-0.9,0-1.4,0c-0.3,0-0.6-0.3-0.9,0.2c0,0-0.2,0-0.3,0c-0.3-0.1-0.6-0.3-0.8-0.4
		c-1.1-0.6-1.3-1.3-0.9-2.6c2.3,1.1,4.6,1.1,7-0.1c0,0.8-0.1,1.4-0.1,1.9c0,0.1-0.2,0.3-0.3,0.4c-0.6,0.3-1.1,0.6-1.7,0.9
		C23.8,17.2,23.8,17.1,23.8,17z"/>
	<path class="xsvg-elem xsvg-elem_filled" d="M36.3,45.7c0,1.2-1,2.1-2.2,2.1c-1.2,0-2.1-1-2-2.2c0-1.1,1-2.1,2.1-2.1C35.4,43.5,36.3,44.5,36.3,45.7z"/>
	<path class="xsvg-elem xsvg-elem_filled" d="M8.1,45.6c0-1.1,0.9-2.1,2.1-2.1c1.2,0,2.2,1,2.2,2.1c0,1.2-1,2.1-2.1,2.1C9,47.7,8.1,46.8,8.1,45.6z"/>
	<path class="xsvg-elem xsvg-elem_filled" d="M16.3,46c1.2,0,2.4,0,3.6,0c0.1,0,0.1,0,0.2,0c-0.2,0.9-0.9,1.5-1.9,1.5C17.3,47.5,16.5,46.9,16.3,46z"/>
	<path class="xsvg-elem xsvg-elem_filled" d="M24.5,46c1.2,0,2.5,0,3.7,0c-0.2,1-1,1.6-2,1.5C25.4,47.5,24.6,46.9,24.5,46z"/>
	<path class="xsvg-elem xsvg-elem_filled" d="M18,29.7c0-0.3,0-0.5,0-0.8c0.8,0.5,1.5,0.6,2.2-0.1c0.6,0.5,1.2,0.9,1.8,1.3c0,0,0,0.1,0,0.1c-0.4-0.1-0.9-0.1-1.3-0.3
		c-0.6-0.2-1.3-0.5-2-0.3C18.5,29.8,18.2,29.7,18,29.7z"/>
	<path class="xsvg-elem xsvg-elem_filled" d="M27.9,41.2c-0.4,0-0.7,0-1,0c0-0.8,0-1.5,0-2.3c0.3,0,0.5,0,0.8,0C27.7,39.6,27.8,40.4,27.9,41.2z"/>
	<path class="xsvg-elem xsvg-elem_filled" d="M17.6,38.9c0,0.8,0,1.5,0,2.3c-0.3,0-0.6,0-0.9,0c0.1-0.8,0.2-1.5,0.3-2.3C17.2,38.9,17.4,38.9,17.6,38.9z"/>
	<path class="xsvg-elem xsvg-elem_filled" d="M19.2,16.7c0.3,0.1,0.5,0.3,0.8,0.4c0.3,0.1,0.5,0.2,0.8,0.4c-0.1,0.2-0.2,0.4-0.3,0.8c-0.5-0.5-1-1-1.4-1.5
		C19.1,16.8,19.2,16.8,19.2,16.7z"/>
	<path class="xsvg-elem xsvg-elem_filled" d="M25.5,16.9c-0.4,0.5-0.9,0.9-1.4,1.4c-0.4-0.7-0.4-0.7,0.2-1c0.2-0.1,0.4-0.2,0.5-0.3c0.2-0.1,0.3-0.2,0.5-0.3
		C25.4,16.8,25.5,16.8,25.5,16.9z"/>
	<path class="xsvg-elem xsvg-elem_filled" d="M18.3,35.1c-0.3,0-0.6,0-1,0c0-0.3,0-0.5,0-0.8C18,34.2,18.1,34.3,18.3,35.1z"/>
</g>`;
	let epaisseur;
	return new ContenusSVG(contenu, viewBoxContains, epaisseur);
}


	public static classementDoc(): ContenusSVG {
		let viewBoxContains = `0 0 48 48`;

		let contenu = `
		<g id="classeur">
			<path class="xsvg-elem xsvg-elem_filled" d="M47.8,34.1l-4.4,8.3c-0.2,0.4-0.8,0.9-1.3,0.9l-17.7,0c-0.4,0-0.7-0.1-1-0.4c-0.3-0.3-0.4-0.6-0.4-1l0-13.7
				c0-0.8,0.6-1.4,1.4-1.4l1.3,0v1.2h-0.9c-0.2,0-0.3,0.1-0.5,0.2c-0.1,0.1-0.2,0.3-0.2,0.5l0,12.9c0,0.4,0.3,0.6,0.6,0.6h0.9l4.2-8.4
				c0.2-0.5,0.7-0.9,1.2-0.9h10.2l0-3.4c0.7,0.1,1.2,0.6,1.2,1.3v2.1h4.7C47.8,32.8,48.3,33.3,47.8,34.1z M26.6,37.8
				c0-4.2,0-16.8,0-16.8c0-0.6,0.5-1.2,1.2-1.2H37c0.1,0,0.3,0.1,0.4,0.2l3,3.2c0.1,0.1,0.1,0.2,0.1,0.4V32h-1v-7.7
				c0-0.1-0.1-0.2-0.2-0.2H37c-0.3,0-0.5-0.2-0.5-0.5V21c0-0.1-0.1-0.2-0.2-0.2h-8.5c-0.1,0-0.2,0.1-0.2,0.2v15.8l-0.7,1.5
				C26.8,38.3,26.6,38.2,26.6,37.8z M37.5,23.1h1.4l-1.4-1.6V23.1L37.5,23.1z M38,25.1h-8.9c-0.3,0-0.6,0.3-0.6,0.6
				c0,0.3,0.3,0.6,0.6,0.6H38c0.3,0,0.6-0.3,0.6-0.6C38.6,25.3,38.3,25.1,38,25.1z M38.6,29.2c0-0.3-0.3-0.6-0.6-0.6h-8.9
				c-0.3,0-0.6,0.3-0.6,0.6c0,0.3,0.3,0.6,0.6,0.6H38C38.3,29.7,38.6,29.5,38.6,29.2z M28.5,32.6c0,0.3,0.3,0.6,0.6,0.6h0.2
				c0.4-1.1,1.3-1.2,1.3-1.2h-1.5C28.7,32.1,28.5,32.3,28.5,32.6z"/>
		</g>
		<g id="feuille">
			<path class="xsvg-elem xsvg-elem_filled" d="M15.4,21.6l-4-2.8c-0.1-0.1-0.3-0.1-0.5-0.1L1,20.9c-0.7,0.2-1.1,0.8-1,1.5l3.8,17.4c0.2,0.7,0.8,1.1,1.5,1
				c0,0,2-0.4,4.6-1v0l7.9-1.7c0.7-0.1,1.1-0.8,1-1.5l-3.2-14.6C15.6,21.8,15.6,21.7,15.4,21.6z M11.9,20.4l1.9,1.3l-1.6,0.3
				L11.9,20.4z M17.8,36.7c0,0.1,0,0.2-0.2,0.2l-6.9,1.5l0,0l-5.7,1.2c-0.1,0-0.2,0-0.2-0.2L1.1,22.2c0-0.1,0-0.2,0.2-0.2l9.2-2
				c0.1,0,0.3,0.1,0.3,0.2l0.6,2.8c0.1,0.3,0.3,0.5,0.6,0.4l2.5-0.5c0.1,0,0.3,0.1,0.3,0.2L17.8,36.7z"/>
			<path class="xsvg-elem xsvg-elem_filled" d="M13.3,24.1l-9.6,2.1c-0.4,0.1-0.6,0.4-0.5,0.8c0.1,0.4,0.4,0.6,0.8,0.5l9.6-2.1c0.4-0.1,0.6-0.4,0.5-0.8
				C14,24.3,13.7,24,13.3,24.1z"/>
			<path class="xsvg-elem xsvg-elem_filled" d="M14.9,28.4c-0.1-0.4-0.4-0.6-0.8-0.5L4.5,30C4.2,30,3.9,30.4,4,30.8c0.1,0.4,0.4,0.6,0.8,0.5l9.6-2.1
				C14.8,29.1,15,28.7,14.9,28.4z"/>
			<path class="xsvg-elem xsvg-elem_filled" d="M15.8,32.1c-0.1-0.4-0.4-0.6-0.8-0.5l-9.6,2.1c-0.4,0.1-0.6,0.4-0.5,0.8c0.1,0.4,0.4,0.6,0.8,0.5l9.6-2.1
				C15.6,32.8,15.8,32.5,15.8,32.1z"/>
		</g>
		<g id="fleche">
			<path class="xsvg-elem xsvg-elem_filled" d="M31.4,11.3c-1.7-5.1-7.3-7.8-12.5-6.1c-5.2,1.7-8.1,7.3-6.4,12.4c-1.2-3.6,0.8-7.6,4.6-8.8
				c3.7-1.2,7.7,0.7,8.9,4.4l0.4,1.3l-2.7,0.9l7.1,3.5l3.6-7.1l-2.7,0.9L31.4,11.3z"/>
		</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	}


	public static consultationDossier(): ContenusSVG {
		let viewBoxContains = `0 0 48 48`;

		let contenu = `
		<g>
			<path class="xsvg-elem xsvg-elem_filled" d="M45.4,12.9H18.2L16,7.4H2.6C1.2,7.4,0,8.5,0,10v30.3c0,1.5,1.2,2.6,2.6,2.6H10l4.9-8.4c0,0,0,0,0,0l0-0.1
				c-1-1.1-1.8-2.4-2.2-4c-1.3-4.9,1.6-9.9,6.6-11.2c4.9-1.3,9.9,1.6,11.2,6.6c1.3,4.9-1.6,9.9-6.6,11.2c-1.5,0.4-3,0.4-4.5,0
				l-3.4,5.9h29.3c1.5,0,2.6-1.2,2.6-2.6V15.5C48,14.1,46.8,12.9,45.4,12.9z"/>
			<path class="xsvg-elem xsvg-elem_filled" d="M23.3,34.2c3.4-0.9,5.5-4.4,4.6-7.8C27,23,23.5,21,20.1,21.9c-3.4,0.9-5.5,4.4-4.6,7.8
				C16.4,33.1,19.9,35.1,23.3,34.2z"/>
		</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	}


	public static consultationPatient(): ContenusSVG {
		let viewBoxContains = `0 0 48 48`;

		let contenu = `
		<g>
			<circle  class="xsvg-elem xsvg-elem_filled" cx="20.4" cy="33.4" r="5.7"/>
		</g>
		<g>
			<path  class="xsvg-elem xsvg-elem_filled" d="M44.3,31.6c-2-6-7-10.2-12.3-12.1c2.5-2,4.1-5.1,4.1-8.5C35.5,0.5,26.1,0,24.6,0C23.1,0,13.7,0.5,13,11
				c0,3.4,1.6,6.5,4.1,8.5c-5.3,1.9-10.3,6-12.3,12.1c-1.4,4.3-1.8,10,3,10.9c0.8,1,1.9,1.8,3.1,2.5l3.5-5.9c0,0,0,0,0,0l0-0.1
				c-0.9-1-1.6-2.2-2-3.6c-1.2-4.4,1.5-8.9,5.9-10.1c4.4-1.2,8.9,1.5,10.1,5.9c1.2,4.4-1.5,8.9-5.9,10.1c-1.4,0.4-2.7,0.4-4,0
				l-3.1,5.4c4.5,1.3,9.1,1.2,9.3,1.2c0.3,0,12.2,0.1,16.8-5.5C46.1,41.6,45.8,35.9,44.3,31.6z"/>
		</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	}


	public static delegues(): ContenusSVG {
		let viewBoxContains = `0 0 48 48`;

		let contenu = `
		<path id="personnage2" class="xsvg-elem xsvg-elem_filled" d="M20,20.3c-1.1-0.9-2.3-1.5-3.6-2c1.5-1.2,2.5-3.1,2.5-5.1c0-3.6-3-6.6-6.7-6.6c-3.7,0-6.7,3-6.7,6.6
			c0,2.1,1,3.9,2.5,5.1C7,18.7,0.8,21.3,0,28.8c-0.1,2.2,1.2,2.7,1.2,2.7s0.5,0.5,1.3,0.7c0.2,0.5,0.5,1,0.8,1.3v0
			c0,0,0.6,1.5,6.2,1.9c0-0.1,0-0.1,0-0.2C10.6,26,17,21.8,20,20.3z"/>
		<path id="personnage1" class="xsvg-elem xsvg-elem_filled" d="M47.2,31.2c-1.8-5.4-6.2-9.1-10.9-10.7c2.2-1.8,3.7-4.5,3.7-7.6c0-5.4-4.5-9.8-10-9.8s-10,4.4-10,9.8
			c0,3.1,1.5,5.8,3.7,7.6C22.3,21.1,13.2,25,12,35.9c-0.1,3.3,1.8,4,1.8,4v0c0,0,0.8,0.7,2,1c0.3,0.8,0.7,1.4,1.2,1.9v0
			c0,0,0.9,2.4,9.9,2.8c0.1,0,0.3,0,0.4,0.1h2.2c0.3,0,0.6,0,0.9,0H33c0.2,0,0.4-0.1,0.7-0.1c9.3-0.6,10.3-3.5,10.3-3.5v0
			c0.2-0.4,0.4-0.8,0.6-1.2C48.8,40.1,48.4,35.1,47.2,31.2z"/>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	}


	public static dispensation(): ContenusSVG {
		let viewBoxContains = `0 0 48 48`;

		let contenu = `
		<g>
			<path id="croix" class="xsvg-elem xsvg-elem_filled" d="M15.3,22.6H10v3.5H6.5v5.2H10v3.5h5.3v-3.5h3.6v-5.2h-3.6V22.6z"/>
			<path id="bouteilleetpilules" class="xsvg-elem xsvg-elem_filled" d="M44.8,35.2l-11-2.3c-0.4-0.1-0.9-0.1-1.3-0.1l-1.5-4.5c-0.7-2.1-3-3.2-5.1-2.5
				c-0.2,0.1-0.4,0.2-0.6,0.2v-7.4c0-3.2-2.4-5.9-5.6-6.3V8.6h1.5V3H4.1v5.6h1.5v3.7C2.4,12.7,0,15.4,0,18.6v20C0,42.1,2.9,45,6.5,45
				h12.4c3.6,0,6.5-2.8,6.5-6.3v-1.8l1.5,4.5c0.7,2.1,3,3.2,5.1,2.5c1.3-0.4,2.2-1.4,2.6-2.6l8.4,1.8c2.2,0.5,4.4-0.9,4.8-3
				C48.4,37.8,47,35.7,44.8,35.2L44.8,35.2z M22.8,38.6c0,2.1-1.7,3.8-3.9,3.8H6.5c-2.1,0-3.9-1.7-3.9-3.8v-20c0-2.1,1.7-3.8,3.9-3.8
				h0.4c0.7,0,1.3-0.6,1.3-1.3V9.9h9v3.6c0,0.7,0.6,1.3,1.3,1.3h0.4c2.1,0,3.9,1.7,3.9,3.8L22.8,38.6L22.8,38.6z M31.6,42.7
				c-1.5,0.5-3.1-0.3-3.6-1.8l-1.8-5.2l5.4-1.8l1.8,5.2C33.9,40.6,33.1,42.2,31.6,42.7L31.6,42.7z M37.8,40.6l-3-0.7
				c0-0.4-0.1-0.8-0.2-1.2L33,34c0.2,0,0.4,0,0.6,0.1l5.5,1.2L37.8,40.6L37.8,40.6z"/>
		</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	}


	public static donSang(): ContenusSVG {
		let viewBoxContains = `0 0 48 48`;

		let contenu = `
		<path id="reflet" class="xsvg-elem xsvg-elem_filled xsvg-transparent" d="M19.9,42.8c-1.8,0.2-5.3-0.9-7.2-5.8c-2.3-6,1.5-15,3.9-18.9C14.1,26.9,16.7,34.9,21,38
			C23.4,39.7,22,42.5,19.9,42.8z"/>
		<path id="goutte" class="xsvg-elem xsvg-elem_filled" d="M39.1,25.6C36.3,16.8,25.3,1.7,24,0C22.7,1.7,11.7,16.8,8.9,25.6c-0.8,1.9-1.2,4-1.2,6.1C7.7,40.7,15,48,24,48
			s16.3-7.3,16.3-16.3C40.3,29.5,39.9,27.5,39.1,25.6z M19.9,42.8c-1.8,0.2-5.3-0.9-7.2-5.8c-2.3-6,1.5-15,3.9-18.9
			C14.1,26.9,16.7,34.9,21,38C23.4,39.7,22,42.5,19.9,42.8z"/>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	}


	public static dossierConsult(): ContenusSVG {
		let viewBoxContains = `0 0 48 48`;

		let contenu = `
		<g>
			<path id="classeur" class="xsvg-elem xsvg-elem_filled" d="M46.5,26.6h-9v-4c0-1.3-1-2.4-2.3-2.5l0,6.5H15.5c-0.9,0-1.8,0.7-2.2,1.6l-8,16.3H3.5
				c-0.7,0-1.2-0.5-1.2-1.2l0-24.8c0-0.3,0.1-0.6,0.4-0.9c0.2-0.2,0.5-0.4,0.9-0.4h1.7V15l-2.5,0C1.2,15,0,16.2,0,17.7l0,26.4
				c0,0.7,0.3,1.4,0.8,1.9c0.5,0.5,1.2,0.8,1.9,0.8l34,0c0.9,0,2.1-0.8,2.5-1.6l8.5-16.1C48.5,27.7,47.6,26.6,46.5,26.6z"/>
			<g id="feuille">
				<path class="xsvg-elem xsvg-elem_filled" d="M7.2,37.2l1.4-2.9V3.9c0-0.2,0.2-0.4,0.4-0.4h16.4c0.3,0,0.5,0.2,0.5,0.5V9c0,0.5,0.4,0.9,0.9,0.9h4.4
					c0.3,0,0.5,0.2,0.5,0.5v14.8h1.9V9c0-0.3-0.1-0.5-0.3-0.7L27.5,2c-0.2-0.2-0.5-0.3-0.7-0.3H9c-1.2,0-2.2,1-2.2,2.2
					c0,0-0.1,24.3,0,32.4C6.8,37.1,7.2,37.2,7.2,37.2z M27.7,5l2.8,3h-2.8V5z"/>
				<path class="xsvg-elem xsvg-elem_filled" d="M29.9,19.6c0-0.6-0.5-1.1-1.1-1.1H11.6c-0.6,0-1.1,0.5-1.1,1.1c0,0.6,0.5,1.1,1.1,1.1h17.2
					C29.4,20.8,29.9,20.3,29.9,19.6z"/>
				<path class="xsvg-elem xsvg-elem_filled" d="M10.4,26.4c0,0.6,0.5,1.1,1.1,1.1H12c0.7-2,2.5-2.3,2.5-2.3h-2.9C10.9,25.2,10.4,25.7,10.4,26.4z"/>
				<path class="xsvg-elem xsvg-elem_filled" d="M28.8,11.8H11.6c-0.6,0-1.1,0.5-1.1,1.1c0,0.6,0.5,1.1,1.1,1.1h17.2c0.6,0,1.1-0.5,1.1-1.1
					C29.9,12.3,29.4,11.8,28.8,11.8z"/>
			</g>
		</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	}


	public static gestionBloc(): ContenusSVG {
		let viewBoxContains = `0 0 48 48`;

		let contenu = `
		<g>
			<g id="anneaux">
				<path class="xsvg-elem xsvg-elem_filled" d="M13.4,7.7c0,0.8-0.6,1.4-1.4,1.4l0,0c-0.8,0-1.4-0.6-1.4-1.4V1.4c0-0.8,0.6-1.4,1.4-1.4l0,0c0.8,0,1.4,0.6,1.4,1.4V7.7z"
					/>
				<path class="xsvg-elem xsvg-elem_filled" d="M25.4,7.7c0,0.8-0.6,1.4-1.4,1.4l0,0c-0.8,0-1.4-0.6-1.4-1.4V1.4C22.6,0.6,23.3,0,24,0l0,0c0.8,0,1.4,0.6,1.4,1.4V7.7z"/>
				<path class="xsvg-elem xsvg-elem_filled" d="M37.3,7.7c0,0.8-0.6,1.4-1.4,1.4l0,0c-0.8,0-1.4-0.6-1.4-1.4V1.4C34.6,0.6,35.2,0,36,0l0,0c0.8,0,1.4,0.6,1.4,1.4V7.7z"/>
			</g>
			<path id="calendrier_1_" class="xsvg-elem xsvg-elem_filled" d="M43.3,4.6h-4.9V8c0,1.4-1.1,2.5-2.5,2.5c-1.4,0-2.5-1.1-2.5-2.5V4.6h-7V8c0,1.4-1.1,2.5-2.4,2.5
				c-1.4,0-2.5-1.1-2.5-2.5V4.6h-7V8c0,1.4-1.1,2.5-2.5,2.5c-1.4,0-2.5-1.1-2.5-2.5V4.6H4.7c-2.5,0-4.6,2.1-4.6,4.6v34.2
				c0,2.5,2.1,4.6,4.6,4.6h38.6c2.5,0,4.6-2.1,4.6-4.6V9.2C47.9,6.6,45.9,4.6,43.3,4.6z M45.9,41.9c0,2.3-1.9,4.1-4.2,4.1H6.3
				c-2.3,0-4.2-1.8-4.2-4.1V16.7h43.8V41.9z"/>
			<path id="date1" class="xsvg-elem xsvg-elem_filled" d="M22.9,24.9c0,0.2-0.2,0.4-0.4,0.4h-7c-0.2,0-0.4-0.2-0.4-0.4v-4.6c0-0.2,0.2-0.4,0.4-0.4h7
				c0.2,0,0.4,0.2,0.4,0.4V24.9z"/>
			<path id="date2" class="xsvg-elem xsvg-elem_filled" d="M32.9,24.9c0,0.2-0.2,0.4-0.4,0.4h-7c-0.2,0-0.4-0.2-0.4-0.4v-4.6c0-0.2,0.2-0.4,0.4-0.4h7
				c0.2,0,0.4,0.2,0.4,0.4V24.9z"/>
			<path id="date3" class="xsvg-elem xsvg-elem_filled" d="M42.9,24.9c0,0.2-0.2,0.4-0.4,0.4h-7c-0.2,0-0.4-0.2-0.4-0.4v-4.6c0-0.2,0.2-0.4,0.4-0.4h7
				c0.2,0,0.4,0.2,0.4,0.4V24.9z"/>
			<path id="date4" class="xsvg-elem xsvg-elem_filled" d="M12.8,33.7c0,0.2-0.2,0.4-0.4,0.4h-7c-0.2,0-0.4-0.2-0.4-0.4v-4.6c0-0.2,0.2-0.4,0.4-0.4h7
				c0.2,0,0.4,0.2,0.4,0.4V33.7z"/>
			<path id="date5" class="xsvg-elem xsvg-elem_filled" d="M22.9,33.7c0,0.2-0.2,0.4-0.4,0.4h-7c-0.2,0-0.4-0.2-0.4-0.4v-4.6c0-0.2,0.2-0.4,0.4-0.4h7
				c0.2,0,0.4,0.2,0.4,0.4V33.7z"/>
			<path id="date6" class="xsvg-elem xsvg-elem_filled" d="M32.9,33.7c0,0.2-0.2,0.4-0.4,0.4h-7c-0.2,0-0.4-0.2-0.4-0.4v-4.6c0-0.2,0.2-0.4,0.4-0.4h7
				c0.2,0,0.4,0.2,0.4,0.4V33.7z"/>
			<path id="date7" class="xsvg-elem xsvg-elem_filled" d="M42.9,33.7c0,0.2-0.2,0.4-0.4,0.4h-7c-0.2,0-0.4-0.2-0.4-0.4v-4.6c0-0.2,0.2-0.4,0.4-0.4h7
				c0.2,0,0.4,0.2,0.4,0.4V33.7z"/>
			<path id="date8" class="xsvg-elem xsvg-elem_filled" d="M12.8,42.4c0,0.2-0.2,0.4-0.4,0.4h-7c-0.2,0-0.4-0.2-0.4-0.4v-4.6c0-0.2,0.2-0.4,0.4-0.4h7
				c0.2,0,0.4,0.2,0.4,0.4V42.4z"/>
			<path id="date9" class="xsvg-elem xsvg-elem_filled" d="M22.9,42.4c0,0.2-0.2,0.4-0.4,0.4h-7c-0.2,0-0.4-0.2-0.4-0.4v-4.6c0-0.2,0.2-0.4,0.4-0.4h7
				c0.2,0,0.4,0.2,0.4,0.4V42.4z"/>
		</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	}

	public static GestionIncoherences(): ContenusSVG
	{
		let viewBoxContains = `0 0 47.31 31.89`;
		let contenu = `
			<g>
				<polyline class="xsvg-elem xsvg-elem_stroked" points="45.31 2 16.82 29.89 2 15.6"/>
			</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};

	public static InstallElive(): ContenusSVG
	{
		let viewBoxContains = `0 0 48 48`;
		let contenu = `
			<g>
				<g>
					<g>
						<path class="xsvg-elem xsvg-elem_filled" d="M22,11.6c-5.6,8.9-11.5,14.6-16.2,14.6c-3.9,0-5.8-2.6-5.8-6.4C0,12.6,6.3,5,13.2,5c1.9,0,3,1,3,2.8
							c0,2.8-4.6,7.6-9.2,7.2c-1.2,2.6-2.1,5.2-2.1,7.2c0,1.2,0.4,2.1,1.6,2.1c4.2,0,10.1-6.1,14.9-14.7C22,9.9,22.6,10.7,22,11.6z
							 M7.8,13.5c3.8-0.2,6.9-4.1,6.9-5.7c0-0.6-0.2-0.8-0.8-0.8C12.2,7,9.7,9.9,7.8,13.5z"/>
					</g>
					<g>
						<g>
							<path class="xsvg-elem xsvg-elem_filled" d="M14.5,25.4V15h2.4v10.4H14.5z"/>
							<path class="xsvg-elem xsvg-elem_filled" d="M17.9,15.9c0-0.8,0.6-1.3,1.4-1.3c0.8,0,1.4,0.6,1.4,1.3c0,0.8-0.6,1.3-1.4,1.3C18.5,17.2,17.9,16.6,17.9,15.9z
								 M18.1,25.4v-7.1h2.4v7.1H18.1z"/>
							<path class="xsvg-elem xsvg-elem_filled" d="M24,25.4l-3.1-7.1h2.5l1.7,4.1l1.7-4.1h2.5l-3.1,7.1H24z"/>
							<path class="xsvg-elem xsvg-elem_filled" d="M36.3,22.5L36.3,22.5l-5,0c0.2,0.6,0.7,1.1,1.6,1.1c0.5,0,0.9-0.2,1.1-0.5h2.3c-0.3,1.5-1.7,2.4-3.5,2.4
								c-2.3,0-3.9-1.6-3.9-3.7c0-2.2,1.5-3.7,3.8-3.7c2.1,0,3.6,1.4,3.6,3.6C36.3,22,36.3,22.2,36.3,22.5z M31.2,21.2h2.9
								C34,20.4,33.5,20,32.7,20C31.9,20,31.4,20.4,31.2,21.2z"/>
						</g>
					</g>
				</g>
				<g>
					<path class="xsvg-elem xsvg-elem_filled" d="M46.1,35.5l1.9-1.2l-0.8-3.7l-2.2-0.3l-0.5-0.7l0.3-2.2l-3.4-1.6l-1.6,1.6h-0.9l-1.6-1.6l-3.4,1.6l0.3,2.2l-0.5,0.7
						l-2.2,0.3l-0.8,3.7l1.9,1.2l0.2,0.9l-1.2,1.9l2.3,2.9l2.1-0.7l0.8,0.4l0.7,2.1h3.8l0.7-2.1l0.8-0.4l2.1,0.7l2.3-2.9l-1.2-1.9
						L46.1,35.5z M39.2,38.6c-2.3,0-4.2-1.9-4.2-4.2s1.9-4.2,4.2-4.2c2.3,0,4.2,1.9,4.2,4.2l0,0C43.4,36.7,41.5,38.6,39.2,38.6
						L39.2,38.6L39.2,38.6z"/>
					<path class="xsvg-elem xsvg-elem_filled" d="M39.2,32.4c-1.1,0-2,0.9-2,2s0.9,2,2,2c1.1,0,2-0.9,2-2S40.3,32.4,39.2,32.4L39.2,32.4z"/>
				</g>
			</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	};


	public static internet(): ContenusSVG {
		let viewBoxContains = `0 0 48 48`;

		let contenu = `
		<g>
			<path id="loupe" class="xsvg-elem xsvg-elem_filled" d="M47.2,14.5c-2-4.4-7.2-6.4-11.6-4.4c-4.4,2-6.4,7.2-4.4,11.6c0.6,1.4,1.5,2.5,2.6,3.3l-3.8,10.1
				c-0.5,1.3,0.2,2.7,1.5,3.2c1.3,0.5,2.7-0.2,3.2-1.5l3.8-10.1c1.4,0.1,2.9-0.1,4.3-0.8C47.3,24.1,49.2,18.9,47.2,14.5z M41.7,23.7
				c-3.1,1.4-6.7,0-8.1-3c-1.4-3.1,0-6.7,3-8.1c3.1-1.4,6.7,0,8.1,3C46.2,18.7,44.8,22.3,41.7,23.7z"/>
			<g id="terre">
				<g id="Core" transform="translate(-296.000000, -296.000000)">
					<g id="language" transform="translate(296.000000, 296.000000)">
						<path id="Shape" class="xsvg-elem xsvg-elem_filled" d="M14.4,9.9C6.5,9.9,0,16.3,0,24.2c0,7.9,6.5,14.4,14.4,14.4c7.9,0,14.4-6.5,14.4-14.4
							C28.8,16.3,22.3,9.9,14.4,9.9L14.4,9.9z M24.3,18.5h-4.2c-0.4-1.9-1.2-3.5-2-5.2C20.7,14.3,23,16,24.3,18.5L24.3,18.5z
							 M14.4,12.7c1.1,1.7,2.2,3.6,2.7,5.8h-5.5C12.2,16.5,13.2,14.5,14.4,12.7L14.4,12.7z M3.3,27.1c-0.3-0.9-0.4-1.9-0.4-2.9
							c0-1,0.1-2,0.4-2.9h4.9c-0.1,1-0.1,1.9-0.1,2.9c0,1,0.1,1.9,0.1,2.9H3.3L3.3,27.1z M4.5,30h4.2c0.4,1.9,1.1,3.5,2,5.2
							C8.1,34.2,5.8,32.4,4.5,30L4.5,30z M8.6,18.5H4.5c1.4-2.4,3.6-4.2,6.2-5.2C9.8,15,9.1,16.6,8.6,18.5L8.6,18.5z M14.4,35.8
							c-1.2-1.7-2.2-3.6-2.7-5.8h5.5C16.5,32,15.5,34,14.4,35.8L14.4,35.8z M17.7,27.1h-6.6c-0.1-1-0.3-1.9-0.3-2.9
							c0-1,0.1-1.9,0.3-2.9h6.8c0.1,1,0.3,1.9,0.3,2.9C18.1,25.2,17.8,26.1,17.7,27.1L17.7,27.1z M18.1,35.2c0.9-1.6,1.6-3.3,2-5.2
							h4.2C23,32.4,20.7,34.2,18.1,35.2L18.1,35.2z M20.7,27.1c0.1-1,0.1-1.9,0.1-2.9c0-1-0.1-1.9-0.1-2.9h4.9
							c0.3,0.9,0.4,1.9,0.4,2.9c0,1-0.1,2-0.4,2.9H20.7L20.7,27.1z"/>
					</g>
				</g>
			</g>
		</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	}


	public static menuTuiles(): ContenusSVG {
		let viewBoxContains = `0 0 48 48`;

		let contenu = `
		<g>
			<path id="rectangleprincipal" class="xsvg-elem xsvg-elem_filled" d="M6,0h10c3.3,0,6,2.7,6,6v10c0,3.3-2.7,6-6,6H6c-3.3,0-6-2.7-6-6V6C0,2.7,2.7,0,6,0z"/>
			<path id="rectanglesecondaire" class="xsvg-elem xsvg-elem_filled" d="M32,0h10c3.3,0,6,2.7,6,6v10c0,3.3-2.7,6-6,6H32c-3.3,0-6-2.7-6-6V6C26,2.7,28.7,0,32,0z"/>
			<path id="rectanglesecondaire" class="xsvg-elem xsvg-elem_filled" d="M6,26h10c3.3,0,6,2.7,6,6v10c0,3.3-2.7,6-6,6H6c-3.3,0-6-2.7-6-6V32C0,28.7,2.7,26,6,26z"/>
			<path id="rectanglesecondaire" class="xsvg-elem xsvg-elem_filled" d="M32,26h10c3.3,0,6,2.7,6,6v10c0,3.3-2.7,6-6,6H32c-3.3,0-6-2.7-6-6V32C26,28.7,28.7,26,32,26z"/>
		</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	}


	public static parametres(): ContenusSVG {
		let viewBoxContains = `0 0 48 48`;

		let contenu = `
		<path id="silhouette" class="xsvg-elem xsvg-elem_filled" d="M20.2,37c0-7.2,4.6-13.4,11.1-15.6c-1.4-0.9-2.9-1.7-4.5-2.2c2.5-2,4-5,4-8.4c0-6-4.9-10.8-11-10.8
			s-11,4.8-11,10.8c0,3.4,1.6,6.4,4.1,8.4c-1.5,0.6-11.6,4.9-12.9,17c-0.1,3.7,2,4.4,2,4.4l0,0c0,0,0.9,0.8,2.2,1.1
			c0.3,0.9,0.7,1.6,1.3,2.2v0c0,0,1,2.7,11,3.1c0.1,0,0.3,0,0.4,0.1h2.5c0.3,0,0.6,0,1,0h2.9c0.1,0,0.2,0,0.4-0.1
			C21.5,44.3,20.2,40.8,20.2,37z"/>
		<g id="engrenage">
			<path class="xsvg-elem xsvg-elem_filled" d="M45.6,38.4l2.4-1.5l-1.1-4.7l-2.8-0.3L43.4,31l0.3-2.8l-4.3-2.1l-2,2h-1.2l-2-2l-4.3,2.1l0.3,2.8l-0.7,0.9l-2.8,0.3
				l-1.1,4.7l2.4,1.5l0.3,1.1L26.7,42l3,3.8l2.7-0.9l1,0.5l0.9,2.7h4.8l0.9-2.7l1-0.5l2.7,0.9l3-3.8l-1.5-2.4L45.6,38.4z M36.8,42.4
				c-3,0-5.4-2.4-5.4-5.4c0-3,2.4-5.4,5.4-5.4c3,0,5.4,2.4,5.4,5.4C42.1,40,39.7,42.4,36.8,42.4z"/>
			<circle class="xsvg-elem xsvg-elem_filled" cx="36.7" cy="37" r="2.6"/>
		</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	}


	public static patientConnect(): ContenusSVG {
		let viewBoxContains = `0 0 48 48`;

		let contenu = `
		<g>
			<g id="ecran">
				<path class="xsvg-elem xsvg-elem_filled" d="M37.2,21H10.8c-1,0-1.8,0.8-1.8,1.8v19c0,1,0.8,1.8,1.8,1.8h26.4c1,0,1.8-0.8,1.8-1.8v-19C39,21.8,38.2,21,37.2,21z
					 M11.3,40.5V23.6h25.4v16.9H11.3z"/>
				<polygon class="xsvg-elem xsvg-elem_filled" points="20.6,44.5 17.2,48 30.9,48 27.4,44.5 		"/>
			</g>
			<path id="courbe" class="xsvg-elem xsvg-elem_filled" d="M32.4,28.5c-0.7,0-1.2,0.5-1.2,1.2c0,0.2,0,0.3,0.1,0.5c-0.9,0.8-2.2,2-3.1,2.8c-0.2-0.1-0.4-0.2-0.7-0.2
				c-0.3,0-0.5,0.1-0.7,0.3c-0.8-0.7-2.1-1.8-3-2.6c0-0.1,0.1-0.3,0.1-0.4c0-0.7-0.5-1.2-1.2-1.2s-1.2,0.5-1.2,1.2
				c0,0.2,0,0.3,0.1,0.4L16,34.9c-0.2-0.1-0.4-0.2-0.7-0.2c-0.7,0-1.2,0.5-1.2,1.2s0.5,1.2,1.2,1.2s1.2-0.5,1.2-1.2
				c0-0.1,0-0.2-0.1-0.3c1.6-1.3,4.3-3.5,5.6-4.4c0.2,0.1,0.4,0.2,0.7,0.2c0.2,0,0.4-0.1,0.6-0.2c0.8,0.7,2.2,1.9,3.2,2.7
				c0,0.1,0,0.1,0,0.2c0,0.7,0.5,1.2,1.2,1.2s1.2-0.5,1.2-1.2c0-0.1,0-0.2-0.1-0.3l3.2-2.9c0.2,0.1,0.4,0.2,0.6,0.2
				c0.7,0,1.2-0.5,1.2-1.2C33.6,29.1,33.1,28.5,32.4,28.5z"/>
			<path id="pointeur" class="xsvg-elem xsvg-elem_filled" d="M30.3,6.5c0-3.6-2.9-6.5-6.5-6.5s-6.5,2.9-6.5,6.5c0,4.6,3.4,9.3,6.5,12.4C26.9,15.9,30.3,11.1,30.3,6.5z
				 M21,6.6c0-1.5,1.2-2.7,2.7-2.7s2.7,1.2,2.7,2.7s-1.2,2.7-2.7,2.7C22.3,9.4,21,8.2,21,6.6z"/>
		</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	}


	public static rechercheMedicament(): ContenusSVG {
		let viewBoxContains = `0 0 48 48`;

		let contenu = `
		<g>
			<path id="verre" class="xsvg-elem xsvg-elem_filled xsvg-transparent" d="M9.2,6c4.4-2,9.6-0.2,11.6,4.2s0.2,9.6-4.2,11.6S7,22,5,17.6S4.9,8,9.2,6z"/>
			<path id="loupe" class="xsvg-elem xsvg-elem_filled" d="M7.6,2.5c-6.3,2.9-9,10.4-6.1,16.7c0.9,2,2.3,3.6,4,4.8L0.2,38.7c-0.7,1.9,0.3,3.9,2.1,4.6
				c1.9,0.6,4-0.3,4.7-2.2l5.3-14.6c2,0.1,4.1-0.3,6-1.2c6.3-2.9,9-10.4,6.1-16.7C21.4,2.3,13.9-0.4,7.6,2.5z M9.2,6
				c4.4-2,9.6-0.2,11.6,4.2s0.2,9.6-4.2,11.6S7,22,5,17.6S4.9,8,9.2,6z"/>
			<path id="pilule1" class="xsvg-elem xsvg-elem_filled" d="M18.4,44.1c2,2,5.1,2.1,7,0.2l14.7-14.7c1.9-1.9,1.8-5-0.2-7s-5.1-2.1-7-0.2L18.2,37.1
				C16.3,39,16.4,42.1,18.4,44.1z M27.3,29.6l6.3-6.3c1.5-1.5,4-1.4,5.6,0.1c1.6,1.6,1.6,4.1,0.1,5.6L33,35.2L27.3,29.6z"/>
			<path id="piluel2" class="xsvg-elem xsvg-elem_filled" d="M23.1,43.1c0.4,2.3,2.4,3.9,4.6,3.5l16.9-2.7c2.2-0.3,3.7-2.5,3.3-4.8s-2.4-3.9-4.6-3.5
				l-16.9,2.7C24.2,38.7,22.7,40.8,23.1,43.1z M36.1,37.7l7.3-1.2c1.7-0.3,3.3,1,3.6,2.8s-0.9,3.5-2.6,3.8l-7.3,1.2L36.1,37.7z"/>
		</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	}


	public static rechercheRapide(): ContenusSVG {
		let viewBoxContains = `0 0 48 48`;

		let contenu = `
		<path id="verre" class="xsvg-elem xsvg-elem_filled xsvg-transparent" d="M39.1,26.3c-3.5,0.1-6.3-2.7-6.4-6.1c-0.1-3.4,2.7-6.3,6.2-6.3c3.5-0.1,6.3,2.7,6.4,6.1
			C45.3,23.4,42.6,26.2,39.1,26.3z"/>
		<path id="loupe" class="xsvg-elem xsvg-elem_filled" d="M38.8,11.1c-5,0.1-8.9,4.2-8.9,9.2c0,1.5,0.4,3,1.1,4.2l-7.7,8c-1,1-1,2.6,0.1,3.6c1,1,2.6,1,3.6-0.1l7.7-8
			c1.3,0.7,2.8,1.1,4.4,1c5-0.1,8.9-4.2,8.9-9.2C47.9,15,43.8,11,38.8,11.1z M39.1,26.3c-3.5,0.1-6.3-2.7-6.4-6.1
			c-0.1-3.4,2.7-6.3,6.2-6.3c3.5-0.1,6.3,2.7,6.4,6.1C45.3,23.4,42.6,26.2,39.1,26.3z"/>
		<path id="trait1" class="xsvg-elem xsvg-elem_filled" d="M27.7,18.1c0,0.6-0.5,1.2-1.2,1.2H15.3c-0.6,0-1.2-0.5-1.2-1.2l0,0c0-0.6,0.5-1.2,1.2-1.2h11.2
			C27.2,17,27.7,17.5,27.7,18.1L27.7,18.1z"/>
		<path id="trait2" class="xsvg-elem xsvg-elem_filled" d="M6,24.2c0,0.6,0.5,1.2,1.2,1.2h19.5c0.6,0,1.2-0.5,1.2-1.2l0,0c0-0.6-0.5-1.2-1.2-1.2H7.1
			C6.5,23.1,6,23.6,6,24.2L6,24.2z"/>
		<path id="trait3" class="xsvg-elem xsvg-elem_filled" d="M0,30.3c0,0.6,0.5,1.2,1.2,1.2h19.5c0.6,0,1.2-0.5,1.2-1.2l0,0c0-0.6-0.5-1.2-1.2-1.2H1.2
			C0.5,29.2,0,29.7,0,30.3L0,30.3z"/>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	}


	public static rechercheTuile(): ContenusSVG {
		let viewBoxContains = `0 0 48 48`;

		let contenu = `
		<path id="loupe" class="xsvg-elem xsvg-elem_filled" d="M31.2,0.1c-9.4,0-17,7.6-17,17c0,2.9,0.7,5.6,2,8L1.4,39.9c-1.9,1.9-1.9,4.9,0,6.8c1.9,1.9,4.9,1.9,6.8,0
			L23,31.9c2.4,1.3,5.2,2.1,8.2,2.1c9.4,0,17-7.6,17-16.9C48.2,7.7,40.6,0.1,31.2,0.1z M31.2,28.9c-6.5,0-11.8-5.3-11.8-11.8
			c0-6.5,5.3-11.8,11.8-11.8c6.5,0,11.8,5.3,11.8,11.8C43,23.6,37.7,28.9,31.2,28.9z"/>
		<path id="verre" class="xsvg-elem xsvg-elem_filled xsvg-transparent" d="M31.2,28.9c-6.5,0-11.8-5.3-11.8-11.8c0-6.5,5.3-11.8,11.8-11.8c6.5,0,11.8,5.3,11.8,11.8
			C43,23.6,37.7,28.9,31.2,28.9z"/>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	}


	public static reprendre(): ContenusSVG
	{
		let viewBoxContains = `0 0 48 48`;

		let contenu = `
		<path class="xsvg-elem xsvg-elem_filled" d="M0,46.35V1.67C0,.3,1.74-.48,2.97,.32L37.31,22.66c1.02,.66,1.02,2.02,0,2.68L2.97,47.69c-1.23,.8-2.97,.02-2.97-1.34Z"/>`
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	}


	public static suiviPubliDocs(): ContenusSVG
	{
		let viewBoxContains = `0 0 48 48`;

		let contenu = `
		<g>
	<g id="classeur">
		<path class="xsvg-elem xsvg-elem_filled" d="M19.6,26.1l-3.5,6.6c-0.2,0.3-0.6,0.7-1,0.7h-14c-0.3,0-0.6-0.1-0.8-0.3C0.1,32.8,0,32.6,0,32.3V21.4
			c0-0.6,0.5-1.1,1.1-1.1h1v0.9H1.4c-0.2,0-0.2,0.1-0.4,0.2c-0.1,0.1-0.2,0.2-0.2,0.4V32c0,0.3,0.2,0.5,0.5,0.5h0.7l3.3-6.6
			c0.2-0.4,0.6-0.7,0.9-0.7h8.1v-2.7c0.6,0.1,0.9,0.5,0.9,1v1.7h3.7C19.6,25.1,20,25.5,19.6,26.1z M2.8,29c0-3.3,0-13.3,0-13.3
			c0-0.5,0.4-0.9,0.9-0.9h7.3c0.1,0,0.2,0.1,0.3,0.2l2.4,2.5c0.1,0.1,0.1,0.2,0.1,0.3v6.6h-0.8v-6.1c0-0.1-0.1-0.2-0.2-0.2h-1.8
			c-0.2,0-0.4-0.2-0.4-0.4v-2.1c0-0.1-0.1-0.2-0.2-0.2H3.8c-0.1,0-0.2,0.1-0.2,0.2v12.5l-0.6,1.2C3,29.4,2.8,29.3,2.8,29z
			 M11.5,17.4h1.1l-1.1-1.3V17.4L11.5,17.4z M11.9,19h-7c-0.2,0-0.5,0.2-0.5,0.5s0.2,0.5,0.5,0.5h7c0.2,0,0.5-0.2,0.5-0.5
			C12.3,19.1,12.1,19,11.9,19z M12.3,22.2c0-0.2-0.2-0.5-0.5-0.5h-7c-0.2,0-0.5,0.2-0.5,0.5c0,0.2,0.2,0.5,0.5,0.5h7
			C12.1,22.6,12.3,22.5,12.3,22.2z M4.4,24.9c0,0.2,0.2,0.5,0.5,0.5H5c0.3-0.9,1-0.9,1-0.9H4.8C4.5,24.5,4.4,24.7,4.4,24.9z"/>
	</g>
	<g id="feuille_00000103225286398824054620000017738878507285847222_">
		<path class="xsvg-elem xsvg-elem_filled" d="M48.1,19.8L46,17.5c0-0.1-0.2-0.1-0.3-0.1l-6.6,0c-0.5,0-0.8,0.4-0.8,0.8l0,11.6c0,0.5,0.4,0.8,0.8,0.8c0,0,1.3,0,3.1,0
			l0,0l5.3,0c0.5,0,0.8-0.4,0.8-0.8l0-9.7C48.2,20,48.2,19.9,48.1,19.8z M46.1,18.6l1,1.1l-1.1,0L46.1,18.6z M47.6,29.8
			c0,0.1,0,0.1-0.2,0.1l-4.6,0l0,0l-3.8,0c-0.1,0-0.1,0-0.1-0.2l0-11.5c0-0.1,0-0.1,0.2-0.1l6.1,0c0.1,0,0.2,0.1,0.2,0.2l0,1.9
			c0,0.2,0.1,0.4,0.3,0.3l1.7,0c0.1,0,0.2,0.1,0.2,0.2L47.6,29.8z"/>
		<path class="xsvg-elem xsvg-elem_filled" d="M46.4,21.1l-6.4,0c-0.3,0-0.4,0.2-0.4,0.4c0,0.3,0.2,0.4,0.4,0.4l6.4,0c0.3,0,0.4-0.2,0.4-0.4
			C46.9,21.3,46.7,21.1,46.4,21.1z"/>
		<path class="xsvg-elem xsvg-elem_filled" d="M46.9,24.1c0-0.3-0.2-0.4-0.4-0.4l-6.4,0c-0.2,0-0.4,0.2-0.4,0.4c0,0.3,0.2,0.4,0.4,0.4l6.4,0
			C46.7,24.5,46.9,24.3,46.9,24.1z"/>
		<path class="xsvg-elem xsvg-elem_filled" d="M46.9,26.6c0-0.3-0.2-0.4-0.4-0.4l-6.4,0c-0.3,0-0.4,0.2-0.4,0.4c0,0.3,0.2,0.4,0.4,0.4l6.4,0
			C46.7,27,46.9,26.8,46.9,26.6z"/>
	</g>
	<polygon class="xsvg-elem xsvg-elem_filled" points="22,26.8 29.8,26.8 29.8,30.1 36.3,25.2 29.8,20.3 29.8,23.6 22,23.6 	"/>
	<g id="feuille_00000036221320903670028580000009570563255220742024_">
		<path class="xsvg-elem xsvg-elem_filled" d="M48.1,2.5L46,0.1c0-0.1-0.2-0.1-0.3-0.1l-6.6,0c-0.5,0-0.8,0.4-0.8,0.8l0,11.6c0,0.5,0.4,0.8,0.8,0.8c0,0,1.3,0,3.1,0l0,0
			l5.3,0c0.5,0,0.8-0.4,0.8-0.8l0-9.7C48.2,2.6,48.2,2.6,48.1,2.5z M46.1,1.2l1,1.1l-1.1,0L46.1,1.2z M47.6,12.4
			c0,0.1,0,0.1-0.2,0.1l-4.6,0l0,0l-3.8,0c-0.1,0-0.1,0-0.1-0.2l0-11.5c0-0.1,0-0.1,0.2-0.1l6.1,0c0.1,0,0.2,0.1,0.2,0.2l0,1.9
			c0,0.2,0.1,0.4,0.3,0.3l1.7,0c0.1,0,0.2,0.1,0.2,0.2L47.6,12.4z"/>
		<path class="xsvg-elem xsvg-elem_filled" d="M46.4,3.8l-6.4,0c-0.3,0-0.4,0.2-0.4,0.4c0,0.3,0.2,0.4,0.4,0.4l6.4,0c0.3,0,0.4-0.2,0.4-0.4C46.9,4,46.7,3.8,46.4,3.8z"
			/>
		<path class="xsvg-elem xsvg-elem_filled" d="M46.9,6.7c0-0.3-0.2-0.4-0.4-0.4l-6.4,0c-0.2,0-0.4,0.2-0.4,0.4c0,0.3,0.2,0.4,0.4,0.4l6.4,0C46.7,7.2,46.9,6.9,46.9,6.7z
			"/>
		<path class="xsvg-elem xsvg-elem_filled" d="M46.9,9.2c0-0.3-0.2-0.4-0.4-0.4l-6.4,0c-0.3,0-0.4,0.2-0.4,0.4c0,0.3,0.2,0.4,0.4,0.4l6.4,0C46.7,9.6,46.9,9.5,46.9,9.2z
			"/>
	</g>
	<polygon class="xsvg-elem xsvg-elem_filled"  points="22,9.5 29.8,9.5 29.8,12.8 36.3,7.9 29.8,3 29.8,6.2 22,6.2 	"/>
	<g id="feuille_00000164490022437672618780000002447191718823426983_">
		<path class="xsvg-elem xsvg-elem_filled" d="M48.1,37.2L46,34.8c0-0.1-0.2-0.1-0.3-0.1l-6.6,0c-0.5,0-0.8,0.4-0.8,0.8l0,11.6c0,0.5,0.4,0.8,0.8,0.8c0,0,1.3,0,3.1,0
			l0,0l5.3,0c0.5,0,0.8-0.4,0.8-0.8l0-9.7C48.2,37.3,48.2,37.2,48.1,37.2z M46.1,35.9l1,1.1L46,37L46.1,35.9z M47.6,47.1
			c0,0.1,0,0.1-0.2,0.1l-4.6,0l0,0l-3.8,0c-0.1,0-0.1,0-0.1-0.2l0-11.5c0-0.1,0-0.1,0.2-0.1l6.1,0c0.1,0,0.2,0.1,0.2,0.2l0,1.9
			c0,0.2,0.1,0.4,0.3,0.3l1.7,0c0.1,0,0.2,0.1,0.2,0.2L47.6,47.1z"/>
		<path class="xsvg-elem xsvg-elem_filled" d="M46.4,38.4l-6.4,0c-0.3,0-0.4,0.2-0.4,0.4c0,0.3,0.2,0.4,0.4,0.4l6.4,0c0.3,0,0.4-0.2,0.4-0.4
			C46.9,38.7,46.7,38.4,46.4,38.4z"/>
		<path class="xsvg-elem xsvg-elem_filled" d="M46.9,41.4c0-0.3-0.2-0.4-0.4-0.4L40,41c-0.2,0-0.4,0.2-0.4,0.4c0,0.3,0.2,0.4,0.4,0.4l6.4,0
			C46.7,41.8,46.9,41.6,46.9,41.4z"/>
		<path class="xsvg-elem xsvg-elem_filled" d="M46.9,43.9c0-0.3-0.2-0.4-0.4-0.4l-6.4,0c-0.3,0-0.4,0.2-0.4,0.4c0,0.3,0.2,0.4,0.4,0.4l6.4,0
			C46.7,44.3,46.9,44.2,46.9,43.9z"/>
	</g>
	<polygon class="xsvg-elem xsvg-elem_filled" points="22,44.2 29.8,44.2 29.8,47.5 36.3,42.6 29.8,37.7 29.8,40.9 22,40.9 	"/>
</g>`
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	}

	public static support(): ContenusSVG {
		let viewBoxContains = `0 0 48 48`;

		let contenu = `
		<path class="xsvg-elem xsvg-elem_filled" d="M40.3,20.4h-0.8C37.4,14.2,31.2,9.7,24,9.7c-7.2,0-13.4,4.5-15.4,10.6H7.7c-1.7,0-3.1,1.4-3.1,3.1v3.6
			c0,1.7,1.4,3.1,3.1,3.1h0.7c3,11.4,15.1,14.6,15.2,14.7l0.3,0.1l0.3-0.1c0.1,0,12.3-3.1,15.2-14.7h0.7c1.7,0,3.1-1.4,3.1-3.1v-3.6
			C43.4,21.8,42,20.4,40.3,20.4L40.3,20.4z M34.5,35h-8.1c-0.4-0.7-1.2-1.2-2-1.2c-1.3,0-2.3,1-2.3,2.3c0,1.3,1,2.3,2.3,2.3
			c1,0,1.9-0.7,2.2-1.6h6.4c-3.4,3.6-7.7,5-8.9,5.3c-2.1-0.6-13.6-4.6-13.6-17.3c0-0.2,0-0.4,0-0.6c3.5-0.7,7.6-1.8,9-3.4
			c0,0,0.6,3.1-1.5,4.4c0,0,7.2-1.1,8.5-3.3c0,0,0.3,5.7,11,5.1C37.1,30.3,35.9,33,34.5,35L34.5,35z M46.5,22.2
			c-0.4-11-10-19.2-22.5-19.2c-12.5,0-22.1,8.2-22.5,19.2C0.6,22.7,0,23.5,0,24.4v1.6c0,1.4,1.3,2.5,2.8,2.5h1.2v-6
			C4.4,12.9,12.8,5.7,24,5.7c11.2,0,19.6,7.2,19.9,16.9v6h1.2c1.6,0,2.8-1.1,2.8-2.5v-1.6C48,23.5,47.4,22.7,46.5,22.2L46.5,22.2z"/>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	}


	public static tableauDeBord(): ContenusSVG
	{
		let viewBoxContains = `0 0 48 48`;

		let contenu = `
		<g>
			<path id="silhouette1" class="xsvg-elem xsvg-elem_filled" d="M6.7,7.9c0.6-0.5,1-1.3,1-2.1c0-1.5-1.2-2.7-2.8-2.7c-1.5,0-2.8,1.2-2.8,2.7c0,0.8,0.4,1.6,1,2.1
				c-1.3,0.5-2.5,1.5-3,3C-0.1,12-0.2,13.3,1,13.6c0,0.1,0.1,0.2,0.2,0.3h0c0,0,0.3,0.8,2.8,1c0.1,0,0.1,0,0.2,0h0.7
				c0.1,0,0.2,0,0.2,0h0.6c0,0,0.1,0,0.1,0c2.5-0.1,2.8-0.8,2.8-0.8l0,0c0.1-0.1,0.3-0.3,0.3-0.5c0.3-0.1,0.6-0.3,0.6-0.3l0,0
				c0,0,0.5-0.2,0.5-1.1C9.6,9.1,7.1,8.1,6.7,7.9"/>
			<path id="silhouette2" class="xsvg-elem xsvg-elem_filled" d="M6.7,22.9c0.6-0.5,1-1.3,1-2.1c0-1.5-1.2-2.7-2.8-2.7c-1.5,0-2.8,1.2-2.8,2.7c0,0.8,0.4,1.6,1,2.1
				c-1.3,0.5-2.5,1.5-3,3c-0.3,1.1-0.4,2.5,0.7,2.7c0,0.1,0.1,0.2,0.2,0.3l0,0c0,0,0.3,0.8,2.8,1c0.1,0,0.1,0,0.2,0h0.7
				c0.1,0,0.2,0,0.2,0h0.6c0,0,0.1,0,0.1,0c2.5-0.1,2.8-0.8,2.8-0.8l0,0c0.1-0.1,0.3-0.3,0.3-0.5c0.3-0.1,0.6-0.3,0.6-0.3l0,0
				c0,0,0.5-0.2,0.5-1.1C9.6,24.1,7.1,23.1,6.7,22.9"/>
			<path id="silhouette3" class="xsvg-elem xsvg-elem_filled" d="M6.7,37.9c0.6-0.5,1-1.3,1-2.1c0-1.5-1.2-2.7-2.8-2.7c-1.5,0-2.8,1.2-2.8,2.7c0,0.8,0.4,1.6,1,2.1
				c-1.3,0.5-2.5,1.5-3,3c-0.3,1.1-0.4,2.5,0.7,2.7c0,0.1,0.1,0.2,0.2,0.3h0c0,0,0.3,0.8,2.8,1c0.1,0,0.1,0,0.2,0h0.7
				c0.1,0,0.2,0,0.2,0h0.6c0,0,0.1,0,0.1,0c2.5-0.1,2.7-0.8,2.7-0.8l0,0c0.1-0.1,0.3-0.3,0.3-0.5c0.3-0.1,0.6-0.3,0.6-0.3l0,0
				c0,0,0.5-0.2,0.5-1.1C9.6,39.1,7.1,38,6.7,37.9"/>
			<path id="trait1" class="xsvg-elem xsvg-elem_filled" d="M48,9c0,1.8-1.5,3.3-3.3,3.3H17.9c-1.8,0-3.3-1.5-3.3-3.3l0,0c0-1.8,1.5-3.3,3.3-3.3h26.8
				C46.5,5.7,48,7.2,48,9L48,9z"/>
			<path id="trait2" class="xsvg-elem xsvg-elem_filled" d="M48,24c0,1.8-1.5,3.3-3.3,3.3H17.9c-1.8,0-3.3-1.5-3.3-3.3l0,0c0-1.8,1.5-3.3,3.3-3.3h26.8
				C46.5,20.7,48,22.2,48,24L48,24z"/>
			<path id="trait3" class="xsvg-elem xsvg-elem_filled" d="M48,39c0,1.8-1.5,3.3-3.3,3.3H17.9c-1.8,0-3.3-1.5-3.3-3.3l0,0c0-1.8,1.5-3.3,3.3-3.3h26.8
				C46.5,35.7,48,37.1,48,39L48,39z"/>
		</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	}


	public static ValidationPharma(): ContenusSVG
	{
		let viewBoxContains = `0 0 48 48`;

		let contenu = `
		<g>
			<polygon class="xsvg-elem xsvg-elem_filled" points="48,10.7 43.2,6.5 34.6,16.3 29.7,12.1 25.5,16.9 35.3,25.3 35.3,25.3 35.3,25.3 	"/>
			<g>
				<g>
					<path class="xsvg-elem xsvg-elem_filled" d="M10,39.2l12.4-18.7c1.6-2.4,0.8-5.7-1.7-7.4c-2.5-1.7-5.9-1.1-7.5,1.3L0.8,33.2c-1.6,2.4-0.8,5.7,1.7,7.4
						C5.1,42.2,8.4,41.7,10,39.2z M8.8,23.3l5.3-8c1.3-1.9,3.9-2.4,5.9-1c2,1.3,2.6,3.9,1.3,5.8l-5.3,8L8.8,23.3z"/>
				</g>
				<g>
					<g>
						<path class="xsvg-elem xsvg-elem_filled" d="M19.5,31.8c-0.1,0.6-0.2,1.2-0.2,1.9c0,4.3,3.5,7.8,7.8,7.8c2.7,0,5.2-1.4,6.6-3.6L19.5,31.8z"/>
						<path class="xsvg-elem xsvg-elem_filled" d="M34.7,35.6c0.2-0.6,0.2-1.2,0.2-1.9c0-4.3-3.5-7.8-7.8-7.8c-2.8,0-5.2,1.4-6.6,3.6L34.7,35.6z"/>
					</g>
				</g>
			</g>
		</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	}


	public static vueJournee(): ContenusSVG {
		let viewBoxContains = `0 0 48 48`;

		let contenu = `
		<g>
			<g id="anneaux">
				<path class="xsvg-elem xsvg-elem_filled" d="M13.4,7.7c0,0.8-0.6,1.4-1.4,1.4l0,0c-0.8,0-1.4-0.6-1.4-1.4V1.4C10.6,0.6,11.2,0,12,0l0,0c0.8,0,1.4,0.6,1.4,1.4V7.7z"/>
				<path class="xsvg-elem xsvg-elem_filled" d="M25.4,7.7c0,0.8-0.6,1.4-1.4,1.4l0,0c-0.8,0-1.4-0.6-1.4-1.4V1.4C22.6,0.6,23.3,0,24,0l0,0c0.8,0,1.4,0.6,1.4,1.4V7.7z"/>
				<path class="xsvg-elem xsvg-elem_filled" d="M37.3,7.7c0,0.8-0.6,1.4-1.4,1.4l0,0c-0.8,0-1.4-0.6-1.4-1.4V1.4C34.6,0.6,35.2,0,36,0l0,0c0.8,0,1.4,0.6,1.4,1.4v6.3
					H37.3z"/>
			</g>
			<path class="xsvg-elem xsvg-elem_filled" id="calendrier_1_" d="M43.3,4.6h-4.9V8c0,1.4-1.1,2.5-2.5,2.5S33.4,9.4,33.4,8V4.6h-7V8c0,1.4-1.1,2.5-2.4,2.5
				c-1.4,0-2.5-1.1-2.5-2.5V4.6h-7V8c0,1.4-1.1,2.5-2.5,2.5S9.5,9.4,9.5,8V4.6H4.7c-2.5,0-4.6,2.1-4.6,4.6v34.2c0,2.5,2.1,4.6,4.6,4.6
				h38.6c2.5,0,4.6-2.1,4.6-4.6V9.2C47.9,6.6,45.9,4.6,43.3,4.6z M45.9,41.9c0,2.3-1.9,4.1-4.2,4.1H6.3c-2.3,0-4.2-1.8-4.2-4.1V16.7
				h43.8V41.9z"/>
			<patH class="xsvg-elem xsvg-elem_filled" d="M39,23.8l-3.5-3.5c-0.5-0.5-1.3-0.5-1.8,0L21.5,32.5l-7.2-7.2c-0.5-0.5-1.3-0.5-1.8,0L9,28.9c-0.5,0.5-0.5,1.3,0,1.8
				l11.6,11.6c0.3,0.2,0.6,0.4,0.9,0.4c0.3,0,0.7-0.1,0.9-0.4L39,25.6C39.5,25.1,39.5,24.3,39,23.8z"/>
		</g>`;
		let epaisseur;
		return new ContenusSVG(contenu, viewBoxContains, epaisseur);
	}



	//---- Icones Tuiles ----//
}