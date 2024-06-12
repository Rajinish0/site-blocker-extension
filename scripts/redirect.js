//window.location.href = "https://www.google.com";

chrome.storage.sync.get("blockedSites", ({ blockedSites }) => {
	blockedSites = blockedSites || [];
	blockedSites.forEach(site => {
		/*
		TO DO:
		use regex
		*/
		if (window.location.href.includes(site)) {
			window.location.href = "https://www.google.com";
		}
	})
}) //sync for a user
