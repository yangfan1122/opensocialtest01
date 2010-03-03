function getViewName() {
	return gadgets.views.getCurrentView().getName();
}

if (getViewName()=="canvas") {
	/* Do canvas specific stuff here */
}

if (getViewName()=="profile") {
	/* Do profile specific stuff here */
}


gadgets.util.registerOnLoadHandler(getViewName);