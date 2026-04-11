//#region V2/xBase.ts
var enumTypeOrientation$1 = /* @__PURE__ */ function(e) {
	return e.horizontal = "orientation_horizontale", e.vertical = "orientation_verticale", e;
}({}), enumPosition$1 = /* @__PURE__ */ function(e) {
	return e[e.Left = 0] = "Left", e[e.Right = 1] = "Right", e[e.Top = 2] = "Top", e[e.Bottom = 3] = "Bottom", e;
}({}), enumCouleur$1 = /* @__PURE__ */ function(e) {
	return e.emed_noir = "emed_noir", e.emed_grisfonce = "emed_grisfonce", e.emed_grisclair = "emed_grisclair", e.emed_blanc = "emed_blanc", e.emed_marronfonce = "emed_marronfonce", e.emed_marronclair = "emed_marronclair", e.emed_rougefonce = "emed_rougefonce", e.emed_rouge = "emed_rouge", e.emed_orange = "emed_orange", e.emed_jaune = "emed_jaune", e.emed_vert = "emed_vert", e.emed_turquoise = "emed_turquoise", e.emed_bleu = "emed_bleu", e.emed_violet = "emed_violet", e.emed_peau = "emed_peau", e.emed_rose = "emed_rose", e.t20_utilisateur = "t20_user", e.t20_alternatif = "t20_alt", e.intervention_plannifiee = "intervention_plannifee", e.intervention_programmee = "intervention_programmee", e.intervention_validee = "intervention_validee", e.intervention_encours = "intervention_encours", e.intervention_realisee = "intervention_realisee", e.intervention_annulee = "intervention_annulee", e;
}({}), enumCouleurHexa = /* @__PURE__ */ function(e) {
	return e.emed_noir = "000000", e.emed_grisfonce = "585858", e.emed_grisclair = "C6C6C6", e.emed_blanc = "FFFFFF", e.emed_marronfonce = "926036", e.emed_marronclair = "C99D66", e.emed_rougefonce = "AC0800", e.emed_rouge = "ED1D25", e.emed_orange = "EF8208", e.emed_jaune = "EACF0F", e.emed_vert = "39AD47", e.emed_turquoise = "5BB996", e.emed_bleu = "1C779C", e.emed_violet = "662482", e.emed_peau = "f6b478", e.emed_rose = "a3195c", e.intervention_plannifiee = "aaaaaa", e.intervention_programmee = "f2696b", e.intervention_validee = "f6c371", e.intervention_encours = "817efc", e.intervention_realisee = "75a85d", e.intervention_annulee = "585858", e;
}({}), enumVisibility = /* @__PURE__ */ function(e) {
	return e[e.afficher = 0] = "afficher", e[e.masquer = 1] = "masquer", e[e.masquerAvecCollapse = 2] = "masquerAvecCollapse", e;
}({}), Visibility = class {
	static converterToBool(e) {
		return e == enumVisibility.afficher;
	}
	static converterFromBool(e) {
		return e ? enumVisibility.afficher : enumVisibility.masquer;
	}
}, enumThemes = /* @__PURE__ */ function(e) {
	return e.ThemeDefaut = "tdef", e.ThemeLegacy = "tleg", e.Theme2020 = "t20", e;
}({}), enumThemeLuminosite = /* @__PURE__ */ function(e) {
	return e.LightTheme = "lm", e.DarkTheme = "dm", e;
}({}), enumCote = /* @__PURE__ */ function(e) {
	return e[e.tous = 0] = "tous", e[e.haut = 1] = "haut", e[e.droite = 2] = "droite", e[e.bas = 3] = "bas", e[e.gauche = 4] = "gauche", e;
}({}), enumStyleBorderCSS = /* @__PURE__ */ function(e) {
	return e.solid = "solid", e.dashed = "dashed", e.sotted = "doted", e;
}({}), enumCurseur$1 = /* @__PURE__ */ function(e) {
	return e.defaut = "default", e.clic = "pointer", e.aide = "help", e.attente = "wait", e.texte = "text", e.deplacement = "move", e.interdit = "not-allowed", e.mainOuverte = "grab", e.mainFermee = "grabbing", e.redimensionnerColonne = "col-resize", e.redimensionnerLigne = "row-resize", e.zoomPlus = "zoom-in", e.zoomMoins = "zoom-out", e;
}({}), DictionnaireUtils = class {
	static getDicoFromArray(e, t) {
		let n = {};
		return (e ?? []).forEach((e) => {
			n[t(e)] = e;
		}), n;
	}
	static getData(e) {
		let t = [];
		for (let n in e) t.push(e[n]);
		return t;
	}
}, Container = class {
	content;
	constructor() {}
}, Arbre = class e {
	valeur;
	get Valeur() {
		return this.valeur;
	}
	set Valeur(e) {
		this.valeur = e;
	}
	enfants;
	constructor(e) {
		this.valeur = e, this.enfants = {};
	}
	get EnfantsAsArray() {
		let e = [];
		for (let t in this.enfants) e.push(this.enfants[t]);
		return e;
	}
	getEnfant(e) {
		let t = this.EnfantsAsArray.filter((t) => t.valeur == e);
		if (!t || t.length != 1) throw "cet enfant de l'arbre n'existe pas ou n'est pas unique";
		return t[0];
	}
	getEnfants(e) {
		let t = this;
		return e && e.forEach((e) => {
			t = t.getEnfant(e);
		}), t.EnfantsAsArray;
	}
	ajouterEnfant(t) {
		let n = new e(t);
		return this.enfants[n.valeur] = n, n;
	}
}, xClass = class e {
	static config = void 0;
	static localConfig = void 0;
	static get debugMode() {
		return e.localConfig?.debug ?? !1;
	}
	static get Theme() {
		return e.localConfig?.theme ? e.localConfig.theme() : e.config?.theme ? e.config.theme() : enumThemes.ThemeDefaut;
	}
	static get ThemeLuminosite() {
		return e.localConfig?.themeluminosite ? e.localConfig.themeluminosite() : e.config?.themeluminosite ? e.config.themeluminosite() : enumThemeLuminosite.LightTheme;
	}
}, xLib = { init(e, t) {
	xClass.config = e, xClass.localConfig = t;
} }, etype_messagebox = /* @__PURE__ */ function(e) {
	return e[e.Normal = 0] = "Normal", e[e.Avertissement = 1] = "Avertissement", e;
}({}), ETypeAlertify = /* @__PURE__ */ function(e) {
	return e[e.success = 0] = "success", e[e.error = 1] = "error", e[e.log = 2] = "log", e[e.alert = 3] = "alert", e;
}({}), ETypeStorage = /* @__PURE__ */ function(e) {
	return e[e.Session = 0] = "Session", e[e.Local = 1] = "Local", e;
}({}), EPositionAlertify = /* @__PURE__ */ function(e) {
	return e[e.topRight = 0] = "topRight", e[e.topLeft = 1] = "topLeft", e[e.bottomRight = 2] = "bottomRight", e[e.bottomLeft = 3] = "bottomLeft", e;
}({}), EKeys = /* @__PURE__ */ function(e) {
	return e[e.Echap = 0] = "Echap", e[e.FlecheHaut = 1] = "FlecheHaut", e[e.FlecheDroite = 2] = "FlecheDroite", e[e.FlecheBas = 3] = "FlecheBas", e[e.FlecheGauche = 4] = "FlecheGauche", e[e.M = 5] = "M", e[e.Entrer = 6] = "Entrer", e[e.A = 7] = "A", e;
}({}), ETypeFichier = /* @__PURE__ */ function(e) {
	return e[e.JavaScript = 0] = "JavaScript", e[e.CSS = 1] = "CSS", e;
}({}), EnumLibrairieJs = /* @__PURE__ */ function(e) {
	return e.pdfMake = "pdfmake.min.js vfs_fonts.js", e.pdfJs = "pdf.js pdf.worker.js", e.d3js = "d3js.4.11.0.js d3pie.min.js", e;
}({}), desktopDevice = "desktop-device", eventKey = class {
	_eventListener;
	_keyEvent;
	_keyCode;
	get eventListener() {
		return this._eventListener;
	}
	constructor(e, t, n) {
		let r = this;
		this._keyEvent = t, this._keyCode = e, this._eventListener = function(t) {
			r.checkEvent(t, e) && n();
		};
	}
	checkEvent(e, t) {
		let n = this;
		return e.target instanceof Element && e.target.tagName.toUpperCase() != "INPUT" && e.target.tagName.toUpperCase() != "TEXTAREA" && e.key == n.getKeyFromEnum();
	}
	getKeyFromEnum() {
		switch (this._keyCode) {
			case EKeys.Echap: return "Escape";
			case EKeys.FlecheBas: return "ArrowDown";
			case EKeys.FlecheDroite: return "ArrowRight";
			case EKeys.FlecheGauche: return "ArrowLeft";
			case EKeys.FlecheHaut: return "ArrowUp";
			case EKeys.M: return "m";
			case EKeys.Entrer: return "Enter";
			case EKeys.A: return "a";
			default: throw new DOMException("Touche non gérée");
		}
	}
	IsKeyEvent(e) {
		return e.toLowerCase() == this._keyEvent.toLowerCase();
	}
}, xOutils$1 = class e {
	static getStackTrace() {
		let e = [], t = !1;
		try {
			throw "getStack";
		} catch (a) {
			if (a.stack) {
				for (var n = a.stack.split("\n"), r = 0, i = n.length; r < i; r++) n[r].match(/^\s*[A-Za-z0-9\-_\$]+\(/) && e.push(n[r]);
				e.shift(), t = !0;
			}
		}
		if (!t) for (var a = arguments.callee.caller; a;) {
			var o = a.toString(), s = o.substring(o.indexOf("function") + 8, o.indexOf("(")) || "anonymous";
			e.push(s), a = a.caller;
		}
		return e.join("\n");
	}
	static ListKeyUpEventsCallback;
	static ListKeydownEventsCallback;
	static escapeRegExp(e) {
		return e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
	}
	static replaceAll(t, n, r) {
		return t.replace(new RegExp(e.escapeRegExp(n), "g"), r);
	}
	static enumToArray(e) {
		let t = [];
		for (let n in e) if (!isNaN(Number(n))) {
			let e = Number(n);
			t.push(e);
		}
		return t;
	}
	static enumNamesToStringArray(e) {
		var t = Object.keys(e).map(function(e) {
			if (isNaN(e)) return e;
		});
		function n(e) {
			return e != null;
		}
		return t = t.filter(n), t;
	}
	static stringToEnum(e, t) {
		if (isNaN(parseInt(e))) return t[e];
	}
	static JqueryAjaxCall(t, n, r, i, a) {
		$.ajax({
			url: t,
			type: "POST",
			data: n == null ? null : JSON.stringify(n),
			processData: !1,
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			context: i,
			success: function(e) {
				r(e.d, i);
			},
			error: a ?? function(n, r, i) {
				e.afficherMessageAlertify("at " + t + ", Error :" + n.responseText, ETypeAlertify.error), console.log("at " + t + ", Error :" + n.responseText);
			}
		});
	}
	static JqueryAjaxCallPromiseForTsProxy(e, t, n) {
		return this.JqueryAjaxCallPromiseForTs(e, t, n);
	}
	static convertDevUrlToRelativeUrl(e) {
		return e.indexOf("~") == 0 && (xClass.localConfig.contexteUrlPage.substr(xClass.localConfig.contexteUrlPage.length - 1) != "/" && (xClass.localConfig.contexteUrlPage = xClass.localConfig.contexteUrlPage + "/"), e = e.replace("~/", xClass.localConfig.contexteUrlPage)), e;
	}
	static JqueryAjaxCallPromiseForTs(e, t, n) {
		return this.JqueryAjaxCallPromiseForTsJson(e, t, !1, n);
	}
	static JqueryAjaxCallPromiseForTsJsonWithErrors(t, n, r, i, a) {
		let o = new Promise((a, o) => {
			e.JqueryAjaxCallPromiseForTsJson(t, n, r, i).then((e) => {
				e.erreur != null && e.erreur != null ? o(e.erreur) : a(e.succes);
			});
		});
		return a == null ? o.catch((t) => {
			e.afficherMessageAlertifyError(t);
		}) : o.catch((e) => {
			a(e);
		}), o;
	}
	static JqueryAjaxCallPromiseForTsJsonDistant(t, n) {
		let r;
		n != null && n != null ? r = n.ajouterWS() : (r = e.ajouterWS(), document.body.append(r.y)), r.addClass("ws_launch");
		let i = new Promise((n, r) => {
			let i = e.JqueryAjaxCallPromise2(e.convertDevUrlToRelativeUrl("~/xModules/ModuleEmed.aspx/Before_requestWebService_Echange"), t, { async: !0 });
			i.then(async (t) => {
				let i = (await t.json()).d, a = e.JqueryAjaxCallPromise2(i.URL_Emed_Clinique + "/xModules/ModuleEmed.aspx/requestWebService_Echange", { data_echange: i }, { async: !0 });
				a.then(async (t) => {
					let a = (await t.json()).d, o = e.JqueryAjaxCallPromise2(e.convertDevUrlToRelativeUrl("~/xModules/ModuleEmed.aspx/After_requestWebService_Echange"), { data_echange: a }, { async: !0 });
					o.then(async (e) => {
						n(JSON.parse((await e.json()).d));
					}), o.catch(function(t) {
						console.error("Erreur lors du déchiffrement de la réponse d'un appel vers l'URL " + i.URL_Emed_Clinique + ": ", t), e.afficherMessageAlertify("Erreur lors du déchiffrement de la réponse d'un appel vers l'URL ", ETypeAlertify.error), r("Erreur lors du déchiffrement de la réponse d'un appel vers l'URL " + i.URL_Emed_Clinique);
					});
				}), a.catch(function(t) {
					console.error("Erreur lors d'un appel vers l'URL " + i.URL_Emed_Clinique + ": ", t), e.afficherMessageAlertify("Erreur lors d'un appel vers l'URL " + i.URL_Emed_Clinique, ETypeAlertify.error), r("Erreur lors d'un appel vers l'URL " + i.URL_Emed_Clinique);
				});
			}), i.catch(function(t) {
				console.error("Erreur lors de la création du jeton d'échange: ", t), e.afficherMessageAlertify("Erreur lors de la création du jeton d'échange", ETypeAlertify.error), r("Erreur lors de la création du jeton d'échange");
			});
		});
		return i.then(function() {
			r.removeClass("ws_launch"), r.addClass("ws_ok"), setTimeout(function() {
				r.y.remove();
			}, 2e3);
		}), i.catch(function(t) {
			r.removeClass("ws_launch"), r.addClass("ws_error"), setTimeout(function() {
				r.y.remove();
			}, 3e3), e.afficherMessageAlertify(t.responseJSON == null ? t : t.responseJSON.Message, ETypeAlertify.error);
		}), i;
	}
	static JqueryAjaxCallPromiseForTsJson(t, n, r, i) {
		return e.JqueryAjaxCallPromiseForTsJsonFetch(t, n, r, i);
	}
	static JqueryAjaxCallPromiseForTsJsonFetch(t, n, r, i) {
		t = e.convertDevUrlToRelativeUrl(t);
		let a;
		i != null && i != null ? a = i.ajouterWS() : (a = e.ajouterWS(), document.body.append(a.y)), a.addClass("ws_launch");
		let o = new Promise(function(i, o) {
			e.JqueryAjaxCallPromiseFetch(t, n, { async: !0 }).then(async (t) => {
				let o = await t.json();
				try {
					let e;
					e = r ? JSON.parse(o.d) : o.d, i(e);
				} catch (t) {
					o?.d != null && o.d.startsWith("InvalidSession:-") ? console.log("Session Emed invalide, " + o.d) : e.AfficheErreurAjax("Erreur des données de retour de la méthode Ajax " + n.methode, t, a);
				}
			}).catch((t) => {
				e.AfficheErreurAjax("Erreur pendant l'appel de la méthode Ajax " + n.methode, t, a), o(t);
			});
		});
		return o.then(function() {
			a.removeClass("ws_launch"), a.addClass("ws_ok"), setTimeout(function() {
				a.y.remove();
			}, 2e3);
		}).catch(function(t) {
			e.AfficheErreurAjax("Erreur catch 'impossible' promesse " + n.methode, t, a);
		}), o;
	}
	static AfficheErreurAjax(t, n, r) {
		let i = t;
		n != null && (n.stack == null ? n.responseText == null ? i += " : " + n : i += " : " + n.responseText : i += " : " + n.stack), console.log(i), r.removeClass("ws_launch"), r.addClass("ws_error"), setTimeout(function() {
			r.y.remove();
		}, 3e3), e.afficherMessageAlertify(t, ETypeAlertify.error);
	}
	static ajouterWS() {
		return new xDiv({ class: "Global_wsLineElement" });
	}
	static JqueryAjaxCallPromise2(e, t, n) {
		var r = {
			type: "POST",
			data: t == null ? null : JSON.stringify(t),
			processData: !1,
			contentType: "application/json; charset=utf-8",
			dataType: "json"
		};
		return n != null && (r = {
			...r,
			...n
		}), fetch(e, {
			method: r.type,
			body: r.data,
			headers: { "content-type": r.contentType }
		});
	}
	static JqueryAjaxCallPromiseFetch(e, t, n) {
		var r = {
			type: "POST",
			data: t == null ? null : JSON.stringify(t),
			processData: !1,
			contentType: "application/json; charset=utf-8",
			dataType: "json"
		};
		return n != null && (r = {
			...r,
			...n
		}), fetch(e, {
			method: r.type,
			body: r.data,
			headers: { "content-type": r.contentType }
		});
	}
	static afficherMessageAlertify(e, t, n = {}) {
		xxDialog.afficherMessageDialog(e, t, n);
	}
	static afficherMessageAlertifyLog(e) {
		xxDialog.afficherMessageDialog(e, ETypeAlertify.log);
	}
	static afficherMessageAlertifyError(e) {
		xxDialog.afficherMessageDialog(e, ETypeAlertify.error);
	}
	static afficherMessageAlertifySuccess(e) {
		xxDialog.afficherMessageDialog(e, ETypeAlertify.success);
	}
	static afficherMessageAlertifyLocalise(e, t, n = {}) {
		xxDialog.afficherMessageDialog(new xLString(e).text, t, n);
	}
	static afficherMessageAlertifyLocaliseLog(e) {
		xxDialog.afficherMessageDialogLocalise(e, ETypeAlertify.log);
	}
	static afficherMessageAlertifyLocaliseError(e) {
		xxDialog.afficherMessageDialogLocalise(e, ETypeAlertify.error);
	}
	static afficherMessageAlertifyLocaliseSuccess(e) {
		xxDialog.afficherMessageDialogLocalise(e, ETypeAlertify.success);
	}
	static afficherMessageAlertifyContent(e, t, n = {}) {
		xxDialog.afficherMessageDialogContent(e, t, n);
	}
	static afficherMessageConfirmationLocalise(e, t, n, r, i) {
		xxDialog.afficherMessageConfirmation(new xLString(e).text, t, n, r, i);
	}
	static afficherMessageConfirmation(e, t, n, r, i) {
		xxDialog.afficherMessageConfirmation(e, t, n, r, i);
	}
	static afficherErreurConfirmation(e, t, n, r) {
		xxDialog.afficherErreurConfirmation(e, t, n, r);
	}
	static afficherMessageConfirmationPromise(e, t, n, r) {
		return xxDialog.afficherMessageConfirmationPromise(e, t, n, r);
	}
	static IsMailValid(e) {
		var t = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		let n;
		return n = !!e.match(t), n;
	}
	static DateToFrenchDateString(e, t, n) {
		var r = "", i = DateSerialisable.getJours(e);
		r += i < 10 ? "0" + i : i;
		var i = DateSerialisable.getMois(e) + 1;
		return r += "/" + (i < 10 ? "0" + i : i), r += "/" + DateSerialisable.getAnnees(e), t && (r += " " + this.DateToFrenchTimeString(e, n)), r;
	}
	static DateToFrenchTimeString(e, t) {
		var n = "", r = DateSerialisable.getHeures(e);
		n += r < 10 ? "0" + r : r;
		var r = DateSerialisable.getMinutes(e);
		if (n += ":" + (r < 10 ? "0" + r : r), t) {
			var r = DateSerialisable.getSecondes(e);
			n += ":" + (r < 10 ? "0" + r : r);
		}
		return n;
	}
	static compareArrays(e, t) {
		if (!e && !t) return !0;
		if (!e && t || e && !t || e.length != t.length) return !1;
		for (var n = 0, r = e.length; n < r; n++) if (e[n] instanceof Array && t[n] instanceof Array) {
			if (!this.compareArrays(e[n], t[n])) return !1;
		} else if (e[n] != t[n]) return !1;
		return !0;
	}
	static getUrlParameter(t) {
		return e.getUrlParameterFromString(window.location.search.substring(1), t, !0);
	}
	static getUrlParameterFromString(e, t, n) {
		var r = e;
		n && (r = decodeURIComponent(r));
		var i = r.split("&"), a, o;
		for (o = 0; o < i.length; o++) if (a = i[o].split("="), a[0] === t) return a[1] === void 0 ? "true" : a[1];
	}
	removeParamFromHref(e, t) {
		var n = e.indexOf(t + "=");
		if (n > 0) {
			var r = e.indexOf("&", n + 1);
			e = r > 0 ? e.replace(e.substr(n - 1, 1) == "?" ? e.substring(n, r + 1) : e.substring(n - 1, r), "") : e.replace(e.substr(n - 1), "");
		}
		return e;
	}
	static guid() {
		function e() {
			return Math.floor((1 + Math.random()) * 65536).toString(16).substring(1);
		}
		return e() + e() + "-" + e() + "-" + e() + "-" + e() + "-" + e() + e() + e();
	}
	static replaceUrlParam(e, t, n) {
		n ??= "";
		var r = RegExp("\\b(" + t + "=).*?(&|$)");
		return e.search(r) >= 0 ? e.replace(r, "$1" + n + "$2") : e + (e.indexOf("?") > 0 ? "&" : "?") + t + "=" + n;
	}
	static async inclureLibrairie(t) {
		let n = e.convertDevUrlToRelativeUrl(xClass.config.jsDependencyPath), r = "";
		xClass.localConfig.fileCacheTag != null && (r = "?" + xClass.localConfig.fileCacheTag);
		let i = t.split(" ");
		for (let e of i) await this.inclureFichier(ETypeFichier.JavaScript, n + e + r);
	}
	static async inclureFichier(e, t) {
		return new Promise((n, r) => {
			let i;
			switch (e) {
				case ETypeFichier.JavaScript:
					i = document.createElement("script"), i.setAttribute("type", "text/javascript"), i.setAttribute("src", t), document.getElementsByTagName("head")[0].appendChild(i), i.addEventListener("load", () => {
						n(), console.log("load", t);
					}), i.addEventListener("error", (e) => {
						r("Failed to load the file " + t), console.log("erreur", t);
					});
					break;
				case ETypeFichier.CSS:
					i = document.createElement("link"), i.setAttribute("type", "text/css"), i.setAttribute("rel", "stylesheet"), i.setAttribute("href", t), i.setAttribute("media", "print"), i.setAttribute("onload", "this.media='all'"), document.getElementsByTagName("head")[0].appendChild(i), n();
					break;
			}
		});
	}
	static rechercheString(e, t) {
		let n = !1, r = this;
		return e != null && t.forEach(function(t) {
			t != null && !n && (n = r.setTextPourRecherche(t).indexOf(r.setTextPourRecherche(e)) >= 0);
		}), n;
	}
	static rechercheStringofString(e, t) {
		let n = this, r = n.setTextPourRecherche(t).indexOf(n.setTextPourRecherche(e));
		return r >= 0 ? t.substring(r, r + e.length) : null;
	}
	static setTextPourRecherche(e) {
		for (var t = [
			/[\xc0-\xc6]/g,
			/[\xe0-\xe6]/g,
			/[\xc8-\xcb]/g,
			/[\xe8-\xeb]/g,
			/[\xcc-\xcf]/g,
			/[\xec-\xef]/g,
			/[\xd2-\xd8]/g,
			/[\xf2-\xf8]/g,
			/[\xd9-\xdc]/g,
			/[\xf9-\xfc]/g,
			/[\xd1]/g,
			/[\xf1]/g,
			/[\xc7]/g,
			/[\xe7]/g
		], n = [
			"A",
			"a",
			"E",
			"e",
			"I",
			"i",
			"O",
			"o",
			"U",
			"u",
			"N",
			"n",
			"C",
			"c"
		], r = 0; r < t.length; r++) e = e.replace(t[r], n[r]);
		return e.toUpperCase();
	}
	static rechercheStringTous(t, n) {
		return t.every((t) => e.rechercheString(t, n));
	}
	static rechercheStringUnParmiTous(t, n) {
		return t.some((t) => e.rechercheString(t, n));
	}
	static getLocalStorage(e) {
		return this.GetElement(e, ETypeStorage.Local);
	}
	static setLocalStorage(e, t) {
		this.UpdateElement(e, t, ETypeStorage.Local);
	}
	static delLocalStorage(e, t) {
		this.RemoveElement(e, ETypeStorage.Local);
	}
	static getSessionStorage(e) {
		return this.GetElement(e, ETypeStorage.Session);
	}
	static setSessionStorage(e, t) {
		this.UpdateElement(e, t, ETypeStorage.Session);
	}
	static delSessionStorage(e) {
		this.RemoveElement(e, ETypeStorage.Session);
	}
	static UpdateElement(e, t, n = ETypeStorage.Session) {
		this.RemoveElement(e, n), this.AddElement(e, t, n);
	}
	static AddElement(e, t, n = ETypeStorage.Session) {
		n == ETypeStorage.Session ? sessionStorage.setItem(e, t) : localStorage.setItem(e, t);
	}
	static RemoveElement(e, t = ETypeStorage.Session) {
		t == ETypeStorage.Session ? sessionStorage.removeItem(e) : localStorage.removeItem(e);
	}
	static GetElement(e, t = ETypeStorage.Session) {
		return t == ETypeStorage.Session ? sessionStorage.getItem(e) : localStorage.getItem(e);
	}
	static IndenterJs(e) {
		return js_beautify(e, {
			indent_size: 4,
			indent_char: " ",
			max_preserve_newlines: 2,
			preserve_newlines: !0,
			keep_array_indentation: !1,
			break_chained_methods: !1,
			indent_scripts: "normal",
			brace_style: "collapse",
			space_before_conditional: !0,
			unescape_strings: !1,
			jslint_happy: !1,
			end_with_newline: !1,
			wrap_line_length: 0,
			indent_inner_html: !1,
			comma_first: !1,
			e4x: !1
		});
	}
	static async readClipboard() {
		return navigator.clipboard.readText();
	}
	static copyToClipboard(t) {
		let n = document.createElement("textarea");
		n.value = t, n.setAttribute("readonly", ""), n.style.position = "absolute", n.style.left = "1px", document.body.appendChild(n), n.select(), document.execCommand("copy"), document.body.removeChild(n), e.afficherMessageAlertifyLocaliseSuccess("Copié dans le presse papiers");
	}
	static addKeyupEvent(t) {
		if (e.ListKeyUpEventsCallback ??= [], !e.ListKeyUpEventsCallback.some((e) => e.IsKeyEvent(t.keyEvent))) {
			let n = new eventKey(t.keyCode, t.keyEvent, t.callBack);
			e.ListKeyUpEventsCallback.push(n), window.addEventListener("keyup", n.eventListener, !1);
		}
	}
	static addKeydownEvent(t) {
		if (e.ListKeydownEventsCallback ??= [], !e.ListKeydownEventsCallback.some((e) => e.IsKeyEvent(t.keyEvent))) {
			let n = new eventKey(t.keyCode, t.keyEvent, t.callBack);
			e.ListKeydownEventsCallback.push(n), window.addEventListener("keydown", n.eventListener, !1);
		}
	}
	static removeKeyupEvent(t) {
		if (e.ListKeyUpEventsCallback != null) {
			let n = e.ListKeydownEventsCallback.filter((e) => e.IsKeyEvent(t));
			n != null && n.length > 0 && window.removeEventListener("keyup", n[0].eventListener, !1);
		}
	}
	static afficherMessageErreurLicence(e = null) {
		let t = new xLString("La licence {0} nécessaire à l'affichage de ce contenu n'est pas présente sur votre version d'Emed. Veuillez prendre contact avec votre référent.").format([e != null && e != "" ? "(" + e + ") " : ""]);
		new xxBloqueEcran({
			class: "ErreurLicence",
			textLocalise: t
		});
	}
	static afficherMessageErreurPage(e = null) {
		let t = new xLString("Vous ne disposez pas des droits nécessaires à l'affichage de cette page.").format([e != null && e != "" ? "(" + e + ") " : ""]);
		new xxBloqueEcran({
			class: "ErreurLicence",
			textLocalise: t
		});
	}
	static Notification = {
		throwSimpleEvent: (t, n, r) => e.notificationFullDom(t, n, [{
			data: Date.now(),
			clefEvenement: r
		}]),
		throwMultiSimpleEvent: (t, n, r) => e.notificationFullDom(t, n, r.map((e) => ({
			data: Date.now(),
			clefEvenement: e
		}))),
		listenSimpleEvent: (t, n, r, i) => e.notificationListener(t, n, r, i),
		listenOnlySimpleEvent: (t, n, r) => e.notificationListenerPur(t, n, r),
		createNewId: () => Math.random()
	};
	static notificationListenerPur(t, n, r) {
		return e.notificationListener(null, t, n, r);
	}
	static notificationListener(e, t, n, r) {
		if (typeof BroadcastChannel > "u") return window.addEventListener("storage", (i) => {
			if (i.key == t + "_" + n) {
				let t = i.newValue, n = null;
				t != null && (n = JSON.parse(t)), (e == null || n.source != e) && r(n == null ? null : n.data, e);
			}
		}), () => {};
		{
			let i = new BroadcastChannel(t + "_" + n);
			return i.onmessage = (t) => {
				console.log(t);
				let n = t.data, i = null;
				n != null && (i = JSON.parse(n)), (e == null || i.source != e) && r(i == null ? null : i.data, e);
			}, () => {
				i?.close();
			};
		}
	}
	static notificationFullDom(t, n, r) {
		return e.notificationFullDomByMessage(r.map((e) => ({
			source: t,
			evenement: n,
			data: e.data,
			clefEvenement: e.clefEvenement
		})));
	}
	static notificationFullDomByMessage(e) {
		if (typeof BroadcastChannel > "u") {
			var t = window.open("", "myWindow", "width=10,height=10");
			e.forEach((e) => {
				t.localStorage.setItem(e.evenement + "_" + e.clefEvenement, JSON.stringify(e));
			}), t.close();
		} else e.forEach((e) => {
			new BroadcastChannel(e.evenement + "_" + e.clefEvenement).postMessage(JSON.stringify(e));
		});
	}
	static attachToHead(e) {
		document.head.append(e);
	}
	static attachToBody(e) {
		document.body.append(e);
	}
	static compareVersions(e, t) {
		let n, r, i = /(\.0+)+$/, a = e.replace(i, "").split("."), o = t.replace(i, "").split("."), s = Math.min(a.length, o.length);
		for (n = 0; n < s; n++) if (r = parseInt(a[n], 10) - parseInt(o[n], 10), r) return r;
		return a.length - o.length;
	}
	static hasFocus(e) {
		return document.activeElement === e.y;
	}
	static afficheDate(e, t) {
		e != null && t.xxLabel({ textVariable: DateSerialisable.tolocalStringOnlyDate(e) });
	}
	static afficheDateEtHeure(e, t) {
		e != null && t.xxLabel({ textVariable: DateSerialisable.tolocalStringWithoutSeconds(e) });
	}
	static ToStringDateHeure(e) {
		return e == null ? "" : DateSerialisable.tolocalstringHeureMinute(e);
	}
	static ToStringDate(e) {
		return e == null ? "" : DateSerialisable.tolocalStringOnlyDate(e);
	}
	static printDate(e) {
		let t = "";
		return e != null && (t = DateSerialisable.tolocalstringHeureMinute(e)), t;
	}
	static printDateHeure(e) {
		let t = "";
		return e != null && (t = DateSerialisable.tolocalStringWithoutSeconds(e)), t;
	}
	static getCssClassByDiviceType() {
		let e = navigator.userAgent;
		return /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(e) ? "tablet-device" : /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(e) ? "mobile-device" : desktopDevice;
	}
	static isMobile() {
		let t = e.getCssClassByDiviceType() != desktopDevice;
		return !t && window.innerWidth <= 1024 ? !0 : t;
	}
	static base64ToUint8Array(e) {
		for (var t = atob(e), n = new Uint8Array(t.length), r = 0; r < t.length; r++) n[r] = t.charCodeAt(r);
		return n;
	}
	static isNullOrEmpty(e) {
		return !(e && e.length > 0);
	}
	static IsNullOrEmpty(t) {
		return e.isNullOrEmpty(t);
	}
	static InsertAt(e, t, n) {
		var r = e;
		return t >= 0 && t < this.length && (r = [
			e.slice(0, t),
			n,
			e.slice(t)
		].join("")), r;
	}
	static doubleToString = function(e) {
		return e || "";
	};
	static isHttps() {
		return document.location.protocol == "https:";
	}
	static async sleep(e) {
		await new Promise((t) => setTimeout(t, e));
	}
	static distinct(e) {
		return e.filter((e, t, n) => n.findIndex((t) => t === e) === t);
	}
}, xCache = class e {
	static getVariable(e) {
		try {
			return window.top["cache_emed_" + e];
		} catch {
			console.log("impossible de lire les variables du window.top");
		}
	}
	static setVariable(e, t) {
		try {
			var n = window.top;
			n["cache_emed_" + e] = t;
		} catch {
			console.log("impossible d'écrires les variables du window.top");
		}
	}
	static deleteVariable(e) {
		try {
			var t = window.top;
			delete t["cache_emed_" + e];
		} catch {
			console.log("impossible d'écrires les variables du window.top");
		}
	}
	static getFromSession(t) {
		return e.getVariable(t);
	}
	static setFromSession(t, n) {
		return e.setVariable(t, n);
	}
	static genericCache(e, t, n, r, i) {
		let a = this, o = "genericCache_" + e;
		if (a.getVariable(o) == null) {
			let s = new Promise(function(o, s) {
				let c = n();
				if (c != null) o(c);
				else {
					let n = a.getVariable(e);
					n == null ? (console.log("chargement par fetch"), t(i).then(function(t) {
						a.setVariable(e, t), r(t), o(t);
					})) : (r(n), o(n));
				}
			});
			a.setVariable(o, s);
		}
		return a.getVariable(o);
	}
	static resetDico(e) {
		this.deleteVariable(e);
	}
	static getDicoWithDelete(t, n) {
		return {
			data: e.genericCache(t.nomVariableUnique, (e) => (t.promesseNePasInitiliaser ?? (t.promesseNePasInitiliaser = t.chargeurSimple(e), console.info("Chargement des services depuis le serveur")), t.promesseNePasInitiliaser), () => (console.info("Chargement des services depuis DataCache"), t.dicoNePasInitiliaser), (e) => {
				t.dicoNePasInitiliaser = e;
			}, n),
			reset: () => {
				t.dicoNePasInitiliaser = null, t.promesseNePasInitiliaser = null, e.deleteVariable(t.nomVariableUnique);
			}
		};
	}
	static getDico(e, t) {
		return this.getDicoWithDelete(e, t).data;
	}
	static _dicoRessource;
	static get dicoRessources() {
		if (e._dicoRessource == null) if (e._dicoRessource = e.getVariable("dicoRessources"), e._dicoRessource == null) {
			if (xClass.config == null) return {};
			xClass.config.langDictionaryData == null ? e._dicoRessource = xRequire(xOutils$1.convertDevUrlToRelativeUrl(xClass.config.langDictionaryUrl)) : e._dicoRessource = xClass.config.langDictionaryData, e.setVariable("dicoRessources", e._dicoRessource), e._dicoRessource ?? alert("impossible de charger le dictionnaire");
		} else console.log("chargement dico par top");
		return this._dicoRessource;
	}
	static _debugMode;
	static get debugMode() {
		return e._debugMode ?? (e._debugMode = xClass.localConfig.debug, e._debugMode ??= !1), e._debugMode;
	}
	static setTraductionManquante(e, t) {
		if (xClass.config != null) return xClass.config.missingTranslationCallback(e, t);
	}
}, xLString$1 = class {
	_text;
	code;
	get text() {
		return this._text;
	}
	constructor(e) {
		let t = this;
		e ??= "";
		let n = "", r = "", i = !1;
		for (let t = 0; t < e.length; t++) {
			let a = e[t];
			a == " " || a == "	" || a == "\n" || a == "\r" || a == ":" ? i ? r += a : n += a : (i = !0, r = "");
		}
		if (e.length > 0 && i) {
			let i = null;
			if (e.length > 200) {
				try {
					i = (/* @__PURE__ */ Error()).stack.toString();
				} catch {}
				xCache.setTraductionManquante(e, i), t._text = e;
			} else {
				t.code = e.substring(n.length, e.length - r.length);
				let a;
				if (a = xCache.dicoRessources[t.code], a === null) t._text = n + t.code + r;
				else if (a === void 0) {
					xCache.dicoRessources[t.code] = null, t._text = n + t.code + r;
					try {
						i = (/* @__PURE__ */ Error()).stack.toString();
					} catch {}
					xCache.setTraductionManquante(t.code, i);
				} else t._text = n + a + r;
			}
		} else t._text = "";
	}
	format(e) {
		let t = "";
		return t = this.text, e != null && e.length > 0 && e.forEach((e, n) => {
			e != null && (t = t.replace("{" + n + "}", e.toString()));
		}), t;
	}
};
//#endregion
//#region V2/xDomUtils.ts
function addClass(e, t) {
	e.split(" ").forEach((e) => {
		t?.y?.classList.add(e);
	});
}
function removeClass(e, t) {
	e.split(" ").forEach((e) => {
		t?.y?.classList.remove(e);
	});
}
function isCouleurHexa(e) {
	if (e) e = e.replace("#", "");
	else return !1;
	return e.length == 6;
}
function getLuminositeCouleurHexa(e) {
	if (isCouleurHexa(e)) {
		e = e.replace("#", "");
		let t = parseInt(e.substr(0, 2), 16), n = parseInt(e.substr(2, 2), 16), r = parseInt(e.substr(4, 2), 16);
		return Math.round(Math.sqrt(t * t * .241 + n * n * .691 + r * r * .068));
	}
	return -1;
}
function eclaicirAssombrirDecimal(e, t, n) {
	let r = e;
	return e <= 255 && e >= 0 && (r += t * ((n ? 255 : 0) - e) / 100, r = Math.round(r), r > 255 ? r = 255 : r < 0 && (r = 0)), r;
}
function eclaicirCouleurHex(e, t) {
	if (!isCouleurHexa(e)) return null;
	if (e = e.replace("#", ""), t = Math.max(0, Math.min(100, t)), e.length >= 6) {
		let n = eclaicirAssombrirDecimal(parseInt(e.slice(0, 2), 16), t, !0), r = eclaicirAssombrirDecimal(parseInt(e.slice(2, 4), 16), t, !0), i = eclaicirAssombrirDecimal(parseInt(e.slice(4, 6), 16), t, !0);
		if (!isNaN(n) && !isNaN(r) && !isNaN(i)) return n.toString(16) + r.toString(16) + i.toString(16);
	}
	return e;
}
function setCouleurFond(e, t, n, r = !1, i = !0) {
	if (isCouleurHexa(t)) {
		if (t = t.replace("#", ""), n != null) if (n = Math.max(0, Math.min(100, n)), !r) t = eclaicirCouleurHex(t, n);
		else {
			let e = Math.round(n * 255 / 100), r = n < 7 ? "0" + e.toString(16) : e.toString(16);
			t += r;
		}
		e.y.style.backgroundColor = "#" + t, i && addClass("couleurFondDynamique", e);
	}
}
function setCouleurTexte(e, t) {
	isCouleurHexa(t) && (e.y.style.color = "#" + t, addClass("couleurTexteDynamique", e));
}
function supprimerCouleurFond(e) {
	removeClass("couleurAutoBlanc couleurAutoNoir couleurFondDynamique", e), e.y.style.backgroundColor = "transparent";
}
function setCouleurFondAvecContrasteTexteAuto(e, t, n, r = !1, i = !0) {
	t = isCouleurHexa(t) ? t.replace("#", "") : "F1F1F1", n != null && (n = Math.max(0, Math.min(100, n)), r || (t = eclaicirCouleurHex(t, n), n = null)), setCouleurFond(e, t, n, r, i);
	let a = getLuminositeCouleurHexa(t);
	removeClass("couleurAutoBlanc couleurAutoNoir", e), addClass(n > 70 && r || a < 155 ? "couleurAutoBlanc" : "couleurAutoNoir", e);
}
function AppliquerOptionsAffichage(e, t) {
	!t || !e || (t.margin && setMargin(e, t.margin), t.padding && setPadding(e, t.padding), t.curseur && setCurseur(e, t.curseur), t.border && setBorder(e, t.border));
}
function SetCotesCss(e, t, n) {
	let r = e.y.style;
	t.Tous != null && (n ? r.padding = t.Tous + "px" : r.margin = t.Tous + "px"), t.HautEtBas == null ? (t.Haut != null && (n ? r.paddingTop = t.Haut + "px" : r.marginTop = t.Haut + "px"), t.Bas != null && (n ? r.paddingBottom = t.Bas + "px" : r.marginBottom = t.Bas + "px")) : n ? (r.paddingTop = t.HautEtBas + "px", r.paddingBottom = t.HautEtBas + "px") : (r.marginTop = t.HautEtBas + "px", r.marginBottom = t.HautEtBas + "px"), t.GaucheEtDroite == null ? (t.Droite != null && (n ? r.paddingRight = t.Droite + "px" : r.marginRight = t.Droite + "px"), t.Gauche != null && (n ? r.paddingLeft = t.Gauche + "px" : r.marginLeft = t.Gauche + "px")) : n ? (r.paddingRight = t.GaucheEtDroite + "px", r.paddingLeft = t.GaucheEtDroite + "px") : (r.marginRight = t.GaucheEtDroite + "px", r.marginLeft = t.GaucheEtDroite + "px");
}
function setMargin(e, t) {
	e && t && SetCotesCss(e, t, !1);
}
function setPadding(e, t) {
	e && t && SetCotesCss(e, t, !0);
}
function setCurseur(e, t) {
	!e || !t || (supprimerCurseur(e), t !== "default" && addClass("curseur-" + t, e));
}
function supprimerCurseur(e) {
	e && e.y.classList.forEach((t) => {
		t.startsWith("curseur-") && removeClass(t, e);
	});
}
function setBorder(e, t, n = "solid") {
	if (!e || !t) return;
	let r = e.y.style;
	t.Tous && (r.borderStyle = n, r.borderWidth = t.Tous + "px"), t.Haut && (r.borderTopWidth = t.Haut + "px", r.borderTopStyle = n), t.Bas && (r.borderBottomWidth = t.Bas + "px", r.borderBottomStyle = n), t.Droite && (r.borderRightStyle = n, r.borderRightWidth = t.Droite + "px"), t.Gauche && (r.borderLeftStyle = n, r.borderLeftWidth = t.Gauche + "px"), t.HautEtBas && (r.borderBottomStyle = r.borderTopStyle = n, r.borderBottomWidth = r.borderTopWidth = t.HautEtBas + "px"), t.GaucheEtDroite && (r.borderRightStyle = r.borderLeftStyle = n, r.borderRightWidth = r.borderLeftWidth = t.GaucheEtDroite + "px");
}
//#endregion
//#region xStaticFunctions.ts
function cacherxElements$1(e, t) {
	t ??= !1, e?.y != null && addClass(t ? "xdisabled" : "xInvisible", e);
}
function afficherxElements$1(e) {
	e?.y != null && removeClass("xdisabled xInvisible", e);
}
function viderxElements(e) {
	if (e?.y != null) for (; e.y.hasChildNodes();) e.y.removeChild(e.y.lastChild);
}
function assignerObjet$1(e, t) {
	if (typeof Object.assign != "function") {
		if (e == null) throw TypeError("Cannot convert undefined or null to object");
		let t = Object(e);
		for (var n = 1; n < arguments.length; n++) {
			var r = arguments[n];
			if (r != null) for (var i in r) Object.prototype.hasOwnProperty.call(r, i) && (t[i] = r[i]);
		}
		return t;
	} else return Object.assign(e, t);
}
function GetDateTimeFromFrenchDateString(e) {
	let t = null, n = Number(e.substr(0, 2)), r = Number(e.substr(3, 2)) - 1, i = Number(e.substr(6));
	return t = new Date(i, r, n), t.toLocaleDateString() != e && (t = new Date(i, r, n, 12)), t;
}
function xRequire$1(e) {
	let t;
	return t = $.ajax({
		type: "POST",
		url: e,
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		async: !1
	}), t.responseJSON.d;
}
//#endregion
//#region V2/xTime.ts
var xTime$1 = class {
	constructor(e, t) {
		this.Minutes = t % 60, this.Heures = e + Math.floor(t / 60);
	}
	parse(e) {
		if (e != null) {
			let t = e.split(":");
			t.length == 2 && (this.Heures = Number(t[0]), this.Minutes = Number(t[1]));
		}
	}
	minutes;
	get Minutes() {
		return this.minutes;
	}
	set Minutes(e) {
		if (e < 60 && e >= 0) this.minutes = e;
		else throw "nb minutes invalide";
	}
	heures;
	get Heures() {
		return this.heures;
	}
	set Heures(e) {
		if (e < 24 && e >= 0) this.heures = e;
		else throw "nb heures invalide";
	}
	getString() {
		let e, t;
		return e = this.Minutes >= 10 ? "" + this.Minutes : "0" + this.Minutes, t = this.Heures >= 10 ? "" + this.Heures : "0" + this.Heures, t + ":" + e;
	}
	get TotalMinutes() {
		return this.Heures * 60 + this.Minutes;
	}
}, xMaths = class {
	static PPCM(e, t) {
		if (e == 0 || t == 0) throw "Le paramètre a ou b est égal à 0.";
		return e == t ? e : e * t / this.PGCD(e, t);
	}
	static PGCD(e, t) {
		let n, r, i = e, a = t;
		for (; a != 0;) n = i % a, i = a, a = n;
		return r = i, r;
	}
	static PPCMListe(e) {
		let t = 1;
		for (let n = 1; n < e.length; n++) t = n == 1 ? this.PPCM(e[n - 1], e[n]) : this.PPCM(t, e[n]);
		return t;
	}
	static PGCDListe(e) {
		let t = 1;
		for (let n = 1; n < e.length; n++) t = n == 1 ? this.PGCD(e[n - 1], e[n]) : this.PGCD(t, e[n]);
		return t;
	}
	static exactPlus(e, t, n) {
		let r = String(e), i = String(t), a = r.split("."), o = i.split("."), s = 0;
		s = a.length > 1 ? o.length > 1 ? a[1].length > o[1].length ? a[1].length : o[1].length : a[1].length : o.length > 1 ? o[1].length : 0;
		let c = Number(e) + Number(t), l = 10 ** s;
		return parseFloat((Math.round(c * l) / l).toFixed(n));
	}
	static exactMoins(e, t, n) {
		let r = String(e), i = String(t), a = r.split("."), o = i.split("."), s = 0;
		s = a.length > 1 ? o.length > 1 ? a[1].length > o[1].length ? a[1].length : o[1].length : a[1].length : o.length > 1 ? o[1].length : 0;
		let c = Number(e) - Number(t), l = 10 ** s;
		return parseFloat((Math.round(c * l) / l).toFixed(n));
	}
	static isNumericDigit(e) {
		if (e != null && e.length == 1) switch (e) {
			case "0":
			case "1":
			case "2":
			case "3":
			case "4":
			case "5":
			case "6":
			case "7":
			case "8":
			case "9": return !0;
			default: return !1;
		}
		return !1;
	}
	static isNumeric(e) {
		return !isNaN(parseFloat(e)) && isFinite(parseInt(e)) && parseInt(e).toString() == e;
	}
}, xElementHolder = class e {
	_y;
	constructor(e) {
		this._y = e.y;
	}
	cacher(t) {
		let n = this;
		return cacherxElements$1(e.fromHtmlElement(n.y), t), n;
	}
	get y() {
		return this._y;
	}
	afficher() {
		let t = this;
		return afficherxElements$1(e.fromHtmlElement(t.y)), t;
	}
	appendMany(e) {
		return e.forEach((e) => {
			this.append(e);
		}), this;
	}
	append(e) {
		return this.y?.append(e?.y), this;
	}
	empty() {
		return this.vider();
	}
	vider() {
		if (this.y != null) for (; this.y.hasChildNodes();) this.y.removeChild(this.y.lastChild);
		return this;
	}
	addClass(e) {
		return this.y.className = this.y.className + " " + e, this;
	}
	hasClass(e) {
		return this.y.classList.contains(e);
	}
	setAttribute(e, t) {
		this.y.setAttribute(e, t);
	}
	getAttribute(e) {
		return this.y.getAttribute(e);
	}
	toggleClass(e, t) {
		return e.split(" ").forEach((e) => {
			this.y.classList.toggle(e, t);
		}), this;
	}
	removeClass(e) {
		return e.split(" ").forEach((e) => {
			this.y.classList.remove(e);
		}), this;
	}
	static fromHtmlElement(t) {
		return new e({ y: t });
	}
	static fromSVGElement(t) {
		return new e({ y: t });
	}
}, xElement = class {
	elem;
	get y() {
		return this.elem;
	}
	width(e) {
		let t = this;
		if (e != null) $(t.y).width(e);
		else return $(t.y).width();
	}
	height(e) {
		let t = this;
		if (e != null) $(t.y).height(e);
		else return $(t.y).height();
	}
	hasClass(e) {
		return this.elem.classList.contains(e);
	}
	addClass(e) {
		let t = this;
		return t.hasClass(e) || (t.elem.className += " " + e), t;
	}
	cacher(e) {
		cacherxElements$1(this, e);
	}
	afficher() {
		afficherxElements$1(this);
	}
	static setCouleurFondAvecContrasteTexteAuto(e, t) {
		setCouleurFondAvecContrasteTexteAuto(e, t);
	}
	removeClass(e) {
		let t = this;
		return e.split(" ").forEach((e) => {
			e != "" && t.elem.classList.remove(e);
		}), t;
	}
	toggleClass(e, t) {
		let n = this;
		return e.split(" ").forEach((e) => {
			e != "" && n.elem.classList.toggle(e, t);
		}), n;
	}
	static isChildOf(e, t) {
		let n = e;
		for (; n.parentElement != null;) {
			if (n.parentElement == t) return !0;
			n = n.parentElement;
		}
		return !1;
	}
	_dropActive = !1;
	constructor(e, t) {
		let n = this, r = "move";
		if (t?.drag?.dropAction != null) switch (t.drag.dropAction) {
			case "copie":
				r = "copy";
				break;
			case "lien":
				r = "link";
				break;
			case "deplacement":
				r = "move";
				break;
		}
		let i;
		t?.privateForceElement == null ? n.elem = document.createElement(e) : n.elem = t.privateForceElement, t != null && (t.id != null && (n.elem.id = t.id), t.click != null && (i = t.click, delete t.click, n.elem.addEventListener("click", (e) => {
			i(e);
		})), t.class != null && t.class != null && n.addClass(t.class), t.idTest != null && n.elem.setAttribute("data-id-test", t.idTest), t.autocomplete && n.elem.setAttribute("autocomplete", t.autocomplete), t?.drag?.dragKey && (n.elem.draggable = !0), t?.drag?.dragKey != null && t?.drag?.dragKey != null && n.elem.addEventListener("dragstart", (e) => {
			e.dataTransfer.setData("text", t.drag.dragKey());
		}), t?.drag?.drop != null && t?.drag?.drop != null && (n.elem.addEventListener("drop", (e) => {
			console.log("drop"), t.drag.drop(e.dataTransfer.getData("text")), n.removeClass("isCibleDrop");
		}), n.elem.addEventListener("dragenter", (e) => {
			console.log("dragenter"), n._dropActive ||= (n.addClass("isCibleDrop"), !0);
		}), n.elem.addEventListener("dragleave", (e) => {
			n.removeClass("isCibleDrop"), n._dropActive = !1, console.log("dragleave");
		}), n.elem.addEventListener("dragover", (e) => {
			e.preventDefault(), e.dataTransfer.dropEffect = r, console.log("dragover"), n._dropActive ||= (n.addClass("isCibleDrop"), !0);
		}), n.elem.addEventListener("dragend", (e) => {
			console.log("dragend"), n.removeClass("isCibleDrop");
		})), n.addClass(xClass.Theme).addClass(xClass.ThemeLuminosite));
	}
}, xDiv$1 = class e extends xElement {
	xh;
	get asHolder() {
		return this.xh ??= new xElementHolder(this), this.xh;
	}
	constructor(e) {
		e?.privateForceElement;
		let t;
		e != null && (e.textVariable != null && (t = e.textVariable), e.textLocalise != null && (t = new xLString$1(e.textLocalise).text), delete e.textLocalise, delete e.textVariable), super("div", e), t != null && (this.y.innerHTML = t), e != null && e.title != null && (this.y.title = e.title);
	}
	static FromDom(t) {
		return new e({ privateForceElement: t });
	}
	setTitle(e) {
		let t = this;
		t.y.title = e;
	}
	hideDiv(e) {
		let t = this;
		return cacherxElements$1(t, e ?? !0), t;
	}
	cacher(e) {
		let t = this;
		return cacherxElements$1(t, e ?? !0), t;
	}
	showDiv() {
		let e = this;
		return afficherxElements$1(e), e;
	}
	afficher() {
		let e = this;
		return afficherxElements$1(e), e;
	}
	vider() {
		let e = this;
		return viderxElements(e), e;
	}
	width(e) {
		let t = this;
		if (e != null) $(t.y).width(e);
		else return $(t.y).width();
	}
	contentsWidth() {
		let e = this;
		return $(e.y).contents().width();
	}
	contentsHeight() {
		let e = this;
		return $(e.y).contents().height();
	}
	height(e) {
		let t = this;
		if (e != null) $(t.y).height(e);
		else return $(t.y).height();
	}
}, enumSVGTaille = /* @__PURE__ */ function(e) {
	return e[e.xxs = 0] = "xxs", e[e.xs = 1] = "xs", e[e.s = 2] = "s", e[e.m = 3] = "m", e[e.l = 4] = "l", e[e.custom = 5] = "custom", e;
}({}), enumSVGOrientation = /* @__PURE__ */ function(e) {
	return e[e.Left = 0] = "Left", e[e.Right = 1] = "Right", e[e.Top = 2] = "Top", e[e.Bottom = 3] = "Bottom", e[e.custom = 4] = "custom", e;
}({}), xSVG = class {
	get y() {
		return this.svge;
	}
	tailleSvg;
	widthCustom;
	heightCustom;
	class;
	svge;
	constructor(e) {
		let t = this;
		switch (t.svge = document.createElementNS("http://www.w3.org/2000/svg", "svg"), e.id != null && (t.svge.id = e.id), t.tailleSvg = e.size, t.tailleSvg ??= tailleIcone$1.M, t.class = "xSVG", e.class != null && (t.class += " " + e.class), t.tailleSvg) {
			case tailleIcone$1.XXS:
				t.class += " svg_xxs";
				break;
			case tailleIcone$1.XS:
				t.class += " svg_xs";
				break;
			case tailleIcone$1.S:
				t.class += " svg_s";
				break;
			case tailleIcone$1.M:
				t.class += " svg_m";
				break;
			case tailleIcone$1.L:
				t.class += " svg_l";
				break;
			case tailleIcone$1.XL:
				t.class += " svg_xl";
				break;
			case tailleIcone$1.Custom:
				t.class += " svg_custom", t.heightCustom = e.heightCustom, t.widthCustom = e.widthCustom;
				break;
		}
		t.widthCustom != null && t.svge.setAttribute("width", t.widthCustom.toString()), t.heightCustom != null && t.svge.setAttribute("height", t.heightCustom.toString()), t.class != null && t.class.split(" ").forEach((e) => {
			t.svge.classList.add(e);
		}), e.viewBoxContains != null && e.viewBoxContains != "" && t.svge.setAttribute("viewBox", e.viewBoxContains), e.cssContains != null && (t.svge.innerHTML += "<style type=\"text/css\">" + e.cssContains + "</style>"), e.contains != null && (t.svge.innerHTML += e.contains);
	}
	getClasse() {
		return this.getClass();
	}
	getClass() {
		return this.class;
	}
}, enumIconeCs3i$1 = /* @__PURE__ */ function(e) {
	return e[e.aucun = 0] = "aucun", e[e.action_admission = 1] = "action_admission", e[e.action_agrandir = 2] = "action_agrandir", e[e.action_agrandir_horizontal = 3] = "action_agrandir_horizontal", e[e.action_ajout_destinataire = 4] = "action_ajout_destinataire", e[e.action_ajouter = 5] = "action_ajouter", e[e.action_ajouter_blanc = 6] = "action_ajouter_blanc", e[e.action_ajouter_valider = 7] = "action_ajouter_valider", e[e.action_annuler = 8] = "action_annuler", e[e.action_annuler_blanc = 9] = "action_annuler_blanc", e[e.action_annuler_cercle = 10] = "action_annuler_cercle", e[e.action_apercu = 11] = "action_apercu", e[e.action_apercu_doc = 12] = "action_apercu_doc", e[e.action_apercu_historique = 13] = "action_apercu_historique", e[e.action_apercu_live = 14] = "action_apercu_live", e[e.action_arret = 15] = "action_arret", e[e.action_associer = 16] = "action_associer", e[e.action_baguette_auto = 17] = "action_baguette_auto", e[e.action_bouton_play = 18] = "action_bouton_play", e[e.action_carte_praticien = 19] = "action_carte_praticien", e[e.action_carte_visite_med = 20] = "action_carte_visite_med", e[e.action_changement_lit = 21] = "action_changement_lit", e[e.action_checkbox_active = 22] = "action_checkbox_active", e[e.action_checkbox_inactive = 23] = "action_checkbox_inactive", e[e.action_coller = 24] = "action_coller", e[e.action_commentaire = 25] = "action_commentaire", e[e.action_copie_destinataire = 26] = "action_copie_destinataire", e[e.action_copier = 27] = "action_copier", e[e.action_copier_droite = 28] = "action_copier_droite", e[e.action_copier_gauche = 29] = "action_copier_gauche", e[e.action_couper = 30] = "action_couper", e[e.action_csv = 31] = "action_csv", e[e.action_cv_creation_patient = 32] = "action_cv_creation_patient", e[e.action_deplier_blanc = 33] = "action_deplier_blanc", e[e.action_deplier_bleu = 34] = "action_deplier_bleu", e[e.action_desepingler = 35] = "action_desepingler", e[e.action_deverrouiller = 36] = "action_deverrouiller", e[e.action_dmp = 37] = "action_dmp", e[e.action_dossierpatient = 38] = "action_dossierpatient", e[e.action_dupliquer = 39] = "action_dupliquer", e[e.action_enregistrer = 40] = "action_enregistrer", e[e.action_enregistrer_imprimer = 41] = "action_enregistrer_imprimer", e[e.action_enregistrer_periode = 42] = "action_enregistrer_periode", e[e.action_envoi_message = 43] = "action_envoi_message", e[e.action_envoyer = 44] = "action_envoyer", e[e.action_epingler = 45] = "action_epingler", e[e.action_erreur = 46] = "action_erreur", e[e.action_espace_pro = 47] = "action_espace_pro", e[e.action_etat_dossier = 48] = "action_etat_dossier", e[e.action_filtres = 49] = "action_filtres", e[e.action_filtres_inactif = 50] = "action_filtres_inactif", e[e.action_filtres_options_actif = 51] = "action_filtres_options_actif", e[e.action_filtres_options_inactif = 52] = "action_filtres_options_inactif", e[e.action_flag_gris = 53] = "action_flag_gris", e[e.action_flag_rouge = 54] = "action_flag_rouge", e[e.action_fleche_angle_bas_droite = 55] = "action_fleche_angle_bas_droite", e[e.action_fleche_double_droite = 56] = "action_fleche_double_droite", e[e.action_fleche_double_gauche = 57] = "action_fleche_double_gauche", e[e.action_fleche_simple_droite = 58] = "action_fleche_simple_droite", e[e.action_fleche_simple_gauche = 59] = "action_fleche_simple_gauche", e[e.action_fractionner_ligne = 60] = "action_fractionner_ligne", e[e.action_gomme = 61] = "action_gomme", e[e.action_graphique = 62] = "action_graphique", e[e.action_historique = 63] = "action_historique", e[e.action_horaire = 64] = "action_horaire", e[e.action_import = 65] = "action_import", e[e.action_import_ajout = 66] = "action_import_ajout", e[e.action_importer = 67] = "action_importer", e[e.action_impression_cerfa = 68] = "action_impression_cerfa", e[e.action_imprimer = 69] = "action_imprimer", e[e.action_imprimer_blanc = 70] = "action_imprimer_blanc", e[e.action_imprimer_noir = 71] = "action_imprimer_noir", e[e.action_inconnu = 72] = "action_inconnu", e[e.action_info = 73] = "action_info", e[e.action_interdit = 74] = "action_interdit", e[e.action_lecture = 75] = "action_lecture", e[e.action_log = 76] = "action_log", e[e.action_masquer = 77] = "action_masquer", e[e.action_medecin_adresseur = 78] = "action_medecin_adresseur", e[e.action_medecin_traitant = 79] = "action_medecin_traitant", e[e.action_mise_en_page = 80] = "action_mise_en_page", e[e.action_modifier = 81] = "action_modifier", e[e.action_mssante = 82] = "action_mssante", e[e.action_ouvrir_boxer = 83] = "action_ouvrir_boxer", e[e.action_partage = 84] = "action_partage", e[e.action_pdf = 85] = "action_pdf", e[e.action_periode_heures = 86] = "action_periode_heures", e[e.action_personne_copie = 87] = "action_personne_copie", e[e.action_personne = 88] = "action_personne", e[e.action_planifier = 89] = "action_planifier", e[e.action_plier_blanc = 90] = "action_plier_blanc", e[e.action_plier_bleu = 91] = "action_plier_bleu", e[e.action_raccourci = 92] = "action_raccourci", e[e.action_rafraichir = 93] = "action_rafraichir", e[e.action_rafraichir_valider = 94] = "action_rafraichir_valider", e[e.action_rechercher = 95] = "action_rechercher", e[e.action_rechercher_dossier = 96] = "action_rechercher_dossier", e[e.action_rechercher_patient = 97] = "action_rechercher_patient", e[e.action_recycler = 98] = "action_recycler", e[e.action_reduire = 99] = "action_reduire", e[e.action_reduire_horizontal = 100] = "action_reduire_horizontal", e[e.action_reglage = 101] = "action_reglage", e[e.action_reset = 102] = "action_reset", e[e.action_retour = 103] = "action_retour", e[e.action_rotation = 104] = "action_rotation", e[e.action_saisie_facture = 105] = "action_saisie_facture", e[e.action_securiser_factures = 106] = "action_securiser_factures", e[e.action_sortie = 107] = "action_sortie", e[e.action_statistiques = 108] = "action_statistiques", e[e.action_supprimer_blanc = 109] = "action_supprimer_blanc", e[e.action_supprimer = 110] = "action_supprimer", e[e.action_telecharger_documents = 111] = "action_telecharger_documents", e[e.action_telecharger_package = 112] = "action_telecharger_package", e[e.action_teletransmission = 113] = "action_teletransmission", e[e.action_transferer = 114] = "action_transferer", e[e.action_tri_asc = 115] = "action_tri_asc", e[e.action_tri_defaut = 116] = "action_tri_defaut", e[e.action_tri_desc = 117] = "action_tri_desc", e[e.action_tri_principal_asc = 118] = "action_tri_principal_asc", e[e.action_tri_principal_desc = 119] = "action_tri_principal_desc", e[e.action_trois_colonnes = 120] = "action_trois_colonnes", e[e.action_urgent = 121] = "action_urgent", e[e.action_valider = 122] = "action_valider", e[e.action_valider_cercle = 123] = "action_valider_cercle", e[e.action_verification = 124] = "action_verification", e[e.action_verification_arl = 125] = "action_verification_arl", e[e.action_verification_noemie = 126] = "action_verification_noemie", e[e.action_verrouiller = 127] = "action_verrouiller", e[e.action_xls = 128] = "action_xls", e[e.action_zoom_ajuster_ecran = 129] = "action_zoom_ajuster_ecran", e[e.action_zoom_ajuster_largeur = 130] = "action_zoom_ajuster_largeur", e[e.action_zoom_moins = 131] = "action_zoom_moins", e[e.action_zoom_plus = 132] = "action_zoom_plus", e[e.admin_agendas = 133] = "admin_agendas", e[e.admin_dossier_patient = 134] = "admin_dossier_patient", e[e.admin_elsan = 135] = "admin_elsan", e[e.admin_etablissement = 136] = "admin_etablissement", e[e.admin_examens = 137] = "admin_examens", e[e.admin_hemo = 138] = "admin_hemo", e[e.admin_impression = 139] = "admin_impression", e[e.admin_maj = 140] = "admin_maj", e[e.admin_medicaments = 141] = "admin_medicaments", e[e.admin_outil = 142] = "admin_outil", e[e.admin_parametres = 143] = "admin_parametres", e[e.admin_parametres_simple = 144] = "admin_parametres_simple", e[e.admin_patient = 145] = "admin_patient", e[e.admin_pmsi = 146] = "admin_pmsi", e[e.admin_smartdoc = 147] = "admin_smartdoc", e[e.admin_soins = 148] = "admin_soins", e[e.admin_UF = 149] = "admin_UF", e[e.admin_urgences = 150] = "admin_urgences", e[e.admin_US = 151] = "admin_US", e[e.admin_user = 152] = "admin_user", e[e.agenda_ajouter = 153] = "agenda_ajouter", e[e.agenda_comparer = 154] = "agenda_comparer", e[e.agenda_importer = 155] = "agenda_importer", e[e.agenda_supprimer = 156] = "agenda_supprimer", e[e.agenda_synchroniser = 157] = "agenda_synchroniser", e[e.aide_aide = 158] = "aide_aide", e[e.alerte_grise = 159] = "alerte_grise", e[e.alerte_orange = 160] = "alerte_orange", e[e.alerte_rouge = 161] = "alerte_rouge", e[e.alerte_verte = 162] = "alerte_verte", e[e.basics_LinkBlanc = 163] = "basics_LinkBlanc", e[e.basics_liste_a_points_blanc = 164] = "basics_liste_a_points_blanc", e[e.basics_liste_a_points_noir = 165] = "basics_liste_a_points_noir", e[e.basics_UX_Mobile = 166] = "basics_UX_Mobile", e[e.basics_UX_Pc = 167] = "basics_UX_Pc", e[e.bdd = 168] = "bdd", e[e.carte_cartemagnetique = 169] = "carte_cartemagnetique", e[e.courrier_modele = 170] = "courrier_modele", e[e.courrier_modele_ajouter = 171] = "courrier_modele_ajouter", e[e.dds_bon_livraison_efs = 172] = "dds_bon_livraison_efs", e[e.dds_codes_barres = 173] = "dds_codes_barres", e[e.dds_destruction = 174] = "dds_destruction", e[e.dds_destruction_etablissement = 175] = "dds_destruction_etablissement", e[e.dds_poches_attentes_reception = 176] = "dds_poches_attentes_reception", e[e.dds_poches_retour_efs = 177] = "dds_poches_retour_efs", e[e.dds_poches_sorties_transfusion = 178] = "dds_poches_sorties_transfusion", e[e.dds_quarantaine = 179] = "dds_quarantaine", e[e.dds_reappro_stock_urgence = 180] = "dds_reappro_stock_urgence", e[e.dds_reattribution = 181] = "dds_reattribution", e[e.dds_reception = 182] = "dds_reception", e[e.dds_retour = 183] = "dds_retour", e[e.dds_sortie = 184] = "dds_sortie", e[e.dds_stats_detaillees = 185] = "dds_stats_detaillees", e[e.dds_stats_globales = 186] = "dds_stats_globales", e[e.dds_stock_en_cours = 187] = "dds_stock_en_cours", e[e.dds_transfusion_ajouter = 188] = "dds_transfusion_ajouter", e[e.dmp_notransmission = 189] = "dmp_notransmission", e[e.dmp_transmission = 190] = "dmp_transmission", e[e.document_document = 191] = "document_document", e[e.document_invalide = 192] = "document_invalide", e[e.document_valide = 193] = "document_valide", e[e.dossier_ajouter = 194] = "dossier_ajouter", e[e.dossier_lier = 195] = "dossier_lier", e[e.droits_ajouter_profil = 196] = "droits_ajouter_profil", e[e.droits_charger_profil = 197] = "droits_charger_profil", e[e.droits_enregistrer_user = 198] = "droits_enregistrer_user", e[e.entrepot_entrepot = 199] = "entrepot_entrepot", e[e.etat_administre = 200] = "etat_administre", e[e.etat_arrete = 201] = "etat_arrete", e[e.etat_arrete_modification = 202] = "etat_arrete_modification", e[e.etat_arrete_urgent = 203] = "etat_arrete_urgent", e[e.etat_encours = 204] = "etat_encours", e[e.etat_lock = 205] = "etat_lock", e[e.etat_non_vu = 206] = "etat_non_vu", e[e.etat_prevu = 207] = "etat_prevu", e[e.etat_suspendu = 208] = "etat_suspendu", e[e.etat_termine = 209] = "etat_termine", e[e.etat_vu = 210] = "etat_vu", e[e.examen_anormal = 211] = "examen_anormal", e[e.examen_reaffecter_resultat = 212] = "examen_reaffecter_resultat", e[e.facture_ajouter = 213] = "facture_ajouter", e[e.facture_liste = 214] = "facture_liste", e[e.favori_favoriOff = 215] = "favori_favoriOff", e[e.favori_favoriOn = 216] = "favori_favoriOn", e[e.fleche_blanche_bas = 217] = "fleche_blanche_bas", e[e.fleche_blanche_droite = 218] = "fleche_blanche_droite", e[e.fleche_blanche_gauche = 219] = "fleche_blanche_gauche", e[e.fleche_blanche_haut = 220] = "fleche_blanche_haut", e[e.fleche_bleue_bas = 221] = "fleche_bleue_bas", e[e.fleche_bleue_droite = 222] = "fleche_bleue_droite", e[e.fleche_bleue_gauche = 223] = "fleche_bleue_gauche", e[e.fleche_bleue_haut = 224] = "fleche_bleue_haut", e[e.fleche_noire_bas = 225] = "fleche_noire_bas", e[e.fleche_noire_droite = 226] = "fleche_noire_droite", e[e.fleche_noire_gauche = 227] = "fleche_noire_gauche", e[e.fleche_noire_haut = 228] = "fleche_noire_haut", e[e.graphiste_icone_a_creer = 229] = "graphiste_icone_a_creer", e[e.horloge_alerte = 230] = "horloge_alerte", e[e.horloge_attente = 231] = "horloge_attente", e[e.horloge_attente_blanc = 232] = "horloge_attente_blanc", e[e.horloge_attente_orange = 233] = "horloge_attente_orange", e[e.horloge_chrono = 234] = "horloge_chrono", e[e.horloge_duree = 235] = "horloge_duree", e[e.lang_ca = 236] = "lang_ca", e[e.lang_de = 237] = "lang_de", e[e.lang_fr = 238] = "lang_fr", e[e.lang_en = 239] = "lang_en", e[e.lang_es = 240] = "lang_es", e[e.liste_a_points = 241] = "liste_a_points", e[e.liste_a_points_noir = 242] = "liste_a_points_noir", e[e.liste_annuler = 243] = "liste_annuler", e[e.liste_coches = 244] = "liste_coches", e[e.liste_enregistrer = 245] = "liste_enregistrer", e[e.liste_importer = 246] = "liste_importer", e[e.liste_simple = 247] = "liste_simple", e[e.logo_elive = 248] = "logo_elive", e[e.logo_guacamole_francisco_de_mexico = 249] = "logo_guacamole_francisco_de_mexico", e[e.medicament_pharmacie = 250] = "medicament_pharmacie", e[e.menu_calendrier = 251] = "menu_calendrier", e[e.menu_informations = 252] = "menu_informations", e[e.menu_intervention = 253] = "menu_intervention", e[e.menu_troispoints = 254] = "menu_troispoints", e[e.menu_tuile_retour = 255] = "menu_tuile_retour", e[e.menu_tuile_vuedeservice = 256] = "menu_tuile_vuedeservice", e[e.nettoyer_balai = 257] = "nettoyer_balai", e[e.niveau_niveau1 = 258] = "niveau_niveau1", e[e.niveau_niveau2 = 259] = "niveau_niveau2", e[e.niveau_niveau3 = 260] = "niveau_niveau3", e[e.niveau_niveau4 = 261] = "niveau_niveau4", e[e.periodicite_casse = 262] = "periodicite_casse", e[e.periodicite_jour = 263] = "periodicite_jour", e[e.periodicite_mois = 264] = "periodicite_mois", e[e.periodicite_semaine = 265] = "periodicite_semaine", e[e.pharmacien_delai_depasse = 266] = "pharmacien_delai_depasse", e[e.phonetique_off = 267] = "phonetique_off", e[e.phonetique_on = 268] = "phonetique_on", e[e.surveillance_surveillance = 269] = "surveillance_surveillance", e[e.tableau_version_1_tableau = 270] = "tableau_version_1_tableau", e[e.tableau_version_2_tableau = 271] = "tableau_version_2_tableau", e[e.tableau_version_3_tableau = 272] = "tableau_version_3_tableau", e[e.user_dossier = 273] = "user_dossier", e[e.user_ensemble = 274] = "user_ensemble", e[e.user_seul = 275] = "user_seul", e[e.user_sexe_feminin = 276] = "user_sexe_feminin", e[e.user_sexe_feminin_blanc = 277] = "user_sexe_feminin_blanc", e[e.user_sexe_indetermine = 278] = "user_sexe_indetermine", e[e.user_sexe_indetermine_blanc = 279] = "user_sexe_indetermine_blanc", e[e.user_sexe_masculin = 280] = "user_sexe_masculin", e[e.user_sexe_masculin_blanc = 281] = "user_sexe_masculin_blanc", e[e.user_user = 282] = "user_user", e[e.vide_vide = 283] = "vide_vide", e[e.websuite_logo = 284] = "websuite_logo", e[e.xxCheckBox_checked_defaut = 285] = "xxCheckBox_checked_defaut", e[e.xxCheckBox_checked_defaut_disabled = 286] = "xxCheckBox_checked_defaut_disabled", e[e.fleche_select = 287] = "fleche_select", e[e.xxListChoix_defaut = 288] = "xxListChoix_defaut", e[e.xxListChoix_tous = 289] = "xxListChoix_tous", e[e.xxRouteContainer_FavoriOff = 290] = "xxRouteContainer_FavoriOff", e[e.xxRouteContainer_FavoriOn = 291] = "xxRouteContainer_FavoriOn", e[e.xxRouteContainer_Fermer = 292] = "xxRouteContainer_Fermer", e[e.xxRouteContainer_Filariane = 293] = "xxRouteContainer_Filariane", e[e.xxRouteContainer_Home = 294] = "xxRouteContainer_Home", e[e.xxRouteContainer_MenuPerso = 295] = "xxRouteContainer_MenuPerso", e[e.xxRouteContainer_Partager = 296] = "xxRouteContainer_Partager", e[e.xxRouteContainer_Refresh = 297] = "xxRouteContainer_Refresh", e[e.xxRouteContainer_Remonter = 298] = "xxRouteContainer_Remonter", e[e.xxRouteContainer_Retour = 299] = "xxRouteContainer_Retour", e[e.xxRouteContainer_SwitchMenuOff = 300] = "xxRouteContainer_SwitchMenuOff", e[e.xxRouteContainer_SwitchMenuOn = 301] = "xxRouteContainer_SwitchMenuOn", e[e.xxTableau_config_colonnes = 302] = "xxTableau_config_colonnes", e[e.xxTableau_FlecheBas = 303] = "xxTableau_FlecheBas", e[e.xxTableau_FlecheBottom = 304] = "xxTableau_FlecheBottom", e[e.xxTableau_FlecheHaut = 305] = "xxTableau_FlecheHaut", e[e.xxTableau_FlecheTop = 306] = "xxTableau_FlecheTop", e[e.xxVolet_bas = 307] = "xxVolet_bas", e[e.xxVolet_droite = 308] = "xxVolet_droite", e[e.xxVolet_gauche = 309] = "xxVolet_gauche", e[e.xxVolet_haut = 310] = "xxVolet_haut", e;
}({}), enumIconeAction = /* @__PURE__ */ function(e) {
	return e[e.ajouter = 5] = "ajouter", e[e.valider = 122] = "valider", e[e.valider_cercle = 123] = "valider_cercle", e[e.annuler = 8] = "annuler", e[e.annuler_cercle = 10] = "annuler_cercle", e[e.supprimer = 110] = "supprimer", e[e.enregistrer = 40] = "enregistrer", e[e.imprimer = 69] = "imprimer", e[e.visualiser = 11] = "visualiser", e[e.verrouiller = 127] = "verrouiller", e[e.deverouiller = 36] = "deverouiller", e[e.modifier = 81] = "modifier", e[e.historique = 63] = "historique", e[e.rechercher = 95] = "rechercher", e[e.erreur = 46] = "erreur", e[e.suspendre = 208] = "suspendre", e[e.importer = 67] = "importer", e[e.alerte = 161] = "alerte", e[e.rafraichir = 93] = "rafraichir", e[e.parametres = 144] = "parametres", e[e.masquer = 77] = "masquer", e[e.info = 73] = "info", e[e.calendrier = 89] = "calendrier", e[e.lister = 247] = "lister", e[e.inconnu = 158] = "inconnu", e[e.arreter = 15] = "arreter", e[e.sablier = 231] = "sablier", e[e.sablier_blanc = 232] = "sablier_blanc", e;
}({}), Icone = class {}, IconeV2 = class extends Icone {
	catalogue;
	nomIcone;
	classeComplete;
	elem;
	constructor(e, t) {
		super();
		let n = this;
		switch (n.catalogue = e.catalogue, n.nomIcone = e.nomIcone, t ??= {}, t.taille ??= tailleIcone$1.M, t.modeGrise ??= !1, n.classeComplete = n.nomIcone + " icone_" + tailleIcone$1[t.taille], t.modeGrise == 1 && (n.classeComplete += " iconeGrise"), n.catalogue) {
			case "cs3i": n.elem = new xDiv$1({ class: "iconeSeuleCs3i " + n.getClasse() });
			case "miniCs3i": n.elem = new xDiv$1({ class: "iconeSeuleMiniCs3i " + n.getClasse() });
			case "externe": n.elem = new xDiv$1({ class: "iconeSeuleExterne " + n.getClasse() });
		}
	}
	getClasse() {
		let e = this;
		switch (e.catalogue) {
			case "cs3i": return "iconeCs3i_" + e.classeComplete;
			case "miniCs3i": return "iconeMiniCs3i_" + e.classeComplete;
			case "externe": return "iconeExterne_" + e.classeComplete + " iconeExterne ";
		}
	}
	getValeurIcone() {
		return this.nomIcone;
	}
	getTypeIcone() {
		switch (this.catalogue) {
			case "cs3i": return "iconeCs3i";
			case "miniCs3i": return "iconeCs3i";
			case "externe": return "iconeExterne";
		}
	}
	addClass(e) {
		return this.elem.addClass(e);
	}
	removeClass(e) {
		return this.elem.removeClass(e);
	}
	get y() {
		return this.elem.y;
	}
}, IconeCs3i$1 = class extends IconeV2 {
	inType;
	constructor(e, t) {
		super({
			catalogue: "cs3i",
			nomIcone: enumIconeCs3i$1[e]
		}, t ?? {
			modeGrise: !1,
			taille: tailleIcone$1.M
		}), this.inType = e;
	}
	getValeurIcone() {
		return this.inType;
	}
	getTypeIcone() {
		return "iconeCs3i";
	}
}, IconeMiniCs3i$1 = class e extends IconeV2 {
	static getIconeLang(t) {
		let n;
		switch (t) {
			case "fr":
				n = enumIconeCs3i$1.lang_fr;
				break;
			case "en":
				n = enumIconeCs3i$1.lang_en;
				break;
			case "de":
				n = enumIconeCs3i$1.lang_de;
				break;
			case "es":
				n = enumIconeCs3i$1.lang_es;
				break;
			case "ca":
				n = enumIconeCs3i$1.lang_ca;
				break;
			default:
				n = enumIconeCs3i$1.lang_fr;
				break;
		}
		return new e(n);
	}
	inType;
	constructor(e, t) {
		super({
			catalogue: "cs3i",
			nomIcone: enumIconeCs3i$1[e]
		}, t ?? {
			modeGrise: !1,
			taille: tailleIcone$1.S
		}), this.inType = e;
	}
	getValeurIcone() {
		return this.inType;
	}
	getTypeIcone() {
		return "iconeCs3i";
	}
}, tailleIcone$1 = /* @__PURE__ */ function(e) {
	return e[e.M = 0] = "M", e[e.S = 1] = "S", e[e.L = 2] = "L", e[e.XS = 3] = "XS", e[e.XL = 4] = "XL", e[e.Custom = 5] = "Custom", e[e.XXS = 6] = "XXS", e;
}({}), IconeExterne = class extends IconeV2 {
	constructor(e, t) {
		super({
			catalogue: "externe",
			nomIcone: e
		}, t);
	}
	getValeurIcone() {
		return super.getValeurIcone();
	}
	getTypeIcone() {
		return super.getTypeIcone();
	}
}, IconeTypeExamen = class extends Icone {
	classEtat;
	urlImgTypeExamen;
	abreviationTypeExamen;
	elem;
	addClass(e) {
		return this.elem.addClass(e);
	}
	removeClass(e) {
		return this.elem.removeClass(e);
	}
	constructor(e) {
		super(), this.classEtat = e.classEtat, this.urlImgTypeExamen = e.urlImgTypeExamen, this.abreviationTypeExamen = e.abreviationTypeExamen, this.elem = new xDiv$1({ class: this.classEtat }), this.abreviationTypeExamen == null ? this.urlImgTypeExamen != null && this.elem.asHolder.append(new xImg({
			src: this.urlImgTypeExamen,
			class: "icon_img"
		})) : this.elem.asHolder.append(new xDiv$1({
			class: "abreviation icon_tags",
			textVariable: this.abreviationTypeExamen
		}));
	}
	getValeurIcone() {
		let e = this;
		return {
			classEtat: e.classEtat,
			urlImgTypeExamen: e.urlImgTypeExamen,
			abreviationTypeExamen: e.abreviationTypeExamen
		};
	}
	getTypeIcone() {
		return "iconeTypeExamen";
	}
	getClasse() {
		return null;
	}
	get y() {
		return this.elem.y;
	}
}, enumListeIcones = /* @__PURE__ */ function(e) {
	return e[e.svg = 0] = "svg", e[e.tuiles = 1] = "tuiles", e;
}({}), enumIconeSvg$1 = /* @__PURE__ */ function(e) {
	return e[e.actualiser = 1] = "actualiser", e[e.age = 2] = "age", e[e.ajouter = 3] = "ajouter", e[e.alerte = 4] = "alerte", e[e.appareil_photo = 5] = "appareil_photo", e[e.calendrier = 6] = "calendrier", e[e.chevron_bas = 7] = "chevron_bas", e[e.chevron_droite = 8] = "chevron_droite", e[e.chevron_gauche = 9] = "chevron_gauche", e[e.croix = 10] = "croix", e[e.document = 11] = "document", e[e.dossier = 12] = "dossier", e[e.editer_colonnes = 13] = "editer_colonnes", e[e.favori = 14] = "favori", e[e.filtrer = 15] = "filtrer", e[e.fleche_droite = 16] = "fleche_droite", e[e.home = 17] = "home", e[e.horaire = 18] = "horaire", e[e.image = 19] = "image", e[e.imprimer = 20] = "imprimer", e[e.informations = 21] = "informations", e[e.liste = 22] = "liste", e[e.lit = 23] = "lit", e[e.menu_burger = 24] = "menu_burger", e[e.modifier = 25] = "modifier", e[e.observation = 26] = "observation", e[e.partager = 27] = "partager", e[e.qr_code = 28] = "qr_code", e[e.recherche = 29] = "recherche", e[e.sauvegarder = 30] = "sauvegarder", e[e.sexe_femme = 31] = "sexe_femme", e[e.sexe_homme = 32] = "sexe_homme", e[e.sexe_neutre = 33] = "sexe_neutre", e[e.statistiques = 34] = "statistiques", e[e.supprimer = 35] = "supprimer", e[e.traduction = 36] = "traduction", e[e.user = 37] = "user", e[e.upload = 38] = "upload", e[e.validation = 39] = "validation", e[e.valider = 40] = "valider", e[e.verrouille = 41] = "verrouille", e[e.associer = 42] = "associer", e[e.etablissement = 43] = "etablissement", e[e.modules = 44] = "modules", e[e.banette = 45] = "banette", e[e.cercle = 46] = "cercle", e[e.carre = 47] = "carre", e[e.telephone = 48] = "telephone", e[e.drapeau = 49] = "drapeau", e[e.coller = 50] = "coller", e[e.geolocalisation = 51] = "geolocalisation", e[e.maison = 52] = "maison", e[e.administration = 53] = "administration", e[e.flag = 54] = "flag", e[e.recherche_document = 55] = "recherche_document", e[e.micro = 56] = "micro", e[e.troispoints = 57] = "troispoints", e[e.punaise = 58] = "punaise", e[e.envoyer_mail = 59] = "envoyer_mail", e[e.sms = 60] = "sms", e[e.sollicitation = 61] = "sollicitation", e[e.main_levee = 62] = "main_levee", e[e.fusion = 63] = "fusion", e[e.fiche_administrative = 64] = "fiche_administrative", e[e.sollicitation_pleine = 65] = "sollicitation_pleine", e[e.facture = 66] = "facture", e[e.ajouter_rond = 67] = "ajouter_rond", e[e.suspendre = 68] = "suspendre", e[e.play = 69] = "play", e[e.plus = 70] = "plus", e[e.prise = 71] = "prise", e[e.demandeavis = 72] = "demandeavis", e[e.demandeavis_pleine = 73] = "demandeavis_pleine", e[e.reprendre = 74] = "reprendre", e[e.download = 75] = "download", e[e.moins = 76] = "moins", e[e.chevron_haut = 77] = "chevron_haut", e[e.troispoints_horizontaux = 78] = "troispoints_horizontaux", e[e.chaise = 79] = "chaise", e[e.drapeau_medecin = 80] = "drapeau_medecin", e[e.sollicitation_ajout = 81] = "sollicitation_ajout", e[e.demandeavis_ajout = 82] = "demandeavis_ajout", e[e.liste_simple = 83] = "liste_simple", e[e.lit_retour = 84] = "lit_retour", e[e.cercle_pointilles = 85] = "cercle_pointilles", e[e.cercle_pointexclamation = 86] = "cercle_pointexclamation", e[e.annuler_action = 87] = "annuler_action", e[e.prises_connectees = 88] = "prises_connectees", e[e.prises_deconnectees = 89] = "prises_deconnectees", e[e.incident_interne_externe = 90] = "incident_interne_externe", e[e.materiel = 91] = "materiel", e[e.visualiser = 92] = "visualiser", e[e.bdd = 93] = "bdd", e[e.liste_choix_tous = 94] = "liste_choix_tous", e[e.historique = 95] = "historique", e[e.dupliquer = 96] = "dupliquer", e[e.baguette_magique = 97] = "baguette_magique", e[e.pdf = 98] = "pdf", e[e.user_ensemble = 99] = "user_ensemble", e[e.attente = 100] = "attente", e[e.copier = 101] = "copier", e[e.couper = 102] = "couper", e[e.logo_elive = 112] = "logo_elive", e;
}({}), enumIconeEmedSvg$1 = /* @__PURE__ */ function(e) {
	return e[e.soins = 10001] = "soins", e[e.perfusions = 10002] = "perfusions", e[e.posologie = 10003] = "posologie", e[e.prolonger = 10004] = "prolonger", e[e.suspendre = 10005] = "suspendre", e;
}({}), enumIconeTuile$1 = /* @__PURE__ */ function(e) {
	return e[e.AdmiEmed = 20001] = "AdmiEmed", e[e.AideEmed = 20002] = "AideEmed", e[e.ClassementDocEmed = 20003] = "ClassementDocEmed", e[e.DonSangEmed = 20004] = "DonSangEmed", e[e.DossierConsultEmed = 20005] = "DossierConsultEmed", e[e.GestionBlocEmed = 20006] = "GestionBlocEmed", e[e.ParametreEmed = 20007] = "ParametreEmed", e[e.InternetEmed = 20008] = "InternetEmed", e[e.ConsultationPatient = 20009] = "ConsultationPatient", e[e.ConsultationDossier = 20010] = "ConsultationDossier", e[e.TableauDeBord = 20011] = "TableauDeBord", e[e.RechercheRapide = 20012] = "RechercheRapide", e[e.Delegues = 20013] = "Delegues", e[e.Dispensation = 20014] = "Dispensation", e[e.SupportEmed = 20015] = "SupportEmed", e[e.AppelContextuelPrescription = 20016] = "AppelContextuelPrescription", e[e.AppelContextuelPrescriptionLectureSeule = 20017] = "AppelContextuelPrescriptionLectureSeule", e[e.AppelContextuelAdmission = 20018] = "AppelContextuelAdmission", e[e.AppelContextuelAdmissionLectureSeule = 20019] = "AppelContextuelAdmissionLectureSeule", e[e.EmedPatientConnect = 20020] = "EmedPatientConnect", e[e.Recherche = 20021] = "Recherche", e[e.RechercheMedicament = 20022] = "RechercheMedicament", e[e.Statistiques = 20023] = "Statistiques", e[e.VueJournee = 20024] = "VueJournee", e[e.MenuTuiles = 20025] = "MenuTuiles", e[e.SuiviPubliDocs = 20026] = "SuiviPubliDocs", e[e.BlocCommerce = 20027] = "BlocCommerce", e[e.ValidationPharma = 20028] = "ValidationPharma", e[e.GestionIncoherences = 20029] = "GestionIncoherences", e[e.InstallElive = 20030] = "InstallElive", e[e.adminEmed = 20031] = "adminEmed", e;
}({}), enumFormeFondIconeSvg = /* @__PURE__ */ function(e) {
	return e.carre = "carre", e.rond = "rond", e.bordsArrondis = "bordsArrondis", e;
}({}), IconeSvg$1 = class extends Icone {
	inType;
	couleurSvg;
	addClass(e) {
		let t = this;
		e.split(" ").forEach((n) => {
			t.svg.y.classList.add(e);
		});
	}
	removeClass(e) {
		let t = this;
		e.split(" ").forEach((n) => {
			t.svg.y.classList.remove(e);
		});
	}
	svg;
	constructor(e, t) {
		super(), t ??= {};
		let n = this;
		n.inType = e, n.svg = this.getSVG(e, t), t.couleurSvg && this.setCouleur(t.couleurSvg.couleurIconeComplete);
	}
	getSVG(e, t) {
		let n = new ContenusSVG("", ""), r, i = "";
		t.modeGrise == 1 && (i = " iconeGrise");
		let a = "";
		t.couleurSvg?.couleurIconeComplete != null && (a = " xsvg-couleur_" + t.couleurSvg.couleurIconeComplete);
		let o = t.couleurCustom, s = "", c = "";
		o != null && (c = "xsvg-couleur_" + o.replace("#", ""), s = "\n                ." + c + " .xsvg-elem_stroked{ stroke: " + o + ";}\n                ." + c + " .xsvg-elem_filled{ fill: " + o + "; } \n            ", c = " " + c);
		let l = "";
		t.couleurSvg?.couleurPrincipale != null && (l += " xsvg-multicolore-couleurPrincipale_" + t.couleurSvg.couleurPrincipale), t.couleurSvg?.couleurSecondaire != null && (l += " xsvg-multicolore-couleurSecondaire_" + t.couleurSvg.couleurSecondaire), t.couleurSvg?.couleurTertiaire != null && (l += " xsvg-multicolore-couleurTertiaire_" + t.couleurSvg.couleurTertiaire);
		let u = "";
		t.couleurSvg?.couleurFond != null && (u = " xsvg-couleurFond_" + t.couleurSvg.couleurFond);
		let d = "";
		switch (t.formeFond != null && (d = " xsvg-formeFond_" + t.formeFond), e >= 1 && e <= 9999 ? r = enumIconeSvg$1[e].toString() : e >= 10001 && e <= 19999 ? r = enumIconeEmedSvg$1[e].toString() : e >= 20001 && e <= 29999 && (r = enumIconeTuile$1[e].toString()), e) {
			case enumIconeSvg$1.actualiser:
				n = xListeIconeSVG.actualiser();
				break;
			case enumIconeSvg$1.administration:
				n = xListeIconeSVG.administration();
				break;
			case enumIconeSvg$1.age:
				n = xListeIconeSVG.age();
				break;
			case enumIconeSvg$1.ajouter:
				n = xListeIconeSVG.ajouter();
				break;
			case enumIconeSvg$1.ajouter_rond:
				n = xListeIconeSVG.ajouter_rond();
				break;
			case enumIconeSvg$1.alerte:
				n = xListeIconeSVG.alerte();
				break;
			case enumIconeSvg$1.annuler_action:
				n = xListeIconeSVG.annuler_action();
				break;
			case enumIconeSvg$1.appareil_photo:
				n = xListeIconeSVG.appareil_photo();
				break;
			case enumIconeSvg$1.associer:
				n = xListeIconeSVG.associer();
				break;
			case enumIconeSvg$1.attente:
				n = xListeIconeSVG.attente();
				break;
			case enumIconeSvg$1.banette:
				n = xListeIconeSVG.banette();
				break;
			case enumIconeSvg$1.baguette_magique:
				n = xListeIconeSVG.baguette_magique();
				break;
			case enumIconeSvg$1.bdd:
				n = xListeIconeSVG.bdd();
				break;
			case enumIconeSvg$1.calendrier:
				n = xListeIconeSVG.calendrier();
				break;
			case enumIconeSvg$1.carre:
				n = xListeIconeSVG.carre();
				break;
			case enumIconeSvg$1.cercle:
				n = xListeIconeSVG.cercle();
				break;
			case enumIconeSvg$1.cercle_pointilles:
				n = xListeIconeSVG.cercle_pointilles();
				break;
			case enumIconeSvg$1.cercle_pointexclamation:
				n = xListeIconeSVG.cercle_pointexclamation();
				break;
			case enumIconeSvg$1.chaise:
				n = xListeIconeSVG.chaise();
				break;
			case enumIconeSvg$1.chevron_bas:
				n = xListeIconeSVG.chevron_bas();
				break;
			case enumIconeSvg$1.chevron_droite:
				n = xListeIconeSVG.chevron_droite();
				break;
			case enumIconeSvg$1.chevron_gauche:
				n = xListeIconeSVG.chevron_gauche();
				break;
			case enumIconeSvg$1.chevron_haut:
				n = xListeIconeSVG.chevron_haut();
				break;
			case enumIconeSvg$1.coller:
				n = xListeIconeSVG.coller();
				break;
			case enumIconeSvg$1.copier:
				n = xListeIconeSVG.copier();
				break;
			case enumIconeSvg$1.couper:
				n = xListeIconeSVG.couper();
				break;
			case enumIconeSvg$1.croix:
				n = xListeIconeSVG.croix();
				break;
			case enumIconeSvg$1.demandeavis:
				n = xListeIconeSVG.demandeavis();
				break;
			case enumIconeSvg$1.demandeavis_ajout:
				n = xListeIconeSVG.demandeavis_ajout();
				break;
			case enumIconeSvg$1.demandeavis_pleine:
				n = xListeIconeSVG.demandeavis_pleine();
				break;
			case enumIconeSvg$1.document:
				n = xListeIconeSVG.document();
				break;
			case enumIconeSvg$1.dossier:
				n = xListeIconeSVG.dossier();
				break;
			case enumIconeSvg$1.drapeau:
				n = xListeIconeSVG.drapeau();
				break;
			case enumIconeSvg$1.drapeau_medecin:
				n = xListeIconeSVG.drapeau_medecin();
				break;
			case enumIconeSvg$1.download:
				n = xListeIconeSVG.download();
				break;
			case enumIconeSvg$1.dupliquer:
				n = xListeIconeSVG.dupliquer();
				break;
			case enumIconeSvg$1.editer_colonnes:
				n = xListeIconeSVG.editer_colonnes();
				break;
			case enumIconeSvg$1.envoyer_mail:
				n = xListeIconeSVG.envoyer_mail();
				break;
			case enumIconeSvg$1.etablissement:
				n = xListeIconeSVG.etablissement();
				break;
			case enumIconeSvg$1.favori:
				n = xListeIconeSVG.favori();
				break;
			case enumIconeSvg$1.facture:
				n = xListeIconeSVG.facture();
				break;
			case enumIconeSvg$1.fiche_administrative:
				n = xListeIconeSVG.fiche_administrative();
				break;
			case enumIconeSvg$1.filtrer:
				n = xListeIconeSVG.filtrer();
				break;
			case enumIconeSvg$1.flag:
				n = xListeIconeSVG.flag();
				break;
			case enumIconeSvg$1.fleche_droite:
				n = xListeIconeSVG.fleche_droite();
				break;
			case enumIconeSvg$1.fusion:
				n = xListeIconeSVG.fusion();
				break;
			case enumIconeSvg$1.geolocalisation:
				n = xListeIconeSVG.geolocalisation();
				break;
			case enumIconeSvg$1.historique:
				n = xListeIconeSVG.historique();
				break;
			case enumIconeSvg$1.home:
				n = xListeIconeSVG.home();
				break;
			case enumIconeSvg$1.horaire:
				n = xListeIconeSVG.horaire();
				break;
			case enumIconeSvg$1.image:
				n = xListeIconeSVG.image();
				break;
			case enumIconeSvg$1.imprimer:
				n = xListeIconeSVG.imprimer();
				break;
			case enumIconeSvg$1.incident_interne_externe:
				n = xListeIconeSVG.incident_interne_externe();
				break;
			case enumIconeSvg$1.informations:
				n = xListeIconeSVG.informations();
				break;
			case enumIconeSvg$1.liste:
				n = xListeIconeSVG.liste();
				break;
			case enumIconeSvg$1.liste_simple:
				n = xListeIconeSVG.liste_simple();
				break;
			case enumIconeSvg$1.liste_choix_tous:
				n = xListeIconeSVG.liste_choix_tous();
				break;
			case enumIconeSvg$1.lit:
				n = xListeIconeSVG.lit();
				break;
			case enumIconeSvg$1.lit_retour:
				n = xListeIconeSVG.lit_retour();
				break;
			case enumIconeSvg$1.main_levee:
				n = xListeIconeSVG.main_levee();
				break;
			case enumIconeSvg$1.maison:
				n = xListeIconeSVG.maison();
				break;
			case enumIconeSvg$1.materiel:
				n = xListeIconeSVG.materiel();
				break;
			case enumIconeSvg$1.menu_burger:
				n = xListeIconeSVG.menu_burger();
				break;
			case enumIconeSvg$1.micro:
				n = xListeIconeSVG.micro();
				break;
			case enumIconeSvg$1.modifier:
				n = xListeIconeSVG.modifier();
				break;
			case enumIconeSvg$1.modules:
				n = xListeIconeSVG.modules();
				break;
			case enumIconeSvg$1.moins:
				n = xListeIconeSVG.moins();
				break;
			case enumIconeSvg$1.observation:
				n = xListeIconeSVG.observation();
				break;
			case enumIconeSvg$1.partager:
				n = xListeIconeSVG.partager();
				break;
			case enumIconeSvg$1.play:
				n = xListeIconeSVG.play();
				break;
			case enumIconeSvg$1.pdf:
				n = xListeIconeSVG.pdf();
				break;
			case enumIconeSvg$1.plus:
				n = xListeIconeSVG.plus();
				break;
			case enumIconeSvg$1.prise:
				n = xListeIconeSVG.prise();
				break;
			case enumIconeSvg$1.prises_connectees:
				n = xListeIconeSVG.prises_connectees();
				break;
			case enumIconeSvg$1.prises_deconnectees:
				n = xListeIconeSVG.prises_deconnectees();
				break;
			case enumIconeSvg$1.punaise:
				n = xListeIconeSVG.punaise();
				break;
			case enumIconeSvg$1.qr_code:
				n = xListeIconeSVG.qr_code();
				break;
			case enumIconeSvg$1.recherche:
				n = xListeIconeSVG.recherche();
				break;
			case enumIconeSvg$1.recherche_document:
				n = xListeIconeSVG.recherche_document();
				break;
			case enumIconeSvg$1.reprendre:
				n = xListeIconeSVG.reprendre();
				break;
			case enumIconeSvg$1.sauvegarder:
				n = xListeIconeSVG.sauvegarder();
				break;
			case enumIconeSvg$1.sexe_femme:
				n = xListeIconeSVG.sexe_femme();
				break;
			case enumIconeSvg$1.sexe_homme:
				n = xListeIconeSVG.sexe_homme();
				break;
			case enumIconeSvg$1.sexe_neutre:
				n = xListeIconeSVG.sexe_neutre();
				break;
			case enumIconeSvg$1.sms:
				n = xListeIconeSVG.sms();
				break;
			case enumIconeSvg$1.sollicitation:
				n = xListeIconeSVG.sollicitation();
				break;
			case enumIconeSvg$1.sollicitation_ajout:
				n = xListeIconeSVG.sollicitation_ajout();
				break;
			case enumIconeSvg$1.sollicitation_pleine:
				n = xListeIconeSVG.sollicitation_pleine();
				break;
			case enumIconeSvg$1.statistiques:
				n = xListeIconeSVG.statistiques();
				break;
			case enumIconeSvg$1.supprimer:
				n = xListeIconeSVG.supprimer();
				break;
			case enumIconeSvg$1.suspendre:
				n = xListeIconeSVG.suspendre();
				break;
			case enumIconeSvg$1.telephone:
				n = xListeIconeSVG.telephone();
				break;
			case enumIconeSvg$1.traduction:
				n = xListeIconeSVG.traduction();
				break;
			case enumIconeSvg$1.troispoints:
				n = xListeIconeSVG.troispoints();
				break;
			case enumIconeSvg$1.troispoints_horizontaux:
				n = xListeIconeSVG.troispoints_horizontaux();
				break;
			case enumIconeSvg$1.upload:
				n = xListeIconeSVG.upload();
				break;
			case enumIconeSvg$1.user:
				n = xListeIconeSVG.user();
				break;
			case enumIconeSvg$1.user_ensemble:
				n = xListeIconeSVG.user_ensemble();
				break;
			case enumIconeSvg$1.validation:
				n = xListeIconeSVG.validation();
				break;
			case enumIconeSvg$1.valider:
				n = xListeIconeSVG.valider();
				break;
			case enumIconeSvg$1.verrouille:
				n = xListeIconeSVG.verrouille();
				break;
			case enumIconeSvg$1.visualiser:
				n = xListeIconeSVG.visualiser();
				break;
			case enumIconeSvg$1.logo_elive:
				n = xListeIconeSVG.logo_elive();
				break;
			case enumIconeEmedSvg$1.soins:
				n = xListeIconeSVG.emed_soins();
				break;
			case enumIconeEmedSvg$1.perfusions:
				n = xListeIconeSVG.emed_perfusions();
				break;
			case enumIconeEmedSvg$1.posologie:
				n = xListeIconeSVG.emed_posologie();
				break;
			case enumIconeEmedSvg$1.prolonger:
				n = xListeIconeSVG.emed_prolonger();
				break;
			case enumIconeEmedSvg$1.suspendre:
				n = xListeIconeSVG.emed_suspendre();
				break;
			case enumIconeTuile$1.AdmiEmed:
				n = xListeIconeSVG.admin();
				break;
			case enumIconeTuile$1.AideEmed:
				n = xListeIconeSVG.aide();
				break;
			case enumIconeTuile$1.ClassementDocEmed:
				n = xListeIconeSVG.classementDoc();
				break;
			case enumIconeTuile$1.DonSangEmed:
				n = xListeIconeSVG.donSang();
				break;
			case enumIconeTuile$1.DossierConsultEmed:
				n = xListeIconeSVG.dossierConsult();
				break;
			case enumIconeTuile$1.GestionBlocEmed:
				n = xListeIconeSVG.gestionBloc();
				break;
			case enumIconeTuile$1.ParametreEmed:
				n = xListeIconeSVG.parametres();
				break;
			case enumIconeTuile$1.InternetEmed:
				n = xListeIconeSVG.internet();
				break;
			case enumIconeTuile$1.ConsultationPatient:
				n = xListeIconeSVG.consultationPatient();
				break;
			case enumIconeTuile$1.ConsultationDossier:
				n = xListeIconeSVG.consultationDossier();
				break;
			case enumIconeTuile$1.TableauDeBord:
				n = xListeIconeSVG.tableauDeBord();
				break;
			case enumIconeTuile$1.RechercheRapide:
				n = xListeIconeSVG.rechercheRapide();
				break;
			case enumIconeTuile$1.Delegues:
				n = xListeIconeSVG.delegues();
				break;
			case enumIconeTuile$1.Dispensation:
				n = xListeIconeSVG.dispensation();
				break;
			case enumIconeTuile$1.SupportEmed:
				n = xListeIconeSVG.support();
				break;
			case enumIconeTuile$1.AppelContextuelPrescription:
				n = xListeIconeSVG.appelContextuelPrescription();
				break;
			case enumIconeTuile$1.AppelContextuelPrescriptionLectureSeule:
				n = xListeIconeSVG.appelContextuelPrescriptionLectureSeule();
				break;
			case enumIconeTuile$1.AppelContextuelAdmission:
				n = xListeIconeSVG.appelContextuelAdmission();
				break;
			case enumIconeTuile$1.AppelContextuelAdmissionLectureSeule:
				n = xListeIconeSVG.appelContextuelAdmissionLectureSeule();
				break;
			case enumIconeTuile$1.EmedPatientConnect:
				n = xListeIconeSVG.patientConnect();
				break;
			case enumIconeTuile$1.Recherche:
				n = xListeIconeSVG.recherche();
				break;
			case enumIconeTuile$1.RechercheMedicament:
				n = xListeIconeSVG.rechercheMedicament();
				break;
			case enumIconeTuile$1.Statistiques:
				n = xListeIconeSVG.statistiques();
				break;
			case enumIconeTuile$1.VueJournee:
				n = xListeIconeSVG.vueJournee();
				break;
			case enumIconeTuile$1.MenuTuiles:
				n = xListeIconeSVG.menuTuiles();
				break;
			case enumIconeTuile$1.SuiviPubliDocs:
				n = xListeIconeSVG.suiviPubliDocs();
				break;
			case enumIconeTuile$1.BlocCommerce:
				n = xListeIconeSVG.blocCommerce();
				break;
			case enumIconeTuile$1.ValidationPharma:
				n = xListeIconeSVG.ValidationPharma();
				break;
			case enumIconeTuile$1.GestionIncoherences:
				n = xListeIconeSVG.GestionIncoherences();
				break;
			case enumIconeTuile$1.InstallElive:
				n = xListeIconeSVG.InstallElive();
				break;
		}
		return t.epaisseurTrait ||= n.epaisseur, t.epaisseurTrait < 0 && (t.epaisseurTrait = 0), t.epaisseurTrait > 10 && (t.epaisseurTrait = 10), new xSVG({
			contains: n.contenu,
			viewBoxContains: n.viewBoxContains,
			size: t.taille,
			heightCustom: t.heightCust,
			widthCustom: t.widthCust,
			cssContains: s,
			class: "iconeSvg iconeSvg_" + r + " xsvg-stroke_" + t.epaisseurTrait + i + a + c + l + u + d
		});
	}
	getClasse() {
		return this.svg.getClass();
	}
	get y() {
		return this.svg.y;
	}
	getValeurIcone() {
		return this.inType;
	}
	getTypeIcone() {
		let e = this;
		return e.inType >= 20001 || e.inType <= 29999 ? "iconeTuileSvg" : e.inType >= 10001 || e.inType <= 19999 ? "iconeEmedSvg" : "iconeSvg";
	}
	setCouleur(e) {
		return this.couleurSvg && this.y.classList.remove("xsvg-couleur_" + this.couleurSvg), this.couleurSvg = e, this.couleurSvg && this.y.classList.add("xsvg-couleur_" + this.couleurSvg), this;
	}
}, IconeTuile$1 = class extends Icone {
	inType;
	svg;
	constructor(e, t) {
		super(), t ??= {};
		let n = this;
		n.inType = e, n.svg = this.getSVG(e, t);
	}
	getSVG(e, t) {
		let n = new ContenusSVG("", "");
		switch (e) {
			case enumIconeTuile$1.adminEmed:
				n = xListeIconeSVG.admin();
				break;
		}
		t.taille ??= tailleIcone$1.L;
		let r = "";
		t.modeGrise == 1 && (r = " iconeGrise");
		let i = "";
		t.couleurSvg?.couleurIconeComplete != null && (i = " couleurSvg_" + t.couleurSvg.couleurIconeComplete);
		let a = "";
		t.couleurSvg?.couleurPrincipale != null && (a += " xsvg-multicolore-couleurPrincipale_" + t.couleurSvg.couleurPrincipale), t.couleurSvg?.couleurSecondaire != null && (a += " xsvg-multicolore-couleurSecondaire_" + t.couleurSvg.couleurSecondaire), t.couleurSvg?.couleurTertiaire != null && (a += " xsvg-multicolore-couleurTertiaire_" + t.couleurSvg.couleurTertiaire);
		let o = "";
		t.couleurSvg?.couleurFond != null && (o = " xsvg-couleurFond_" + t.couleurSvg.couleurFond);
		let s = "";
		return t.formeFond != null && (s = " xsvg-formeFond_" + t.formeFond), new xSVG({
			contains: n.contenu,
			viewBoxContains: n.viewBoxContains,
			size: t.taille,
			heightCustom: t.heightCust,
			widthCustom: t.widthCust,
			class: "iconeTuile iconeTuile_" + enumIconeTuile$1[e].toString() + " xsvg-stroke_" + n.epaisseur + r + i + a + o + s
		});
	}
	getClasse() {
		return this.svg.getClass();
	}
	getValeurIcone() {
		return this.inType;
	}
	getTypeIcone() {
		return "iconeTuile";
	}
	addClass(e) {
		let t = this;
		e.split(" ").forEach((n) => {
			t.svg.y.classList.add(e);
		});
	}
	removeClass(e) {
		let t = this;
		e.split(" ").forEach((n) => {
			t.svg.y.classList.remove(e);
		});
	}
	get y() {
		return this.svg.y;
	}
}, BindableObject = class {
	_value;
	abonnements;
	get Value() {
		return this._value;
	}
	set Value(e) {
		let t = this;
		t._value != e && (t._value = e, t.abonnements.forEach(function(e) {
			e.set(t._value);
		}));
	}
	bind(e) {
		let t = this, n = { set: e };
		return t.abonnements.push(n), function() {
			t.abonnements.splice(t.abonnements.indexOf(n), 1);
		};
	}
	constructor(e) {
		let t = this;
		t._value = e, t.abonnements = [], t.Value = e;
	}
}, ObservableCollection$1 = class {
	donnees;
	abonnements;
	get Length() {
		return this.donnees.length;
	}
	bind(e, t) {
		let n = this, r = {
			onAdd: e,
			onDelete: t
		};
		return n.abonnements.push(r), () => {
			n.abonnements.splice(n.abonnements.indexOf(r), 1);
		};
	}
	forEach(e) {
		this.donnees.forEach(e);
	}
	find(e) {
		return this.donnees.find(e);
	}
	filter(e) {
		return this.donnees.filter(e);
	}
	All() {
		let e = [];
		return this.forEach((t) => {
			e.push(t);
		}), e;
	}
	vider() {
		let e = this, t = e.donnees.splice(0, e.donnees.length);
		return e.abonnements.forEach((e) => {
			e.onDelete(t);
		}), e;
	}
	constructor(e) {
		this.donnees = [], this.abonnements = [], e != null && this.add(e);
	}
	add(e) {
		let t = this;
		return e.forEach((e) => {
			t.donnees.push(e);
		}), t.abonnements.forEach((t) => {
			t.onAdd(e);
		}), t;
	}
	del(e) {
		let t = this, n = [];
		return e.forEach((e) => {
			let r = t.donnees.indexOf(e);
			r >= 0 && (n.push(e), t.donnees.splice(r, 1));
		}), n.length > 0 && t.abonnements.forEach((e) => {
			e.onDelete(n);
		}), t;
	}
	elementIndex(e) {
		return this.donnees.indexOf(e);
	}
	elementSuivant(e) {
		let t = this, n = t.elementIndex(e);
		if (n > -1 && n < t.donnees.length - 1) return t.donnees[n + 1];
	}
	elementPrecedent(e) {
		let t = this, n = t.elementIndex(e);
		if (n > 0) return t.donnees[n - 1];
	}
	elementAt(e) {
		let t = this;
		if (e > -1 && e < t.donnees.length) return t.donnees[e];
	}
}, xBr = class extends xElement {
	constructor() {
		super("br", {});
	}
}, xSpan = class extends xElement {
	constructor(e) {
		let t;
		e != null && (e.textVariable != null && (t = e.textVariable), e.textLocalise != null && (t = new xLString$1(e.textLocalise).text), delete e.textLocalise, delete e.textVariable), super("span", e), t != null && (this.y.innerHTML = t), e != null && e.title != null && (this.y.title = e.title);
	}
	setTitle(e) {
		let t = this;
		t.y.title = e;
	}
}, xStyle = class extends xElement {
	dicoTargetCss = {};
	constructor() {
		super("style", { class: "xStyle" });
		let e = this;
		xOutils$1.attachToHead(e.y);
	}
	AddCss(e, t, n) {
		let r = this;
		if (e = e.trim(), r.dicoTargetCss[e]) {
			if (n) {
				let n = r.y.innerHTML, i = n.search(e);
				if (i >= 0) {
					let a = i + e.length + 1;
					n = n.substring(a);
					let o = a + n.search("}");
					r.y.innerHTML = r.y.innerHTML.substring(0, a) + t + r.y.innerHTML.substring(o), r.dicoTargetCss[e] = t;
				}
			}
		} else r.dicoTargetCss[e] = t, r.y.innerHTML += r.genClassCss(e);
	}
	EmptyAllCss() {
		let e = this;
		e.y.innerHTML = "";
	}
	genClassCss(e) {
		let t = this, n = "";
		return n += e + "{", n += t.dicoTargetCss[e] + "} /**/", n;
	}
	static addClass(e, t) {
		addClass(e, t);
	}
	static removeClass(e, t) {
		removeClass(e, t);
	}
	static AppliquerOptionsAffichage(e, t) {
		AppliquerOptionsAffichage(e, t);
	}
	static getLuminositeCouleurHexa(e) {
		return getLuminositeCouleurHexa(e);
	}
	static EclaicirCouleurHex(e, t) {
		return eclaicirCouleurHex(e, t);
	}
	static AssombrissementCouleurHex(e, t) {
		return eclaicirCouleurHex(e, -t);
	}
	static setCouleurFond(e, t, n, r, i) {
		setCouleurFond(e, t, n, r, i);
	}
	static setCouleurTexte(e, t) {
		setCouleurTexte(e, t);
	}
	static supprimerCouleurFond(e) {
		supprimerCouleurFond(e);
	}
	static setCouleurFondAvecContrasteTexteAuto(e, t, n, r, i) {
		setCouleurFondAvecContrasteTexteAuto(e, t, n, r, i);
	}
	static setCouleurBorder(e, t, n, r = !0) {
		addClass("couleurBorderDynamique", e), e.y.style.borderColor = "#" + t;
	}
	static setMargin(e, t) {
		setMargin(e, t);
	}
	static setPadding(e, t) {
		setPadding(e, t);
	}
	static setCurseur(e, t) {
		setCurseur(e, t);
	}
	static supprimerCurseur(e) {
		supprimerCurseur(e);
	}
	static setBorder(e, t, n) {
		setBorder(e, t, n);
	}
	static setWidth(e, t) {
		if (e && t) {
			let n = e.y.style;
			t.px != null && (n.width = t.px + "px"), t.pourcentage != null && (n.width = t.pourcentage + "%"), t.view_width != null && (n.width = t.view_width + "vw"), e.y.classList.add("width_custom");
		}
	}
}, enumTypeOuvertureHref$1 = /* @__PURE__ */ function(e) {
	return e[e.NouvelleFenetre = 0] = "NouvelleFenetre", e[e.MemeEmplacement = 1] = "MemeEmplacement", e[e.EmplacementParent = 2] = "EmplacementParent", e[e.Boxer = 3] = "Boxer", e;
}({}), xHref$1 = class extends xElement {
	constructor(e) {
		let t;
		e != null && (e.textVariable != null && (t = e.textVariable.toString()), e.textLocalise != null && (t = new xLString$1(e.textLocalise).text), delete e.textLocalise, delete e.textVariable), super("a", e), this.addClass("xHref");
		let n = "couleuremed_bleu";
		e.optionsAffichage != null && (xStyle.AppliquerOptionsAffichage(this, e.optionsAffichage), (e.optionsAffichage.margin != null || e.optionsAffichage.padding != null) && this.addClass("xInline"), e.optionsAffichage.couleur && (n = "couleur" + e.optionsAffichage.couleur), e.optionsAffichage.retourALaLigne || this.addClass("xHref_noWrap")), this.y.classList.add(n), t != null && (this.y.innerHTML = t);
		let r = "_blank";
		e.typeOuverture == enumTypeOuvertureHref$1.MemeEmplacement ? r = "_self" : e.typeOuverture == enumTypeOuvertureHref$1.EmplacementParent && (r = "_parent"), e.typeOuverture == enumTypeOuvertureHref$1.Boxer ? (this.y.setAttribute("href", "#"), this.y.onclick = () => {
			new xxBoxer({ initContent: new xIFrame({ src: e.url }) }).afficher();
		}) : (this.y.setAttribute("href", e.url), this.y.setAttribute("target", r)), this.addClass(e.class);
	}
}, enumPositionIconeAction = /* @__PURE__ */ function(e) {
	return e[e.HautDroite = 0] = "HautDroite", e[e.BasDroite = 1] = "BasDroite", e;
}({}), xIconeAvecAction = class {
	grid;
	iconePrincipale;
	iconeSecondaire;
	constructor(e) {
		let t = this;
		e.tailleIcone ||= tailleIcone$1.M, e.positionIconeAction ??= enumPositionIconeAction.BasDroite;
		let n = " taille_" + tailleIcone$1[e.tailleIcone], r = " positionIconeAction_" + enumPositionIconeAction[e.positionIconeAction];
		t.grid = new xxGrid({
			class: "xIconeAvecAction" + r + n,
			colonnes: ["12fr 7fr 5fr"],
			lignes: ["5fr 7fr 7fr 5fr"],
			gridGap: "0",
			fullWidth: !1,
			fullHeight: !1
		}), t.iconePrincipale = e.iconePrincipale, t.iconeSecondaire = new IconeCs3i$1(e.iconeSecondaire), t.grid.append([new xxGridItem({
			content: t.iconePrincipale,
			colStart: 1,
			nbCols: 2,
			rowStart: e.positionIconeAction == enumPositionIconeAction.BasDroite ? 1 : 2,
			nbRows: 3,
			class: "gi_xIconeAvecAction iconePrincipale"
		}), new xxGridItem({
			content: t.iconeSecondaire,
			colStart: 2,
			nbCols: 2,
			rowStart: e.positionIconeAction == enumPositionIconeAction.BasDroite ? 3 : 1,
			nbRows: 2,
			class: "gi_xIconeAvecAction iconeSecondaire"
		})]);
	}
	addClass(e) {
		return this.grid.addClass(e);
	}
	removeClass(e) {
		return this.grid.removeClass(e);
	}
	getClasse() {
		return this.getClasse();
	}
	getTypeIcone() {
		return null;
	}
	getValeurIcone() {
		return this.iconePrincipale;
	}
	get y() {
		return this.grid.y;
	}
}, xxContainerEvent$1 = class e {
	static CLASS_CLICK_EN_COURS = "clicEnCours";
	static CLASS_DISABLED = "xxCtnEvent-disabled";
	divForHolder;
	holder;
	content;
	click = function() {};
	dblClick = function() {};
	shiftClick = function() {};
	rightClick = function() {};
	mouseOver = function() {};
	mouseOut = function() {};
	mouseEnter = function() {};
	mouseLeave = function() {};
	clickOut = function() {};
	stopPropagation;
	title;
	longTouch;
	dureeLong = 500;
	callbackTouchInterval;
	disabled;
	optionsAffichage;
	idTimeOutDelaiPourMouseEnterMs;
	width(e) {
		return this.divForHolder.width(e);
	}
	height(e) {
		return this.divForHolder.height(e);
	}
	get y() {
		return this.divForHolder.y;
	}
	addClass(e) {
		return this.holder.addClass(e);
	}
	removeClass(e) {
		return this.holder.removeClass(e);
	}
	get asHolder() {
		return this.holder;
	}
	constructor(e) {
		let t = this;
		t.disabled = !1, e.disabled != null && (t.disabled = e.disabled), t.stopPropagation = e.stopPropagation, t.content = e.initContent, t.title = e.titleVariable, e.titleLocalise && (t.title = new xLString$1(e.titleLocalise).text);
		let n = e.class == null ? "" : e.class, r = e.id == null ? "" : e.id;
		e.onClick && (t.click = () => {
			t.disabled || (t.operationEnCours(), e.onClick(() => {
				t.operationEnCoursRemove();
			}));
		}), e.onDblClick && (t.dblClick = () => {
			t.disabled || (t.operationEnCours(), e.onDblClick(() => {
				t.operationEnCoursRemove();
			}));
		}), e.onShiftClick && (t.shiftClick = () => {
			t.disabled || (t.operationEnCours(), e.onShiftClick(() => {
				t.operationEnCoursRemove();
			}));
		}), e.onMouseOver && (t.mouseOver = e.onMouseOver), e.onMouseOut && (t.mouseOut = e.onMouseOut), e.onRightClick && (t.rightClick = () => {
			t.disabled || (t.operationEnCours(), e.onRightClick(() => {
				t.operationEnCoursRemove();
			}));
		}), e.onMouseEnter && (t.mouseEnter = e.onMouseEnter), e.onMouseLeave && (t.mouseLeave = e.onMouseLeave), e.onTouchLong != null && (t.longTouch = () => {
			t.disabled || (t.operationEnCours(), e.onTouchLong(() => {
				t.operationEnCoursRemove();
			}));
		}), t.divForHolder = new xDiv$1({
			class: "xxContainerEvent " + n,
			title: t.title,
			id: r
		}), t.holder = t.divForHolder.asHolder, t.content != null && t.holder.append(t.content), t.optionsAffichage = e.optionsAffichage, t.optionsAffichage && xStyle.AppliquerOptionsAffichage(t.divForHolder, t.optionsAffichage), t.holder.y.onclick = (e) => {
			e.preventDefault(), e.shiftKey && t.shiftClick != null ? (console.log("ShiftClick", e), t.shiftClick(), t.stopPropagation && e.stopPropagation()) : (console.log("click", e), t.click(), t.stopPropagation && e.stopPropagation());
		}, t.holder.y.onmouseover = () => {
			t.mouseOver();
		}, t.holder.y.onmouseleave = () => {
			t.idTimeOutDelaiPourMouseEnterMs != null && (clearTimeout(t.idTimeOutDelaiPourMouseEnterMs), t.idTimeOutDelaiPourMouseEnterMs = null), t.mouseLeave();
		}, t.holder.y.onmouseout = () => {
			t.mouseOut();
		}, t.holder.y.onmouseenter = () => {
			e.withDelaiPourMouseEnterMs == null ? t.mouseEnter() : t.idTimeOutDelaiPourMouseEnterMs = setTimeout(function() {
				t.mouseEnter();
			}, e.withDelaiPourMouseEnterMs);
		}, t.holder.y.oncontextmenu = () => {
			t.rightClick();
		}, t.holder.y.ondblclick = () => {
			t.dblClick();
		}, t.holder.y.addEventListener("touchstart", () => {
			t.callbackTouchInterval = setTimeout(() => {
				t.longTouch && t.longTouch();
			}, t.dureeLong);
		}, !1), t.holder.y.addEventListener("touchend", () => {
			clearInterval(t.callbackTouchInterval);
		}, !1), t.holder.y.addEventListener("touchcancel", () => {
			clearInterval(t.callbackTouchInterval);
		}, !1), t.holder.y.addEventListener("touchleave", () => {
			clearInterval(t.callbackTouchInterval);
		}, !1), t.holder.y.addEventListener("touchmove", () => {
			clearInterval(t.callbackTouchInterval);
		}, !1);
	}
	fakeEnter() {
		this.mouseEnter();
	}
	fakeLeave() {
		this.mouseLeave();
	}
	fakeClick() {
		this.click();
	}
	fakeDblClick() {
		this.dblClick();
	}
	fakeRightClick() {
		this.rightClick();
	}
	fakeShiftClick() {
		this.shiftClick();
	}
	fakeOver() {
		this.mouseOver();
	}
	fakeOut() {
		this.mouseOut();
	}
	operationEnCours() {
		let t = this;
		t.setDisabled(!0), t.addClass(e.CLASS_CLICK_EN_COURS);
	}
	operationEnCoursRemove() {
		let t = this;
		t.removeClass(e.CLASS_CLICK_EN_COURS), t.setDisabled(!1);
	}
	setDisabled(t) {
		let n = this;
		n.removeClass(e.CLASS_DISABLED), (!n.disabled && t == null || t == 1) && n.addClass(e.CLASS_DISABLED), n.disabled = t ?? !n.disabled;
	}
}, enumTypeLabel$1 = /* @__PURE__ */ function(e) {
	return e[e.standard = 0] = "standard", e[e.titre = 1] = "titre", e[e.soustitre = 2] = "soustitre", e[e.important = 3] = "important", e[e.description = 4] = "description", e[e.temps = 5] = "temps", e[e.bloc = 6] = "bloc", e[e.information = 7] = "information", e;
}({}), enumHabillageLabel$1 = /* @__PURE__ */ function(e) {
	return e[e.standard = 0] = "standard", e[e.warning = 1] = "warning", e[e.erreur = 2] = "erreur", e[e.loading = 3] = "loading", e[e.disabled = 4] = "disabled", e[e.valide = 5] = "valide", e[e.info = 6] = "info", e[e.infoImportante = 7] = "infoImportante", e;
}({}), enumMiseEnFormeLabel$1 = /* @__PURE__ */ function(e) {
	return e[e.standard = 0] = "standard", e[e.ligneUnique = 1] = "ligneUnique", e[e.espacesEtSautsDeLignePreserves = 2] = "espacesEtSautsDeLignePreserves", e;
}({}), enumDecorationLabel = /* @__PURE__ */ function(e) {
	return e[e.aucun = 0] = "aucun", e[e.souligne = 1] = "souligne", e[e.barre = 2] = "barre", e;
}({}), xxLabel = class {
	elementPrincipal;
	montexteVariable;
	typeLabel;
	_haveSurbriance;
	get haveSurbriance() {
		return this._haveSurbriance;
	}
	width(e) {
		return this.elementPrincipal.width(e);
	}
	height(e) {
		return this.elementPrincipal.height(e);
	}
	constructor(e) {
		let t = this;
		e.binding != null && (e.binding.value != null && (e.binding.value.bind((e) => {
			t.changerTextVariable(e);
		}), e.binding.value.Value != null && (e.textVariable = e.binding.value.Value.toString())), e.binding.visibility != null && e.binding.visibility.bind((e) => {
			switch (e) {
				case enumVisibility.afficher:
					afficherxElements$1(t.elementPrincipal);
					break;
				case enumVisibility.masquer:
					cacherxElements$1(t.elementPrincipal, !1);
					break;
				case enumVisibility.masquerAvecCollapse:
					cacherxElements$1(t.elementPrincipal, !0);
					break;
			}
		})), e.class ??= "", e.type ??= enumTypeLabel$1.standard, e.decoration ??= enumDecorationLabel.aucun, e.habillage ??= enumHabillageLabel$1.standard, e.lineBreak ??= !0, e.centrer ??= !1, e.espaceMinimaliste ??= !1, e.miseEnForme ??= enumMiseEnFormeLabel$1.standard, e.textLocalise != null && (t.montexteVariable = new xLString$1(e.textLocalise).text), e.textVariable != null && (t.montexteVariable = e.textVariable.toString());
		let n;
		switch (e.titleLocalise ? n = new xLString$1(e.titleLocalise).text : e.titleVariable && (n = e.titleVariable), e.class += " habillageLabel_" + enumHabillageLabel$1[e.habillage], e.class += " decorationLabel_" + enumDecorationLabel[e.decoration], e.lineBreak || (e.class += " xxLabelNoBreak"), e.centrer && (e.class += " centrerLabel"), e.espaceMinimaliste && (e.class += " espaceMinimaliste"), e.miseEnForme) {
			case enumMiseEnFormeLabel$1.standard: break;
			case enumMiseEnFormeLabel$1.espacesEtSautsDeLignePreserves:
				e.class += " xlab-prewrap";
				break;
			case enumMiseEnFormeLabel$1.ligneUnique:
				e.class += " xlab-nowrap";
				break;
		}
		e.textLocalise === void 0 && e.textVariable, e.lien == null ? (this.elementPrincipal = new xSpan({
			tabindex: e.tabindex,
			id: e.id,
			class: "xxLabel " + e.class,
			textVariable: t.montexteVariable,
			title: n
		}), e.type == enumTypeLabel$1.temps && this.setTemps()) : this.elementPrincipal = new xHref$1({
			class: "xxHref " + e.class,
			textVariable: t.montexteVariable,
			url: e.lien.url,
			typeOuverture: e.lien.typeOuverture,
			click: e.lien.click
		}), e.taillePolice != null && t.setTaillePolice(e.taillePolice), e.police != null && (this.elementPrincipal.y.style.fontFamily = e.police), t.setTypeLabel(e.type), e.optionsAffichage != null && (xStyle.AppliquerOptionsAffichage(this, e.optionsAffichage), (e.optionsAffichage.margin || e.optionsAffichage.padding) && this.elementPrincipal.addClass("xInline"), e.optionsAffichage.couleurTexte && this.elementPrincipal.y.classList.add("couleurTexte_" + e.optionsAffichage.couleurTexte), e.optionsAffichage.largeurMaximum && (this.elementPrincipal.y.style.maxWidth = e.optionsAffichage.largeurMaximum, this.elementPrincipal.addClass("largeurMax")));
	}
	setTaillePolice(e) {
		let t = this;
		t.elementPrincipal.y.style.fontSize = e + "px";
	}
	setPolice(e) {
		let t = this;
		t.elementPrincipal.y.style.fontFamily = e;
	}
	changerTextLocalise(e) {
		this.changerTextVariable(new xLString$1(e).text);
	}
	cacher(e) {
		this.elementPrincipal.cacher(e);
	}
	afficher() {
		this.elementPrincipal.afficher();
	}
	setTypeLabel(e) {
		let t = this;
		t.typeLabel != null && t.removeClass("typeLabel_" + enumTypeLabel$1[t.typeLabel]), t.typeLabel = e, t.addClass("typeLabel_" + enumTypeLabel$1[t.typeLabel]);
	}
	changerTextVariable(e) {
		let t = this;
		e ??= "", t.montexteVariable = e.toString(), t.changerTexteDom(e.toString());
	}
	annulerSurbrillance() {
		let e = this;
		e._haveSurbriance = !1, e.elementPrincipal.y.innerHTML = e.montexteVariable;
	}
	changerTexteDom(e) {
		let t = this;
		t.elementPrincipal.y.innerHTML = e;
	}
	changerTitlteLocalise(e) {
		this.changerTitlteDom(new xLString$1(e).text);
	}
	changerTitleVariable(e) {
		let t = this;
		e ??= "", t.changerTitlteDom(e.toString());
	}
	changerTitlteDom(e) {
		this.elementPrincipal.y.title = e;
	}
	setSurbrillanceBinding(e) {
		let t = this;
		return e.bind(function(e) {
			let n;
			n = xOutils$1.rechercheStringofString(e, t.montexteVariable), n == null ? t.annulerSurbrillance() : t.setSurbrillance(n);
		}), t;
	}
	setSurbrillance(e, t) {
		let n = this, r = "";
		if (e != null && e != "" && n.montexteVariable != null) {
			let i = n.montexteVariable.toUpperCase(), a = e.toUpperCase(), o = i.split(a), s = 0, c = e.length, l = 0, u = 0;
			for (; s < n.montexteVariable.length;) {
				if (u < o[l].length) r += n.montexteVariable.charAt(s);
				else {
					u = -1, l++, n._haveSurbriance = !0;
					let e = "<b class='surligner'";
					t != null && (e += "style='background:" + t + "!important'"), e += ">";
					let i = n.montexteVariable.slice(s, s + c);
					r += e + i + "</b>", s += c - 1;
				}
				u++, s++;
			}
			n.changerTexteDom(r);
		} else n.annulerSurbrillance();
		return n;
	}
	setTemps() {
		let e = this;
		if (e.montexteVariable != null) {
			let t = e.montexteVariable.length, n = "", r = "", i = 0;
			for (; e.montexteVariable.charAt(i) == "0" || e.montexteVariable.charAt(i) == "h" && i > 0;) n += e.montexteVariable.charAt(i), i += 1;
			r += "<b class='clair'>" + n + "</b>" + e.montexteVariable.slice(i, t), e.changerTexteDom(r);
		}
	}
	hideLabel(e) {
		cacherxElements$1(this, e ?? !0);
	}
	showLabel() {
		afficherxElements$1(this);
	}
	get y() {
		return this.elementPrincipal.y;
	}
	addClass(e) {
		let t = this;
		return t.elementPrincipal.addClass(e), t;
	}
	removeClass(e) {
		let t = this;
		return t.elementPrincipal.removeClass(e), t;
	}
}, enumTypeBouton$1 = /* @__PURE__ */ function(e) {
	return e[e.Standard = 0] = "Standard", e[e.TexteHorsBouton = 1] = "TexteHorsBouton", e;
}({}), enumComportementBouton = /* @__PURE__ */ function(e) {
	return e[e.Standard = 0] = "Standard", e[e.ActionDifferee = 1] = "ActionDifferee", e[e.ActionAConfirmer = 2] = "ActionAConfirmer", e[e.ValidationBloquante = 3] = "ValidationBloquante", e;
}({}), enumStyleBouton$1 = /* @__PURE__ */ function(e) {
	return e[e.Simple = 0] = "Simple", e[e.SansFondAvecContour = 1] = "SansFondAvecContour", e[e.AvecFond = 2] = "AvecFond", e[e.AvecFondBlancAvecContour = 3] = "AvecFondBlancAvecContour", e[e.Ombre = 4] = "Ombre", e;
}({}), enumPositionnementResponsiveBouton$1 = /* @__PURE__ */ function(e) {
	return e[e.Defaut = 0] = "Defaut", e[e.PleineLargeur = 1] = "PleineLargeur", e[e.DansLeCoin = 2] = "DansLeCoin", e[e.EnBas = 3] = "EnBas", e;
}({}), enumCouleurBouton$1 = /* @__PURE__ */ function(e) {
	return e[e.Utilisateur = 0] = "Utilisateur", e[e.Alternatif = 1] = "Alternatif", e[e.Alerte = 2] = "Alerte", e[e.Valide = 3] = "Valide", e[e.Neutre = 4] = "Neutre", e[e.Blanc = 5] = "Blanc", e[e.Sans = 6] = "Sans", e;
}({}), enumTailleBouton$1 = /* @__PURE__ */ function(e) {
	return e[e.Fit = 0] = "Fit", e[e.XS = 1] = "XS", e[e.S = 2] = "S", e[e.M = 3] = "M", e[e.L = 4] = "L", e[e.XL = 5] = "XL", e[e.Tuile = 6] = "Tuile", e[e.Header = 7] = "Header", e;
}({}), xxBouton = class e {
	mainDiv;
	secondDiv;
	label;
	span;
	class;
	id;
	text;
	title;
	style;
	type;
	reponsiveButton;
	size;
	color;
	rounded;
	disabled;
	positionIcone;
	icone;
	click;
	dblclick;
	fullHeight;
	fullWidth;
	shiftClick;
	touchLong;
	confirmBehaviour;
	confirmString;
	textVariableBind;
	optionLabel;
	optionsAffichage;
	constructor(e) {
		let t = this;
		if (t.disabled = e.disabled, e.icone == null && e.textLocalise == null && e.textVariable == null && (e.textLocalise = "non défini"), e.binding != null && e.binding.disabled != null && (t.disabled = e.binding.disabled.Value, e.binding.disabled.bind((e) => t.ToggleAffichageDisabled(e))), e.confirm == null ? t.confirmBehaviour = enumComportementBouton.Standard : (t.confirmBehaviour = e.confirm.comportement, t.confirmString = e.confirm.stringConfirm), t.class = "xxBoutonContainer", t.text = "", t.title = "", e.class != null && (t.class += " " + e.class), e.titleLocalise == null ? t.title = e.titleVariable : t.title = new xLString$1(e.titleLocalise).text, t.isOptionLabelled(e) ? t.optionLabel = e.optionsLabel : (e.textLocalise != null && (t.text = new xLString$1(e.textLocalise).text), e.textVariable != null && (t.text = e.textVariable)), e.optionsAffichage != null && (t.color = e.optionsAffichage.couleurBouton, t.positionIcone = e.optionsAffichage.positionIconeBouton, t.size = e.optionsAffichage.tailleBouton, t.reponsiveButton = e.optionsAffichage.positionnementResponsiveBouton, t.style = e.optionsAffichage.styleBouton, t.rounded = e.optionsAffichage.boutonArrondi, t.fullHeight = e.optionsAffichage.fullHeight, t.fullWidth = e.optionsAffichage.fullWidth), t.icone = e.icone, t.type = e.typeBouton, t.setClick(e.click), t.dblclick = e.dblclick, t.shiftClick = e.shiftClick, t.touchLong = e.touchLong, t.id = e.id, t.color ??= enumCouleurBouton$1.Utilisateur, t.positionIcone ??= enumPosition$1.Left, t.size ??= enumTailleBouton$1.M, t.reponsiveButton ??= enumPositionnementResponsiveBouton$1.Defaut, t.type ??= enumTypeBouton$1.Standard, t.style ?? (t.type == enumTypeBouton$1.Standard && (t.text == null || t.text == "") || t.type == enumTypeBouton$1.TexteHorsBouton ? t.style = enumStyleBouton$1.Simple : t.style = enumStyleBouton$1.SansFondAvecContour), t.disabled ??= !1, t.fullHeight ??= !1, t.fullWidth ??= !1, t.rounded ?? (t.type == enumTypeBouton$1.Standard && (t.text == null || t.text == "") || t.type == enumTypeBouton$1.TexteHorsBouton ? t.rounded = !0 : t.rounded = !1), t.optionsAffichage = e.optionsAffichage, t.createButton(), e.binding != null) {
			if (e.binding.visibility != null) {
				switch (e.binding.visibility.Value) {
					case enumVisibility.afficher:
						afficherxElements$1(t.mainDiv);
						break;
					case enumVisibility.masquer:
						cacherxElements$1(t.mainDiv, !1);
						break;
					case enumVisibility.masquerAvecCollapse:
						cacherxElements$1(t.mainDiv, !0);
						break;
				}
				e.binding.visibility.bind((e) => {
					switch (e) {
						case enumVisibility.afficher:
							afficherxElements$1(t.mainDiv);
							break;
						case enumVisibility.masquer:
							cacherxElements$1(t.mainDiv, !1);
							break;
						case enumVisibility.masquerAvecCollapse:
							cacherxElements$1(t.mainDiv, !0);
							break;
					}
				});
			}
			e.binding.textVariable != null && (t.textVariableBind = e.binding.textVariable, t.textVariableBind.bind((e) => {
				t.setTexte(e);
			}));
		}
	}
	createButton() {
		let e = this;
		e.mainDiv = new xxContainerEvent$1({
			class: e.class + e.getMainClass(),
			stopPropagation: !0,
			id: e.id,
			disabled: e.disabled,
			titleLocalise: e.title,
			onClick: (t) => {
				e.clickBehaviour(t, !1);
			},
			onShiftClick: (t) => {
				e.clickBehaviour(t, !0);
			},
			onTouchLong: (t) => {
				e.touchLong == null ? t() : e.longTouchBehaviour(t);
			},
			onDblClick: (t) => {
				e.dblclick == null ? t() : e.dblclick(t, e);
			}
		}), e.secondDiv = new xDiv$1({ class: "xxBoutonContent" + e.getSecondClass() }), e.reGenerateContentSecondeDiv(), e.type == enumTypeBouton$1.Standard ? e.mainDiv.asHolder.append(e.secondDiv) : e.type == enumTypeBouton$1.TexteHorsBouton && (e.optionLabel == null ? e.label = new xxLabel({ textVariable: e.text }) : e.label = new xxLabel(e.optionLabel), e.mainDiv.asHolder.append(e.label), e.positionIcone == enumPosition$1.Left || e.positionIcone == enumPosition$1.Top ? (e.mainDiv.asHolder.append(e.secondDiv), e.mainDiv.asHolder.append(e.label)) : (e.mainDiv.asHolder.append(e.label), e.mainDiv.asHolder.append(e.secondDiv))), e.optionsAffichage != null && xStyle.AppliquerOptionsAffichage(e.secondDiv, e.optionsAffichage);
	}
	reGenerateContentSecondeDiv() {
		let e = this;
		e.secondDiv.asHolder.empty(), e.type == enumTypeBouton$1.Standard ? (e.span = new xSpan({ textVariable: e.text }), e.positionIcone == enumPosition$1.Left || e.positionIcone == enumPosition$1.Top ? (e.icone != null && e.secondDiv.asHolder.append(e.icone), e.text != null && e.text != "" && e.secondDiv.asHolder.append(e.span)) : (e.text != null && e.text != "" && e.secondDiv.asHolder.append(e.span), e.icone != null && e.secondDiv.asHolder.append(e.icone))) : e.type == enumTypeBouton$1.TexteHorsBouton && e.icone != null && e.secondDiv.asHolder.append(e.icone);
	}
	getMainClass() {
		let e = this, t = "";
		return t += " xbtn-typ_" + enumTypeBouton$1[e.type].toString().toLowerCase(), t += " xbtn-res_" + enumPositionnementResponsiveBouton$1[e.reponsiveButton].toString().toLowerCase(), e.type == enumTypeBouton$1.TexteHorsBouton && (t += " xbtn-pos_" + enumPosition$1[e.positionIcone].toString().toLowerCase()), e.disabled == 1 && (t += " xbtn-disabled"), t;
	}
	getSecondClass() {
		let e = this, t = "";
		return t += " xbtn-sty_" + enumStyleBouton$1[e.style].toString().toLowerCase(), t += " xbtn-cou_" + enumCouleurBouton$1[e.color].toString().toLowerCase(), t += " xbtn-siz_" + enumTailleBouton$1[e.size].toString().toLowerCase(), e.type == enumTypeBouton$1.Standard ? (t += " xbtn-pos_" + enumPosition$1[e.positionIcone].toString().toLowerCase(), (e.text == null || e.text == "") && (t += " xbtn-icon_only")) : t += " xbtn-icon_only", e.rounded == 1 && (t += " xbtn-rounded"), e.fullHeight == 1 && (t += " xbtn-fullHeight"), e.fullWidth == 1 && (t += " xbtn-fullWidth"), t;
	}
	clickBehaviour(t, n) {
		let r = this, i;
		switch (r.confirmBehaviour) {
			case enumComportementBouton.Standard:
				i = new Promise((e, t) => {
					e({});
				});
				break;
			case enumComportementBouton.ActionDifferee:
				i = new Promise((t, n) => {
					let i = new e({
						textLocalise: "Annuler",
						titleLocalise: "annuler",
						icone: new IconeSvg$1(enumIconeSvg$1.croix),
						class: "cancelState",
						click: function(e) {
							n();
						}
					});
					r.y.parentElement.append(i.y), setTimeout(() => {
						t({}), i.deleteButton();
					}, 3e3);
				});
				break;
			case enumComportementBouton.ActionAConfirmer:
				i = new Promise((t, n) => {
					let i = new e({
						textLocalise: "confirmer",
						titleLocalise: "confirmer",
						icone: new IconeSvg$1(enumIconeSvg$1.validation),
						class: "confirmState",
						click: (e) => {
							t({});
						}
					});
					r.y.parentElement.append(i.y), setTimeout(() => {
						n(), i.deleteButton();
					}, 3e3);
				});
				break;
			case enumComportementBouton.ValidationBloquante:
				i = new Promise((e, t) => {
					let n = "Etes vous sûr ?";
					r.confirmString != null && (n = r.confirmString()), xOutils$1.afficherMessageConfirmationLocalise(n, !1, (n) => {
						n ? e({}) : t();
					});
				});
				break;
		}
		i.then(() => {
			r.shiftClick != null && n ? r.shiftClick(t, r) : r.click(t, r);
		}, () => {
			xOutils$1.afficherMessageAlertifyError("annulé"), r.mainDiv.operationEnCoursRemove();
		});
	}
	longTouchBehaviour(e) {
		let t = this, n;
		n = new Promise((e, t) => {
			e({});
		}), n.then(() => {
			t.touchLong(e, t);
		}, () => {
			xOutils$1.afficherMessageAlertifyError("annulé"), t.mainDiv.operationEnCoursRemove();
		});
	}
	isOptionLabelled(e) {
		return e.optionsLabel != null;
	}
	showButton() {
		afficherxElements$1(this.mainDiv);
	}
	hideButton(e) {
		cacherxElements$1(this.mainDiv, e ?? !1);
	}
	addClass(e) {
		this.mainDiv.asHolder.addClass(e);
	}
	removeClass(e) {
		this.mainDiv.asHolder.removeClass(e);
	}
	deleteButton() {
		this.mainDiv.y.remove();
	}
	setSubrianceLabel(e) {
		let t = this;
		t.label != null && t.label.setSurbrillance(e);
	}
	setSubrianceBindingLabel(e) {
		let t = this;
		t.label != null && t.label.setSurbrillanceBinding(e);
	}
	setColor(e) {
		let t = this;
		t.color != null && (t.secondDiv.removeClass("xbtn-cou_" + enumCouleurBouton$1[t.color].toString().toLowerCase()), t.color = e, t.secondDiv.addClass("xbtn-cou_" + enumCouleurBouton$1[t.color].toString().toLowerCase()));
	}
	getIcone() {
		return this.icone;
	}
	setIcone(e) {
		let t = this;
		t.icone = e, t.reGenerateContentSecondeDiv();
	}
	ToggleAffichageDisabled(e) {
		let t = this;
		t.mainDiv.asHolder.removeClass("xbtn-disabled"), (!t.disabled && e == null || e == 1) && t.mainDiv.asHolder.addClass("xbtn-disabled"), t.disabled = e ?? !t.disabled, t.mainDiv.setDisabled(e);
	}
	getText() {
		return this.span.y.textContent;
	}
	changerText(e) {
		let t = this;
		t.text = e, t.span.y.textContent = e;
	}
	setTitle(e) {
		let t = this;
		t.mainDiv.y.title = e;
	}
	setTexte(e) {
		let t = this;
		t.text = e, t.type == enumTypeBouton$1.Standard ? t.span.y.textContent = e : t.label.y.textContent = e;
	}
	setOperationEnCours() {
		this.mainDiv.operationEnCours();
	}
	removeOperationEnCours() {
		this.mainDiv.operationEnCoursRemove();
	}
	get y() {
		return this.mainDiv.y;
	}
	removeAttribute(e) {
		let t = this;
		return t.y.removeAttribute(e), t;
	}
	setAttribute(e, t) {
		let n = this;
		return n.y.setAttribute(e, e), n;
	}
	setClick(e) {
		let t = this;
		return t.click = e, t;
	}
	setShiftClick(e) {
		let t = this;
		return t.shiftClick = e, t;
	}
	fakeClick() {
		this.y.click();
	}
}, enumAlignementZone$1 = /* @__PURE__ */ function(e) {
	return e.gauche = "xpag-align_gauche", e.centre = "xpag-align_centre", e.droite = "xpag-align_droite", e;
}({}), enumStyleHeader = /* @__PURE__ */ function(e) {
	return e.avecOmbreT20 = "xpag-header_avecombre", e.sansOmbreT20 = "xpag-header_sansombre", e;
}({}), xxPageWrapper$1 = class {
	zoneWS;
	zoneTitleDiv;
	zoneTitle;
	zonePrincipaleDiv;
	zonePrincipale;
	zoneFooterDiv;
	zoneFooter;
	zonePreHeaderDiv;
	zonePreHeader;
	alignementFooter;
	alignementHeader;
	titre;
	localizationParams;
	divPincipal;
	divSecondaire;
	compteurAppelWS = 0;
	iconePage;
	ledivTitre;
	divAttente = null;
	attachToContentHolder() {
		return this.attachTo(document.body.getElementsByClassName("contentHolder").item(0));
	}
	attachToBody() {
		return document.body.append(), this.attachTo(document.body);
	}
	attachTo(e) {
		let t = this;
		return e.append(t.y), this;
	}
	get Titre() {
		let e = this;
		return e.titre.format(e.localizationParams);
	}
	set TitreLocalise(e) {
		let t = this;
		t.titre = new xLString$1(e), t.ledivTitre.y.textContent = t.Titre;
	}
	set TitreVariable(e) {
		let t = this;
		t.ledivTitre.y.textContent = e;
	}
	addClass(e) {
		let t = this;
		return t.divPincipal.addClass(e), t;
	}
	removeClass(e) {
		let t = this;
		return t.divPincipal.removeClass(e), t;
	}
	ajouterWS() {
		let e = this;
		e.compteurAppelWS++;
		let t = "pair";
		e.compteurAppelWS % 2 == 1 && (t = "impair");
		let n = new xDiv$1({ class: "xxPage_wsLineElement " + t });
		return e.zoneWS.asHolder.append(n), n;
	}
	constructor(e) {
		let t = this, n = new xLString$1(e.titleLocalise);
		e.localizationParams != null && e.localizationParams.length > 0 && (t.localizationParams = e.localizationParams), t.titre = n, e.icone != null && (t.iconePage = e.icone), e.class ??= "", e.classBody ??= "", e.centrerContenu && (e.class += " contenuCentre"), e.withFooter ??= !1, e.withHeader ??= !0, e.withPreHeader ??= !0, e.scrollableHeader ??= !1, t.divPincipal = new xDiv$1({
			class: "xxpage " + e.class,
			id: e.id
		}), t.divSecondaire = new xDiv$1({ class: "xxpage_sousDiv" }), t.zoneWS = new xDiv$1({ class: "xxpage_wsLine" }), t.divPincipal.asHolder.append(t.zoneWS), e.withPreHeader && (t.zonePreHeaderDiv = new xDiv$1({ class: "xxpage_preheader" }), t.zonePreHeader = t.zonePreHeaderDiv.asHolder, t.divPincipal.asHolder.append(t.zonePreHeaderDiv)), e.withHeader && (t.zoneTitleDiv = new xDiv$1({ class: "xxpage_header" }), e.scrollableHeader && t.zoneTitleDiv.addClass("mobilestickyHeader"), t.zoneTitle = t.zoneTitleDiv.asHolder, t.iconePage != null && t.zoneTitle.append(t.iconePage), t.ledivTitre = new xDiv$1({
			textVariable: t.Titre,
			class: "xxpage_titre"
		}), t.zoneTitle.append(t.ledivTitre), e.initContentHeader != null && e.initContentHeader.forEach((e) => {
			t.appendZoneTitle(e);
		})), t.zonePrincipaleDiv = new xDiv$1({ class: "xxpage_body " + e.classBody }), t.zonePrincipale = new xElementHolder(t.zonePrincipaleDiv), e.withHeader ? (e.alignementHeader ??= enumAlignementZone$1.gauche, t.zoneTitleDiv.addClass(e.alignementHeader), e.scrollableHeader ? (t.divSecondaire.asHolder.append(t.zoneTitleDiv), t.divSecondaire.asHolder.append(t.zonePrincipaleDiv), t.divPincipal.asHolder.append(t.divSecondaire)) : (t.divPincipal.asHolder.append(t.zoneTitleDiv), t.divPincipal.asHolder.append(t.zonePrincipaleDiv))) : t.divPincipal.asHolder.append(t.zonePrincipaleDiv), e.withFooter && (t.zoneFooterDiv = new xDiv$1({ class: "xxpage_footer" }), t.zoneFooter = new xElementHolder(t.zoneFooterDiv), t.divPincipal.asHolder.append(t.zoneFooterDiv), e.alignementFooter ??= enumAlignementZone$1.droite, t.zoneFooter.addClass(e.alignementFooter), e.initContentFooter != null && e.initContentFooter.forEach((e) => {
			t.appendZoneFooter(e);
		})), e.initContent != null && e.initContent.forEach((e) => {
			t.append(e);
		}), e.optionsAffichage != null && (e.optionsAffichage.padding || (e.optionsAffichage.padding = { Tous: 20 })), xStyle.AppliquerOptionsAffichage(t.zonePrincipaleDiv, e.optionsAffichage), e.optionsAffichage?.styleHeader && t.zoneTitleDiv.addClass(e.optionsAffichage?.styleHeader);
	}
	viderZoneTitle() {
		let e = this;
		e.zoneTitle.vider(), e.ledivTitre != null && e.zoneTitle.append(e.ledivTitre);
	}
	get y() {
		return this.divPincipal.y;
	}
	append(e) {
		let t = this;
		return t.zonePrincipale.append(e), t;
	}
	appendZoneTitle(e) {
		let t = this;
		return t.zoneTitle.append(e), t;
	}
	appendZoneFooter(e) {
		let t = this;
		return t.zoneFooter.append(e), t;
	}
	appendZonePreHeader(e) {
		let t = this;
		return t.zonePreHeader.append(e), t;
	}
	activerAlerte(e) {
		let t = this, n = new xxWrapPanel({
			class: "xxpage_bandeau_alerte openBandeau",
			alignementVertical: enumAlignementVerticalWrapPanel.centre,
			espaceMinimaliste: !0,
			initContent: [
				new xxLabel({ textLocalise: e.textLocalise }),
				new xxBouton({
					textLocalise: e.textLocaliseBouton,
					click: (t) => {
						e.action(t);
					},
					titleLocalise: "",
					optionsAffichage: {
						tailleBouton: enumTailleBouton$1.S,
						couleurBouton: enumCouleurBouton$1.Neutre
					}
				}),
				new xxBouton({
					icone: new IconeSvg$1(enumIconeSvg$1.croix, { taille: tailleIcone$1.XS }),
					optionsAffichage: {
						tailleBouton: enumTailleBouton$1.Fit,
						couleurBouton: enumCouleurBouton$1.Neutre,
						margin: { Tous: 0 }
					},
					click: (e) => {
						n.y.remove();
					},
					titleLocalise: ""
				})
			]
		});
		t.zonePreHeader.append(n);
	}
	activerAttente(e) {
		let t = this;
		t.divAttente ?? (t.divAttente = new xDiv$1({ class: "divMiseEnAttente" }), t.divAttente.asHolder.append(new xxLabel({
			habillage: enumHabillageLabel$1.loading,
			textLocalise: e ?? "Enregistrement en cours."
		})), t.divPincipal.asHolder.append(t.divAttente)), t.divAttente.showDiv();
	}
	desactiverAttente() {
		this.divAttente.hideDiv();
	}
}, xxShowRoomSample$1 = class e {
	static classSampleDiv_Red = "sampleDiv_Red";
	static classSampleDiv_Bleu = "sampleDiv_Bleu";
	static classSampleDiv_Green = "sampleDiv_Green";
	static classSampleLabel = "sampleLabel";
	static divSample(t) {
		let n = "";
		switch (t == -1 && (t = Math.floor(Math.random() * 3) + 1), t ||= 1, t) {
			case 2:
				n = e.classSampleDiv_Bleu;
				break;
			case 3:
				n = e.classSampleDiv_Green;
				break;
			default: n = e.classSampleDiv_Red;
		}
		return new xDiv$1({ class: n });
	}
	static listeCleValeurs() {
		return [
			{
				cle: "test",
				valeur: "petit"
			},
			{
				cle: "test2",
				valeur: "grand"
			},
			{
				cle: "test3",
				valeur: "moyen"
			}
		];
	}
	static listeStrings() {
		return [
			"Farine",
			"Fromage",
			"Rosette",
			"Chocolat",
			"Poule",
			"OuiThen",
			"petittesttest"
		];
	}
	static listeNombre() {
		return [
			42,
			6,
			1999,
			69,
			75,
			45,
			12,
			0,
			666
		];
	}
	static listeboolean() {
		return [
			!1,
			null,
			!0
		];
	}
	static listeObjet() {
		return e.listeStrings().map((e) => ({ toString: () => "je suis l'objet \"" + e + "\"" }));
	}
	static listeCustom() {
		let e = [];
		return e.push(new xxShowroomCustomSample("Orange", "Fruit", "Orange")), e.push(new xxShowroomCustomSample("Fraise", "Fruit", "rouge")), e.push(new xxShowroomCustomSample("Pasteque", "Fruit", "Vert")), e.push(new xxShowroomCustomSample("Abrico", "Fruit", "Orange")), e.push(new xxShowroomCustomSample("Kiwi", "Fruit", "marron")), e.push(new xxShowroomCustomSample("Carote", "Legume", "Orange")), e.push(new xxShowroomCustomSample("Pomme de terre", "Legume", "marron")), e.push(new xxShowroomCustomSample("Haricot vert", "Legume", "Vert")), e.push(new xxShowroomCustomSample("Salade", "Legume", "Vert")), e.push(new xxShowroomCustomSample("Ognion", "Legume", "jaune")), e;
	}
	static urlIFrame() {
		return "https://www.openstreetmap.org/export/embed.html?bbox=-0.004017949104309083%2C51.47612752641776%2C0.00030577182769775396%2C51.478569861898606&layer=mapnik";
	}
	static imageBase64(e) {
		switch (e ||= 1, e) {
			case 2: return "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";
			case 3: return "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";
			default: return "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";
		}
	}
	static PDFBase64() {
		return "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Pj4KZW5kb2JqCjEgMCBvYmoKPDwKL1R5cGUgL0NhdGFsb2cKL1BhZ2VzIDIgMCBSCi9MYW5nIChmci1GUikKL1ZpZXdlclByZWZlcmVuY2VzIDEyIDAgUgo+PgplbmRvYmoKMyAwIG9iago8PAovQXV0aG9yIChOaWNvbGFzIERJU1NBVVgpCi9DcmVhdG9yIDxGRUZGMDA0RDAwNjkwMDYzMDA3MjAwNkYwMDczMDA2RjAwNjYwMDc0MDBBRTAwMjAwMDU3MDA2RjAwNzIwMDY0MDAyMDAwNzAwMDZGMDA3NTAwNzIwMDIwMDA0RDAwNjkwMDYzMDA3MjAwNkYwMDczMDA2RjAwNjYwMDc0MDBBMDAwMzMwMDM2MDAzNT4KL0NyZWF0aW9uRGF0ZSAoRDoyMDIyMDYxNzA5MjUyMSswMicwMCcpCi9Qcm9kdWNlciAoaUxvdmVQREYpCi9Nb2REYXRlIChEOjIwMjIwODA4MDkyMDU1WikKPj4KZW5kb2JqCjEzIDAgb2JqCjw8Ci9TaXplIDE0Ci9Sb290IDEgMCBSCi9JbmZvIDMgMCBSCi9JRCBbPDIxNzI3MzY2QkQxRDE2NDE5MTE0MTRCNkExQjRDOUYwPiA8QjM4MjkyMDlFMDcwRjEzQkZENTEyOTA5NUJGMDRCRDY+XQovVHlwZSAvWFJlZgovVyBbMSAyIDJdCi9GaWx0ZXIgL0ZsYXRlRGVjb2RlCi9JbmRleCBbMCAxNF0KL0xlbmd0aCA2MAo+PgpzdHJlYW0KeJxjYGD4/59RbRsDA6NaLZBQ5wcSqllAQqUeSCinAgnF+0CCASShdAskwQsi3EA6AoGEhgEDAwB/zAjwCmVuZHN0cmVhbQplbmRvYmoKc3RhcnR4cmVmCjEwMjg4CiUlRU9GCg==";
	}
	static E_Med = "iVBORw0KGgoAAAANSUhEUgAAASwAAACqCAYAAAAX43IEAAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9TRZEWBTuIOGSoThbEj+IoVSyChdJWaNXB5NIvaNKQpLg4Cq4FBz8Wqw4uzro6uAqC4AeIo5OToouU+L+k0CLGg+N+vLv3uHsHCI0KU82uCUDVLCMVj4nZ3KrY8woBAwgiihmJmXoivZiB5/i6h4 + vdxGe5X3uzxFU8iYDfCLxHNMNi3iDOLpp6Zz3iUOsJCnE58TjBl2Q + JHrsstvnIsOCzwzZGRS88QhYrHYwXIHs5KhEk8ThxVVo3wh67LCeYuzWqmx1j35CwN5bSXNdZojiGMJCSQhQkYNZVRgIUKrRoqJFO3HPPzDjj9JLplcZTByLKAKFZLjB / +D392ahalJNykQA7pfbPtjFOjZBZp12 / 4 + tu3mCeB / Bq60tr / aAGY / Sa + 3tfAR0L8NXFy3NXkPuNwBhp50yZAcyU9TKBSA9zP6phwweAv0rbm9tfZx + gBkqKvlG + DgEBgrUva6x7t7O3v790yrvx / nsHLWy1kR7wAAAAlwSFlzAAAuIwAALiMBeKU / dgAAAAd0SU1FB + YCEA4AJBCNnxsAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAABmJLR0QAzgCJAABBgs3KAACp3klEQVR42uz9149teZaYiX3b2 + N9 + Ljep8 + sLNtV1V1d3WQbWkGCRqMhOTOCMID + hXnSg14FQRIoCBBFaYYQh2xOd5PsLm + zMisrzU1zXcQNb44 / Z3u / 9ZA9ggRBAjkkpa7s8z0E4iEiEHHirA9rrf37rSXs / MP / smTFihUrfg2QVy / B / wfKEooCIc0Q04yyKAAQBBA++wxKyCiRJAkUmRxAEkEU / +JrBcr / 7ptWrFixEta / i5CEskTIC4qiQCpKRErSskQooXA8jIsR / SjEzDO8MGIZJ0iiiISAJIh4cYaT5siWhl21SEuIBUgUFc3UUW2TxDaJDQNUBeEvRCYKAuVfyEwQ / h8f + O88uGLFir / qwiqBskDIcpQkQYlTlDBCdH0kNyBdOmhpjpukiGWB6nqokzFbN69iV02OJhOci0scP0EsRcpcoGo16AsyE2dK1rEwFB3Bdyl8H7NaJa9oyIZFYFhknRZyvQKSiCZLpJpKBqiShKZrCIKAJMtEskihKAiyRCkICIKwytBWrPgrI6yyRMwyCELyuYvmuFQXSyoLh3zpkYYxlqxxcTGkFGV0SSCPQzZ7DRJd4 / zohEKWmC8W + L6HoVuEQU4cZvRaNooksww8ylTAqphkQcyVzR6SUHB6eoxp + AhRigcUukqtWkGSUwRd43AZkKGgaQaarKI0KyQ1nbhepTQMFNNAME0kQyeXZZCkVQa2YiWszy1Fgen5CBdjhLNzODnDcByapkWRFThugJ + knEUxOSKCrKOjk8Qw8SMkSSOOU1x3gaFDRZcxzIKKIbKxvsPz / TnHFx6ZXiIQ4bouQlxwY3OXy8sLyhiSIkUURdQsJRcSbmytkQsTLNsiezjn5PgMTzFIRY38eUmqZ + SKgKBr1AdrpNUGSr2O0q4TV6tklkGuaiCuzLXirx5S / fd / 47 / 8XP5heY49nmM / esba6SnC2THFcsmg3cZQNIbDCYUoopoGfpbipzEIMrKkECcpyzBC0nXCvMDzfDRdQjULkiRj98Z1vvqNrxJkCbNwgVlVuXvzCld3NiDLePPVl5HyHGc2JQ5TXnjpHrdvXsV1XGp1g6KIyNMCVZDZ6G4SBBGFKPHii6 / Sbw4IZg5SnIA7x1wsYP8IYbagmM6ppTF1WaJUFFJRXJWLK1YZ1uchs5KGU9T3PkY9PeH1L7 / Bu2lCEueMxktUUUEUJbI8xTJsGkKV + DJGyEKiOCJLUkTNIIgCsiwFJUGrmOxe3eV8OKHa6rF97QYXC5eL + Rhn5nL39hVkQST3lnTbNrZyla2tLvuHJ3zrm1 / GC0M + fPgxF88PUHQZx48oUei0LUxZJc5Fbt + 4ju8H7O09JolzsjRHLDLkMEc6v8A / eE5x2aNz8xqtdpuTTpdlvUYpSat38oqVsH5dUf2QtYNTbmclzZvXOX9 + yP7eCWEUYQgSg06HIpMRJQmpzPGXDpYiQppBXvDS9VtUhSqGkaOoAdWqhKbqRInMyeUpp + ERP + UHJNEMw / PIspDxyTOiKGdrrUmrpfKzn / 2QXrvGl79wkxvXenz86VNur9d49ZX7PNmb8Cff / zmGnOEWC3Z6A8xGizIK2H / 6mCyKSPwQRVfRbQtNyxBlcJYR7tEll35CLsk0Ntcxbl7H2xzgGvoq21qxKgl / 3RDynOb5iKvPDri3swmiwJMnT5EbLcqiQEYkCgM8LyBMQuIkRpYE / sbv / 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";
	static RMarecheche = "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";
	static listeStringsAsync() {
		return new Promise((e) => {
			e([
				"FarineAsync",
				"FromageAsync",
				"RosetteAsync",
				"ChocolatAsync",
				"PouleAsync",
				"OuiThenAsync",
				"petittesttestAsync"
			]);
		});
	}
}, xxShowroomCustomSample = class {
	nom;
	Group;
	couleur;
	constructor(e, t, n) {
		this.nom = e, this.Group = t, this.couleur = n;
	}
	toString() {
		return this.nom + " est un " + this.Group;
	}
}, xxShowRoomImageTooltipPreview = class {
	static xxAutoComplete = "iVBORw0KGgoAAAANSUhEUgAAANIAAABDCAMAAADefauWAAAApVBMVEUAAAAvLy9GRkZHR0dYWFhnZ2d1dXV3d3d5eXl+fn6CgoKL4bSQkJCU47qfn5+kpKSqqqqsrKytra2vr6+xsbG15822tra268+56NC6urq7u7u+vr7ExMTGxsbJycnPz8/Q0NDW1tbX19fY2Njd3d3g7ebh4eHl5eXn5+fp6enr6+vs7Ozt7e3u7u7v7+/w8PD29vb2/fn4+Pj5+fn9/f3+/v7///9NglpHAAAB/ElEQVR42u3Z0VKbQBTG8UMAohvjItUqBK10q9VsbbGV7/0frWw2ZekMuSs1Z2f/V0m4+s2c2clhqXnxrUD6lwVSID3crFfsW988jEhX169g3+v11Yi05i8ypvWItMLfEVi2CqQj7PnL0LMnpKfT5b7TJ09I+HxiRScKUySRRZS2UBHFmsCkW0u6xTQpbdtU6rhGnRK4dGlElzhAkoAUKmuhEz6kt/Pl8vzNKxJ+np39wmGSjmtugwf8+I6DJCKScMcDu6YH77gP8UBiUCD5kdckU1MVOfOKqhmT7sptB+Z12/LOkZqygwd1ZTOQqi28aFsNpKKDF3XFQMrxH1JZi7nLxyQGBdIMufcZbUpUm8HTSdZ/F0SCLcm+z4AQ0IkypHi3OgOiZkvaCdpMmY+GlJhP1Cf9IlnOfKSv6JuRpON6GDxLkrGG+jQTCcDMJDtio+NB2V8jxZYkMX+BNGuBFEgvnhQGL5ACKZACKZCmkmlMsd7/BdfJgqhMKVJQiwVF9e4ZBJHgRIo1hNgvSrv7394jZE9S5lmb1m5f50ISQJ1+s+tsr+q/tOZHlWhrkW5f94hkOZxI7tXQNMnu64xIRCT+bOjTJLuvMyKJ9z7ELzo/SF0xkD74cr+0cYNX+XELWD060n3lw13tx3s4Eh43Fznzik2OMcmL+JAC6TcfemxjkVUeUAAAAABJRU5ErkJggg==";
	static xxRouteContainer = "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";
	static xxTooltip = "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";
	static xxTreeTabControl = "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";
	static xxDialog = "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";
}, xxShowRoomOptionRecurrente = class e {
	static get_OptionsHtml(e, t) {
		let n = [
			{
				TypeOption: ExxShowRoomContainerTypeOption.Texte,
				NameOption: "class",
				ValeurDefaut: t?.class ? t.class : null,
				Facultatif: !0
			},
			{
				TypeOption: ExxShowRoomContainerTypeOption.Texte,
				NameOption: "id",
				Facultatif: !0
			},
			{
				TypeOption: ExxShowRoomContainerTypeOption.Function,
				Function: (e) => {
					e();
				},
				NameOption: "click",
				Facultatif: !0
			},
			{
				TypeOption: ExxShowRoomContainerTypeOption.Number,
				NameOption: "tabindex",
				Facultatif: !0
			},
			{
				TypeOption: ExxShowRoomContainerTypeOption.Custom,
				NameOption: "autocomplete",
				GenerateOption: (e) => new xxRadioButton({
					initElements: [
						{
							valeur: "on",
							libelleVariable: "On"
						},
						{
							valeur: "off",
							libelleVariable: "Off"
						},
						{
							valeur: null,
							libelleVariable: "non defini",
							preselectionne: !0
						}
					],
					valueChange: (t) => {
						e(t, t);
					}
				}),
				Facultatif: !0
			}
		];
		return e && (n = n.concat(e)), n;
	}
	static get_OptionsAffichage(e, t) {
		let n = [
			{
				TypeOption: ExxShowRoomContainerTypeOption.Enum,
				NameOption: "curseur",
				EnumType: "enumCurseur",
				ValeurDefaut: t?.curseur ? t.curseur : enumCurseur.defaut,
				Facultatif: !0
			},
			{
				TypeOption: ExxShowRoomContainerTypeOption.CotesCSS,
				NameOption: "margin",
				Facultatif: !0
			},
			{
				TypeOption: ExxShowRoomContainerTypeOption.CotesCSS,
				NameOption: "padding",
				Facultatif: !0
			},
			{
				TypeOption: ExxShowRoomContainerTypeOption.CotesCSS,
				NameOption: "border",
				Facultatif: !0
			}
		];
		return e && (n = n.concat(e)), n;
	}
	static get_OptionsAffichageBouton(t, n) {
		let r = [
			{
				TypeOption: ExxShowRoomContainerTypeOption.Enum,
				NameOption: "styleBouton",
				EnumType: "enumStyleBouton",
				ValeurDefaut: enumStyleBouton.Simple,
				Facultatif: !0
			},
			{
				TypeOption: ExxShowRoomContainerTypeOption.Enum,
				NameOption: "positionnementResponsiveBouton",
				EnumType: "enumPositionnementResponsiveBouton",
				ValeurDefaut: enumPositionnementResponsiveBouton.Defaut,
				Facultatif: !0
			},
			{
				TypeOption: ExxShowRoomContainerTypeOption.Enum,
				NameOption: "tailleBouton",
				EnumType: "enumTailleBouton",
				ValeurDefaut: enumTailleBouton.M,
				Facultatif: !0
			},
			{
				TypeOption: ExxShowRoomContainerTypeOption.Enum,
				NameOption: "couleurBouton",
				EnumType: "enumCouleurBouton",
				ValeurDefaut: enumCouleurBouton.Utilisateur,
				Facultatif: !0
			},
			{
				TypeOption: ExxShowRoomContainerTypeOption.Enum,
				NameOption: "positionIconeBouton",
				EnumType: "enumPosition",
				ValeurDefaut: enumPosition.Left,
				Facultatif: !0
			},
			{
				TypeOption: ExxShowRoomContainerTypeOption.Boolean,
				NameOption: "boutonArrondi",
				Facultatif: !0
			}
		];
		return t && (r = r.concat(t)), r = e.get_OptionsAffichage(r, n), r;
	}
	static get_OptionsXxNavOngletItem(t) {
		let n = [
			{
				TypeOption: ExxShowRoomContainerTypeOption.Texte,
				NameOption: "id",
				Facultatif: !0
			},
			{
				TypeOption: ExxShowRoomContainerTypeOption.Texte,
				NameOption: "class",
				Facultatif: !0
			},
			{
				TypeOption: ExxShowRoomContainerTypeOption.TexteLocalisable,
				NameOptionLocalisable: "textLocalise",
				NameOptionVariable: "textVariable"
			},
			{
				TypeOption: ExxShowRoomContainerTypeOption.Boolean,
				NameOption: "isOngletPreselected",
				Facultatif: !0
			},
			{
				TypeOption: ExxShowRoomContainerTypeOption.CouleurHexa,
				NameOption: "color",
				Facultatif: !0
			},
			{
				TypeOption: ExxShowRoomContainerTypeOption.Function,
				NameOption: "onSelect",
				Function: (e) => {},
				Facultatif: !0
			},
			{
				TypeOption: ExxShowRoomContainerTypeOption.Function,
				NameOption: "GenerateContent",
				isDefaultSelect: !0,
				Function: () => xxShowRoomSample.divSample(-1),
				Facultatif: !0
			}
		];
		return t ??= 4, t > 0 && n.push({
			TypeOption: ExxShowRoomContainerTypeOption.ListeSousInterface,
			NameOption: "SousOnglet",
			listOption: e.get_OptionsXxNavOngletItem(--t),
			Facultatif: !0
		}), n;
	}
}, ExxShowRoomContainerTypeOption$1 = /* @__PURE__ */ function(e) {
	return e[e.SousInterface = 0] = "SousInterface", e[e.ListeSousInterface = 1] = "ListeSousInterface", e[e.Texte = 2] = "Texte", e[e.TexteLocalisable = 3] = "TexteLocalisable", e[e.Enum = 4] = "Enum", e[e.Boolean = 5] = "Boolean", e[e.Function = 6] = "Function", e[e.Number = 7] = "Number", e[e.Icone = 8] = "Icone", e[e.CouleurHexa = 9] = "CouleurHexa", e[e.Date = 10] = "Date", e[e.DateSerialisable = 11] = "DateSerialisable", e[e.iXElement = 12] = "iXElement", e[e.ListeiXElement = 13] = "ListeiXElement", e[e.Donnees = 14] = "Donnees", e[e.Time = 15] = "Time", e[e.Pagewapper = 16] = "Pagewapper", e[e.CotesCSS = 17] = "CotesCSS", e[e.Custom = 18] = "Custom", e;
}(ExxShowRoomContainerTypeOption$1 || {}), ExxShowRoomContaineGoupeElement$1 = /* @__PURE__ */ function(e) {
	return e.xElement = "x", e.xxElement = "xx", e.xxxElement = "xxx", e.deprecated_DontUse = "xxxx", e;
}(ExxShowRoomContaineGoupeElement$1 || {}), ExxShowRoomContaineDataType$1 = /* @__PURE__ */ function(e) {
	return e.number = "number", e.string = "string", e.boolean = "boolean", e.CleValeur = "CleValeur<string, string>", e.CustomObjet = "T", e;
}(ExxShowRoomContaineDataType$1 || {}), xxShowRoomContainer = class xxShowRoomContainer {
	static listElements;
	static ListIcone = [];
	get y() {
		return this.Page.y;
	}
	isAffichageIcone = !1;
	listePrereglage = [];
	Page;
	Grid;
	GridSecondaire;
	ZoneDeRendu;
	ListeErreur;
	GridVueIcone;
	stringRecherche = new BindableObject("");
	HaveResultatListeXElement = !0;
	IsT20 = new BindableObject(xClass.Theme == enumThemes.Theme2020);
	timeOutId;
	xstyle = new xStyle();
	constructor(e) {
		let t = this;
		xxShowRoomContainer.listElements ||= new ObservableCollection$1(), t.listePrereglage = xxShowRoomContainer.listElements.All().filter((e) => e.ListePreReglageOption != null && e.ListePreReglageOption.length > 0), xxShowRoomContainer.listElements.bind((e) => {
			t.listePrereglage = xxShowRoomContainer.listElements.All().filter((e) => e.ListePreReglageOption != null && e.ListePreReglageOption.length > 0);
		}, (e) => {
			t.listePrereglage = xxShowRoomContainer.listElements.All().filter((e) => e.ListePreReglageOption != null && e.ListePreReglageOption.length > 0);
		}), t.Page = new xxPageWrapper$1({
			titleLocalise: "Showroom (Alpha)",
			class: "xxShowroomContener"
		}), t.Page.zoneTitle.append(new xxContainerEvent$1({
			initContent: new xxLabel({
				textVariable: "Alpha du nouveau showroom ! Il reste donc beaucoup de bugs et de fonctionnalités non finies.\rSi vous rencontrez un problème ou un bug, contactez Aimeric-Thomas Dalvai :)\rMerci de votre compréhension ! For a better Showroom !!",
				lineBreak: !0,
				miseEnForme: enumMiseEnFormeLabel.espacesEtSautsDeLignePreserves,
				optionsAffichage: { margin: { Droite: 20 } }
			}),
			onDblClick: (e) => {
				t.ListeErreur.empty(), t.GridSecondaire.vider(), t.GridSecondaire.append([new xxGridItem({
					colStart: 1,
					rowStart: 1,
					nbCols: 3,
					nbRows: 5,
					optionsAffichage: { alignementContenu: enumAlignementContenu.CentreCentre },
					content: new xxImageTabByte({
						tabByte: xxShowRoomSample$1.E_Med,
						typeAffichage: enumTypeImage.domImage
					})
				})]), e();
			}
		})), t.IsT20.bind((e) => {
			e ? Array.from(t.Page.y.getElementsByClassName("tleg")).forEach(function(e) {
				e.classList.remove("tleg"), e.classList.add("t20");
			}) : Array.from(t.Page.y.getElementsByClassName("t20")).forEach(function(e) {
				e.classList.remove("t20"), e.classList.add("tleg");
			});
		});
		let n = new xxGrid({
			colonnes: ["1", "auto"],
			fullWidth: !1
		});
		if (n.append([new xxGridItem({
			colStart: 1,
			rowStart: 1,
			optionsAffichage: { alignementContenu: enumAlignementContenu.CentreCentre },
			content: new xInputTextAvecIcone({
				id: "searchMain",
				icone: enumIconeSvg.recherche,
				champLarge: !0,
				binding: { value: t.stringRecherche },
				autoChange: !0
			})
		}), new xxGridItem({
			colStart: 2,
			rowStart: 1,
			content: new xxLabelContainer({
				textVariable: "Thème de rendu : ",
				initContent: new xxRadioButton({
					id: "radioTlegT20",
					initElements: [{
						libelleVariable: "Tleg",
						valeur: "1",
						preselectionne: !t.IsT20.Value
					}, {
						libelleVariable: "T20",
						valeur: "2",
						preselectionne: t.IsT20.Value
					}],
					valueChange: function(e) {
						t.IsT20.Value = e == "2";
					}
				})
			})
		})]), t.Page.appendZoneTitle(n), xxShowRoomContainer.ListIcone.length > 0) {
			let e = new xxBouton({
				optionsAffichage: {
					tailleBouton: t.IsT20.Value ? null : enumTailleBouton.L,
					styleBouton: t.IsT20.Value ? enumStyleBouton.SansFondAvecContour : null
				},
				typeBouton: enumTypeBouton.Standard,
				textLocalise: "Icones",
				titleLocalise: "Afficher les icones",
				click: (n) => {
					t.isAffichageIcone ? (e.changerText("Icones"), e.setTitle(new xLString$1("Afficher les icones").text), afficherxElements(t.Grid), cacherxElements(t.GridVueIcone, !0), t.HaveResultatListeXElement = !1, i.filtrer(), t.stringRecherche.Value ? t.ReGenerateGridSecondaireRecherche() : t.ReGenerateGridSecondaireEmpty()) : (e.changerText("xElement"), e.setTitle(new xLString$1("Afficher les xElement").text), cacherxElements(t.Grid, !0), afficherxElements(t.GridVueIcone), t.ReGenerateGridIcone()), t.isAffichageIcone = !t.isAffichageIcone, n();
				}
			});
			n.append([new xxGridItem({
				colStart: 3,
				rowStart: 1,
				optionsAffichage: { alignementContenu: enumAlignementContenu.CentreCentre },
				content: e
			})]);
		}
		e.CallOldShowRoom_Temporaire != null && (t.IsT20.Value ? t.Page.zoneTitle.append(new xxBouton({
			typeBouton: enumTypeBouton.Standard,
			textLocalise: "Ancien ShowRoom",
			titleLocalise: "Afficher ancien ShowRoom",
			click: (t) => {
				e.CallOldShowRoom_Temporaire(t);
			}
		})) : t.Page.zoneTitle.append(new xxBouton({
			optionsAffichage: { tailleBouton: enumTailleBouton.L },
			typeBouton: enumTypeBouton.Standard,
			textLocalise: "Ancien ShowRoom",
			titleLocalise: "Afficher ancien ShowRoom",
			click: (t) => {
				e.CallOldShowRoom_Temporaire(t);
			}
		})));
		let r;
		t.stringRecherche.bind((e) => {
			t.timeOutId && clearTimeout(t.timeOutId), r && clearTimeout(r), r = setTimeout(() => {
				t.isAffichageIcone ? t.ReGenerateGridIcone() : (t.HaveResultatListeXElement = !1, i.filtrer(), e ? t.ReGenerateGridSecondaireRecherche() : t.ReGenerateGridSecondaireEmpty());
			}, 500);
		}), t.Grid = new xxGrid({
			colonnes: ["250px", "1fr"],
			lignes: ["auto", "1fr"],
			fullHeight: !0,
			fullWidth: !0,
			gridGap: "0"
		}), t.Page.append(t.Grid);
		let i = new xxListWrapper({
			donnees: [],
			class: "listeXelements",
			sort: enumTypeTri.asc,
			LibelleSiVide: "Aucun xelement trouvé",
			greaterThan: function(e, t) {
				return e.NomElement.localeCompare(t.NomElement);
			},
			regroupementUniqueBy: {
				GroupBy: (e) => e.Groupe,
				groupHeaderCustom: (e, t) => {
					let n = "";
					switch (t[0].Groupe) {
						case ExxShowRoomContaineGoupeElement$1.xElement:
							n = "xElements";
							break;
						case ExxShowRoomContaineGoupeElement$1.xxElement:
							n = "xxElements";
							break;
						case ExxShowRoomContaineGoupeElement$1.xxxElement:
							n = "xxxElements";
							break;
						case ExxShowRoomContaineGoupeElement$1.deprecated_DontUse:
							n = "Deprecated / Ne pas utiliser";
							break;
					}
					e.append(new xxLabel({
						type: enumTypeLabel.important,
						textVariable: n,
						optionsAffichage: { padding: { Tous: 5 } }
					}));
				}
			},
			dataContext: xxShowRoomContainer.listElements,
			renderItem: (e, n) => {
				let r = new xxLabel({ textVariable: n.NomElement });
				t.stringRecherche.bind((e) => {
					let i = t.stringRecherche.Value.split(";").map((e) => e.toLowerCase()), a = n.NomElement.toLowerCase(), o;
					i.some((e) => a.includes(e) ? (o = e, !0) : !1), r.setSurbrillance(o);
				}), e.append(new xxToolTip({
					ToolTipPosition_by_Width_extremity: !0,
					ToolTipPositionWidthSouhaite: enumXxToolTipPositionWidth.extremiteDroite,
					TooltipStopPropagation: !0,
					class: "containerXelements",
					initContent: new xxContainerEvent$1({
						class: "boutonListeElements",
						onClick: function(e) {
							try {
								t.ReGenerateGridSecondaire(n);
							} catch (e) {
								console.error(e), t.AddErreur(n.NomElement, e);
							}
							e();
						},
						initContent: r
					}),
					onShow: function(e) {
						e.viderTooltip(), e.setToolTip(new xxLabel({ habillage: enumHabillageLabel.loading })), e.CalculPosition(), n.RenderTooltip().then((r) => {
							e.viderTooltip(), e.setToolTip(new xxLabel({
								textVariable: n.Description,
								centrer: !0,
								type: enumTypeLabel.description
							})), e.setToolTip(new xSeparateur({ orientation: enumTypeOrientation.horizontal })), e.setToolTip(r), t.IsT20.Value && Array.from(r.y.getElementsByClassName("tleg")).forEach(function(e) {
								e.classList.remove("tleg"), e.classList.add("t20");
							}), e.CalculPosition();
						}).catch(() => {
							e.viderTooltip(), e.setToolTip(new xxLabel({
								textVariable: "Une Erreur est survenue, pendant la génération du contenu de la tooltip",
								centrer: !0,
								type: enumTypeLabel.important,
								habillage: enumHabillageLabel.warning
							}));
						});
					},
					onHide: (e) => {
						e.viderTooltip();
					}
				}));
			}
		});
		i.setFiltre((e) => {
			let n = e.NomElement.toLowerCase(), r = t.stringRecherche?.Value?.split(";").map((e) => e.toLowerCase()), i = r.length == 0 || r.some((e) => n.includes(e));
			return !t.HaveResultatListeXElement && i && (t.HaveResultatListeXElement = !0), i;
		}), t.Grid.append([new xxGridItem({
			colStart: 1,
			rowStart: 1,
			nbCols: 1,
			nbRows: 2,
			content: i
		})]), t.GridSecondaire = new xxGrid({
			colonnes: [
				"300px",
				"auto",
				"1fr",
				"auto",
				"auto"
			],
			lignes: [
				"auto",
				"auto",
				"auto",
				"auto",
				"auto",
				"1fr",
				"auto"
			],
			fullHeight: !0,
			fullWidth: !0,
			gridGap: "0"
		}), t.Grid.append([new xxGridItem({
			colStart: 2,
			rowStart: 2,
			nbCols: 1,
			nbRows: 1,
			class: "TheScrollAutoForShowroom",
			content: t.GridSecondaire
		})]), t.ListeErreur = new xxStackPanel({}), t.Grid.append([new xxGridItem({
			colStart: 2,
			rowStart: 1,
			nbCols: 1,
			nbRows: 1,
			optionsAffichage: { alignementContenu: enumAlignementContenu.CentreCentre },
			content: t.ListeErreur
		})]), t.ReGenerateGridSecondaireEmpty(), t.GridVueIcone = new xxGrid({
			class: "xxShowRoomContainerGridIcone",
			colonnes_auto: "1fr",
			lignes_auto: "min-content",
			fullHeight: !0,
			gridGap: "20px",
			padding: !0
		}), cacherxElements(t.GridVueIcone, !0), t.Page.append(t.GridVueIcone);
	}
	static AjouterElementShowroom(e) {
		xxShowRoomContainer.listElements ||= new ObservableCollection$1(), xxShowRoomContainer.listElements.add([e]);
	}
	static AjouterIconeShowroom(e) {
		xxShowRoomContainer.ListIcone = xxShowRoomContainer.ListIcone.concat(e);
	}
	ReGenerateGridSecondaireEmpty() {
		let e = this;
		e.ListeErreur.empty(), e.GridSecondaire.vider(), e.GridSecondaire.append([new xxGridItem({
			colStart: 1,
			rowStart: 1,
			nbCols: 3,
			nbRows: 6,
			optionsAffichage: { alignementContenu: enumAlignementContenu.CentreCentre },
			content: new xxLabel({
				textVariable: "Sélectionner un élément dans la liste ou saisir une recherche",
				type: enumTypeLabel.soustitre
			})
		})]);
	}
	ReGenerateGridSecondaireRecherche() {
		let e = this;
		e.ListeErreur.empty(), e.GridSecondaire.vider();
		let t = new xxWrapPanel({ espaceMinimaliste: !0 });
		e.GridSecondaire.append([new xxGridItem({
			colStart: 1,
			rowStart: 1,
			nbCols: 3,
			nbRows: 6,
			content: t
		})]);
		let n = !1, r = e.stringRecherche.Value.split(";").map((e) => e.toLowerCase());
		e.listePrereglage.forEach((i) => {
			let a = i.NomElement.toLowerCase(), o;
			r.some((e) => a.includes(e) ? (o = e, !0) : !1), i.ListePreReglageOption.forEach((a) => {
				let s = a.NomReglage.toLowerCase(), c;
				if (r.some((e) => s.includes(e) ? (c = e, !0) : !1), r.length > 1 && c && o || r.length == 1 && (c || o)) {
					n = !0;
					let r = new xxGrid({
						colonnes: [
							"20px",
							"1fr",
							"20px"
						],
						lignes: [
							"10px",
							"1fr",
							"10px",
							"20px"
						],
						class: "TuileSearch"
					}), s = new xxLabel({
						class: "isCopieLabel",
						textVariable: "Copie !"
					});
					s.hideLabel(!0), r.append([
						new xxGridItem({
							colStart: 1,
							nbCols: 3,
							rowStart: 1,
							nbRows: 1,
							optionsAffichage: { alignementContenu: enumAlignementContenu.CentreCentre },
							content: new xxLabel({
								textVariable: i.NomElement,
								type: enumTypeLabel.description,
								optionsAffichage: { padding: { Bas: 6 } }
							}).setSurbrillance(o)
						}),
						new xxGridItem({
							colStart: 2,
							nbCols: 1,
							rowStart: 2,
							nbRows: 1,
							optionsAffichage: { alignementContenu: enumAlignementContenu.CentreCentre },
							content: i.renderElement(a.Prereglage)
						}),
						new xxGridItem({
							colStart: 1,
							nbCols: 3,
							rowStart: 3,
							nbRows: 1,
							optionsAffichage: { alignementContenu: enumAlignementContenu.CentreCentre },
							content: new xxLabel({
								textVariable: a.NomReglage,
								type: enumTypeLabel.important
							}).setSurbrillance(c)
						}),
						new xxGridItem({
							colStart: 1,
							nbCols: 2,
							rowStart: 4,
							nbRows: 1,
							content: s
						}),
						new xxGridItem({
							colStart: 3,
							nbCols: 1,
							rowStart: 4,
							nbRows: 1,
							optionsAffichage: { alignementContenu: enumAlignementContenu.CentreCentre },
							content: new IconeCs3i(enumIconeCs3i.action_copier, { taille: tailleIcone.XS })
						})
					]);
					let l = new xxContainerEvent$1({
						initContent: r,
						onClick: (t) => {
							let n = {};
							e.GenerationRecursiveOptionsAffichage(i.listOption, {}, n, null, null, null, a.Prereglage);
							let r = "new " + i.NomElement + "(" + e.GenerationRecursiveOptionsStringCode(n, 0) + ");";
							navigator.clipboard ? navigator.clipboard.writeText(r).then(() => {
								s.showLabel(), setTimeout(function() {
									s.hideLabel(!0);
								}, 2800);
							}, () => {
								xOutils.afficherMessageConfirmationPromise("Cliquez ok pour copier le code", !1).then(() => {
									xOutils.copyToClipboard(r);
								});
							}) : (xOutils.copyToClipboard(r), s.showLabel(), setTimeout(function() {
								s.hideLabel(!0);
							}, 2800)), t();
						}
					});
					t.append(l, "TuileSearch_WrapItem");
				}
			});
		}), xxShowRoomContainer.ListIcone.forEach((e) => {
			let i = e.iconeName.toLowerCase(), a = e.groupe.toLowerCase(), o, s;
			if (r.some((e) => i.includes(e) ? (o = e, !0) : !1), r.some((e) => a.includes(e) ? (s = e, !0) : !1), r.length > 1 && s && o || r.length == 1 && (s || o)) {
				n = !0;
				let r = new xxGrid({
					colonnes: [
						"20px",
						"1fr",
						"20px"
					],
					lignes: [
						"10px",
						"1fr",
						"10px",
						"20px"
					],
					class: "TuileSearch"
				}), i = new xxLabel({
					class: "isCopieLabel",
					textVariable: "Copie !"
				});
				i.hideLabel(!0), r.append([
					new xxGridItem({
						colStart: 1,
						nbCols: 3,
						rowStart: 1,
						nbRows: 1,
						optionsAffichage: { alignementContenu: enumAlignementContenu.CentreCentre },
						content: new xxLabel({
							textVariable: e.groupe,
							type: enumTypeLabel.description
						}).setSurbrillance(s)
					}),
					new xxGridItem({
						colStart: 2,
						nbCols: 1,
						rowStart: 2,
						nbRows: 1,
						optionsAffichage: { alignementContenu: enumAlignementContenu.CentreCentre },
						content: e.icone()
					}),
					new xxGridItem({
						colStart: 1,
						nbCols: 3,
						rowStart: 3,
						nbRows: 1,
						optionsAffichage: { alignementContenu: enumAlignementContenu.CentreCentre },
						content: new xxLabel({
							textVariable: e.iconeName,
							type: enumTypeLabel.important
						}).setSurbrillance(o)
					}),
					new xxGridItem({
						colStart: 1,
						nbCols: 2,
						rowStart: 4,
						nbRows: 1,
						content: i
					}),
					new xxGridItem({
						colStart: 3,
						nbCols: 1,
						rowStart: 4,
						nbRows: 1,
						optionsAffichage: { alignementContenu: enumAlignementContenu.CentreCentre },
						content: new IconeCs3i(enumIconeCs3i.action_copier, { taille: tailleIcone.XS })
					})
				]);
				let a = new xxContainerEvent$1({
					initContent: r,
					onClick: (t) => {
						navigator.clipboard ? navigator.clipboard.writeText(e.iconeString).then(() => {
							i.showLabel(), setTimeout(function() {
								i.hideLabel(!0);
							}, 2800);
						}, () => {
							xOutils.afficherMessageConfirmationPromise("Cliquez ok pour copier le code", !1).then(() => {
								xOutils.copyToClipboard(e.iconeString);
							});
						}) : (xOutils.copyToClipboard(e.iconeString), i.showLabel(), setTimeout(function() {
							i.hideLabel(!0);
						}, 2800)), t();
					}
				});
				t.append(a, "TuileSearch_WrapItem");
			}
		}), !n && r.length > 0 ? (e.GridSecondaire.append([new xxGridItem({
			colStart: 1,
			rowStart: 1,
			nbCols: 3,
			nbRows: 6,
			optionsAffichage: { alignementContenu: enumAlignementContenu.CentreCentre },
			content: new xxLabel({
				textVariable: "Aucun resultat trouvé pour cette recherche",
				type: enumTypeLabel.soustitre
			})
		})]), e.HaveResultatListeXElement || (e.timeOutId = setTimeout(() => {
			e.GridSecondaire.vider(), e.GridSecondaire.append([new xxGridItem({
				colStart: 1,
				rowStart: 1,
				nbCols: 3,
				nbRows: 6,
				optionsAffichage: { alignementContenu: enumAlignementContenu.CentreCentre },
				content: new xxImageTabByte({
					tabByte: xxShowRoomSample$1.RMarecheche,
					typeAffichage: enumTypeImage.domImage
				})
			})]);
		}, 5e3))) : r.length == 0 && e.ReGenerateGridSecondaireEmpty();
	}
	ReGenerateGridSecondaire(e) {
		let t = this, n = e.ListePreReglageOption != null && e.ListePreReglageOption.length > 0;
		t.ListeErreur.empty(), t.GridSecondaire.vider(), e.IsNotFunctionnal && t.AddErreur(e.NomElement, "/!\\ Attention, ce composant n'est pas entièrement implémenté, il est possible qu'il y ait des options qui ne fonctionnent pas... Il le sera dans un futur plus ou moins proche :) Merci de votre compréhension. /!\\"), e.Groupe == ExxShowRoomContaineGoupeElement$1.deprecated_DontUse && t.AddErreur(e.NomElement, "/!\\ Attention, ce composant est obsolète et ne doit pas être utilisé, merci de votre compréhension. /!\\"), e.Groupe == ExxShowRoomContaineGoupeElement$1.deprecated_DontUse && t.AddErreur(e.NomElement, "/!\\ Attention, ce composant est obsolète et ne doit pas être utilisé, merci de votre compréhension. /!\\");
		let r = {}, i = {}, a = new BindableObject();
		t.GridSecondaire.append([
			new xxGridItem({
				colStart: 1,
				rowStart: 1,
				nbRows: 1,
				nbCols: 3 + (n ? 2 : 0),
				optionsAffichage: { alignementContenu: enumAlignementContenu.CentreCentre },
				content: new xxLabelContainer({
					textLocalise: t.htmlEntities(e.NomElement),
					type: enumTypeLabel.titre,
					labelLargeurLibre: !0,
					initContent: new xxBouton({
						icone: new IconeMiniCs3i(enumIconeCs3i.admin_parametres_simple),
						optionsAffichage: { tailleBouton: enumTailleBouton.Fit },
						click: function(n) {
							t.GenerateBoxerViewMethode(e.typeElement), n();
						},
						typeBouton: enumTypeBouton.Standard,
						titleLocalise: "Afficher les méthodes de l'élément"
					})
				})
			}),
			new xxGridItem({
				colStart: 1,
				rowStart: 2,
				nbRows: 1,
				nbCols: 3 + (n ? 2 : 0),
				optionsAffichage: { alignementContenu: enumAlignementContenu.CentreCentre },
				content: new xxLabel({
					textLocalise: e.Description,
					centrer: !0,
					type: enumTypeLabel.description,
					optionsAffichage: { margin: { Bas: 5 } }
				})
			}),
			new xxGridItem({
				colStart: 1,
				rowStart: 3,
				nbCols: 3 + (n ? 2 : 0),
				nbRows: 1,
				content: new xSeparateur({
					orientation: enumTypeOrientation.horizontal,
					epaisseur: enumEpaisseurSeparation.fin,
					margin: { Tous: 0 }
				})
			})
		]), t.ZoneDeRendu = new xDiv$1({}), t.GridSecondaire.append([new xxGridItem({
			colStart: 3,
			rowStart: 4,
			nbCols: 1,
			nbRows: 1,
			optionsAffichage: { alignementContenu: enumAlignementContenu.CentreCentre },
			content: new xxLabel({
				textLocalise: "Rendu du composant",
				type: enumTypeLabel.soustitre
			})
		}), new xxGridItem({
			optionsAffichage: { alignementContenu: enumAlignementContenu.CentreCentre },
			colStart: 3,
			rowStart: 5,
			nbCols: 1,
			nbRows: 2,
			content: t.ZoneDeRendu
		})]);
		let o = () => {
			let n = Object.assign({}, r);
			t.ZoneDeRendu.asHolder.empty(), t.ZoneDeRendu.asHolder.append(e.renderElement(n)), a.Value = "new " + e.NomElement + "(" + t.GenerationRecursiveOptionsStringCode(i, 0) + ");";
		};
		t.GridSecondaire.append([new xxGridItem({
			colStart: 1,
			rowStart: 4,
			nbRows: 1,
			nbCols: 1,
			optionsAffichage: { alignementContenu: enumAlignementContenu.CentreCentre },
			content: new xxLabel({
				textLocalise: "Options du composant",
				type: enumTypeLabel.soustitre
			})
		})]);
		let s = [], c = {
			textVariable: "General",
			class: "TheScrollAutoForOptionShowroom",
			isOngletPreselected: !0,
			CheckNeedRegeneration: async () => !1,
			GenerateContent: () => null
		};
		s.push(c), t.GenerationRecursiveOptionsAffichage(e.listOption, r, i, c, s, o), t.GridSecondaire.append([new xxGridItem({
			colStart: 1,
			rowStart: 5,
			nbRows: 1,
			nbCols: 1,
			content: new xxNavOngletBar({
				GridForAddContent: t.GridSecondaire,
				GridItemContentOption: {
					colStart: 1,
					rowStart: 6,
					nbRows: 1,
					nbCols: 1
				},
				initOnglets: s,
				Style: t.xstyle
			})
		})]), o(), t.GridSecondaire.append([new xxGridItem({
			colStart: 2,
			rowStart: 4,
			nbRows: 3,
			nbCols: 1,
			content: new xSeparateur({
				orientation: enumTypeOrientation.vertical,
				margin: { Tous: 0 }
			})
		})]), n && t.GridSecondaire.append([
			new xxGridItem({
				colStart: 4,
				rowStart: 4,
				nbRows: 3,
				nbCols: 1,
				content: new xSeparateur({
					orientation: enumTypeOrientation.vertical,
					margin: { Tous: 0 }
				})
			}),
			new xxGridItem({
				colStart: 5,
				rowStart: 4,
				nbRows: 1,
				nbCols: 1,
				content: new xxLabel({
					textLocalise: "Réglages les plus utilisés",
					type: enumTypeLabel.soustitre
				}),
				optionsAffichage: { alignementContenu: enumAlignementContenu.CentreCentre }
			}),
			new xxGridItem({
				colStart: 5,
				rowStart: 5,
				nbRows: 2,
				nbCols: 1,
				optionsAffichage: { padding: { Haut: 6 } },
				class: "xxGridItem_ListePreReglageOption",
				content: new xxListWrapper({
					donnees: e.ListePreReglageOption,
					class: "ListePreReglageOption",
					gap: 10,
					renderItem: (n, s) => {
						n.append(new xxContainerEvent$1({
							class: "PrereglageContainerEvent",
							onClick: (n) => {
								i = {}, r = {}, t.GenerationRecursiveOptionsAffichage(e.listOption, r, i, {
									textVariable: "General",
									class: "TheScrollAutoForOptionShowroom",
									CheckNeedRegeneration: async () => !1,
									GenerateContent: () => null
								}, [], o), o(), navigator.clipboard ? navigator.clipboard.writeText(a.Value).then(() => {
									xOutils.afficherMessageAlertifyLog("Copie!");
								}, () => {
									xOutils.afficherMessageConfirmationPromise("Cliquez ok pour copier le code", !1).then(() => {
										xOutils.copyToClipboard(a.Value);
									});
								}) : xOutils.copyToClipboard(a.Value), n();
							},
							initContent: new xxStackPanel({ initContent: [
								new xxLabel({ textVariable: s.NomReglage }),
								e.renderElement(s.Prereglage),
								new xSeparateur({
									orientation: enumTypeOrientation.horizontal,
									margin: { Tous: 0 }
								})
							] })
						}));
					}
				})
			})
		]);
		let l = new xxBouton({
			class: "boutonCopie",
			click: (e) => {
				navigator.clipboard ? navigator.clipboard.writeText(a.Value).then(() => {
					l.addClass("isCopie"), setTimeout(function() {
						l.removeClass("isCopie");
					}, 2800);
				}, () => {
					xOutils.afficherMessageConfirmationPromise("Cliquez ok pour copier le code", !1).then(() => {
						xOutils.copyToClipboard(a.Value);
					});
				}) : (xOutils.copyToClipboard(a.Value), l.addClass("isCopie"), setTimeout(function() {
					l.removeClass("isCopie");
				}, 2800)), e();
			},
			titleVariable: "Copier le code",
			optionsAffichage: { tailleBouton: enumTailleBouton.Fit },
			icone: new IconeCs3i(enumIconeCs3i.action_copier)
		}), u = new xxVolet({
			class: "xxShowroomContener_voletCode",
			position: enumPositionVolet.bas,
			initContent: [new xInputText({
				id: "AutoCodeVoletInput",
				multiline: !0,
				disabled: !0,
				binding: { value: a }
			}), l]
		});
		t.GridSecondaire.append([new xxGridItem({
			colStart: 1,
			rowStart: 7,
			nbCols: 3 + (n ? 2 : 0),
			nbRows: 1,
			content: u
		}), new xxGridItem({
			colStart: 1,
			rowStart: 7,
			nbCols: 3 + (n ? 2 : 0),
			nbRows: 1,
			content: new xxBouton({
				id: "boutonVolet",
				icone: new IconeCs3i(enumIconeCs3i.fleche_bleue_haut),
				click: function(e) {
					u.afficher(), e();
				},
				textLocalise: "Voir le code",
				titleVariable: "Cliquer pour ouvrir le code",
				typeBouton: enumTypeBouton.Standard,
				optionsAffichage: {
					margin: { Tous: 0 },
					positionIconeBouton: enumPosition.Top
				}
			})
		})]), u.fermer();
	}
	GenerationRecursiveOptionsAffichage(listOption, option, optionForAutoGenerate, currentOngletOption, currentOngletOptionlist, regenerateRender, optionValueSelectSurcharge = null, disable = !1) {
		let mythis = this, stackPanel = new xxStackPanel({ class: "ListeOption" });
		currentOngletOption && (currentOngletOption.GenerateContent = () => stackPanel);
		let groupe = "";
		listOption.sort((e, t) => e.IsDeprecated == t.IsDeprecated && e.Facultatif == t.Facultatif ? 0 : !e.Facultatif && !e.IsDeprecated && (t.Facultatif || t.IsDeprecated) || e.Facultatif && t.IsDeprecated ? -1 : 1).forEach((optionTemp, index) => {
			let FactatifSign = optionTemp.Facultatif ? "" : "*", ClassCouleurAlternance = index % 2 ? "ListeOption_CouleurAlternance" : "", ValueSelect;
			switch (groupe != "Obligatoire" && !optionTemp.Facultatif && !optionTemp.IsDeprecated && (groupe = "Obligatoire", stackPanel.append(new xxLabel({
				textVariable: "Obligatoire",
				type: enumTypeLabel.important
			}), "GroupeOption")), groupe != "Facultatif" && optionTemp.Facultatif ? (groupe = "Facultatif", stackPanel.append(new xxLabel({
				textVariable: "Facultatif",
				type: enumTypeLabel.important
			}), "GroupeOption")) : groupe != "Deprecated" && optionTemp.IsDeprecated && (groupe = "Deprecated", stackPanel.append(new xxLabel({
				textVariable: "Deprecated/do not use",
				type: enumTypeLabel.important
			}), "GroupeOption")), optionTemp.TypeOption) {
				case ExxShowRoomContainerTypeOption$1.ListeSousInterface:
					option[optionTemp.NameOption] || (option[optionTemp.NameOption] = []), optionForAutoGenerate[optionTemp.NameOption] || (optionForAutoGenerate[optionTemp.NameOption] = []);
					let xxNavOngletBarTemp, OngletListeSousInterfaceOptionlist = [], ListeSousInterfaceOnglet, _sousGridListeSousInterface = new xxGrid({
						lignes: [
							"auto",
							"auto",
							"1fr"
						],
						colonnes: [
							"1fr",
							"auto",
							"auto"
						],
						class: "TheScrollAutoForOptionShowroom",
						fullHeight: !0,
						fullWidth: !0,
						gridGap: "0"
					}), bindListeOption = new ObservableCollection$1(), optionInterfacetempSelection = {
						Option: null,
						forAutoGenerate: null,
						isNew: !1
					};
					if (option[optionTemp.NameOption].length > 0) {
						let e = option[optionTemp.NameOption].length, t = [];
						for (let n = 0; n < e; n++) t.push({
							Option: option[optionTemp.NameOption][n],
							forAutoGenerate: optionForAutoGenerate[optionTemp.NameOption][n],
							isNew: !1
						});
						bindListeOption.add(t), optionInterfacetempSelection = t[0];
					}
					let regenerateRenderListeSousInterface = () => {
						let e = bindListeOption.All().map((e) => Object.assign({}, e.Option));
						e.length > 0 ? option[optionTemp.NameOption] = e : delete option[optionTemp.NameOption], optionForAutoGenerate[optionTemp.NameOption] = bindListeOption.All().map((e) => e.forAutoGenerate), regenerateRender();
					};
					if (bindListeOption.Length == 0 && _sousGridListeSousInterface.addClass("Disabled"), bindListeOption.bind(() => {
						bindListeOption.Length > 0 ? _sousGridListeSousInterface.removeClass("Disabled") : _sousGridListeSousInterface.addClass("Disabled"), regenerateRenderListeSousInterface();
					}, () => {
						bindListeOption.Length > 0 ? _sousGridListeSousInterface.removeClass("Disabled") : _sousGridListeSousInterface.addClass("Disabled"), regenerateRenderListeSousInterface();
					}), currentOngletOption) {
						let e = new xxListeDeroulante({
							donnees: [],
							dataContext: bindListeOption,
							renderSelected: (e, t, n) => {
								t != null && bindListeOption.Length > 0 && bindListeOption.All().indexOf(t) >= 0 ? e.append(new xxBouton({
									titleVariable: "Change d'option",
									icone: new IconeCs3i(enumIconeCs3i.fleche_select, { taille: tailleIcone.XS }),
									optionsAffichage: {
										positionIconeBouton: enumPosition.Right,
										tailleBouton: enumTailleBouton.S
									},
									click: (e) => {
										n(t), e();
									},
									textVariable: optionTemp.NameOption + " - " + (bindListeOption.All().indexOf(t) + 1)
								})) : e.append(new xxBouton({
									titleVariable: "Change d'option",
									icone: new IconeCs3i(enumIconeCs3i.fleche_select, { taille: tailleIcone.XS }),
									disabled: !0,
									optionsAffichage: {
										positionIconeBouton: enumPosition.Right,
										tailleBouton: enumTailleBouton.S
									},
									click: (e) => {
										e();
									},
									textVariable: "Aucune " + optionTemp.NameOption
								}));
							},
							renderSelectItem: (e, t, n) => {
								e.append(new xxBouton({
									titleVariable: "Change d'option",
									click: (e) => {
										n(t), e();
									},
									optionsAffichage: {
										margin: { Tous: 0 },
										tailleBouton: enumTailleBouton.M
									},
									textVariable: optionTemp.NameOption + " - " + (bindListeOption.All().indexOf(t) + 1)
								}));
							},
							selected: (e) => {
								if (optionInterfacetempSelection = e, OngletListeSousInterfaceOptionlist = [], ListeSousInterfaceOnglet = {
									textVariable: "Base",
									class: "TheScrollAutoForOptionShowroom",
									isOngletPreselected: !0,
									CheckNeedRegeneration: async () => !1,
									GenerateContent: () => null
								}, OngletListeSousInterfaceOptionlist.push(ListeSousInterfaceOnglet), optionInterfacetempSelection.Option != null) {
									let t = null;
									e.isNew ? e.isNew = !1 : t = Object.assign({}, optionInterfacetempSelection.Option), mythis.GenerationRecursiveOptionsAffichage(optionTemp.listOption, optionInterfacetempSelection.Option, optionInterfacetempSelection.forAutoGenerate, ListeSousInterfaceOnglet, OngletListeSousInterfaceOptionlist, () => {
										regenerateRenderListeSousInterface();
									}, t);
								} else mythis.GenerationRecursiveOptionsAffichage(optionTemp.listOption, {}, {}, ListeSousInterfaceOnglet, OngletListeSousInterfaceOptionlist, () => {}, null, !0);
								xxNavOngletBarTemp.SupprimerAllOnglet(), OngletListeSousInterfaceOptionlist.forEach((e) => {
									xxNavOngletBarTemp.AjouteOnglet(e);
								});
							}
						});
						_sousGridListeSousInterface.append([
							new xxGridItem({
								colStart: 1,
								nbCols: 1,
								rowStart: 1,
								nbRows: 1,
								content: e
							}),
							new xxGridItem({
								colStart: 2,
								nbCols: 1,
								rowStart: 1,
								nbRows: 1,
								content: new xxBouton({
									titleLocalise: "Ajouter",
									disabled: disable,
									click: (t) => {
										if (!disable) {
											let t = {
												Option: {},
												forAutoGenerate: {},
												isNew: !0
											};
											bindListeOption.add([t]), e.selecteur(t);
										}
										t();
									},
									icone: new IconeSvg(enumIconeSvg.ajouter_rond),
									optionsAffichage: { tailleBouton: enumTailleBouton.Fit }
								})
							}),
							new xxGridItem({
								colStart: 3,
								nbCols: 1,
								rowStart: 1,
								nbRows: 1,
								content: new xxBouton({
									titleLocalise: "Supprimer",
									disabled: disable,
									click: (t) => {
										if (!disable) {
											let t = bindListeOption.All().indexOf(optionInterfacetempSelection);
											t >= 0 && (bindListeOption.del([optionInterfacetempSelection]), t >= bindListeOption.Length && t--, t < 0 ? e.selecteur({
												forAutoGenerate: null,
												Option: null,
												isNew: !1
											}) : e.selecteur(bindListeOption.All()[t]));
										}
										t();
									},
									icone: new IconeSvg(enumIconeSvg.supprimer),
									optionsAffichage: { tailleBouton: enumTailleBouton.Fit }
								})
							})
						]), ListeSousInterfaceOnglet = {
							textVariable: "Base",
							class: "TheScrollAutoForOptionShowroom",
							isOngletPreselected: !0,
							CheckNeedRegeneration: async () => !1,
							GenerateContent: () => null
						}, OngletListeSousInterfaceOptionlist.push(ListeSousInterfaceOnglet), currentOngletOptionlist.push({
							textVariable: optionTemp.NameOption,
							class: "TheScrollAutoForOptionShowroom",
							CheckNeedRegeneration: async () => !1,
							GenerateContent: () => _sousGridListeSousInterface
						}), bindListeOption.Length > 0 && e.selecteur(bindListeOption.All()[0]);
					}
					optionInterfacetempSelection.Option || mythis.GenerationRecursiveOptionsAffichage(optionTemp.listOption, {}, {}, ListeSousInterfaceOnglet, OngletListeSousInterfaceOptionlist, () => {}, null, !0), currentOngletOption && (xxNavOngletBarTemp = new xxNavOngletBar({
						GridForAddContent: _sousGridListeSousInterface,
						GridItemContentOption: {
							colStart: 1,
							rowStart: 3,
							nbRows: 1,
							nbCols: 3
						},
						initOnglets: OngletListeSousInterfaceOptionlist,
						Style: mythis.xstyle
					}), _sousGridListeSousInterface.append([new xxGridItem({
						colStart: 1,
						rowStart: 2,
						nbRows: 1,
						nbCols: 3,
						content: xxNavOngletBarTemp
					})]), optionTemp.listOption.some((e) => e.TypeOption == ExxShowRoomContainerTypeOption$1.ListeSousInterface || e.TypeOption == ExxShowRoomContainerTypeOption$1.SousInterface) || cacherxElements(xxNavOngletBarTemp, !0));
					break;
				case ExxShowRoomContainerTypeOption$1.SousInterface:
					let optionSousInterfacetemp = {}, optionSousInterfacetempForAutoGenerate = {};
					ValueSelect = optionValueSelectSurcharge == null ? null : optionValueSelectSurcharge[optionTemp.NameOption];
					let AffichageFacultatif = optionTemp.Facultatif && optionTemp.listOption.some((e) => !e.Facultatif), isUsed = !AffichageFacultatif || ValueSelect != null;
					isUsed ? (!optionTemp.Facultatif || Object.keys(optionSousInterfacetemp).length > 0) && (option[optionTemp.NameOption] = optionSousInterfacetemp, optionForAutoGenerate[optionTemp.NameOption] = optionSousInterfacetempForAutoGenerate) : (delete option[optionTemp.NameOption], delete optionForAutoGenerate[optionTemp.NameOption]);
					let OngletOptionlist = [], SousInterfaceOnglet, _sousGrid = new xxGrid({
						lignes: [
							"auto",
							"auto",
							"1fr"
						],
						class: "TheScrollAutoForOptionShowroom",
						fullHeight: !0,
						fullWidth: !0,
						gridGap: "0"
					});
					isUsed || _sousGrid.addClass("Disabled"), currentOngletOption && (SousInterfaceOnglet = {
						textVariable: "Base",
						class: "TheScrollAutoForOptionShowroom",
						isOngletPreselected: !0,
						CheckNeedRegeneration: async () => !1,
						GenerateContent: () => null
					}, OngletOptionlist.push(SousInterfaceOnglet), currentOngletOptionlist.push({
						textVariable: optionTemp.NameOption,
						class: "TheScrollAutoForOptionShowroom",
						CheckNeedRegeneration: async () => !1,
						GenerateContent: () => _sousGrid
					}));
					let regenerateRenderSousInterface = () => {
						isUsed ? (!optionTemp.Facultatif || Object.keys(optionSousInterfacetemp).length > 0) && (option[optionTemp.NameOption] = optionSousInterfacetemp, optionForAutoGenerate[optionTemp.NameOption] = optionSousInterfacetempForAutoGenerate) : (delete option[optionTemp.NameOption], delete optionForAutoGenerate[optionTemp.NameOption]), regenerateRender();
					}, labelFacultatif = new xxLabelContainer({
						optionsAffichage: {
							justificationDuContenu: enumJustificationDuContenu.centre,
							padding: { Gauche: 6 },
							positionDuContenu: enumPositionDuContenu.droite
						},
						textVariable: "Ajouter l'interface",
						type: enumTypeLabel.important,
						labelLargeurLibre: !0,
						initContent: new xxCheckBox({
							value: isUsed,
							ValueChange: (e) => {
								isUsed = e, isUsed ? _sousGrid.removeClass("Disabled") : _sousGrid.addClass("Disabled"), regenerateRenderSousInterface();
							}
						})
					});
					if (AffichageFacultatif && _sousGrid.append([new xxGridItem({
						colStart: 1,
						nbCols: 1,
						rowStart: 1,
						nbRows: 1,
						content: labelFacultatif
					})]), mythis.GenerationRecursiveOptionsAffichage(optionTemp.listOption, optionSousInterfacetemp, optionSousInterfacetempForAutoGenerate, SousInterfaceOnglet, OngletOptionlist, regenerateRenderSousInterface), currentOngletOption) {
						let e = new xxNavOngletBar({
							GridForAddContent: _sousGrid,
							GridItemContentOption: {
								colStart: 1,
								rowStart: 3,
								nbRows: 1,
								nbCols: 1
							},
							initOnglets: OngletOptionlist,
							Style: mythis.xstyle
						});
						_sousGrid.append([new xxGridItem({
							colStart: 1,
							rowStart: 2,
							nbRows: 1,
							nbCols: 1,
							content: e
						})]), optionTemp.listOption.some((e) => e.TypeOption == ExxShowRoomContainerTypeOption$1.ListeSousInterface || e.TypeOption == ExxShowRoomContainerTypeOption$1.SousInterface) || cacherxElements(e, !0);
					}
					if (mythis.GenerationRecursiveOptionsAffichage(optionTemp.listOption, optionSousInterfacetemp, optionSousInterfacetempForAutoGenerate, SousInterfaceOnglet, OngletOptionlist, regenerateRenderSousInterface), currentOngletOption) {
						let e = new xxNavOngletBar({
							GridForAddContent: _sousGrid,
							GridItemContentOption: {
								colStart: 1,
								rowStart: 3,
								nbRows: 1,
								nbCols: 1
							},
							initOnglets: OngletOptionlist,
							Style: mythis.xstyle
						});
						_sousGrid.append([new xxGridItem({
							colStart: 1,
							rowStart: 2,
							nbRows: 1,
							nbCols: 1,
							content: e
						})]), optionTemp.listOption.some((e) => e.TypeOption == ExxShowRoomContainerTypeOption$1.ListeSousInterface || e.TypeOption == ExxShowRoomContainerTypeOption$1.SousInterface) || cacherxElements(e, !0);
					}
					break;
				case ExxShowRoomContainerTypeOption$1.Texte:
					ValueSelect = optionValueSelectSurcharge == null ? optionTemp.ValeurDefaut : optionValueSelectSurcharge[optionTemp.NameOption], !ValueSelect && !optionTemp.Facultatif ? (option[optionTemp.NameOption] = "Change moi", optionForAutoGenerate[optionTemp.NameOption] = "\"Change moi\"") : optionTemp.ValeurDefaut && (option[optionTemp.NameOption] = ValueSelect, optionForAutoGenerate[optionTemp.NameOption] = "\"" + ValueSelect + "\""), currentOngletOption && stackPanel.append(new xxLabelContainer({
						class: optionTemp.description ? "LabelWithDescription" : "",
						textVariable: optionTemp.NameOption + FactatifSign + " (string)",
						optionsAffichage: { positionDuContenu: enumPositionDuContenu.bas },
						titleVariable: optionTemp.description,
						type: enumTypeLabel.important,
						labelLargeurLibre: !0,
						initContent: new xInputText({
							value: ValueSelect,
							placeHolderVariable: optionTemp.Facultatif ? "Facultatif" : "Change moi",
							ValueChange: (e) => {
								option[optionTemp.NameOption] = e, optionForAutoGenerate[optionTemp.NameOption] = "\"" + e + "\"", e || (optionTemp.Facultatif ? (delete option[optionTemp.NameOption], delete optionForAutoGenerate[optionTemp.NameOption]) : (option[optionTemp.NameOption] = "Change moi", optionForAutoGenerate[optionTemp.NameOption] = "\"Change moi\"")), regenerateRender();
							}
						})
					}), ClassCouleurAlternance);
					break;
				case ExxShowRoomContainerTypeOption$1.TexteLocalisable:
					let isTextLocalisable = optionValueSelectSurcharge == null ? !1 : optionValueSelectSurcharge[optionTemp.NameOptionLocalisable] != null;
					ValueSelect = optionValueSelectSurcharge == null ? optionTemp.ValeurDefaut : optionValueSelectSurcharge[optionTemp.NameOptionLocalisable] ?? optionValueSelectSurcharge[optionTemp.NameOptionVariable];
					let textLocalVaria = ValueSelect, TextboutonChange = () => {
						textLocalVaria || !optionTemp.Facultatif ? isTextLocalisable ? (delete option[optionTemp.NameOptionVariable], delete optionForAutoGenerate[optionTemp.NameOptionVariable], textLocalVaria ? (option[optionTemp.NameOptionLocalisable] = textLocalVaria, optionForAutoGenerate[optionTemp.NameOptionLocalisable] = "\"" + textLocalVaria + "\"") : (option[optionTemp.NameOptionLocalisable] = "Change moi", optionForAutoGenerate[optionTemp.NameOptionLocalisable] = "\"Change moi\"")) : (delete option[optionTemp.NameOptionLocalisable], delete optionForAutoGenerate[optionTemp.NameOptionLocalisable], textLocalVaria ? (option[optionTemp.NameOptionVariable] = textLocalVaria, optionForAutoGenerate[optionTemp.NameOptionVariable] = "\"" + textLocalVaria + "\"") : (option[optionTemp.NameOptionVariable] = "Change moi", optionForAutoGenerate[optionTemp.NameOptionVariable] = "\"Change moi\"")) : (delete option[optionTemp.NameOptionLocalisable], delete option[optionTemp.NameOptionVariable], delete optionForAutoGenerate[optionTemp.NameOptionLocalisable], delete optionForAutoGenerate[optionTemp.NameOptionVariable]);
					};
					TextboutonChange(), currentOngletOption && stackPanel.append(new xxLabelContainer({
						class: optionTemp.description ? "LabelWithDescription" : "",
						textVariable: optionTemp.NameOptionVariable + "/" + optionTemp.NameOptionLocalisable + FactatifSign + " (string)",
						optionsAffichage: { positionDuContenu: enumPositionDuContenu.bas },
						titleVariable: optionTemp.description,
						type: enumTypeLabel.important,
						labelLargeurLibre: !0,
						initContent: new xxStackPanel({
							espaceMinimaliste: !0,
							initContent: [new xxWrapPanel({
								espaceMinimaliste: !0,
								retourALaLigne: !1,
								initContent: [
									new xxLabel({ textLocalise: "Variable" }),
									new xxCheckBox({
										value: isTextLocalisable,
										typeCheckbox: enumTypeCheckbox.slide,
										ValueChange: (e) => {
											isTextLocalisable = e, TextboutonChange(), regenerateRender();
										}
									}),
									new xxLabel({ textLocalise: "Localise" })
								]
							}), new xInputText({
								value: textLocalVaria,
								placeHolderVariable: optionTemp.Facultatif ? "Facultatif" : "Change moi",
								ValueChange: (e) => {
									textLocalVaria = e, TextboutonChange(), regenerateRender();
								}
							})]
						})
					}), ClassCouleurAlternance);
					break;
				case ExxShowRoomContainerTypeOption$1.Boolean:
					ValueSelect = optionValueSelectSurcharge == null ? null : optionValueSelectSurcharge[optionTemp.NameOption], ValueSelect ??= !!optionTemp.ValeurDefaut, (!optionTemp.Facultatif || ValueSelect != !!optionTemp.ValeurDefaut) && (option[optionTemp.NameOption] = ValueSelect, optionForAutoGenerate[optionTemp.NameOption] = ValueSelect), currentOngletOption && stackPanel.append(new xxLabelContainer({
						class: "inputShowroom " + (optionTemp.description ? "LabelWithDescription" : ""),
						titleVariable: optionTemp.description,
						textVariable: optionTemp.NameOption + FactatifSign + " (boolean)",
						optionsAffichage: { positionDuContenu: enumPositionDuContenu.droite },
						type: enumTypeLabel.important,
						labelLargeurLibre: !0,
						initContent: new xxCheckBox({
							value: ValueSelect,
							ValueChange: (e) => {
								option[optionTemp.NameOption] = e, optionForAutoGenerate[optionTemp.NameOption] = e, (e == optionTemp.ValeurDefaut && optionTemp.ValeurDefaut != null || !e) && (optionTemp.Facultatif ? (delete option[optionTemp.NameOption], delete optionForAutoGenerate[optionTemp.NameOption]) : (option[optionTemp.NameOption] = optionTemp.ValeurDefaut, optionForAutoGenerate[optionTemp.NameOption] = optionTemp.ValeurDefaut)), regenerateRender();
							}
						})
					}), ClassCouleurAlternance);
					break;
				case ExxShowRoomContainerTypeOption$1.Number:
					ValueSelect = optionValueSelectSurcharge == null ? null : optionValueSelectSurcharge[optionTemp.NameOption], ValueSelect ??= optionTemp.ValeurDefaut, ValueSelect == null && !optionTemp.Facultatif ? (option[optionTemp.NameOption] = 6, optionForAutoGenerate[optionTemp.NameOption] = 6) : ValueSelect != null && (option[optionTemp.NameOption] = ValueSelect, optionForAutoGenerate[optionTemp.NameOption] = ValueSelect), currentOngletOption && stackPanel.append(new xxLabelContainer({
						class: optionTemp.description ? "LabelWithDescription" : "",
						titleVariable: optionTemp.description,
						textVariable: optionTemp.NameOption + FactatifSign + " (number)",
						optionsAffichage: { positionDuContenu: enumPositionDuContenu.bas },
						type: enumTypeLabel.important,
						labelLargeurLibre: !0,
						initContent: new xxInputNumerique({
							value: ValueSelect,
							ValueChange: (e) => {
								let t = parseInt(e);
								isNaN(t) ? optionTemp.Facultatif ? (delete option[optionTemp.NameOption], delete optionForAutoGenerate[optionTemp.NameOption]) : (option[optionTemp.NameOption] = 6, optionForAutoGenerate[optionTemp.NameOption] = 6, xOutils.afficherMessageAlertifyError("Attention une value est obligatoire")) : (option[optionTemp.NameOption] = t, optionForAutoGenerate[optionTemp.NameOption] = t), regenerateRender();
							}
						})
					}), ClassCouleurAlternance);
					break;
				case ExxShowRoomContainerTypeOption$1.Enum:
					try {
						let enumtemp = eval(optionTemp.EnumType), listKeyValeurEnum = [];
						if (typeof enumtemp == "object") {
							ValueSelect = optionValueSelectSurcharge == null ? null : optionValueSelectSurcharge[optionTemp.NameOption], ValueSelect ??= optionTemp.ValeurDefaut;
							let e, t;
							if (optionTemp.Facultatif && optionTemp.ValeurDefaut == null) {
								let n = {
									key: "non defini",
									valeur: null
								};
								listKeyValeurEnum.push(n), e = n, t = n;
							}
							Object.keys(enumtemp).filter((e) => isNaN(parseInt(e))).forEach((n) => {
								let r = enumtemp[n];
								if (r != null && (typeof r == "string" || typeof r == "number")) {
									let i = {
										key: n,
										valeur: r
									};
									i.valeur == optionTemp.ValeurDefaut && (e = i), i.valeur == ValueSelect && (t = i), listKeyValeurEnum.push(i);
								} else mythis.AddErreurOption(optionTemp.NameOption, `"${optionTemp.EnumType}" contient des valeurs autre que string et number. Es-que c'est bien une enum ?`);
							}), e != null && t != null ? (!optionTemp.Facultatif || t.key != e.key) && (optionForAutoGenerate[optionTemp.NameOption] = optionTemp.EnumType + "." + t.key, option[optionTemp.NameOption] = t.valeur) : mythis.AddErreurOption(optionTemp.NameOption, `Aucun valeur utilisable trouvé dans "${optionTemp.EnumType}"`), currentOngletOption && stackPanel.append(new xxLabelContainer({
								titleVariable: optionTemp.description,
								class: optionTemp.description ? "LabelWithDescription" : "",
								textVariable: optionTemp.NameOption + FactatifSign + " (" + optionTemp.EnumType + ")",
								optionsAffichage: { positionDuContenu: enumPositionDuContenu.bas },
								type: enumTypeLabel.important,
								labelLargeurLibre: !0,
								initContent: new xxAutoComplete({
									listeValeurs: listKeyValeurEnum,
									typeValue: t,
									getLibelle: (t) => t == e ? t.key + " (Default)" : t.key,
									valueChange: (t) => {
										t == e ? optionTemp.Facultatif ? (delete option[optionTemp.NameOption], delete optionForAutoGenerate[optionTemp.NameOption]) : (option[optionTemp.NameOption] = e.valeur, optionForAutoGenerate[optionTemp.NameOption] = optionTemp.EnumType + "." + e.key) : (option[optionTemp.NameOption] = t.valeur, optionForAutoGenerate[optionTemp.NameOption] = optionTemp.EnumType + "." + t.key), regenerateRender();
									}
								})
							}), ClassCouleurAlternance);
						} else mythis.AddErreurOption(optionTemp.NameOption, `"${optionTemp.EnumType}" n'est pas enumerable.`);
					} catch {
						mythis.AddErreurOption(optionTemp.NameOption, `L'enum "${optionTemp.EnumType}" est introuvable.`);
					}
					break;
				case ExxShowRoomContainerTypeOption$1.Function:
					ValueSelect = optionValueSelectSurcharge == null ? null : optionValueSelectSurcharge[optionTemp.NameOption];
					let haveFunction = !1;
					ValueSelect == null ? ValueSelect = optionTemp.Function : haveFunction = !0, (!optionTemp.Facultatif || optionValueSelectSurcharge == null && optionTemp.isDefaultSelect || haveFunction) && (option[optionTemp.NameOption] = ValueSelect, optionForAutoGenerate[optionTemp.NameOption] = ValueSelect.toString()), currentOngletOption && stackPanel.append(new xxLabelContainer({
						class: "inputShowroom " + (optionTemp.description ? "LabelWithDescription" : ""),
						titleVariable: optionTemp.description,
						textVariable: optionTemp.NameOption + FactatifSign + " (Function)",
						optionsAffichage: { positionDuContenu: enumPositionDuContenu.droite },
						type: enumTypeLabel.important,
						labelLargeurLibre: !0,
						initContent: new xxCheckBox({
							value: !optionTemp.Facultatif || haveFunction || optionValueSelectSurcharge == null && optionTemp.isDefaultSelect,
							inactif: !optionTemp.Facultatif,
							ValueChange: (e) => {
								e ? (option[optionTemp.NameOption] = ValueSelect, optionForAutoGenerate[optionTemp.NameOption] = ValueSelect.toString()) : (delete option[optionTemp.NameOption], delete optionForAutoGenerate[optionTemp.NameOption]), regenerateRender();
							}
						})
					}), ClassCouleurAlternance);
					break;
				case ExxShowRoomContainerTypeOption$1.Icone:
					ValueSelect = optionValueSelectSurcharge == null ? null : optionValueSelectSurcharge[optionTemp.NameOption], ValueSelect == null && optionTemp.ValeurDefaut != null && (ValueSelect = optionTemp.ValeurDefaut);
					let valueSelectIcone;
					ValueSelect != null && (valueSelectIcone = xxShowRoomContainer.ListIcone.find((e) => e.groupe == ValueSelect.getTypeIcone() && e.iconeValue == ValueSelect.getValeurIcone())), (!optionTemp.Facultatif || valueSelectIcone != null) && (option[optionTemp.NameOption] = valueSelectIcone == null ? xxShowRoomContainer.ListIcone[0].icone() : valueSelectIcone.icone(), optionForAutoGenerate[optionTemp.NameOption] = valueSelectIcone == null ? xxShowRoomContainer.ListIcone[0].iconeString : valueSelectIcone.iconeString), currentOngletOption && stackPanel.append(new xxLabelContainer({
						class: optionTemp.description ? "LabelWithDescription" : "",
						textVariable: optionTemp.NameOption + FactatifSign + " (Icone)",
						optionsAffichage: { positionDuContenu: enumPositionDuContenu.bas },
						type: enumTypeLabel.important,
						titleVariable: optionTemp.description,
						labelLargeurLibre: !0,
						initContent: new xxAutoComplete({
							listeValeurs: xxShowRoomContainer.ListIcone.slice(),
							getLibelle: (e) => e.iconeName,
							value: valueSelectIcone == null ? null : valueSelectIcone.iconeName,
							libelleNullChoice: optionTemp.Facultatif ? "Aucun icone" : null,
							placeholder: optionTemp.Facultatif ? "Facultatif" : null,
							regroupementUniqueBy: { GroupBy: (e) => e.groupe },
							renderItemInListe: (e, t, n) => {
								e.append(new xxBouton({
									class: "BoutonAutoCompleteIcon",
									typeBouton: enumTypeBouton.Standard,
									textVariable: t.iconeName,
									titleVariable: t.iconeName,
									optionsAffichage: {
										tailleBouton: enumTailleBouton.Fit,
										margin: { Tous: 0 }
									},
									icone: t.icone(),
									click: (e) => {
										n(t), e();
									}
								}));
							},
							valueChange: (e) => {
								e == null ? optionTemp.Facultatif ? (delete option[optionTemp.NameOption], delete optionForAutoGenerate[optionTemp.NameOption]) : (option[optionTemp.NameOption] = xxShowRoomContainer.ListIcone[0].icone(), optionForAutoGenerate[optionTemp.NameOption] = xxShowRoomContainer.ListIcone[0].iconeString) : (option[optionTemp.NameOption] = e.icone(), optionForAutoGenerate[optionTemp.NameOption] = e.iconeString), regenerateRender();
							}
						})
					}), ClassCouleurAlternance);
					break;
				case ExxShowRoomContainerTypeOption$1.CouleurHexa:
					ValueSelect = optionValueSelectSurcharge == null ? null : optionValueSelectSurcharge[optionTemp.NameOption];
					let haveColor = !1;
					ValueSelect ? haveColor = !0 : ValueSelect = "ff0000", optionTemp.Facultatif || (option[optionTemp.NameOption] = ValueSelect, optionForAutoGenerate[optionTemp.NameOption] = "\"" + ValueSelect + "\""), currentOngletOption && stackPanel.append(new xxLabelContainer({
						class: optionTemp.description ? "LabelWithDescription" : "",
						textVariable: optionTemp.NameOption + FactatifSign + " (string)",
						optionsAffichage: { positionDuContenu: enumPositionDuContenu.bas },
						titleVariable: optionTemp.description,
						type: enumTypeLabel.important,
						labelLargeurLibre: !0,
						initContent: new xxChoixCouleur({
							value: !optionTemp.Facultatif || haveColor ? ValueSelect : null,
							choixCouleurLibre: !1,
							ValueChange: (e) => {
								option[optionTemp.NameOption] = e, optionForAutoGenerate[optionTemp.NameOption] = "\"" + e + "\"", e || (optionTemp.Facultatif ? (delete option[optionTemp.NameOption], delete optionForAutoGenerate[optionTemp.NameOption]) : (option[optionTemp.NameOption] = "ff0000", optionForAutoGenerate[optionTemp.NameOption] = "\"ff0000\"")), regenerateRender();
							}
						})
					}), ClassCouleurAlternance);
					break;
				case ExxShowRoomContainerTypeOption$1.DateSerialisable:
					optionTemp.Facultatif || (option[optionTemp.NameOption] = DateSerialisable.Factory(new Date(Date.now())), optionForAutoGenerate[optionTemp.NameOption] = "new Date(Date.now())"), currentOngletOption && stackPanel.append(new xxLabelContainer({
						class: optionTemp.description ? "LabelWithDescription" : "",
						textVariable: optionTemp.NameOption + FactatifSign + " (Date)",
						optionsAffichage: { positionDuContenu: enumPositionDuContenu.bas },
						titleVariable: optionTemp.description,
						type: enumTypeLabel.important,
						labelLargeurLibre: !0,
						initContent: new xInputDate({
							CanSelectDateNull: !0,
							ValueChange: (e) => {
								e ? (option[optionTemp.NameOption] = DateSerialisable.getDate(e).getTime(), optionForAutoGenerate[optionTemp.NameOption] = "DateSerialisable.getDate(val).getTime()") : optionTemp.Facultatif ? (delete option[optionTemp.NameOption], delete optionForAutoGenerate[optionTemp.NameOption]) : (option[optionTemp.NameOption] = DateSerialisable.Factory(new Date(Date.now())), optionForAutoGenerate[optionTemp.NameOption] = "DateSerialisable.Factory(new Date(Date.now()))"), regenerateRender();
							}
						})
					}), ClassCouleurAlternance);
					break;
				case ExxShowRoomContainerTypeOption$1.Donnees:
					ValueSelect = optionValueSelectSurcharge == null ? null : optionValueSelectSurcharge[optionTemp.NameOption], ValueSelect ??= optionTemp.ValeurDefaut, ValueSelect ??= [], optionTemp.Facultatif || (option[optionTemp.NameOption] = ValueSelect, optionForAutoGenerate[optionTemp.NameOption] = "[]");
					let nbData = new BindableObject(ValueSelect.length), sampleData = null;
					if (optionTemp.ValeurSample != null && optionTemp.ValeurSample.length > 0) sampleData = optionTemp.ValeurSample;
					else switch (optionTemp.DataType) {
						case ExxShowRoomContaineDataType$1.number:
							sampleData = xxShowRoomSample$1.listeNombre();
							break;
						case ExxShowRoomContaineDataType$1.string:
							sampleData = xxShowRoomSample$1.listeStrings();
							break;
						case ExxShowRoomContaineDataType$1.boolean:
							sampleData = xxShowRoomSample$1.listeboolean();
							break;
						case ExxShowRoomContaineDataType$1.CustomObjet:
							sampleData = xxShowRoomSample$1.listeCustom();
							break;
						case ExxShowRoomContaineDataType$1.CleValeur:
							sampleData = xxShowRoomSample$1.listeCustom();
							break;
						default: mythis.AddErreur(optionTemp.NameOption, "Le type \"" + optionTemp.DataType + "\" n'a pas de sample pas default! Veuillez ajoute des \"ValeurSample\" a l'option \"" + optionTemp.NameOption + "\" ");
					}
					currentOngletOption && (sampleData == null ? stackPanel.append(new xxLabelContainer({
						class: "inputShowroom " + (optionTemp.description ? "LabelWithDescription" : ""),
						textVariable: optionTemp.NameOption + FactatifSign + " (" + optionTemp.DataType + "[])",
						optionsAffichage: { positionDuContenu: enumPositionDuContenu.droite },
						type: enumTypeLabel.important,
						labelLargeurLibre: !0,
						initContent: new IconeCs3i(enumIconeCs3i.action_erreur)
					})) : stackPanel.append(new xxLabelContainer({
						class: "inputShowroom " + (optionTemp.description ? "LabelWithDescription" : ""),
						titleVariable: optionTemp.description,
						textVariable: optionTemp.NameOption + FactatifSign + " (" + optionTemp.DataType + "[])",
						optionsAffichage: { positionDuContenu: enumPositionDuContenu.droite },
						type: enumTypeLabel.important,
						labelLargeurLibre: !0,
						initContent: new xxWrapPanel({
							retourALaLigne: !1,
							espaceMinimaliste: !0,
							initContent: [
								new xxBouton({
									titleVariable: "Supprimer une donnée",
									click: (e) => {
										option[optionTemp.NameOption] != null && option[optionTemp.NameOption].length > 0 && (option[optionTemp.NameOption].shift(), optionForAutoGenerate[optionTemp.NameOption] = "[]", nbData.Value = option[optionTemp.NameOption].length.toString(), optionTemp.Facultatif && option[optionTemp.NameOption].length == 0 && (delete option[optionTemp.NameOption], delete optionForAutoGenerate[optionTemp.NameOption]), regenerateRender()), e();
									},
									optionsAffichage: { tailleBouton: enumTailleBouton.Fit },
									icone: new IconeSvg(enumIconeSvg.moins)
								}),
								new xxLabel({ binding: { value: nbData } }),
								new xxBouton({
									titleLocalise: "Ajouter une donnée",
									click: (e) => {
										option[optionTemp.NameOption] ?? (option[optionTemp.NameOption] = []), option[optionTemp.NameOption].push(sampleData[option[optionTemp.NameOption].length % sampleData.length]), optionForAutoGenerate[optionTemp.NameOption] = "[]", nbData.Value = option[optionTemp.NameOption].length.toString(), regenerateRender(), e();
									},
									optionsAffichage: { tailleBouton: enumTailleBouton.Fit },
									icone: new IconeSvg(enumIconeSvg.plus)
								})
							]
						})
					}), ClassCouleurAlternance));
					break;
				case ExxShowRoomContainerTypeOption$1.iXElement:
					ValueSelect = (optionValueSelectSurcharge == null ? !1 : optionValueSelectSurcharge[optionTemp.NameOption] != null) || optionTemp.ValeurDefaut;
					let ValeurSample = optionTemp.ValeurSample;
					optionValueSelectSurcharge != null && (ValeurSample = optionValueSelectSurcharge[optionTemp.NameOption]), ValeurSample ??= xxShowRoomSample$1.divSample(), optionTemp.Facultatif || (option[optionTemp.NameOption] = ValeurSample, optionForAutoGenerate[optionTemp.NameOption] = "new xDiv({})", ValueSelect = !0), currentOngletOption && stackPanel.append(new xxLabelContainer({
						titleVariable: optionTemp.description,
						class: "inputShowroom " + (optionTemp.description ? "LabelWithDescription" : ""),
						textVariable: optionTemp.NameOption + FactatifSign + " (iXElement)",
						optionsAffichage: { positionDuContenu: enumPositionDuContenu.droite },
						type: enumTypeLabel.important,
						labelLargeurLibre: !0,
						initContent: new xxCheckBox({
							value: ValueSelect,
							inactif: !optionTemp.Facultatif,
							ValueChange: (e) => {
								e ? (option[optionTemp.NameOption] = ValeurSample, optionForAutoGenerate[optionTemp.NameOption] = "new xDiv({})") : (delete option[optionTemp.NameOption], delete optionForAutoGenerate[optionTemp.NameOption]), regenerateRender();
							}
						})
					}), ClassCouleurAlternance);
					break;
				case ExxShowRoomContainerTypeOption$1.ListeiXElement:
					ValueSelect = optionValueSelectSurcharge == null ? null : optionValueSelectSurcharge[optionTemp.NameOption], ValueSelect ??= optionTemp.ValeurDefaut, ValueSelect ??= [], optionTemp.Facultatif || (option[optionTemp.NameOption] = ValueSelect, optionForAutoGenerate[optionTemp.NameOption] = "[]");
					let nbElement = new BindableObject(ValueSelect.length);
					currentOngletOption && stackPanel.append(new xxLabelContainer({
						class: "inputShowroom " + (optionTemp.description ? "LabelWithDescription" : ""),
						titleVariable: optionTemp.description,
						textVariable: optionTemp.NameOption + FactatifSign + " (iXElement[])",
						optionsAffichage: { positionDuContenu: enumPositionDuContenu.droite },
						type: enumTypeLabel.important,
						labelLargeurLibre: !0,
						initContent: new xxWrapPanel({
							retourALaLigne: !1,
							espaceMinimaliste: !0,
							initContent: [
								new xxBouton({
									titleVariable: "Supprimer un XElement",
									click: (e) => {
										option[optionTemp.NameOption] != null && option[optionTemp.NameOption].length > 0 && (option[optionTemp.NameOption].shift(), optionForAutoGenerate[optionTemp.NameOption] = "[]", nbElement.Value = option[optionTemp.NameOption].length.toString(), optionTemp.Facultatif && option[optionTemp.NameOption].length == 0 && (delete option[optionTemp.NameOption], delete optionForAutoGenerate[optionTemp.NameOption]), regenerateRender()), e();
									},
									optionsAffichage: { tailleBouton: enumTailleBouton.Fit },
									icone: new IconeSvg(enumIconeSvg.moins)
								}),
								new xxLabel({ binding: { value: nbElement } }),
								new xxBouton({
									titleLocalise: "Ajouter un xelement",
									click: (e) => {
										option[optionTemp.NameOption] ?? (option[optionTemp.NameOption] = []), option[optionTemp.NameOption].push(xxShowRoomSample$1.divSample(option[optionTemp.NameOption].length % 3 + 1)), optionForAutoGenerate[optionTemp.NameOption] = "[]", nbElement.Value = option[optionTemp.NameOption].length.toString(), regenerateRender(), e();
									},
									optionsAffichage: { tailleBouton: enumTailleBouton.Fit },
									icone: new IconeSvg(enumIconeSvg.plus)
								})
							]
						})
					}), ClassCouleurAlternance);
					break;
				case ExxShowRoomContainerTypeOption$1.Time:
					optionTemp.Facultatif || (option[optionTemp.NameOption] = DateSerialisable.getXTime(DateSerialisable.Now()), optionForAutoGenerate[optionTemp.NameOption] = "DateSerialisable.getXTime(DateSerialisable.Now())"), currentOngletOption && stackPanel.append(new xxLabelContainer({
						class: optionTemp.description ? "LabelWithDescription" : "",
						textVariable: optionTemp.NameOption + FactatifSign + " (Time)",
						optionsAffichage: { positionDuContenu: enumPositionDuContenu.bas },
						titleVariable: optionTemp.description,
						type: enumTypeLabel.important,
						labelLargeurLibre: !0,
						initContent: new xInputTime({
							value: optionTemp.Facultatif ? null : DateSerialisable.getXTime(DateSerialisable.Now()),
							ValueChange: (e) => {
								e ? (option[optionTemp.NameOption] = new xTime(e.Heures, e.Minutes), optionForAutoGenerate[optionTemp.NameOption] = "new xTime(" + e.Heures + "," + e.Minutes + ")") : optionTemp.Facultatif ? (delete option[optionTemp.NameOption], delete optionForAutoGenerate[optionTemp.NameOption]) : (option[optionTemp.NameOption] = DateSerialisable.getXTime(DateSerialisable.Now()), optionForAutoGenerate[optionTemp.NameOption] = "DateSerialisable.getXTime(DateSerialisable.Now())"), regenerateRender();
							}
						})
					}), ClassCouleurAlternance);
					break;
				case ExxShowRoomContainerTypeOption$1.Pagewapper:
					ValueSelect = (optionValueSelectSurcharge == null ? !1 : optionValueSelectSurcharge[optionTemp.NameOption] != null) || optionTemp.ValeurDefaut, optionTemp.Facultatif || (option[optionTemp.NameOption] = mythis.Page, optionForAutoGenerate[optionTemp.NameOption] = "new xxPageWrapper({ titleLocalise:\"sample\" })", ValueSelect = !0), currentOngletOption && stackPanel.append(new xxLabelContainer({
						titleVariable: optionTemp.description,
						class: "inputShowroom " + (optionTemp.description ? "LabelWithDescription" : ""),
						textVariable: optionTemp.NameOption + FactatifSign + " (xxPageWrapper)",
						type: enumTypeLabel.important,
						labelLargeurLibre: !0,
						initContent: new xxCheckBox({
							value: ValueSelect,
							inactif: !optionTemp.Facultatif,
							ValueChange: (e) => {
								e ? (option[optionTemp.NameOption] = mythis.Page, optionForAutoGenerate[optionTemp.NameOption] = "new xxPageWrapper({ titleLocalise:\"sample\" })") : (delete option[optionTemp.NameOption], delete optionForAutoGenerate[optionTemp.NameOption]), regenerateRender();
							}
						})
					}), ClassCouleurAlternance);
					break;
				case ExxShowRoomContainerTypeOption$1.CotesCSS:
					ValueSelect = (optionValueSelectSurcharge == null ? !1 : optionValueSelectSurcharge[optionTemp.NameOption] != null) || optionTemp.ValeurDefaut;
					let interfaceMagin = ValueSelect ? {} : assignerObjet({}, ValueSelect);
					optionTemp.Facultatif || (option[optionTemp.NameOption] = interfaceMagin, optionForAutoGenerate[optionTemp.NameOption] = interfaceMagin);
					let regenerateRenderCotesCSS = () => {
						!optionTemp.Facultatif || Object.keys(interfaceMagin).length > 0 ? (option[optionTemp.NameOption] = interfaceMagin, optionForAutoGenerate[optionTemp.NameOption] = interfaceMagin) : (delete option[optionTemp.NameOption], delete optionForAutoGenerate[optionTemp.NameOption]), regenerateRender();
					}, gridCotesCSS = new xxGrid({ gridGap: "5px" });
					gridCotesCSS.append([new xxGridItem({
						colStart: 2,
						nbCols: 1,
						rowStart: 2,
						nbRows: 1,
						content: new xxInputNumerique({
							placeHolderVariable: "Tous",
							value: ValueSelect?.Tous,
							ValueChange: (e) => {
								e ? interfaceMagin.Tous = e : delete interfaceMagin.Tous, regenerateRenderCotesCSS();
							}
						})
					})]), gridCotesCSS.append([new xxGridItem({
						colStart: 2,
						nbCols: 1,
						rowStart: 1,
						nbRows: 1,
						content: new xxInputNumerique({
							placeHolderVariable: "Haut",
							value: ValueSelect?.Haut,
							ValueChange: (e) => {
								e ? interfaceMagin.Haut = e : delete interfaceMagin.Haut, regenerateRenderCotesCSS();
							}
						})
					})]), gridCotesCSS.append([new xxGridItem({
						colStart: 2,
						nbCols: 1,
						rowStart: 3,
						nbRows: 1,
						content: new xxInputNumerique({
							placeHolderVariable: "Bas",
							value: ValueSelect?.Bas,
							ValueChange: (e) => {
								e ? interfaceMagin.Bas = e : delete interfaceMagin.Bas, regenerateRenderCotesCSS();
							}
						})
					})]), gridCotesCSS.append([new xxGridItem({
						colStart: 1,
						nbCols: 1,
						rowStart: 2,
						nbRows: 1,
						content: new xxInputNumerique({
							placeHolderVariable: "Gauche",
							value: ValueSelect?.Gauche,
							ValueChange: (e) => {
								e ? interfaceMagin.Gauche = e : delete interfaceMagin.Gauche, regenerateRenderCotesCSS();
							}
						})
					})]), gridCotesCSS.append([new xxGridItem({
						colStart: 3,
						nbCols: 1,
						rowStart: 2,
						nbRows: 1,
						content: new xxInputNumerique({
							placeHolderVariable: "Droite",
							value: ValueSelect?.Droite,
							ValueChange: (e) => {
								e ? interfaceMagin.Droite = e : delete interfaceMagin.Droite, regenerateRenderCotesCSS();
							}
						})
					})]), gridCotesCSS.append([new xxGridItem({
						colStart: 4,
						nbCols: 1,
						rowStart: 1,
						nbRows: 1,
						content: new xxInputNumerique({
							placeHolderVariable: "H/B",
							value: ValueSelect?.HautEtBas,
							ValueChange: (e) => {
								e ? interfaceMagin.HautEtBas = e : delete interfaceMagin.HautEtBas, regenerateRenderCotesCSS();
							}
						})
					})]), gridCotesCSS.append([new xxGridItem({
						colStart: 4,
						nbCols: 1,
						rowStart: 3,
						nbRows: 1,
						content: new xxInputNumerique({
							placeHolderVariable: "G/D",
							value: ValueSelect?.GaucheEtDroite,
							ValueChange: (e) => {
								e ? interfaceMagin.GaucheEtDroite = e : delete interfaceMagin.GaucheEtDroite, regenerateRenderCotesCSS();
							}
						})
					})]), stackPanel.append(new xxLabelContainer({
						class: optionTemp.description ? "LabelWithDescription" : "",
						textVariable: optionTemp.NameOption + FactatifSign + " (CotesCss)",
						optionsAffichage: { positionDuContenu: enumPositionDuContenu.bas },
						titleVariable: optionTemp.description,
						type: enumTypeLabel.important,
						labelLargeurLibre: !0,
						initContent: gridCotesCSS
					}), ClassCouleurAlternance);
					break;
				case ExxShowRoomContainerTypeOption$1.Custom:
					let regenerateRenderCustom = (e, t) => {
						e ? (option[optionTemp.NameOption] = e, optionForAutoGenerate[optionTemp.NameOption] = t) : (delete option[optionTemp.NameOption], delete optionForAutoGenerate[optionTemp.NameOption]), regenerateRender();
					};
					stackPanel.append(new xxLabelContainer({
						class: optionTemp.description ? "LabelWithDescription" : "",
						textVariable: optionTemp.NameOption + FactatifSign + " (Custom)",
						optionsAffichage: { positionDuContenu: enumPositionDuContenu.bas },
						titleVariable: optionTemp.description,
						type: enumTypeLabel.important,
						labelLargeurLibre: !0,
						initContent: optionTemp.GenerateOption(regenerateRenderCustom)
					}), ClassCouleurAlternance);
					break;
			}
		});
	}
	GenerationRecursiveOptionsStringCode(e, t) {
		let n = this, r = "", i = typeof e;
		if (i == "string" || i == "number") r += e;
		else if (i == "boolean") r += e ? "true" : "false";
		else if (typeof e == "object" && Array.isArray(e)) t++, r += "[\n", e.forEach((e) => {
			r += "	".repeat(t), r += n.GenerationRecursiveOptionsStringCode(e, t), r += ",\n";
		}), t--, r += "	".repeat(t) + "]";
		else if (typeof e == "object") {
			t++, r += "{\n";
			let i = Object.keys(e);
			i.length > 0 && i.forEach((i) => {
				(typeof e[i] != "object" || typeof e[i] == "object" && Object.keys(e[i]).length > 0) && (r += "	".repeat(t) + i + ":", r += n.GenerationRecursiveOptionsStringCode(e[i], t), r += ",\n");
			}), t--, r += "	".repeat(t) + "}";
		}
		return r;
	}
	ReGenerateGridIcone() {
		let e = this;
		e.GridVueIcone.vider();
		let t = 1, n = 1, r = 6, i = null, a = !1, o = e.stringRecherche.Value.split(";").map((e) => e.toLowerCase());
		xxShowRoomContainer.ListIcone.sort((e, t) => e.groupe == t.groupe ? 0 : e.groupe < t.groupe ? -1 : 1).forEach((r) => {
			let s = r.iconeName.toLowerCase(), c = r.groupe.toLowerCase(), l, u;
			if (o.some((e) => s.includes(e) ? (l = e, !0) : !1), o.some((e) => c.includes(e) ? (u = e, !0) : !1), o.length > 1 && u && l || o.length == 1 && (u || l || !o[0])) {
				a = !0, (i == null || i != r.groupe) && (n > 1 && (n = 1, t++), i = r.groupe, e.GridVueIcone.append([new xxGridItem({
					colStart: 1,
					nbCols: 6,
					rowStart: t,
					nbRows: 1,
					content: new xxLabel({
						textVariable: i,
						type: enumTypeLabel.soustitre
					}).setSurbrillance(u)
				})]), t++);
				let o = new xxGrid({
					colonnes: [
						"20px",
						"1fr",
						"20px"
					],
					lignes: [
						"10px",
						"1fr",
						"10px",
						"20px"
					],
					class: "TuileSearch"
				}), s = new xxLabel({
					class: "isCopieLabel",
					textVariable: "Copie !"
				});
				s.hideLabel(!0), o.append([
					new xxGridItem({
						colStart: 2,
						nbCols: 1,
						rowStart: 2,
						nbRows: 1,
						optionsAffichage: { alignementContenu: enumAlignementContenu.CentreCentre },
						content: r.icone()
					}),
					new xxGridItem({
						colStart: 1,
						nbCols: 3,
						rowStart: 3,
						nbRows: 1,
						optionsAffichage: { alignementContenu: enumAlignementContenu.CentreCentre },
						content: new xxLabel({
							lineBreak: !0,
							textVariable: r.iconeName,
							type: enumTypeLabel.important
						}).setSurbrillance(l)
					}),
					new xxGridItem({
						colStart: 1,
						nbCols: 2,
						rowStart: 4,
						nbRows: 1,
						content: s
					}),
					new xxGridItem({
						colStart: 3,
						nbCols: 1,
						rowStart: 4,
						nbRows: 1,
						optionsAffichage: {
							alignementContenu: enumAlignementContenu.CentreCentre,
							margin: {
								Droite: 5,
								Bas: 5
							}
						},
						content: new IconeCs3i(enumIconeCs3i.action_copier, { taille: tailleIcone.XS })
					})
				]);
				let c = new xxContainerEvent$1({
					initContent: o,
					class: "TuileAffichageIcone",
					onClick: (e) => {
						navigator.clipboard ? navigator.clipboard.writeText(r.iconeString).then(() => {
							s.showLabel(), setTimeout(function() {
								s.hideLabel(!0);
							}, 2800);
						}, () => {
							xOutils.afficherMessageConfirmationPromise("Cliquez ok pour copier le code", !1).then(() => {
								xOutils.copyToClipboard(r.iconeString);
							});
						}) : (xOutils.copyToClipboard(r.iconeString), s.showLabel(), setTimeout(function() {
							s.hideLabel(!0);
						}, 2800)), e();
					}
				});
				e.GridVueIcone.append([new xxGridItem({
					colStart: n,
					nbCols: 1,
					rowStart: t,
					nbRows: 1,
					content: c
				})]), n++, n > 6 && (n = 1, t++);
			}
		}), !a && o.length > 0 && e.GridVueIcone.append([new xxGridItem({
			colStart: 1,
			rowStart: 1,
			nbCols: 6,
			nbRows: 1,
			optionsAffichage: { alignementContenu: enumAlignementContenu.CentreCentre },
			content: new xxLabel({
				textVariable: "Aucun resultat trouvé pour cette recherche",
				type: enumTypeLabel.soustitre
			})
		})]);
	}
	GenerateBoxerViewMethode(e) {
		let t = this, n, r;
		n = new xxPageWrapper$1({
			titleLocalise: "",
			withFooter: !0
		});
		let i = e.toString().split("function ")[1];
		if (i != null) {
			n.TitreVariable = i.split("(")[0];
			let a = Object.getOwnPropertyNames(e.prototype), o = [];
			for (let n of a) o.push(t.GetMethodDescription(n, Object.getOwnPropertyDescriptor(e.prototype, n)));
			n.zonePrincipale.xxTableau({
				data: o,
				columns: [{
					titleVariable: "Nom",
					renderMethod: function(e, t) {
						e.xspan({ textVariable: t.nom });
					}
				}, {
					titleVariable: "Description",
					renderMethod: function(e, t) {
						e.xspan({ textVariable: t.description });
					}
				}]
			}), r = new xxBoxer({ initContent: n }), r.afficher();
		} else xOutils.afficherMessageAlertifyLog("Cet Element ne contient aucune methode public");
	}
	GetMethodDescription(e, t) {
		let n = {
			nom: e,
			description: ""
		};
		return t.value == null ? t.get == null ? n.description = "?" : n.description = t.get.toString().split("{")[1].split("}")[0] : n.description = t.value.toString().split("{")[0], n;
	}
	htmlEntities(e) {
		return String(e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
	}
	AddErreur(e, t) {
		this.ListeErreur.append(new xxLabel({
			textVariable: `${e} - ${t}`,
			habillage: enumHabillageLabel.warning
		}));
	}
	AddErreurOption(e, t) {
		this.AddErreur(`Option "${e}"`, t);
	}
}, xxShowRoomLoader = class {
	static XElement_Load() {
		xxShowRoomContainer.AjouterElementShowroom({
			typeElement: xBr,
			NomElement: "xBr",
			Description: "Fait un retour à la ligne",
			Groupe: ExxShowRoomContaineGoupeElement.deprecated_DontUse,
			renderElement: function() {
				return new xxLabel({ textVariable: "Aucune option n'est disponible pour le xBr" });
			},
			RenderTooltip: async () => new xBr(),
			listOption: []
		}), xxShowRoomContainer.AjouterElementShowroom({
			typeElement: xCanvas,
			NomElement: "xCanvas",
			Description: "Insère un élément HTML Canvas",
			Groupe: ExxShowRoomContaineGoupeElement.xElement,
			renderElement: function(e) {
				return new xCanvas(e);
			},
			RenderTooltip: async () => new xCanvas({ class: xxShowRoomSample$1.classSampleDiv_Red }),
			listOption: [{
				TypeOption: ExxShowRoomContainerTypeOption.Texte,
				NameOption: "class",
				Facultatif: !0,
				ValeurDefaut: xxShowRoomSample$1.classSampleDiv_Red
			}, {
				TypeOption: ExxShowRoomContainerTypeOption.Texte,
				NameOption: "id",
				Facultatif: !0
			}]
		}), xxShowRoomContainer.AjouterElementShowroom({
			typeElement: xCouleur,
			NomElement: "xCouleur",
			Description: "Insère une zone de couleur",
			Groupe: ExxShowRoomContaineGoupeElement.xElement,
			renderElement: (e) => new xCouleur(e),
			RenderTooltip: async () => new xCouleur({ codeCouleur: "#FF0000" }),
			listOption: [
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "class",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "id",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.CouleurHexa,
					NameOption: "codeCouleur",
					Facultatif: !0
				}
			]
		}), xxShowRoomContainer.AjouterElementShowroom({
			typeElement: xDatePicker,
			NomElement: "xDatePicker",
			Description: "Permet de sélectionner une date au format calendrier",
			Groupe: ExxShowRoomContaineGoupeElement.xElement,
			RenderTooltip: async () => new xDatePicker({}),
			renderElement: (e) => new xDatePicker(e),
			listOption: [
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "class",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "choixAnnee",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "affichageNumSemaine",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "affichageBtnAujourdhui",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "affichageBtnAucuneDate",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "ToogleSelectedDefaut",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Date,
					NameOption: "value",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "valueChange",
					Facultatif: !0,
					Function: (e) => {}
				}
			]
		}), xxShowRoomContainer.AjouterElementShowroom({
			typeElement: xxDialog,
			NomElement: "xxDialog",
			Description: "Change",
			Groupe: ExxShowRoomContaineGoupeElement.xxElement,
			RenderTooltip: async () => new xxImageTabByte({
				tabByte: xxShowRoomImageTooltipPreview.xxDialog,
				typeAffichage: enumTypeImage.domImage
			}),
			renderElement: (e) => {
				let t = new xxDialog(e);
				return new xxBouton({
					titleVariable: "Change moi",
					click: (e) => {
						t.afficher(), e();
					},
					textVariable: "Afficher notification"
				});
			},
			listOption: [
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "texteLocalise",
					Facultatif: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "titleLocalise",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Number,
					NameOption: "dureeAffichageSec",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Enum,
					NameOption: "dialogType",
					Facultatif: !0,
					EnumType: "enumDialogTypeBouton",
					ValeurDefaut: enumDialogTypeBouton.pasDeBouton
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Enum,
					NameOption: "type",
					Facultatif: !1,
					EnumType: "enumTypeAlerte",
					ValeurDefaut: enumTypeAlerte.info
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "dialogResponse",
					Facultatif: !0,
					Function: (e) => {}
				}
			]
		}), xxShowRoomContainer.AjouterElementShowroom({
			typeElement: xDiv$1,
			NomElement: "xDiv",
			Description: "Ajoute un div à la DOM",
			Groupe: ExxShowRoomContaineGoupeElement.xElement,
			RenderTooltip: async () => xxShowRoomSample$1.divSample(),
			renderElement: (e) => new xDiv$1(e),
			listOption: xxShowRoomOptionRecurrente.get_OptionsHtml([{
				TypeOption: ExxShowRoomContainerTypeOption.TexteLocalisable,
				NameOptionLocalisable: "textLocalise",
				NameOptionVariable: "textVariable",
				Facultatif: !0
			}, {
				TypeOption: ExxShowRoomContainerTypeOption.Texte,
				NameOption: "title",
				Facultatif: !0
			}])
		}), xxShowRoomContainer.AjouterElementShowroom({
			typeElement: xHref,
			NomElement: "xHref",
			Description: "Crée un lien hypertexte",
			Groupe: ExxShowRoomContaineGoupeElement.xElement,
			RenderTooltip: async () => new xHref({
				url: "#",
				typeOuverture: enumTypeOuvertureHref.MemeEmplacement,
				textLocalise: "Je redirige !"
			}),
			renderElement: (e) => new xHref(e),
			listOption: xxShowRoomOptionRecurrente.get_OptionsHtml([
				{
					TypeOption: ExxShowRoomContainerTypeOption.Enum,
					EnumType: "enumTypeOuvertureHref",
					NameOption: "typeOuverture",
					Facultatif: !0,
					ValeurDefaut: enumTypeOuvertureHref.EmplacementParent
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.TexteLocalisable,
					NameOptionLocalisable: "textLocalise",
					NameOptionVariable: "textVariable",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "url",
					Facultatif: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.SousInterface,
					NameOption: "optionsAffichage",
					listOption: xxShowRoomOptionRecurrente.get_OptionsAffichage([{
						TypeOption: ExxShowRoomContainerTypeOption.Enum,
						EnumType: "enumCouleur",
						NameOption: "couleur",
						Facultatif: !0,
						ValeurDefaut: enumCouleur.emed_bleu
					}])
				}
			])
		}), xxShowRoomContainer.AjouterElementShowroom({
			typeElement: xIFrame,
			NomElement: "xIFrame",
			Description: "Crée une iframe (insertion d'une page html complète)",
			Groupe: ExxShowRoomContaineGoupeElement.xElement,
			RenderTooltip: async () => new xIFrame({
				src: xxShowRoomSample$1.urlIFrame(),
				name: "test"
			}),
			renderElement: (e) => new xIFrame(e),
			listOption: xxShowRoomOptionRecurrente.get_OptionsHtml([{
				TypeOption: ExxShowRoomContainerTypeOption.Texte,
				NameOption: "src",
				Facultatif: !0,
				ValeurDefaut: xxShowRoomSample$1.urlIFrame()
			}])
		}), xxShowRoomContainer.AjouterElementShowroom({
			typeElement: xImg,
			NomElement: "xImg",
			Description: "Insère une image",
			Groupe: ExxShowRoomContaineGoupeElement.xElement,
			RenderTooltip: async () => new xImg({
				src: "https://www.nexus-france.fr/files/nexus-france/Downloads/logo_nexus_france.png",
				class: "sampleImg"
			}),
			renderElement: (e) => new xImg(e),
			listOption: xxShowRoomOptionRecurrente.get_OptionsHtml([{
				TypeOption: ExxShowRoomContainerTypeOption.Texte,
				NameOption: "src",
				Facultatif: !0,
				ValeurDefaut: "https://www.nexus-france.fr/files/nexus-france/Downloads/logo_nexus_france.png"
			}])
		}), xxShowRoomContainer.AjouterElementShowroom({
			typeElement: xInputText,
			Description: "Crée un champ de saisie",
			NomElement: "xInputText",
			Groupe: ExxShowRoomContaineGoupeElement.xElement,
			RenderTooltip: async () => new xInputText({}),
			renderElement: (e) => new xInputText(e),
			listOption: [
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "class",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "id",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					Function: (e) => {},
					NameOption: "click",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "value",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Number,
					NameOption: "longueurMaxi",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "multiline",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Enum,
					EnumType: "enumStyleInput",
					NameOption: "style",
					ValeurDefaut: enumStyleInput.Filled,
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Enum,
					EnumType: "enumBackgroundInput",
					NameOption: "background",
					Facultatif: !0,
					ValeurDefaut: enumBackgroundInput.Transparent
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.SousInterface,
					NameOption: "numeric",
					Facultatif: !0,
					listOption: [
						{
							TypeOption: ExxShowRoomContainerTypeOption.Boolean,
							NameOption: "plus",
							Facultatif: !0,
							ValeurDefaut: !1
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.Boolean,
							NameOption: "minus",
							Facultatif: !0,
							ValeurDefaut: !1
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.Boolean,
							NameOption: "decimalSeparator",
							Facultatif: !0,
							ValeurDefaut: !1
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.Number,
							NameOption: "nbDigits",
							Facultatif: !0
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.Number,
							NameOption: "nbDecimal",
							Facultatif: !0
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.Number,
							NameOption: "max",
							Facultatif: !0
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.Number,
							NameOption: "min",
							Facultatif: !0
						}
					]
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					Function: (e) => {},
					NameOption: "KeyUpEnterCallback",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					Function: () => {},
					NameOption: "KeyUpCancelCallback",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					Function: (e) => {},
					NameOption: "ValueChange",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "autoChange",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "password",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "placeHolderVariable",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "placeHolderlocalise",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					Function: (e) => {},
					NameOption: "onLostfocusCallback",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.SousInterface,
					NameOption: "binding",
					Facultatif: !0,
					listOption: []
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "disabled",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "champLarge",
					Facultatif: !0,
					ValeurDefaut: !1
				}
			]
		}), xxShowRoomContainer.AjouterElementShowroom({
			typeElement: xInputTextAvecIcone,
			Description: "Crée un champ de saisie avec une icone",
			NomElement: "xInputTextAvecIcone",
			Groupe: ExxShowRoomContaineGoupeElement.xElement,
			RenderTooltip: async () => new xInputTextAvecIcone({ icone: enumIconeSvg.recherche }),
			renderElement: (e) => new xInputTextAvecIcone(e),
			listOption: [
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "class",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "id",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					Function: (e) => {},
					NameOption: "click",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "value",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Number,
					NameOption: "longueurMaxi",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "multiline",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Enum,
					EnumType: "enumStyleInput",
					NameOption: "style",
					ValeurDefaut: enumStyleInput.Filled,
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Enum,
					EnumType: "enumBackgroundInput",
					NameOption: "background",
					Facultatif: !0,
					ValeurDefaut: enumBackgroundInput.Transparent
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.SousInterface,
					NameOption: "numeric",
					Facultatif: !0,
					listOption: [
						{
							TypeOption: ExxShowRoomContainerTypeOption.Boolean,
							NameOption: "plus",
							Facultatif: !0,
							ValeurDefaut: !1
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.Boolean,
							NameOption: "minus",
							Facultatif: !0,
							ValeurDefaut: !1
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.Boolean,
							NameOption: "decimalSeparator",
							Facultatif: !0,
							ValeurDefaut: !1
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.Number,
							NameOption: "nbDigits",
							Facultatif: !0
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.Number,
							NameOption: "nbDecimal",
							Facultatif: !0
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.Number,
							NameOption: "max",
							Facultatif: !0
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.Number,
							NameOption: "min",
							Facultatif: !0
						}
					]
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					Function: (e) => {},
					NameOption: "KeyUpEnterCallback",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					Function: () => {},
					NameOption: "KeyUpCancelCallback",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					Function: (e) => {},
					NameOption: "ValueChange",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "autoChange",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "password",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "placeHolderVariable",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "placeHolderlocalise",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					Function: (e) => {},
					NameOption: "onLostfocusCallback",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.SousInterface,
					NameOption: "binding",
					Facultatif: !0,
					listOption: []
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "disabled",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Enum,
					EnumType: "enumIconeSvg",
					NameOption: "icone",
					ValeurDefaut: enumIconeSvg.recherche
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Enum,
					EnumType: "enumCouleur",
					NameOption: "couleurIcone",
					Facultatif: !0,
					ValeurDefaut: enumCouleur.emed_grisfonce
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Custom,
					NameOption: "positionIcone",
					GenerateOption: (e) => new xxRadioButton({
						initElements: [{
							valeur: "Debut",
							libelleVariable: "Debut"
						}, {
							valeur: "Fin",
							libelleVariable: "Fin",
							preselectionne: !0
						}],
						valueChange: (t) => {
							t == "Debut" ? e(t, "\"" + t + "\"") : e(null, null);
						}
					}),
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "champLarge",
					Facultatif: !0,
					ValeurDefaut: !1
				}
			]
		}), xxShowRoomContainer.AjouterElementShowroom({
			typeElement: xInputCheckBox,
			Description: "Permet d'ajouter du texte dans une checkbox",
			NomElement: "xInputCheckBox",
			Groupe: ExxShowRoomContaineGoupeElement.deprecated_DontUse,
			RenderTooltip: async () => new xInputCheckBox({}),
			renderElement: (e) => new xInputCheckBox(e),
			listOption: [
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "class",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.TexteLocalisable,
					NameOptionLocalisable: "textLocalise",
					NameOptionVariable: "textVariable",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "titleLocalise",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "titleVariable",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "id",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					Function: (e) => {},
					NameOption: "click",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "espaceMinimaliste",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.SousInterface,
					NameOption: "AffichageBoutonWapper2",
					Facultatif: !0,
					listOption: [
						{
							TypeOption: ExxShowRoomContainerTypeOption.Enum,
							EnumType: "enumCouleurBouton",
							NameOption: "color",
							Facultatif: !1,
							ValeurDefaut: enumCouleurBouton.Utilisateur
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.Boolean,
							NameOption: "margin",
							Facultatif: !0,
							ValeurDefaut: !1
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.Enum,
							EnumType: "enumPosition",
							NameOption: "positionIcone",
							ValeurDefaut: enumPosition.Left
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.Enum,
							EnumType: "enumPositionnementResponsiveBouton",
							NameOption: "positionnementResponsiveBouton",
							Facultatif: !0,
							ValeurDefaut: enumPositionnementResponsiveBouton.Defaut
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.Boolean,
							NameOption: "rounded",
							Facultatif: !0,
							ValeurDefaut: !1
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.Enum,
							EnumType: "enumTailleBouton",
							NameOption: "tailleBouton",
							ValeurDefaut: enumTailleBouton.M
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.Enum,
							EnumType: "enumStyleBouton",
							NameOption: "styleBouton",
							ValeurDefaut: enumStyleBouton.Simple
						}
					]
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "canbePartiel",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					Function: (e) => !1,
					NameOption: "CanValueChange",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Icone,
					NameOption: "IconeBoutonWapper2",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Icone,
					NameOption: "imageDisable",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Icone,
					NameOption: "imageEnable",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "inactif",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					Function: () => {},
					NameOption: "renderIntermediaire",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Number,
					NameOption: "tabIndex",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Enum,
					EnumType: "enumTypeCheckbox",
					NameOption: "typeCheckbox",
					Facultatif: !0,
					ValeurDefaut: enumTypeCheckbox.standard
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "value",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "ValueChange",
					Function: (e) => {
						alert(e);
					},
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "WithChangeValueWhenNull",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "withLabelContainer",
					Facultatif: !0,
					ValeurDefaut: !1
				}
			]
		}), xxShowRoomContainer.AjouterElementShowroom({
			typeElement: xInputDate,
			NomElement: "xInputDate",
			Description: "Permet de renseigner une date",
			Groupe: ExxShowRoomContaineGoupeElement.xElement,
			RenderTooltip: async () => new xInputDate({}),
			renderElement: (e) => new xInputDate(e),
			listOption: xxShowRoomOptionRecurrente.get_OptionsHtml([
				{
					TypeOption: ExxShowRoomContainerTypeOption.Date,
					NameOption: "value",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					Function: (e) => {},
					NameOption: "appuyeToucheEntree",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "AvecBoutonToday",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "AvecChoixAnnee",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "AvecCodeJour",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "AvecNumSemaine",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "CanSelectDateNull",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "disabled",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "nonResponsive",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					Function: (e) => {},
					NameOption: "onClose",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "placeHolderlocalise",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "todayDefaultValue",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Enum,
					EnumType: "enumTypeAffichePicker",
					NameOption: "typeAffichage",
					Facultatif: !0,
					ValeurDefaut: enumTypeAffichePicker.AvecPicker
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					Function: (e) => {},
					NameOption: "ValueChange",
					Facultatif: !1
				}
			])
		}), xxShowRoomContainer.AjouterElementShowroom({
			typeElement: xInputDateAndTime,
			NomElement: "xInputDateAndTime",
			Description: "Permet de renseigner une date et une heure",
			Groupe: ExxShowRoomContaineGoupeElement.xElement,
			RenderTooltip: async () => new xInputDateAndTime({}),
			renderElement: (e) => new xInputDateAndTime(e),
			listOption: [
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "class",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "id",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					Function: (e) => {},
					NameOption: "click",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Date,
					NameOption: "value",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "AvecBoutonToday",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "AvecChoixAnnee",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "AvecCodeJour",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "AvecNumSemaine",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "AvesLabels",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "btnValiderChange",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "disabled",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "nonResponsive",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "placeHolderlocalise",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Enum,
					EnumType: "enumTypeAffichePicker",
					NameOption: "typeAffichage",
					Facultatif: !0,
					ValeurDefaut: enumTypeAffichePicker.AvecPicker
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					Function: (e) => {},
					NameOption: "ValueChange",
					Facultatif: !1
				}
			]
		}), xxShowRoomContainer.AjouterElementShowroom({
			typeElement: xInputTime,
			NomElement: "xInputTime",
			Description: "Permet de renseigner une heure",
			Groupe: ExxShowRoomContaineGoupeElement.xElement,
			RenderTooltip: async () => new xInputTime({}),
			renderElement: (e) => new xInputTime(e),
			listOption: [
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "class",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "id",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					Function: (e) => {},
					NameOption: "click",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Date,
					NameOption: "value",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "btnValiderChange",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "disabled",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "nonResponsive",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "placeHolderlocalise",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Enum,
					EnumType: "enumTypeAffichePicker",
					NameOption: "typeAffichage",
					Facultatif: !0,
					ValeurDefaut: enumTypeAffichePicker.AvecPicker
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					Function: (e) => {},
					NameOption: "ValueChange",
					Facultatif: !1
				}
			]
		}), xxShowRoomContainer.AjouterElementShowroom({
			typeElement: xInputFile,
			Description: "Permet d'importer un fichier",
			NomElement: "xInputFile",
			Groupe: ExxShowRoomContaineGoupeElement.xElement,
			RenderTooltip: async () => new xInputFile({ ValueChange: (e, t) => {} }),
			renderElement: (e) => new xInputFile(e),
			listOption: [
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "class",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "id",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.TexteLocalisable,
					NameOptionLocalisable: "textLocalise",
					NameOptionVariable: "textVariable",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "titleLocalise",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "titleVariable",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "ValueChange",
					Facultatif: !1,
					Function: (e, t) => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "accept",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "capture",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "iconeAppareilPhoto",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "textChangeWhenUpload",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Number,
					NameOption: "widthMaxForImage",
					Facultatif: !0
				}
			]
		}), xxShowRoomContainer.AjouterElementShowroom({
			typeElement: xLi,
			Description: "Permet de faire une liste",
			NomElement: "xLi",
			Groupe: ExxShowRoomContaineGoupeElement.deprecated_DontUse,
			RenderTooltip: async () => new xLi({}),
			renderElement: (e) => new xLi(e),
			listOption: xxShowRoomOptionRecurrente.get_OptionsHtml([{
				TypeOption: ExxShowRoomContainerTypeOption.Texte,
				NameOption: "text",
				Facultatif: !0,
				ValeurDefaut: "Texte par défaut"
			}])
		}), xxShowRoomContainer.AjouterElementShowroom({
			typeElement: xSeparateur,
			NomElement: "xSeparateur",
			Description: "Crée une ligne de séparation",
			Groupe: ExxShowRoomContaineGoupeElement.xElement,
			renderElement: function(e) {
				return new xxGrid({}).append([
					new xxGridItem({
						rowStart: 2,
						colStart: 2,
						nbCols: 1,
						nbRows: 1,
						content: new xSeparateur(e)
					}),
					new xxGridItem({
						rowStart: e.orientation == enumTypeOrientation.horizontal ? 1 : 2,
						colStart: e.orientation == enumTypeOrientation.horizontal ? 2 : 1,
						nbCols: 1,
						nbRows: 1,
						content: xxShowRoomSample$1.divSample()
					}),
					new xxGridItem({
						rowStart: e.orientation == enumTypeOrientation.horizontal ? 3 : 2,
						colStart: e.orientation == enumTypeOrientation.horizontal ? 2 : 3,
						nbCols: 1,
						nbRows: 1,
						content: xxShowRoomSample$1.divSample(2)
					})
				]);
			},
			RenderTooltip: async () => new xSeparateur({
				orientation: enumTypeOrientation.vertical,
				tailleCustom: 100,
				margin: { GaucheEtDroite: 60 }
			}),
			listOption: [
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "class",
					Facultatif: !0,
					ValeurDefaut: "petitTest"
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Number,
					NameOption: "tailleCustom",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Enum,
					NameOption: "orientation",
					EnumType: "enumTypeOrientation",
					ValeurDefaut: enumTypeOrientation.horizontal
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.CotesCSS,
					NameOption: "margin",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Enum,
					NameOption: "epaisseur",
					EnumType: "enumEpaisseurSeparation",
					ValeurDefaut: enumEpaisseurSeparation.fin,
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.SousInterface,
					NameOption: "optionsAffichage",
					Facultatif: !0,
					listOption: xxShowRoomOptionRecurrente.get_OptionsAffichage()
				}
			]
		}), xxShowRoomContainer.AjouterElementShowroom({
			typeElement: xSpan,
			Description: "Permet de renseigner du texte",
			NomElement: "xSpan",
			Groupe: ExxShowRoomContaineGoupeElement.deprecated_DontUse,
			RenderTooltip: async () => new xSpan({ textVariable: "Texte par défaut" }),
			renderElement: (e) => new xSpan(e),
			listOption: xxShowRoomOptionRecurrente.get_OptionsHtml([{
				TypeOption: ExxShowRoomContainerTypeOption.TexteLocalisable,
				NameOptionLocalisable: "textLocalise",
				NameOptionVariable: "textVariable",
				Facultatif: !0,
				ValeurDefaut: "Texte par défaut"
			}, {
				TypeOption: ExxShowRoomContainerTypeOption.Texte,
				NameOption: "title",
				Facultatif: !0
			}])
		}), xxShowRoomContainer.AjouterElementShowroom({
			typeElement: xTable,
			NomElement: "xTable",
			Description: "Permet de créer un tableau",
			Groupe: ExxShowRoomContaineGoupeElement.deprecated_DontUse,
			RenderTooltip: async () => new xTable({}),
			renderElement: (e) => new xTable(e),
			listOption: xxShowRoomOptionRecurrente.get_OptionsHtml()
		}), xxShowRoomContainer.AjouterElementShowroom({
			typeElement: xTimePicker,
			NomElement: "xTimePicker",
			Description: "Permet de choisir des heures et minutes",
			Groupe: ExxShowRoomContaineGoupeElement.xElement,
			RenderTooltip: async () => new xTimePicker({}),
			renderElement: (e) => new xTimePicker(e),
			listOption: [
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "class",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					Function: (e) => {},
					NameOption: "ValueChange",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Time,
					NameOption: "value",
					Facultatif: !0
				}
			]
		}), xxShowRoomContainer.AjouterElementShowroom({
			typeElement: xUl,
			NomElement: "xUl",
			Description: "Permet d'ajouter une liste non-ordonnée",
			Groupe: ExxShowRoomContaineGoupeElement.deprecated_DontUse,
			RenderTooltip: async () => new xUl({ class: "sampleUl" }),
			renderElement: (e) => new xUl(e),
			listOption: xxShowRoomOptionRecurrente.get_OptionsHtml()
		});
	}
	static XXElement_Load() {
		xxShowRoomContainer.AjouterElementShowroom({
			typeElement: xxArbre,
			NomElement: "xxArbre",
			Groupe: ExxShowRoomContaineGoupeElement.xxElement,
			Description: "Permet d'ajoueter un arbre",
			RenderTooltip: async () => {
				let e = [], t = new ObservableCollection(e);
				return new xxArbre({
					donnees: t,
					defaultvalue: null,
					valueChange: (e) => {},
					renderDetail: (e, t, n) => {
						let r = new xxContainerEvent({
							initContent: new xxLabelContainer({
								textVariable: e.modeCuisson,
								initContent: new xxLabel({ textVariable: e.typeFarine })
							}),
							onClick: (t) => {
								n(e), t();
							}
						});
						t.append(r);
					},
					renderTitre: (e, t) => {
						t.append(new xxLabelContainer({
							textVariable: e.modeCuisson,
							initContent: new xxLabel({ textVariable: e.typeFarine })
						}));
					},
					renderEndList: (e, t) => {},
					renderSelected: (e, t, n) => {
						t.xxBouton({
							titleLocalise: "changer d'exigence",
							textVariable: e == null ? "aucune" : e.modeCuisson + " - " + e.typeFarine,
							click: (t) => {
								n(e);
							}
						});
					},
					getEnfants: (t) => e,
					getPere: (e) => null
				});
			},
			renderElement: (e) => new xxArbre(e),
			listOption: [
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					Function: (e) => {},
					NameOption: "getEnfants",
					Facultatif: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					Function: (e) => {},
					NameOption: "getPere",
					Facultatif: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					Function: (e, t, n) => {},
					NameOption: "renderDetail",
					Facultatif: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					Function: (e, t) => {},
					NameOption: "renderEndList",
					Facultatif: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					Function: (e, t, n) => {},
					NameOption: "renderSelected",
					Facultatif: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					Function: (e, t, n) => {},
					NameOption: "renderTitre",
					Facultatif: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					Function: (e) => {},
					NameOption: "valueChange",
					Facultatif: !1
				}
			]
		}), xxShowRoomContainer.AjouterElementShowroom({
			typeElement: xxAssistantSaisieUtilisateur,
			NomElement: "xxAssistantSaisieUtilisateur",
			Description: "",
			Groupe: ExxShowRoomContaineGoupeElement.xxElement,
			RenderTooltip: async () => new xxAssistantSaisieUtilisateur({ page: null }),
			renderElement: (e) => new xxAssistantSaisieUtilisateur(e),
			listOption: [{
				TypeOption: ExxShowRoomContainerTypeOption.Boolean,
				NameOption: "affichageSimpleSansRecap",
				Facultatif: !0,
				ValeurDefaut: !1
			}, {
				TypeOption: ExxShowRoomContainerTypeOption.Pagewapper,
				NameOption: "page"
			}]
		}), xxShowRoomContainer.AjouterElementShowroom({
			typeElement: xxAutoComplete,
			NomElement: "xxAutoComplete",
			Description: "Permet de creer une entre texte avec une liste d'element contenent la saisie",
			Groupe: ExxShowRoomContaineGoupeElement.xxElement,
			RenderTooltip: async () => new xxImageTabByte({
				tabByte: xxShowRoomImageTooltipPreview.xxAutoComplete,
				typeAffichage: enumTypeImage.domImage
			}),
			renderElement: (e) => new xxAutoComplete(e),
			listOption: [
				{
					TypeOption: ExxShowRoomContainerTypeOption.Donnees,
					NameOption: "listeValeurs",
					DataType: ExxShowRoomContaineDataType.string
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "getLibelle",
					Function: (e, t) => e
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "getClass",
					Function: (e, t) => e,
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "getIdTest",
					Function: (e) => e,
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "valueChange",
					Function: (e) => {
						xOutils.afficherMessageAlertifySuccess(e);
					}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "placeholder",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "libelleNullChoice",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "value",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "getKey",
					Function: (e) => e,
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "typeValue",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "asyncLoading",
					Function: () => xxShowRoomSample$1.listeStringsAsync(),
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "goasyncResearch",
					Function: (e) => e.length > 3,
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "asyncResearch",
					Function: (e) => new Promise((t) => {
						t(xxShowRoomSample$1.listeStrings().filter((t) => t.search(e) >= 0));
					}),
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Enum,
					NameOption: "taille",
					EnumType: "enumAutoCompleteTaille",
					ValeurDefaut: null,
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "renderItemInListe",
					Function: (e, t, n) => {
						e.append(new xxBouton({
							titleVariable: t + " - overrideRender",
							click: (e) => {
								n(t), e();
							},
							textVariable: t
						}));
					},
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.SousInterface,
					NameOption: "regroupementUniqueBy",
					Facultatif: !0,
					description: "ReGroupement sous une seule bannier (modification de l'ordre des données)",
					listOption: [{
						TypeOption: ExxShowRoomContainerTypeOption.Function,
						NameOption: "groupHeaderCustom",
						Facultatif: !0,
						Function: (e, t) => {
							e.append(new xxLabel({ textVariable: t[0].Group + " - " + t.length }));
						}
					}, {
						TypeOption: ExxShowRoomContainerTypeOption.Function,
						NameOption: "GroupBy",
						Facultatif: !0,
						Function: (e) => e.Group
					}]
				}
			]
		}), xxShowRoomContainer.AjouterElementShowroom({
			typeElement: xxBloqueEcran,
			NomElement: "xxBloqueEcran",
			Description: "Permet de bloquer l'écran",
			Groupe: ExxShowRoomContaineGoupeElement.xxElement,
			RenderTooltip: async () => new xxBloqueEcran({ textVariable: "sample" }),
			renderElement: (e) => new xxBouton({
				textLocalise: "Bloquer l'écran 3 secondes",
				titleLocalise: "Bloquer l'écran 3 secondes",
				click: (t) => {
					let n = new xxBloqueEcran(e);
					setTimeout(() => {
						n.fermer();
					}, 3e3), t();
				}
			}),
			listOption: [
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "class",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "id",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.TexteLocalisable,
					NameOptionLocalisable: "textLocalise",
					NameOptionVariable: "textVariable",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "fondVisible",
					Facultatif: !0,
					ValeurDefaut: !1
				}
			]
		}), xxShowRoomContainer.AjouterElementShowroom({
			typeElement: xxBouton,
			NomElement: "xxBouton",
			Description: "Insère un bouton",
			Groupe: ExxShowRoomContaineGoupeElement.xxElement,
			renderElement: function(e) {
				return new xxBouton(e);
			},
			RenderTooltip: async () => new xxBouton({
				titleLocalise: "Valider",
				click: (e) => {
					e();
				},
				textLocalise: "Valider",
				icone: new IconeCs3i(enumIconeCs3i.action_valider)
			}),
			listOption: [
				{
					TypeOption: ExxShowRoomContainerTypeOption.Enum,
					NameOption: "typeBouton",
					EnumType: "enumTypeBouton",
					Facultatif: !0,
					ValeurDefaut: enumTypeBouton.Standard
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.TexteLocalisable,
					NameOptionLocalisable: "titleLocalise",
					NameOptionVariable: "titleVariable"
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.TexteLocalisable,
					NameOptionLocalisable: "textLocalise",
					NameOptionVariable: "textVariable",
					Facultatif: !0,
					ValeurDefaut: "Change moi"
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "disabled",
					ValeurDefaut: !1,
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "click",
					Function: (e) => {
						xOutils.afficherMessageAlertifyLog("Click"), e();
					}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "dblclick",
					Facultatif: !0,
					Function: (e) => {
						xOutils.afficherMessageAlertifyLog("double Click"), e();
					}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "touchLong",
					Facultatif: !0,
					Function: (e) => {
						xOutils.afficherMessageAlertifyLog("Long touch"), e();
					}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Icone,
					NameOption: "icone",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.SousInterface,
					NameOption: "optionsAffichage",
					Facultatif: !0,
					listOption: xxShowRoomOptionRecurrente.get_OptionsAffichageBouton()
				}
			],
			ListePreReglageOption: [
				{
					NomReglage: "Valider horizontal M",
					Prereglage: {
						click: (e) => {
							e();
						},
						optionsAffichage: { tailleBouton: enumTailleBouton.M },
						textLocalise: "Valider",
						titleLocalise: "Valider",
						icone: new IconeCs3i(enumIconeCs3i.action_valider)
					}
				},
				{
					NomReglage: "Supprimer horizontal M",
					Prereglage: {
						titleLocalise: "Change moi",
						click: (e) => {
							e();
						},
						textLocalise: "Supprimer",
						icone: new IconeCs3i(enumIconeCs3i.action_supprimer)
					}
				},
				{
					NomReglage: "Annuler horizontal M",
					Prereglage: {
						titleLocalise: "Change moi",
						click: (e) => {
							e();
						},
						textLocalise: "Annuler",
						icone: new IconeCs3i(enumIconeCs3i.action_annuler)
					}
				},
				{
					NomReglage: "Supprimer vertical M",
					Prereglage: {
						titleLocalise: "Change moi",
						click: (e) => {
							e();
						},
						textLocalise: "Supprimer",
						icone: new IconeCs3i(enumIconeCs3i.action_supprimer),
						optionsAffichage: { positionIconeBouton: enumPosition.Top }
					}
				},
				{
					NomReglage: "Supprimer icone only",
					Prereglage: {
						titleLocalise: "Change moi",
						click: (e) => {
							e();
						},
						icone: new IconeCs3i(enumIconeCs3i.action_supprimer),
						optionsAffichage: {
							positionIconeBouton: enumPosition.Top,
							tailleBouton: enumTailleBouton.Fit
						}
					}
				},
				{
					NomReglage: "Annuler icone only",
					Prereglage: {
						titleLocalise: "Change moi",
						click: (e) => {
							e();
						},
						icone: new IconeCs3i(enumIconeCs3i.action_annuler),
						optionsAffichage: {
							positionIconeBouton: enumPosition.Top,
							tailleBouton: enumTailleBouton.Fit
						}
					}
				}
			]
		}), xxShowRoomContainer.AjouterElementShowroom({
			typeElement: xxBoxer,
			Description: "Ouvre un boxer",
			NomElement: "xxBoxer",
			Groupe: ExxShowRoomContaineGoupeElement.xxElement,
			RenderTooltip: async () => new xxLabel({
				textVariable: "Rendu du composant impossible",
				type: enumTypeLabel.information
			}),
			renderElement: (e) => {
				let t = new xxBoxer(e);
				return new xxBouton({
					click: (e) => {
						t.afficher(), e();
					},
					titleVariable: "Ouvrir le boxer",
					textVariable: "Ouvrir le boxer"
				});
			},
			listOption: [
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "class",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "id",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.TexteLocalisable,
					NameOptionLocalisable: "titleLocalise",
					NameOptionVariable: "titleVariable",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "afterClose",
					Facultatif: !0,
					Function: (e) => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "beforeClose",
					Facultatif: !0,
					Function: () => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "beforeShow",
					Facultatif: !0,
					Function: (e) => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.iXElement,
					NameOption: "initContent",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "modal",
					description: "Rend le background exterieur du boxer inclickable, le boxer pourra être fermé uniquement avec le bouton ou avec la méthode fermer() dans le code.",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Enum,
					NameOption: "ModeAffichage",
					EnumType: "enumBoxerMode",
					ValeurDefaut: enumBoxerMode.standard,
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "nonPersistent",
					description: "Supprime le boxer de la dom lorsqu'il a été fermé",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Number,
					NameOption: "positionHorizontale",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Number,
					NameOption: "positionVerticale",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Enum,
					EnumType: "enumPositionOrigine",
					NameOption: "positionOriginie",
					ValeurDefaut: enumPositionOrigine.top_left
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "sansBtnClose",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Enum,
					NameOption: "tailleBoxer",
					EnumType: "enumBoxerTaille",
					ValeurDefaut: enumBoxerTaille.m,
					Facultatif: !0
				}
			]
		}), xxShowRoomContainer.AjouterElementShowroom({
			typeElement: xxCarrousel,
			NomElement: "xxCarrousel",
			Description: "Créer un carrousel d'images",
			Groupe: ExxShowRoomContaineGoupeElement.xxElement,
			RenderTooltip: async () => new xxCarrousel({
				indice_depart: 0,
				photos64: [xxShowRoomSample$1.imageBase64(), xxShowRoomSample$1.imageBase64(2)],
				valueChange: (e) => {}
			}),
			renderElement: (e) => new xxCarrousel(e),
			listOption: [
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "class",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Number,
					NameOption: "indice_depart",
					Facultatif: !1,
					ValeurDefaut: 0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "valueChange",
					Facultatif: !1,
					Function: (e) => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Donnees,
					NameOption: "photos64",
					Facultatif: !1,
					DataType: ExxShowRoomContaineDataType.string,
					ValeurDefaut: [xxShowRoomSample$1.imageBase64()],
					ValeurSample: [
						xxShowRoomSample$1.imageBase64(2),
						xxShowRoomSample$1.imageBase64(3),
						xxShowRoomSample$1.imageBase64()
					]
				}
			]
		}), xxShowRoomContainer.AjouterElementShowroom({
			typeElement: xxCheckBox,
			NomElement: "xxCheckBox",
			Description: "Créer une case à cocher",
			Groupe: ExxShowRoomContaineGoupeElement.xxElement,
			RenderTooltip: async () => new xxCheckBox({}),
			renderElement: (e) => new xxCheckBox(e),
			listOption: xxShowRoomOptionRecurrente.get_OptionsHtml([
				{
					TypeOption: ExxShowRoomContainerTypeOption.TexteLocalisable,
					NameOptionLocalisable: "textLocalise",
					NameOptionVariable: "textVariable",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.TexteLocalisable,
					NameOptionLocalisable: "titleLocalise",
					NameOptionVariable: "titleVariable",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "canbePartiel",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "CanValueChange",
					Facultatif: !0,
					Function: (e) => e
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "espaceMinimaliste",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Icone,
					NameOption: "IconeBoutonWapper2",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Icone,
					NameOption: "imageDisable",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Icone,
					NameOption: "imageEnable",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "inactif",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "renderIntermediaire",
					Facultatif: !0,
					Function: () => xxShowRoomSample$1.divSample()
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Enum,
					EnumType: "enumTypeCheckbox",
					NameOption: "typeCheckbox",
					ValeurDefaut: enumTypeCheckbox.standard,
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "value",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "ValueChange",
					Function: (e) => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "WithChangeValueWhenNull",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "withLabelContainer",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.SousInterface,
					NameOption: "AffichageBoutonWapper2",
					Facultatif: !0,
					listOption: xxShowRoomOptionRecurrente.get_OptionsAffichageBouton()
				}
			])
		}), xxShowRoomContainer.AjouterElementShowroom({
			typeElement: xxChoixCouleur,
			NomElement: "xxChoixCouleur",
			Description: "Permet de choisir une couleur",
			Groupe: ExxShowRoomContaineGoupeElement.deprecated_DontUse,
			RenderTooltip: async () => new xxLabel({
				textVariable: "xxChoixCouleur ne fonctionne qu'avec un xCouleur pour le rendu",
				type: enumTypeLabel.information
			}),
			renderElement: (e) => new xxChoixCouleur(e),
			listOption: [
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "value",
					Facultatif: !0,
					ValeurDefaut: "FF0000"
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "ValueChange",
					Facultatif: !0,
					Function: (e) => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "choixCouleurLibre",
					Facultatif: !1,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Enum,
					NameOption: "nuancierCouleurs",
					EnumType: "enumNuancierCouleurs",
					ValeurDefaut: enumNuancierCouleurs.defaut
				}
			]
		}), xxShowRoomContainer.AjouterElementShowroom({
			typeElement: xxChoixOuiNon,
			NomElement: "xxChoixOuiNon",
			Description: "Raccourci de RadioButton pour choisir oui ou non",
			Groupe: ExxShowRoomContaineGoupeElement.deprecated_DontUse,
			RenderTooltip: async () => new xxChoixOuiNon({
				valeurParDefaut: !0,
				valueChange: (e) => {}
			}),
			renderElement: (e) => new xxChoixOuiNon(e),
			listOption: [
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "valeurParDefaut",
					Facultatif: !1,
					ValeurDefaut: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "valueChange",
					Facultatif: !1,
					Function: (e) => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "inactif",
					Facultatif: !0,
					ValeurDefaut: !1
				}
			]
		}), xxShowRoomContainer.AjouterElementShowroom({
			typeElement: xxContainerEvent,
			NomElement: "xxContainerEvent",
			Description: "Permet de créer un conteneur intéractif (au clic, double-clic, survol... )",
			Groupe: ExxShowRoomContaineGoupeElement.xxElement,
			RenderTooltip: async () => new xxContainerEvent({
				class: "sampleContainer",
				initContent: new xxLabel({ textVariable: "sampleContainer" })
			}),
			renderElement: (e) => new xxContainerEvent(e),
			listOption: [
				{
					TypeOption: ExxShowRoomContainerTypeOption.TexteLocalisable,
					NameOptionLocalisable: "titleLocalise",
					NameOptionVariable: "titleVariable",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "class",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "id",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "onClick",
					Facultatif: !0,
					Function: (e) => {
						xOutils.afficherMessageAlertifyLog("onClick"), e();
					}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "onMouseEnter",
					Facultatif: !0,
					Function: () => {
						xOutils.afficherMessageAlertifyLog("onMouseEnter");
					}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "onDblClick",
					Facultatif: !0,
					Function: (e) => {
						xOutils.afficherMessageAlertifyLog("onDblClick"), e();
					}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "onMouseLeave",
					Facultatif: !0,
					Function: () => {
						xOutils.afficherMessageAlertifyLog("onMouseLeave");
					}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					Facultatif: !0,
					NameOption: "onMouseOut",
					Function: () => {
						xOutils.afficherMessageAlertifyLog("onMouseOut");
					}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					Facultatif: !0,
					NameOption: "onMouseOver",
					Function: () => {
						xOutils.afficherMessageAlertifyLog("onMouseOver");
					}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					Facultatif: !0,
					NameOption: "onRightClick",
					Function: (e) => {
						xOutils.afficherMessageAlertifyLog("onRightClick"), e();
					}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					Facultatif: !0,
					NameOption: "onShiftClick",
					Function: (e) => {
						e();
					}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					Facultatif: !0,
					NameOption: "onTouchLong",
					Function: (e) => {
						e();
					}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "stopPropagation",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.iXElement,
					NameOption: "initContent",
					Facultatif: !0
				}
			]
		}), xxShowRoomContainer.AjouterElementShowroom({
			typeElement: xxDockPanelDeprecated,
			NomElement: "xxDockPanelDeprecated",
			Description: "Permet d'agencer les xElements",
			Groupe: ExxShowRoomContaineGoupeElement.deprecated_DontUse,
			RenderTooltip: async () => new xxDockPanelDeprecated({ class: xxShowRoomSample$1.classSampleDiv_Red }),
			renderElement: (e) => new xxDockPanelDeprecated(e),
			listOption: [
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "class",
					Facultatif: !0,
					ValeurDefaut: "sampleDiv"
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "id",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "centrerDernier",
					Facultatif: !0,
					ValeurDefaut: !0
				}
			]
		}), xxShowRoomContainer.AjouterElementShowroom({
			typeElement: xxGrid,
			Description: "Permet de créer une grille",
			NomElement: "xxGrid",
			Groupe: ExxShowRoomContaineGoupeElement.xxElement,
			RenderTooltip: async () => new xxGrid({}),
			renderElement: (e) => new xxGrid(e),
			listOption: [
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "class",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "id",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "colonnes_auto",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "lignes_auto",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "fullHeight",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "fullWidth",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "padding",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "gridGap",
					Facultatif: !0
				}
			]
		}), xxShowRoomContainer.AjouterElementShowroom({
			typeElement: xxImageTabByte,
			NomElement: "xxImageTabByte",
			Description: "Permet d'afficher une image en base64",
			Groupe: ExxShowRoomContaineGoupeElement.xxElement,
			RenderTooltip: async () => new xxImageTabByte({
				tabByte: xxShowRoomSample$1.imageBase64(),
				typeAffichage: enumTypeImage.domImage
			}),
			renderElement: (e) => new xxImageTabByte(e),
			listOption: [
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "class",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "tabByte",
					Facultatif: !1,
					ValeurDefaut: xxShowRoomSample$1.imageBase64()
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Enum,
					EnumType: "enumTypeImage",
					NameOption: "typeAffichage",
					ValeurDefaut: enumTypeImage.domImage,
					Facultatif: !1
				}
			]
		}), xxShowRoomContainer.AjouterElementShowroom({
			typeElement: xxIMC,
			NomElement: "xxIMC",
			Description: "Permet d'avoir la signification d'un IMC",
			Groupe: ExxShowRoomContaineGoupeElement.xxElement,
			RenderTooltip: async () => new xxIMC({ value: 20 }),
			renderElement: (e) => new xxIMC(e),
			listOption: [
				{
					TypeOption: ExxShowRoomContainerTypeOption.Number,
					NameOption: "value",
					Facultatif: !1,
					ValeurDefaut: 20
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "class",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "id",
					Facultatif: !0
				}
			]
		}), xxShowRoomContainer.AjouterElementShowroom({
			typeElement: xxIndicateur,
			NomElement: "xxIndicateur",
			Description: "Indique une notification sur un xElement",
			Groupe: ExxShowRoomContaineGoupeElement.xxElement,
			RenderTooltip: async () => new xxIndicateur({
				indicateur: new IconeCs3i(enumIconeCs3i.action_envoi_message),
				Notif: [{
					NotifColor: EnumXxIndicateurNotifColor.Bleu,
					nbNotif: 3
				}]
			}),
			renderElement: (e) => new xxIndicateur(e),
			listOption: [
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "class",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "id",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.TexteLocalisable,
					NameOptionLocalisable: "titleLocalise",
					NameOptionVariable: "titleVariable"
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "NotifAlwaysShow",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "NotifHideAlwaysTakePlace",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "tooltipIsContentLoadOnShow",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "click",
					Facultatif: !0,
					Function: (e) => {
						e();
					}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "tooltipOnHide",
					Facultatif: !0,
					Function: (e) => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "tooltipOnShow",
					Facultatif: !0,
					Function: (e) => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "TooltipStopPropagation",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.TexteLocalisable,
					NameOptionLocalisable: "tooltipTitreHeaderLocalise",
					NameOptionVariable: "tooltipTitreHeaderVariable",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.iXElement,
					NameOption: "indicateur"
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.iXElement,
					NameOption: "toolTipContent",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.ListeSousInterface,
					NameOption: "Notif",
					Facultatif: !0,
					listOption: [
						{
							TypeOption: ExxShowRoomContainerTypeOption.Enum,
							NameOption: "NotifColor",
							EnumType: "EnumXxIndicateurNotifColor",
							ValeurDefaut: EnumXxIndicateurNotifColor.Bleu,
							Facultatif: !0
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.Number,
							NameOption: "nbNotif",
							Facultatif: !0
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.Texte,
							NameOption: "Caractere",
							Facultatif: !0
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.TexteLocalisable,
							NameOptionLocalisable: "NotifTitleLocalise",
							NameOptionVariable: "NotifTitleVariable",
							Facultatif: !0
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.iXElement,
							NameOption: "NotifTitleToolTipContent",
							Facultatif: !0
						}
					]
				}
			]
		}), xxShowRoomContainer.AjouterElementShowroom({
			typeElement: xxInputIntellisense,
			NomElement: "xxInputIntellisense",
			Description: "Pré-remplit les champs de saisie",
			Groupe: ExxShowRoomContaineGoupeElement.xxElement,
			RenderTooltip: async () => new xxInputIntellisense({
				listeAutoComplete: [
					"test",
					"fefe",
					"maxime"
				],
				nbLigneAfficher: 2
			}),
			renderElement: (e) => new xxInputIntellisense(e),
			listOption: [
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "class",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "id",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Number,
					NameOption: "nbLigneAfficher",
					Facultatif: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "autoChange",
					Facultatif: !1,
					ValeurDefaut: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Enum,
					EnumType: "enumBackgroundInput",
					NameOption: "background",
					ValeurDefaut: enumBackgroundInput.Transparent,
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "click",
					Facultatif: !0,
					Function: (e) => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "disabled",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "KeyUpCancelCallback",
					Facultatif: !0,
					Function: () => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "KeyUpEnterCallback",
					Facultatif: !0,
					Function: (e) => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Number,
					Facultatif: !0,
					NameOption: "longueurMaxi"
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "multiline",
					Facultatif: !0,
					ValeurDefaut: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "name",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "onLostfocusCallback",
					Facultatif: !0,
					Function: (e) => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "password",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.TexteLocalisable,
					NameOptionLocalisable: "placeHolderLocalise",
					NameOptionVariable: "placeHolderVariable",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "rounded",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Enum,
					NameOption: "style",
					EnumType: "enumStyleInput",
					ValeurDefaut: enumStyleInput.Simple,
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Number,
					NameOption: "tabindex",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "value",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "ValueChange",
					Function: (e) => {},
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Donnees,
					NameOption: "listeAutoComplete",
					DataType: ExxShowRoomContaineDataType.string,
					ValeurDefaut: [xxShowRoomSample$1.listeStrings()[0]]
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.SousInterface,
					NameOption: "numeric",
					Facultatif: !0,
					listOption: [
						{
							TypeOption: ExxShowRoomContainerTypeOption.Boolean,
							NameOption: "plus",
							Facultatif: !0,
							ValeurDefaut: !1
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.Boolean,
							NameOption: "minus",
							Facultatif: !0,
							ValeurDefaut: !1
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.Boolean,
							NameOption: "decimalSeparator",
							Facultatif: !0,
							ValeurDefaut: !1
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.Number,
							NameOption: "nbDigits",
							Facultatif: !0
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.Number,
							NameOption: "nbDecimal",
							Facultatif: !0
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.Number,
							NameOption: "max",
							Facultatif: !0
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.Number,
							NameOption: "min",
							Facultatif: !0
						}
					]
				}
			]
		}), xxShowRoomContainer.AjouterElementShowroom({
			typeElement: xxInputNumerique,
			Description: "Champ de saisie numérique only",
			NomElement: "xxInputNumerique",
			Groupe: ExxShowRoomContaineGoupeElement.xxElement,
			renderElement: (e) => new xxInputNumerique(e),
			RenderTooltip: async () => new xxInputNumerique({}),
			listOption: [
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "AfficheplusMinusButtonFleche",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "class",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "autoChange",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Enum,
					EnumType: "enumBackgroundInput",
					NameOption: "background",
					ValeurDefaut: enumBackgroundInput.Transparent
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "decimalSeparator",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "KeyUpCancelCallback",
					Facultatif: !0,
					Function: () => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "KeyUpEnterCallback",
					Facultatif: !0,
					Function: (e) => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Number,
					NameOption: "max",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Number,
					NameOption: "min",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "minus",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Number,
					NameOption: "nbDecimal",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Number,
					NameOption: "nbDigits",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "plus",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "plusMinusButton",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "rounded",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Number,
					NameOption: "value",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "ValueChange",
					Function: (e) => {},
					Facultatif: !1
				}
			]
		}), xxShowRoomContainer.AjouterElementShowroom({
			typeElement: xxInputSpeech,
			NomElement: "xxInputSpeech",
			Description: "Permet d'effectuer une reconnaissance vocale",
			Groupe: ExxShowRoomContaineGoupeElement.xxElement,
			RenderTooltip: async () => new xxInputSpeech({}),
			renderElement: (e) => new xxInputSpeech(e),
			listOption: [
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "class",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "id",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Number,
					NameOption: "nbLigneAfficher",
					Facultatif: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "autoChange",
					Facultatif: !1,
					ValeurDefaut: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Enum,
					EnumType: "enumBackgroundInput",
					NameOption: "background",
					ValeurDefaut: enumBackgroundInput.Transparent,
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "click",
					Facultatif: !0,
					Function: (e) => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "disabled",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "KeyUpCancelCallback",
					Facultatif: !0,
					Function: () => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "KeyUpEnterCallback",
					Facultatif: !0,
					Function: (e) => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Number,
					Facultatif: !0,
					NameOption: "longueurMaxi"
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "multiline",
					Facultatif: !0,
					ValeurDefaut: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "name",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "onLostfocusCallback",
					Facultatif: !0,
					Function: (e) => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "password",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.TexteLocalisable,
					NameOptionLocalisable: "placeHolderLocalise",
					NameOptionVariable: "placeHolderVariable",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "rounded",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Enum,
					NameOption: "style",
					EnumType: "enumStyleInput",
					ValeurDefaut: enumStyleInput.Simple,
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Number,
					NameOption: "tabindex",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "value",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "ValueChange",
					Function: (e) => {},
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.SousInterface,
					NameOption: "numeric",
					Facultatif: !0,
					listOption: [
						{
							TypeOption: ExxShowRoomContainerTypeOption.Boolean,
							NameOption: "plus",
							Facultatif: !0,
							ValeurDefaut: !1
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.Boolean,
							NameOption: "minus",
							Facultatif: !0,
							ValeurDefaut: !1
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.Boolean,
							NameOption: "decimalSeparator",
							Facultatif: !0,
							ValeurDefaut: !1
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.Number,
							NameOption: "nbDigits",
							Facultatif: !0
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.Number,
							NameOption: "nbDecimal",
							Facultatif: !0
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.Number,
							NameOption: "max",
							Facultatif: !0
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.Number,
							NameOption: "min",
							Facultatif: !0
						}
					]
				}
			]
		}), xxShowRoomContainer.AjouterElementShowroom({
			typeElement: xxInputUploadImage,
			NomElement: "xxInputUploadImage",
			Description: "Permet d'uploader une image",
			Groupe: ExxShowRoomContaineGoupeElement.xxElement,
			RenderTooltip: async () => new xxInputUploadImage({ ValueChange: (e) => {} }),
			renderElement: (e) => new xxInputUploadImage(e),
			listOption: [
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "ValueChange",
					Facultatif: !1,
					Function: (e) => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "class",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "id",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "click",
					Facultatif: !0,
					Function: (e) => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "name",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Number,
					NameOption: "tabIndex",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.TexteLocalisable,
					NameOptionLocalisable: "textLocalise",
					NameOptionVariable: "textVariable",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Number,
					NameOption: "widthMax",
					Facultatif: !0
				}
			]
		}), xxShowRoomContainer.AjouterElementShowroom({
			typeElement: xxLabel,
			NomElement: "xxLabel",
			Description: "Affiche un texte formaté",
			Groupe: ExxShowRoomContaineGoupeElement.xxElement,
			RenderTooltip: async () => new xxLabel({ textVariable: "Sample Label" }),
			renderElement: (e) => new xxLabel(e),
			listOption: [
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "class",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "id",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.TexteLocalisable,
					NameOptionLocalisable: "textLocalise",
					NameOptionVariable: "textVariable",
					Facultatif: !1,
					ValeurDefaut: "Sample Label"
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.TexteLocalisable,
					NameOptionLocalisable: "titleLocalise",
					NameOptionVariable: "titleVariable",
					Facultatif: !0,
					ValeurDefaut: "Sample title Label"
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "centrer",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "espaceMinimaliste",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Enum,
					EnumType: "enumHabillageLabel",
					NameOption: "habillage",
					ValeurDefaut: enumHabillageLabel.standard,
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Icone,
					NameOption: "icone",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "lineBreak",
					Facultatif: !0,
					ValeurDefaut: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Enum,
					EnumType: "enumMiseEnFormeLabel",
					NameOption: "miseEnForme",
					ValeurDefaut: enumMiseEnFormeLabel.standard,
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "police",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Number,
					NameOption: "tabindex",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Number,
					NameOption: "taillePolice",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Enum,
					EnumType: "enumTypeLabel",
					NameOption: "type",
					ValeurDefaut: enumTypeLabel.standard,
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.SousInterface,
					NameOption: "lien",
					Facultatif: !0,
					listOption: [
						{
							TypeOption: ExxShowRoomContainerTypeOption.Enum,
							EnumType: "enumTypeOuvertureHref",
							NameOption: "typeOuverture",
							ValeurDefaut: enumTypeOuvertureHref.MemeEmplacement,
							Facultatif: !0
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.Texte,
							NameOption: "url",
							Facultatif: !0
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.Texte,
							NameOption: "class",
							Facultatif: !0
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.Texte,
							NameOption: "id",
							Facultatif: !0
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.Function,
							NameOption: "click",
							Facultatif: !0,
							Function: (e) => {}
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.Texte,
							NameOption: "name",
							Facultatif: !0
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.Number,
							NameOption: "tabindex",
							Facultatif: !0
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.TexteLocalisable,
							NameOptionLocalisable: "textLocalise",
							NameOptionVariable: "textVariable",
							Facultatif: !0
						}
					]
				}
			]
		}), xxShowRoomContainer.AjouterElementShowroom({
			typeElement: xxLabelContainer,
			NomElement: "xxLabelContainer",
			Description: "Permet d'ajouter un label avec un autre élément à côté",
			Groupe: ExxShowRoomContaineGoupeElement.xxElement,
			RenderTooltip: async () => new xxLabelContainer({
				initContent: new IconeCs3i(enumIconeCs3i.action_envoi_message),
				textVariable: "Sample Label Container"
			}),
			renderElement: (e) => new xxLabelContainer(e),
			listOption: [
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "class",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "id",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.TexteLocalisable,
					NameOptionLocalisable: "textLocalise",
					NameOptionVariable: "textVariable",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "inverserLabel",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "inverserLabelDom",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "justifieAGauche",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "labelLargeurLibre",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "lineBreak",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Number,
					NameOption: "taillePolice",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Enum,
					EnumType: "enumTypeLabel",
					NameOption: "type",
					ValeurDefaut: enumTypeLabel.standard,
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Enum,
					EnumType: "enumHabillageLabel",
					NameOption: "habillage",
					ValeurDefaut: enumHabillageLabel.standard,
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Enum,
					EnumType: "enumTypeOrientation",
					NameOption: "typeOrientation",
					ValeurDefaut: enumTypeOrientation.horizontal,
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.iXElement,
					NameOption: "InitContent",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.SousInterface,
					NameOption: "optionsAffichage",
					listOption: xxShowRoomOptionRecurrente.get_OptionsAffichage([{
						TypeOption: ExxShowRoomContainerTypeOption.Enum,
						NameOption: "justificationDuContenu",
						EnumType: "enumJustificationDuContenu",
						ValeurDefaut: enumJustificationDuContenu.centre,
						Facultatif: !0
					}, {
						TypeOption: ExxShowRoomContainerTypeOption.Enum,
						NameOption: "positionDuContenu",
						EnumType: "enumPositionDuContenu",
						ValeurDefaut: enumPositionDuContenu.gauche,
						Facultatif: !0
					}]),
					Facultatif: !0
				}
			]
		}), xxShowRoomContainer.AjouterElementShowroom({
			typeElement: xxLabelDateModifiable,
			NomElement: "xxLabelDateModifiable",
			Description: "Permet de modifier une date",
			Groupe: ExxShowRoomContaineGoupeElement.xxElement,
			RenderTooltip: async () => new xxLabelDateModifiable({ change: () => {} }),
			renderElement: (e) => new xxLabelDateModifiable(e),
			listOption: [
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "change",
					Facultatif: !1,
					Function: (e) => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "class",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "id",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "CanSelectDateNull",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "libelleLabelSiVide",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "testValidInput",
					Facultatif: !0,
					Function: (e) => (DateSerialisable.CompareDate(e, DateSerialisable.NowWithoutTime()), !0)
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "testValidInputAsync",
					Facultatif: !0,
					Function: async (e) => (DateSerialisable.CompareDate(e, DateSerialisable.NowWithoutTime()), !0)
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "texteLocaliseInvalideInput",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Enum,
					EnumType: "enumTypeLabel",
					NameOption: "type",
					ValeurDefaut: enumTypeLabel.standard,
					Facultatif: !0
				}
			]
		}), xxShowRoomContainer.AjouterElementShowroom({
			typeElement: xxLabelModifiable,
			NomElement: "xxLabelModifiable",
			Description: "Texte pouvant être modifié",
			Groupe: ExxShowRoomContaineGoupeElement.xxElement,
			RenderTooltip: async () => new xxLabelModifiable({ textVariable: "Sample Label Modifiable" }),
			renderElement: (e) => new xxLabelModifiable(e),
			listOption: [
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "class",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "id",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "textVariable",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "multiline",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "change",
					Facultatif: !0,
					Function: (e) => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "libelleLabelSiVide",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Number,
					NameOption: "longueurMaxi",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "testValidInput",
					Facultatif: !0,
					Function: (e) => (DateSerialisable.CompareDate(e, DateSerialisable.NowWithoutTime()), !0)
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "testValidInputAsync",
					Facultatif: !0,
					Function: async (e) => (DateSerialisable.CompareDate(e, DateSerialisable.NowWithoutTime()), !0)
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Enum,
					EnumType: "enumTypeLabel",
					NameOption: "type",
					ValeurDefaut: enumTypeLabel.standard,
					Facultatif: !0
				}
			]
		}), xxShowRoomContainer.AjouterElementShowroom({
			typeElement: xxLabelTimeModifiable,
			NomElement: "xxLabelTimeModifiable",
			Description: "Crée une heure modifiable",
			Groupe: ExxShowRoomContaineGoupeElement.xxElement,
			RenderTooltip: async () => new xxLabelTimeModifiable({
				change: () => {},
				textVariable: "hello"
			}),
			renderElement: (e) => new xxLabelTimeModifiable(e),
			listOption: [
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "class",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "id",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "textVariable",
					Facultatif: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "change",
					Facultatif: !1,
					Function: (e) => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Enum,
					EnumType: "enumTypeLabel",
					NameOption: "type",
					ValeurDefaut: enumTypeLabel.standard,
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "libelleLabelSiVide",
					Facultatif: !0
				}
			]
		}), xxShowRoomContainer.AjouterElementShowroom({
			typeElement: xxLecteurAudio,
			NomElement: "xxLecteurAudio",
			Description: "Insère une zone de lecture audio",
			Groupe: ExxShowRoomContaineGoupeElement.xxElement,
			RenderTooltip: async () => new xxLecteurAudio({}),
			renderElement: (e) => new xxLecteurAudio(e),
			listOption: [
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "audio",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "class",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "id",
					Facultatif: !0
				}
			]
		}), xxShowRoomContainer.AjouterElementShowroom({
			typeElement: xxLecteurCarteMagnetique,
			NomElement: "xxLecteurCarteMagnetique",
			Description: "Permet d'effectuer une lecture d'une carte magnétique",
			Groupe: ExxShowRoomContaineGoupeElement.xxElement,
			RenderTooltip: async () => new xxLecteurCarteMagnetique({ callbackScan: () => {} }),
			renderElement: (e) => new xxLecteurCarteMagnetique(e),
			listOption: [{
				TypeOption: ExxShowRoomContainerTypeOption.Function,
				NameOption: "callbackScan",
				Facultatif: !1,
				Function: (e) => {}
			}]
		}), xxShowRoomContainer.AjouterElementShowroom({
			typeElement: xxLinker,
			NomElement: "xxLinker",
			Description: "Lien direct vers une page",
			Groupe: ExxShowRoomContaineGoupeElement.xxElement,
			RenderTooltip: async () => new xxLinker({
				routeur: new xxRouteContainer({
					desktopMenuEnabled: !0,
					createInternalUrl: (e) => e,
					createExternalUrl: (e) => e,
					isFavori: (e) => Promise.resolve(!1),
					createMenuCustom: (e) => {},
					toggleFavori: async (e, t) => {}
				}),
				renderLienTheorique: null
			}),
			renderElement: (e) => new xxLinker(e),
			listOption: [
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "desktopMenuEnabled",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "createInternalUrl",
					Facultatif: !1,
					Function: (e) => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "createExternalUrl",
					Facultatif: !1,
					Function: (e) => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "isFavori",
					Facultatif: !1,
					Function: (e) => Promise.resolve(!1)
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "createMenuCustom",
					Facultatif: !0,
					Function: (e) => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "toggleFavori",
					Facultatif: !1,
					Function: async (e, t) => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "renderLienTheorique",
					Facultatif: !1,
					Function: () => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Icone,
					NameOption: "icone",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.TexteLocalisable,
					NameOptionLocalisable: "textLocalise",
					NameOptionVariable: "textVariable",
					Facultatif: !0
				}
			]
		}), xxShowRoomContainer.AjouterElementShowroom({
			typeElement: xxListCheckBox,
			NomElement: "xxListCheckBox<T>",
			Description: "Permet de faire une liste de cases à cocher",
			Groupe: ExxShowRoomContaineGoupeElement.xxElement,
			RenderTooltip: async () => new xxListCheckBox({
				data: xxShowRoomSample$1.listeStrings(),
				renderItem: function(e, t) {
					e.append(new xxLabel({ textVariable: t }));
				},
				renderTitre: function(e) {
					e.append(new xxLabel({
						textVariable: "Ingrédients",
						type: enumTypeLabel.titre,
						class: "titre"
					}));
				},
				valueChange: function(e) {},
				withTous: !0,
				typeOrientation: enumTypeOrientation.vertical
			}),
			renderElement: (e) => (e.data = xxShowRoomSample$1.listeStrings(), new xxListCheckBox(e)),
			listOption: [
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "class",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "id",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "renderItem",
					Facultatif: !1,
					Function: (e, t) => {
						e.append(new xxLabel({ textVariable: t }));
					}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "renderTitre",
					Facultatif: !1,
					Function: (e) => {
						e.append(new xxLabel({ textVariable: "Liste des aliments" }));
					}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "valueChange",
					Facultatif: !1,
					Function: (e) => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "withTous",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "getId",
					Facultatif: !0,
					Function: (e) => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "itemChecked",
					Facultatif: !0,
					Function: (e, t) => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Enum,
					NameOption: "enumTypeOrientation",
					Facultatif: !0,
					EnumType: "enumTypeOrientation",
					ValeurDefaut: enumTypeOrientation.vertical
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Donnees,
					NameOption: "data",
					DataType: ExxShowRoomContaineDataType.CustomObjet
				}
			]
		}), xxShowRoomContainer.AjouterElementShowroom({
			typeElement: xxRecorder,
			NomElement: "xxRecorder",
			Description: "Permet d'enregistrer sa voix",
			Groupe: ExxShowRoomContaineGoupeElement.xxElement,
			RenderTooltip: async () => new xxRecorder({}),
			renderElement: (e) => new xxRecorder(e),
			listOption: [
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "class",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "id",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "valueChange",
					Facultatif: !0,
					Function: (e) => {}
				}
			]
		}), xxShowRoomContainer.AjouterElementShowroom({
			typeElement: xxListChoix,
			Description: "Permet de créer une liste déroulante de choix",
			NomElement: "xxListChoix",
			Groupe: ExxShowRoomContaineGoupeElement.xxElement,
			RenderTooltip: async () => new xxListChoix({}),
			renderElement: (e) => (e.listeValeurs = xxShowRoomSample$1.listeCleValeurs(), new xxListChoix(e)),
			listOption: [
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "class",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "id",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "asyncLoading",
					Facultatif: !0,
					Function: async (e, t) => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "change",
					Facultatif: !0,
					Function: (e) => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "click",
					Facultatif: !0,
					Function: (e) => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Icone,
					NameOption: "icone",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "name",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					Facultatif: !0,
					NameOption: "onClose",
					Function: () => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "optionTous",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Number,
					NameOption: "tabindex",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "valueDefault",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Donnees,
					NameOption: "listeValeurs",
					DataType: ExxShowRoomContaineDataType.CleValeur,
					Facultatif: !0,
					ValeurSample: xxShowRoomSample$1.listeCleValeurs()
				}
			]
		}), xxShowRoomContainer.AjouterElementShowroom({
			typeElement: xxListeChoixLang,
			NomElement: "xxListeChoixLang",
			Description: "Permet de choisir la langue",
			Groupe: ExxShowRoomContaineGoupeElement.xxElement,
			RenderTooltip: async () => new xxListeChoixLang({
				defaultValue: "fr",
				selected: (e) => {}
			}),
			renderElement: (e) => new xxListeChoixLang(e),
			listOption: [
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "defaultValue",
					Facultatif: !1,
					ValeurDefaut: "fr"
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Donnees,
					NameOption: "",
					DataType: ExxShowRoomContaineDataType.string,
					Facultatif: !0,
					ValeurSample: [
						"fr",
						"de",
						"en",
						"es",
						"ca"
					]
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "selected",
					Facultatif: !1,
					Function: (e) => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "renderSelectedClass",
					Facultatif: !0
				}
			]
		}), xxShowRoomContainer.AjouterElementShowroom({
			typeElement: xxListeDeroulante,
			NomElement: "xxListeDeroulante<T>",
			Description: "Permet de créer une liste déroulante de valeurs",
			Groupe: ExxShowRoomContaineGoupeElement.xxElement,
			RenderTooltip: async () => new xxListeDeroulante({
				donnees: xxShowRoomSample$1.listeStrings(),
				renderSelected: (e, t, n) => {
					e.append(new xxBouton({
						titleVariable: "Change moi",
						click: (e) => {
							xOutils.afficherMessageAlertifyLog("Click"), e();
						},
						textVariable: "Change moi"
					}));
				},
				renderSelectItem: (e, t, n) => {},
				selected: (e) => {}
			}),
			renderElement: (e) => new xxListeDeroulante(e),
			listOption: [
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "class",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "id",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "equals",
					Facultatif: !0,
					Function: (e, t) => e.localeCompare(t)
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "getId",
					Facultatif: !0,
					Function: (e) => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "justifieAGauche",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "nonResponsive",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "onClose",
					Facultatif: !0,
					Function: () => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "onShow",
					Facultatif: !0,
					Function: () => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "readOnly",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "renderEndList",
					Facultatif: !0,
					Function: (e, t) => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "renderReadOnly",
					Facultatif: !0,
					Function: (e, t) => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "retourALaLigne",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.TexteLocalisable,
					NameOptionLocalisable: "textLocaliseMobile",
					NameOptionVariable: "textVariableMobile",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Donnees,
					DataType: ExxShowRoomContaineDataType.CustomObjet,
					NameOption: "donnees"
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.SousInterface,
					NameOption: "groupeGlobal",
					Facultatif: !0,
					listOption: [{
						TypeOption: ExxShowRoomContainerTypeOption.Function,
						NameOption: "groupHeaderCustom",
						Facultatif: !0,
						Function: (e) => {}
					}, {
						TypeOption: ExxShowRoomContainerTypeOption.Function,
						NameOption: "groupHeaderCustom",
						Facultatif: !0,
						Function: (e) => {}
					}]
				}
			]
		}), xxShowRoomContainer.AjouterElementShowroom({
			typeElement: xxListeDeroulanteAutomatique,
			NomElement: "xxListeDeroulanteAutomatique",
			Description: "Permet de créer une liste automatique",
			Groupe: ExxShowRoomContaineGoupeElement.xxElement,
			IsNotFunctionnal: !0,
			RenderTooltip: async () => new xxListeDeroulanteAutomatique({
				data: xxShowRoomSample$1.listeStrings(),
				libelle: "test",
				renderSelected: () => {},
				valeurSaisie: (e) => {}
			}),
			renderElement: (e) => new xxListeDeroulanteAutomatique(e),
			listOption: [
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "libelle",
					Facultatif: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "renderSelected",
					Facultatif: !1,
					Function: () => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "valeurSaisie",
					Facultatif: !1,
					Function: (e) => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Number,
					NameOption: "nbElemMaxBouttonsRadio",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "versionMobile",
					Facultatif: !0,
					ValeurDefaut: !1
				}
			]
		}), xxShowRoomContainer.AjouterElementShowroom({
			typeElement: xxListeDeroulanteSimpleNePlusUtiliser,
			NomElement: "xxListeDeroulanteSimpleNePlusUtiliser",
			Description: "Permettait de créer une liste déroulante",
			Groupe: ExxShowRoomContaineGoupeElement.deprecated_DontUse,
			RenderTooltip: async () => new xxListeDeroulanteSimpleNePlusUtiliser({
				defaultKeyValue: "Hello",
				donnees: xxShowRoomSample$1.listeStrings(),
				getKey: (e) => e,
				getLibelle: (e) => e,
				selected: (e) => {}
			}),
			renderElement: (e) => new xxListeDeroulanteSimpleNePlusUtiliser(e),
			listOption: [
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "class",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "defaultKeyValue",
					Facultatif: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "getKey",
					Facultatif: !1,
					Function: (e) => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "getLibelle",
					Facultatif: !1,
					Function: (e) => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "selected",
					Facultatif: !1,
					Function: (e) => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "getIcone",
					Facultatif: !0,
					Function: (e) => {}
				}
			]
		}), xxShowRoomContainer.AjouterElementShowroom({
			typeElement: xxListeSelection,
			NomElement: "xxListeSelection",
			Description: "Permet de faire une liste à plusieurs sélections",
			Groupe: ExxShowRoomContaineGoupeElement.xxElement,
			RenderTooltip: async () => new xxListeSelection({
				binding: null,
				DonneeCompleteAsync: new Promise((e) => {
					e(xxShowRoomSample$1.listeStrings());
				}),
				DonneeComplete: xxShowRoomSample$1.listeStrings(),
				DonneeSelectionnees: xxShowRoomSample$1.listeStrings(),
				RenderItemListeComplete: () => {},
				RenderItemListeSelectionee: () => {}
			}),
			renderElement: (e) => new xxListeSelection(e),
			listOption: []
		}), xxShowRoomContainer.AjouterElementShowroom({
			typeElement: xxListWrapper,
			NomElement: "xxListWrapper<T>",
			Description: "Permet de faire une liste au typage dynamique",
			Groupe: ExxShowRoomContaineGoupeElement.xxElement,
			RenderTooltip: async () => new xxListWrapper({
				donnees: xxShowRoomSample$1.listeCustom(),
				renderItem: (e, t) => {
					e.append(new xxLabel({ textVariable: t.toString() }));
				}
			}),
			renderElement: (e) => new xxListWrapper(e),
			listOption: [
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "class",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "id",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "renderItem",
					Facultatif: !1,
					Function: (e, t, n) => {
						e.append(new xxLabel({ textVariable: t.toString() }));
					}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Donnees,
					NameOption: "donnees",
					Facultatif: !1,
					DataType: ExxShowRoomContaineDataType.CustomObjet
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "equals",
					Facultatif: !0,
					Function: (e, t) => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "getId",
					Facultatif: !0,
					Function: (e) => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "greaterThan",
					Facultatif: !0,
					Function: (e, t) => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "horizontal",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "LibelleSiVide",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "limite",
					Facultatif: !0,
					ValeurDefaut: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Enum,
					ValeurDefaut: enumTypeTri.aucun,
					EnumType: "enumTypeTri",
					NameOption: "sort",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "unique",
					Facultatif: !0,
					ValeurDefaut: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "espaceMinimaliste",
					Facultatif: !0,
					ValeurDefaut: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.SousInterface,
					NameOption: "groupeGlobal",
					Facultatif: !0,
					description: "Groupe par fracturation (pas de modification de l'ordre des données)",
					listOption: [
						{
							TypeOption: ExxShowRoomContainerTypeOption.Function,
							NameOption: "group",
							Function: (e, t, n) => {
								e.append(new xxLabel({
									textVariable: t.couleur,
									type: enumTypeLabel.important
								}));
							}
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.Function,
							NameOption: "greaterThan",
							Facultatif: !0,
							Function: (e, t) => e.couleur != t.couleur
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.Function,
							NameOption: "greaterThanGeneric",
							Facultatif: !0,
							Function: (e) => e.couleur
						}
					]
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.SousInterface,
					NameOption: "regroupementUniqueBy",
					Facultatif: !0,
					description: "ReGroupement sous une seule bannier (modification de l'ordre des données)",
					listOption: [{
						TypeOption: ExxShowRoomContainerTypeOption.Function,
						NameOption: "groupHeaderCustom",
						Facultatif: !0,
						Function: (e, t) => {
							e.append(new xxLabel({ textVariable: t[0].Group + " - " + t.length }));
						}
					}, {
						TypeOption: ExxShowRoomContainerTypeOption.Function,
						NameOption: "GroupBy",
						Facultatif: !0,
						Function: (e) => e.Group
					}]
				}
			]
		}), xxShowRoomContainer.AjouterElementShowroom({
			typeElement: xxMenu,
			Description: "Permet de créer un menu",
			NomElement: "xxMenu",
			Groupe: ExxShowRoomContaineGoupeElement.xxElement,
			IsNotFunctionnal: !0,
			RenderTooltip: async () => new xxMenu({ contenu: [{
				icone: new IconeCs3i(enumIconeCs3i.action_agrandir_horizontal),
				libelle: "test",
				items: null
			}] }),
			renderElement: (e) => new xxMenu(e),
			listOption: [
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "activerRecherche",
					Facultatif: !0,
					ValeurDefaut: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "selectFirstLigne",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "toutDeplie",
					Facultatif: !0,
					ValeurDefaut: !1
				}
			]
		}), xxShowRoomContainer.AjouterElementShowroom({
			typeElement: xxNavOngletControl,
			Description: "Permet de créer une barre de navigation a onglet",
			NomElement: "xxNavOngletControl",
			Groupe: ExxShowRoomContaineGoupeElement.xxElement,
			RenderTooltip: async () => new xxNavOngletControl({ initOnglets: [
				{
					textVariable: "Onglet 1",
					isOngletPreselected: !0,
					color: "#AFFFE0",
					GenerateContent: () => xxShowRoomSample$1.divSample(0)
				},
				{
					textVariable: "Onglet 2",
					color: "#20FF37",
					GenerateContent: () => xxShowRoomSample$1.divSample(1)
				},
				{
					textVariable: "Onglet 3",
					GenerateContent: () => xxShowRoomSample$1.divSample(2)
				},
				{
					textVariable: "Onglet 4",
					color: "#FACFAC",
					GenerateContent: () => xxShowRoomSample$1.divSample(0)
				}
			] }),
			renderElement: (e) => new xxNavOngletControl(e),
			listOption: [
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "id",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "class",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					description: "Permet d'afficher au survole les sous-onglets de l'onglet survolé",
					NameOption: "WithSousOngletTooltip",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					description: "Permet de reduire l'affichage de l'arboresence des sous-onglets",
					NameOption: "CanReduireSousOnglet",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.ListeSousInterface,
					NameOption: "initOnglets",
					Facultatif: !0,
					listOption: xxShowRoomOptionRecurrente.get_OptionsXxNavOngletItem()
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.iXElement,
					NameOption: "initZoneAvantOnglet",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.iXElement,
					NameOption: "initZoneApresOnglet",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "OnOngletChange",
					Facultatif: !0,
					Function: (e) => {
						xOutils.afficherMessageAlertifyLog("Coucou");
					}
				}
			]
		}), xxShowRoomContainer.AjouterElementShowroom({
			typeElement: xxPageWrapper,
			NomElement: "xxPageWrapper",
			Description: "Permet de créer une page",
			Groupe: ExxShowRoomContaineGoupeElement.xxElement,
			RenderTooltip: async () => new xxPageWrapper({ titleLocalise: "samplePage" }),
			renderElement: (e) => new xxPageWrapper(e),
			listOption: [
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "titleLocalise",
					Facultatif: !1,
					ValeurDefaut: "Change moi"
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "class",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "id",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Enum,
					EnumType: "enumAlignementZone",
					NameOption: "alignementFooter",
					Facultatif: !0,
					ValeurDefaut: enumAlignementZone.gauche
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Enum,
					EnumType: "enumAlignementZone",
					NameOption: "alignementHeader",
					Facultatif: !0,
					ValeurDefaut: enumAlignementZone.gauche
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "centrerContenu",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "classBody",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Icone,
					NameOption: "icone",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "scrollableHeader",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "withFooter",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "withHeader",
					Facultatif: !0,
					ValeurDefaut: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "withPreHeader",
					Facultatif: !0,
					ValeurDefaut: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.ListeiXElement,
					NameOption: "initContent",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.ListeiXElement,
					NameOption: "initContentFooter",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.ListeiXElement,
					NameOption: "initContentHeader",
					Facultatif: !0
				}
			]
		}), xxShowRoomContainer.AjouterElementShowroom({
			typeElement: xxPlanneur,
			NomElement: "xxPlanneur",
			Description: "Permet de faire un planning",
			Groupe: ExxShowRoomContaineGoupeElement.xxElement,
			IsNotFunctionnal: !0,
			RenderTooltip: async () => new xxPlanneur({
				dateDebut: DateSerialisable.Now(),
				displayRdv: () => {},
				listeRessources: [],
				nbJours: 4,
				selectRessource: () => {}
			}),
			renderElement: (e) => new xxPlanneur(e),
			listOption: [
				{
					TypeOption: ExxShowRoomContainerTypeOption.Date,
					NameOption: "dateDebut",
					Facultatif: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "displayRdv",
					Facultatif: !1,
					Function: (e, t) => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Number,
					NameOption: "nbJours",
					Facultatif: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "selectRessource",
					Facultatif: !1,
					Function: (e) => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "displayRessource",
					Facultatif: !0,
					Function: (e, t) => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "ligneMouseClick",
					Facultatif: !0,
					Function: (e, t) => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "ligneMouseOut",
					Facultatif: !0,
					Function: (e, t) => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "ligneMouseOver",
					Facultatif: !0,
					Function: (e, t) => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "ligneMouseOver",
					Facultatif: !0,
					Function: (e, t) => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "renderClassBloc",
					Facultatif: !0,
					Function: (e) => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "renderDateColonne",
					Facultatif: !1,
					Function: (e, t) => {}
				}
			]
		}), xxShowRoomContainer.AjouterElementShowroom({
			typeElement: xxPlanning,
			NomElement: "xxPlanning",
			Description: "Permet de creer un planning",
			Groupe: ExxShowRoomContaineGoupeElement.xxElement,
			RenderTooltip: async () => {
				let e = [], t = [];
				return t.push(new PlanningDisponibilite("", "", DateSerialisable.Factory(/* @__PURE__ */ new Date("10/02/2020 08:00")), DateSerialisable.Factory(/* @__PURE__ */ new Date("10/02/2020 12:00")), "", enumTypeDispo.Planning)), t.push(new PlanningDisponibilite("", "", DateSerialisable.Factory(/* @__PURE__ */ new Date("10/03/2020 08:00")), DateSerialisable.Factory(/* @__PURE__ */ new Date("10/03/2020 12:00")), "", enumTypeDispo.Planning)), t.push(new PlanningDisponibilite("", "", DateSerialisable.Factory(/* @__PURE__ */ new Date("10/04/2020 08:00")), DateSerialisable.Factory(/* @__PURE__ */ new Date("10/04/2020 12:00")), "", enumTypeDispo.Planning)), t.push(new PlanningDisponibilite("Barre 1", "1", DateSerialisable.Factory(/* @__PURE__ */ new Date("10/02/2020 08:00")), DateSerialisable.Factory(/* @__PURE__ */ new Date("10/02/2020 10:00")), "#B0FFED", enumTypeDispo.Barre)), t.push(new PlanningDisponibilite("Barre 1(bis)", "2", DateSerialisable.Factory(/* @__PURE__ */ new Date("10/02/2020 09:00")), DateSerialisable.Factory(/* @__PURE__ */ new Date("10/02/2020 11:00")), "#A3D7FF", enumTypeDispo.Barre)), t.push(new PlanningDisponibilite("Barre 2", "", DateSerialisable.Factory(/* @__PURE__ */ new Date("10/03/2020 08:00")), DateSerialisable.Factory(/* @__PURE__ */ new Date("10/03/2020 12:00")), "forestgreen", enumTypeDispo.Barre)), t.push(new PlanningDisponibilite("Barre 3", "", DateSerialisable.Factory(/* @__PURE__ */ new Date("10/04/2020 08:00")), DateSerialisable.Factory(/* @__PURE__ */ new Date("10/04/2020 12:00")), "coral", enumTypeDispo.Barre)), t.push(new PlanningDisponibilite("Barre 4", "", DateSerialisable.Factory(/* @__PURE__ */ new Date("10/02/2020 14:00")), DateSerialisable.Factory(/* @__PURE__ */ new Date("10/02/2020 19:00")), "cornflowerblue", enumTypeDispo.Barre)), t.push(new PlanningDisponibilite("bloc 1 col 1", "", DateSerialisable.Factory(/* @__PURE__ */ new Date("10/02/2020 09:00")), DateSerialisable.Factory(/* @__PURE__ */ new Date("10/02/2020 11:00")), "palevioletred", enumTypeDispo.Bloc, "", 1)), t.push(new PlanningDisponibilite("bloc 2 col 1", "", DateSerialisable.Factory(/* @__PURE__ */ new Date("10/02/2020 09:00")), DateSerialisable.Factory(/* @__PURE__ */ new Date("10/02/2020 11:00")), "forestgreen", enumTypeDispo.Bloc, "", 2)), t.push(new PlanningDisponibilite("bloc 1 col 2", "", DateSerialisable.Factory(/* @__PURE__ */ new Date("10/02/2020 13:00")), DateSerialisable.Factory(/* @__PURE__ */ new Date("10/02/2020 17:00")), "cornflowerblue", enumTypeDispo.Bloc, "", 1)), t.push(new PlanningDisponibilite("bloc 2 col 2", "", DateSerialisable.Factory(/* @__PURE__ */ new Date("10/02/2020 14:00")), DateSerialisable.Factory(/* @__PURE__ */ new Date("10/02/2020 18:00")), "cornflowerblue", enumTypeDispo.Bloc, "", 2)), e.push(new PlanningRdv("Libelle 1 planning 1", 1, null, null, DateSerialisable.Factory(/* @__PURE__ */ new Date("10/02/2020 09:00")), DateSerialisable.Factory(/* @__PURE__ */ new Date("10/02/2020 11:00")))), e.push(new PlanningRdv("Libelle 2 planning 1", 2, null, null, DateSerialisable.Factory(/* @__PURE__ */ new Date("10/02/2020 09:15")), DateSerialisable.Factory(/* @__PURE__ */ new Date("10/02/2020 11:35")))), e.push(new PlanningRdv("Libelle 3 planning 1", 3, null, null, DateSerialisable.Factory(/* @__PURE__ */ new Date("10/02/2020 15:00")), DateSerialisable.Factory(/* @__PURE__ */ new Date("10/02/2020 17:30")))), new xxPlanning({
					DateDebut: DateSerialisable.Factory(/* @__PURE__ */ new Date("10/02/2020")),
					Rdv: e,
					HeureDebut: 8,
					TimeLineNow: !0,
					HeureFin: 20,
					ZoomPlanning: { ZoomChoisi: 100 },
					Dispo: t,
					ClickSurDispoBarre: (e) => {},
					ClickSurEnteteColonne: (e, t) => {},
					ClickSurRdv: (e) => {}
				});
			},
			renderElement: (e) => {
				console.log(e);
				let t = [], n = [];
				n.push(new PlanningDisponibilite("", "", DateSerialisable.Factory(/* @__PURE__ */ new Date("10/02/2020 08:00")), DateSerialisable.Factory(/* @__PURE__ */ new Date("10/02/2020 12:00")), "", enumTypeDispo.Planning)), n.push(new PlanningDisponibilite("", "", DateSerialisable.Factory(/* @__PURE__ */ new Date("10/03/2020 08:00")), DateSerialisable.Factory(/* @__PURE__ */ new Date("10/03/2020 12:00")), "", enumTypeDispo.Planning)), n.push(new PlanningDisponibilite("", "", DateSerialisable.Factory(/* @__PURE__ */ new Date("10/04/2020 08:00")), DateSerialisable.Factory(/* @__PURE__ */ new Date("10/04/2020 12:00")), "", enumTypeDispo.Planning)), n.push(new PlanningDisponibilite("Barre 1", "1", DateSerialisable.Factory(/* @__PURE__ */ new Date("10/02/2020 08:00")), DateSerialisable.Factory(/* @__PURE__ */ new Date("10/02/2020 10:00")), "#B0FFED", enumTypeDispo.Barre)), n.push(new PlanningDisponibilite("Barre 1(bis)", "2", DateSerialisable.Factory(/* @__PURE__ */ new Date("10/02/2020 09:00")), DateSerialisable.Factory(/* @__PURE__ */ new Date("10/02/2020 11:00")), "#A3D7FF", enumTypeDispo.Barre)), n.push(new PlanningDisponibilite("Barre 2", "", DateSerialisable.Factory(/* @__PURE__ */ new Date("10/03/2020 08:00")), DateSerialisable.Factory(/* @__PURE__ */ new Date("10/03/2020 12:00")), "forestgreen", enumTypeDispo.Barre)), n.push(new PlanningDisponibilite("Barre 3", "", DateSerialisable.Factory(/* @__PURE__ */ new Date("10/04/2020 08:00")), DateSerialisable.Factory(/* @__PURE__ */ new Date("10/04/2020 12:00")), "coral", enumTypeDispo.Barre)), n.push(new PlanningDisponibilite("Barre 4", "", DateSerialisable.Factory(/* @__PURE__ */ new Date("10/02/2020 14:00")), DateSerialisable.Factory(/* @__PURE__ */ new Date("10/02/2020 19:00")), "cornflowerblue", enumTypeDispo.Barre)), n.push(new PlanningDisponibilite("bloc 1 col 1", "", DateSerialisable.Factory(/* @__PURE__ */ new Date("10/02/2020 09:00")), DateSerialisable.Factory(/* @__PURE__ */ new Date("10/02/2020 11:00")), "palevioletred", enumTypeDispo.Bloc, "", 1)), n.push(new PlanningDisponibilite("bloc 2 col 1", "", DateSerialisable.Factory(/* @__PURE__ */ new Date("10/02/2020 09:00")), DateSerialisable.Factory(/* @__PURE__ */ new Date("10/02/2020 11:00")), "forestgreen", enumTypeDispo.Bloc, "", 2)), n.push(new PlanningDisponibilite("bloc 1 col 2", "", DateSerialisable.Factory(/* @__PURE__ */ new Date("10/02/2020 13:00")), DateSerialisable.Factory(/* @__PURE__ */ new Date("10/02/2020 17:00")), "cornflowerblue", enumTypeDispo.Bloc, "", 1)), n.push(new PlanningDisponibilite("bloc 2 col 2", "", DateSerialisable.Factory(/* @__PURE__ */ new Date("10/02/2020 14:00")), DateSerialisable.Factory(/* @__PURE__ */ new Date("10/02/2020 18:00")), "cornflowerblue", enumTypeDispo.Bloc, "", 2)), t.push(new PlanningRdv("Libelle 1 planning 1", 1, null, null, DateSerialisable.Factory(/* @__PURE__ */ new Date("10/02/2020 09:00")), DateSerialisable.Factory(/* @__PURE__ */ new Date("10/02/2020 11:00")))), t.push(new PlanningRdv("Libelle 2 planning 1", 2, null, null, DateSerialisable.Factory(/* @__PURE__ */ new Date("10/02/2020 09:15")), DateSerialisable.Factory(/* @__PURE__ */ new Date("10/02/2020 11:35")))), t.push(new PlanningRdv("Libelle 3 planning 1", 3, null, null, DateSerialisable.Factory(/* @__PURE__ */ new Date("10/02/2020 15:00")), DateSerialisable.Factory(/* @__PURE__ */ new Date("10/02/2020 17:30"))));
				let r = {
					DateDebut: e?.DateDebut ?? DateSerialisable.Factory(/* @__PURE__ */ new Date("10/02/2020")),
					Rdv: t,
					HeureDebut: e?.HeureDebut ?? 8,
					TimeLineNow: e?.TimeLineNow ?? !1,
					HeureFin: e?.HeureFin ?? 20,
					KeyPlanning: e?.KeyPlanning,
					DayToAffiche: e?.DayToAffiche,
					typeAffichageParDefaut: e?.typeAffichageParDefaut,
					ZoomPlanning: { ZoomChoisi: 100 },
					Dispo: n,
					ClickSurDispoBarre: (e) => {},
					ClickSurEnteteColonne: (e, t) => {},
					ClickSurRdv: (e) => {}
				};
				return new xxPlanning(r);
			},
			listOption: [
				{
					TypeOption: ExxShowRoomContainerTypeOption.DateSerialisable,
					NameOption: "DateDebut",
					ValeurDefaut: DateSerialisable.Factory(/* @__PURE__ */ new Date("15/12/2022 14:45")),
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Number,
					NameOption: "HeureDebut",
					ValeurDefaut: 9,
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Number,
					NameOption: "HeureFin",
					ValeurDefaut: 22,
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "TimeLineNow",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "KeyPlanning",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Enum,
					EnumType: "EPlanningTypeAffichage",
					ValeurDefaut: EPlanningTypeAffichage.Standard,
					NameOption: "typeAffichageParDefaut",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "DaysToAffiche",
					Facultatif: !0
				}
			]
		}), xxShowRoomContainer.AjouterElementShowroom({
			typeElement: xxProgressBar,
			NomElement: "xxProgressBar",
			Description: "Permet de faire une barre de chargement",
			Groupe: ExxShowRoomContaineGoupeElement.xxElement,
			RenderTooltip: async () => new xxProgressBar({
				nbTotalElements: 5,
				titre: "ProgressBar"
			}),
			renderElement: (e) => new xxProgressBar(e),
			listOption: [
				{
					TypeOption: ExxShowRoomContainerTypeOption.Number,
					NameOption: "nbTotalElements",
					Facultatif: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "class",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "hauteur",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "largeur",
					ValeurDefaut: "144px",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.iXElement,
					NameOption: "page",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "titre",
					Facultatif: !0
				}
			]
		}), xxShowRoomContainer.AjouterElementShowroom({
			typeElement: xxQrCodeReader,
			NomElement: "xxQrCodeReader",
			Description: "Permet de lire un QR Code",
			Groupe: ExxShowRoomContaineGoupeElement.xxElement,
			RenderTooltip: async () => new xxQrCodeReader({ binding: void 0 }),
			renderElement: (e) => new xxQrCodeReader(e),
			listOption: [
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "class",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "id",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "onDetect",
					Facultatif: !0,
					Function: (e) => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "autosize",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "onError",
					Facultatif: !0,
					Function: (e) => {}
				}
			]
		}), xxShowRoomContainer.AjouterElementShowroom({
			IsNotFunctionnal: !0,
			typeElement: xxRadioButton,
			NomElement: "xxRadioButton<T>",
			Description: "Permet de créer des boutons radio",
			Groupe: ExxShowRoomContaineGoupeElement.xxElement,
			RenderTooltip: async () => new xxRadioButton({
				initElements: [{
					valeur: "Sample1",
					libelleLocalise: "Sample 1"
				}, {
					valeur: "Sample2",
					libelleLocalise: "Sample 2"
				}],
				valueChange: () => {}
			}),
			renderElement: (e) => new xxRadioButton(e),
			listOption: [
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					Facultatif: !1,
					NameOption: "valueChange",
					Function: (e) => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "class",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "id",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					Facultatif: !0,
					NameOption: "clickOnSelected",
					Function: (e, t) => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					Facultatif: !0,
					NameOption: "renderDecorator",
					Function: (e) => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "displayOnlySelected",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "FakeClickPreselectionOnInit",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "readonly",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "SelectedClassCustonGlobal",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Enum,
					ValeurDefaut: ETypeBouton.boutonClassique,
					EnumType: "ETypeBouton",
					NameOption: "typeBouton",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Enum,
					ValeurDefaut: enumTypeOrientation.horizontal,
					EnumType: "enumTypeOrientation",
					NameOption: "typeOrientation",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Enum,
					ValeurDefaut: enumTypeOrientation.horizontal,
					EnumType: "enumTypeOrientation",
					NameOption: "typeOrientationBouton",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.ListeSousInterface,
					NameOption: "initElements",
					listOption: [
						{
							TypeOption: ExxShowRoomContainerTypeOption.Texte,
							NameOption: "id",
							Facultatif: !0
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.Texte,
							NameOption: "Valeur"
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.Icone,
							NameOption: "icone",
							Facultatif: !0
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.TexteLocalisable,
							NameOptionLocalisable: "libelleLocalise",
							NameOptionVariable: "libelleVariable",
							Facultatif: !0
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.TexteLocalisable,
							NameOptionLocalisable: "titleLocalise",
							NameOptionVariable: "titleVariable",
							Facultatif: !0
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.Boolean,
							NameOption: "preselectionne",
							Facultatif: !0
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.Texte,
							NameOption: "class",
							Facultatif: !0
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.Boolean,
							NameOption: "espaceMinimaliste",
							Facultatif: !0
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.Boolean,
							NameOption: "inactif",
							Facultatif: !0
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.Texte,
							NameOption: "SelectedClassCuston",
							Facultatif: !0
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.SousInterface,
							NameOption: "optionBoutonWrapper2",
							listOption: [
								{
									TypeOption: ExxShowRoomContainerTypeOption.SousInterface,
									NameOption: "optionsAffichage",
									listOption: xxShowRoomOptionRecurrente.get_OptionsAffichage([
										{
											TypeOption: ExxShowRoomContainerTypeOption.Enum,
											NameOption: "styleBouton",
											EnumType: "enumStyleBouton",
											ValeurDefaut: enumStyleBouton.Simple,
											Facultatif: !0
										},
										{
											TypeOption: ExxShowRoomContainerTypeOption.Enum,
											NameOption: "positionnementResponsiveBouton",
											EnumType: "enumPositionnementResponsiveBouton",
											ValeurDefaut: enumPositionnementResponsiveBouton.Defaut,
											Facultatif: !0
										},
										{
											TypeOption: ExxShowRoomContainerTypeOption.Enum,
											NameOption: "tailleBouton",
											EnumType: "enumTailleBouton",
											ValeurDefaut: enumTailleBouton.M,
											Facultatif: !0
										},
										{
											TypeOption: ExxShowRoomContainerTypeOption.Enum,
											NameOption: "couleurBouton",
											EnumType: "enumCouleurBouton",
											ValeurDefaut: enumCouleurBouton.Utilisateur,
											Facultatif: !0
										},
										{
											TypeOption: ExxShowRoomContainerTypeOption.Enum,
											NameOption: "positionIconeBouton",
											EnumType: "enumPosition",
											ValeurDefaut: enumPosition.Left,
											Facultatif: !0
										},
										{
											TypeOption: ExxShowRoomContainerTypeOption.Boolean,
											NameOption: "boutonArrondi",
											ValeurDefaut: !0,
											Facultatif: !0
										}
									]),
									Facultatif: !0
								},
								{
									TypeOption: ExxShowRoomContainerTypeOption.Enum,
									NameOption: "SelectedcolorCuston",
									EnumType: "enumCouleurBouton",
									ValeurDefaut: enumCouleurBouton.Valide,
									Facultatif: !0
								},
								{
									TypeOption: ExxShowRoomContainerTypeOption.Enum,
									NameOption: "SelectedcolorCuston",
									EnumType: "enumCouleurBouton",
									ValeurDefaut: enumCouleurBouton.Blanc,
									Facultatif: !0
								},
								{
									TypeOption: ExxShowRoomContainerTypeOption.Enum,
									NameOption: "typeBouton",
									EnumType: "enumTypeBouton",
									ValeurDefaut: enumTypeBouton.Standard,
									Facultatif: !0
								}
							],
							Facultatif: !0
						}
					]
				}
			]
		}), xxShowRoomContainer.AjouterElementShowroom({
			typeElement: xxRouteContainer,
			NomElement: "xxRouteContainer",
			Description: "Menu de navigation permettant de partager des liens de n'importe quel écran",
			Groupe: ExxShowRoomContaineGoupeElement.xxElement,
			RenderTooltip: async () => new xxImageTabByte({
				tabByte: xxShowRoomImageTooltipPreview.xxRouteContainer,
				typeAffichage: enumTypeImage.domImage
			}),
			renderElement: (e) => new xxRouteContainer(e),
			listOption: [
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "createExternalUrl",
					Facultatif: !1,
					Function: (e) => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "createInternalUrl",
					Facultatif: !1,
					Function: (e) => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "isFavori",
					Facultatif: !1,
					Function: (e) => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "toogleFavori",
					Facultatif: !1,
					Function: (e, t) => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "ajouterHistoriquePersonnalise",
					Facultatif: !0,
					Function: (e) => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "createMenuCustom",
					Facultatif: !0,
					Function: (e) => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "desktopMenuEnabled",
					Facultatif: !0,
					ValeurDefaut: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "gestionBackBrowser",
					Facultatif: !0,
					ValeurDefaut: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "id",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "verboseMode",
					Facultatif: !0,
					ValeurDefaut: !1
				}
			]
		}), xxShowRoomContainer.AjouterElementShowroom({
			typeElement: xxSpecificationCreneaux,
			NomElement: "xxSpecificationCreneaux",
			Description: "Permet de définir des créneaux",
			Groupe: ExxShowRoomContaineGoupeElement.xxElement,
			RenderTooltip: async () => null,
			renderElement: (e) => new xxSpecificationCreneaux(null),
			listOption: []
		}), xxShowRoomContainer.AjouterElementShowroom({
			typeElement: xxStackPanel,
			NomElement: "xxStackPanel",
			Description: "Permet d'empiler verticalement des éléments",
			Groupe: ExxShowRoomContaineGoupeElement.xxElement,
			RenderTooltip: async () => new xxStackPanel({ initContent: [
				xxShowRoomSample$1.divSample(),
				xxShowRoomSample$1.divSample(2),
				xxShowRoomSample$1.divSample(3)
			] }),
			renderElement: (e) => new xxStackPanel(e),
			listOption: [
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "class",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "id",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "espaceMinimaliste",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.ListeiXElement,
					NameOption: "initContent",
					Facultatif: !0
				}
			]
		}), xxShowRoomContainer.AjouterElementShowroom({
			typeElement: xxTabControl,
			NomElement: "xxTabControl",
			Description: "Permet de faire des onglets",
			Groupe: ExxShowRoomContaineGoupeElement.xxElement,
			IsNotFunctionnal: !0,
			RenderTooltip: async () => new xxTabControl({ initElements: [{
				textLocalise: "Sample 1",
				addContent: (e) => {}
			}, {
				textLocalise: "Sample 2",
				addContent: (e) => {}
			}] }),
			renderElement: (e) => new xxTabControl(e),
			listOption: [
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "class",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "id",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "favoriteAutoSave",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.SousInterface,
					NameOption: "favoriteGlobalKey",
					Facultatif: !0,
					listOption: [{
						TypeOption: ExxShowRoomContainerTypeOption.Texte,
						NameOption: "cdperso",
						Facultatif: !0
					}, {
						TypeOption: ExxShowRoomContainerTypeOption.Texte,
						NameOption: "key",
						Facultatif: !0
					}]
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.SousInterface,
					NameOption: "gererGroupe",
					Facultatif: !0,
					listOption: [
						{
							TypeOption: ExxShowRoomContainerTypeOption.Function,
							NameOption: "deleteGroupe",
							Facultatif: !0,
							Function: async (e, t) => {}
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.Texte,
							NameOption: "derniersOuvertsKey",
							Facultatif: !0
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.Function,
							NameOption: "getDerniersOuverts",
							Facultatif: !0,
							Function: async (e) => {}
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.Function,
							NameOption: "getListeGroupe",
							Facultatif: !0,
							Function: async (e) => {}
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.Texte,
							NameOption: "groupesKey",
							Facultatif: !0
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.Function,
							NameOption: "saveDerniersOuverts",
							Facultatif: !0,
							Function: async (e, t) => {}
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.Function,
							NameOption: "saveGroupe",
							Facultatif: !0,
							Function: async (e, t) => {}
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.Texte,
							NameOption: "textAjoutGroupeLocalise",
							Facultatif: !0
						}
					]
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "modeFermerOnglets",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "modeNavigation",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "postZoneAligneeADroite",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "styleArrondi",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "tabChange",
					Facultatif: !0,
					Function: (e) => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Enum,
					EnumType: "enumTypeOrientation",
					NameOption: "typeOrientation",
					ValeurDefaut: enumTypeOrientation.horizontal,
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Enum,
					EnumType: "enumTypeOrientation",
					NameOption: "typeOrientationBouton",
					ValeurDefaut: enumTypeOrientation.horizontal,
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "withDefault",
					Facultatif: !0,
					ValeurDefaut: !1
				}
			]
		}), xxShowRoomContainer.AjouterElementShowroom({
			IsNotFunctionnal: !0,
			typeElement: xxTableauWrapper,
			NomElement: "xxTableauWrapper<T>",
			Description: "Permet de créer un tableau",
			Groupe: ExxShowRoomContaineGoupeElement.xxElement,
			RenderTooltip: async () => new xxTableauWrapper({
				columns: [
					{
						renderMethod: (e) => {
							e.xxLabel({
								textVariable: "Sample",
								type: enumTypeLabel.important
							});
						},
						titleVariable: "Sample Colonne"
					},
					{
						renderMethod: (e) => {
							e.append(new xxBouton({
								optionsAffichage: { tailleBouton: enumTailleBouton.Fit },
								titleLocalise: "",
								icone: new IconeCs3i(enumIconeCs3i.action_agrandir),
								click: () => {}
							}));
						},
						titleVariable: "Sample Colonne 2"
					},
					{
						renderMethod: (e) => {
							e.xxCheckBox({
								AffichageBoutonWapper2: {},
								value: !0
							});
						},
						titleVariable: "Sample Colonne 3"
					}
				],
				data: [
					"hello",
					"hello",
					"hello",
					"hello",
					"hello"
				]
			}),
			renderElement: (e) => new xxTableauWrapper(e),
			listOption: [
				{
					TypeOption: ExxShowRoomContainerTypeOption.SousInterface,
					NameOption: "columns",
					Facultatif: !1,
					listOption: [
						{
							TypeOption: ExxShowRoomContainerTypeOption.Function,
							NameOption: "renderMethod",
							Facultatif: !1,
							Function: (e, t) => {}
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.Texte,
							NameOption: "titleLocalise",
							Facultatif: !1
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.Boolean,
							NameOption: "canDeleteColumn",
							Facultatif: !0,
							ValeurDefaut: !1
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.Function,
							NameOption: "greaterThan",
							Facultatif: !0,
							Function: (e, t, n) => {}
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.Function,
							NameOption: "greaterThanGeneric",
							Facultatif: !0,
							Function: (e) => {}
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.Function,
							NameOption: "group",
							Facultatif: !0,
							Function: (e, t) => {}
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.Function,
							NameOption: "onChangeTrie",
							Facultatif: !0,
							Function: (e, t) => {}
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.Number,
							NameOption: "ordreTri",
							Facultatif: !0
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.Function,
							NameOption: "print",
							Facultatif: !0,
							Function: (e) => {}
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.Function,
							NameOption: "printGroup",
							Facultatif: !0,
							Function: (e) => {}
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.Function,
							NameOption: "printTitleLocalise",
							Facultatif: !0,
							Function: () => {}
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.Function,
							NameOption: "renderTitle",
							Facultatif: !0,
							Function: (e) => {}
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.Texte,
							NameOption: "titleClass",
							Facultatif: !0
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.Texte,
							NameOption: "tooltipTitleLocalise",
							Facultatif: !0
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.Enum,
							NameOption: "triCourant",
							EnumType: "enumTypeTri",
							ValeurDefaut: enumTypeTri.aucun,
							Facultatif: !0
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.Boolean,
							NameOption: "verrouTriPrincipal",
							Facultatif: !0,
							ValeurDefaut: !1
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.Texte,
							NameOption: "widthPdf",
							Facultatif: !0
						}
					]
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "afficherTotalElements",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "autoComplete",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "class",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "id",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "clickLigne",
					Facultatif: !0,
					Function: (e, t) => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "dblClickLigne",
					Facultatif: !0,
					Function: (e, t) => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.SousInterface,
					NameOption: "detailLigne",
					Facultatif: !0,
					listOption: [
						{
							TypeOption: ExxShowRoomContainerTypeOption.Function,
							NameOption: "afficherDetailLigne",
							Facultatif: !0,
							Function: (e) => {}
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.Function,
							NameOption: "printDetailLigne",
							Facultatif: !0,
							Function: (e) => {}
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.Function,
							NameOption: "renderDetailLigne",
							Facultatif: !0,
							Function: (e, t, n) => {}
						}
					]
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.SousInterface,
					NameOption: "exportPDF",
					Facultatif: !0,
					listOption: [
						{
							TypeOption: ExxShowRoomContainerTypeOption.Function,
							NameOption: "getCartouchePdf",
							Facultatif: !0,
							Function: () => {}
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.Function,
							NameOption: "getImagesPdf",
							Facultatif: !0,
							Function: () => {}
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.Texte,
							NameOption: "nomExportPdf",
							Facultatif: !0
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.Boolean,
							NameOption: "PdfModePaysage",
							Facultatif: !0,
							ValeurDefaut: !0
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.Boolean,
							NameOption: "renderBouton",
							Facultatif: !0,
							ValeurDefaut: !1
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.TexteLocalisable,
							NameOptionLocalisable: "sousTitreLocaliseExportPdf",
							NameOptionVariable: "sousTitreVariableExportPdf",
							Facultatif: !0
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.TexteLocalisable,
							NameOptionLocalisable: "titreLocaliseExportPdf",
							NameOptionVariable: "titreVariableExportPdf",
							Facultatif: !0
						}
					]
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "filtreTexte",
					Facultatif: !0,
					Function: (e, t) => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "fixerEntetes",
					Facultatif: !0,
					ValeurDefaut: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.SousInterface,
					NameOption: "groupeGlobal",
					Facultatif: !0,
					listOption: [
						{
							TypeOption: ExxShowRoomContainerTypeOption.Function,
							NameOption: "group",
							Facultatif: !0,
							Function: (e, t, n) => {}
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.Function,
							NameOption: "greaterThan",
							Facultatif: !0,
							Function: (e, t) => {}
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.Function,
							NameOption: "greaterThanGeneric",
							Facultatif: !0,
							Function: (e) => {}
						},
						{
							TypeOption: ExxShowRoomContainerTypeOption.Function,
							NameOption: "printGroupeGlobal",
							Facultatif: !0,
							Function: (e) => {}
						}
					]
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "margin",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "masquerZoneFiltreTexte",
					Facultatif: !0,
					ValeurDefaut: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Number,
					NameOption: "pagination",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "placeHolderFiltreTexte",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "renderNoData",
					Facultatif: !0,
					Function: (e) => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "sansTableauTools",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Icone,
					NameOption: "titleIcone",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.TexteLocalisable,
					NameOptionLocalisable: "titleLocalise",
					NameOptionVariable: "titleVariable",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Enum,
					EnumType: "enumTypeLabel",
					NameOption: "titleTypeLabel",
					ValeurDefaut: enumTypeLabel.titre,
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "WithHeaderRenderNoData",
					Facultatif: !0,
					ValeurDefaut: !0
				}
			]
		}), xxShowRoomContainer.AjouterElementShowroom({
			typeElement: xxTexteEnrichi,
			NomElement: "xxTexteEnrichi",
			Description: "En cours de développement...",
			Groupe: ExxShowRoomContaineGoupeElement.xxElement,
			RenderTooltip: async () => new xxLabel({
				textLocalise: "En cours de développement",
				type: enumTypeLabel.information
			}),
			listOption: [],
			renderElement: (e) => new xxLabel({
				textLocalise: "En cours de développement",
				type: enumTypeLabel.information
			})
		}), xxShowRoomContainer.AjouterElementShowroom({
			typeElement: xxToolTip,
			NomElement: "xxTooltip",
			Description: "Permet de créer une infobulle",
			Groupe: ExxShowRoomContaineGoupeElement.xxElement,
			RenderTooltip: async () => new xxImageTabByte({
				tabByte: xxShowRoomImageTooltipPreview.xxTooltip,
				typeAffichage: enumTypeImage.domImage
			}),
			renderElement: (e) => new xxToolTip(e),
			listOption: [
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "class",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "id",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "isIndependenteToolTip",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "nonResponsive",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "NotAbsoluteTooltip",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "onHide",
					Facultatif: !0,
					Function: (e) => {
						e.viderTooltip();
					}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "onShow",
					Facultatif: !0,
					Function: (e) => {
						e.setToolTip(xxShowRoomSample$1.divSample()).CalculPosition();
					}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "renderCustomHeader",
					Facultatif: !0,
					Function: (e, t) => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.TexteLocalisable,
					NameOptionLocalisable: "titreHeaderLocalise",
					NameOptionVariable: "titreHeaderVariable",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Number,
					NameOption: "ToolTipHeigthFix",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Number,
					NameOption: "ToolTipWidthFix",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Enum,
					EnumType: "enumXxToolTipMode",
					ValeurDefaut: enumXxToolTipMode.OnHover,
					NameOption: "TooltipMode",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Enum,
					EnumType: "enumXxToolTipPositionHeight",
					ValeurDefaut: enumXxToolTipPositionHeight.center,
					NameOption: "ToolTipPositionHeightSouhaite",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "ToolTipPositionWidthNeverCenter",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Enum,
					NameOption: "ToolTipPositionWidthSouhaite",
					EnumType: "enumXxToolTipPositionWidth",
					ValeurDefaut: enumXxToolTipPositionWidth.center,
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "ToolTipPosition_by_Width_extremity",
					Facultatif: !0,
					ValeurDefaut: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "ToolTipPosition_Heigth_NeverCenter",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "TooltipStopPropagation",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "WithoutFleche",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.iXElement,
					NameOption: "initContent"
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.iXElement,
					NameOption: "toolTipContent",
					Facultatif: !0
				}
			]
		}), xxShowRoomContainer.AjouterElementShowroom({
			typeElement: xxTreeTabControl,
			NomElement: "xxTreeTabControl",
			Description: "Permet de créer des onglets et sous-onglets",
			Groupe: ExxShowRoomContaineGoupeElement.xxElement,
			IsNotFunctionnal: !0,
			RenderTooltip: async () => new xxImageTabByte({
				tabByte: xxShowRoomImageTooltipPreview.xxTreeTabControl,
				typeAffichage: enumTypeImage.domImage
			}),
			renderElement: (e) => new xxTreeTabControl(e),
			listOption: [
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "class",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "id",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.CouleurHexa,
					NameOption: "color",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "favoriteAutoSave",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.SousInterface,
					NameOption: "favoriteGlobalKey",
					Facultatif: !0,
					listOption: [{
						TypeOption: ExxShowRoomContainerTypeOption.Texte,
						NameOption: "cdperso",
						Facultatif: !0
					}, {
						TypeOption: ExxShowRoomContainerTypeOption.Texte,
						NameOption: "key",
						Facultatif: !0
					}]
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "modeNavigation",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "postZoneAligneeADroite",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.TexteLocalisable,
					NameOptionLocalisable: "textLocalise",
					NameOptionVariable: "textVariable",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Enum,
					EnumType: "enumTypeOrientation",
					NameOption: "typeOrientation",
					ValeurDefaut: enumTypeOrientation.horizontal,
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "withDefault",
					Facultatif: !0,
					ValeurDefaut: !1
				}
			]
		}), xxShowRoomContainer.AjouterElementShowroom({
			typeElement: xxViewerPDF,
			NomElement: "xxViewerPDF",
			Description: "Permet de lire les PDF",
			Groupe: ExxShowRoomContaineGoupeElement.xxElement,
			IsNotFunctionnal: !0,
			RenderTooltip: async () => {
				let e = new xxViewerPDF({});
				return await e.afficher(xxShowRoomSample$1.PDFBase64(), "sample"), e;
			},
			renderElement: (e) => {
				let t = new xxViewerPDF(e);
				return t.afficheBoxer(xxShowRoomSample$1.PDFBase64(), "sample"), t;
			},
			listOption: [{
				TypeOption: ExxShowRoomContainerTypeOption.Boolean,
				NameOption: "AffichagePageWrapper",
				Facultatif: !0,
				ValeurDefaut: !1
			}, {
				TypeOption: ExxShowRoomContainerTypeOption.Boolean,
				NameOption: "WithBoutonTelecharger",
				Facultatif: !0,
				ValeurDefaut: !1
			}]
		}), xxShowRoomContainer.AjouterElementShowroom({
			typeElement: xxVolet,
			NomElement: "xxVolet",
			Description: "Permet de créer un volet dépliable sur la page",
			Groupe: ExxShowRoomContaineGoupeElement.xxElement,
			RenderTooltip: async () => new xxVolet({ position: enumPositionVolet.bas }),
			renderElement: (e) => new xxVolet(e),
			listOption: [
				{
					TypeOption: ExxShowRoomContainerTypeOption.Enum,
					NameOption: "position",
					EnumType: "enumPositionVolet",
					ValeurDefaut: enumPositionVolet.bas,
					Facultatif: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "class",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "onClose",
					Function: () => {},
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.ListeiXElement,
					NameOption: "initContent",
					Facultatif: !0
				}
			]
		}), xxShowRoomContainer.AjouterElementShowroom({
			typeElement: xxWrapPanel,
			NomElement: "xxWrapPanel",
			Description: "Permet d'ajouter de placer côté à côté des éléments",
			Groupe: ExxShowRoomContaineGoupeElement.xxElement,
			RenderTooltip: async () => new xxWrapPanel({
				initContent: [
					new xxLabel({ textLocalise: "sample" }),
					new IconeCs3i(enumIconeCs3i.action_copier_gauche),
					new xxLabel({
						textLocalise: "SAMPLE",
						type: enumTypeLabel.important
					}),
					new xxBouton({
						click: () => {},
						textVariable: "Sample Bouton",
						titleVariable: "Sample Bouton"
					})
				],
				padding: !0
			}),
			renderElement: (e) => new xxWrapPanel(e),
			listOption: [
				{
					TypeOption: ExxShowRoomContainerTypeOption.Enum,
					EnumType: "enumAlignementHorizontalWrapPanel",
					NameOption: "alignementHorizontable",
					ValeurDefaut: enumAlignementHorizontalWrapPanel.Centre,
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Enum,
					EnumType: "enumAlignementVerticalWrapPanel",
					NameOption: "alignementVertical",
					ValeurDefaut: enumAlignementVerticalWrapPanel.centre,
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "class",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "espaceMinimaliste",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "id",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "itemsLargeurEgale",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "padding",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "retourALaLigne",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.ListeiXElement,
					NameOption: "initContent",
					Facultatif: !0
				}
			]
		}), xxShowRoomContainer.AjouterElementShowroom({
			typeElement: xxZoneModulable,
			Description: "Permet de créer une zone de taille modulable",
			NomElement: "xxZoneModulable",
			Groupe: ExxShowRoomContaineGoupeElement.xxElement,
			RenderTooltip: async () => new xxZoneModulable({
				initPremiereZone: (e) => {
					e.append(new xDiv$1({ class: xxShowRoomSample$1.classSampleDiv_Red }));
				},
				initSecondeZone: (e) => {
					e.append(new xDiv$1({ class: xxShowRoomSample$1.classSampleDiv_Bleu }));
				}
			}),
			renderElement: (e) => new xxZoneModulable(e),
			listOption: [
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "class",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "id",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Enum,
					EnumType: "EEtatZoneModulable",
					NameOption: "initEtat",
					ValeurDefaut: EEtatZoneModulable.deplie
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "initPosition",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "initPremiereZone",
					Facultatif: !0,
					Function: (e) => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "initSecondeZone",
					Facultatif: !0,
					Function: (e) => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "noRotation",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "onDeplierDeuxiemeZone",
					Facultatif: !0,
					Function: () => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "onDeplierPremierZone",
					Facultatif: !0,
					Function: () => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "onPlierDeuxiemeZone",
					Facultatif: !0,
					Function: () => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "onPlierPremiereZone",
					Facultatif: !0,
					Function: () => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "savePositionKey",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "titreDeuxiemeZone",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "titrePremiereZone",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Enum,
					NameOption: "typeOrientation",
					EnumType: "enumTypeOrientation",
					ValeurDefaut: enumTypeOrientation.horizontal,
					Facultatif: !0
				}
			]
		}), xxShowRoomContainer.AjouterElementShowroom({
			typeElement: xxZoneRepliable,
			NomElement: "xxZoneRepliable",
			Description: "Permet de créer une zone qui se replie et se déplie",
			Groupe: ExxShowRoomContaineGoupeElement.xxElement,
			RenderTooltip: async () => new xxZoneRepliable({
				renderDetail: () => {},
				renderTitre: () => {}
			}),
			renderElement: (e) => new xxZoneRepliable(e),
			listOption: [
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "renderDetail",
					Facultatif: !1,
					Function: (e) => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "renderTitre",
					Facultatif: !1,
					Function: (e) => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "class",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Enum,
					EnumType: "enumXxZoneRepliableCouleurFleche",
					NameOption: "CouleurFleche",
					ValeurDefaut: enumXxZoneRepliableCouleurFleche.Bleu,
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "fleche",
					Facultatif: !0,
					ValeurDefaut: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Enum,
					EnumType: "enumXxZoneRepliablePosition",
					NameOption: "flechePosition",
					ValeurDefaut: enumXxZoneRepliablePosition.droite,
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "fullTitleToggle",
					Facultatif: !0,
					ValeurDefaut: !1
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Icone,
					NameOption: "iconeDepliePerso",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "iconeRepliePerso",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "onToggle",
					Facultatif: !0,
					Function: (e, t) => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Boolean,
					NameOption: "plie",
					Facultatif: !0,
					ValeurDefaut: !1
				}
			]
		}), xxShowRoomContainer.AjouterElementShowroom({
			typeElement: xxZoom,
			NomElement: "xxZoom",
			Description: "Permet d'afficher une icône de loupe pour zoomer",
			Groupe: ExxShowRoomContaineGoupeElement.xxElement,
			IsNotFunctionnal: !0,
			RenderTooltip: async () => new xxZoom({
				afterZoom: () => {},
				niveauxZoomPerCent: [
					4,
					4,
					5
				],
				modeAffichage: enumAffichageZoom.modeSlider
			}),
			renderElement: (e) => new xxZoom(e),
			listOption: [
				{
					TypeOption: ExxShowRoomContainerTypeOption.Function,
					NameOption: "afterZoom",
					Facultatif: !1,
					Function: (e) => {}
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Enum,
					NameOption: "modeAffichage",
					Facultatif: !0,
					EnumType: "enumAffichageZoom",
					ValeurDefaut: enumAffichageZoom.modeSlider
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Texte,
					NameOption: "idTest",
					Facultatif: !0
				},
				{
					TypeOption: ExxShowRoomContainerTypeOption.Number,
					NameOption: "zoomChoisi",
					Facultatif: !0
				}
			]
		});
	}
	static XElement_Icone_Load() {
		let e = (e, t) => {
			let n = null;
			switch (e) {
				case "IconeCs3i":
					n = {
						groupe: "iconeCs3i",
						icone: () => new IconeCs3i(t),
						iconeName: enumIconeCs3i[t],
						iconeValue: t,
						iconeString: "new IconeCs3i(enumIconeCs3i." + enumIconeCs3i[t] + ")"
					};
					break;
				case "IconeSvg":
					n = {
						groupe: "iconeSvg",
						icone: () => new IconeSvg(t),
						iconeName: enumIconeSvg[t],
						iconeValue: t,
						iconeString: "new IconeSvg(enumIconeSvg." + enumIconeSvg[t] + ")"
					};
					break;
				case "IconeEmedSvg":
					n = {
						groupe: "iconeEmedSvg",
						icone: () => new IconeSvg(t),
						iconeName: enumIconeEmedSvg[t],
						iconeValue: t,
						iconeString: "new IconeSvg(enumIconeEmedSvg." + enumIconeEmedSvg[t] + ")"
					};
					break;
				case "IconeTuileSvg":
					n = {
						groupe: "iconeTuileSvg",
						icone: () => new IconeSvg(t),
						iconeName: enumIconeTuile[t],
						iconeValue: t,
						iconeString: "new IconeSvg(enumIconeTuile." + enumIconeTuile[t] + ")"
					};
					break;
				case "IconeTuile":
					n = {
						groupe: "iconeTuile",
						icone: () => new IconeTuile(t),
						iconeName: enumIconeTuile[t],
						iconeValue: t,
						iconeString: "new IconeTuile(enumIconeTuile." + enumIconeTuile[t] + ")"
					};
					break;
			}
			return n;
		};
		xxShowRoomContainer.AjouterIconeShowroom(Object.keys(enumIconeCs3i).filter((e) => !isNaN(parseInt(e))).map((t) => e("IconeCs3i", parseInt(t)))), xxShowRoomContainer.AjouterIconeShowroom(Object.keys(enumIconeSvg).filter((e) => !isNaN(parseInt(e))).map((t) => e("IconeSvg", parseInt(t)))), xxShowRoomContainer.AjouterIconeShowroom(Object.keys(enumIconeEmedSvg).filter((e) => !isNaN(parseInt(e))).map((t) => e("IconeEmedSvg", parseInt(t)))), xxShowRoomContainer.AjouterIconeShowroom(Object.keys(enumIconeTuile).filter((e) => !isNaN(parseInt(e))).map((t) => e("IconeTuileSvg", parseInt(t)))), xxShowRoomContainer.AjouterIconeShowroom(Object.keys(enumIconeTuile).filter((e) => !isNaN(parseInt(e))).map((t) => e("IconeTuile", parseInt(t))));
	}
};
//#endregion
export { AppliquerOptionsAffichage, Arbre, BindableObject, Container, DictionnaireUtils, EKeys, EPositionAlertify, ETypeAlertify, ETypeFichier, ETypeStorage, EnumLibrairieJs, GetDateTimeFromFrenchDateString, Icone, IconeCs3i$1 as IconeCs3i, IconeExterne, IconeMiniCs3i$1 as IconeMiniCs3i, IconeSvg$1 as IconeSvg, IconeTuile$1 as IconeTuile, IconeTypeExamen, IconeV2, ObservableCollection$1 as ObservableCollection, Visibility, addClass, afficherxElements$1 as afficherxElements, assignerObjet$1 as assignerObjet, cacherxElements$1 as cacherxElements, desktopDevice, eclaicirCouleurHex, enumAlignementZone$1 as enumAlignementZone, enumComportementBouton, enumCote, enumCouleur$1 as enumCouleur, enumCouleurBouton$1 as enumCouleurBouton, enumCouleurHexa, enumCurseur$1 as enumCurseur, enumDecorationLabel, enumFormeFondIconeSvg, enumHabillageLabel$1 as enumHabillageLabel, enumIconeAction, enumIconeCs3i$1 as enumIconeCs3i, enumIconeEmedSvg$1 as enumIconeEmedSvg, enumIconeSvg$1 as enumIconeSvg, enumIconeTuile$1 as enumIconeTuile, enumListeIcones, enumMiseEnFormeLabel$1 as enumMiseEnFormeLabel, enumPosition$1 as enumPosition, enumPositionIconeAction, enumPositionnementResponsiveBouton$1 as enumPositionnementResponsiveBouton, enumSVGOrientation, enumSVGTaille, enumStyleBorderCSS, enumStyleBouton$1 as enumStyleBouton, enumStyleHeader, enumTailleBouton$1 as enumTailleBouton, enumThemeLuminosite, enumThemes, enumTypeBouton$1 as enumTypeBouton, enumTypeLabel$1 as enumTypeLabel, enumTypeOrientation$1 as enumTypeOrientation, enumTypeOuvertureHref$1 as enumTypeOuvertureHref, enumVisibility, etype_messagebox, eventKey, getLuminositeCouleurHexa, isCouleurHexa, removeClass, setBorder, setCouleurFond, setCouleurFondAvecContrasteTexteAuto, setCouleurTexte, setCurseur, setMargin, setPadding, supprimerCouleurFond, supprimerCurseur, tailleIcone$1 as tailleIcone, viderxElements, xBr, xCache, xClass, xDiv$1 as xDiv, xElement, xElementHolder, xHref$1 as xHref, xIconeAvecAction, xLString$1 as xLString, xLib, xMaths, xOutils$1 as xOutils, xRequire$1 as xRequire, xSVG, xSpan, xStyle, xTime$1 as xTime, xxBouton, xxContainerEvent$1 as xxContainerEvent, xxLabel, xxPageWrapper$1 as xxPageWrapper, xxShowRoomContainer, xxShowRoomImageTooltipPreview, xxShowRoomLoader, xxShowRoomOptionRecurrente, xxShowRoomSample$1 as xxShowRoomSample, xxShowroomCustomSample };

//# sourceMappingURL=iceLib.mjs.map