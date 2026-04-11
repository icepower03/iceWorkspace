

/*

$.fn.xdiv = function (options: OptionsDiv, outElement?: Container<JQuery>): JQuery {
    let myThis: JQuery = this;
    let element: xDiv = new xDiv(options);

    if (outElement != undefined) {
        outElement.content = element.x;
    }
    return myThis.append(element.x);
}

$.fn.xspan = function (options: OptionsSpan, outElement?: Container<JQuery>): JQuery {
    let myThis: JQuery = this;

    let element: xSpan = new xSpan(options);


    if (outElement != undefined) {
        outElement.content = element.x;
    }
    return myThis.append(element.x);

}

$.fn.xhref = function (options: OptionsHref, outElement?: Container<JQuery>): JQuery
{
    let myThis: JQuery = this;

    let element: xSpan = new xHref(options);


    if (outElement != undefined)
    {
        outElement.content = element.x;
    }

    return myThis.append(element.x);
}

$.fn.xinput = function (options: OptionsInput, outElement?: Container<JQuery>): JQuery {

    let myThis: JQuery = this;

    let element: xInputText = new xInputText(options);


    if (outElement != undefined) {
        outElement.content = element.x;
    }
    return myThis.append(element.x);
}

$.fn.xinputFile = function (options: OptionsInputFile, outElement?: Container<JQuery>): JQuery {

    let myThis: JQuery = this;

    let element: xInputFile = new xInputFile(options);


    if (outElement != undefined) {
        outElement.content = element.x;
    }
    return myThis.append(element.x);
}

$.fn.xinputCheckBox = function (options: OptionsInputCheckBox, outElement?: Container<JQuery>): JQuery {

    let myThis: JQuery = this;

    let element: xInputCheckBox = new xInputCheckBox(options);


    if (outElement != undefined) {
        outElement.content = element.x;
    }
    return myThis.append(element.x);
}

$.fn.xinputDate = function (options: OptionsInputDate, outElement?: Container<JQuery>): JQuery {


    let myThis: JQuery = this;

    let element: xInputDate = new xInputDate(options);


    if (outElement != undefined) {
        outElement.content = element.x;
    }
    return myThis.append(element.x);


}

$.fn.xul = function (options: OptionsHtml, outElement?: Container<JQuery>): JQuery {


    let myThis: JQuery = this;

    let element: xUl = new xUl(options);

    if (outElement != undefined) {
        outElement.content = element.x;
    }
    return myThis.append(element.x);


}
$.fn.xli = function (options: OptionsHtml, outElement?: Container<JQuery>): JQuery {
    let myThis: JQuery = this;

    let element: xLi = new xLi(options);

    if (outElement != undefined) {
        outElement.content = element.x;
    }
    return myThis.append(element.x);
}
$.fn.xtable = function (options: OptionsHtml, outElement?: Container<JQuery>): JQuery {
    let myThis: JQuery = this;

    let element: xTable = new xTable(options);

    if (outElement != undefined) {
        outElement.content = element.x;
    }
    return myThis.append(element.x);
}
$.fn.xoption = function (options: OptionsOption, outElement?: Container<JQuery>): JQuery {
    let myThis: JQuery = this;

    let element: xOption = new xOption(options);


    if (outElement != undefined) {
        outElement.content = element.x;
    }
    return myThis.append(element.x);
}
$.fn.xselect = function (options: OptionsSelect, outElement?: Container<JQuery>): JQuery {
    let myThis: JQuery = this;

    let element: xSelect = new xSelect(options);


    if (outElement != undefined) {
        outElement.content = element.x;
    }
    return myThis.append(element.x);
}


$.fn.xinputDateAndTime = function (options: OptionsInputDateAndTime, outElement?: Container<JQuery>): JQuery {
    let myThis: JQuery = this;

    let element: xInputDateAndTime = new xInputDateAndTime(options);


    if (outElement != undefined) {
        outElement.content = element.x;
    }
    return myThis.append(element.x);



}

$.fn.xinputTime = function (options: OptionsInputTime, outElement?: Container<JQuery>): JQuery {
    let myThis: JQuery = this;

    let element: xInputTime = new xInputTime(options);


    if (outElement != undefined) {
        outElement.content = element.x;
    }
    return myThis.append(element.x);



}

$.fn.xxAutoComplete = function <T>(options: OptionsAutoComplete<T>): JQuery {

    let myThis: JQuery = this;

    let monAutocomplete: xxAutoComplete<T> = new xxAutoComplete<T>(options);

    myThis.append(monAutocomplete.x);

    return myThis;
}


$.fn.xxBouton = function (options: OptionsBoutons, outBouton: Container<xxBoutonWrapper>): JQuery {

    let myThis: JQuery = this;

    let monBouton: xxBoutonWrapper = new xxBoutonWrapper(options);


    if (outBouton != undefined)
    { outBouton.content = monBouton; }


    myThis.append(monBouton.x);

    return myThis;
}

$.fn.xxListChoix = function (options: OptionsSelect): JQuery {

    let myThis: JQuery = this;
    let monObj: xxListChoix = new xxListChoix(options)

    monObj.attacher(myThis);
    return myThis;

}



$.fn.xxMenu = function (options: OptionsMenu, outElement?: Container<JQuery>): JQuery {

    let myThis: JQuery = this;
    let monObj: xxMenu = new xxMenu(options);

    if (outElement != undefined)
    { outElement.content = monObj.x; }

    monObj.attacher(myThis);
    return myThis;
}


$.fn.xxList = function <T>(options: OptionsList<T>, outElement?: Container<xxListWrapper<T>>): JQuery {
    let myThis: JQuery = this;

    let maListe: xxListWrapper<T> = new xxListWrapper<T>(options);
    myThis.append(maListe.x);

    if (outElement != undefined)
    { outElement.content = maListe; }

    return myThis;
}

$.fn.xxTableau = function <T>(options: OptionsTableau<T>, outElement?: Container<xxTableauWrapper<T>>): JQuery {
    let myThis: JQuery = this;

    let tab: xxTableauWrapper<T> = new xxTableauWrapper<T>(options);
    myThis.append(tab.x);

    if (outElement != undefined)
    { outElement.content = tab; }

    return myThis;

}

$.fn.xxDockPanel = function (o: OptionsxxDockPanel, outElement?: Container<xxDockPanel>): JQuery {
    let myThis: JQuery = this;
    let element: xxDockPanel = new xxDockPanel(o);

    if (outElement != undefined) {
        outElement.content = element;
    }
    return myThis.append(element.x);
}


$.fn.xxWrapPanel = function (o: OptionsWrapPanel, outElement?: Container<xxWrapPanel>): JQuery {
    let myThis: JQuery = this;
    let element: xxWrapPanel = new xxWrapPanel(o);

    if (outElement != undefined) {
        outElement.content = element;
    }
    return myThis.append(element.x);
}

$.fn.xxGrid = function (o: OptionsGrid, outElement?: Container<xxGrid>): JQuery {
    let myThis: JQuery = this;
    let element: xxGrid = new xxGrid(o);

    if (outElement != undefined) {
        outElement.content = element;
    }
    return myThis.append(element.x);
}



$.fn.xxStackPanel = function (o: OptionsStackPanel, outElement?: Container<xxStackPanel>): JQuery {
    let myThis: JQuery = this;
    let element: xxStackPanel = new xxStackPanel(o);

    if (outElement != undefined) {
        outElement.content = element;
    }
    return myThis.append(element.x);
}

$.fn.xxZoneModulable = function (o: OptionZoneModulable, outElement?: Container<xxZoneModulable>): JQuery {
    let myThis: JQuery = this;
    let element: xxZoneModulable = new xxZoneModulable(o);

    if (outElement != undefined) {
        outElement.content = element;
    }
    return myThis.append(element.x);
}

$.fn.xxZoneRepliable = function (o: OptionsZoneRepliable, outElement?: Container<xxZoneRepliable>): JQuery {
    let myThis: JQuery = this;
    let element: xxZoneRepliable = new xxZoneRepliable(o);

    if (outElement != undefined) {
        outElement.content = element;
    }
    return myThis.append(element.x);
}


$.fn.xxLabel = function (o: OptionsLabel, outElement?: Container<xxLabel>): JQuery {
    let myThis: JQuery = this;
    let element: xxLabel = new xxLabel(o);

    if (outElement != undefined) {
        outElement.content = element;
    }
    return myThis.append(element.x);
}


$.fn.xxLabelModifiable = function (o: OptionsLabelModifiable, outElement?: Container<xxLabelModifiable>): JQuery {
    let myThis: JQuery = this;
    let element: xxLabelModifiable = new xxLabelModifiable(o);

    if (outElement != undefined) {
        outElement.content = element;
    }
    return myThis.append(element.x);


}

$.fn.xxLabelTimeModifiable = function (o: OptionsLabelTimeModifiable, outElement?: Container<xxLabelTimeModifiable>): JQuery {
    let myThis: JQuery = this;
    let element: xxLabelTimeModifiable = new xxLabelTimeModifiable(o);

    if (outElement != undefined) {
        outElement.content = element;
    }
    return myThis.append(element.x);


}




$.fn.xxLabelContainer = function (o: OptionsLabelContainer, outElement?: Container<xxLabelContainer>): JQuery {
    let myThis: JQuery = this;
    let element: xxLabelContainer = new xxLabelContainer(o);

    if (outElement != undefined) {
        outElement.content = element;
    }
    element.attacher(myThis);
    return myThis;
}

$.fn.xxCheckBox = function (o: OptionsInputCheckBox, outElement?: Container<xxCheckBox>): JQuery {
    let myThis: JQuery = this;
    let c: xxCheckBox = new xxCheckBox(o);
    if (outElement != undefined) {
        outElement.content = c;
    }
    myThis.append(c.x);
    return myThis;
}

$.fn.xxRadioButton = function <T>(o: OptionsRadioButton<T>, outElement?: Container<xxRadioButton<T>>): JQuery {
    let myThis: JQuery = this;
    let c: xxRadioButton<T> = new xxRadioButton<T>(o);
    if (outElement != undefined) {
        outElement.content = c;
    }
    myThis.append(c.x);
    return myThis;
}

$.fn.xxPage = function (options: OptionsPage, outPageWrapper: Container<xxPageWrapper>): JQuery {
    let myThis: JQuery = this;
    let maPage: xxPageWrapper = new xxPageWrapper(options);
    myThis.append(maPage.x);

    if (outPageWrapper != undefined)
    { outPageWrapper.content = maPage; }

    return myThis;

}

$.fn.xxTabControl = function (options: OptionsTabControl, outElement?: Container<xxTabControl>): JQuery {
    let myThis: JQuery = this;
    let monTabControl: xxTabControl = new xxTabControl(options);
    myThis.append(monTabControl.x);

    if (outElement != undefined)
    { outElement.content = monTabControl; }

    return myThis;

}

$.fn.xxTreeTabControl = function (options: OptionsTreeTabControl, outElement?: Container<xxTreeTabControl>): JQuery {
    let myThis: JQuery = this;
    let monTabControl: xxTreeTabControl = new xxTreeTabControl(options);
    myThis.append(monTabControl.x);

    if (outElement != undefined) { outElement.content = monTabControl; }

    return myThis;

}



$.fn.xxToolTip = function (options: OptionsToolTip, outElement?: Container<xxToolTip>): JQuery
{
    let myThis: JQuery = this;
    let monToolTip: xxToolTip = new xxToolTip(options);
    myThis.append(monToolTip.x);

    if (outElement != undefined)
    { outElement.content = monToolTip; }

    return myThis;

}


$.fn.xxListeDeroulante = function <T>(options: OptionsListeDeroulante<T>, outElement?: Container<xxListeDeroulante<T>>): JQuery {
    let myThis: JQuery = this;

    let maListe: xxListeDeroulante<T> = new xxListeDeroulante<T>(options);
    myThis.append(maListe.x);

    if (outElement != undefined) { outElement.content = maListe; }

    return myThis;
}

$.fn.xxListeChoixLang = function (options: OptionsListeChoixLang, outElement?: Container<xxListeChoixLang>): JQuery
{
    let myThis: JQuery = this;

    let maListe: xxListeChoixLang = new xxListeChoixLang(options);
    myThis.append(maListe.x);

    if (outElement != undefined) { outElement.content = maListe; }

    return myThis;
}

*/